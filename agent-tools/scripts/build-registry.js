#!/usr/bin/env node
/**
 * Auto-generate core/registry.json by scanning capabilities directory
 * Extracts metadata from JSDoc comments in tool files
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const REGISTRY_PATH = join(ROOT, 'core', 'registry.json');
const PRIMITIVES_PATH = join(ROOT, 'capabilities', 'primitives');
const WORKFLOWS_PATH = join(ROOT, 'capabilities', 'workflows');
const SCHEMAS_PATH = join(ROOT, 'schemas');

/**
 * Extract JSDoc metadata from file content
 */
function extractMetadata(content, filePath) {
  const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsdocMatch) return null;

  const jsdoc = jsdocMatch[1];
  const meta = {};

  // Extract @tool or @workflow (new format)
  const toolMatch = jsdoc.match(/@tool\s+(\S+)/);
  const workflowMatch = jsdoc.match(/@workflow\s+(\S+)/);
  if (toolMatch) meta.id = toolMatch[1];
  if (workflowMatch) meta.id = workflowMatch[1];

  // Fall back to old format: "PRIMITIVE:" or "WORKFLOW:"
  if (!meta.id) {
    const oldPrimitiveMatch = jsdoc.match(/PRIMITIVE:\s+(.+)/);
    const oldWorkflowMatch = jsdoc.match(/WORKFLOW:\s+(.+)/);

    if (oldPrimitiveMatch || oldWorkflowMatch) {
      // Infer ID from file path
      const pathParts = filePath.replace(ROOT + '/', '').split('/');
      if (pathParts.includes('primitives')) {
        const category = pathParts[pathParts.indexOf('primitives') + 1];
        const action = pathParts[pathParts.length - 1].replace('.js', '');
        meta.id = `${category}.${action}`;
        meta.category = category;
      } else if (pathParts.includes('workflows')) {
        const category = pathParts[pathParts.indexOf('workflows') + 1];
        const name = pathParts[pathParts.length - 1].replace('.js', '');
        meta.id = `workflow.${category}.${name}`;
        meta.category = category;
      }
    }
  }

  // Extract @description (new format)
  const descMatch = jsdoc.match(/@description\s+(.+)/);
  if (descMatch) meta.description = descMatch[1].trim();

  // Fall back to old format: "Purpose:"
  if (!meta.description) {
    const oldPurposeMatch = jsdoc.match(/Purpose:\s+(.+)/);
    if (oldPurposeMatch) meta.description = oldPurposeMatch[1].trim();
  }

  // Extract @category
  const catMatch = jsdoc.match(/@category\s+(\S+)/);
  if (catMatch) meta.category = catMatch[1];

  // Extract all @input (new format)
  const inputs = [];
  const inputMatches = jsdoc.matchAll(/@input\s+(\S+)\s+(\S+)\s+-\s+(.+)/g);
  for (const match of inputMatches) {
    inputs.push(match[1]); // Just the name
  }

  // Fall back to old format: "Inputs:"
  if (inputs.length === 0) {
    const oldInputMatch = jsdoc.match(/Inputs:\s+(.+)/);
    if (oldInputMatch) {
      // Parse simple format like "--profile (optional)"
      const inputText = oldInputMatch[1];
      const paramMatch = inputText.match(/--(\S+)/g);
      if (paramMatch) {
        inputs.push(...paramMatch.map(p => p.replace('--', '')));
      }
    }
  }

  if (inputs.length > 0) meta.inputs = inputs;

  // Extract all @output (new format)
  const outputs = [];
  const outputMatches = jsdoc.matchAll(/@output\s+(\S+)\s+(\S+)\s+-\s+(.+)/g);
  for (const match of outputMatches) {
    outputs.push(match[1]); // Just the name
  }

  // Fall back to old format: "Outputs:"
  if (outputs.length === 0) {
    const oldOutputMatch = jsdoc.match(/Outputs:\s+(.+)/);
    if (oldOutputMatch) {
      // Generic output - infer from content
      outputs.push('result', 'success');
    }
  }

  if (outputs.length > 0) meta.outputs = outputs;

  // Extract capabilities (inferred from id and description)
  const capabilities = [];
  if (meta.id) {
    const action = meta.id.split('.').pop();
    capabilities.push(action);
  }
  meta.capabilities = capabilities;

  // Extract @dependency
  const dependencies = [];
  const depMatches = jsdoc.matchAll(/@dependency\s+(\S+)/g);
  for (const match of depMatches) {
    dependencies.push(match[1]);
  }
  if (dependencies.length > 0) meta.dependencies = dependencies;

  // Extract @systemDependency
  const sysDeps = [];
  const sysDepsMatches = jsdoc.matchAll(/@systemDependency\s+(\S+)/g);
  for (const match of sysDepsMatches) {
    sysDeps.push(match[1]);
  }
  if (sysDeps.length > 0) meta.systemDependencies = sysDeps;

  // Extract @envVar
  const envVars = [];
  const envMatches = jsdoc.matchAll(/@envVar\s+(\S+)/g);
  for (const match of envMatches) {
    envVars.push(match[1]);
  }
  if (envVars.length > 0) meta.envVars = envVars;

  // Extract @composes (for workflows)
  const composesMatch = jsdoc.match(/@composes\s+(.+)/);
  if (composesMatch) {
    meta.composes = composesMatch[1].split(',').map(s => s.trim());
  }

  // Extract @example
  const exampleMatch = jsdoc.match(/@example\s+(.+)/);
  if (exampleMatch) meta.example = exampleMatch[1].trim();

  // Store relative path
  meta.path = filePath.replace(ROOT + '/', '');

  // Generate name from id
  if (meta.id) {
    const parts = meta.id.split('.');
    const name = parts[parts.length - 1]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    meta.name = name;
  }

  return meta;
}

