# Airtable Schema - Instagram Content Analysis

## Base Name: "Instagram Content Decoder"

---

## Table 1: Instagram Posts (Main)

### Fields

| Field Name | Type | Options | Description |
|------------|------|---------|-------------|
| **Post ID** | Formula | `RIGHT({URL}, 11)` | Auto-extract post ID from URL |
| **URL** | URL | Required, Primary | Instagram post URL |
| **Creator** | Link to another record | → Creators table | Link to creator profile |
| **Date Posted** | Date | Date only, required | When post was published |
| **Caption** | Long text | Rich text enabled | Full Instagram caption |
| **Format** | Single select | Reel, Carousel, Single Image, Video | Post format type |
| **Is Reel** | Checkbox | Auto-checked if Format = Reel | Quick filter for reels |
| **Screenshot** | Attachment | Multiple files allowed | Post screenshot(s) |
| **Video Transcription** | Long text | Rich text enabled | Whisper transcription (no char limit!) |
| **Framework** | Single select | See options below | Primary marketing framework used |
| **Hook Categories** | Multiple select | See options below | Types of hooks used |
| **CTA Type** | Single select | See options below | Call-to-action type |
| **Emotional Tones** | Multiple select | See options below | Emotional tones present |
| **Visual Style** | Multiple select | See options below | Visual characteristics |
| **Pain Point** | Long text | | Main pain point addressed |
| **Title/Hook** | Long text | | Opening hook/title |
| **Analysis Notes** | Long text | Rich text enabled | Additional analysis notes |
| **Archived** | Checkbox | Default: unchecked | Mark as archived (not deleted) |
| **Created At** | Created time | Auto | When record was created |
| **Last Modified** | Last modified time | Auto | When record was updated |

### Framework Options (Single Select)
```
- AIDA (Atenção, Interesse, Desejo, Ação)
- PAS (Problema, Agitação, Solução)
- BAB (Before, After, Bridge)
- 4Ps (Promessa, Imagem, Prova, Proposta)
- FAB (Features, Advantages, Benefits)
- Storytelling Narrativo
- Autoridade/Credibilidade
- Escassez/Urgência
- Prova Social
- Comparação/Antes e Depois
- Educacional/Tutorial
- Entretenimento
- Inspiracional/Motivacional
```

### Hook Categories Options (Multiple Select)
```
- Pergunta Provocativa
- Estatística Impactante
- História Pessoal
- Problema Comum
- Promessa Audaciosa
- Curiosidade/Mistério
- Contraste/Contradição
- Erro Comum
- Revelação Surpreendente
- Tendência/Novidade
- Desafio
- Metáfora/Analogia
```

### CTA Type Options (Single Select)
```
- Comentar/Engajar
- Seguir Perfil
- Salvar Post
- Compartilhar
- Acessar Link Bio
- Comprar Produto
- Inscrever em Lista
- Assistir Mais Conteúdo
- Participar de Comunidade
- Baixar Recurso
- Sem CTA Explícito
```

### Emotional Tones Options (Multiple Select)
```
- Urgência
- Escassez
- FOMO (Fear of Missing Out)
- Aspiracional
- Empático
- Motivacional
- Educativo
- Divertido/Leve
- Inspirador
- Desafiador
- Autêntico/Vulnerável
- Confiante/Autoritário
```

### Visual Style Options (Multiple Select)
```
- Falando na Câmera
- B-Roll com Narração
- Texto sobre Vídeo/Imagem
- Demonstração/Tutorial
- Bastidores (Behind the Scenes)
- Antes e Depois
- Storytelling Visual
- Estético/Minimalista
- Dinâmico/Rápido
- Profissional/Polido
- Casual/Autêntico
- Meme/Tendência
```

---

## Table 2: Creators

### Fields

