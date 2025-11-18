#!/usr/bin/env node

/**
 * LLM Service for Content Analysis
 *
 * Provides two modes:
 * 1. AGENT_AWARE (default): Saves prompts for Claude Code agent processing (supports multimodal)
 * 2. API: Direct Anthropic API calls (text-only, no screenshot analysis)
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, existsSync } from 'fs';
import * as dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(dirname(dirname(__dirname)), '.env');

// Load environment variables
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

/**
 * Call Claude API for content analysis
 * @param {string} prompt - The analysis prompt
 * @param {Object} options - API options
 * @returns {Promise<string>} - The API response
 */
export async function callClaudeAPI(prompt, options = {}) {
  const apiKey = options.apiKey || process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY or CLAUDE_API_KEY environment variable required for API mode');
  }

  const client = new Anthropic({
    apiKey,
  });

  const model = options.model || 'claude-sonnet-4-5-20250929';
  const maxTokens = options.maxTokens || 8000;

  console.log(`\n🤖 Calling Claude API (${model})...`);

  try {
    const response = await client.messages.create({
      model,
      max_tokens: maxTokens,
      temperature: 0.3, // Lower temperature for more consistent structured output
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    if (response.content && response.content.length > 0) {
      const textContent = response.content.find(c => c.type === 'text');
      if (textContent) {
        console.log(`✓ Received ${textContent.text.length} characters from API`);
        return textContent.text;
      }
    }

    throw new Error('No text content in API response');

  } catch (error) {
    if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later or reduce batch size.');
    } else if (error.status === 401) {
      throw new Error('Invalid API key. Please check your ANTHROPIC_API_KEY environment variable.');
    } else {
      throw new Error(`API call failed: ${error.message}`);
    }
  }
}

/**
 * Parse JSON response from Claude, handling various formats
 * @param {string} response - The raw response from Claude
 * @returns {Array} - Parsed JSON array
 */
export function parseClaudeResponse(response) {
  // Remove markdown code blocks if present
  let cleaned = response.trim();

  // Remove ```json and ``` markers
  cleaned = cleaned.replace(/^```json?\s*\n?/i, '').replace(/\n?```\s*$/, '');

  // Try to extract JSON array if surrounded by other text
  const jsonArrayMatch = cleaned.match(/\[\s*\{[\s\S]*\}\s*\]/);
  if (jsonArrayMatch) {
    cleaned = jsonArrayMatch[0];
  }

  try {
    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed)) {
      throw new Error('Expected JSON array, got: ' + typeof parsed);
    }

    return parsed;
  } catch (error) {
    throw new Error(`Failed to parse JSON response: ${error.message}\n\nResponse snippet: ${cleaned.substring(0, 500)}...`);
  }
}

/**
 * Analyze batch using Claude API
 * @param {Array} posts - Posts to analyze
 * @param {string} prompt - Analysis prompt
 * @param {Object} options - API options
 * @returns {Promise<Array>} - Analyzed posts in Notion format
 */
export async function analyzeBatchWithAPI(posts, prompt, options = {}) {
  const maxRetries = options.maxRetries || 3;
  const retryDelay = options.retryDelay || 2000;

  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`\n⚙️  Analysis attempt ${attempt}/${maxRetries}...`);

      const response = await callClaudeAPI(prompt, options);
      const analyzed = parseClaudeResponse(response);

      // Validate that we got the expected number of posts
      if (analyzed.length !== posts.length) {
        console.warn(`⚠️  Warning: Expected ${posts.length} results, got ${analyzed.length}`);
      }

      console.log(`✓ Successfully analyzed ${analyzed.length} posts`);
      return analyzed;

    } catch (error) {
      lastError = error;
      console.error(`✗ Attempt ${attempt} failed:`, error.message);

      if (attempt < maxRetries) {
        console.log(`⏳ Retrying in ${retryDelay / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
}

/**
 * Detect if running in Claude Code agent session
 * @returns {boolean} - True if likely in agent session
 */
export function isAgentSession() {
  // Check for environment variables that indicate Claude Code session
  return !!(
    process.env.CLAUDE_CODE_SESSION ||
    process.env.ANTHROPIC_CLI ||
    // Check if parent process might be Claude Code
    (process.env.TERM_PROGRAM && process.env.TERM_PROGRAM.includes('claude'))
  );
}

/**
 * Get recommended mode based on environment
 * @returns {string} - 'agent' or 'api'
 */
export function getRecommendedMode() {
  // If we detect agent session AND have screenshots, use agent mode
  // Otherwise, use API mode if API key is available
  if (isAgentSession()) {
    return 'agent';
  } else if (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY) {
    return 'api';
  } else {
    return 'agent'; // Fallback to agent mode (save prompts for manual processing)
  }
}

export default {
  callClaudeAPI,
  parseClaudeResponse,
  analyzeBatchWithAPI,
  isAgentSession,
  getRecommendedMode
};
