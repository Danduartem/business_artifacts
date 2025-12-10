# SEJA LIVRE v2 - Implementation Guide

**Generated:** 2025-12-10
**Purpose:** Step-by-step guide to implement the tech stack

---

## Overview

This guide walks through setting up all services and implementing the SEJA LIVRE v2 landing page and application form.

**Estimated Implementation Time:** 3-5 days

---

## Phase 1: Service Setup (Day 1)

### 1.1 Notion Setup

**Create Integration:**
1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Name: `SEJA LIVRE App`
4. Select workspace
5. Copy the "Internal Integration Token" → `NOTION_API_KEY`

**Create Database:**
1. Create new page: "SEJA LIVRE - Aplicações"
2. Add database (full page)
3. Add all fields from schema (see architecture-blueprint.md)
4. Share database with your integration (click "..." → "Add connections")
5. Copy Database ID from URL → `NOTION_DATABASE_ID`
   - URL: `notion.so/xxx?v=yyy` → Database ID is `xxx`

**Create Views:**
- Pipeline (Kanban by Status)
- Abandonados (filter: In Progress + old)
- Esta Semana (filter: recent)
- Qualificados (filter: qualified)

### 1.2 Todoist Setup

**Get API Token:**
1. Go to [todoist.com/app/settings/integrations](https://todoist.com/app/settings/integrations)
2. Scroll to "API token"
3. Copy token → `TODOIST_API_KEY`

**Create Project:**
1. Create project: "SEJA LIVRE Leads"
2. Get Project ID via API or from URL
   - Open project, URL: `todoist.com/app/project/XXXXX` → ID is `XXXXX`
3. Copy → `TODOIST_PROJECT_ID`

### 1.3 Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (sejalivre.pt or similar)
3. Go to API Keys → Create API Key
4. Copy → `RESEND_API_KEY`

### 1.4 MailerLite Setup

1. Log in to [mailerlite.com](https://www.mailerlite.com)
2. Go to Integrations → API
3. Copy API key → `MAILERLITE_API_KEY`
4. Create group "Applicants"
5. Get Group ID → `MAILERLITE_GROUP_ID`

### 1.5 PostHog Setup

1. Sign up at [posthog.com](https://posthog.com) (EU cloud recommended for GDPR)
2. Create project: "SEJA LIVRE"
3. Go to Project Settings
4. Copy Project API Key → `NEXT_PUBLIC_POSTHOG_KEY`
5. Note host URL → `NEXT_PUBLIC_POSTHOG_HOST`

### 1.6 Calendly Setup

1. Log in to Calendly
2. Create event type: "Sessão de Diagnóstico SEJA LIVRE" (45 min)
3. Get embed code or scheduling link for success page

---

## Phase 2: Project Setup (Day 1-2)

### 2.1 Initialize Next.js Project

```bash
# Create project
npx create-next-app@latest seja-livre-v2 --typescript --tailwind --eslint --app --src-dir=false

# Navigate to project
cd seja-livre-v2

# Install dependencies
npm install @notionhq/client
npm install react-hook-form @hookform/resolvers zod
npm install posthog-js
npm install resend
npm install lucide-react
npm install react-phone-number-input
```

### 2.2 Environment Variables

Create `.env.local`:

```env
# Notion
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Todoist
TODOIST_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TODOIST_PROJECT_ID=xxxxxxxxxxx

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# MailerLite
MAILERLITE_API_KEY=xxxxxxxxxxxxxxxxxxxxx
MAILERLITE_GROUP_ID=xxxxxxxxxxx

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=351912345678

# App
NEXT_PUBLIC_BASE_URL=https://sejalivre.pt
```

Add to `.gitignore`:
```
.env.local
.env*.local
```

### 2.3 Project Structure

Create folder structure:

```bash
mkdir -p components/landing
mkdir -p components/form
mkdir -p components/ui
mkdir -p components/emails
mkdir -p lib
mkdir -p types
mkdir -p app/aplicacao
mkdir -p app/api/apply/complete
mkdir -p public/images/jucana
mkdir -p public/images/testimonials
mkdir -p public/images/brand
```

---

## Phase 3: Core Libraries (Day 2)

### 3.1 Notion Client

Create `lib/notion.ts`:

```typescript
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

export async function createApplication(data: {
  sessionId: string;
  name: string;
  whatsapp: string;
  country: string;
}) {
  const response = await notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      'Name': { title: [{ text: { content: data.name } }] },
      'Session ID': { rich_text: [{ text: { content: data.sessionId } }] },
      'WhatsApp': { phone_number: data.whatsapp },
      'Country': { select: { name: data.country } },
      'Status': { select: { name: 'In Progress' } },
      'Current Screen': { number: 2 },
      'Started At': { date: { start: new Date().toISOString() } },
      'Last Activity At': { date: { start: new Date().toISOString() } },
    },
  });

  return response.id;
}

export async function updateApplication(
  pageId: string,
  data: Record<string, any>
) {
  const properties: Record<string, any> = {
    'Last Activity At': { date: { start: new Date().toISOString() } },
  };

  // Map data fields to Notion properties
  if (data.currentScreen !== undefined) {
    properties['Current Screen'] = { number: data.currentScreen };
  }
  if (data.instagram) {
    properties['Instagram'] = { url: `https://instagram.com/${data.instagram.replace('@', '')}` };
  }
  if (data.tipoNegocio) {
    properties['Tipo Negócio'] = { select: { name: data.tipoNegocio } };
  }
  if (data.faturamento) {
    properties['Faturamento'] = { select: { name: data.faturamento } };
  }
  if (data.qualified !== undefined) {
    properties['Qualified'] = { checkbox: data.qualified };
  }
  if (data.tamanhoEquipe) {
    properties['Tamanho Equipe'] = { select: { name: data.tamanhoEquipe } };
  }
  if (data.maiorDesafio) {
    properties['Maior Desafio'] = { rich_text: [{ text: { content: data.maiorDesafio } }] };
  }
  if (data.sentimentoInvestimento) {
    properties['Sentimento Investimento'] = { select: { name: data.sentimentoInvestimento } };
  }
  if (data.disponibilidade !== undefined) {
    properties['Disponibilidade'] = { checkbox: data.disponibilidade };
  }
  if (data.status) {
    properties['Status'] = { select: { name: data.status } };
  }
  if (data.completedAt) {
    properties['Completed At'] = { date: { start: data.completedAt } };
  }
  if (data.disqualificationReason) {
    properties['Disqualification Reason'] = { rich_text: [{ text: { content: data.disqualificationReason } }] };
  }

  await notion.pages.update({
    page_id: pageId,
    properties,
  });
}

export async function getApplication(pageId: string) {
  return await notion.pages.retrieve({ page_id: pageId });
}
```

### 3.2 Todoist Client

Create `lib/todoist.ts`:

```typescript
const TODOIST_API_KEY = process.env.TODOIST_API_KEY!;
const TODOIST_PROJECT_ID = process.env.TODOIST_PROJECT_ID!;

export async function createLeadTask(data: {
  name: string;
  whatsapp: string;
  country: string;
  notionPageId: string;
}) {
  const notionUrl = `https://notion.so/${data.notionPageId.replace(/-/g, '')}`;

  const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TODOIST_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      project_id: TODOIST_PROJECT_ID,
      content: `🔔 Novo lead: ${data.name} - ACOMPANHAR`,
      description: `📱 WhatsApp: ${data.whatsapp}\n🌍 País: ${data.country}\n📍 Parou na tela: 2\n\n⏰ Se não completar em 48h, entrar em contato.\n\n🔗 Ver no Notion: ${notionUrl}`,
      due_string: 'in 2 days',
      priority: 3, // P2 (1=P4, 2=P3, 3=P2, 4=P1)
      labels: ['seja-livre', 'novo-lead'],
    }),
  });

  const task = await response.json();
  return task.id;
}

