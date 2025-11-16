# SEJA LIVRE - Application Form Design
**Created:** 2025-11-13
**Updated:** 2025-11-14
**Purpose:** Pre-qualify leads for Grupo de Tração with Juçanã
**Form Type:** One Question Per Screen (13 screens + scheduling)
**Target Time:** 5-7 minutes completion
**Inspiration:** Bettina Rudolph application flow (granular tracking, early contact collection)

---

## STRATEGIC OVERVIEW

### **Why One Question Per Screen?**

1. **Reduced Cognitive Load**: Less overwhelming than multi-question pages
2. **Granular Abandonment Tracking**: Know exactly where leads drop off
3. **Early Contact Collection**: Get phone/Instagram by screen 3 (enables follow-up even if abandoned)
4. **Progressive Commitment**: Psychological momentum (already answered 5 questions, might as well finish)
5. **Early Disqualification**: Save everyone's time (screens 5-6 filter out non-fits)

### **Key Design Decisions**

- **Contact Before Qualification**: Collect WhatsApp + Instagram BEFORE asking hard questions (screens 2-4)
- **Transparent Investment**: Show exact pricing on screen 12 (no surprises, self-qualification)
- **Disqualification With Love**: Warm, helpful rejection messages (not "you don't qualify")
- **Juçanã's Voice Throughout**: Every helper text, error message, and transition in her warm-direct style
- **Auto-save Everything**: Capture data after each screen (never lose lead info)

### **Conversion Funnel Expected Metrics**

- Screen 1 → Screen 2: 85-90% (just name)
- Screen 2 → Screen 3: 80-85% (contact info)
- Screen 3 → Screen 5: 75-80% (instagram optional)
- Screen 5: ~30% disqualified (revenue < R$30k)
- Screen 6: ~20% disqualified (team size 1-2 or 15+)
- Screen 6 → Screen 14: 60-70% (qualified leads who complete)
- **Overall Completion**: 35-45% of starters (high due to early contact collection + voice)

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
GRUPO DE TRAÇÃO 🦅

Vamos avaliar pessoalmente, de forma cautelosa, cada aplicação
e selecionar apenas quem realmente pode aproveitar essa oportunidade
e agregar ao grupo.

Baseado nas suas respostas, você será ou não selecionado para uma
entrevista pessoal com um especialista do Grupo Libertas.

⚠️ Importante: O preenchimento deste formulário não garante sua vaga.
Temos vagas limitadas e por isso avaliamos cautelosamente cada interessado.

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
- Lora serif for headline "GRUPO DE TRAÇÃO"
- Century Gothic for body text
- Warning emoji (⚠️) in gold/yellow
- Hearts emoji at end (💙❤️) brand colors

---

## SCREEN 1: NOME COMPLETO

**Progress:** 1 of 13

**Question:** "Nome completo:"

**Section Label:** "Informações Básicas"

**Type:** Text input (required)

**Placeholder:** "Digite sua resposta aqui..."

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
- Progress bar at top: "1/13" text + visual bar

---

## SCREEN 2: WHATSAPP

**Progress:** 2 of 13

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

**Button:** "OK"
- Subtext: "Pressione Enter ↵"

**Technical Note:**
- Use library like `react-phone-number-input` or `intl-tel-input`
- Validate with libphonenumber
- Store: country code + full number separately

---

## SCREEN 3: INSTAGRAM

**Progress:** 3 of 13

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

**Button:** "OK"
- Subtext: "Pressione Enter ↵"

**Secondary Button (text link below):**
"Não tenho Instagram" (allows skip to next screen)

**Visual Note:**
- Input shows "@" prefix automatically (gray, non-editable)
- User types after the @

---

## SCREEN 4: SITUAÇÃO ATUAL

**Progress:** 4 of 13

**Question:** "Qual das opções abaixo melhor te representa:"

**Type:** Multiple choice (radio buttons, single selection)

**Options:**

```
○ A. Tenho um infoproduto que é minha renda principal

○ B. Tenho um infoproduto, mas ainda não é a minha renda principal

○ C. Não tenho um infoproduto, mas tenho autoridade offline e gostaria
     de criar um produto digital
```

