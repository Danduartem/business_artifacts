#!/usr/bin/env node

/**
 * Common utilities for agent tools
 */

import fs from 'fs';
import path from 'path';

/**
 * Retry a function with exponential backoff
 */
export async function retry(fn, options = {}) {
  const maxRetries = options.maxRetries || 3;
  const initialDelay = options.initialDelay || 1000;
  const maxDelay = options.maxDelay || 10000;
  const backoffFactor = options.backoffFactor || 2;

  let lastError;
  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      if (attempt < maxRetries) {
        await sleep(Math.min(delay, maxDelay));
        delay *= backoffFactor;
      }
    }
  }

  throw lastError;
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format duration in human-readable format
 */
export function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Format bytes in human-readable format
 */
export function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * Deep merge objects
 */
export function deepMerge(target, ...sources) {
  if (!sources.length) return target;

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Ensure directory exists
 */
export function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}

/**
 * Read JSON file safely
 */
export function readJSON(filePath, defaultValue = null) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
    return defaultValue;
  } catch (err) {
    return defaultValue;
  }
}

/**
 * Write JSON file safely
 */
export function writeJSON(filePath, data, options = {}) {
  const indent = options.indent !== undefined ? options.indent : 2;
  const content = JSON.stringify(data, null, indent);
  fs.writeFileSync(filePath, content, 'utf8');
}

/**
 * Generate unique ID
 */
export function generateId(prefix = '') {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}

/**
 * Validate required environment variables
 */
export function validateEnv(required = []) {
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Please check your .env file or environment configuration.`
    );
  }
}

/**
 * Parse command line arguments
 */
export function parseArgs(args = process.argv.slice(2)) {
  const parsed = {
    _: [],
    flags: {}
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];

      if (nextArg && !nextArg.startsWith('-')) {
        parsed.flags[key] = nextArg;
        i++;
      } else {
        parsed.flags[key] = true;
      }
    } else if (arg.startsWith('-')) {
      const key = arg.slice(1);
      const nextArg = args[i + 1];

      if (nextArg && !nextArg.startsWith('-')) {
        parsed.flags[key] = nextArg;
        i++;
      } else {
        parsed.flags[key] = true;
      }
    } else {
      parsed._.push(arg);
    }
  }

  return parsed;
}

/**
 * Chunk array into smaller arrays
 */
export function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Rate limiter
 */
export class RateLimiter {
  constructor(maxCalls, windowMs) {
    this.maxCalls = maxCalls;
    this.windowMs = windowMs;
    this.calls = [];
  }

  async acquire() {
    const now = Date.now();
    this.calls = this.calls.filter(time => now - time < this.windowMs);

    if (this.calls.length >= this.maxCalls) {
      const oldestCall = this.calls[0];
      const waitTime = this.windowMs - (now - oldestCall);
      await sleep(waitTime);
      return this.acquire();
    }

    this.calls.push(now);
  }
}

/**
 * Progress tracker
 */
export class ProgressTracker {
  constructor(total) {
    this.total = total;
    this.current = 0;
    this.startTime = Date.now();
  }

  increment(amount = 1) {
    this.current += amount;
  }

  getProgress() {
    const elapsed = Date.now() - this.startTime;
    const percentage = (this.current / this.total) * 100;
    const rate = this.current / (elapsed / 1000);
    const remaining = this.total - this.current;
    const eta = remaining / rate * 1000;

    return {
      current: this.current,
      total: this.total,
      percentage: percentage.toFixed(2),
      elapsed,
      rate: rate.toFixed(2),
      eta,
      formattedElapsed: formatDuration(elapsed),
      formattedEta: formatDuration(eta)
    };
  }

  toString() {
    const progress = this.getProgress();
    return `${progress.current}/${progress.total} (${progress.percentage}%) - ETA: ${progress.formattedEta}`;
  }
}

export default {
  retry,
  sleep,
  formatDuration,
  formatBytes,
  deepMerge,
  ensureDir,
  readJSON,
  writeJSON,
  generateId,
  validateEnv,
  parseArgs,
  chunk,
  RateLimiter,
  ProgressTracker
};