export async function updateTaskCompleted(
  taskId: string,
  data: {
    name: string;
    whatsapp: string;
    tipoNegocio: string;
    faturamento: string;
    tamanhoEquipe: string;
    maiorDesafio: string;
    sentimentoInvestimento: string;
    notionPageId: string;
  }
) {
  const notionUrl = `https://notion.so/${data.notionPageId.replace(/-/g, '')}`;

  await fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TODOIST_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: `✅ ${data.name} - COMPLETO - Agendar diagnóstico`,
      description: `📱 WhatsApp: ${data.whatsapp}\n💼 Negócio: ${data.tipoNegocio}\n💰 Faturamento: ${data.faturamento}\n👥 Equipe: ${data.tamanhoEquipe}\n\n📝 Maior desafio:\n"${data.maiorDesafio}"\n\n💭 Sobre investimento: ${data.sentimentoInvestimento}\n\n✅ AÇÃO: Confirmar agendamento do diagnóstico\n\n🔗 Ver aplicação completa: ${notionUrl}`,
      due_string: 'tomorrow',
      priority: 4, // P1
      labels: ['seja-livre', 'completo', 'agendar'],
    }),
  });
}

export async function updateTaskDisqualified(taskId: string, name: string, reason: string) {
  await fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TODOIST_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: `❌ ${name} - Não qualificado`,
      description: `Motivo: ${reason}`,
      priority: 1, // P4
    }),
  });

  // Complete the task
  await fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}/close`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TODOIST_API_KEY}`,
    },
  });
}
```

### 3.3 Validation Schemas

Create `lib/validations.ts`:

```typescript
import { z } from 'zod';