**Validation:**
- Required (must select one)

**Button:** "Continuar" (only active when option selected)

**Design Notes:**
- Radio buttons: empty circle, fills with borgonha dot when selected
- Options A/B/C in Century Gothic 16px
- Option text wraps if needed (maintain line height 1.5)
- Each option has full-width clickable area (not just the circle)

**No Disqualification:** All options proceed to next screen

---

## SCREEN 5: TICKET DO INFOPRODUTO

**Progress:** 5 of 13

**Question:** "Qual é o ticket do seu infoproduto?"

**Type:** Multiple choice (radio buttons, single selection)

**Options:**

```
○ A. Até R$ 3k

○ B. Entre R$ 3k e R$ 5k

○ C. Entre R$ 5k e R$ 10k

○ D. De R$ 10k até R$ 20k

○ E. De R$ 20k até R$ 50k

○ F. Acima de R$ 50k

○ G. Ainda não tenho infoproduto
```

**Validation:**
- Required (must select one)

**Button:** "Continuar"

**No Disqualification:** All options proceed (this is context-gathering, not filtering)

---

## SCREEN 6: FATURAMENTO MENSAL

**Progress:** 6 of 13

**Question:** "Qual é o seu faturamento médio mensal nos últimos 12 meses? (Somando todas as suas rendas):"

**Type:** Multiple choice (radio buttons, single selection)

**Options:**

```
○ A. Até R$ 10 mil

○ B. De R$ 10 mil a R$ 30 mil

○ C. De R$ 30 mil a R$ 50 mil ✓ QUALIFICA

○ D. De 50 mil a R$ 100 mil ✓ QUALIFICA

○ E. De R$ 100 mil a R$ 500 mil ✓ QUALIFICA

○ F. Acima de R$ 500k ✓ QUALIFICA
```

**Validation:**
- Required (must select one)

**DISQUALIFICATION LOGIC:**

### If selects A (< R$10k) or B (R$10k-R$30k):

**Screen shows:**

```
═══════════════════════════════════════════

Obrigada pela sua honestidade, [Nome]! 💙

O Grupo de Tração é desenhado para empreendedoras que já faturam
R$ 30 mil+/mês e estão presas no operacional, trabalhando demais
para manter esse faturamento.

Para negócios em estágio anterior, recomendo:

→ Meu Instagram (@jucanamaximiliano) — conteúdo gratuito sobre
  vendas, sistemas e mentalidade

→ Café com Vendas (evento trimestral) — próxima turma em breve

Quando você chegar nos R$ 30k/mês e sentir que está trabalhando
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
- Log in database: `disqualified: true, disqualification_reason: "revenue_below_30k"`
- Send email/WhatsApp: "Obrigada por se candidatar. No momento o Grupo de Tração é para faturamento R$30k+. Te aviso quando abrir programa para seu estágio. Enquanto isso, segue conteúdo gratuito: [link Instagram]"

### If selects C, D, E, or F (R$30k+):
**Proceed to Screen 7**

---

## SCREEN 7: NICHO/SEGMENTO

**Progress:** 7 of 13

**Question:** "Em qual nicho você atua (ou pretende criar o seu infoproduto)?"

**Type:** Textarea (required)

**Placeholder:**
```
Ex: "Mentoria para arquitetas que querem escalar escritório sem perder qualidade criativa"

ou

