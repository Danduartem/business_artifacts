#!/usr/bin/env node

/**
 * Migrate Workflows to v3.0.0 Format
 *
 * Fixes:
 * 1. Convert WORKFLOW: format to @workflow format
 * 2. Add @when field based on Purpose/description
 * 3. Add @complexity field (low/medium/high)
 * 4. Add @category field based on directory
 * 5. Convert @input/@output to @flag
 * 6. Change parseArgs import from core/utils to node:util
 * 7. Fix logger names to match tool IDs
 * 8. Standardize JSDoc structure
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const WORKFLOWS_DIR = join(__dirname, '../capabilities/workflows');

// Track changes
let migratedCount = 0;
let skippedCount = 0;
const errors = [];

console.log('🔧 Migrating Workflows to v3.0.0 Format\n');

function extractCategory(filePath) {
  const parts = filePath.split('/');
  const workflowsIndex = parts.indexOf('workflows');
  if (workflowsIndex >= 0 && parts.length > workflowsIndex + 1) {
    return parts[workflowsIndex + 1];
  }
  return 'unknown';
}

function extractToolId(filePath) {
  const category = extractCategory(filePath);
  const name = basename(filePath, '.js');
  return `${category}.${name}`;
}

function extractWhen(content) {
  // Try @description first
  const descMatch = content.match(/@description\s+(.+)/);
  if (descMatch) {
    return descMatch[1].trim();
  }

  // Try Purpose
  const purposeMatch = content.match(/\*\s*Purpose:\s*(.+)/i);
  if (purposeMatch) {
    return purposeMatch[1].trim();
  }

  // Try WORKFLOW: line
  const workflowMatch = content.match(/\*\s*WORKFLOW:\s*(.+)/i);
  if (workflowMatch) {
    return workflowMatch[1].trim();
  }

  return 'TODO: Add use case description';
}

function guessComplexity(content, when) {
  // Check for high complexity indicators
  if (content.includes('createStateManager') ||
      content.includes('@resumable') ||
      content.includes('checkpoint') ||
      when.toLowerCase().includes('bulk') ||
      when.toLowerCase().includes('multiple profiles')) {
    return 'high';
  }

  // Check for medium complexity indicators
  if (content.includes('executePrimitive') &&
      (content.match(/executePrimitive/g) || []).length > 5) {
    return 'medium';
  }

  // Default to low
  return 'low';
}

function extractFlags(content) {
  const flags = [];

  // Extract from @input tags
  const inputMatches = content.matchAll(/@input\s+(\S+)\s+(\S+)\s*-\s*(.+?)(?:\(([^)]+)\))?$/gm);
  for (const match of inputMatches) {
    const [, name, type, description, required] = match;
    const req = required?.toLowerCase().includes('required') ? ' (required)' : ' (optional)';
    flags.push(` * @flag ${name} - ${description.trim()}${req}`);
  }

  // Extract from @output tags (convert to flags for documentation)
  const outputMatches = content.matchAll(/@output\s+(\S+)\s+(\S+)\s*-\s*(.+)/gm);
  for (const match of outputMatches) {
    // Skip outputs, they're return values not flags
  }

  // Extract from @flag tags (already correct)
  const flagMatches = content.matchAll(/@flag\s+(.+)/g);
  for (const match of flagMatches) {
    if (!flags.some(f => f.includes(match[1]))) {
      flags.push(` * @flag ${match[1]}`);
    }
  }

  return flags.length > 0 ? flags : [' * @flag input - TODO: Add parameter description'];
}

function migrateWorkflow(filePath) {
  const filename = basename(filePath);

  // Skip utils file
  if (filename === 'workflow-utils.js') {
    console.log(`⏭️  Skipping utils file: ${filename}`);
    skippedCount++;
    return;
  }

  try {
    const content = readFileSync(filePath, 'utf8');

    // Check if already fully migrated
    if (content.includes('@workflow ') &&
        content.includes('@when ') &&
        content.includes('@complexity ') &&
        !content.includes('@input ') &&
        !content.includes('core/utils')) {
      console.log(`⏭️  Skipping (already migrated): ${filename}`);
      skippedCount++;
      return;
    }

    const toolId = extractToolId(filePath);
    const category = extractCategory(filePath);
    const when = extractWhen(content);
    const complexity = guessComplexity(content, when);
    const flags = extractFlags(content);

    // Extract @composes if present
    const composesMatch = content.match(/@composes\s+(.+)/);
    const composes = composesMatch ? ` * @composes ${composesMatch[1]}` : '';

    // Build new JSDoc
    const newJSDoc = `#!/usr/bin/env node
/**
 * @workflow ${toolId}
 * @when ${when}
 * @complexity ${complexity}
 * @category ${category}
 *${composes ? '\n' + composes + '\n *' : ''}
${flags.join('\n')}
 *
 * @example
 * node ${basename(filePath)} --param value
 */`;

    // Remove old JSDoc (everything from shebang to first import)
    let newContent = content
      .replace(/^#!\/usr\/bin\/env node[\s\S]*?(?=^import )/m, newJSDoc + '\n\n')
      // Fix parseArgs import
      .replace(
        /import\s*{\s*parseArgs\s*}\s*from\s*['"]\.\.\/\.\.\/\.\.\/core\/utils\/index\.js['"]/g,
        "import { parseArgs } from 'node:util'"
      );

    // Fix logger name (match tool ID)
    const loggerMatches = newContent.matchAll(/createLogger\(\{\s*toolName:\s*['"]([^'"]+)['"]/g);
    for (const match of loggerMatches) {
      const oldName = match[1];
      if (oldName !== toolId) {
        console.log(`   🔧 Fixing logger name: ${oldName} → ${toolId}`);
        newContent = newContent.replace(
          new RegExp(`toolName:\\s*['"]${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g'),
          `toolName: '${toolId}'`
        );
      }
    }

    // Fix state manager namespace (remove old prefixes)
    newContent = newContent.replace(
      /namespace:\s*['"](?:job|workflow)[-.]([^'"]+)['"]/g,
      (match, name) => {
        const newName = `workflow-${name}`;
        console.log(`   🔧 Fixing state namespace: ${match} → '${newName}'`);
        return `namespace: '${newName}'`;
      }
    );

    // Write back
    writeFileSync(filePath, newContent, 'utf8');

    console.log(`✅ Migrated: ${filename}`);
    console.log(`   Tool ID: ${toolId}`);
    console.log(`   @when: ${when}`);
    console.log(`   @complexity: ${complexity}`);
    migratedCount++;

  } catch (error) {
    console.error(`❌ Error migrating ${filename}: ${error.message}`);
    errors.push({ file: filename, error: error.message });
  }
}

function processDirectory(dir) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Recurse into subdirectories
      processDirectory(fullPath);
    } else if (entry.endsWith('.js')) {
      migrateWorkflow(fullPath);
    }
  }
}

// Run migration
console.log(`📂 Scanning: ${WORKFLOWS_DIR}\n`);
processDirectory(WORKFLOWS_DIR);

console.log('\n' + '='.repeat(70));
console.log('📊 MIGRATION SUMMARY');
console.log('='.repeat(70));
console.log(`✅ Migrated: ${migratedCount} files`);
console.log(`⏭️  Skipped: ${skippedCount} files`);
console.log(`❌ Errors: ${errors.length} files`);

if (errors.length > 0) {
  console.log('\n❌ ERRORS:');
  errors.forEach(({ file, error }) => {
    console.log(`   ${file}: ${error}`);
  });
}

console.log('\n✨ Migration complete!');
console.log('\n📝 NEXT STEPS:');
console.log('   1. Review changes: git diff capabilities/workflows');
console.log('   2. Rebuild registry: npm run register');
console.log('   3. Test sample workflows');
console.log('');

process.exit(errors.length > 0 ? 1 : 0);
