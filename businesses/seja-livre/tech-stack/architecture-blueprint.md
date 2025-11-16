# SEJA LIVRE - Architecture Blueprint

**Generated:** 2025-01-14
**System:** Landing Page + 14-Screen Application Form
**Type:** High-ticket application funnel (R$60,000 mentoring program)

---

## SYSTEM OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                     USER JOURNEY                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Lands on Landing Page (10 sections)                     │
│     └─> PostHog tracks: pageview, scroll depth, CTA clicks  │
│                                                               │
│  2. Clicks CTA → Starts Form (/form)                        │
│     └─> PostHog: application_form_started                   │
│                                                               │
│  3. Screen 1 (Name) → localStorage only                     │
│                                                               │
│  4. Screen 2 (Phone) → FIRST AIRTABLE SAVE                  │
│     └─> Creates Airtable record                             │
│     └─> Now have: Name + Phone (can contact if abandoned)   │
│                                                               │
│  5. Screen 2b (Email) → MAILERLITE NURTURE                  │
│     └─> Adds to MailerLite "nurture" group                  │
│     └─> Can send abandonment emails                         │
│                                                               │
│  6. Screens 3-13 → Progressive saves                        │
│     └─> Each screen updates Airtable                        │
│                                                               │
│  7. Screen 6 (Revenue) → QUALIFICATION GATE                 │
│     ├─> < R$30k: Disqualified (show message, end flow)      │
│     └─> R$30k+: Qualified (continue to Screen 7)            │
│                                                               │
│  8. Screen 14 (Success) → COMPLETION                        │
│     ├─> Mark "Completed" in Airtable                        │
│     ├─> Send confirmation email (Resend)                    │
│     ├─> Add to MailerLite "welcome" group (keep nurture)    │
│     ├─> Auto-approve (initially)                            │
│     └─> Show Calendly embed                                 │
│                                                               │
│  9. User schedules discovery call (Calendly)                │
│                                                               │
│ 10. Discovery call → Enrollment → Stripe payment            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## COMPLETE DATA FLOW

### Screen-by-Screen Flow