"Ainda não tenho infoproduto, mas minha autoridade é em branding para terapeutas holísticas"
```

**Helper Text:**
"Seja específica. Quanto mais eu entender, melhor posso te ajudar na nossa conversa. 💙"

**Character Counter:** "0 / 300"

**Validation:**
- Required
- Minimum: 20 characters
- Maximum: 300 characters

**Error Message (< 20 chars):**
"Preciso que você detalhe um pouquinho mais para eu entender seu nicho. Pode escrever mais? 💙"

**Button:** "Continuar"
- Note: "Shift ⇧ + Enter ↵ para fazer uma quebra de linha."

**Design Notes:**
- Textarea: 5 rows visible initially
- Auto-expands as user types (max 8 rows)
- Character counter updates in real-time (turns red if over limit)

---

## SCREEN 8: POR QUE SUA APLICAÇÃO DEVE SER ACEITA

**Progress:** 8 of 13

**Question:** "Esse é um grupo seleto e restrito, e o número de vagas é bastante limitado. Por que você acha que sua aplicação deve ser aceita?"

**Type:** Textarea (required)

**Placeholder:**
```
Digite sua resposta aqui...
```

**Helper Text:**
"Seja honesta e específica. Não existe resposta 'certa' — existe a SUA resposta. O que te faz única? Por que VOCÊ? 💙❤️"

**Character Counter:** "0 / 500"

**Validation:**
- Required
- Minimum: 50 characters
- Maximum: 500 characters

**Error Message (< 50 chars):**
"Preciso que você se abra um pouco mais. O que te torna especial? O que você traz? Me conta mais. 💙"

**Button:** "Continuar"
- Note: "Shift ⇧ + Enter ↵ para fazer uma quebra de linha."

---

## SCREEN 9: INVESTIMENTO

**Progress:** 9 of 13

**Question:** "O investimento para a participação do Grupo de Tração é de até 12x de R$ 6.293,38 no cartão de crédito ou R$ 60.000,00 à vista."

**Type:** Multiple choice (radio buttons, single selection)

**Options:**

```
○ A. Sim, quero fazer o investimento à vista.

○ B. Sim, quero fazer o investimento parcelado.

○ C. Não tenho esse valor no momento
```

**Helper Text:**
"Eu sei que é um investimento significativo. Mas pensa assim: quanto CUSTA continuar presa trabalhando 70h/semana? Sua saúde declinando? Relacionamentos sofrendo? O custo real não é o investimento na mentoria — é o custo de continuar na prisão. 💙"

**Validation:**
- Required (must select one)

**NO DISQUALIFICATION:** Even if selects C, proceeds to next screen
- Rationale: Juçanã can address financing options or payment plans in discovery call
- These leads are pre-qualified (R$30k+ revenue), may have access to capital

**Button:** "Continuar"

**Design Note:**
- Question text in white
- Investment amounts in **bold** and slightly larger (20px)
- Helper text in softer beige color

---

## SCREEN 10: DISPONIBILIDADE - TEMPO

**Progress:** 10 of 13

**Question:** "Você tem disponibilidade de pelo menos 6 horas por semana para se dedicar ao programa?"

**Breakdown shown below question:**
```
• 2 horas/semana: Sessões ao vivo comigo
• 4 horas/semana: Implementação dos sistemas no seu negócio
```

**Type:** Multiple choice (radio buttons, single selection)

**Options:**

```
○ Sim, tenho disponibilidade

○ Não tenho disponibilidade no momento
```

**Helper Text:**
"Transformação real exige tempo E comprometimento. Se você não consegue dedicar 6 horas/semana agora, talvez não seja o momento ideal. E tudo bem — eu prefiro te ter quando você pode aproveitar 100%. 💙"

**Validation:**
- Required (must select one)

**SOFT DISQUALIFICATION (if "Não tenho disponibilidade"):**
- Does NOT block progression
- Flags in database: `availability_concern: true`
- Juçanã addresses in discovery call
- Rationale: Sometimes people FIND the time when they see the value

**Button:** "Continuar"

---

## SCREEN 11: COMPROMETIMENTO - 90 DIAS

**Progress:** 11 of 13

**Question:** "Você está disposta a se comprometer intensamente por 90 dias para transformar seu negócio?"

**Type:** Multiple choice (radio buttons, single selection)

**Options:**

```
○ Sim, estou pronta para me comprometer

