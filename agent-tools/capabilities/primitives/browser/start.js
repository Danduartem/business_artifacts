#!/usr/bin/env node

/**
 * PRIMITIVE: Start Browser
 *
 * Purpose: Launch Chrome with debugging enabled
 * Inputs: --profile (optional) - use existing profile
 * Outputs: Browser instance ID
 *
 * This is an ATOMIC operation - does one thing only.
 * Use in workflows to compose complex operations.
 */

import puppeteer from 'puppeteer-core';
import { spawn, spawnSync } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import os from 'os';
import { join } from 'path';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const DEFAULT_CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const REMOTE_DEBUGGING_URL = 'http://localhost:9222/json/version';
const HEADLESS_FLAGS = ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'];
const HOME_DIR = os.homedir();
const DEFAULT_PROFILE_PATH = join(HOME_DIR, 'Library/Application Support/Google/Chrome/Default');
const AUTOMATION_PROFILE_ROOT = join(HOME_DIR, '.cache', 'chrome-automation');

const logger = createLogger({ toolName: 'browser.start' });
const args = parseArgs();

async function startBrowser() {
  try {
    const forcedHeadless = args.flags.headless === true;
    const chromePath = args.flags['chrome-path'] || DEFAULT_CHROME_PATH;
    const killBeforeLaunch = args.flags['no-kill'] !== true;

    logger.info('Starting browser', {
      profile: args.flags.profile || false,
      headless: forcedHeadless,
      chromePath
    });

    if (!existsSync(chromePath)) {
      throw new Error(`Chrome binary not found at ${chromePath}. Pass --chrome-path to override.`);
    }

    if (killBeforeLaunch) {
      killChromeProcesses();
    }

    const userDataDir = prepareUserDataDirectory(!!args.flags.profile);

    // Check if Chrome is already running on port 9222
    let browserWSEndpoint;
    try {
      const response = await fetch(REMOTE_DEBUGGING_URL);
      const data = await response.json();
      browserWSEndpoint = data.webSocketDebuggerUrl;
      logger.info('Browser already running', { browserId: browserWSEndpoint });
    } catch (connectError) {
      // Chrome not running, launch it
      logger.info('Launching new Chrome instance');

      const baseArgs = [
        '--remote-debugging-port=9222',
        '--remote-allow-origins=*',  // Required for Chrome 90+
        '--no-first-run',
        '--no-default-browser-check',
        '--window-size=1920,1080',  // Force desktop size viewport
        '--window-position=0,0',
        `--user-data-dir=${userDataDir}`
      ];

      const launchModes = forcedHeadless ? ['headless'] : ['default', 'headless'];
      let lastError;

      for (const mode of launchModes) {
        const argsForMode = mode === 'headless' ? [...baseArgs, ...HEADLESS_FLAGS] : [...baseArgs];

        logger.info('Launching Chrome', { mode, chromePath });

        try {
          const chromeProcess = spawn(chromePath, argsForMode, {
            detached: true,
            stdio: 'ignore'
          });

          chromeProcess.unref();
        } catch (spawnError) {
          lastError = spawnError;
          logger.error('Failed to spawn Chrome', { mode, error: spawnError.message });
          continue;
        }

        try {
          const data = await waitForDebugger();
          browserWSEndpoint = data.webSocketDebuggerUrl;
          await verifyDebuggerConnection();
          logger.info('Chrome ready', { mode, browserId: browserWSEndpoint });
          break;
        } catch (waitError) {
          lastError = waitError;
          logger.warn('Chrome did not expose debugging port in time', {
            mode,
            error: waitError.message
          });

          if (mode === 'default' && !forcedHeadless) {
            logger.info('Falling back to headless launch');
            continue;
          }
        }
      }

      if (!browserWSEndpoint) {
        throw lastError || new Error('Chrome failed to start');
      }
    }

    const result = {
      success: true,
      browserId: browserWSEndpoint,
      port: 9222,
      profile: args.flags.profile || false,
      headless: forcedHeadless || false
    };

    // Output as JSON for tool chaining
    console.log(JSON.stringify(result));

    logger.info('Browser started', { browserId: browserWSEndpoint });

    // Exit cleanly so execSync can complete
    process.exit(0);

  } catch (error) {
    logger.error('Failed to start browser', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      headless: args.flags.headless || false
    }));

    process.exit(1);
  }
}

async function waitForDebugger(retries = 20, delayMs = 1000) {
  let attempts = retries;

  while (attempts > 0) {
    await new Promise(resolve => setTimeout(resolve, delayMs));
    try {
      const response = await fetch(REMOTE_DEBUGGING_URL);
      if (!response.ok) {
        throw new Error(`Debugger endpoint returned ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      attempts -= 1;
      if (attempts === 0) {
        throw new Error('Chrome failed to start after 10 seconds');
      }
    }
  }

  throw new Error('Debugger endpoint unavailable');
}

async function verifyDebuggerConnection() {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222',
    defaultViewport: null
  });
  await browser.disconnect();
}

function prepareUserDataDirectory(useProfile) {
  if (useProfile) {
    ensureDir(AUTOMATION_PROFILE_ROOT);
    const targetProfileDir = join(AUTOMATION_PROFILE_ROOT, 'Default');
    ensureDir(targetProfileDir);

    if (existsSync(DEFAULT_PROFILE_PATH)) {
      try {
        spawnSync('rsync', ['-a', '--delete', '--exclude=Service Worker', `${DEFAULT_PROFILE_PATH}/`, `${targetProfileDir}/`], { stdio: 'ignore' });
        logger.info('Synced Chrome profile to automation cache');
      } catch (err) {
        logger.warn('Profile sync failed, continuing with empty profile', { error: err.message });
      }
    } else {
      logger.warn('Default Chrome profile not found, continuing with blank profile', { path: DEFAULT_PROFILE_PATH });
    }

    return AUTOMATION_PROFILE_ROOT;
  }

  const tempDir = join(os.tmpdir(), 'chrome-temp-profile');
  try {
    rmSync(tempDir, { recursive: true, force: true });
  } catch {}
  mkdirSync(tempDir, { recursive: true });
  return tempDir;
}

function ensureDir(target) {
  if (!existsSync(target)) {
    mkdirSync(target, { recursive: true });
  }
}

function killChromeProcesses() {
  const commands = [
    ['pkill', '-f', 'Google Chrome'],
    ['pkill', '-f', 'Chromium'],
    ['pkill', '-f', 'chrome']
  ];

  for (const cmd of commands) {
    try {
      spawnSync(cmd[0], cmd.slice(1), { stdio: 'ignore' });
    } catch (err) {
      if (err.status && err.status !== 1) {
        logger.warn('Failed to kill process', { command: cmd.join(' '), error: err.message });
      }
    }
  }
}

startBrowser();