| Field Name | Type | Options | Description |
|------------|------|---------|-------------|
| **Creator Name** | Single line text | Primary | Instagram username (e.g., @berudolph) |
| **Full Name** | Single line text | | Real name |
| **Niche** | Single select | Business, Lifestyle, Tech, etc. | Content niche |
| **Total Posts** | Count | Counts linked records from Posts | Total posts analyzed |
| **Avg Posts per Month** | Formula | Calculate from Total Posts / months | Posting frequency |
| **Posts** | Link to another record | ← Instagram Posts | All posts by this creator |
| **Most Used Framework** | Rollup | From Posts → Framework, MODE | Most common framework |
| **Most Used Hook** | Rollup | From Posts → Hook Categories, MODE | Most common hook type |
| **Notes** | Long text | Rich text | Creator profile notes |
| **Profile URL** | URL | | Instagram profile URL |
| **Last Analyzed** | Last modified time | Auto | Last time posts were added |

---

## Table 3: Frameworks (Reference)

### Fields

| Field Name | Type | Options | Description |
|------------|------|---------|-------------|
| **Framework Name** | Single line text | Primary | Framework name (e.g., AIDA) |
| **Full Name** | Single line text | | Full expanded name |
| **Description** | Long text | Rich text | Framework explanation |
| **Structure** | Long text | | Step-by-step structure |
| **Best For** | Long text | | When to use this framework |
| **Examples** | Link to another record | ← Instagram Posts | Example posts using this |
| **Usage Count** | Count | Counts linked records | How many posts use it |
| **Documentation URL** | URL | | Link to framework docs |

---

## Views (for Instagram Posts table)

### 1. **All Active Posts** (Default)
```
Filter: Archived ≠ true
Sort: Date Posted (newest first)
Group by: Creator
```

### 2. **Gallery View**
```
Filter: Archived ≠ true
Card cover: Screenshot
Card fields: Date Posted, Framework, Creator
Group by: Format
```

### 3. **By Framework**
```
Filter: Archived ≠ true
Group by: Framework
Sort: Date Posted (newest)
Show: Count per framework
```

### 4. **Reels Only**
```
Filter:
  - Archived ≠ true
  - Is Reel = true
Group by: Creator
Sort: Date Posted (newest)
```

### 5. **November 2025 Analysis**
```
Filter:
  - Archived ≠ true
  - Date Posted is within November 2025
Group by: Framework
Fields: All analysis fields visible
```

### 6. **Top Performers** (if you add engagement metrics later)
```
Filter: Archived ≠ true
Sort: Engagement Score (highest first)
Group by: Framework
```

### 7. **Needs Review**
```
Filter:
  - Archived ≠ true
  - Framework is empty OR Hook Categories is empty
Group by: Creator
```

### 8. **Archived Posts**
```
Filter: Archived = true
Sort: Date Posted (newest)
Group by: Creator
```

### 9. **Calendar View**
```
Calendar field: Date Posted
Filter: Archived ≠ true
Color: By Framework
```

### 10. **Timeline View**
```
Start date: Date Posted
Group by: Creator
Color: By Format
```

---

## Formulas & Automations

### Useful Formulas

#### 1. **Post ID Extractor**
```javascript
// Extract post ID from URL
RIGHT({URL}, 11)
```

#### 2. **Days Since Posted**
```javascript
// How many days since posting
DATETIME_DIFF(TODAY(), {Date Posted}, 'days')
```

#### 3. **Content Age Category**
```javascript
// Categorize by age
IF(
  {Days Since Posted} <= 7, "Recent",
  IF({Days Since Posted} <= 30, "This Month",
  IF({Days Since Posted} <= 90, "This Quarter",
  "Archive Candidate"
  ))
)
```

#### 4. **Has Transcription**
```javascript
// Check if reel has been transcribed
IF(
  AND({Is Reel}, LEN({Video Transcription}) > 0),
  "✓ Transcribed",
  IF({Is Reel}, "⚠️ Missing", "N/A")
)
```

### Automation Ideas

#### 1. **New Post Notification**
```
When: Record enters view "Needs Review"
Action: Send Slack/email notification
"New post needs framework analysis"
```

#### 2. **Auto-Archive Old Posts**
```
When: Record matches condition (Date Posted > 180 days ago)
Action: Check "Archived" box
```

#### 3. **Weekly Summary**
```
When: Every Monday 9am
Action: Send summary of posts added last week
Group by: Creator and Framework
```

