#!/usr/bin/env node

/**
 * Video Transcriber
 * Downloads and transcribes Instagram reel videos
 */

import { execSync } from 'child_process';
import { SCRIPTS, getTempPath } from '@business-artifacts/config';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Execute command with error handling
 */
function exec(command, description) {
  try {
    execSync(command, { encoding: 'utf-8', stdio: 'inherit' });
  } catch (error) {
    throw new Error(`${description} failed: ${error.message}`);
  }
}

/**
 * Download and transcribe a single video
 *
 * @param {Object} reel - Reel object with url property
 * @param {Object} options - Transcription options
 * @returns {Promise<string>} - Transcription text
 */
export async function transcribeVideo(reel, options = {}) {
  const {
    videosDir = getTempPath('videos'),
    language = 'pt',
    format = 'txt',
    keepVideo = true,
    delay = 2000
  } = options;

  // Ensure directory exists
  if (!existsSync(videosDir)) {
    mkdirSync(videosDir, { recursive: true });
  }

  const postId = reel.url.split('/').filter(Boolean).pop();
  const transcriptPath = join(videosDir, `${postId}.txt`);

  try {
    // Use video-url-transcribe.js which downloads AND transcribes in one step
    exec(
      `node "${SCRIPTS.VIDEO_URL_TRANSCRIBE}" "${reel.url}" ${keepVideo ? '--keep-video' : ''} --download-dir "${videosDir}" --output "${transcriptPath}" --language ${language} --format ${format}`,
      `Downloading & transcribing ${postId}`
    );

    // Read transcription
    if (existsSync(transcriptPath)) {
      const transcription = readFileSync(transcriptPath, 'utf-8').trim();

      // Delay to avoid rate limiting
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      return transcription;
    } else {
      throw new Error('Transcription file not created');
    }
  } catch (error) {
    console.warn(`⚠️  Failed to download/transcribe ${postId}:`, error.message);
    return '';
  }
}

/**
 * Download and transcribe multiple videos
 *
 * @param {Array<Object>} posts - Array of post objects (will filter for reels)
 * @param {Object} options - Transcription options
 * @returns {Promise<Object>} - Results with transcriptions
 */
export async function transcribeVideos(posts, options = {}) {
  const {
    videosDir = getTempPath('videos'),
    language = 'pt',
    format = 'txt',
    keepVideo = true,
    delay = 2000,
    continueOnError = true
  } = options;

  const reels = posts.filter(p => p.isReel);

  if (reels.length === 0) {
    console.log('\n⏭️  No reels to transcribe');
    return { successful: 0, failed: 0, totalReels: 0 };
  }

  console.log(`\n⚙️  Downloading and transcribing ${reels.length} videos...`);

  const results = {
    successful: 0,
    failed: 0,
    totalReels: reels.length
  };

  for (const reel of reels) {
    const postId = reel.url.split('/').filter(Boolean).pop();

    try {
      const transcription = await transcribeVideo(reel, {
        videosDir,
        language,
        format,
        keepVideo,
        delay
      });

      if (transcription) {
        reel.transcription = transcription;
        results.successful++;
        console.log(`✓ Video transcribed: ${postId}`);
      } else {
        reel.transcription = '';
        results.failed++;
      }
    } catch (error) {
      reel.transcription = '';
      results.failed++;

      if (!continueOnError) {
        throw error;
      }
    }
  }

  console.log(`\n✓ Transcription complete: ${results.successful}/${results.totalReels} successful`);

  if (results.failed > 0) {
    console.warn(`⚠️  ${results.failed} transcriptions failed`);
  }

  return results;
}

/**
 * Get transcription path for a reel (without transcribing)
 *
 * @param {Object} reel - Reel object
 * @param {string} videosDir - Videos directory
 * @returns {string|null} - Path to transcription if it exists
 */
export function getTranscriptionPath(reel, videosDir = getTempPath('videos')) {
  const postId = reel.url.split('/').filter(Boolean).pop();
  const transcriptPath = join(videosDir, `${postId}.txt`);

  return existsSync(transcriptPath) ? transcriptPath : null;
}

/**
 * Load existing transcription
 *
 * @param {Object} reel - Reel object
 * @param {string} videosDir - Videos directory
 * @returns {string|null} - Transcription text if exists
 */
export function loadTranscription(reel, videosDir = getTempPath('videos')) {
  const transcriptPath = getTranscriptionPath(reel, videosDir);

  if (transcriptPath && existsSync(transcriptPath)) {
    return readFileSync(transcriptPath, 'utf-8').trim();
  }

  return null;
}

export default {
  transcribeVideo,
  transcribeVideos,
  getTranscriptionPath,
  loadTranscription
};