○ Não tenho certeza se posso me comprometer agora
```

**Helper Text:**
"O Grupo de Tração não é programa de 'consumir conteúdo'. É trabalho real, implementação real, transformação real. Se você não está pronta para fazer a sua parte, sem problema — mas preciso de honestidade aqui. 🦅"

**Validation:**
- Required (must select one)

**SOFT DISQUALIFICATION (if "Não tenho certeza"):**
- Does NOT block progression
- Flags in database: `commitment_concern: true`
- Juçanã addresses in discovery call

**Button:** "Continuar"

---

## SCREEN 12: EXPECTATIVA DE INÍCIO

**Progress:** 12 of 13

**Question:** "Quando você gostaria de começar sua transformação?"

**Type:** Multiple choice (radio buttons, single selection)

**Options:**

```
○ Imediatamente (próxima vaga disponível)

○ Nos próximos 30 dias

○ Nos próximos 60-90 dias

○ Ainda estou avaliando o momento certo
```

**Helper Text:**
"Não existe resposta 'certa' aqui. Só quero entender seu timing para alinhar com as vagas disponíveis. 💙"

**Validation:**
- Required (must select one)

**NO DISQUALIFICATION:** All answers proceed

**Button:** "Continuar"

---

## SCREEN 13: CONFIRMAÇÃO FINAL

**Progress:** 13 of 13

**Question:** "Antes de finalizar, confirme:"

**Type:** Checkboxes (must check ALL to proceed)

**Options:**

```
☐ Li e entendi que o investimento é de até 12x de R$ 6.293,38 ou R$ 60.000 à vista

☐ Tenho disponibilidade de 6 horas/semana para o programa

☐ Estou comprometida com 90 dias de trabalho intensivo

☐ Entendo que a aplicação não garante minha vaga (vagas limitadas, processo seletivo)
```

**Helper Text:**
"Essas confirmações garantem que estamos alinhadas. Se alguma não faz sentido agora, talvez não seja o momento ideal — e tudo bem! Prefiro te ter quando você está 100% pronta. 💙❤️"

**Validation:**
- ALL 4 checkboxes must be checked to enable button

**Error Message (if tries to proceed without all checked):**
"Preciso que você confirme todos os itens acima para garantirmos fit. Se algo não faz sentido, vamos conversar sobre isso — mas preciso da sua confirmação honesta aqui. 💙"

**Button:** "FINALIZAR APLICAÇÃO"
- Only active when all 4 checked
- Larger button (60px height)
- Borgonha with subtle animation on hover

---

## SCREEN 14: SUCESSO + AGENDAMENTO

**Progress:** Complete (no progress bar)

**Type:** Confirmation page with embedded Calendly

**Copy:**

```
═══════════════════════════════════════════

🎉 APLICAÇÃO RECEBIDA, [NOME]!

Obrigada por compartilhar sua história comigo. Eu li cada palavra
e já estou pensando em como posso te ajudar.

PRÓXIMOS PASSOS:

✓ Vou analisar sua aplicação nas próximas 24-48 horas
✓ Se somos fit, você recebe email + WhatsApp com link para agendar
  nossa Conversa de Descoberta
✓ Na call de 45 minutos, vamos mergulhar fundo na sua situação
  e traçar seu roadmap de libertação

───────────────────────────────────────────

Mas seu horário está quase reservado...

Escolha um horário abaixo e clique "FAZER MEU AGENDAMENTO"
para confirmar seu horário com um dos especialistas do
Grupo Libertas.

Reforçamos que NÃO HÁ REAGENDAMENTO e que sua vaga será
liberada caso não confirme a presença.

[CALENDLY EMBED HERE]
- 45-minute appointment type
- Pass via URL: name, email (from WhatsApp), phone

───────────────────────────────────────────

ENQUANTO ISSO:

→ Fique de olho no seu email (confira spam também!)
→ Salve meu contato no WhatsApp: [número]
→ Me segue no Instagram: @jucanamaximiliano
→ Prepare-se para nossa conversa pensando:
  "Como seria minha vida se meu negócio funcionasse sem mim?"

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
- Social proof: Small testimonial carousel (optional)
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

### **Trigger 1: Immediate Confirmation (Screen 14 completion)**

**Channel:** Email + WhatsApp

