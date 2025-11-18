#!/usr/bin/env node
/**
 * List all available tools from registry
 * Usage: node scripts/list-tools.js [--category browser] [--type primitives|workflows]
 */

import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from 'node:util';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const { values } = parseArgs({
  options: {
    category: { type: 'string', short: 'c' },
    type: { type: 'string', short: 't' },
    help: { type: 'boolean', short: 'h' }
  }
});

if (values.help) {
  console.log(`
Usage: node scripts/list-tools.js [options]

Options:
  --category, -c <name>    Filter by category (e.g., browser, page)
  --type, -t <type>        Filter by type (primitives or workflows)
  --help, -h               Show this help

Examples:
  node scripts/list-tools.js
  node scripts/list-tools.js --category browser
  node scripts/list-tools.js --type workflows
  node scripts/list-tools.js --category media --type primitives
  `);
  process.exit(0);
}

async function listTools() {
  const registryPath = join(ROOT, 'core', 'registry.json');
  const registry = JSON.parse(await readFile(registryPath, 'utf-8'));

  console.log('\n🔧 Agent Tools Catalog\n');
  console.log('═'.repeat(70));

  const types = values.type ? [values.type] : ['primitives', 'workflows'];

  for (const type of types) {
    const items = registry[type] || {};
    const categories = values.category ? [values.category] : Object.keys(items);

    for (const category of categories) {
      if (!items[category]) continue;

      const tools = items[category].tools || [];
      if (tools.length === 0) continue;

      console.log(`\n📦 ${type.charAt(0).toUpperCase() + type.slice(0, -1)}: ${category} (${tools.length})`);
      console.log('─'.repeat(70));

      for (const tool of tools) {
        console.log(`\n  ${tool.id}`);
        if (tool.description) {
          console.log(`  ${tool.description}`);
        }
        console.log(`  Path: ${tool.path}`);

        if (tool.inputs && tool.inputs.length > 0) {
          console.log(`  Inputs: ${tool.inputs.join(', ')}`);
        }

        if (tool.outputs && tool.outputs.length > 0) {
          console.log(`  Outputs: ${tool.outputs.join(', ')}`);
        }

        if (tool.envVars && tool.envVars.length > 0) {
          console.log(`  Env Vars: ${tool.envVars.join(', ')}`);
        }
      }
    }
  }

  console.log('\n' + '═'.repeat(70));

  // Summary
  let totalPrimitives = 0;
  let totalWorkflows = 0;

  for (const cat of Object.values(registry.primitives || {})) {
    totalPrimitives += cat.tools?.length || 0;
  }

  for (const cat of Object.values(registry.workflows || {})) {
    totalWorkflows += cat.tools?.length || 0;
  }

  console.log(`\n📊 Total: ${totalPrimitives} primitives, ${totalWorkflows} workflows\n`);
}

listTools().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
