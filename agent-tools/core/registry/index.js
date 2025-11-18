#!/usr/bin/env node

/**
 * Tool registry system for capability discovery
 * Provides programmatic access to tool metadata and capabilities
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createLogger } from '../logger/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = createLogger({ toolName: 'registry' });

class ToolRegistry {
  constructor(options = {}) {
    this.registryPath = options.registryPath || path.join(__dirname, '..', 'registry.json');
    this.registry = null;
    this.load();
  }

  load() {
    try {
      const content = fs.readFileSync(this.registryPath, 'utf8');
      this.registry = JSON.parse(content);
      logger.info('Registry loaded', {
        version: this.registry.version,
        capabilities: Object.keys(this.registry.capabilities).length
      });
    } catch (err) {
      logger.error('Failed to load registry', { error: err.message });
      throw err;
    }
  }

  reload() {
    this.load();
  }

  // Get all capabilities
  getCapabilities() {
    return Object.keys(this.registry.capabilities);
  }

  // Get tools for a specific capability
  getToolsByCapability(capability) {
    const cap = this.registry.capabilities[capability];
    return cap ? cap.tools : [];
  }

  // Get tool by ID
  getTool(toolId) {
    for (const capability of Object.values(this.registry.capabilities)) {
      const tool = capability.tools.find(t => t.id === toolId);
      if (tool) return tool;
    }
    return null;
  }

  // Search tools by capability
  searchByCapability(capabilityName) {
    const results = [];

    for (const [category, capability] of Object.entries(this.registry.capabilities)) {
      for (const tool of capability.tools) {
        if (tool.capabilities.includes(capabilityName)) {
          results.push({
            ...tool,
            category
          });
        }
      }
    }

    return results;
  }

  // Search tools by input type
  searchByInput(inputType) {
    const results = [];

    for (const [category, capability] of Object.entries(this.registry.capabilities)) {
      for (const tool of capability.tools) {
        if (tool.inputs && tool.inputs.includes(inputType)) {
          results.push({
            ...tool,
            category
          });
        }
      }
    }

    return results;
  }

  // Search tools by output type
  searchByOutput(outputType) {
    const results = [];

    for (const [category, capability] of Object.entries(this.registry.capabilities)) {
      for (const tool of capability.tools) {
        if (tool.outputs && tool.outputs.includes(outputType)) {
          results.push({
            ...tool,
            category
          });
        }
      }
    }

    return results;
  }

  // Get workflow by ID
  getWorkflow(workflowId) {
    return this.registry.workflows?.[workflowId] || null;
  }

  // Get all workflows
  getWorkflows() {
    return this.registry.workflows || {};
  }

  // Find workflow by tools involved
  findWorkflowsByTool(toolId) {
    const results = [];

    for (const [id, workflow] of Object.entries(this.registry.workflows || {})) {
      if (workflow.steps.some(step => step.tool === toolId)) {
        results.push({
          id,
          ...workflow
        });
      }
    }

    return results;
  }

  // Get schema reference
  getSchema(schemaId) {
    return this.registry.schemas?.[schemaId] || null;
  }

  // Get tool dependencies (recursive)
  getToolDependencies(toolId, visited = new Set()) {
    if (visited.has(toolId)) return [];

    visited.add(toolId);
    const tool = this.getTool(toolId);

    if (!tool) return [];

    const dependencies = [];

    if (tool.requires) {
      for (const depId of tool.requires) {
        dependencies.push(depId);
        dependencies.push(...this.getToolDependencies(depId, visited));
      }
    }

    return [...new Set(dependencies)];
  }

  // Check if tool is available (dependencies installed)
  async isToolAvailable(toolId) {
    const tool = this.getTool(toolId);
    if (!tool) return false;

    // Check system dependencies
    if (tool.systemDependencies) {
      for (const dep of tool.systemDependencies) {
        try {
          const { execSync } = await import('child_process');
          execSync(`which ${dep}`, { stdio: 'ignore' });
        } catch {
          logger.warn(`System dependency missing: ${dep}`, { tool: toolId });
          return false;
        }
      }
    }

    // Check environment variables
    if (tool.envVars) {
      for (const envVar of tool.envVars) {
        if (!process.env[envVar]) {
          logger.warn(`Environment variable missing: ${envVar}`, { tool: toolId });
          return false;
        }
      }
    }

    return true;
  }

  // Get tool path (absolute)
  getToolPath(toolId) {
    const tool = this.getTool(toolId);
    if (!tool) return null;

    const basePath = path.join(__dirname, '../..');
    return path.join(basePath, tool.path);
  }

  // Get tool entrypoint (absolute)
  getToolEntrypoint(toolId) {
    const tool = this.getTool(toolId);
    if (!tool) return null;

    const toolPath = this.getToolPath(toolId);
    if (tool.entrypoint) {
      return path.join(toolPath, tool.entrypoint);
    }

    return toolPath;
  }

  // Generate dependency graph (for visualization)
  generateDependencyGraph() {
    const graph = {
      nodes: [],
      edges: []
    };

    for (const capability of Object.values(this.registry.capabilities)) {
      for (const tool of capability.tools) {
        graph.nodes.push({
          id: tool.id,
          label: tool.name,
          type: 'tool'
        });

        if (tool.requires) {
          for (const depId of tool.requires) {
            graph.edges.push({
              from: tool.id,
              to: depId,
              type: 'requires'
            });
          }
        }
      }
    }

    return graph;
  }

  // Export registry stats
  getStats() {
    const stats = {
      version: this.registry.version,
      capabilities: Object.keys(this.registry.capabilities).length,
      tools: 0,
      workflows: Object.keys(this.registry.workflows || {}).length,
      schemas: Object.keys(this.registry.schemas || {}).length
    };

    for (const capability of Object.values(this.registry.capabilities)) {
      stats.tools += capability.tools.length;
    }

    return stats;
  }

  // Validate registry structure
  validate() {
    const errors = [];

    // Check required fields
    if (!this.registry.version) {
      errors.push('Missing registry version');
    }

    if (!this.registry.capabilities) {
      errors.push('Missing capabilities');
    }

    // Validate tools
    for (const [capName, capability] of Object.entries(this.registry.capabilities)) {
      if (!capability.tools) {
        errors.push(`Missing tools in capability: ${capName}`);
        continue;
      }

      for (const tool of capability.tools) {
        if (!tool.id) {
          errors.push(`Tool missing ID in capability: ${capName}`);
        }

        if (!tool.capabilities || tool.capabilities.length === 0) {
          errors.push(`Tool ${tool.id} has no capabilities listed`);
        }

        // Check if tool path exists
        const toolPath = this.getToolPath(tool.id);
        if (toolPath && !fs.existsSync(toolPath)) {
          errors.push(`Tool ${tool.id} path does not exist: ${toolPath}`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Global registry instance
let globalRegistry = null;

export function createRegistry(options = {}) {
  return new ToolRegistry(options);
}

export function getRegistry(options = {}) {
  if (!globalRegistry) {
    globalRegistry = new ToolRegistry(options);
  }
  return globalRegistry;
}

export function setGlobalRegistry(registry) {
  globalRegistry = registry;
}

export default ToolRegistry;