export const createApplicationSchema = z.object({
  sessionId: z.string().uuid(),
  name: z.string().min(2).max(100),
  whatsapp: z.string().min(9).max(20),
  country: z.enum(['PT', 'BR']),
});

export const updateApplicationSchema = z.object({
  notionPageId: z.string(),
  data: z.object({
    currentScreen: z.number().min(0).max(11),
    instagram: z.string().optional(),
    tipoNegocio: z.string().optional(),
    faturamento: z.string().optional(),
    tamanhoEquipe: z.string().optional(),
    maiorDesafio: z.string().max(500).optional(),
    sentimentoInvestimento: z.string().optional(),
    disponibilidade: z.boolean().optional(),
    confirmacoes: z.array(z.string()).optional(),
  }),
});

export const completeApplicationSchema = z.object({
  notionPageId: z.string(),
  sessionId: z.string().uuid(),
});

// Qualification check
export function isQualifiedRevenue(faturamento: string): boolean {
  // A, B = disqualified (< €15k)
  // C, D, E = qualified (€15k+)
  return ['C', 'D', 'E'].includes(faturamento);
}

export function isQualifiedTeamSize(tamanhoEquipe: string): boolean {
  // A = solo (disqualified)
  // B, C, D, E = has team (qualified)
  return ['B', 'C', 'D', 'E'].includes(tamanhoEquipe);
}
```

### 3.4 Types

Create `types/application.ts`:

```typescript
export interface ApplicationData {
  sessionId: string;
  notionPageId?: string;
  todoistTaskId?: string;
  name: string;
  whatsapp: string;
  country: 'PT' | 'BR';
  instagram?: string;
  tipoNegocio?: string;
  faturamento?: string;
  tamanhoEquipe?: string;
  maiorDesafio?: string;
  sentimentoInvestimento?: string;
  disponibilidade?: boolean;
  confirmacoes?: string[];
  currentScreen: number;
  qualified?: boolean;
  disqualified?: boolean;
}

export interface FormState {
  data: Partial<ApplicationData>;
  currentScreen: number;
  isSubmitting: boolean;
  error?: string;
}
```

---

## Phase 4: API Routes (Day 2-3)

### 4.1 Create Application API

Create `app/api/apply/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createApplication, updateApplication } from '@/lib/notion';
import { createLeadTask } from '@/lib/todoist';
import {
  createApplicationSchema,
  updateApplicationSchema,
  isQualifiedRevenue,
  isQualifiedTeamSize
} from '@/lib/validations';

// Rate limiting (simple in-memory, use Redis in production)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(time => now - time < RATE_WINDOW);

  if (recentRequests.length >= RATE_LIMIT) {
    return true;
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return false;
}

