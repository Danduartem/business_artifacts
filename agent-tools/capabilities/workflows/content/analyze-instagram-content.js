#!/usr/bin/env node
/**
 * @workflow content.analyze-instagram-content
 * @when Analyze Instagram post content with AI using smart prioritization: video transcript > carousel text > image text > caption
 * @complexity medium
 * @category content
 *
 * @flag post-data - Post data JSON (required)
 * @flag framework-options - Custom framework options (optional)
 * @flag hook-options - Custom hook category options (optional)
 * @flag cta-options - Custom CTA type options (optional)
 *
 * @example
 * node analyze-instagram-content.js --post-data '{"caption": "...", "mediaType": "video", "processedMedia": [...]}'
 */

import { parseArgs } from 'node:util';
import { createLogger } from '../../../core/logger/index.js';
import { execSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const logger = createLogger({ toolName: 'content.analyze-instagram-content' });
const { values: args } = parseArgs({
  options: {
    'post-data': { type: 'string' },
    'framework-options': { type: 'string' },
    'hook-options': { type: 'string' },
    'cta-options': { type: 'string' }
  }
});

// Default analysis options (Portuguese)
const DEFAULT_FRAMEWORKS = [
  'AIDA (Atenção, Interesse, Desejo, Ação)',
  'PAS (Problema, Agitação, Solução)',
  'BAB (Before, After, Bridge)',
  '4Ps (Promessa, Imagem, Prova, Proposta)',
  'FAB (Features, Advantages, Benefits)',
  'Storytelling Narrativo',
  'Autoridade/Credibilidade',
  'Escassez/Urgência',
  'Prova Social',
  'Comparação/Antes e Depois',
  'Educacional/Tutorial',
  'Entretenimento',
  'Inspiracional/Motivacional'
];

const DEFAULT_HOOK_CATEGORIES = [
  'Pergunta Provocativa',
  'Estatística Impactante',
  'História Pessoal',
  'Problema Comum',
  'Promessa Audaciosa',
  'Curiosidade/Mistério',
  'Contraste/Contradição',
  'Erro Comum',
  'Revelação Surpreendente',
  'Tendência/Novidade',
  'Desafio',
  'Metáfora/Analogia'
];

const DEFAULT_CTA_TYPES = [
  'Comentar/Engajar',
  'Seguir Perfil',
  'Salvar Post',
  'Compartilhar',
  'Acessar Link Bio',
  'Comprar Produto',
  'Inscrever em Lista',
  'Assistir Mais Conteúdo',
  'Participar de Comunidade',
  'Baixar Recurso',
  'Sem CTA Explícito'
];

const DEFAULT_EMOTIONAL_TONES = [
  'Urgência',
  'Escassez',
  'FOMO (Fear of Missing Out)',
  'Aspiracional',
  'Empático',
  'Motivacional',
  'Educativo',
  'Divertido/Leve',
  'Inspirador',
  'Desafiador',
  'Autêntico/Vulnerável',
  'Confiante/Autoritário'
];

const DEFAULT_VISUAL_STYLES = [
  'Falando na Câmera',
  'B-Roll com Narração',
  'Texto sobre Vídeo/Imagem',
  'Demonstração/Tutorial',
  'Bastidores (Behind the Scenes)',
  'Antes e Depois',
  'Storytelling Visual',
  'Estético/Minimalista',
  'Dinâmico/Rápido',
  'Profissional/Polido',
  'Casual/Autêntico',
  'Meme/Tendência'
];

/**
 * Determine which content to analyze based on priority:
 * 1. Video transcript (if video)
 * 2. Carousel text from images (if carousel with text)
 * 3. Image text (if single image with text)
 * 4. Caption (fallback)
 */
function determineAnalysisContent(postData) {
  const { mediaType, processedMedia, caption } = postData;

  // Priority 1: Video transcription
  if (mediaType === 'video' && processedMedia?.length > 0) {
    const videoMedia = processedMedia.find(m => m.type === 'video' && m.transcription);
    if (videoMedia?.transcription) {
      return {
        contentType: 'video-transcript',
        content: formatVideoTranscription(videoMedia.transcription),
        description: 'Analyzing video transcription'
      };
    }
  }

  // Priority 2: Carousel text
  if (mediaType === 'carousel' && processedMedia?.length > 0) {
    const carouselTexts = processedMedia
      .filter(m => m.type === 'image' && m.extractedText)
      .map((m, i) => `[Slide ${i + 1}]\n${m.extractedText}`);

    if (carouselTexts.length > 0) {
      return {
        contentType: 'carousel-text',
        content: carouselTexts.join('\n\n'),
        description: `Analyzing text from ${carouselTexts.length} carousel slides`
      };
    }
  }

  // Priority 3: Single image text
  if (mediaType === 'image' && processedMedia?.length > 0) {
    const imageMedia = processedMedia.find(m => m.type === 'image' && m.extractedText);
    if (imageMedia?.extractedText) {
      return {
        contentType: 'image-text',
        content: imageMedia.extractedText,
        description: 'Analyzing text extracted from image'
      };
    }
  }

  // Priority 4: Caption (fallback)
  return {
    contentType: 'caption',
    content: caption || '',
    description: 'Analyzing post caption'
  };
}

/**
 * Format video transcription for analysis
 */
function formatVideoTranscription(transcription) {
  if (transcription.segments) {
    return transcription.segments
      .map(seg => `[${seg.timeRange}] ${seg.text}`)
      .join('\n');
  }
  return transcription.text || '';
}

/**
 * Build analysis prompt
 */
function buildAnalysisPrompt(analysisContent, options) {
  const { content, contentType, description } = analysisContent;

  return `You are analyzing an Instagram post to identify marketing frameworks, hooks, CTAs, emotional tones, visual styles, and key messaging elements.

**Content Source:** ${description}
**Content Type:** ${contentType}

**Content to Analyze:**
${content}

Please analyze this content and provide a structured response in the following JSON format:

\`\`\`json
{
  "framework": "<single framework from the list>",
  "hookCategories": ["<hook category 1>", "<hook category 2>", ...],
  "ctaType": "<single CTA type from the list>",
  "emotionalTones": ["<tone 1>", "<tone 2>", ...],
  "visualStyle": ["<style 1>", "<style 2>", ...],
  "painPoint": "<main pain point or problem addressed>",
  "titleHook": "<the opening hook or attention-grabbing title>",
  "notes": "<any additional analysis notes>"
}
\`\`\`

**Available Options:**

**Framework Options (select ONE):**
${options.frameworks.map(f => `- ${f}`).join('\n')}

**Hook Categories (select MULTIPLE if applicable):**
${options.hookCategories.map(h => `- ${h}`).join('\n')}

**CTA Type (select ONE):**
${options.ctaTypes.map(c => `- ${c}`).join('\n')}

**Emotional Tones (select MULTIPLE if applicable):**
${options.emotionalTones.map(e => `- ${e}`).join('\n')}

**Visual Style (select MULTIPLE if applicable):**
${options.visualStyles.map(v => `- ${v}`).join('\n')}

**Instructions:**
1. Identify the PRIMARY marketing framework used
2. Select ALL hook categories that apply
3. Identify the CTA type (or "Sem CTA Explícito" if none)
4. Select ALL emotional tones present
5. Select ALL visual styles that apply (based on content and typical Instagram formats)
6. Extract the main pain point addressed
7. Extract the opening hook/title
8. Add any additional insights in notes

Return ONLY the JSON object, no additional text.`;
}

/**
 * Analyze content with Claude Code CLI
 */
async function analyzeWithClaude(analysisContent, options) {
  const prompt = buildAnalysisPrompt(analysisContent, options);

  logger.info('Sending analysis request to Claude Code', {
    contentType: analysisContent.contentType,
    contentLength: analysisContent.content.length
  });

  // Create temporary prompt file
  const promptFile = join(tmpdir(), `instagram-analysis-${Date.now()}.txt`);
  writeFileSync(promptFile, prompt);

  try {
    // Use Claude Code CLI to analyze
    const responseText = execSync(
      `claude --no-interactive --text-only < "${promptFile}"`,
      {
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024,
        shell: '/bin/bash'
      }
    );

    // Extract JSON from response
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || responseText.match(/(\{[\s\S]*\})/);

    if (!jsonMatch) {
      logger.error('Failed to extract JSON', { response: responseText.substring(0, 500) });
      throw new Error('Failed to extract JSON from Claude response');
    }

    const analysis = JSON.parse(jsonMatch[1]);

    return {
      ...analysis,
      _metadata: {
        contentType: analysisContent.contentType,
        analyzedAt: new Date().toISOString(),
        model: 'claude-code-cli'
      }
    };
  } finally {
    // Clean up temp file
    try {
      unlinkSync(promptFile);
    } catch (err) {
      // Ignore cleanup errors
    }
  }
}

/**
 * Main workflow execution
 */
async function analyzeInstagramContent() {
  try {
    if (!args['post-data']) {
      throw new Error('--post-data is required (JSON string or file path)');
    }

    // Parse post data
    let postData;
    try {
      postData = JSON.parse(args['post-data']);
    } catch (error) {
      throw new Error(`Invalid JSON in --post-data: ${error.message}`);
    }

    // Build analysis options
    const options = {
      frameworks: args['framework-options']?.split(',') || DEFAULT_FRAMEWORKS,
      hookCategories: args['hook-options']?.split(',') || DEFAULT_HOOK_CATEGORIES,
      ctaTypes: args['cta-options']?.split(',') || DEFAULT_CTA_TYPES,
      emotionalTones: DEFAULT_EMOTIONAL_TONES,
      visualStyles: DEFAULT_VISUAL_STYLES
    };

    logger.info('Starting content analysis', {
      mediaType: postData.mediaType,
      hasProcessedMedia: !!postData.processedMedia
    });

    // Determine what content to analyze
    const analysisContent = determineAnalysisContent(postData);

    console.log(`\n📊 ${analysisContent.description}\n`);
    logger.info('Analysis content determined', {
      contentType: analysisContent.contentType,
      contentLength: analysisContent.content.length
    });

    // Analyze with Claude
    const analysis = await analyzeWithClaude(analysisContent, options);

    const result = {
      success: true,
      analysis,
      contentAnalyzed: analysisContent.contentType
    };

    console.log(JSON.stringify(result));
    logger.info('Analysis complete', { framework: analysis.framework });

  } catch (error) {
    logger.error('Analysis failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

analyzeInstagramContent();
