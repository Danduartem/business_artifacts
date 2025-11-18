#!/usr/bin/env node

/**
 * Instagram Content Analyzer
 * Analyzes posts in batches using LLM for efficient token usage
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { analyzeBatchWithAPI, getRecommendedMode } from './llm-service.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = join(__dirname, 'notion-schema.json');

/**
 * Load Notion schema
 */
function loadSchema() {
  return JSON.parse(readFileSync(SCHEMA_PATH, 'utf-8'));
}

/**
 * Create analysis prompt for batch processing
 */
function createBatchPrompt(posts, schema) {
  const categoryOptions = schema.properties['Categoria do Hook'].options.join(', ');
  const frameworkOptions = schema.properties['Framework'].options.join(', ');
  const ctaOptions = schema.properties['Tipo de CTA'].options.join(', ');
  const emotionalOptions = schema.properties['Tom Emocional'].options.join(', ');
  const visualOptions = schema.properties['Estilo Visual'].options.join(', ');
  const formatOptions = schema.properties['Formato'].options.join(', ');

  let prompt = `Você é o Content Decoder, expert em análise de conteúdo Instagram do mercado brasileiro.

Analise os ${posts.length} posts abaixo e retorne um array JSON com a análise de cada um.

IMPORTANTE:
- Use APENAS as categorias listadas abaixo (são as únicas que existem no banco de dados)
- Retorne JSON puro, sem explicações adicionais
- Analise com profundidade, considerando nuances culturais brasileiras

POSTS A ANALISAR:

`;

  posts.forEach((post, i) => {
    prompt += `\n[POST ${i + 1}]\n`;
    prompt += `URL: ${post.url}\n`;
    prompt += `Data: ${post.date}\n`;
    prompt += `Tipo: ${post.isReel ? 'REEL (vídeo)' : 'POST (imagem)'}\n`;

    // IMPORTANT: Include screenshot for visual analysis
    if (post.screenshot) {
      prompt += `Screenshot: ${post.screenshot}\n`;
      prompt += `👁️  ANALISE A IMAGEM ACIMA usando a ferramenta Read para ver o conteúdo visual!\n`;
    }

    prompt += `Caption:\n${post.caption}\n`;

    if (post.transcription) {
      prompt += `Transcrição do vídeo:\n${post.transcription}\n`;
    }
    prompt += '\n';
  });

  prompt += `\n---\n\nCATEGORIAS VÁLIDAS (use APENAS estas):

Categoria do Hook: ${categoryOptions}

Framework: ${frameworkOptions}

Tipo de CTA: ${ctaOptions}

Tom Emocional: ${emotionalOptions}

Estilo Visual: ${visualOptions}

Formato: ${formatOptions}

---

FORMATO DE RESPOSTA (JSON puro):

[
  {
    "Instagram": {"title": [{"text": {"content": "@username"}}]},
    "Caption": {"rich_text": [{"text": {"content": "..."}}]},
    "Categoria do Hook": {"multi_select": [{"name": "..."}]},
    "Data": {"date": {"start": "YYYY-MM-DD"}},
    "Estilo Visual": {"multi_select": [{"name": "..."}, {"name": "..."}]},
    "Formato": {"select": {"name": "..."}},
    "Framework": {"select": {"name": "..."}},
    "Ponto de Dor": {"rich_text": [{"text": {"content": "..."}}]},
    "Tipo de CTA": {"select": {"name": "..."}},
    "Tom Emocional": {"multi_select": [{"name": "..."}, {"name": "..."}]},
    "Título/Hook": {"rich_text": [{"text": {"content": "..."}}]},
    "Video Transcrito": {"rich_text": [{"text": {"content": "..." ou ""}}]},
    "URL": {"url": "..."}
  },
  ...
]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**INSTRUÇÕES CRÍTICAS - ANÁLISE MULTIMODAL:**

1. ⚠️  **SEMPRE use a ferramenta Read** para visualizar os screenshots fornecidos
2. 📸 Analise o CONTEÚDO VISUAL:   - Design e composição
   - Texto sobreposto na imagem/vídeo
   - Cores e estética
   - Expressões faciais (em vídeos)
   - Tipo de conteúdo visual (falando na câmera, b-roll, texto, etc.)

3. 🎯 O Framework, Hook e Estilo Visual devem ser baseados:
   - 70% no VISUAL (screenshot)
   - 20% na caption
   - 10% na transcrição

4. ✅ Fluxo correto de análise:
   a) Read(screenshot) → entenda o visual completamente
   b) Leia caption e transcrição
   c) Combine tudo e classifique

5. ❌ NÃO baseie a análise APENAS na caption - isso seria incorreto!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Retorne APENAS o array JSON, sem texto adicional.`;

  return prompt;
}

