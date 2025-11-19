#!/usr/bin/env node
/**
 * Interactive Discovery CLI
 *
 * Guides users through discovering and executing tools
 * Makes proper usage (discovery + monitoring) the default
 */

import readline from 'readline';
import {
  getIndex,
  getJobsByCategory,
  getWorkflowsByCategory,
  executeJob
} from './discovery.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function selectFromList(items, formatter = (item) => item) {
  items.forEach((item, i) => {
    console.log(`  ${i + 1}. ${formatter(item)}`);
  });

  const answer = await question('\nSelect number (or q to quit): ');

  if (answer.toLowerCase() === 'q') {
    return null;
  }

  const index = parseInt(answer) - 1;
  if (index >= 0 && index < items.length) {
    return items[index];
  }

  console.log('Invalid selection, try again.\n');
  return await selectFromList(items, formatter);
}

async function collectParams(tool) {
  const params = {};

  console.log('\nParameters:');

  // Common parameters for Instagram jobs
  if (tool.id.includes('instagram')) {
    params.username = await question('  Username: ');
    params['start-date'] = await question('  Start date (YYYY-MM-DD): ');
    params['end-date'] = await question('  End date (YYYY-MM-DD): ');

    const useProfile = await question('  Use Chrome profile? (y/n, default: n): ');
    if (useProfile.toLowerCase() === 'y') {
      params.profile = true;
    }

    if (tool.id.includes('extraction')) {
      const transcribe = await question('  Transcribe videos? (y/n, default: y): ');
      params.transcribe = transcribe.toLowerCase() !== 'n';
    }
  }

  return params;
}

async function main() {
  console.log('🔍 Agent-Tools Interactive Discovery\n');
  console.log('This CLI guides you through discovering and executing tools');
  console.log('with automatic monitoring and progressive disclosure.\n');

  try {
    // Step 1: Load index
    console.log('Step 1: Loading tool index...');
    const index = getIndex();
    const categories = Object.keys(index.categories);
    console.log(`Found ${categories.length} categories\n`);

    // Step 2: Select category
    console.log('Step 2: Select a category:');
    const category = await selectFromList(categories, (cat) => {
      const info = index.categories[cat];
      const counts = [];
      if (info.jobs) counts.push(`${info.jobs} jobs`);
      if (info.workflows) counts.push(`${info.workflows} workflows`);
      return `${cat} (${counts.join(', ')})`;
    });

    if (!category) {
      console.log('Bye!');
      rl.close();
      return;
    }

    // Step 3: Select layer (jobs or workflows)
    console.log(`\nStep 3: Select tool type for ${category}:`);
    const layers = [];
    if (index.categories[category].jobs) layers.push('jobs');
    if (index.categories[category].workflows) layers.push('workflows');

    const layer = await selectFromList(layers, (l) => l);

    if (!layer) {
      console.log('Bye!');
      rl.close();
      return;
    }

    // Step 4: Load tools
    console.log(`\nStep 4: Loading ${category} ${layer}...`);
    const toolsData = layer === 'jobs'
      ? getJobsByCategory(category)
      : getWorkflowsByCategory(category);

    const tools = toolsData.tools;
    console.log(`Found ${tools.length} tools\n`);

    // Step 5: Select tool
    console.log('Step 5: Select a tool:');
    const tool = await selectFromList(tools, (t) => {
      return `${t.id}\n     ${t.when || t.description || 'No description'}`;
    });

    if (!tool) {
      console.log('Bye!');
      rl.close();
      return;
    }

    // Step 6: Show details
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Tool: ${tool.id}`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Description: ${tool.when || tool.description}`);
    if (tool.runtime) console.log(`Runtime: ${tool.runtime}`);
    if (tool.flags) console.log(`Flags: ${tool.flags.join(', ')}`);
    console.log('');

    // Step 7: Collect parameters
    const proceed = await question('Execute this tool? (y/n): ');
    if (proceed.toLowerCase() !== 'y') {
      console.log('Bye!');
      rl.close();
      return;
    }

    console.log('');
    const params = await collectParams(tool);

    // Confirm
    console.log('\nReview your configuration:');
    console.log(`  Tool: ${tool.id}`);
    console.log(`  Parameters:`);
    Object.entries(params).forEach(([key, value]) => {
      console.log(`    ${key}: ${value}`);
    });
    console.log('');

    const confirm = await question('Execute with these parameters? (y/n): ');
    if (confirm.toLowerCase() !== 'y') {
      console.log('Cancelled.');
      rl.close();
      return;
    }

    // Close readline before execution (so job output is clean)
    rl.close();

    // Step 8: Execute with monitoring
    console.log('\n' + '='.repeat(60));
    console.log('Executing with automatic monitoring...');
    console.log('='.repeat(60) + '\n');

    const result = await executeJob(tool.id, params, {
      verbose: true
    });

    // Step 9: Show results
    console.log('\n' + '='.repeat(60));
    console.log('Execution Complete');
    console.log('='.repeat(60));

    if (result.summary) {
      console.log('\nSummary:');
      Object.entries(result.summary).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
      });
    }

    if (result.outputFile) {
      console.log(`\nOutput file: ${result.outputFile}`);
    }

    if (result.duration) {
      console.log(`Duration: ${result.duration}`);
    }

    console.log('\n✅ Done!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    rl.close();
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export default main;
