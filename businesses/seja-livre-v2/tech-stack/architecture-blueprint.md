# SEJA LIVRE v2 - Architecture Blueprint

**Generated:** 2025-12-10
**System:** Landing Page + 11-Screen Application Form
**Type:** High-ticket application funnel (€4,500 mentoring program)

---

## System Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                           USER JOURNEY                                  │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────┐ │
│  │   Landing   │───▶│ Application │───▶│   Success   │───▶│ Calendly│ │
│  │    Page     │    │    Form     │    │    Page     │    │  Call   │ │
│  │ (12 sections)│   │ (11 screens)│    │             │    │         │ │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────┘ │
│         │                  │                  │                        │
│    [WhatsApp]              ▼                  ▼                        │
│     Button          ┌─────────────────────────────┐                   │
│    (floating)       │      INTEGRATIONS           │                   │
│                     ├─────────────────────────────┤                   │
│                     │  📊 Notion    (store data)  │                   │
│                     │  ✅ Todoist   (track leads) │                   │
│                     │  📧 Resend    (confirm)     │                   │
│                     │  📬 MailerLite (nurture)    │                   │
│                     │  📈 PostHog   (analytics)   │                   │
│                     └─────────────────────────────┘                   │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Complete Data Flow

### Screen-by-Screen Flow

```
SCREEN 0: INTRO
└─▶ User clicks "COMEÇAR"
└─▶ Generate sessionId (UUID) in frontend
└─▶ Store in localStorage
└─▶ PostHog: application_started

═══════════════════════════════════════════════════════════════════

SCREEN 1: NOME COMPLETO
User enters: "Maria Silva"

└─▶ NO API CALL YET
└─▶ Store in localStorage only:
    {
      sessionId: "uuid...",
      name: "Maria Silva",
      currentScreen: 1
    }

═══════════════════════════════════════════════════════════════════

SCREEN 2: WHATSAPP  ◄── FIRST SAVE (Critical)
User enters: "+351 912 345 678"

→ API Call: POST /api/apply
  {
    sessionId: "uuid...",
    name: "Maria Silva",
    whatsapp: "+351912345678",
    country: "PT",
    currentScreen: 2,
    startedAt: timestamp
  }

→ NOTION: Creates new page in Applications database
  Returns: notionPageId

→ TODOIST: Creates task
  "🔔 Novo lead: Maria Silva - ACOMPANHAR"
  Due: +48 hours
  Priority: P2

→ PostHog: contact_captured

→ Store in localStorage:
  {
    sessionId: "uuid...",
    notionPageId: "xxx...",
    ...
  }

✅ NOW HAVE: Name + WhatsApp → Can contact if abandoned

═══════════════════════════════════════════════════════════════════

SCREEN 3: INSTAGRAM (Optional)
User enters: "@mariasilva"

→ API Call: PATCH /api/apply
  {
    notionPageId: "xxx...",
    data: {
      instagram: "@mariasilva",
      currentScreen: 3,
      lastActivityAt: timestamp
    }
  }

→ NOTION: Updates page

═══════════════════════════════════════════════════════════════════

SCREEN 4: TIPO DE NEGÓCIO
User selects: "A. Prestação de serviços"

→ API Call: PATCH /api/apply
→ NOTION: Updates tipoNegocio field

═══════════════════════════════════════════════════════════════════

SCREEN 5: FATURAMENTO MENSAL  ◄── QUALIFICATION GATE #1
User selects revenue option

→ API Call: PATCH /api/apply
  {
    data: {
      faturamento: "A" | "B" | "C" | "D" | "E",
      currentScreen: 5
    }
  }

→ IF selects A or B (< €15k/mês):
  └─▶ UPDATE NOTION:
      { status: "Disqualified", disqualificationReason: "revenue_below_15k" }
  └─▶ UPDATE TODOIST: Mark task complete with note
  └─▶ PostHog: application_disqualified
  └─▶ RETURN: { success: true, disqualified: true }
  └─▶ FRONTEND: Show soft rejection screen
  └─▶ END FLOW

→ IF selects C, D, or E (€15k+):
  └─▶ UPDATE NOTION: { qualified: true }
  └─▶ CONTINUE TO SCREEN 6

═══════════════════════════════════════════════════════════════════

SCREEN 6: TAMANHO DA EQUIPE  ◄── QUALIFICATION GATE #2
User selects team size

→ API Call: PATCH /api/apply

→ IF selects A (Solo):
  └─▶ UPDATE NOTION: { status: "Disqualified", reason: "solo_no_team" }
  └─▶ Show soft rejection screen
  └─▶ END FLOW

→ IF selects E (16+ pessoas):
  └─▶ UPDATE NOTION: { largeTeamFlag: true }
  └─▶ Flag for manual review, but CONTINUE

→ IF selects B, C, D (2-15 pessoas):
  └─▶ CONTINUE normally

═══════════════════════════════════════════════════════════════════

SCREEN 7: MAIOR DESAFIO
User enters text description

→ API Call: PATCH /api/apply
→ NOTION: Updates maiorDesafio (long text)

═══════════════════════════════════════════════════════════════════

SCREEN 8: INVESTIMENTO
Shows price: €4,500 (6x €750)
User selects sentiment about investment

→ API Call: PATCH /api/apply
→ NOTION: Updates sentimentoInvestimento

═══════════════════════════════════════════════════════════════════

SCREEN 9: DISPONIBILIDADE
User confirms 2-3h/week availability

→ API Call: PATCH /api/apply
→ IF "No": Flag availability_concern in Notion

═══════════════════════════════════════════════════════════════════

SCREEN 10: CONFIRMAÇÃO FINAL
User checks 4 required checkboxes:
☑ Li e entendi o investimento
☑ Tenho disponibilidade
☑ Entendo que é processo seletivo
☑ Autorizo contato via WhatsApp

→ API Call: PATCH /api/apply
→ All 4 must be checked to proceed

═══════════════════════════════════════════════════════════════════

SCREEN 11: SUCESSO  ◄── COMPLETION
→ API Call: POST /api/apply/complete
  {
    notionPageId: "xxx...",
    sessionId: "uuid..."
  }

→ NOTION: Update
  {
    status: "Completed",
    completedAt: timestamp
  }

→ TODOIST: Update existing task
  Title: "✅ Maria Silva - COMPLETO - Agendar diagnóstico"
  Due: Tomorrow
  Priority: P1
  Add link to Notion page

→ RESEND: Send confirmation email
  From: "Juçanã <jucana@sejalivre.pt>"
  To: (if email captured, else skip)
  Subject: "🎉 Aplicação Recebida!"
  Template: ApplicationConfirmed

→ MAILERLITE: Add subscriber to "applicants" group
  (if email captured)

→ PostHog: application_completed

→ SHOW: Success page with Calendly embed

═══════════════════════════════════════════════════════════════════
```

