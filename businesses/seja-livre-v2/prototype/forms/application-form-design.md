# SEJA LIVRE Mentoria - Application Form Design
**Created:** 2025-11-13
**Updated:** 2025-12-10
**Purpose:** Pre-qualify leads for Sessão de Diagnóstico with Juçanã
**Form Type:** One Question Per Screen (11 screens + scheduling)
**Target Time:** 4-6 minutes completion
**Offer:** SEJA LIVRE Mentoria Empresarial (€4,500 / 6x €750)

---

## STRATEGIC OVERVIEW

### **Target Audience**

| Attribute | Specification |
|-----------|---------------|
| **Business Type** | Service businesses (clinic, box/gym, agency, consulting) |
| **Team Size** | 3-15 employees |
| **Revenue** | €15k-40k+/month (PT) or R$50k-150k+/month (BR) |
| **Pain Point** | "Pau pra toda obra" — doing everything, trapped in operations |
| **Goal** | Freedom from day-to-day, structured business, predictable sales |

### **Why One Question Per Screen?**

1. **Reduced Cognitive Load**: Less overwhelming than multi-question pages
2. **Granular Abandonment Tracking**: Know exactly where leads drop off
3. **Early Contact Collection**: Get phone/Instagram by screen 3 (enables follow-up even if abandoned)
4. **Progressive Commitment**: Psychological momentum (already answered 5 questions, might as well finish)
5. **Early Disqualification**: Save everyone's time (screens 5-6 filter out non-fits)

### **Key Design Decisions**

- **Contact Before Qualification**: Collect WhatsApp + Instagram BEFORE asking hard questions (screens 2-3)
- **Transparent Investment**: Show exact pricing on screen 8 (no surprises, self-qualification)
- **Disqualification With Love**: Warm, helpful rejection messages (not "you don't qualify")
- **Juçanã's Voice Throughout**: Every helper text, error message, and transition in her warm-direct style
- **Auto-save Everything**: Capture data after each screen (never lose lead info)
- **Country-aware Pricing**: Detect PT vs BR from phone code, show appropriate currency

### **Qualification Criteria**

| Criterion | Qualifies | Disqualifies |
|-----------|-----------|--------------|
| **Revenue** | €15k+/month (PT) or R$50k+/month (BR) | Below minimum |
| **Team Size** | 3-15 employees | Solo (1 person) |
| **Business Type** | Service-based | Product/e-commerce |
| **Availability** | Can dedicate time | No availability (soft flag) |

### **Conversion Funnel Expected Metrics**

- Screen 1 → Screen 2: 85-90% (just name)
- Screen 2 → Screen 3: 80-85% (contact info)
- Screen 3 → Screen 5: 75-80% (instagram optional)
- Screen 5: ~30-40% disqualified (revenue below threshold)
- Screen 6: ~10-20% disqualified (solo or team too small)
- Screen 6 → Screen 11: 70-80% (qualified leads who complete)
- **Overall Completion**: 40-50% of starters
- **Calendly Scheduled**: 60-70% of completers

---

## COMPLETE SCREEN-BY-SCREEN FLOW

---

## SCREEN 0: LANDING/INTRO

**Type:** Informational (no input)

**Purpose:** Set expectations, create excitement, establish voice

