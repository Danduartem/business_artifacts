#!/usr/bin/env node

/**
 * Event bus system for multi-agent coordination
 * Enables publish-subscribe pattern for loosely coupled agent communication
 */

import { EventEmitter } from 'events';
import fs from 'fs';
import path from 'path';
import { createLogger } from '../logger/index.js';
import { getAgentToolsRoot } from '../utils/index.js';

const logger = createLogger({ toolName: 'event-bus' });

class EventBus extends EventEmitter {
  constructor(options = {}) {
    super();
    this.setMaxListeners(options.maxListeners || 100);
    this.eventLog = [];
    this.enableLogging = options.enableLogging !== false;
    this.logDir = options.logDir || path.join(getAgentToolsRoot(), 'temp', 'events');
    this.persistEvents = options.persistEvents || false;

    if (this.enableLogging || this.persistEvents) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  publish(eventName, data = {}, metadata = {}) {
    const event = {
      name: eventName,
      data,
      metadata: {
        timestamp: new Date().toISOString(),
        source: metadata.source || 'unknown',
        agentId: metadata.agentId,
        correlationId: metadata.correlationId,
        ...metadata
      }
    };

    // Log event
    if (this.enableLogging) {
      this.eventLog.push(event);
      logger.debug(`Event published: ${eventName}`, {
        source: event.metadata.source,
        agentId: event.metadata.agentId
      });
    }

    // Persist event if enabled
    if (this.persistEvents) {
      this.persistEvent(event);
    }

    // Emit the event
    this.emit(eventName, event);

    // Also emit to wildcard listeners
    this.emit('*', event);

    return event.metadata.timestamp;
  }

  subscribe(eventName, handler, options = {}) {
    const wrappedHandler = (event) => {
      try {
        // Filter by source if specified
        if (options.source && event.metadata.source !== options.source) {
          return;
        }

        // Filter by agentId if specified
        if (options.agentId && event.metadata.agentId !== options.agentId) {
          return;
        }

        handler(event.data, event.metadata);
      } catch (err) {
        logger.error(`Error in event handler for ${eventName}`, {
          error: err.message,
          stack: err.stack
        });
      }
    };

    this.on(eventName, wrappedHandler);

    // Return unsubscribe function
    return () => {
      this.off(eventName, wrappedHandler);
    };
  }

  subscribeOnce(eventName, handler, options = {}) {
    const wrappedHandler = (event) => {
      try {
        // Filter by source if specified
        if (options.source && event.metadata.source !== options.source) {
          return;
        }

        handler(event.data, event.metadata);
      } catch (err) {
        logger.error(`Error in one-time event handler for ${eventName}`, {
          error: err.message
        });
      }
    };

    this.once(eventName, wrappedHandler);
  }

  // Subscribe to all events
  subscribeAll(handler) {
    return this.subscribe('*', handler);
  }

  // Wait for an event (returns promise)
  waitFor(eventName, options = {}) {
    const timeout = options.timeout || 30000; // 30 seconds default

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.off(eventName, handler);
        reject(new Error(`Timeout waiting for event: ${eventName}`));
      }, timeout);

      const handler = (event) => {
        // Filter by source if specified
        if (options.source && event.metadata.source !== options.source) {
          return;
        }

        clearTimeout(timer);
        this.off(eventName, handler);
        resolve(event);
      };

      this.on(eventName, handler);
    });
  }

  // Request-response pattern
  async request(requestEvent, responseEvent, data, options = {}) {
    const correlationId = this.generateCorrelationId();
    const timeout = options.timeout || 30000;

    // Setup response handler
    const responsePromise = this.waitFor(responseEvent, {
      ...options,
      timeout
    });

    // Publish request
    this.publish(requestEvent, data, {
      ...options.metadata,
      correlationId,
      responseEvent
    });

    // Wait for response
    return responsePromise;
  }

  generateCorrelationId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  persistEvent(event) {
    try {
      const date = new Date().toISOString().split('T')[0];
      const eventFile = path.join(this.logDir, `${date}-events.jsonl`);
      fs.appendFileSync(eventFile, JSON.stringify(event) + '\n');
    } catch (err) {
      logger.error('Failed to persist event', { error: err.message });
    }
  }

  getEventLog(options = {}) {
    const limit = options.limit || 100;
    const eventName = options.eventName;
    const source = options.source;

    let filtered = this.eventLog;

    if (eventName) {
      filtered = filtered.filter(e => e.name === eventName);
    }

    if (source) {
      filtered = filtered.filter(e => e.metadata.source === source);
    }

    return filtered.slice(-limit);
  }

  clearEventLog() {
    this.eventLog = [];
    logger.info('Event log cleared');
  }

  getStats() {
    const eventCounts = {};
    this.eventLog.forEach(event => {
      eventCounts[event.name] = (eventCounts[event.name] || 0) + 1;
    });

    return {
      totalEvents: this.eventLog.length,
      eventCounts,
      listenerCounts: this.eventNames().reduce((acc, name) => {
        acc[name] = this.listenerCount(name);
        return acc;
      }, {})
    };
  }

  // Cleanup
  destroy() {
    this.removeAllListeners();
    this.eventLog = [];
    logger.info('Event bus destroyed');
  }
}

// Global event bus instance
let globalEventBus = null;

export function createEventBus(options = {}) {
  return new EventBus(options);
}

export function getEventBus(options = {}) {
  if (!globalEventBus) {
    globalEventBus = new EventBus(options);
  }
  return globalEventBus;
}

export function setGlobalEventBus(bus) {
  globalEventBus = bus;
}

// Common event names
export const EVENTS = {
  // Tool lifecycle
  TOOL_STARTED: 'tool.started',
  TOOL_COMPLETED: 'tool.completed',
  TOOL_FAILED: 'tool.failed',

  // Agent coordination
  AGENT_STARTED: 'agent.started',
  AGENT_HEARTBEAT: 'agent.heartbeat',
  AGENT_COMPLETED: 'agent.completed',
  AGENT_FAILED: 'agent.failed',

  // Workflow
  WORKFLOW_STARTED: 'workflow.started',
  WORKFLOW_STEP_COMPLETED: 'workflow.step.completed',
  WORKFLOW_COMPLETED: 'workflow.completed',
  WORKFLOW_FAILED: 'workflow.failed',

  // Data
  DATA_EXTRACTED: 'data.extracted',
  DATA_TRANSFORMED: 'data.transformed',
  DATA_STORED: 'data.stored',

  // System
  HEALTH_CHECK: 'system.health',
  ERROR: 'system.error',
  WARNING: 'system.warning'
};

export default EventBus;