**Timing:** Instant

**Subject (Email):** "Aplicação recebida, [Nome]! Próximos passos 💙"

**Message:**

```
Oi [Nome]!

Sua aplicação para o Grupo de Tração foi recebida. 🎉

Vou analisar suas respostas nas próximas 24-48 horas e te aviso
se somos fit.

IMPORTANTE:
→ Confere seu spam/lixeira (às vezes emails vão parar lá)
→ Salva meu número: [WhatsApp]
→ Se não agendar ainda, fica de olho no email — vou te mandar
  o link do Calendly se aprovada

Enquanto isso, me segue no Instagram (@jucanamaximiliano)
e prepara o coração para nossa conversa. 💙❤️

Juçanã 🦅
```

---

### **Trigger 2: Abandonment After Screen 3+ (has contact)**

**Channel:** Email + WhatsApp

**Timing:** 24 hours after abandonment

**Subject (Email):** "[Nome], vi que você começou sua aplicação... 💙"

**Message:**

```
Oi [Nome],

Sou eu, Juçanã.

Vi que você começou a preencher sua aplicação para o Grupo de Tração,
mas não finalizou.

Tá tudo bem? Algo te travou?

Se foi dúvida sobre investimento, processo, ou se faz sentido para você —
me manda um "OI" neste email ou no WhatsApp [(número)].
Eu mesma respondo.

Se simplesmente não era o momento, sem problema também. Você sabe
onde me encontrar. 💙❤️

Mas se você SENTE que precisa dessa transformação e algo te impediu
de terminar... não deixa o medo decidir por você.

Aqui está o link para continuar de onde parou:
[LINK WITH PRE-FILLED RESPONSES]

Do meu coração para o seu: vagas são limitadas (5 por trimestre).
Se você quer, termina sua aplicação. Depois a gente vê se somos fit.
Mas não decide por mim antes de eu conhecer você. 🦅

Juçanã 💙❤️
```

**Technical:**
- Generate unique resume link with token
- Pre-populate all answered questions
- Start at next unanswered screen

---

### **Trigger 3: Application Approved**

**Channel:** Email + WhatsApp

**Timing:** Within 48 hours of submission (manual approval by Juçanã or team)

**Subject (Email):** "Sua aplicação foi aprovada, [Nome]! Vamos conversar? 💙❤️"

**Message:**

```
[Nome]!

Li sua aplicação duas vezes. E quero muito te conhecer.

Seu desafio de [CUSTOM: referência específica da resposta "por que aceita"]
é exatamente o que o Grupo de Tração resolve. Já passei por isso
e tenho o caminho.

PRÓXIMO PASSO: Agendar nossa Conversa de Descoberta

Essa call de 45 minutos é onde vamos:
→ Mergulhar fundo na sua situação específica
→ Eu te mostro como o método funciona no SEU caso
→ Você tira todas as dúvidas
→ A gente decide junto se somos fit

Escolha seu horário aqui:
[CALENDLY LINK PERSONALIZADO]

⚠️ IMPORTANTE:
- Vagas limitadas, confirme logo
- Chega 5 min antes (vamos aproveitar cada segundo)
- Tenha papel e caneta (vou te dar insights mesmo antes de fecharmos)

Te vejo em breve. Estou animada! 🦅

Juçanã 💙❤️

P.S.: Vou te mandar lembrete 1 dia antes da call no WhatsApp.
```

**Technical:**
- Personalized Calendly link with UTM params + pre-fill
- Track email open + link click

---

### **Trigger 4: Application Not Approved (Soft Rejection)**

**Channel:** Email + WhatsApp

**Timing:** Within 48 hours of submission

**Subject (Email):** "Sobre sua aplicação, [Nome] 💙"

**Message:**