/**
 * Analyze posts in batches
 *
 * Supports two modes:
 * - 'agent': Saves prompts for Claude Code agent processing (default, best for multimodal)
 * - 'api': Direct API calls (text-only, no screenshot analysis)
 *
 * @param {Array} posts - Posts to analyze
 * @param {number} batchSize - Number of posts per batch
 * @param {Object} options - Analysis options
 * @returns {Promise<Array>} - Analyzed posts
 */
export async function analyzeBatch(posts, batchSize = 10, options = {}) {
  const schema = loadSchema();
  const analyzed = [];
  const promptsDir = join(__dirname, '../.cache/prompts');

  // Determine mode: 'agent' or 'api'
  const mode = options.mode || getRecommendedMode();

  // Ensure prompts directory exists
  if (!existsSync(promptsDir)) {
    mkdirSync(promptsDir, { recursive: true });
  }

  console.log(`\n📊 Analyzing ${posts.length} posts in batches of ${batchSize}...`);
  console.log(`\n💡 Mode: ${mode === 'api' ? 'API (text-only)' : 'Agent-aware (multimodal)'}`);

  const batches = [];

  for (let i = 0; i < posts.length; i += batchSize) {
    const batch = posts.slice(i, Math.min(i + batchSize, posts.length));
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(posts.length / batchSize);

    console.log(`\n⚙️  Processing batch ${batchNum}/${totalBatches} (${batch.length} posts)...`);

    const prompt = createBatchPrompt(batch, schema);

    // Save prompt to file for reference/debugging
    const promptFile = join(promptsDir, `batch-${batchNum}-prompt.txt`);
    writeFileSync(promptFile, prompt, 'utf-8');

    // Save batch data for reference
    const batchDataFile = join(promptsDir, `batch-${batchNum}-data.json`);
    writeFileSync(batchDataFile, JSON.stringify(batch, null, 2), 'utf-8');

    if (mode === 'api') {
      // API MODE: Call Claude API directly
      try {
        const batchResults = await analyzeBatchWithAPI(batch, prompt, options);
        analyzed.push(...batchResults);
        console.log(`✓ Batch ${batchNum} analyzed via API`);
      } catch (error) {
        console.error(`✗ Batch ${batchNum} failed:`, error.message);
        throw error;
      }
    } else {
      // AGENT MODE: Save for agent processing
      batches.push({
        batchNum,
        totalBatches,
        postCount: batch.length,
        promptFile,
        dataFile: batchDataFile,
        tokenCount: Math.ceil(prompt.length / 4)
      });
      console.log(`✓ Batch ${batchNum} prepared: ${promptFile}`);
    }
  }

  if (mode === 'api') {
    // API MODE: Return analyzed results
    console.log(`\n✅ API analysis complete: ${analyzed.length} posts analyzed`);
    return analyzed;
  } else {
    // AGENT MODE: Save manifest and return agent-aware structure
    const manifestFile = join(promptsDir, 'manifest.json');
    writeFileSync(manifestFile, JSON.stringify({
      totalPosts: posts.length,
      totalBatches: batches.length,
      batchSize,
      batches,
      timestamp: new Date().toISOString(),
      status: 'pending_agent_analysis'
    }, null, 2), 'utf-8');

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`🤖 AGENT INTERVENTION REQUIRED`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`\nBatch analysis prompts have been prepared and saved.`);
    console.log(`\nManifest: ${manifestFile}`);
    console.log(`Prompts directory: ${promptsDir}`);
    console.log(`\nThe orchestrator will now pause. The agent should:`);
    console.log(`1. Read the manifest file to see all batches`);
    console.log(`2. For each batch, read the prompt file`);
    console.log(`3. Analyze the posts and generate JSON response`);
    console.log(`4. Save the results to: .cache/analyzed-results.json`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    // Return empty array with a flag that analysis is pending
    analyzed.needsAgentProcessing = true;
    analyzed.manifestFile = manifestFile;
    analyzed.promptsDir = promptsDir;

    return analyzed;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const postsFile = process.argv[2];

  if (!postsFile) {
    console.error('Usage: analyzer.js <posts.json>');
    process.exit(1);
  }

  const posts = JSON.parse(readFileSync(postsFile, 'utf-8'));
  analyzeBatch(posts).then(() => process.exit(0));
}