```javascript
SCREEN 0: INTRO
└─> User clicks "COMEÇAR"
└─> Generate sessionId (UUID) in frontend
└─> Store in localStorage

═══════════════════════════════════════════════════════════

SCREEN 1: NAME
User enters: "Maria Silva"

└─> NO API CALL YET
└─> Store in localStorage only:
    {
      sessionId: "uuid...",
      name: "Maria Silva",
      currentScreen: 1
    }

═══════════════════════════════════════════════════════════

SCREEN 2: PHONE ◄── FIRST SAVE TO AIRTABLE
User enters: "+55 47 99963-9968"

→ API Call: POST /api/apply/update
  {
    action: "create",
    sessionId: "uuid...",
    data: {
      name: "Maria Silva",       // From Screen 1
      phone: "+5547999639968",
      phoneCountry: "BR",
      currentScreen: 2,
      startedAt: timestamp
    }
  }

→ AIRTABLE: Creates new record
  Returns: Airtable Record ID

→ Store in localStorage:
  {
    sessionId: "uuid...",
    airtableRecordId: "rec123...",
    ...
  }

✅ NOW HAVE: Name + Phone → Can contact if abandoned

═══════════════════════════════════════════════════════════

SCREEN 2b: EMAIL ◄── NEW SCREEN
User enters: "maria@example.com"

→ API Call: PATCH /api/apply/update
  {
    airtableRecordId: "rec123...",
    data: {
      email: "maria@example.com",
      currentScreen: 2.5
    }
  }

→ AIRTABLE: Updates record

→ MAILERLITE: Add subscriber
  POST https://connect.mailerlite.com/api/subscribers
  {
    email: "maria@example.com",
    fields: {
      name: "Maria Silva",
      phone: "+5547999639968",
      application_started: "true",
      application_completed: "false"
    },
    groups: ["nurture"]  // Only nurture
  }

→ UPDATE AIRTABLE:
  {
    addedToMailerLite: true,
    mailerLiteSubscriberId: "ml_12345"
  }

✅ NOW IN MAILERLITE NURTURE SEQUENCE

═══════════════════════════════════════════════════════════

SCREENS 3-5: BASIC INFO
(Instagram, Situação Atual, Ticket Infoproduto)

→ Each screen: PATCH /api/apply/update
  Updates Airtable with new field
  Increments currentScreen

═══════════════════════════════════════════════════════════

SCREEN 6: FATURAMENTO ◄── QUALIFICATION GATE
User selects revenue option

→ API Call: PATCH /api/apply/update
  {
    data: {
      faturamentoMensal: "A" | "B" | "C" | "D" | "E" | "F",
      currentScreen: 6
    }
  }

→ IF selects A or B (< R$30k):
  └─> UPDATE AIRTABLE:
      {
        status: "Disqualified",
        disqualified: true,
        disqualificationReason: "revenue_below_30k"
      }
  └─> RETURN: { success: true, disqualified: true }
  └─> FRONTEND: Show disqualification message
  └─> END FLOW

→ IF selects C-F (R$30k+):
  └─> UPDATE AIRTABLE:
      {
        qualified: true
      }
  └─> CONTINUE TO SCREEN 7

═══════════════════════════════════════════════════════════

SCREENS 7-13: DETAILED INFO
(Nicho, Por Que Aceita, Investimento, Disponibilidade,
 Comprometimento, Expectativa, Confirmações)

→ Each screen: PATCH /api/apply/update
  Progressive save to Airtable

═══════════════════════════════════════════════════════════

SCREEN 14: SUCCESS ◄── COMPLETION

→ UPDATE AIRTABLE:
  {
    status: "Completed",
    completedAt: timestamp,
    currentScreen: 14
  }

→ SEND CONFIRMATION EMAIL (Resend):
  {
    from: "Juçanã <jucana@sejalivre.com.br>",
    to: "maria@example.com",
    subject: "🎉 Aplicação Recebida!",
    template: ApplicationConfirmationEmail
  }

→ UPDATE MAILERLITE:
  Add to "welcome" group (keep in "nurture" too)
  {
    groups: ["nurture", "welcome"],
    fields: {
      application_completed: "true",
      completed_at: timestamp
    }
  }

→ AUTO-APPROVE (initially):
  No manual review step
  Show Calendly immediately

→ SHOW SUCCESS PAGE + CALENDLY EMBED

═══════════════════════════════════════════════════════════
```

---

## NEXT.JS PROJECT STRUCTURE

```
seja-livre-landing/
│
├── .env.local                          # API keys (NEVER commit)
├── .gitignore                          # Includes .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
│
├── app/
│   ├── page.tsx                        # Landing page (10 sections)
│   ├── layout.tsx                      # Root layout
│   ├── globals.css                     # Tailwind
│   ├── providers.tsx                   # PostHog provider
│   │
│   ├── form/
│   │   └── page.tsx                    # Multi-step form container
│   │
│   └── api/
│       └── apply/
│           └── update/
│               └── route.ts            # Main API endpoint
│
├── components/
│   ├── landing/                        # 10 landing sections
│   │   ├── Hero.tsx
│   │   ├── JucanaStory.tsx
│   │   ├── PersonaID.tsx
│   │   ├── ProblemDeepDive.tsx
│   │   ├── SolutionIntro.tsx
│   │   ├── SocialProof.tsx             # Only one
│   │   ├── Methodology.tsx
│   │   ├── Timeline.tsx
│   │   ├── ApplicationProcess.tsx
│   │   └── FAQ.tsx
│   │
│   ├── form/                           # 14 form screens
│   │   ├── Screen0Intro.tsx
│   │   ├── Screen1Name.tsx
│   │   ├── Screen2Phone.tsx
│   │   ├── Screen2bEmail.tsx           # NEW
│   │   ├── Screen3Instagram.tsx
│   │   ├── Screen4Situacao.tsx
│   │   ├── Screen5Ticket.tsx
│   │   ├── Screen6Faturamento.tsx      # Disqualification logic
│   │   ├── Screen7Nicho.tsx
│   │   ├── Screen8PorQueAceita.tsx
│   │   ├── Screen9Investimento.tsx
│   │   ├── Screen10Disponibilidade.tsx
│   │   ├── Screen11Comprometimento.tsx
│   │   ├── Screen12Expectativa.tsx
│   │   ├── Screen13Confirmacao.tsx
│   │   ├── Screen14Success.tsx         # With Calendly
│   │   ├── DisqualificationScreen.tsx
│   │   └── FormProgress.tsx
│   │
│   └── ui/                             # Reusable UI
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── PhoneInput.tsx
│       ├── Textarea.tsx
│       └── RadioGroup.tsx
│
├── emails/                             # React Email templates
│   └── ApplicationConfirmation.tsx
│
├── lib/
│   ├── airtable.ts                     # Airtable client
│   ├── resend.ts                       # Resend client
│   ├── mailerlite.ts                   # MailerLite client
│   ├── posthog.ts                      # PostHog config
│   ├── validations.ts                  # Zod schemas
│   ├── rate-limiter.ts                 # Rate limiting
│   └── request-queue.ts                # Request queuing
│
├── types/
│   └── application.ts                  # TypeScript types
│
└── public/
    └── images/
        ├── jucana/
        ├── testimonials/
        ├── brand/
        └── diagrams/
```

