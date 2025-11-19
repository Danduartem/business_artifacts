#!/usr/bin/env node

/**
 * Migrate Primitives to v3.0.0 Format
 *
 * Fixes:
 * 1. Convert PRIMITIVE: format to @tool format
 * 2. Add @when field based on Purpose
 * 3. Add @category field based on directory
 * 4. Convert Inputs to @flag declarations
 * 5. Change parseArgs import from core/utils to node:util
 * 6. Standardize JSDoc structure
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PRIMITIVES_DIR = join(__dirname, '../capabilities/primitives');

// Track changes
let migratedCount = 0;
let skippedCount = 0;
const errors = [];

console.log('🔧 Migrating Primitives to v3.0.0 Format\n');

function extractCategory(filePath) {
  const parts = filePath.split('/');
  const primitivesIndex = parts.indexOf('primitives');
  if (primitivesIndex >= 0 && parts.length > primitivesIndex + 1) {
    return parts[primitivesIndex + 1];
  }
  return 'unknown';
}

function extractToolId(filePath) {
  const category = extractCategory(filePath);
  const action = basename(filePath, '.js');
  return `${category}.${action}`;
}

function extractPurposeAsWhen(content) {
  // Try to extract from Purpose line
  const purposeMatch = content.match(/\*\s*Purpose:\s*(.+)/i);
  if (purposeMatch) {
    return purposeMatch[1].trim();
  }

  // Fallback: try to extract from PRIMITIVE: line
  const primitiveMatch = content.match(/\*\s*PRIMITIVE:\s*(.+)/i);
  if (primitiveMatch) {
    return primitiveMatch[1].trim();
  }

  return 'TODO: Add use case description';
}

function extractFlags(content) {
  const flags = [];
  const inputsSection = content.match(/\*\s*Inputs:([\s\S]*?)(?:\*\s*Outputs:|$)/i);

  if (inputsSection) {
    const inputLines = inputsSection[1].split('\n');

    for (const line of inputLines) {
      // Match patterns like:
      // *   --selector (required) - CSS selector
      // *   --all (optional) - extract all
      const flagMatch = line.match(/\*\s*--([a-z-]+)\s*\(?(required|optional)?\)?(?:\s*-\s*)?(.+)?/i);
      if (flagMatch) {
        const [, name, required, description] = flagMatch;
        const desc = description?.trim() || 'TODO: Add description';
        const req = required?.toLowerCase() === 'required' ? ' (required)' : ' (optional)';
        flags.push(` * @flag ${name} - ${desc}${req}`);
      }
    }
  }

  return flags.length > 0 ? flags : [' * @flag param - TODO: Add parameter description'];
}

function migratePrimitive(filePath) {
  const filename = basename(filePath);

  try {
    const content = readFileSync(filePath, 'utf8');

    // Check if already migrated
    if (content.includes('@tool ')) {
      console.log(`⏭️  Skipping (already migrated): ${filename}`);
      skippedCount++;
      return;
    }

    // Check if it's an old PRIMITIVE: format
    if (!content.includes('PRIMITIVE:')) {
      console.log(`⏭️  Skipping (not old format): ${filename}`);
      skippedCount++;
      return;
    }

    const toolId = extractToolId(filePath);
    const category = extractCategory(filePath);
    const when = extractPurposeAsWhen(content);
    const flags = extractFlags(content);

    // Build new JSDoc
    const newJSDoc = `#!/usr/bin/env node

/**
 * @tool ${toolId}
 * @when ${when}
 * @category ${category}
 *
${flags.join('\n')}
 *
 * @example
 * node ${basename(filePath)} --param value
 */`;

    // Remove old JSDoc (everything from shebang to first import)
    const newContent = content
      .replace(/^#!\/usr\/bin\/env node[\s\S]*?(?=^import )/m, newJSDoc + '\n\n')
      // Fix parseArgs import
      .replace(
        /import\s*{\s*parseArgs\s*}\s*from\s*['"]\.\.\/\.\.\/\.\.\/core\/utils\/index\.js['"]/g,
        "import { parseArgs } from 'node:util'"
      );

    // Write back
    writeFileSync(filePath, newContent, 'utf8');

    console.log(`✅ Migrated: ${filename}`);
    console.log(`   Tool ID: ${toolId}`);
    console.log(`   @when: ${when}`);
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
      // Skip utils directories
      if (entry === 'utils') {
        console.log(`⏭️  Skipping utils directory: ${fullPath}`);
        continue;
      }

      // Recurse into subdirectories
      processDirectory(fullPath);
    } else if (entry.endsWith('.js')) {
      migratePrimitive(fullPath);
    }
  }
}

// Run migration
console.log(`📂 Scanning: ${PRIMITIVES_DIR}\n`);
processDirectory(PRIMITIVES_DIR);

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
console.log('   1. Review changes: git diff capabilities/primitives');
console.log('   2. Rebuild registry: npm run register');
console.log('   3. Test sample primitives');
console.log('');

process.exit(errors.length > 0 ? 1 : 0);