// POST - Create new application (Screen 2)
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = createApplicationSchema.parse(body);

    // Create Notion page
    const notionPageId = await createApplication(validated);

    // Create Todoist task (async, don't block)
    let todoistTaskId: string | undefined;
    try {
      todoistTaskId = await createLeadTask({
        ...validated,
        notionPageId,
      });
    } catch (error) {
      console.error('Todoist task creation failed:', error);
      // Continue anyway - Notion is primary
    }

    return NextResponse.json({
      success: true,
      notionPageId,
      todoistTaskId,
    });
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create application' },
      { status: 500 }
    );
  }
}

// PATCH - Update application (Screens 3-10)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = updateApplicationSchema.parse(body);

    let disqualified = false;
    let disqualificationReason = '';

    // Check qualification gates
    if (validated.data.faturamento) {
      if (!isQualifiedRevenue(validated.data.faturamento)) {
        disqualified = true;
        disqualificationReason = 'revenue_below_15k';
      }
    }

    if (validated.data.tamanhoEquipe) {
      if (!isQualifiedTeamSize(validated.data.tamanhoEquipe)) {
        disqualified = true;
        disqualificationReason = 'solo_no_team';
      }
    }

    // Update Notion
    await updateApplication(validated.notionPageId, {
      ...validated.data,
      ...(disqualified && {
        status: 'Disqualified',
        disqualificationReason,
      }),
      ...(!disqualified && validated.data.faturamento && {
        qualified: true,
      }),
    });

    return NextResponse.json({
      success: true,
      disqualified,
      disqualificationReason,
    });
  } catch (error) {
    console.error('Update application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update application' },
      { status: 500 }
    );
  }
}
```

### 4.2 Complete Application API

Create `app/api/apply/complete/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { updateApplication, getApplication } from '@/lib/notion';
import { updateTaskCompleted } from '@/lib/todoist';
import { completeApplicationSchema } from '@/lib/validations';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = completeApplicationSchema.parse(body);

    // Get current application data from Notion
    const application = await getApplication(validated.notionPageId) as any;
    const props = application.properties;

    // Extract data for Todoist update
    const applicationData = {
      name: props['Name']?.title?.[0]?.text?.content || '',
      whatsapp: props['WhatsApp']?.phone_number || '',
      tipoNegocio: props['Tipo Negócio']?.select?.name || '',
      faturamento: props['Faturamento']?.select?.name || '',
      tamanhoEquipe: props['Tamanho Equipe']?.select?.name || '',
      maiorDesafio: props['Maior Desafio']?.rich_text?.[0]?.text?.content || '',
      sentimentoInvestimento: props['Sentimento Investimento']?.select?.name || '',
      notionPageId: validated.notionPageId,
    };

    // 1. Update Notion status
    await updateApplication(validated.notionPageId, {
      status: 'Completed',
      completedAt: new Date().toISOString(),
    });

    // 2. Update Todoist task (if exists)
    const todoistTaskId = props['Todoist Task ID']?.rich_text?.[0]?.text?.content;
    if (todoistTaskId) {
      try {
        await updateTaskCompleted(todoistTaskId, applicationData);
      } catch (error) {
        console.error('Todoist update failed:', error);
      }
    }

    // 3. Send confirmation email (if email exists)
    // Note: In this flow, email is optional. Add email field if needed.

    // 4. Add to MailerLite (if email exists)
    // Similar to above

    return NextResponse.json({
      success: true,
      message: 'Application completed successfully',
    });
  } catch (error) {
    console.error('Complete application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to complete application' },
      { status: 500 }
    );
  }
}
```

---

## Phase 5: Components (Day 3-4)

### 5.1 WhatsApp Button

Create `components/ui/WhatsAppButton.tsx`:

```tsx
'use client';

import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = encodeURIComponent(
    'Olá! Vim pela página do SEJA LIVRE e gostaria de saber mais sobre a mentoria.'
  );
  const url = `https://wa.me/${number}?text=${message}`;

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
      "
      aria-label="Contactar via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
```

### 5.2 Form Container (Simplified)

Create `components/form/FormContainer.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ApplicationData, FormState } from '@/types/application';

// Import all screen components
import Screen0Intro from './Screen0Intro';
import Screen1Name from './Screen1Name';
import Screen2WhatsApp from './Screen2WhatsApp';
// ... import other screens