---

## API DESIGN

### **POST /api/apply/update**

**Purpose:** Handle all form updates (create + progressive saves)

**Request:**
```typescript
{
  action: "create" | "update",
  sessionId: string (UUID),
  airtableRecordId?: string,  // Required for updates
  data: {
    // Any fields from current screen
    currentScreen: number
  }
}
```

**Response:**
```typescript
// Success
{
  success: true,
  airtableRecordId?: string,  // On create
  disqualified?: boolean      // On Screen 6 if < R$30k
}

// Error
{
  error: string,
  details?: any
}
```

**Special Behaviors:**

1. **Screen 2 (action: "create"):**
   - Creates Airtable record
   - Returns airtableRecordId

2. **Screen 2b (email field present):**
   - Updates Airtable with email
   - Adds to MailerLite nurture group (async, non-blocking)
   - Updates Airtable with MailerLite status

3. **Screen 6 (faturamentoMensal field):**
   - Checks if A or B (disqualified)
   - Updates status to "Disqualified"
   - Returns { disqualified: true }

4. **Screen 14 (status: "Completed"):**
   - Marks completed in Airtable
   - Sends confirmation email (async)
   - Adds to MailerLite welcome group (async)

**Security:**
- Rate limiting: 5 per IP per hour
- Origin check (CSRF protection)
- Server-side validation (Zod)
- Request queuing (prevent race conditions)

---

## AIRTABLE SCHEMA

**Base:** Seja Livre - Applications
**Table:** Applications

| Field | Type | Populated When |
|-------|------|----------------|
| Session ID | Single line text | Screen 2 (first save) |
| Name | Single line text | Screen 2 (from Screen 1) |
| Email | Email | Screen 2b |
| Phone | Phone number | Screen 2 |
| Phone Country | Single line text | Screen 2 |
| Instagram | Single line text | Screen 3 |
| Situação Atual | Single select (A/B/C) | Screen 4 |
| Ticket Infoproduto | Single select (A-G) | Screen 5 |
| Faturamento Mensal | Single select (A-F) | Screen 6 |
| Qualified | Checkbox | Screen 6 (if C-F) |
| Nicho | Long text | Screen 7 |
| Por Que Aceita | Long text | Screen 8 |
| Investimento | Single select (A/B/C) | Screen 9 |
| Disponibilidade Tempo | Single select | Screen 10 |
| Comprometimento 90d | Single select | Screen 11 |
| Expectativa Início | Single select | Screen 12 |
| Confirmação 1-4 | Checkbox (4 fields) | Screen 13 |
| Status | Single select | Auto (In Progress/Completed/Disqualified) |
| Current Screen | Number | Each screen |
| Started At | Date & time | Screen 2 |
| Completed At | Date & time | Screen 14 |
| Last Updated | Date & time | Each update |
| Disqualified | Checkbox | Screen 6 (if A or B) |
| Disqualification Reason | Single line text | Screen 6 |
| Calendly Scheduled | Checkbox | Manual/Webhook |
| Added to MailerLite | Checkbox | Screen 2b |
| MailerLite Subscriber ID | Single line text | Screen 2b |
| Source | Single line text | Auto: "Website" |

---

## MAILERLITE INTEGRATION

**Groups:**
1. **"nurture"** - Added on Screen 2b (email capture)
2. **"welcome"** - Added on Screen 14 (completion)

