# Batch Instagram Analysis Workflow Instructions - V2 OPTIMIZED

<critical>This workflow uses optimized batch processing scripts to minimize token usage and maximize efficiency</critical>
<critical>Communicate in Portuguese (Brazilian) throughout the workflow</critical>

<workflow>

<step n="1" goal="Collect input parameters (YOLO mode - no confirmations)">
  <ask>Quais perfis do Instagram você quer analisar? (separe por espaço, sem @)

Exemplo: berudolph marketingbrasil growthhacker</ask>

  <action>Parse input and extract profile handles (strip @ if present)</action>
  <action>Store in {{instagram_profiles}} array</action>

  <ask>Qual o período de análise?

Data início (YYYY-MM-DD): </ask>
  <action>Store in {{date_start}}</action>

  <ask>Data fim (YYYY-MM-DD): </ask>
  <action>Store in {{date_end}}</action>

  <action>Calculate total days: {{total_days}} = days between dates</action>

  <action>Show summary and auto-start:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Configuração da Análise

Perfis: {{instagram_profiles}}
Período: {{date_start}} até {{date_end}}
Total de dias: {{total_days}}

🚀 Iniciando processamento automaticamente...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  </action>

  <action>Proceed to Step 2 automatically (YOLO mode enabled)</action>
</step>

<step n="2" goal="Validate prerequisites (YOLO mode - assume ready)">
  <action>Check if browser is running on :9222</action>

  <check if="browser not running">
    <action>ERROR: Browser not running! Start it with:
```bash
browser-start.js --profile
```
Then re-run the workflow.
    </action>
    <action>Exit with error</action>
  </check>

  <action>Assume user is logged into Instagram (YOLO mode - proceeding)</action>
  <action>If not logged in, Instagram scraping will fail with clear error message</action>

  <action>Check if notion-integration is configured</action>

  <action>Report: ✅ Pré-requisitos validados (YOLO mode - auto-proceeding)</action>
</step>

<step n="3" goal="Run optimized batch processor">
  <action>Report:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Iniciando Processamento em Lote
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

O processador irá:
1. ✓ Extrair posts de todos os perfis
2. ✓ Filtrar por período especificado
3. ✓ 📸 Capturar screenshots (análise visual!)
4. ✓ Baixar vídeos (reels)
5. ✓ Transcrever vídeos
6. ✓ Verificar duplicatas no Notion
7. ✓ Validar categorias contra schema

Aguarde... Este processo pode levar alguns minutos.
  </action>

  <action>Get workflow directory path</action>
  <action>Set {{lib_path}} = workflow_directory + "/lib"</action>

  <action>Execute orchestrator:
```bash
cd {{lib_path}} && node orchestrator.js {{instagram_profiles}} --start={{date_start}} --end={{date_end}}
```
  </action>

  <action>Store orchestrator results in {{batch_results}}</action>

  <check if="extraction successful and posts found">
    <action>Load extracted posts from cache: {{lib_path}}/../.cache/{{profile}}-posts.json</action>
    <action>Count total posts: {{total_posts}}</action>
    <action>Report:
✅ Extração completa
• Total de posts encontrados: {{total_posts}}
• Vídeos: {{total_videos}}
• Posts com transcrição: {{transcribed_count}}
    </action>
    <action>Proceed to Step 4</action>
  </check>

  <check if="no posts found">
    <action>Report:
⚠️ Nenhum post encontrado no período especificado.
    </action>
    <action>Exit workflow</action>
  </check>

  <check if="extraction failed">
    <action>Report error details from {{batch_results}}</action>
    <action>Exit workflow with error</action>
  </check>
</step>

<step n="4" goal="Analyze content in batches using LLM">
  <action>Load posts for analysis from cache</action>
  <action>Load Notion schema: {{lib_path}}/notion-schema.json</action>

  <action>Report:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 Análise de Conteúdo (Batch Processing)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total de posts: {{total_posts}}