---

## Setup Instructions

### Step 1: Create Base
1. Go to Airtable.com
2. Click "Add a base" → "Start from scratch"
3. Name it: "Instagram Content Decoder"

### Step 2: Create Tables

**Create Instagram Posts table:**
1. Rename "Table 1" to "Instagram Posts"
2. Add all fields from schema above
3. Set URL as primary field

**Create Creators table:**
1. Click "+" to add new table
2. Name it "Creators"
3. Add all fields from schema
4. Set Creator Name as primary

**Create Frameworks table:**
1. Add another new table
2. Name it "Frameworks"
3. Add all fields from schema
4. Pre-populate with framework options

### Step 3: Link Tables
1. In Instagram Posts, add "Link to Creators" field
2. In Instagram Posts, link Framework to Frameworks table (optional)
3. Test linking a record

### Step 4: Create Views
1. Click "+ Create" in views sidebar
2. Add each view from the list above
3. Configure filters, groups, sorts
4. Save views

### Step 5: Import Existing Data (if migrating from Notion)
1. Export from Notion as CSV
2. Import to Airtable
3. Map fields correctly
4. Verify data

---

## API Integration Notes

### Airtable API is Much Simpler

**Finding records:**
```javascript
// Notion: Complex filter object
// Airtable: Simple formula
const records = await base('Instagram Posts')
  .select({
    filterByFormula: `{URL} = 'https://...'`
  })
  .firstPage();
```

**Creating records:**
```javascript
await base('Instagram Posts').create({
  'URL': post.url,
  'Creator': ['recXXXXXXXXXXXXXX'], // Link by record ID
  'Date Posted': '2025-11-15',
  'Caption': post.caption,
  'Format': 'Reel',
  'Is Reel': true,
  'Framework': 'AIDA',
  'Hook Categories': ['Pergunta Provocativa', 'Problema Comum'],
  'CTA Type': 'Comentar/Engajar',
  'Emotional Tones': ['Urgência', 'Empático'],
  'Visual Style': ['Falando na Câmera'],
  'Video Transcription': post.transcription, // No 2000 char limit!
  'Pain Point': '...',
  'Title/Hook': '...',
  'Archived': false
});
```

---

## Migration Path

### Phase 1: Setup (1 hour)
- [ ] Create Airtable account
- [ ] Create base with tables
- [ ] Add all fields
- [ ] Create basic views

### Phase 2: Test (30 minutes)
- [ ] Manually add 2-3 posts
- [ ] Test views
- [ ] Test formulas
- [ ] Verify structure

### Phase 3: Integrate (1 hour)
- [ ] Update saver.js to target Airtable
- [ ] Test with dry-run
- [ ] Run real import

### Phase 4: Migrate (optional)
- [ ] Export existing Notion data
- [ ] Import to Airtable
- [ ] Verify data integrity

---

## Advanced Features (After Basic Setup)

### 1. **Engagement Tracking**
Add fields:
- Likes (Number)
- Comments (Number)
- Saves (Number)
- Engagement Rate (Formula)

### 2. **Content Strategy**
Add table:
- Content Ideas
- Link to Posts (what inspired it)
- Status (Planned, Created, Posted)

### 3. **Performance Analysis**
Add views:
- Top 10 by Engagement
- Framework Performance (pivot table)
- Hook Type Performance

### 4. **Integrations**
- Zapier: Auto-add posts from Instagram (if available)
- Slack: Daily post summaries
- Google Sheets: Export for deeper analysis

---

## Cost vs Value

**Free Tier Gets You:**
- 1,000 records (~5-8 years of @berudolph)
- Unlimited bases
- Unlimited collaborators
- All field types
- All views
- Basic automations (100 runs/month)

**If You Outgrow Free:**
- Plus ($20/mo): 5,000 records, 25,000 automation runs
- Worth it when analyzing 3+ creators seriously

---

## Next Steps

1. Create the Airtable base using this schema
2. Test with a few manual entries
3. I'll update the batch-analyze workflow to target Airtable
4. Run first automated import
5. Set up your favorite views

Want me to create the Airtable integration code for saver.js?
