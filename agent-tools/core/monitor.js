/**
 * JobMonitor - Lightweight background job monitoring with minimal token usage
 *
 * Purpose:
 * - Poll background jobs for progress without reading full verbose logs
 * - Extract structured progress updates (Stage X/Y, Post N/M, etc.)
 * - Detect completion immediately
 * - Provide callbacks for progress updates and completion
 *
 * Token Efficiency:
 * - Without monitoring: Read full logs = 15,000 tokens per check
 * - With monitoring: Filtered output = ~100 tokens per check
 * - For 2-min job (8 checks): 800 tokens vs 120,000 tokens = 99% savings
 *
 * Usage:
 * ```javascript
 * import { JobMonitor } from './core/monitor.js';
 *
 * const monitor = new JobMonitor(jobId, {
 *   pollInterval: 15000, // Check every 15s
 *   onProgress: (status) => console.log(`Progress: ${status.message}`),
 *   onComplete: (result) => console.log(`Done: ${result.summary}`)
 * });
 *
 * await monitor.start(); // Blocks until job completes
 * ```
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export class JobMonitor {
  /**
   * Create a new job monitor
   *
   * @param {string} jobId - The background job ID to monitor
   * @param {Object} options - Configuration options
   * @param {string} options.outputFile - Path to the output log file
   * @param {number} options.pollInterval - Milliseconds between checks (default: 15000)
   * @param {Function} options.onProgress - Called when progress updates (status) => void
   * @param {Function} options.onComplete - Called when job completes (result) => void
   * @param {boolean} options.verbose - Log monitoring activity (default: false)
   */
  constructor(jobId, options = {}) {
    this.jobId = jobId;
    this.outputFile = options.outputFile;
    this.pollInterval = options.pollInterval || 15000;
    this.onProgress = options.onProgress || (() => {});
    this.onComplete = options.onComplete || (() => {});
    this.verbose = options.verbose || false;
    this.lastStage = null;
    this.lastProgress = null;
    this.startTime = Date.now();
  }

  /**
   * Start monitoring the job
   * Returns a promise that resolves when the job completes
   *
   * @returns {Promise<Object>} Final job result with summary
   */
  async start() {
    if (this.verbose) {
      console.log(`[Monitor] Starting monitor for job ${this.jobId}`);
      console.log(`[Monitor] Poll interval: ${this.pollInterval}ms`);
    }

    return new Promise((resolve, reject) => {
      // Initial check
      this._poll(resolve, reject);

      // Set up interval for subsequent checks
      const interval = setInterval(() => {
        this._poll(resolve, reject, interval);
      }, this.pollInterval);
    });
  }

  /**
   * Internal: Poll job status once
   * @private
   */
  async _poll(resolve, reject, interval = null) {
    try {
      const status = await this.checkStatus();

      if (status.error) {
        if (interval) clearInterval(interval);
        reject(new Error(status.error));
        return;
      }

      if (status.complete) {
        if (interval) clearInterval(interval);

        const elapsed = Math.round((Date.now() - this.startTime) / 1000);
        status.elapsed = `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;

        this.onComplete(status);
        resolve(status);
      } else if (status.hasProgress) {
        // Only call onProgress if there's something new
        const progressKey = `${status.stage}:${status.current}:${status.message}`;
        if (progressKey !== this.lastProgress) {
          this.lastProgress = progressKey;
          this.onProgress(status);
        }
      }
    } catch (error) {
      if (interval) clearInterval(interval);
      reject(error);
    }
  }

  /**
   * Check current job status using filtered output
   * Uses minimal tokens by filtering for progress markers only
   *
   * @returns {Promise<Object>} Status object
   */
  async checkStatus() {
    try {
      // For Claude Code BashOutput tool, we would use:
      // But since we're running in Node, we need to check output directly

      // Try to get filtered output (only progress/completion lines)
      // This reduces token usage from ~15k to ~100 per check
      const output = this._getFilteredOutput();

      if (!output) {
        return {
          complete: false,
          hasProgress: false,
          message: 'Job running (no output yet)'
        };
      }

      return this.parseStatus(output);
    } catch (error) {
      return {
        complete: false,
        error: error.message,
        hasProgress: false
      };
    }
  }

  /**
   * Get filtered job output (only progress lines)
   * @private
   */
  _getFilteredOutput() {
    // If output file path was provided, read from it
    if (this.outputFile && existsSync(this.outputFile)) {
      const fullOutput = readFileSync(this.outputFile, 'utf-8');

      // Filter to only progress-related lines
      const lines = fullOutput.split('\n');
      const progressLines = lines.filter(line =>
        line.includes('"type":"PROGRESS"') ||
        line.includes('Stage') ||
        line.includes('✓') ||
        line.includes('Complete') ||
        line.includes('success') ||
        line.includes('Post ') ||
        line.includes('Video ') ||
        line.includes('Extracting') ||
        line.includes('Transcribing')
      );

      return progressLines.join('\n');
    }

    return null;
  }

  /**
   * Parse job output to extract progress information
   *
   * @param {string} output - Filtered job output
   * @returns {Object} Parsed status
   */
  parseStatus(output) {
    const lines = output.split('\n').filter(l => l.trim());

    // Try to parse structured JSON PROGRESS events first
    const jsonEvents = lines
      .filter(line => line.includes('"type":"PROGRESS"'))
      .map(line => {
        try {
          return JSON.parse(line);
        } catch (e) {
          return null;
        }
      })
      .filter(e => e !== null);

    // Use the most recent progress event
    if (jsonEvents.length > 0) {
      const latest = jsonEvents[jsonEvents.length - 1];

      // Check if job is complete
      if (latest.stage === 'complete') {
        return {
          complete: true,
          hasProgress: true,
          summary: latest.summary || this.extractSummary(output),
          message: latest.message || 'Job complete'
        };
      }

      // Return structured progress
      return {
        complete: false,
        hasProgress: true,
        stage: latest.stage,
        current: latest.current,
        total: latest.total,
        message: latest.message,
        type: latest.type,
        raw: output
      };
    }

    // Fallback to text parsing if no JSON events found

    // Check for completion
    const completeMatch = output.match(/Complete|"success":\s*true|Job completed/i);
    if (completeMatch) {
      return {
        complete: true,
        hasProgress: true,
        summary: this.extractSummary(output),
        message: 'Job complete'
      };
    }

    // Check for errors
    const errorMatch = output.match(/"success":\s*false|ERROR|Failed/);
    if (errorMatch) {
      return {
        complete: true,
        hasProgress: true,
        error: 'Job failed',
        message: 'Job failed - check logs'
      };
    }

    // Extract stage information
    const stageMatch = output.match(/Stage (\d+)(?:\/(\d+))?: (.+)/i);
    if (stageMatch) {
      const [, current, total, description] = stageMatch;
      return {
        complete: false,
        hasProgress: true,
        stage: total ? `${current}/${total}` : current,
        message: description.trim(),
        raw: output
      };
    }

    // Extract post/video progress
    const postMatch = output.match(/Post (\d+)\/(\d+)|✓ Post (\d+)\/(\d+)/);
    if (postMatch) {
      const current = parseInt(postMatch[1] || postMatch[3]);
      const total = parseInt(postMatch[2] || postMatch[4]);
      const pct = Math.round((current / total) * 100);

      return {
        complete: false,
        hasProgress: true,
        current,
        total,
        percent: pct,
        message: `Extracting posts: ${current}/${total} (${pct}%)`,
        type: 'posts'
      };
    }

    const videoMatch = output.match(/Video (\d+)\/(\d+)|✓ Video (\d+)\/(\d+)/);
    if (videoMatch) {
      const current = parseInt(videoMatch[1] || videoMatch[3]);
      const total = parseInt(videoMatch[2] || videoMatch[4]);
      const pct = Math.round((current / total) * 100);

      return {
        complete: false,
        hasProgress: true,
        current,
        total,
        percent: pct,
        message: `Transcribing videos: ${current}/${total} (${pct}%)`,
        type: 'videos'
      };
    }

    // Generic progress detected but couldn't parse specifics
    if (lines.length > 0) {
      return {
        complete: false,
        hasProgress: true,
        message: lines[lines.length - 1].trim(),
        raw: output
      };
    }

    return {
      complete: false,
      hasProgress: false,
      message: 'Job running'
    };
  }

  /**
   * Extract summary from completion output
   * @private
   */
  extractSummary(output) {
    // Try to extract JSON result
    const jsonMatch = output.match(/\{[^}]*"success"[^}]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        // Fall through to text parsing
      }
    }

    // Try to extract key metrics
    const summary = {};

    const postsMatch = output.match(/(\d+)\s*posts?/i);
    if (postsMatch) summary.posts = parseInt(postsMatch[1]);

    const videosMatch = output.match(/(\d+)\s*videos?\s*transcribed/i);
    if (videosMatch) summary.videosTranscribed = parseInt(videosMatch[1]);

    const durationMatch = output.match(/(\d+m\s*\d+s)/);
    if (durationMatch) summary.duration = durationMatch[1];

    return Object.keys(summary).length > 0 ? summary : null;
  }
}

/**
 * Convenience function: Monitor a job with simple progress logging
 *
 * @param {string} jobId - Job ID to monitor
 * @param {Object} options - Monitor options
 * @returns {Promise<Object>} Job result
 */
export async function monitorJob(jobId, options = {}) {
  const monitor = new JobMonitor(jobId, {
    pollInterval: options.pollInterval || 15000,
    verbose: options.verbose || false,

    onProgress: (status) => {
      if (status.message) {
        const prefix = status.percent ? `[${status.percent}%]` : '📍';
        console.log(`${prefix} ${status.message}`);
      }
    },

    onComplete: (result) => {
      console.log('✅ Job complete!');
      if (result.summary) {
        console.log(`   Summary: ${JSON.stringify(result.summary)}`);
      }
      if (result.elapsed) {
        console.log(`   Duration: ${result.elapsed}`);
      }
    }
  });

  return await monitor.start();
}

export default JobMonitor;
