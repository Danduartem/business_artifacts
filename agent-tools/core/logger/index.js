#!/usr/bin/env node

/**
 * Centralized logging system for multi-agent coordination
 * Supports structured logging, multiple transports, and log levels
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAgentToolsRoot } from '../utils/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  TRACE: 4
};

const LEVEL_NAMES = ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'];

const COLORS = {
  ERROR: '\x1b[31m',
  WARN: '\x1b[33m',
  INFO: '\x1b[36m',
  DEBUG: '\x1b[35m',
  TRACE: '\x1b[90m',
  RESET: '\x1b[0m'
};

class Logger {
  constructor(options = {}) {
    this.level = options.level || 'INFO';
    this.agentId = options.agentId || 'unknown';
    this.toolName = options.toolName || 'unknown';
    this.sessionId = options.sessionId || this.generateSessionId();
    this.logDir = options.logDir || path.join(getAgentToolsRoot(), 'temp', 'logs');
    this.enableFile = options.enableFile !== false;
    this.enableConsole = options.enableConsole !== false;
    this.structured = options.structured || false;

    // Ensure log directory exists
    if (this.enableFile) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  generateSessionId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  shouldLog(level) {
    return LOG_LEVELS[level] <= LOG_LEVELS[this.level];
  }

  formatMessage(level, message, metadata = {}) {
    const timestamp = new Date().toISOString();

    if (this.structured) {
      return JSON.stringify({
        timestamp,
        level,
        agentId: this.agentId,
        toolName: this.toolName,
        sessionId: this.sessionId,
        message,
        ...metadata
      });
    }

    const metaStr = Object.keys(metadata).length > 0
      ? ` ${JSON.stringify(metadata)}`
      : '';

    return `[${timestamp}] [${level}] [${this.agentId}/${this.toolName}] ${message}${metaStr}`;
  }

  writeToFile(level, formattedMessage) {
    if (!this.enableFile) return;

    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(this.logDir, `${date}.log`);
    const errorLogFile = path.join(this.logDir, `${date}-error.log`);

    try {
      fs.appendFileSync(logFile, formattedMessage + '\n');

      // Also write errors to separate file
      if (level === 'ERROR') {
        fs.appendFileSync(errorLogFile, formattedMessage + '\n');
      }
    } catch (err) {
      console.error('Failed to write to log file:', err);
    }
  }

  writeToConsole(level, message, metadata) {
    if (!this.enableConsole) return;

    const color = COLORS[level];
    const reset = COLORS.RESET;
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(metadata).length > 0
      ? ` ${JSON.stringify(metadata)}`
      : '';

    console.error(
      `${color}[${timestamp}] [${level}] [${this.agentId}/${this.toolName}]${reset} ${message}${metaStr}`
    );
  }

  log(level, message, metadata = {}) {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, metadata);

    this.writeToFile(level, formattedMessage);
    this.writeToConsole(level, message, metadata);
  }

  error(message, metadata = {}) {
    this.log('ERROR', message, metadata);
  }

  warn(message, metadata = {}) {
    this.log('WARN', message, metadata);
  }

  info(message, metadata = {}) {
    this.log('INFO', message, metadata);
  }

  debug(message, metadata = {}) {
    this.log('DEBUG', message, metadata);
  }

  trace(message, metadata = {}) {
    this.log('TRACE', message, metadata);
  }

  // Create child logger with inherited context
  child(options = {}) {
    return new Logger({
      level: this.level,
      agentId: options.agentId || this.agentId,
      toolName: options.toolName || this.toolName,
      sessionId: options.sessionId || this.sessionId,
      logDir: this.logDir,
      enableFile: this.enableFile,
      enableConsole: this.enableConsole,
      structured: this.structured,
      ...options
    });
  }

  // Timer utility for performance tracking
  startTimer(label) {
    const start = Date.now();
    return {
      end: (metadata = {}) => {
        const duration = Date.now() - start;
        this.info(`${label} completed`, { duration, ...metadata });
        return duration;
      }
    };
  }
}

// Global logger instance
let globalLogger = null;

export function createLogger(options = {}) {
  return new Logger(options);
}

export function getLogger(options = {}) {
  if (!globalLogger) {
    globalLogger = new Logger(options);
  }
  return globalLogger;
}

export function setGlobalLogger(logger) {
  globalLogger = logger;
}

export default Logger;
