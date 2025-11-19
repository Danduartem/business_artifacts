#!/usr/bin/env node
/**
 * Build split registry files for progressive disclosure
 *
 * Generates:
 * - core/registry/index.json (15 tokens)
 * - core/registry/{category}/primitives.json (100-250 tokens each)
 * - core/registry/{category}/workflows.json (80-150 tokens each)
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const REGISTRY_PATH = join(ROOT, 'core', 'registry.json');
const OUTPUT_DIR = join(ROOT, 'core', 'registry');

/**
 * Build index.json with category counts
 */
async function buildIndex(registry) {
  const index = {
    version: registry.version,
    updated: registry.lastUpdated,
    categories: {}
  };

  // Count primitives by category
  for (const [category, data] of Object.entries(registry.primitives || {})) {
    if (!index.categories[category]) {
      index.categories[category] = {};
    }
    index.categories[category].primitives = data.tools?.length || 0;
  }

  // Count workflows by category
  for (const [category, data] of Object.entries(registry.workflows || {})) {
    if (!index.categories[category]) {
      index.categories[category] = {};
    }
    index.categories[category].workflows = data.tools?.length || 0;
  }

  return index;
}

/**
 * Build category-specific files
 */
async function buildCategoryFiles(registry) {
  const categories = new Set([
    ...Object.keys(registry.primitives || {}),
    ...Object.keys(registry.workflows || {})
  ]);

  for (const category of categories) {
    const categoryDir = join(OUTPUT_DIR, category);

    // Create category directory
    await mkdir(categoryDir, { recursive: true });

    // Write primitives.json if exists
    if (registry.primitives?.[category]) {
      const primitivesPath = join(categoryDir, 'primitives.json');
      const primitives = {
        category,
        description: registry.primitives[category].description,
        tools: registry.primitives[category].tools.map(tool => ({
          id: tool.id,
          when: tool.when || tool.description,
          path: tool.path,
          flags: tool.flags || tool.inputs,
          capabilities: tool.capabilities,
          runtime: tool.runtime,
          envVars: tool.envVars,
          systemDependencies: tool.systemDependencies
        }))
      };

      await writeFile(primitivesPath, JSON.stringify(primitives, null, 2));
      console.log(`   ✓ ${category}/primitives.json (${primitives.tools.length} tools)`);
    }

    // Write workflows.json if exists
    if (registry.workflows?.[category]) {
      const workflowsPath = join(categoryDir, 'workflows.json');
      const workflows = {
        category,
        description: registry.workflows[category].description,
        tools: registry.workflows[category].tools.map(tool => ({
          id: tool.id,
          when: tool.when || tool.description,
          complexity: tool.complexity || 'low',
          path: tool.path,
          flags: tool.flags || tool.inputs,
          runtime: tool.runtime,
          features: tool.features || [],
          resumable: tool.resumable || false,
          composes: tool.composes
        }))
      };

      await writeFile(workflowsPath, JSON.stringify(workflows, null, 2));
      console.log(`   ✓ ${category}/workflows.json (${workflows.tools.length} tools)`);
    }
  }
}

/**
 * Main build function
 */
async function buildSplitRegistry() {
  console.log('📖 Reading registry.json...');

  if (!existsSync(REGISTRY_PATH)) {
    console.error('❌ registry.json not found. Run: npm run register');
    process.exit(1);
  }

  const registry = JSON.parse(await readFile(REGISTRY_PATH, 'utf-8'));

  console.log('🔨 Building index.json...');
  const index = await buildIndex(registry);
  const indexPath = join(OUTPUT_DIR, 'index.json');
  await writeFile(indexPath, JSON.stringify(index, null, 2));
  console.log('   ✓ index.json');

  console.log('🔨 Building category files...');
  await buildCategoryFiles(registry);

  console.log('\n✅ Split registry built successfully!');
  console.log('\n📊 Summary:');
  console.log(`   Categories: ${Object.keys(index.categories).length}`);
  for (const [category, counts] of Object.entries(index.categories)) {
    const parts = [];
    if (counts.primitives) parts.push(`${counts.primitives} primitives`);
    if (counts.workflows) parts.push(`${counts.workflows} workflows`);
    console.log(`     - ${category}: ${parts.join(', ')}`);
  }
}

// Run
buildSplitRegistry().catch(error => {
  console.error('❌ Failed to build split registry:', error);
  process.exit(1);
});