---

## Notion Database Schema

**Database Name:** `SEJA LIVRE - Aplicações`

### Fields

| Field | Type | Populated | Notes |
|-------|------|-----------|-------|
| **Name** | Title | Screen 1 | Primary field |
| **Status** | Select | Auto | Options below |
| **WhatsApp** | Phone | Screen 2 | With country code |
| **Country** | Select | Screen 2 | `Portugal` / `Brasil` |
| **Instagram** | URL | Screen 3 | Optional |
| **Tipo Negócio** | Select | Screen 4 | A/B/C/D/E |
| **Faturamento** | Select | Screen 5 | A/B/C/D/E |
| **Qualified** | Checkbox | Screen 5 | Auto-set if C/D/E |
| **Tamanho Equipe** | Select | Screen 6 | A/B/C/D/E |
| **Maior Desafio** | Text | Screen 7 | Long text |
| **Sentimento Investimento** | Select | Screen 8 | A/B/C/D |
| **Disponibilidade** | Checkbox | Screen 9 | Yes/No |
| **Confirmações** | Multi-select | Screen 10 | 4 items |
| **Session ID** | Text | Screen 2 | UUID for tracking |
| **Started At** | Date | Screen 2 | Timestamp |
| **Last Activity At** | Date | Each update | For abandonment |
| **Completed At** | Date | Screen 11 | Timestamp |
| **Current Screen** | Number | Each update | 0-11 |
| **Disqualification Reason** | Text | If disqualified | Reason code |
| **Large Team Flag** | Checkbox | Screen 6 | If 16+ |
| **Availability Concern** | Checkbox | Screen 9 | If no |
| **Todoist Task ID** | Text | Screen 2 | Reference |
| **Calendly Scheduled** | Checkbox | Manual | After booking |
| **Notes** | Text | Manual | Team notes |

### Status Options

| Status | Meaning |
|--------|---------|
| `In Progress` | Started but not completed |
| `Completed` | Finished all screens |
| `Disqualified` | Failed qualification gate |
| `Scheduled` | Booked diagnostic call |
| `Contacted` | Team reached out |
| `Won` | Became client |
| `Lost` | Did not convert |

### Database Views

**1. Pipeline (Kanban)**
- Group by: Status
- Show: Name, WhatsApp, Faturamento, Last Activity