/**
 * Scan directory for .js files and extract metadata
 */
async function scanDirectory(dirPath, basePath = dirPath) {
  const items = await readdir(dirPath, { withFileTypes: true });
  const results = [];

  for (const item of items) {
    const fullPath = join(dirPath, item.name);

    if (item.isDirectory() && item.name !== 'node_modules') {
      // Recurse into subdirectories
      const subResults = await scanDirectory(fullPath, basePath);
      results.push(...subResults);
    } else if (item.isFile() && item.name.endsWith('.js') && !item.name.includes('utils')) {
      // Parse JavaScript files (skip utils)
      const content = await readFile(fullPath, 'utf-8');
      const meta = extractMetadata(content, fullPath);

      if (meta && meta.id) {
        results.push(meta);
      }
    }
  }

  return results;
}

/**
 * Group primitives by category
 */
function groupPrimitivesByCategory(primitives) {
  const grouped = {};

  for (const primitive of primitives) {
    const category = primitive.category || 'other';

    if (!grouped[category]) {
      grouped[category] = {
        description: `Atomic ${category} operations`,
        tools: []
      };
    }

    grouped[category].tools.push(primitive);
  }

  return grouped;
}

/**
 * Group workflows by category
 */
function groupWorkflowsByCategory(workflows) {
  const grouped = {};

  for (const workflow of workflows) {
    const category = workflow.category || 'other';

    if (!grouped[category]) {
      grouped[category] = {
        description: `${category.charAt(0).toUpperCase() + category.slice(1)} workflows`,
        tools: []
      };
    }

    grouped[category].tools.push(workflow);
  }

  return grouped;
}

/**
 * Scan schema files
 */
async function scanSchemas() {
  if (!existsSync(SCHEMAS_PATH)) return {};

  const schemas = {};
  const items = await readdir(SCHEMAS_PATH);

  for (const item of items) {
    if (item.endsWith('.schema.json')) {
      const name = item.replace('.schema.json', '');
      schemas[name] = {
        path: `schemas/${item}`,
        description: `${name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} data structure`
      };
    }
  }

  return schemas;
}

/**
 * Build legacy section (deprecated - kept for backward compatibility)
 */
function buildLegacySection() {
  // No legacy tools - all functionality in primitives/workflows
  return {};
}

/**
 * Main build function
 */
async function buildRegistry() {
  console.log('🔍 Scanning for primitives...');
  const primitiveFiles = await scanDirectory(PRIMITIVES_PATH);
  console.log(`   Found ${primitiveFiles.length} primitives`);

  console.log('🔍 Scanning for workflows...');
  const workflowFiles = await scanDirectory(WORKFLOWS_PATH);
  console.log(`   Found ${workflowFiles.length} workflows`);

  console.log('🔍 Scanning for schemas...');
  const schemas = await scanSchemas();
  console.log(`   Found ${Object.keys(schemas).length} schemas`);

  const registry = {
    "$schema": "./registry.schema.json",
    "version": "2.0.0",
    "lastUpdated": new Date().toISOString(),
    "primitives": groupPrimitivesByCategory(primitiveFiles),
    "workflows": groupWorkflowsByCategory(workflowFiles),
    "schemas": schemas
  };

  // Write registry
  console.log('📝 Writing registry.json...');
  await writeFile(REGISTRY_PATH, JSON.stringify(registry, null, 2));
  console.log('✅ Registry built successfully!');

  // Print summary
  console.log('\n📊 Summary:');
  console.log(`   Primitives: ${primitiveFiles.length}`);
  Object.entries(registry.primitives).forEach(([cat, data]) => {
    console.log(`     - ${cat}: ${data.tools.length}`);
  });
  console.log(`   Workflows: ${workflowFiles.length}`);
  Object.entries(registry.workflows).forEach(([cat, data]) => {
    console.log(`     - ${cat}: ${data.tools.length}`);
  });
  console.log(`   Schemas: ${Object.keys(schemas).length}`);
  console.log(`\n📄 Registry saved to: ${REGISTRY_PATH}`);
}

// Run
buildRegistry().catch(error => {
  console.error('❌ Failed to build registry:', error);
  process.exit(1);
});
