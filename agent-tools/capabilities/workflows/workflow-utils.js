/**
 * Workflow Utilities
 *
 * Shared helper functions for workflows to execute primitives
 * without requiring the SDK.
 *
 * IMPORTANT NOTES:
 * - Primitives MUST call process.exit(0) on success
 * - Primitives MUST call process.exit(1) on error
 * - Primitives MUST output ONLY JSON to stdout
 * - Logs should go to logger (stderr), not stdout
 */

import { spawnSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PRIMITIVES_DIR = join(__dirname, '../primitives');

/**
 * Execute a primitive and parse its JSON output
 *
 * @param {string} primitivePath - Relative path from primitives dir (e.g., 'browser/start.js')
 * @param {Object} args - Arguments to pass to the primitive
 * @returns {Object} - Parsed JSON result from primitive
 */
export function executePrimitive(primitivePath, args = {}) {
  try {
    // Special handling for browser eval primitives - use base64 encoding for code
    const evalPrimitives = ['browser/eval.js'];
    if (evalPrimitives.includes(primitivePath) && args.code) {
      const codeBase64 = Buffer.from(args.code).toString('base64');
      const newArgs = { ...args };
      delete newArgs.code;
      newArgs['code-base64'] = codeBase64;
      args = newArgs;
    }

    // Build args array for spawnSync (no shell interpretation)
    const argsArray = [];
    for (const [key, val] of Object.entries(args)) {
      if (val === undefined || val === null) continue;

      // Handle boolean flags
      if (typeof val === 'boolean') {
        if (val) argsArray.push(`--${key}`);
      } else {
        argsArray.push(`--${key}`);
        argsArray.push(String(val));
      }
    }

    const fullPath = join(PRIMITIVES_DIR, primitivePath);

    // Debug: log command for browser eval primitives
    const evalPrimitivesDebug = ['browser/eval.js'];
    if (evalPrimitivesDebug.includes(primitivePath)) {
      console.error('[WORKFLOW-UTILS DEBUG] Executing with spawnSync');
      console.error('[WORKFLOW-UTILS DEBUG] Primitive:', primitivePath);
      console.error('[WORKFLOW-UTILS DEBUG] Path:', fullPath);
      console.error('[WORKFLOW-UTILS DEBUG] Args array length:', argsArray.length);
      console.error('[WORKFLOW-UTILS DEBUG] Code-base64 present:', args['code-base64'] ? 'yes' : 'no');
      if (args['code-base64']) {
        console.error('[WORKFLOW-UTILS DEBUG] Code-base64 length:', args['code-base64'].length);
        const decoded = Buffer.from(args['code-base64'], 'base64').toString('utf-8');
        console.error('[WORKFLOW-UTILS DEBUG] Decoded code (first 200 chars):', decoded.slice(0, 200));
        console.error('[WORKFLOW-UTILS DEBUG] Decoded code length:', decoded.length);
      }
    }

    const result = spawnSync('node', [fullPath, ...argsArray], {
      encoding: 'utf8',
      timeout: 120000, // 2 minute timeout
      maxBuffer: 10 * 1024 * 1024 // 10MB buffer
    });

    if (result.error) {
      throw result.error;
    }

    const output = result.stdout;

    // Find the JSON output (usually the last line or a line starting with {)
    const lines = output.trim().split('\n');
    let jsonOutput = lines[lines.length - 1]; // Try last line first

    // If last line doesn't look like JSON, search for a JSON line
    if (!jsonOutput.trim().startsWith('{')) {
      jsonOutput = lines.find(line => line.trim().startsWith('{')) || jsonOutput;
    }

    return JSON.parse(jsonOutput);
  } catch (error) {
    // If the command failed, try to parse error output as JSON
    if (error.stdout) {
      try {
        const lines = error.stdout.trim().split('\n');
        let jsonOutput = lines[lines.length - 1];
        if (!jsonOutput.trim().startsWith('{')) {
          jsonOutput = lines.find(line => line.trim().startsWith('{')) || jsonOutput;
        }
        return JSON.parse(jsonOutput);
      } catch {}
    }

    // Include stderr in error message for better debugging
    const stderrMsg = error.stderr ? `\nStderr: ${error.stderr}` : '';
    throw new Error(`Primitive ${primitivePath} failed: ${error.message}${stderrMsg}`);
  }
}

/**
 * Execute a primitive that doesn't return meaningful JSON
 * (e.g., browser.close)
 *
 * Errors are logged but not thrown, allowing cleanup operations
 * to fail gracefully without blocking the workflow.
 */
export function executePrimitiveNoReturn(primitivePath, args = {}) {
  try {
    executePrimitive(primitivePath, args);
  } catch (error) {
    // Log error for debugging but don't throw (cleanup operations)
    console.error(`Warning: Cleanup operation ${primitivePath} failed: ${error.message}`);
  }
}