**2. Abandonados (Table)**
- Filter: Status = "In Progress" AND Last Activity < 48h ago
- Sort: Last Activity (newest first)
- Show: Name, WhatsApp, Current Screen, Last Activity

**3. Esta Semana (Table)**
- Filter: Started At within last 7 days
- Sort: Started At (newest first)

**4. Qualificados (Table)**
- Filter: Qualified = true AND Status != "Disqualified"
- Sort: Completed At (newest first)

**5. Para Contactar (Table)**
- Filter: Status = "Completed" AND Calendly Scheduled = false
- Sort: Completed At (oldest first)

---

## Todoist Integration

### Project Setup

**Project Name:** `SEJA LIVRE Leads`

### Task Creation (Screen 2)

```
Title: 🔔 Novo lead: {name} - ACOMPANHAR
Due: +48 hours
Priority: P2 (orange)
Labels: ["seja-livre", "novo-lead"]

Description:
───────────────────────────────
📱 WhatsApp: {whatsapp}
🌍 País: {country}
📍 Parou na tela: 2

⏰ Se não completar em 48h, entrar em contato.

🔗 Ver no Notion: [link]
───────────────────────────────
```

### Task Update (Screen 11 - Completion)

```
Title: ✅ {name} - COMPLETO - Agendar diagnóstico
Due: Tomorrow
Priority: P1 (red)
Labels: ["seja-livre", "completo", "agendar"]

Description:
───────────────────────────────
📱 WhatsApp: {whatsapp}
💼 Negócio: {tipoNegocio}
💰 Faturamento: {faturamento}
👥 Equipe: {tamanhoEquipe}

📝 Maior desafio:
"{maiorDesafio}"

💭 Sobre investimento: {sentimentoInvestimento}

✅ AÇÃO: Confirmar agendamento do diagnóstico

🔗 Ver aplicação completa: [Notion link]
───────────────────────────────
```

### Task Update (Disqualification)

```
Title: ❌ {name} - Não qualificado
Due: None (complete immediately)
Priority: P4 (no priority)

Description:
───────────────────────────────
Motivo: {disqualificationReason}
📍 Parou na tela: {currentScreen}
───────────────────────────────
```

---

## Next.js Project Structure

```
seja-livre-v2/
│
├── .env.local                    # API keys (NEVER commit)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
│
├── app/
│   ├── page.tsx                  # Landing page (12 sections)
│   ├── layout.tsx                # Root layout + providers
│   ├── globals.css               # Tailwind + custom styles
│   │
│   ├── aplicacao/
│   │   └── page.tsx              # Multi-step form container
│   │
│   └── api/
│       └── apply/
│           ├── route.ts          # POST (create) + PATCH (update)
│           └── complete/
│               └── route.ts      # POST (finalize + integrations)
│
├── components/
│   ├── landing/                  # 12 LP sections
│   │   ├── Hero.tsx
│   │   ├── ProblemAgitation.tsx
│   │   ├── Transformation.tsx
│   │   ├── Solution.tsx
│   │   ├── FivePillars.tsx
│   │   ├── Authority.tsx
│   │   ├── SocialProof.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Objections.tsx
│   │   ├── Guarantee.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Footer.tsx
│   │
│   ├── form/                     # 11 form screens + extras
│   │   ├── FormContainer.tsx     # State management, navigation
│   │   ├── ProgressBar.tsx       # Visual progress indicator
│   │   ├── Screen0Intro.tsx
│   │   ├── Screen1Name.tsx
│   │   ├── Screen2WhatsApp.tsx
│   │   ├── Screen3Instagram.tsx
│   │   ├── Screen4TipoNegocio.tsx
│   │   ├── Screen5Faturamento.tsx
│   │   ├── Screen6TamanhoEquipe.tsx
│   │   ├── Screen7MaiorDesafio.tsx
│   │   ├── Screen8Investimento.tsx
│   │   ├── Screen9Disponibilidade.tsx
│   │   ├── Screen10Confirmacao.tsx
│   │   ├── Screen11Success.tsx
│   │   └── DisqualificationScreen.tsx
│   │
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── PhoneInput.tsx
│   │   ├── Textarea.tsx
│   │   ├── RadioGroup.tsx
│   │   ├── Checkbox.tsx
│   │   └── WhatsAppButton.tsx
│   │
│   └── emails/                   # React Email templates
│       └── ApplicationConfirmed.tsx
│
├── lib/
│   ├── notion.ts                 # Notion API client
│   ├── todoist.ts                # Todoist API client
│   ├── resend.ts                 # Resend email client
│   ├── mailerlite.ts             # MailerLite client
│   ├── posthog.ts                # PostHog configuration
│   ├── validations.ts            # Zod schemas
│   └── utils.ts                  # Helper functions
│
├── types/
│   └── application.ts            # TypeScript interfaces
│
└── public/
    ├── images/
    │   ├── jucana/               # Mentor photos
    │   ├── testimonials/         # Client photos
    │   └── brand/                # Logo, icons
    └── fonts/                    # Custom fonts (if any)
```

