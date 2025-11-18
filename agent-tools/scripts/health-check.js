#!/usr/bin/env node
/**
 * Health check script - verifies agent-tools setup
 */

import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const checks = [];
let passed = 0;
let failed = 0;

function check(name, fn) {
  checks.push({ name, fn });
}

function log(icon, message) {
  console.log(`${icon} ${message}`);
}

// Environment checks
check('Environment file exists', () => {
  return existsSync(join(ROOT, '.env'));
});

check('Environment example exists', () => {
  return existsSync(join(ROOT, '.env.example'));
});

// Registry checks
check('Registry exists', () => {
  return existsSync(join(ROOT, 'core', 'registry.json'));
});

check('Registry has primitives', () => {
  const registry = JSON.parse(readFileSync(join(ROOT, 'core', 'registry.json'), 'utf-8'));
  return Object.keys(registry.primitives).length > 0;
});

check('Registry has workflows', () => {
  const registry = JSON.parse(readFileSync(join(ROOT, 'core', 'registry.json'), 'utf-8'));
  return Object.keys(registry.workflows).length > 0;
});

// Template checks
check('Primitive template exists', () => {
  return existsSync(join(ROOT, 'templates', 'primitive-template.js'));
});

check('Workflow template exists', () => {
  return existsSync(join(ROOT, 'templates', 'workflow-template.js'));
});

// Documentation checks
check('README exists', () => {
  return existsSync(join(ROOT, 'README.md'));
});

check('CONVENTIONS exists', () => {
  return existsSync(join(ROOT, 'CONVENTIONS.md'));
});

// Core services checks
check('Logger exists', () => {
  return existsSync(join(ROOT, 'core', 'logger', 'index.js'));
});

check('State manager exists', () => {
  return existsSync(join(ROOT, 'core', 'state', 'index.js'));
});

check('Event bus exists', () => {
  return existsSync(join(ROOT, 'core', 'events', 'index.js'));
});

check('Health monitor exists', () => {
  return existsSync(join(ROOT, 'core', 'health', 'index.js'));
});

// Directory checks
check('Temp directory exists', () => {
  return existsSync(join(ROOT, 'temp'));
});

check('Primitives directory exists', () => {
  return existsSync(join(ROOT, 'capabilities', 'primitives'));
});

check('Workflows directory exists', () => {
  return existsSync(join(ROOT, 'capabilities', 'workflows'));
});

// Run checks
console.log('\n🏥 Agent Tools Health Check\n');
console.log('═'.repeat(50));

for (const { name, fn } of checks) {
  try {
    const result = await fn();
    if (result) {
      log('✅', name);
      passed++;
    } else {
      log('❌', name);
      failed++;
    }
  } catch (error) {
    log('❌', `${name} (${error.message})`);
    failed++;
  }
}

console.log('═'.repeat(50));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('🎉 All checks passed! Agent tools is ready to use.\n');
  process.exit(0);
} else {
  console.log('⚠️  Some checks failed. Review the errors above.\n');
  console.log('Quick fixes:');
  console.log('  - Missing .env? Run: cp .env.example .env');
  console.log('  - Empty registry? Run: npm run register');
  console.log('  - Missing temp/? Run: mkdir -p temp/logs temp/state\n');
  process.exit(1);
}
