#!/usr/bin/env node

/**
 * Health check system for monitoring tool and agent status
 * Provides health checks, status reporting, and failure detection
 */

import { createLogger } from '../logger/index.js';
import { getEventBus, EVENTS } from '../events/index.js';

const logger = createLogger({ toolName: 'health-monitor' });
const eventBus = getEventBus();

const HEALTH_STATUS = {
  HEALTHY: 'healthy',
  DEGRADED: 'degraded',
  UNHEALTHY: 'unhealthy',
  UNKNOWN: 'unknown'
};

class HealthMonitor {
  constructor(options = {}) {
    this.checks = new Map();
    this.checkInterval = options.checkInterval || 30000; // 30 seconds
    this.healthTimer = null;
    this.enableAutoCheck = options.enableAutoCheck !== false;

    if (this.enableAutoCheck) {
      this.startAutoCheck();
    }
  }

  registerCheck(name, checkFn, options = {}) {
    this.checks.set(name, {
      fn: checkFn,
      timeout: options.timeout || 5000,
      critical: options.critical !== false,
      metadata: options.metadata || {},
      lastCheck: null,
      lastStatus: HEALTH_STATUS.UNKNOWN,
      lastError: null
    });

    logger.info(`Health check registered: ${name}`, {
      critical: options.critical !== false
    });
  }

  async runCheck(name) {
    const check = this.checks.get(name);
    if (!check) {
      throw new Error(`Health check not found: ${name}`);
    }

    const startTime = Date.now();

    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Health check timeout')), check.timeout);
      });

      const result = await Promise.race([
        check.fn(),
        timeoutPromise
      ]);

      const duration = Date.now() - startTime;

      check.lastCheck = new Date().toISOString();
      check.lastStatus = result.status || HEALTH_STATUS.HEALTHY;
      check.lastError = null;

      return {
        name,
        status: check.lastStatus,
        duration,
        message: result.message || 'OK',
        metadata: { ...check.metadata, ...result.metadata },
        timestamp: check.lastCheck
      };
    } catch (err) {
      const duration = Date.now() - startTime;

      check.lastCheck = new Date().toISOString();
      check.lastStatus = HEALTH_STATUS.UNHEALTHY;
      check.lastError = err.message;

      logger.error(`Health check failed: ${name}`, {
        error: err.message,
        duration
      });

      return {
        name,
        status: HEALTH_STATUS.UNHEALTHY,
        duration,
        message: err.message,
        error: err.message,
        timestamp: check.lastCheck
      };
    }
  }

  async runAll() {
    const results = [];
    const promises = [];

    for (const name of this.checks.keys()) {
      promises.push(
        this.runCheck(name).then(result => {
          results.push(result);
          return result;
        })
      );
    }

    await Promise.all(promises);

    // Determine overall status
    let overallStatus = HEALTH_STATUS.HEALTHY;
    let hasUnhealthy = false;
    let hasDegraded = false;

    results.forEach(result => {
      const check = this.checks.get(result.name);
      if (result.status === HEALTH_STATUS.UNHEALTHY && check.critical) {
        hasUnhealthy = true;
      } else if (result.status === HEALTH_STATUS.DEGRADED) {
        hasDegraded = true;
      }
    });

    if (hasUnhealthy) {
      overallStatus = HEALTH_STATUS.UNHEALTHY;
    } else if (hasDegraded) {
      overallStatus = HEALTH_STATUS.DEGRADED;
    }

    const summary = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      checks: results,
      summary: {
        total: results.length,
        healthy: results.filter(r => r.status === HEALTH_STATUS.HEALTHY).length,
        degraded: results.filter(r => r.status === HEALTH_STATUS.DEGRADED).length,
        unhealthy: results.filter(r => r.status === HEALTH_STATUS.UNHEALTHY).length
      }
    };

    // Publish health check event
    eventBus.publish(EVENTS.HEALTH_CHECK, summary, {
      source: 'health-monitor'
    });

    return summary;
  }

  startAutoCheck() {
    if (this.healthTimer) {
      clearInterval(this.healthTimer);
    }

    this.healthTimer = setInterval(async () => {
      try {
        await this.runAll();
      } catch (err) {
        logger.error('Auto health check failed', { error: err.message });
      }
    }, this.checkInterval);

    logger.info('Auto health check started', {
      interval: this.checkInterval
    });
  }

  stopAutoCheck() {
    if (this.healthTimer) {
      clearInterval(this.healthTimer);
      this.healthTimer = null;
      logger.info('Auto health check stopped');
    }
  }

  getStatus(name) {
    const check = this.checks.get(name);
    if (!check) {
      return null;
    }

    return {
      name,
      status: check.lastStatus,
      lastCheck: check.lastCheck,
      lastError: check.lastError,
      metadata: check.metadata
    };
  }

  getAllStatus() {
    const statuses = [];
    for (const [name, check] of this.checks.entries()) {
      statuses.push({
        name,
        status: check.lastStatus,
        lastCheck: check.lastCheck,
        lastError: check.lastError,
        critical: check.critical,
        metadata: check.metadata
      });
    }
    return statuses;
  }

  removeCheck(name) {
    this.checks.delete(name);
    logger.info(`Health check removed: ${name}`);
  }

  destroy() {
    this.stopAutoCheck();
    this.checks.clear();
    logger.info('Health monitor destroyed');
  }
}

// Common health check helpers
export function createDependencyCheck(name, checkFn) {
  return async () => {
    try {
      const result = await checkFn();
      return {
        status: result ? HEALTH_STATUS.HEALTHY : HEALTH_STATUS.UNHEALTHY,
        message: result ? `${name} is available` : `${name} is not available`
      };
    } catch (err) {
      return {
        status: HEALTH_STATUS.UNHEALTHY,
        message: `${name} check failed: ${err.message}`
      };
    }
  };
}

export function createApiHealthCheck(url, options = {}) {
  return async () => {
    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        timeout: options.timeout || 5000
      });

      if (response.ok) {
        return {
          status: HEALTH_STATUS.HEALTHY,
          message: 'API is responding'
        };
      } else {
        return {
          status: HEALTH_STATUS.DEGRADED,
          message: `API returned status ${response.status}`
        };
      }
    } catch (err) {
      return {
        status: HEALTH_STATUS.UNHEALTHY,
        message: `API is unreachable: ${err.message}`
      };
    }
  };
}

// Global health monitor instance
let globalHealthMonitor = null;

export function createHealthMonitor(options = {}) {
  return new HealthMonitor(options);
}

export function getHealthMonitor(options = {}) {
  if (!globalHealthMonitor) {
    globalHealthMonitor = new HealthMonitor(options);
  }
  return globalHealthMonitor;
}

export function setGlobalHealthMonitor(monitor) {
  globalHealthMonitor = monitor;
}

export { HEALTH_STATUS };
export default HealthMonitor;