Batch size: 10 posts por análise
Batches: {{Math.ceil(total_posts / 10)}}
  </action>

  <action>Split posts into batches of 10</action>

  <for-each batch in batches>
    <action>Set {{batch_number}} = current batch index + 1</action>
    <action>Report: Processando batch {{batch_number}}/{{total_batches}}...</action>

    <action>For each post in batch, prepare analysis data:
```json
{
  "url": "post.url",
  "date": "post.date",
  "caption": "post.caption",
  "transcription": "post.transcription",
  "isReel": post.isReel
}
```
    </action>

    <action>Build comprehensive analysis prompt:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Content Decoder: Análise em Batch

Você é o Content Decoder, expert em análise de conteúdo Instagram do mercado brasileiro.

Analise os {{batch.length}} posts abaixo e retorne um array JSON com a análise completa de cada um.

**CATEGORIAS VÁLIDAS** (use APENAS estas, conforme schema do Notion):

• Categoria do Hook: {{schema.properties['Categoria do Hook'].options.join(', ')}}

• Framework: {{schema.properties['Framework'].options.join(', ')}}

• Tipo de CTA: {{schema.properties['Tipo de CTA'].options.join(', ')}}

• Tom Emocional: {{schema.properties['Tom Emocional'].options.join(', ')}}

• Estilo Visual: {{schema.properties['Estilo Visual'].options.join(', ')}}

• Formato: {{schema.properties['Formato'].options.join(', ')}}

**POSTS PARA ANÁLISE:**

