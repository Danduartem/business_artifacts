#!/usr/bin/env node

/**
 * State management system for multi-agent coordination
 * Provides shared state, checkpointing, and recovery for long-running workflows
 */

import fs from 'fs';
import path from 'path';
import { createLogger } from '../logger/index.js';
import { getAgentToolsRoot } from '../utils/index.js';

const logger = createLogger({ toolName: 'state-manager' });

class StateManager {
  constructor(options = {}) {
    this.stateDir = options.stateDir || path.join(getAgentToolsRoot(), 'temp', 'state');
    this.namespace = options.namespace || 'default';
    this.autoSave = options.autoSave !== false;
    this.saveInterval = options.saveInterval || 5000; // 5 seconds
    this.state = {};
    this.listeners = new Map();
    this.saveTimer = null;

    // Ensure state directory exists
    fs.mkdirSync(this.stateDir, { recursive: true });

    // Load existing state
    this.load();

    // Setup auto-save
    if (this.autoSave) {
      this.startAutoSave();
    }
  }

  getStatePath() {
    return path.join(this.stateDir, `${this.namespace}.json`);
  }

  getCheckpointPath() {
    return path.join(this.stateDir, `${this.namespace}.checkpoint.json`);
  }

  load() {
    const statePath = this.getStatePath();

    try {
      if (fs.existsSync(statePath)) {
        const data = fs.readFileSync(statePath, 'utf8');
        this.state = JSON.parse(data);
        logger.info('State loaded', { namespace: this.namespace, keys: Object.keys(this.state).length });
      }
    } catch (err) {
      logger.error('Failed to load state', { error: err.message });
    }
  }

  save() {
    const statePath = this.getStatePath();

    try {
      const data = JSON.stringify(this.state, null, 2);
      fs.writeFileSync(statePath, data, 'utf8');
      logger.debug('State saved', { namespace: this.namespace, keys: Object.keys(this.state).length });
    } catch (err) {
      logger.error('Failed to save state', { error: err.message });
    }
  }

  startAutoSave() {
    if (this.saveTimer) {
      clearInterval(this.saveTimer);
    }

    this.saveTimer = setInterval(() => {
      this.save();
    }, this.saveInterval);
  }

  stopAutoSave() {
    if (this.saveTimer) {
      clearInterval(this.saveTimer);
      this.saveTimer = null;
    }
  }

  // Get value from state
  get(key, defaultValue = undefined) {
    const value = key.split('.').reduce((obj, k) => obj?.[k], this.state);
    return value !== undefined ? value : defaultValue;
  }

  // Set value in state
  set(key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, k) => {
      if (!obj[k]) obj[k] = {};
      return obj[k];
    }, this.state);

    const oldValue = target[lastKey];
    target[lastKey] = value;

    // Notify listeners
    this.notifyListeners(key, value, oldValue);

    logger.trace('State updated', { key, value: typeof value });
  }

  // Delete key from state
  delete(key) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, k) => obj?.[k], this.state);

    if (target) {
      delete target[lastKey];
      this.notifyListeners(key, undefined, target[lastKey]);
    }
  }

  // Check if key exists
  has(key) {
    return this.get(key) !== undefined;
  }

  // Get all keys
  keys() {
    return this.flattenKeys(this.state);
  }

  flattenKeys(obj, prefix = '') {
    let keys = [];
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys = keys.concat(this.flattenKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  }

  // Clear all state
  clear() {
    this.state = {};
    this.save();
    logger.info('State cleared', { namespace: this.namespace });
  }

  // Subscribe to state changes
  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key).push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(key);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    };
  }

  notifyListeners(key, newValue, oldValue) {
    const callbacks = this.listeners.get(key) || [];
    callbacks.forEach(callback => {
      try {
        callback(newValue, oldValue, key);
      } catch (err) {
        logger.error('Listener error', { key, error: err.message });
      }
    });
  }

  // Checkpoint management for recovery
  createCheckpoint() {
    const checkpointPath = this.getCheckpointPath();

    try {
      const checkpoint = {
        timestamp: new Date().toISOString(),
        state: this.state
      };

      fs.writeFileSync(checkpointPath, JSON.stringify(checkpoint, null, 2), 'utf8');
      logger.info('Checkpoint created', { namespace: this.namespace });
      return true;
    } catch (err) {
      logger.error('Failed to create checkpoint', { error: err.message });
      return false;
    }
  }

  restoreCheckpoint() {
    const checkpointPath = this.getCheckpointPath();

    try {
      if (fs.existsSync(checkpointPath)) {
        const data = fs.readFileSync(checkpointPath, 'utf8');
        const checkpoint = JSON.parse(data);
        this.state = checkpoint.state;
        this.save();
        logger.info('Checkpoint restored', {
          namespace: this.namespace,
          timestamp: checkpoint.timestamp
        });
        return true;
      }
      return false;
    } catch (err) {
      logger.error('Failed to restore checkpoint', { error: err.message });
      return false;
    }
  }

  // Export state for debugging
  export() {
    return JSON.parse(JSON.stringify(this.state));
  }

  // Import state
  import(data) {
    this.state = JSON.parse(JSON.stringify(data));
    this.save();
    logger.info('State imported', { namespace: this.namespace });
  }

  // Cleanup
  destroy() {
    this.stopAutoSave();
    this.save();
    this.listeners.clear();
  }
}

// Global state manager instance
let globalStateManager = null;

export function createStateManager(options = {}) {
  return new StateManager(options);
}

export function getStateManager(options = {}) {
  if (!globalStateManager) {
    globalStateManager = new StateManager(options);
  }
  return globalStateManager;
}

export function setGlobalStateManager(manager) {
  globalStateManager = manager;
}

export default StateManager;
