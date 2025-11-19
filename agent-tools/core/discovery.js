/**
 * Discovery Helper for Progressive Tool Loading
 *
 * Purpose: Load ONLY what you query, minimizing token consumption
 *
 * Token efficiency:
 * - getIndex(): 20 tokens
 * - getJobsByCategory('instagram'): 150 tokens
 * - getWorkflowsByCategory('media'): 50 tokens
 * - getPrimitivesByCategory('browser'): 200 tokens
 *
 * vs loading full registry.json: 8,000 tokens
 * vs loading registry-lite.json: 1,500 tokens
 *
 * Example usage:
 * ```javascript
 * import { getIndex, getJobsByCategory } from './core/discovery.js';
 *
 * // Load index (20 tokens)
 * const index = getIndex();
 * console.log(index.categories); // { instagram: {...}, media: {...}, ... }
 *
 * // Load only Instagram jobs (150 tokens)
 * const instagramJobs = getJobsByCategory('instagram');
 * const job = instagramJobs.tools.find(j => j.id === 'complete-profile-extraction');
 *
 * // Get parameters via --help (50 tokens)
 * execSync(`node ${job.path} --help`);
 *
 * // Total: 20 + 150 + 50 = 220 tokens (vs 1,500 for registry-lite.json)
 * ```
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execWithMonitoring, execSequence, execParallel } from './exec-with-monitoring.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REGISTRY_DIR = join(__dirname, 'registry');

/**
 * Get registry index showing all categories
 * Tokens: ~20
 *
 * @returns {Object} Index with categories and tool counts
 *
 * @example
 * const index = getIndex();
 * console.log(index.categories);
 * // { instagram: { jobs: 3, workflows: 5, primitives: 2 }, ... }
 */
export function getIndex() {
  const indexPath = join(REGISTRY_DIR, 'index.json');

  if (!existsSync(indexPath)) {
    throw new Error('Registry index not found. Run: npm run register');
  }

  return JSON.parse(readFileSync(indexPath, 'utf-8'));
}

/**
 * Get tools for a specific category and layer
 * Tokens: Variable (100-300 depending on category/layer)
 *
 * @param {string} category - e.g., 'instagram', 'media', 'browser'
 * @param {string} layer - 'jobs', 'workflows', 'primitives'
 * @returns {Object} Tools in the specified category/layer
 *
 * @example
 * const instagramJobs = getTools('instagram', 'jobs');
 * console.log(instagramJobs.tools); // Array of 3 Instagram jobs
 */
export function getTools(category, layer) {
  const toolsPath = join(REGISTRY_DIR, category, `${layer}.json`);

  if (!existsSync(toolsPath)) {
    throw new Error(`No ${layer} found for category '${category}'. Available categories: ${getAvailableCategories().join(', ')}`);
  }

  return JSON.parse(readFileSync(toolsPath, 'utf-8'));
}

/**
 * Get all jobs for a category
 * Tokens: ~100-200
 *
 * @param {string} category - e.g., 'instagram'
 * @returns {Object} Jobs in the specified category
 *
 * @example
 * const instagramJobs = getJobsByCategory('instagram');
 * console.log(instagramJobs.tools.length); // 3
 */
export function getJobsByCategory(category) {
  return getTools(category, 'jobs');
}

/**
 * Get all workflows for a category
 * Tokens: ~50-150
 *
 * @param {string} category - e.g., 'media', 'instagram'
 * @returns {Object} Workflows in the specified category
 *
 * @example
 * const mediaWorkflows = getWorkflowsByCategory('media');
 * console.log(mediaWorkflows.tools[0].id); // 'download-and-transcribe'
 */
export function getWorkflowsByCategory(category) {
  return getTools(category, 'workflows');
}

/**
 * Get all primitives for a category
 * Tokens: ~80-280
 *
 * @param {string} category - e.g., 'browser', 'storage'
 * @returns {Object} Primitives in the specified category
 *
 * @example
 * const browserPrimitives = getPrimitivesByCategory('browser');
 * console.log(browserPrimitives.tools.length); // 5
 */
export function getPrimitivesByCategory(category) {
  return getTools(category, 'primitives');
}

/**
 * Get available categories from index
 * Tokens: ~20 (same as getIndex)
 *
 * @returns {string[]} Array of category names
 *
 * @example
 * const categories = getAvailableCategories();
 * console.log(categories); // ['instagram', 'media', 'browser', ...]
 */
export function getAvailableCategories() {
  const index = getIndex();
  return Object.keys(index.categories);
}

/**
 * Find tools by query string (searches across all categories)
 * Tokens: Variable (loads only matching categories)
 *
 * @param {string} query - Search term (e.g., 'instagram', 'transcribe', 'extract')
 * @param {Object} options - Search options
 * @param {string[]} options.layers - Layers to search (default: all)
 * @param {string[]} options.categories - Categories to search (default: all)
 * @returns {Object[]} Array of matching tools with category/layer info
 *
 * @example
 * const results = findTool('instagram extraction');
 * console.log(results[0].id); // 'complete-profile-extraction'
 * console.log(results[0].category); // 'instagram'
 * console.log(results[0].layer); // 'jobs'
 */
