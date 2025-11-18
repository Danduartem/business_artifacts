#!/usr/bin/env node

/**
 * Central Configuration System for Business Artifacts
 *
 * This file provides centralized path management to avoid fragile
 * dirname() chains and hardcoded paths throughout the codebase.
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Root directories
 */
export const PATHS = {
  // Project root
  ROOT: __dirname,

  // Agent tools
  AGENT_TOOLS: join(__dirname, 'agent-tools'),
  VIDEO_PROCESSOR: join(__dirname, 'agent-tools/video-processor'),
  VIDEO_SCRIPTS: join(__dirname, 'agent-tools/video-processor/scripts'),
  NOTION_INTEGRATION: join(__dirname, 'agent-tools/notion-integration'),
  NOTION_SCRIPTS: join(__dirname, 'agent-tools/notion-integration/scripts'),
  AIRTABLE_INTEGRATION: join(__dirname, 'agent-tools/airtable-integration'),
  AIRTABLE_SCRIPTS: join(__dirname, 'agent-tools/airtable-integration/scripts'),

  // BMAD framework
  BMAD: join(__dirname, 'bmad'),
  BMAD_AGENTS: join(__dirname, 'bmad/agents'),
  CONTENT_DECODER: join(__dirname, 'bmad/agents/content-decoder'),
  BATCH_ANALYZE: join(__dirname, 'bmad/agents/content-decoder/workflows/batch-analyze'),

  // Temporary files
  TEMP: join(__dirname, 'temp'),

  // Business directories
  BUSINESSES: join(__dirname, 'businesses'),
};

/**
 * Commonly used scripts
 */
export const SCRIPTS = {
  VIDEO_URL_TRANSCRIBE: join(PATHS.VIDEO_SCRIPTS, 'video-url-transcribe.js'),
  BROWSER_SCREENSHOT: join(PATHS.VIDEO_SCRIPTS, 'browser-screenshot.js'),
  NOTION_QUERY: join(PATHS.NOTION_SCRIPTS, 'notion-query.js'),
  NOTION_SAVE: join(PATHS.NOTION_SCRIPTS, 'notion-save.js'),
  AIRTABLE_SAVE: join(PATHS.AIRTABLE_SCRIPTS, 'airtable-save.js'),
  AIRTABLE_TEST: join(PATHS.AIRTABLE_SCRIPTS, 'test-connection.js'),
  INSTAGRAM_SCRAPER: join(PATHS.VIDEO_SCRIPTS, 'instagram-scraper.js'),
};

/**
 * Helper function to get a script path
 * @param {string} scriptPath - Relative path from ROOT
 * @returns {string} Absolute path to the script
 */
export function getScript(scriptPath) {
  return join(PATHS.ROOT, scriptPath);
}

/**
 * Helper function to get a path within agent-tools
 * @param {string} toolPath - Relative path from agent-tools
 * @returns {string} Absolute path to the tool
 */
export function getAgentTool(toolPath) {
  return join(PATHS.AGENT_TOOLS, toolPath);
}

/**
 * Helper function to get a path within BMAD
 * @param {string} bmadPath - Relative path from bmad
 * @returns {string} Absolute path within BMAD
 */
export function getBmadPath(bmadPath) {
  return join(PATHS.BMAD, bmadPath);
}

/**
 * Helper function to get a temp directory path
 * @param {string} tempPath - Relative path from temp
 * @returns {string} Absolute path within temp
 */
export function getTempPath(tempPath = '') {
  return join(PATHS.TEMP, tempPath);
}

export default {
  PATHS,
  SCRIPTS,
  getScript,
  getAgentTool,
  getBmadPath,
  getTempPath,
};
