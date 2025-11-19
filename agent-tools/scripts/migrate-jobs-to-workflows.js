#!/usr/bin/env node
/**
 * Migrate jobs to workflows
 *
 * This script:
 * 1. Moves job files from capabilities/jobs/ to capabilities/workflows/
 * 2. Updates JSDoc headers from @job to @workflow
 * 3. Updates tool IDs (removes "job." prefix)
 * 4. Adds @complexity and @resumable tags based on existing @orchestrates
 * 5. Updates @orchestrates to @composes
 */

import { readdir, readFile, writeFile, rename, mkdir } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const JOBS_PATH = join(ROOT, 'capabilities', 'jobs');
const WORKFLOWS_PATH = join(ROOT, 'capabilities', 'workflows');

/**
 * Update JSDoc header in file content
 */
function updateJSDoc(content, filePath) {
  const filename = basename(filePath, '.js');

  // Extract existing JSDoc
  const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsdocMatch) {
    console.log(`   ⚠ No JSDoc found in ${filename}`);
    return content;
  }

  let jsdoc = jsdocMatch[1];

  // 1. Replace @job with @workflow and update ID
  jsdoc = jsdoc.replace(/@job\s+(\S+)/g, (match, id) => {
    // Remove "job." prefix if present and shorten
    let newId = id.replace(/^job\./, '');

    // Shorten common patterns
    newId = newId.replace('bulk-content-extraction', 'bulk-extraction');
    newId = newId.replace('complete-profile-extraction', 'profile-extraction');
    newId = newId.replace('process-existing-urls', 'process-urls');

    return `@workflow ${newId}`;
  });

  // 2. Add @when if not present (use description)
  if (!jsdoc.includes('@when')) {
    const descMatch = jsdoc.match(/@description\s+(.+)/);
    if (descMatch) {
      const description = descMatch[1].trim();
      jsdoc = jsdoc.replace(/@description\s+.+/, `@when ${description}\n * @complexity high`);
    }
  }

  // 3. Add @complexity high (jobs are complex by nature)
  if (!jsdoc.includes('@complexity')) {
    jsdoc = jsdoc.replace(/@when\s+.+/, '$&\n * @complexity high');
  }

  // 4. Add @resumable true (jobs support resume)
  if (!jsdoc.includes('@resumable')) {
    jsdoc = jsdoc.replace(/@complexity\s+\w+/, '$&\n * @resumable true');
  }

  // 5. Replace @orchestrates with @composes
  jsdoc = jsdoc.replace(/@orchestrates\s+/g, '@composes ');

  // 6. Convert @input to @flag (shorter)
  jsdoc = jsdoc.replace(/@input\s+(\S+)\s+\S+\s+-\s+(.+?)(\(required\))?$/gm, (match, name, desc, required) => {
    return `@flag ${name} ${required ? '(required)' : ''}`.trim();
  });

  // 7. Add @runtime if not present
  if (!jsdoc.includes('@runtime')) {
    jsdoc = jsdoc.replace(/@resumable\s+\w+/, '$&\n * @runtime hours');
  }

  // 8. Remove @output (not needed in split registry)
  jsdoc = jsdoc.replace(/\s+\*\s+@output\s+.+/g, '');

  // Rebuild content with updated JSDoc
  const newJSDoc = `/**${jsdoc}*/`;
  return content.replace(/\/\*\*[\s\S]*?\*\//, newJSDoc);
}

/**
 * Migrate a single job file
 */
async function migrateJobFile(jobPath, category) {
  const filename = basename(jobPath);
  const content = await readFile(jobPath, 'utf-8');

  // Update JSDoc
  const updatedContent = updateJSDoc(content, jobPath);

  // Determine new filename (shorten if needed)
  let newFilename = filename;
  if (filename.includes('bulk-content-extraction')) {
    newFilename = filename.replace('bulk-content-extraction', 'bulk-extraction');
  } else if (filename.includes('complete-profile-extraction')) {
    newFilename = filename.replace('complete-profile-extraction', 'profile-extraction');
  } else if (filename.includes('process-existing-urls')) {
    newFilename = filename.replace('process-existing-urls', 'process-urls');
  }

  // Create destination path
  const workflowCategoryPath = join(WORKFLOWS_PATH, category);
  await mkdir(workflowCategoryPath, { recursive: true });

  const destPath = join(workflowCategoryPath, newFilename);

  // Write updated content
  await writeFile(destPath, updatedContent);

  return {
    from: jobPath,
    to: destPath,
    category,
    filename: newFilename
  };
}

/**
 * Main migration function
 */
async function migrateJobs() {
  console.log('🔄 Migrating jobs to workflows...\n');

  if (!existsSync(JOBS_PATH)) {
    console.log('   ℹ No jobs directory found. Nothing to migrate.');
    return;
  }

  const categories = await readdir(JOBS_PATH, { withFileTypes: true });
  const migrated = [];

  for (const categoryDir of categories) {
    if (!categoryDir.isDirectory()) continue;

    const category = categoryDir.name;
    const categoryPath = join(JOBS_PATH, category);
    const files = await readdir(categoryPath);

    const jsFiles = files.filter(f => f.endsWith('.js'));

    if (jsFiles.length === 0) {
      console.log(`   ℹ ${category}: No job files found`);
      continue;
    }

    console.log(`📂 ${category}:`);

    for (const file of jsFiles) {
      const jobPath = join(categoryPath, file);
      const result = await migrateJobFile(jobPath, category);
      migrated.push(result);

      console.log(`   ✓ ${file} → workflows/${category}/${result.filename}`);
    }

    console.log();
  }

  console.log(`✅ Migrated ${migrated.length} job files to workflows\n`);

  console.log('📋 Next steps:');
  console.log('   1. Review migrated files in capabilities/workflows/');
  console.log('   2. Run: npm run register');
  console.log('   3. Test workflows to ensure they work');
  console.log('   4. Run: node scripts/delete-jobs-infrastructure.js');

  return migrated;
}

// Run
migrateJobs().catch(error => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
