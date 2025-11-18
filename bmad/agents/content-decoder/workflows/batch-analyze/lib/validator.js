#!/usr/bin/env node

/**
 * Instagram Content Validator
 * Validates analyzed posts against Notion schema and checks for duplicates
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SCRIPTS } from '@business-artifacts/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = join(__dirname, 'notion-schema.json');

/**
 * Load Notion schema
 */
function loadSchema() {
  return JSON.parse(readFileSync(SCHEMA_PATH, 'utf-8'));
}

/**
 * Query Notion for existing posts by URL
 */
function queryExistingPosts(urls) {
  try {
    console.log(`\n🔍 Checking for ${urls.length} existing posts in Notion...`);

    // Use --json flag for parseable output
    const result = execSync(
      `node "${SCRIPTS.NOTION_QUERY}" --limit 1000 --json`,
      { encoding: 'utf-8', stdio: 'pipe' }
    );

    // Parse the result to extract URLs
    const existingUrls = new Set();

    try {
      // notion-query.js with --json returns array of pages directly
      const pages = JSON.parse(result.trim());

      if (Array.isArray(pages)) {
        pages.forEach(page => {
          const url = page.properties?.URL?.url;
          if (url) existingUrls.add(url);
        });
      }
    } catch (parseError) {
      console.warn('⚠️  Could not parse existing posts, proceeding without deduplication');
      console.warn('   Error:', parseError.message);
      return new Set();
    }

    console.log(`✓ Found ${existingUrls.size} existing posts in Notion`);
    return existingUrls;

  } catch (error) {
    console.warn('⚠️  Could not query Notion, proceeding without deduplication');
    console.warn('   Error:', error.message);
    return new Set();
  }
}

/**
 * Validate category against schema options
 */
function validateCategory(propertyName, values, schema) {
  const property = schema.properties[propertyName];

  if (!property) {
    console.warn(`⚠️  Property "${propertyName}" not found in schema`);
    return values;
  }

  if (!property.options) {
    // No validation needed for non-select properties
    return values;
  }

  const validValues = Array.isArray(values) ? values : [values];
  const validated = [];

  for (const value of validValues) {
    if (property.options.includes(value)) {
      validated.push(value);
    } else {
      // Find closest match
      const closest = findClosestMatch(value, property.options);
      console.warn(`⚠️  "${value}" not in ${propertyName}, using "${closest}" instead`);
      validated.push(closest);
    }
  }

  return Array.isArray(values) ? validated : validated[0];
}

/**
 * Find closest matching option
 */
function findClosestMatch(value, options) {
  const valueLower = value.toLowerCase();

  // Exact match (case insensitive)
  for (const option of options) {
    if (option.toLowerCase() === valueLower) {
      return option;
    }
  }

  // Partial match
  for (const option of options) {
    if (option.toLowerCase().includes(valueLower) || valueLower.includes(option.toLowerCase())) {
      return option;
    }
  }

  // Default to first option
  return options[0];
}

/**
 * Validate and deduplicate posts
 */
export async function validateAndDedupe(posts, profile) {
  console.log(`\n🔍 Validating ${posts.length} posts...`);

  const schema = loadSchema();
  const existingUrls = queryExistingPosts(posts.map(p => p.url));

  const validated = [];
  let duplicates = 0;
  let errors = 0;

  for (const post of posts) {
    try {
      // Check for duplicates
      if (existingUrls.has(post.url)) {
        console.log(`⏭️  Skipping duplicate: ${post.url}`);
        duplicates++;
        continue;
      }

      // Validate post data (if analyzed)
      if (post.notionData) {
        // Validate categories
        if (post.notionData['Categoria do Hook']) {
          const categories = post.notionData['Categoria do Hook'].multi_select.map(c => c.name);
          const validated = validateCategory('Categoria do Hook', categories, schema);
          post.notionData['Categoria do Hook'].multi_select = validated.map(name => ({ name }));
        }

        if (post.notionData['Framework']) {
          const framework = post.notionData['Framework'].select.name;
          const validated = validateCategory('Framework', framework, schema);
          post.notionData['Framework'].select.name = validated;
        }

        if (post.notionData['Tipo de CTA']) {
          const cta = post.notionData['Tipo de CTA'].select.name;
          const validated = validateCategory('Tipo de CTA', cta, schema);
          post.notionData['Tipo de CTA'].select.name = validated;
        }

        if (post.notionData['Tom Emocional']) {
          const tones = post.notionData['Tom Emocional'].multi_select.map(t => t.name);
          const validated = validateCategory('Tom Emocional', tones, schema);
          post.notionData['Tom Emocional'].multi_select = validated.map(name => ({ name }));
        }

        if (post.notionData['Estilo Visual']) {
          const styles = post.notionData['Estilo Visual'].multi_select.map(s => s.name);
          const validated = validateCategory('Estilo Visual', styles, schema);
          post.notionData['Estilo Visual'].multi_select = validated.map(name => ({ name }));
        }

        if (post.notionData['Formato']) {
          const format = post.notionData['Formato'].select.name;
          const validated = validateCategory('Formato', format, schema);
          post.notionData['Formato'].select.name = validated;
        }
      }

      validated.push(post);

    } catch (error) {
      console.error(`✗ Error validating ${post.url}:`, error.message);
      errors++;
    }
  }

  console.log(`\n✓ Validation complete:`);
  console.log(`  - Valid posts: ${validated.length}`);
  console.log(`  - Duplicates skipped: ${duplicates}`);
  console.log(`  - Errors: ${errors}`);

  return validated;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const postsFile = process.argv[2];
  const profile = process.argv[3] || 'unknown';

  if (!postsFile) {
    console.error('Usage: validator.js <posts.json> [profile]');
    process.exit(1);
  }

  const posts = JSON.parse(readFileSync(postsFile, 'utf-8'));
  validateAndDedupe(posts, profile).then(() => process.exit(0));
}