const SCREENS = [
  Screen0Intro,
  Screen1Name,
  Screen2WhatsApp,
  // ... other screens
];

export function FormContainer() {
  const [state, setState] = useState<FormState>({
    data: {},
    currentScreen: 0,
    isSubmitting: false,
  });

  // Initialize session
  useEffect(() => {
    const saved = localStorage.getItem('seja-livre-form');
    if (saved) {
      const parsed = JSON.parse(saved);
      setState(prev => ({ ...prev, data: parsed }));
    } else {
      setState(prev => ({
        ...prev,
        data: { ...prev.data, sessionId: uuidv4() },
      }));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (state.data.sessionId) {
      localStorage.setItem('seja-livre-form', JSON.stringify(state.data));
    }
  }, [state.data]);

  const handleNext = async (screenData: Partial<ApplicationData>) => {
    const newData = { ...state.data, ...screenData };
    setState(prev => ({ ...prev, data: newData, isSubmitting: true }));

    try {
      // Screen 2: First save (create)
      if (state.currentScreen === 2 && !state.data.notionPageId) {
        const response = await fetch('/api/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: newData.sessionId,
            name: newData.name,
            whatsapp: newData.whatsapp,
            country: newData.country,
          }),
        });
        const result = await response.json();
        if (result.success) {
          newData.notionPageId = result.notionPageId;
          newData.todoistTaskId = result.todoistTaskId;
        }
      }
      // Screens 3-10: Update
      else if (state.currentScreen >= 3 && state.data.notionPageId) {
        const response = await fetch('/api/apply', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            notionPageId: state.data.notionPageId,
            data: {
              ...screenData,
              currentScreen: state.currentScreen + 1,
            },
          }),
        });
        const result = await response.json();
        if (result.disqualified) {
          // Handle disqualification
          setState(prev => ({
            ...prev,
            data: { ...newData, disqualified: true },
            currentScreen: -1, // Show disqualification screen
            isSubmitting: false,
          }));
          return;
        }
      }

      // Move to next screen
      setState(prev => ({
        ...prev,
        data: newData,
        currentScreen: prev.currentScreen + 1,
        isSubmitting: false,
      }));
    } catch (error) {
      console.error('Error:', error);
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        error: 'Erro ao guardar. Tenta novamente.',
      }));
    }
  };

  const CurrentScreen = SCREENS[state.currentScreen];

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <CurrentScreen
          data={state.data}
          onNext={handleNext}
          isSubmitting={state.isSubmitting}
        />
      </div>
    </div>
  );
}
```

---

## Phase 6: Testing & Deploy (Day 4-5)

### 6.1 Local Testing

```bash
# Run development server
npm run dev

# Test form flow
# 1. Fill out Screen 0-2
# 2. Check Notion for new record
# 3. Check Todoist for new task
# 4. Complete form
# 5. Verify all integrations updated
```

### 6.2 Pre-Deploy Checklist

- [ ] All environment variables set in Vercel
- [ ] Notion database shared with integration
- [ ] Todoist project created
- [ ] Resend domain verified
- [ ] MailerLite group created
- [ ] PostHog project configured
- [ ] WhatsApp number correct

### 6.3 Deploy to Vercel

```bash
# Install Vercel CLI (if needed)
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo to Vercel for auto-deploy
```

### 6.4 Post-Deploy Testing

1. Submit test application
2. Verify Notion record created
3. Verify Todoist task created
4. Complete application
5. Verify task updated
6. Test abandonment (start but don't finish)
7. Verify WhatsApp button works

---

## Maintenance Tasks

### Weekly
- Check Todoist for due tasks (follow up abandoned leads)
- Review Notion "Abandonados" view

### Monthly
- Archive completed Todoist tasks
- Review PostHog funnel metrics
- Check free tier usage

### As Needed
- Update landing page copy
- Add testimonials
- Optimize based on analytics

---

**Implementation Complete!**

For questions or issues, refer to:
- `tech-stack-specification.md` - What and why
- `architecture-blueprint.md` - How it works
- This guide - How to build it