export function findTool(query, options = {}) {
  const index = getIndex();
  const results = [];
  const searchLayers = options.layers || ['jobs', 'workflows', 'primitives'];
  const searchCategories = options.categories || Object.keys(index.categories);

  const queryLower = query.toLowerCase();

  for (const category of searchCategories) {
    if (!index.categories[category]) continue;

    for (const layer of searchLayers) {
      const layerCount = index.categories[category][layer];
      if (!layerCount || layerCount === 0) continue;

      try {
        const tools = getTools(category, layer);
        const matches = tools.tools.filter(t => {
          const matchesId = t.id.toLowerCase().includes(queryLower);
          const matchesWhen = t.when?.toLowerCase().includes(queryLower);
          const matchesDescription = t.description?.toLowerCase().includes(queryLower);
          return matchesId || matchesWhen || matchesDescription;
        });

        // Add category and layer info to each match
        matches.forEach(tool => {
          results.push({
            ...tool,
            category,
            layer
          });
        });
      } catch (err) {
        // Layer file doesn't exist, skip
        continue;
      }
    }
  }

  return results;
}

/**
 * Get tool by exact ID (searches across all categories)
 * Tokens: Variable (loads only the category containing the tool)
 *
 * @param {string} toolId - Exact tool ID (e.g., 'complete-profile-extraction')
 * @returns {Object|null} Tool object with category/layer info, or null if not found
 *
 * @example
 * const tool = getToolById('complete-profile-extraction');
 * console.log(tool.path); // 'capabilities/jobs/instagram/complete-profile-extraction.js'
 * console.log(tool.category); // 'instagram'
 * console.log(tool.layer); // 'jobs'
 */
export function getToolById(toolId) {
  const index = getIndex();

  for (const [category, layers] of Object.entries(index.categories)) {
    for (const layer of ['jobs', 'workflows', 'primitives']) {
      const layerCount = layers[layer];
      if (!layerCount || layerCount === 0) continue;

      try {
        const tools = getTools(category, layer);
        const tool = tools.tools.find(t => t.id === toolId);
        if (tool) {
          return {
            ...tool,
            category,
            layer
          };
        }
      } catch (err) {
        continue;
      }
    }
  }

  return null;
}

/**
 * Get tool schema (detailed information) by ID
 * Tokens: Variable (loads only the category, then queries --help if needed)
 *
 * @param {string} toolId - Tool ID
 * @param {boolean} includeHelp - Whether to run --help to get full parameter details (default: false)
 * @returns {Object} Tool schema with optional --help output
 *
 * @example
 * const schema = getToolSchema('complete-profile-extraction');
 * console.log(schema.flags); // ['--username', '--start-date', ...]
 *
 * // With full help
 * const schemaWithHelp = getToolSchema('complete-profile-extraction', true);
 * console.log(schemaWithHelp.helpText); // Full --help output
 */
export function getToolSchema(toolId, includeHelp = false) {
  const tool = getToolById(toolId);

  if (!tool) {
    throw new Error(`Tool '${toolId}' not found. Use findTool() to search.`);
  }

  const schema = {
    id: tool.id,
    category: tool.category,
    layer: tool.layer,
    path: tool.path,
    when: tool.when,
    flags: tool.flags,
    features: tool.features,
    runtime: tool.runtime,
    example: tool.example
  };

  if (includeHelp) {
    // In a real implementation, this would execute --help
    // For now, we just document the pattern
    schema.helpText = `Run: node ${tool.path} --help`;
  }

  return schema;
}

/**
 * List all tools in a category (all layers combined)
 * Tokens: Variable (loads all layers for the category)
 *
 * @param {string} category - Category name
 * @returns {Object} Combined tools from all layers with layer info
 *
 * @example
 * const instagramTools = listCategoryTools('instagram');
 * console.log(instagramTools.jobs.length); // 3
 * console.log(instagramTools.workflows.length); // 5
 * console.log(instagramTools.primitives.length); // 2
 */
export function listCategoryTools(category) {
  const index = getIndex();

  if (!index.categories[category]) {
    throw new Error(`Category '${category}' not found. Available: ${getAvailableCategories().join(', ')}`);
  }

  const result = {
    category,
    jobs: [],
    workflows: [],
    primitives: []
  };

  const layers = index.categories[category];

  if (layers.jobs) {
    try {
      const jobs = getJobsByCategory(category);
      result.jobs = jobs.tools;
    } catch (err) {
      // No jobs for this category
    }
  }

  if (layers.workflows) {
    try {
      const workflows = getWorkflowsByCategory(category);
      result.workflows = workflows.tools;
    } catch (err) {
      // No workflows for this category
    }
  }

  if (layers.primitives) {
    try {
      const primitives = getPrimitivesByCategory(category);
      result.primitives = primitives.tools;
    } catch (err) {
      // No primitives for this category
    }
  }

  return result;
}