{{#each batch}}
[POST {{@index + 1}}]
URL: {{this.url}}
Data: {{this.date}}
Tipo: {{this.isReel ? "REEL (vídeo)" : "POST (imagem)"}}
Caption:
{{this.caption}}

{{#if this.transcription}}
Transcrição do vídeo:
{{this.transcription}}
{{/if}}

{{/each}}

**FORMATO DE RETORNO** (JSON puro, sem explicações):

Retorne um array JSON onde cada objeto tem EXATAMENTE esta estrutura:

[
  {
    "Instagram": {"title": [{"text": {"content": "@username"}}]},
    "Caption": {"rich_text": [{"text": {"content": "..."}}]},
    "Categoria do Hook": {"multi_select": [{"name": "categoria1"}, {"name": "categoria2"}]},
    "Data": {"date": {"start": "YYYY-MM-DD"}},
    "Estilo Visual": {"multi_select": [{"name": "estilo1"}, {"name": "estilo2"}]},
    "Formato": {"select": {"name": "formato"}},
    "Framework": {"select": {"name": "framework"}},
    "Ponto de Dor": {"rich_text": [{"text": {"content": "descrição do ponto de dor"}}]},
    "Tipo de CTA": {"select": {"name": "tipo_cta"}},
    "Tom Emocional": {"multi_select": [{"name": "tom1"}, {"name": "tom2"}]},
    "Título/Hook": {"rich_text": [{"text": {"content": "primeira frase ou hook principal"}}]},
    "Video Transcrito": {"rich_text": [{"text": {"content": "transcrição ou vazio"}}]},
    "URL": {"url": "url_completa"}
  }
]

IMPORTANTE:
- Use categorias EXATAMENTE como listadas acima
- Analise com profundidade, considerando nuances culturais brasileiras
- Retorne APENAS o JSON, sem texto adicional
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    </action>

    <action>Send prompt to current LLM session (you)</action>

    <action>Parse JSON response from LLM</action>

    <action>Store analyzed batch in {{analyzed_posts}}</action>

    <action>Save to cache: {{lib_path}}/../.cache/batch-{{batch_number}}-analyzed.json</action>

    <action>Report: ✅ Batch {{batch_number}} analisado ({{batch.length}} posts)</action>
  </for-each>

  <action>Merge all analyzed batches into {{all_analyzed_posts}}</action>

  <action>Report:
✅ Análise completa!
• Total analisado: {{all_analyzed_posts.length}} posts
  </action>
</step>

<step n="5" goal="Validate, deduplicate, and save to Notion">
  <action>Report:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💾 Validação e Salvamento
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  </action>

  <action>Run validator:
```bash
cd {{lib_path}} && node validator.js {{cache_dir}}/all-analyzed.json {{current_profile}}
```
  </action>

  <action>Validator will:
1. Query Notion for existing posts (by URL)
2. Skip duplicates
3. Validate categories against schema
4. Auto-correct invalid categories to closest match
5. Return list of valid, non-duplicate posts
  </action>

  <action>Store validated posts in {{posts_to_save}}</action>

  <action>Report:
Validação completa:
• Posts válidos: {{posts_to_save.length}}
• Duplicatas ignoradas: {{duplicates_count}}
• Categorias corrigidas: {{corrections_count}}
  </action>

  <action>For each post in posts_to_save:
1. Create temp JSON file: /tmp/notion-post-{{timestamp}}.json
2. Save using notion-save.js
3. Track success/failure
4. Add 1 second delay between saves (rate limiting)
  </action>

  <action>Track statistics:
• {{saved_count}} = successfully saved
• {{failed_count}} = failed to save
  </action>

  <action>Report progress after each save:
[{{saved_count + failed_count}}/{{posts_to_save.length}}] {{status_icon}} Post salvo
  </action>
</step>

<step n="6" goal="Generate final report">
  <action>Calculate final statistics:
• Total posts found: {{total_posts}}
• Posts analisados: {{all_analyzed_posts.length}}
• Posts salvos: {{saved_count}}
• Duplicatas: {{duplicates_count}}
• Erros: {{failed_count}}
• Taxa de sucesso: {{(saved_count / total_posts * 100).toFixed(1)}}%
  </action>

  <action>Report final summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ ANÁLISE EM LOTE CONCLUÍDA!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Estatísticas Finais:

Extração:
  • Posts encontrados: {{total_posts}}
  • Vídeos baixados: {{total_videos}}
  • Transcrições: {{transcribed_count}}

Análise:
  • Posts analisados: {{all_analyzed_posts.length}}
  • Batches processados: {{total_batches}}
  • Token usage: ~{{estimated_tokens}}

Notion:
  • Salvos com sucesso: {{saved_count}}
  • Duplicatas ignoradas: {{duplicates_count}}
  • Erros: {{failed_count}}
  • Taxa de sucesso: {{success_rate}}%

📱 Perfis: {{instagram_profiles.join(', ')}}
📅 Período: {{date_start}} até {{date_end}}

💾 Cache disponível em: {{lib_path}}/../.cache/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  </action>

  <check if="failed_count > 0">
    <action>Report:
⚠️ {{failed_count}} posts falharam ao salvar.
Verifique os logs acima para detalhes.
Arquivos JSON em /tmp/ podem ser salvos manualmente.
    </action>
  </check>

  <action>Workflow complete!</action>
</step>

</workflow>

## Performance Improvements

**Batch Processing:**
- Analyzes 10 posts per LLM call (vs 1 post per call previously)
- Reduces token usage by ~80%
- Faster execution with parallel operations

**Deduplication:**
- Queries Notion before saving to avoid duplicates
- Saves API calls and prevents clutter

**Validation:**
- Auto-corrects invalid categories to closest match
- Prevents save failures due to typos

**Caching:**
- All intermediate results cached in .cache/
- Can resume from any step if interrupted
- Enables debugging and manual intervention

## Token Usage Estimate

| Task | Old Approach | New Approach | Savings |
|------|-------------|--------------|---------|
| Analysis | ~30k tokens | ~3-5k tokens | 83% |
| Orchestration | Via conversation | Via scripts | 100% |
| **Total** | **~30k** | **~5k** | **83%** |

## Error Recovery

If workflow fails:
1. Check .cache/ directory for intermediate results
2. Analyzed posts are saved per batch
3. Can manually save from cache to Notion
4. Re-run with same parameters - duplicates will be skipped