---

## API Design

### POST /api/apply — Create Application

**Purpose:** First save (Screen 2) - creates Notion page + Todoist task

```typescript
// Request
{
  sessionId: string,          // UUID generated on frontend
  name: string,               // From Screen 1
  whatsapp: string,           // E.164 format
  country: "PT" | "BR"
}

// Response (Success)
{
  success: true,
  notionPageId: string,
  todoistTaskId: string
}

// Response (Error)
{
  success: false,
  error: string
}
```

### PATCH /api/apply — Update Application

**Purpose:** Progressive saves (Screens 3-10)

```typescript
// Request
{
  notionPageId: string,
  data: {
    // Any fields from current screen
    currentScreen: number,
    lastActivityAt: string    // ISO timestamp
  }
}

// Response (Success)
{
  success: true,
  disqualified?: boolean      // True if failed qualification gate
}

// Response (Error)
{
  success: false,
  error: string
}
```

### POST /api/apply/complete — Finalize Application

**Purpose:** Screen 11 completion - triggers all integrations

```typescript
// Request
{
  notionPageId: string,
  sessionId: string
}

// Triggers (in order):
// 1. Update Notion status → "Completed"
// 2. Update Todoist task → "COMPLETO"
// 3. Send Resend confirmation email
// 4. Add to MailerLite "applicants" group

// Response (Success)
{
  success: true,
  message: "Application completed successfully"
}
```

---

## WhatsApp Button Component

```tsx
// components/ui/WhatsAppButton.tsx

import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const DEFAULT_MESSAGE = encodeURIComponent(
  "Olá! Vim pela página do SEJA LIVRE e gostaria de saber mais sobre a mentoria."
);

export function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-14 h-14
        bg-green-500 hover:bg-green-600
        text-white rounded-full
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:scale-110
        animate-pulse hover:animate-none
      "
      aria-label="Contactar via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
```

**Placement:** Add to `app/layout.tsx` so it appears on all pages.

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  GitHub Repository                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    VERCEL                            │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │  Build: next build                          │    │    │
│  │  │  Deploy: Edge Network (Global CDN)          │    │    │
│  │  │  SSL: Automatic HTTPS                       │    │    │
│  │  │  Env: Injected from Vercel Dashboard        │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                  │
│         ┌─────────────────┼─────────────────┐               │
│         ▼                 ▼                 ▼               │
│  ┌───────────┐     ┌───────────┐     ┌───────────┐         │
│  │  Notion   │     │  Todoist  │     │  Resend   │         │
│  │   API     │     │    API    │     │    API    │         │
│  └───────────┘     └───────────┘     └───────────┘         │
│         │                 │                 │               │
│         ▼                 ▼                 ▼               │
│  ┌───────────┐     ┌───────────┐     ┌───────────┐         │
│  │ MailerLite│     │  PostHog  │     │ Calendly  │         │
│  │    API    │     │    API    │     │  (embed)  │         │
│  └───────────┘     └───────────┘     └───────────┘         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Error Handling Strategy

### API Errors

```typescript
// Primary integrations (MUST succeed)
try {
  await notion.createPage(data);  // Critical - must work
} catch (error) {
  // Retry 3 times with exponential backoff
  // If still fails, save to localStorage + alert
}

// Secondary integrations (can fail gracefully)
try {
  await todoist.createTask(data);  // Nice to have
} catch (error) {
  console.error('Todoist failed:', error);
  // Flag in Notion for manual task creation
  // Don't block user
}
```

### Frontend Resilience

```typescript
// Save to localStorage as backup
const saveProgress = (data) => {
  localStorage.setItem('seja-livre-form', JSON.stringify(data));
};

// On API failure
if (!response.ok) {
  saveProgress(formData);
  toast.error('Erro ao guardar. Tenta novamente.');
}

// On page reload, restore from localStorage
const savedData = localStorage.getItem('seja-livre-form');
if (savedData) {
  restoreForm(JSON.parse(savedData));
}
```

---

## Version

**Architecture Version:** 1.0
**Last Updated:** 2025-12-10
**Status:** Production Ready