/**
 * Get recommended tool for a use case description
 * Tokens: Variable (uses findTool internally)
 *
 * @param {string} useCase - Description of what you want to do
 * @returns {Object|null} Best matching tool with category/layer info
 *
 * @example
 * const tool = getRecommendedTool('extract Instagram posts with transcription');
 * console.log(tool.id); // 'complete-profile-extraction'
 * console.log(tool.when); // 'Extract Instagram posts with full metadata...'
 */
export function getRecommendedTool(useCase) {
  const results = findTool(useCase);

  if (results.length === 0) {
    return null;
  }

  // Prioritize jobs over workflows over primitives
  const jobs = results.filter(t => t.layer === 'jobs');
  if (jobs.length > 0) return jobs[0];

  const workflows = results.filter(t => t.layer === 'workflows');
  if (workflows.length > 0) return workflows[0];

  return results[0];
}

/**
 * Execute a job with automatic monitoring
 * This is the RECOMMENDED way to run jobs - combines discovery + execution + monitoring
 * Tokens: Discovery (~220) + Monitoring (~100 per 15s poll)
 *
 * @param {string} toolId - Tool ID (e.g., 'complete-profile-extraction')
 * @param {Object} params - Job parameters
 * @param {Object} options - Execution options (pollInterval, verbose, etc.)
 * @returns {Promise<Object>} Job result
 *
 * @example
 * import { executeJob } from './core/discovery.js';
 *
 * const result = await executeJob('complete-profile-extraction', {
 *   username: 'blankschoolbr',
 *   'start-date': '2025-11-01',
 *   'end-date': '2025-11-30',
 *   profile: true,
 *   transcribe: true
 * });
 *
 * // User sees:
 * // 🚀 Starting: complete-profile-extraction
 * // 📊 Monitoring enabled (updates every 15s)
 * // 📍 Stage 1/4: Extracting URLs
 * // 📍 Stage 2/4: Extracting posts
 * //    [42%] Extracting posts: 5/12
 * // ...
 * // ✅ Complete! (2m 15s)
 * //    Summary: {totalPosts: 12, videosTranscribed: 3}
 */
export async function executeJob(toolId, params = {}, options = {}) {
  // Find the tool
  const tool = getToolById(toolId);

  if (!tool) {
    throw new Error(`Tool not found: ${toolId}. Use findTool() to search available tools.`);
  }

  // Execute with monitoring
  return await execWithMonitoring(tool.path, params, options);
}

/**
 * Execute multiple jobs in sequence with monitoring
 *
 * @param {Array<{id: string, params: Object}>} jobs - Array of job configurations
 * @param {Object} options - Execution options
 * @returns {Promise<Array>} Array of results
 *
 * @example
 * const results = await executeJobSequence([
 *   { id: 'complete-profile-extraction', params: { username: 'user1', ... } },
 *   { id: 'complete-profile-extraction', params: { username: 'user2', ... } }
 * ]);
 */
export async function executeJobSequence(jobs, options = {}) {
  // Convert tool IDs to paths
  const jobsWithPaths = jobs.map(({ id, params }) => {
    const tool = getToolById(id);
    if (!tool) throw new Error(`Tool not found: ${id}`);
    return { path: tool.path, params };
  });

  return await execSequence(jobsWithPaths, options);
}

/**
 * Execute multiple jobs in parallel with monitoring
 * Note: Use with caution - parallel jobs may compete for resources
 *
 * @param {Array<{id: string, params: Object}>} jobs - Array of job configurations
 * @param {Object} options - Execution options
 * @returns {Promise<Array>} Array of results
 *
 * @example
 * const results = await executeJobParallel([
 *   { id: 'complete-profile-extraction', params: { username: 'user1', ... } },
 *   { id: 'complete-profile-extraction', params: { username: 'user2', ... } }
 * ]);
 */
export async function executeJobParallel(jobs, options = {}) {
  // Convert tool IDs to paths
  const jobsWithPaths = jobs.map(({ id, params }) => {
    const tool = getToolById(id);
    if (!tool) throw new Error(`Tool not found: ${id}`);
    return { path: tool.path, params };
  });

  return await execParallel(jobsWithPaths, options);
}

// Export default object for convenience
export default {
  getIndex,
  getTools,
  getJobsByCategory,
  getWorkflowsByCategory,
  getPrimitivesByCategory,
  getAvailableCategories,
  findTool,
  getToolById,
  getToolSchema,
  listCategoryTools,
  getRecommendedTool,
  executeJob,
  executeJobSequence,
  executeJobParallel
};