**Flow:**

```
Screen 2b (Email) → Add to "nurture" group
                    ├─> Send abandonment emails if incomplete
                    └─> General nurture content

Screen 14 (Complete) → Add to "welcome" group
                       ├─> Keep in "nurture" too (both groups)
                       ├─> Welcome sequence emails
                       └─> Call prep materials
```

**API Calls:**

```typescript
// Screen 2b
POST /api/subscribers
{
  email: "maria@example.com",
  fields: {
    name: "Maria Silva",
    phone: "+5547999639968",
    application_started: "true",
    application_completed: "false"
  },
  groups: ["nurture"]
}

// Screen 14
POST /api/subscribers/{id}/groups/{welcomeGroupId}
// Then update fields
PUT /api/subscribers/{id}
{
  fields: {
    application_completed: "true",
    completed_at: timestamp
  }
}
```

---

## POSTHOG ANALYTICS

**Events Tracked:**

```javascript
// Page load
posthog.capture('$pageview');

// Landing page
posthog.capture('cta_clicked', { location: 'hero', text: 'APLICAR AGORA' });
posthog.capture('scrolled_to_section', { section: 'methodology', depth: '60%' });

// Form
posthog.capture('application_form_started');
posthog.capture('application_form_phone_entered', { screen: 2 });
posthog.capture('application_form_email_entered', { screen: 2.5 });
posthog.capture('application_form_screen_completed', { screen: N });
posthog.capture('application_disqualified', { reason: 'revenue_below_30k' });
posthog.capture('application_completed');
posthog.capture('calendly_embed_viewed');
```

**Funnel Definition:**

```
1. $pageview (landing)
2. application_form_started
3. application_form_phone_entered (Screen 2)
4. application_form_email_entered (Screen 2b)
... (screens 3-13)
14. application_completed
15. calendly_embed_viewed
```

**Target Conversion Rates:**
- Landing → Form start: 20-30%
- Form start → Phone entered: 85%+
- Phone → Email: 80%+
- Screen 6 qualified: 60-70%
- Qualified → Complete: 70-80%
- Complete → Calendly scheduled: 60-70%

---

## DEPLOYMENT ARCHITECTURE

```
GitHub Repository
       ↓
   [Git Push]
       ↓
Vercel (Auto-deploy)
  ├─> Build Next.js app
  ├─> Inject environment variables
  ├─> Deploy to Edge Network (Global CDN)
  ├─> Generate production URL
  └─> HTTPS automatic

External APIs:
├─> Airtable (form storage)
├─> Resend (transactional emails)
├─> MailerLite (email marketing)
├─> PostHog (analytics)
└─> Calendly (scheduling)

All FREE tier ✅
```

---

## ERROR HANDLING & RESILIENCE

**Retry Logic:**
```typescript
async function saveWithRetry(data, retries = 3) {
  try {
    return await saveToAirtable(data);
  } catch (error) {
    if (retries > 0) {
      await delay(1000 * (4 - retries));  // Exponential backoff
      return saveWithRetry(data, retries - 1);
    }
    // Final fallback: localStorage
    saveToLocalStorage(data);
    return { offline: true };
  }
}
```

**Race Condition Prevention:**
```typescript
// Request queue ensures sequential updates
const queue = new RequestQueue();

queue.add(() => updateAirtable(screenData));
// Waits for previous update before sending next
```

**Non-Blocking Integrations:**
```typescript
// MailerLite failure doesn't block user
addToMailerLite(email).catch(error => {
  console.error('MailerLite failed:', error);
  // Flag for manual sync later
  flagForManualSync(email);
});

// User proceeds immediately
```

---

## SECURITY MEASURES

1. **Server-side Validation:** Zod schemas on API routes
2. **Rate Limiting:** 5 submissions per IP per hour
3. **CSRF Protection:** Origin header check
4. **No Client Secrets:** All API keys server-side only
5. **Input Sanitization:** Zod validates + sanitizes
6. **HTTPS Only:** Vercel enforces SSL
7. **Request Queuing:** Prevents race conditions
8. **Error Messages:** Generic (no info leakage)

---

## VERSION

**Architecture Version:** 1.0
**Last Updated:** 2025-01-14
**Status:** Production Ready