```
Oi [Nome],

Obrigada por se candidatar ao Grupo de Tração. Eu li sua aplicação
com carinho.

Neste momento, não vejo fit para você entrar no grupo. Não é sobre
você não ser boa o suficiente — é sobre timing e encaixe.

O Grupo de Tração é muito específico para [razão: ex: empreendedoras
com equipe de 3-8 pessoas em crise operacional], e sinto que você
está em outro estágio agora.

MAS isso não significa que não posso te ajudar:

→ Me segue no Instagram (@jucanamaximiliano) — conteúdo gratuito
  sobre vendas e sistemas
→ Fica de olho no Café com Vendas (evento trimestral) — próxima
  turma em breve

E quando sua situação mudar (mais faturamento, equipe maior, ou
desafio operacional intenso), volta a aplicar. As portas estão
sempre abertas para quem está pronta. 🦅

Do meu coração para o seu: você está no caminho certo. Continue. 💙❤️

Juçanã
```

---

### **Trigger 5: Calendly Scheduled (Confirmation + Prep)**

**Channel:** Email + WhatsApp

**Timing:** Immediate after Calendly booking + 24h reminder

**Subject (Email):** "Conversa agendada! Prepare-se, [Nome] 💙"

**Message (Immediate Confirmation):**

```
[Nome], sua Conversa de Descoberta está agendada! 🎉

📅 Data: [Day, Month, Year]
⏰ Horário: [Time] (horário de Brasília)
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
→ Como o Grupo de Tração funciona especificamente para você
→ Roadmap personalizado de libertação
→ Investimento e próximos passos (se somos fit)

───────────────────────────────────────────

⚠️ IMPORTANTE:
- NÃO HÁ REAGENDAMENTO (vagas limitadas)
- Se algo urgente surgir, me avisa com antecedência no WhatsApp
- Vou te mandar lembrete 24h e 1h antes

Estou animada para te conhecer! 💙❤️🦅

Juçanã

P.S.: Já me segue no Instagram? @jucanamaximiliano
```

**Message (24h Reminder via WhatsApp):**

```
Oi [Nome]! 💙

Lembrete: Nossa Conversa de Descoberta é AMANHÃ!

📅 [Day, Month] às [Time]
🔗 Link: [meeting link]

Te vejo lá! Traz suas dúvidas e seu coração aberto.
Vamos fazer valer cada minuto. 🦅

Juçanã ❤️
```

---

## CONVERSION OPTIMIZATION NOTES

### **Expected Drop-off Points & Mitigation**

**Screen 2-3 (Contact Info):**
- Expected drop: 15-20%
- Why: Privacy concerns
- Mitigation: Helper text reassures "no spam" + shows Juçanã's personal touch

**Screen 6 (Revenue Qualification):**
- Expected drop: 30% (disqualified)
- Why: Below R$30k threshold
- Mitigation: Warm disqualification message + alternative resources

**Screen 7-8 (Open-ended questions):**
- Expected drop: 15-20%
- Why: Requires thinking + typing
- Mitigation: Clear placeholders, character limits (not too long), encouraging helper text

**Screen 12-13 (Investment + Final Commitment):**
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

### **Conversion Benchmarks to Track**

```
Target Metrics (after 100 applications):

✓ Screen 1 → Screen 2: 85%+ (just name)
✓ Screen 2 → Screen 3: 80%+ (phone)
✓ Screen 3 → Screen 6: 75%+ (pre-qualification)
✓ Screen 6 qualified: 60-70% (revenue R$30k+)
✓ Screen 6 → Screen 14 (of qualified): 70-80%
✓ Overall completion (of starters): 40-50%
✓ Calendly scheduled (of completed): 60-70%
✓ Discovery call attendance: 80%+
✓ Discovery call → enrollment: 25-35%

Overall funnel:
- 100 start form
- 45 complete form (45%)
- 30 schedule call (30% of starters, 67% of completers)
- 24 attend call (24% of starters, 80% show rate)
- 8 enroll (8% of starters, 33% close rate)
```

---


**END OF DOCUMENT**

_Form designed to align with Juçanã's brand voice (authentic, direct, warm) and Bettina's UX best practices (one question at a time, early contact collection, granular tracking)._

**Version:** 2.0
**Last Updated:** 2025-11-14
**Ready for:** Frontend development + backend API + integrations