**Layout:**
- Full-screen
- Centered content
- No progress bar yet
- Navy background (#191F3A)

**Copy:**

```
SEJA LIVRE 🦅

Mentoria Empresarial

─────────────────────────────────────────

Vamos avaliar pessoalmente cada aplicação e selecionar apenas
quem realmente pode aproveitar essa oportunidade.

Baseado nas suas respostas, você será ou não convidada para uma
Sessão de Diagnóstico gratuita comigo.

⚠️ Importante: O preenchimento deste formulário não garante sua vaga.
Vagas limitadas — avaliamos cautelosamente cada interessada.

Nos próximos 5 minutos, vou te fazer algumas perguntas para entender
se somos fit perfeitas. Seja honesta — não existe resposta "certa",
existe a SUA resposta. E é essa que eu preciso ouvir.

Do meu coração para o seu, vamos? 💙❤️
```

**Button:**
- Text: "COMEÇAR"
- Style: Borgonha (#81171F), large (56px height)
- Subtext: "Pressione Enter ↵"

**Visual Notes:**
- Lora serif for headline "SEJA LIVRE"
- Century Gothic for body text
- Warning emoji (⚠️) in gold/yellow
- Hearts emoji at end (💙❤️) brand colors

---

## SCREEN 1: NOME COMPLETO

**Progress:** 1 of 10

**Question:** "Nome completo:"

**Section Label:** "Informações Básicas"

**Type:** Text input (required)

**Placeholder:** "Digite seu nome completo..."

**Validation:**
- Required field
- Minimum 2 words (first + last name)
- No numbers or special characters

**Error Message (if validation fails):**
"Preciso do seu nome completo para te conhecer melhor. Pode escrever seu nome inteiro? 💙"

**Button:** "OK" (only active when valid input)
- Subtext: "Pressione Enter ↵"

**Design Notes:**
- Question in Lora, 22px, white
- Section label in Century Gothic, 14px, beige (#F5F5DC), above question
- Input field: background #2A3154 (lighter navy), white text, 18px
- Focus state: borgonha border
- Progress bar at top: "1/10" text + visual bar

---

## SCREEN 2: WHATSAPP

**Progress:** 2 of 10

**Question:** "WhatsApp com DDD:"

**Type:** Phone input with country selector

**Default Country:** +55 (Brasil)

**Country Selector Visible:** Yes (dropdown flag + code)
- Priority countries: Brasil (+55), Portugal (+351)

**Placeholder:** "(47) 99963-9968"

**Helper Text (below input):**
"Vou usar apenas para te enviar o link da nossa conversa. Nada de spam, prometo. 💙"

**Validation:**
- Required field
- Valid phone format for selected country
- Minimum 10 digits (Brasil), 9 digits (Portugal)
- Auto-format while typing: (XX) XXXXX-XXXX

**Error Message:**
"Esse número não parece válido. Confere se digitou certinho? Preciso dele para te mandar o link da call. 💙"

**Button:** "CONTINUAR"
- Subtext: "Pressione Enter ↵"

**Technical Note:**
- Use library like `react-phone-number-input` or `intl-tel-input`
- Validate with libphonenumber
- Store: country code + full number separately
- **IMPORTANT**: Country code determines which pricing to show on Screen 8

---

## SCREEN 3: INSTAGRAM

**Progress:** 3 of 10

**Question:** "@ do Instagram:"

**Type:** Text input with auto @ prefix

**Placeholder:** "jucanamaximiliano"

**Helper Text:**
"Quero conhecer um pouquinho do seu mundo antes da nossa conversa. 👀"

**Validation:**
- Optional (can skip)
- If filled: remove spaces, special characters except underscore/period
- Auto-prepend @ if user doesn't include it
- Max 30 characters (Instagram limit)

**Button:** "CONTINUAR"
- Subtext: "Pressione Enter ↵"

**Secondary Button (text link below):**
"Não tenho Instagram" (allows skip to next screen)

**Visual Note:**
- Input shows "@" prefix automatically (gray, non-editable)
- User types after the @

---

## SCREEN 4: TIPO DE NEGÓCIO

**Progress:** 4 of 10

**Question:** "Qual tipo de negócio você tem?"

**Section Label:** "Contexto do Negócio"

**Type:** Multiple choice (radio buttons, single selection)

**Options:**

```
○ A. Prestação de serviços (clínica, estética, consultoria, etc.)

○ B. Academia / Box / Estúdio fitness

○ C. Agência (marketing, design, desenvolvimento, etc.)

○ D. Escola / Curso presencial

○ E. Outro tipo de serviço
```

**Validation:**
- Required (must select one)

**Button:** "CONTINUAR" (only active when option selected)

**Design Notes:**
- Radio buttons: empty circle, fills with borgonha dot when selected
- Each option has full-width clickable area (not just the circle)

**No Disqualification:** All options proceed to next screen

---

## SCREEN 5: FATURAMENTO MENSAL

**Progress:** 5 of 10

**Question:** "Qual é o faturamento mensal médio do seu negócio nos últimos 6 meses?"

**Section Label:** "Qualificação"

**Type:** Multiple choice (radio buttons, single selection)

**Options (Portugal - if country code is +351):**

```
○ A. Até €5.000/mês

○ B. €5.000 - €15.000/mês

○ C. €15.000 - €25.000/mês ✓ QUALIFICA

○ D. €25.000 - €40.000/mês ✓ QUALIFICA

○ E. €40.000+/mês ✓ QUALIFICA
```

**Options (Brasil - if country code is +55):**

```
○ A. Até R$30.000/mês

○ B. R$30.000 - R$50.000/mês

○ C. R$50.000 - R$100.000/mês ✓ QUALIFICA

○ D. R$100.000 - R$150.000/mês ✓ QUALIFICA

○ E. R$150.000+/mês ✓ QUALIFICA
```

**Validation:**
- Required (must select one)

**DISQUALIFICATION LOGIC:**

### If selects A or B (below minimum):

**Screen shows:**

```
═══════════════════════════════════════════

Obrigada pela sua honestidade, [Nome]! 💙

A Mentoria SEJA LIVRE é desenhada para empresárias de serviço que
já faturam €15k+/mês (ou R$50k+ no Brasil) e estão presas no
operacional — trabalhando demais para manter esse faturamento.

Para negócios em estágio anterior, recomendo:

→ Meu Instagram (@jucanamaximiliano) — conteúdo gratuito sobre
  vendas, sistemas e mentalidade

→ Café com Vendas (evento trimestral) — próxima turma em breve

Quando você chegar nesse faturamento e sentir que está trabalhando
DEMAIS para sustentar isso, volta aqui. Vou estar te esperando. 🦅

Do meu coração para o seu: existe um jeito mais fácil. Mas cada
fase tem seu desafio específico.

Agora, seu foco é VENDER e ESTRUTURAR. Quando você estiver vendendo
bem mas morrendo de trabalhar, aí sim a gente sistematiza.

Você está no caminho certo. Continue! 💙❤️

[BOTÃO PRINCIPAL: SEGUIR @JUCANAMAXIMILIANO]
[BOTÃO SECUNDÁRIO: VOLTAR PARA O SITE]

═══════════════════════════════════════════
```

**Technical:**
- Log in database: `disqualified: true, disqualification_reason: "revenue_below_minimum"`
- Send WhatsApp: "Obrigada por se candidatar à Mentoria SEJA LIVRE. No momento a mentoria é para faturamento €15k+/mês. Te aviso quando abrir programa para seu estágio. Enquanto isso, segue conteúdo gratuito: [link Instagram]"

### If selects C, D, or E:
**Proceed to Screen 6**

---

## SCREEN 6: TAMANHO DA EQUIPE

**Progress:** 6 of 10

**Question:** "Quantas pessoas trabalham no seu negócio (incluindo você)?"

**Section Label:** "Qualificação"

**Type:** Multiple choice (radio buttons, single selection)

**Options:**

```
○ A. Só eu (solo)

○ B. 2-3 pessoas

○ C. 4-8 pessoas ✓ IDEAL

○ D. 9-15 pessoas ✓ QUALIFICA

○ E. 16+ pessoas (soft flag)
```

**Validation:**
- Required (must select one)

**DISQUALIFICATION LOGIC:**

### If selects A (solo):

**Screen shows:**

```
═══════════════════════════════════════════

Obrigada por compartilhar, [Nome]! 💙

A Mentoria SEJA LIVRE é focada em estruturar EQUIPES e SISTEMAS
para empresárias que já têm pelo menos 3-4 pessoas no negócio.

Se você ainda é solo, seu desafio agora é diferente — é construir
a base para depois escalar.

Recomendo:

→ Meu Instagram (@jucanamaximiliano) — conteúdo sobre vendas e
  primeiras contratações

→ Quando você tiver sua primeira equipe montada e sentir que está
  "pau pra toda obra", volta aqui

Do meu coração para o seu: você está construindo algo incrível.
O momento de sistematizar vai chegar. 💙❤️

[BOTÃO PRINCIPAL: SEGUIR @JUCANAMAXIMILIANO]
[BOTÃO SECUNDÁRIO: VOLTAR PARA O SITE]

═══════════════════════════════════════════
```

**Technical:**
- Log in database: `disqualified: true, disqualification_reason: "solo_business"`

### If selects B (2-3 pessoas):

**Proceed but with soft flag:** `small_team_flag: true`
- Juçanã may address in diagnostic call

### If selects C or D (4-15 pessoas):
**Proceed to Screen 7** — Ideal fit

### If selects E (16+ pessoas):
**Proceed with soft flag:** `large_team_flag: true`
- May be too large or perfect fit — Juçanã evaluates manually

---

## SCREEN 7: MAIOR DESAFIO

**Progress:** 7 of 10

**Question:** "Qual o MAIOR desafio que você enfrenta hoje no seu negócio?"

**Section Label:** "Contexto"

**Type:** Textarea (required)

**Placeholder:**
```
Ex: "Trabalho 12 horas por dia e se eu paro, tudo para.
Minha equipe não executa sem eu ficar em cima..."
```

**Helper Text:**
"Seja específica. Quanto mais eu entender, melhor posso te ajudar na nossa conversa. 💙"

**Character Counter:** "0 / 300"

**Validation:**
- Required
- Minimum: 30 characters
- Maximum: 300 characters

**Error Message (< 30 chars):**
"Preciso que você detalhe um pouquinho mais. O que te mantém acordada à noite sobre o negócio? 💙"

**Button:** "CONTINUAR"
- Note: "Shift ⇧ + Enter ↵ para fazer uma quebra de linha."

**Design Notes:**
- Textarea: 5 rows visible initially
- Auto-expands as user types (max 8 rows)
- Character counter updates in real-time (turns red if over limit)

---

## SCREEN 8: INVESTIMENTO

**Progress:** 8 of 10

**Question:** "O investimento na Mentoria SEJA LIVRE é:"

**Section Label:** "Fit"

**Pricing Display (Portugal):**

```
┌─────────────────────────────────────────┐
│  INVESTIMENTO                           │
│                                         │
│  Parcelado: 6x de €750                  │
│  À vista: €4.500                        │
│                                         │
│  (Mentoria 1-on-1 de 6 meses)           │
└─────────────────────────────────────────┘
```

**Pricing Display (Brasil):**

```
┌─────────────────────────────────────────┐
│  INVESTIMENTO                           │
│                                         │
│  Parcelado: 6x de R$4.500               │
│  À vista: R$25.000                      │
│                                         │
│  (Mentoria 1-on-1 de 6 meses)           │
└─────────────────────────────────────────┘
```

**Follow-up Question:** "Como você se sente em relação a esse investimento?"

**Type:** Multiple choice (radio buttons, single selection)

**Options:**

```
○ A. Estou pronta e consigo investir agora

○ B. É significativo, mas vejo o valor e consigo fazer

○ C. Preciso avaliar com mais calma / falar com sócio(a)

○ D. Está fora do meu alcance neste momento
```

**Helper Text:**
"Eu sei que é um investimento significativo. Pensa assim: quanto CUSTA continuar presa trabalhando 10-14h/dia? Sua saúde declinando? Relacionamentos sofrendo? O custo real é o de continuar onde está. 💙"

**Validation:**
- Required (must select one)

**NO DISQUALIFICATION:** Even if selects D, proceeds to next screen
- Rationale: Juçanã can address financing options or payment plans in discovery call
- These leads are pre-qualified (revenue + team size), may have access to capital
- Flag in database: `investment_concern: true` if C or D selected

**Button:** "CONTINUAR"

**Design Note:**
- Question text in white
- Investment amounts in **bold** and slightly larger (20px)
- Helper text in softer beige color

---

## SCREEN 9: DISPONIBILIDADE

**Progress:** 9 of 10

**Question:** "Você tem disponibilidade de 2-3 horas por semana para as sessões e implementação?"

**Section Label:** "Fit"

**Breakdown shown below question:**
```
• 2 horas/semana: Sessões ao vivo comigo
• 1-2 horas/semana: Implementação no seu negócio
```

**Type:** Multiple choice (radio buttons, single selection)

**Options:**

```
○ Sim, tenho disponibilidade

○ Não tenho disponibilidade no momento
```

**Helper Text:**
"Transformação real exige tempo E comprometimento. Se você não consegue dedicar esse tempo agora, talvez não seja o momento ideal. E tudo bem — eu prefiro te ter quando você pode aproveitar 100%. 💙"

**Validation:**
- Required (must select one)

**SOFT FLAG (if "Não tenho disponibilidade"):**
- Does NOT block progression
- Flags in database: `availability_concern: true`
- Juçanã addresses in discovery call
- Rationale: Sometimes people FIND the time when they see the value

**Button:** "CONTINUAR"

---

## SCREEN 10: CONFIRMAÇÃO FINAL

**Progress:** 10 of 10

**Question:** "Antes de finalizar, confirme:"

**Section Label:** "Confirmação"

**Type:** Checkboxes (must check ALL to proceed)

**Options:**

```
☐ Li e entendi que o investimento é de €4.500 (ou 6x €750)

☐ Tenho disponibilidade de 2-3 horas/semana para o programa

☐ Entendo que a aplicação não garante minha vaga (processo seletivo)

☐ Autorizo contato via WhatsApp para dar seguimento ao processo
```

**Helper Text:**
"Essas confirmações garantem que estamos alinhadas. Se algo não faz sentido agora, talvez não seja o momento ideal — e tudo bem! Prefiro te ter quando você está 100% pronta. 💙❤️"

**Validation:**
- ALL 4 checkboxes must be checked to enable button

**Error Message (if tries to proceed without all checked):**
"Preciso que você confirme todos os itens acima para garantirmos fit. Se algo não faz sentido, vamos conversar sobre isso — mas preciso da sua confirmação honesta aqui. 💙"

**Button:** "FINALIZAR APLICAÇÃO"
- Only active when all 4 checked
- Larger button (60px height)
- Borgonha with subtle animation on hover

---

## SCREEN 11: SUCESSO + AGENDAMENTO

**Progress:** Complete (no progress bar)

**Type:** Confirmation page with embedded Calendly

**Copy:**

```
═══════════════════════════════════════════

🎉 APLICAÇÃO RECEBIDA, [NOME]!

Obrigada por compartilhar sua história comigo. Eu li cada palavra
e já estou pensando em como posso te ajudar.

PRÓXIMO PASSO:

Agende agora sua Sessão de Diagnóstico gratuita (45 minutos).

Nessa conversa vamos:
→ Mapear exatamente o que te mantém presa no negócio
→ Identificar os 3 gargalos principais
→ Traçar um plano de ação (mesmo que você não entre na mentoria)

───────────────────────────────────────────

[CALENDLY EMBED HERE]
- 45-minute appointment type
- Pass via URL: name, phone

───────────────────────────────────────────

ENQUANTO ISSO:

→ Fique de olho no seu WhatsApp (vou confirmar o agendamento)
→ Me segue no Instagram: @jucanamaximiliano
→ Prepare-se pensando: "Como seria minha vida se meu negócio
  funcionasse sem mim?"

Do meu coração para o seu: você chegou até aqui por uma razão.
Seu instinto está te dizendo que é hora de mudar. Confie nele.

Até breve,
Juçanã 💙❤️🦅

P.S.: Se tiver qualquer dúvida antes da call, me manda DM no
Instagram. Eu mesma respondo.

═══════════════════════════════════════════
```

**Visual Elements:**
- Celebration emoji (🎉) large at top
- Checkmarks (✓) in green/success color
- Divider lines (───) between sections
- CTA buttons:
  - Primary: [Inside Calendly widget]
  - Secondary (links): "Seguir no Instagram" | "Salvar Contato"

**Calendly Configuration:**
- Embed inline (not popup)
- Pre-fill: name, phone
- Confirmation: Custom message with prep instructions
- Reminder emails: 24h before, 1h before

---

## EMAIL/WHATSAPP AUTOMATION

### **Trigger 1: Immediate Confirmation (Screen 11 completion)**

**Channel:** Email + WhatsApp

**Timing:** Instant

**Subject (Email):** "Aplicação recebida, [Nome]! Próximos passos 💙"

**Message:**

```
Oi [Nome]!

Sua aplicação para a Mentoria SEJA LIVRE foi recebida. 🎉

Se você já agendou sua Sessão de Diagnóstico — perfeito!
Se ainda não agendou, aqui está o link: [LINK CALENDLY]

IMPORTANTE:
→ Confere seu spam/lixeira (às vezes emails vão parar lá)
→ Salva meu número: [WhatsApp]
→ Prepara suas maiores dúvidas para nossa conversa

Enquanto isso, me segue no Instagram (@jucanamaximiliano)
e prepara o coração para nossa conversa. 💙❤️

Juçanã 🦅
```

---

### **Trigger 2: Abandonment After Screen 3+ (has contact)**

**Channel:** WhatsApp

**Timing:** 24 hours after abandonment

**Message:**

```
Oi [Nome], aqui é a Juçanã 💙

Vi que você começou a aplicação para a mentoria SEJA LIVRE
mas não finalizou.

Tá tudo bem? Algo te travou?

Se foi dúvida sobre o processo ou se faz sentido para você —
me responde aqui. Eu mesma respondo.

Se não era o momento, sem problema. Você sabe onde me encontrar.

Mas se você SENTE que precisa dessa transformação e algo te impediu
de terminar... não deixa o medo decidir por você.

Aqui está o link para continuar de onde parou:
[LINK COM RESPOSTAS PRÉ-PREENCHIDAS]

💙❤️
```

**Technical:**
- Generate unique resume link with token
- Pre-populate all answered questions
- Start at next unanswered screen

---

### **Trigger 3: Calendly Scheduled (Confirmation + Prep)**

**Channel:** Email + WhatsApp

**Timing:** Immediate after Calendly booking + 24h reminder

**Subject (Email):** "Conversa agendada! Prepare-se, [Nome] 💙"

**Message (Immediate Confirmation):**

```
[Nome], sua Sessão de Diagnóstico está agendada! 🎉

📅 Data: [Day, Month, Year]
⏰ Horário: [Time] (horário de Lisboa/Brasília)
⏱ Duração: 45 minutos

LINK DA CALL: [Zoom/Google Meet link]

───────────────────────────────────────────

COMO SE PREPARAR:

1. Reserve 50 minutos (não apenas 45) — pode estender um pouquinho
2. Esteja em local silencioso, sem interrupções
3. Tenha papel e caneta (vou te dar insights valiosos)
4. Traga suas dúvidas e medos — quero ouvir tudo

O QUE VAMOS CONVERSAR:

→ Sua situação atual (o que te prende)
→ Como a mentoria funciona especificamente para você
→ Roadmap personalizado de libertação
→ Investimento e próximos passos (se somos fit)

───────────────────────────────────────────

⚠️ IMPORTANTE:
- Se algo urgente surgir, me avisa com antecedência no WhatsApp
- Vou te mandar lembrete 24h e 1h antes

Estou animada para te conhecer! 💙❤️🦅

Juçanã

P.S.: Já me segue no Instagram? @jucanamaximiliano
```

**Message (24h Reminder via WhatsApp):**

```
Oi [Nome]! 💙

Lembrete: Nossa Sessão de Diagnóstico é AMANHÃ!

📅 [Day, Month] às [Time]
🔗 Link: [meeting link]

Te vejo lá! Traz suas dúvidas e seu coração aberto.
Vamos fazer valer cada minuto. 🦅

Juçanã ❤️
```

---

## DATA SCHEMA (Backend)

```json
{
  "nome_completo": "string",
  "whatsapp": "string",
  "country_code": "+55 | +351",
  "instagram": "string | null",
  "tipo_negocio": "A | B | C | D | E",
  "faturamento": "A | B | C | D | E",
  "tamanho_equipe": "A | B | C | D | E",
  "maior_desafio": "string",
  "sentimento_investimento": "A | B | C | D",
  "disponibilidade": "sim | nao",
  "confirmations": ["invest", "tempo", "processo", "contato"],

  "metadata": {
    "utm_source": "string",
    "utm_medium": "string",
    "utm_campaign": "string",
    "started_at": "timestamp",
    "completed_at": "timestamp",
    "abandoned_at_screen": "number | null",
    "disqualified": "boolean",
    "disqualification_reason": "revenue_below_minimum | solo_business | null",
    "flags": {
      "availability_concern": "boolean",
      "investment_concern": "boolean",
      "small_team_flag": "boolean",
      "large_team_flag": "boolean"
    }
  }
}
```

---

## CONVERSION OPTIMIZATION NOTES

### **Expected Drop-off Points & Mitigation**

**Screen 2-3 (Contact Info):**
- Expected drop: 15-20%
- Why: Privacy concerns
- Mitigation: Helper text reassures "no spam" + shows Juçanã's personal touch

**Screen 5 (Revenue Qualification):**
- Expected drop: 30-40% (disqualified)
- Why: Below threshold
- Mitigation: Warm disqualification message + alternative resources

**Screen 7 (Open-ended question):**
- Expected drop: 10-15%
- Why: Requires thinking + typing
- Mitigation: Clear placeholder, character limit (not too long), encouraging helper text

**Screen 8-10 (Investment + Final Commitment):**
- Expected drop: 10-15%
- Why: Price reality check
- Mitigation: Frame investment vs cost of staying stuck, soft flags (not hard blocks)

### **A/B Test Ideas (Future Optimization)**

1. **Screen 0 copy:**
   - A: Current (formal, selective)
   - B: More warm/inviting ("Vem comigo descobrir...")

2. **Progress bar visibility:**
   - A: Always visible
   - B: Hidden until screen 5 (less intimidation early)

3. **Helper text tone:**
   - A: Current (warm-direct)
   - B: More playful (more emojis, casual)

4. **Investment screen:**
   - A: Show price first (current)
   - B: Frame value first, then price

5. **Disqualification message:**
   - A: Current (alternative resources)
   - B: Waitlist option ("Notify me when program expands")

---

## DESIGN SYSTEM

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--navy-primary` | #191F3A | Background |
| `--navy-lighter` | #2A3154 | Input fields, selected states |
| `--borgonha` | #81171F | CTAs, accents, selected radio/checkbox |
| `--beige` | #F5F5DC | Helper text, section labels |
| `--white` | #FFFFFF | Primary text, question text |
| `--error-red` | #E74C3C | Error states |
| `--success-green` | #27AE60 | Success states |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Headlines | Lora | 22-28px | 500-600 |
| Body | Century Gothic | 16-18px | 400 |
| Section labels | Century Gothic | 14px | 400 |
| Helper text | Century Gothic | 15px | 400 |

### Spacing

| Token | Value |
|-------|-------|
| `--space-sm` | 12px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |

---

**END OF DOCUMENT**

_Form designed to align with Juçanã's brand voice (authentic, direct, warm) and best UX practices (one question at a time, early contact collection, granular tracking)._

**Version:** 3.0 (SEJA LIVRE Mentoria)
**Last Updated:** 2025-12-10
**Ready for:** Frontend development + backend API + integrations
