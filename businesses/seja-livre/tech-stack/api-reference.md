# SEJA LIVRE - API Reference & Code Snippets

**Generated:** 2025-01-14
**Complete code for all integrations**

---

## TABLE OF CONTENTS

1. [Validation Schemas](#validation-schemas)
2. [Airtable Client](#airtable-client)
3. [MailerLite Client](#mailerlite-client)
4. [Resend Email Client](#resend-email-client)
5. [Request Queue](#request-queue-utility)
6. [Rate Limiter](#rate-limiter-utility)
7. [Main API Route](#main-api-route)
8. [PostHog Setup](#posthog-setup)
9. [Example Form Component](#example-form-component)
10. [Email Template](#email-template)

---

## VALIDATION SCHEMAS

**File:** `lib/validations.ts`

```typescript
import { z } from 'zod';

// Screen 1: Name
export const nameSchema = z.object({
  name: z.string()
    .min(2, 'Nome muito curto')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome inválido')
    .refine((val) => val.trim().split(' ').length >= 2, {
      message: 'Preciso do seu nome completo 💙'
    })
});

// Screen 2: Phone
export const phoneSchema = z.object({
  phone: z.string().min(10, 'Número inválido'),
  phoneCountry: z.string().default('BR')
});

// Screen 2b: Email
export const emailSchema = z.object({
  email: z.string().email('Email inválido')
});

// Screen 3: Instagram (optional)
export const instagramSchema = z.object({
  instagram: z.string().optional()
});

// Screen 4: Situação
export const situacaoSchema = z.object({
  situacaoAtual: z.enum(['A', 'B', 'C'])
});

// Screen 5: Ticket
export const ticketSchema = z.object({
  ticketInfoproduto: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
});

// Screen 6: Faturamento (has disqualification logic)
export const faturamentoSchema = z.object({
  faturamentoMensal: z.enum(['A', 'B', 'C', 'D', 'E', 'F'])
});

// Screen 7: Nicho
export const nichoSchema = z.object({
  nicho: z.string()
    .min(20, 'Preciso que você detalhe um pouquinho mais 💙')
    .max(300)
});

// Screen 8: Por Que Aceita
export const porQueAceitaSchema = z.object({
  porQueAceita: z.string()
    .min(50, 'Preciso que você se abra um pouco mais 💙')
    .max(500)
});

// Screen 9: Investimento
export const investimentoSchema = z.object({
  investimento: z.enum(['A', 'B', 'C'])
});

// Screen 10-11: Disponibilidade e Comprometimento
export const disponibilidadeSchema = z.object({
  disponibilidadeTempo: z.enum(['Sim', 'Não'])
});

export const comprometimentoSchema = z.object({
  comprometimento90d: z.enum(['Sim', 'Não'])
});

// Screen 12: Expectativa
export const expectativaSchema = z.object({
  expectativaInicio: z.enum([
    'Imediatamente',
    'Nos próximos 30 dias',
    'Nos próximos 60-90 dias',
    'Ainda estou avaliando'
  ])
});

// Screen 13: Confirmações
export const confirmacoesSchema = z.object({
  confirmacao1: z.boolean().refine((val) => val === true),
  confirmacao2: z.boolean().refine((val) => val === true),
  confirmacao3: z.boolean().refine((val) => val === true),
  confirmacao4: z.boolean().refine((val) => val === true)
});

// Complete application type
export const applicationSchema = nameSchema
  .merge(phoneSchema)
  .merge(emailSchema)
  .merge(instagramSchema)
  .merge(situacaoSchema)
  .merge(ticketSchema)
  .merge(faturamentoSchema)
  .merge(nichoSchema)
  .merge(porQueAceitaSchema)
  .merge(investimentoSchema)
  .merge(disponibilidadeSchema)
  .merge(comprometimentoSchema)
  .merge(expectativaSchema)
  .merge(confirmacoesSchema);

export type Application = z.infer<typeof applicationSchema>;
```

---

## AIRTABLE CLIENT

**File:** `lib/airtable.ts`

```typescript
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

const table = base('Applications');

export interface AirtableApplication {
  sessionId: string;
  name?: string;
  email?: string;
  phone?: string;
  phoneCountry?: string;
  instagram?: string;
  situacaoAtual?: string;
  ticketInfoproduto?: string;
  faturamentoMensal?: string;
  qualified?: boolean;
  nicho?: string;
  porQueAceita?: string;
  investimento?: string;
  disponibilidadeTempo?: string;
  comprometimento90d?: string;
  expectativaInicio?: string;
  confirmacao1?: boolean;
  confirmacao2?: boolean;
  confirmacao3?: boolean;
  confirmacao4?: boolean;
  status?: 'In Progress' | 'Completed' | 'Abandoned' | 'Disqualified';
  currentScreen?: number;
  startedAt?: string;
  completedAt?: string;
  disqualified?: boolean;
  disqualificationReason?: string;
  addedToMailerLite?: boolean;
  mailerLiteSubscriberId?: string;
  source?: string;
}

// Create new application (Screen 2 - first save)
export async function createApplication(data: Partial<AirtableApplication>) {
  try {
    const record = await table.create([
      {
        fields: {
          'Session ID': data.sessionId,
          'Name': data.name,
          'Phone': data.phone,
          'Phone Country': data.phoneCountry || 'BR',
          'Status': 'In Progress',
          'Current Screen': data.currentScreen || 2,
          'Started At': data.startedAt || new Date().toISOString(),
          'Last Updated': new Date().toISOString(),
          'Source': data.source || 'Website'
        }
      }
    ]);

    return {
      success: true,
      recordId: record[0].id
    };
  } catch (error) {
    console.error('Airtable create error:', error);
    throw error;
  }
}

// Update existing application (Screens 3-14)
export async function updateApplication(
  recordId: string,
  data: Partial<AirtableApplication>
) {
  try {
    const fields: any = {
      'Last Updated': new Date().toISOString()
    };

    // Map data to Airtable field names
    if (data.email) fields['Email'] = data.email;
    if (data.instagram) fields['Instagram'] = data.instagram;
    if (data.situacaoAtual) fields['Situação Atual'] = data.situacaoAtual;
    if (data.ticketInfoproduto) fields['Ticket Infoproduto'] = data.ticketInfoproduto;
    if (data.faturamentoMensal) fields['Faturamento Mensal'] = data.faturamentoMensal;
    if (data.qualified !== undefined) fields['Qualified'] = data.qualified;
    if (data.nicho) fields['Nicho'] = data.nicho;
    if (data.porQueAceita) fields['Por Que Aceita'] = data.porQueAceita;
    if (data.investimento) fields['Investimento'] = data.investimento;
    if (data.disponibilidadeTempo) fields['Disponibilidade Tempo'] = data.disponibilidadeTempo;
    if (data.comprometimento90d) fields['Comprometimento 90d'] = data.comprometimento90d;
    if (data.expectativaInicio) fields['Expectativa Início'] = data.expectativaInicio;
    if (data.confirmacao1 !== undefined) fields['Confirmação 1'] = data.confirmacao1;
    if (data.confirmacao2 !== undefined) fields['Confirmação 2'] = data.confirmacao2;
    if (data.confirmacao3 !== undefined) fields['Confirmação 3'] = data.confirmacao3;
    if (data.confirmacao4 !== undefined) fields['Confirmação 4'] = data.confirmacao4;
    if (data.status) fields['Status'] = data.status;
    if (data.currentScreen !== undefined) fields['Current Screen'] = data.currentScreen;
    if (data.completedAt) fields['Completed At'] = data.completedAt;
    if (data.disqualified !== undefined) fields['Disqualified'] = data.disqualified;
    if (data.disqualificationReason) fields['Disqualification Reason'] = data.disqualificationReason;
    if (data.addedToMailerLite !== undefined) fields['Added to MailerLite'] = data.addedToMailerLite;
    if (data.mailerLiteSubscriberId) fields['MailerLite Subscriber ID'] = data.mailerLiteSubscriberId;

    const record = await table.update([
      {
        id: recordId,
        fields
      }
    ]);

    return {
      success: true,
      recordId: record[0].id
    };
  } catch (error) {
    console.error('Airtable update error:', error);
    throw error;
  }
}

// Get application by session ID (for resume)
export async function getApplicationBySessionId(sessionId: string) {
  try {
    const records = await table
      .select({
        filterByFormula: `{Session ID} = '${sessionId}'`,
        maxRecords: 1
      })
      .firstPage();

    if (records.length === 0) {
      return null;
    }

    return {
      recordId: records[0].id,
      fields: records[0].fields
    };
  } catch (error) {
    console.error('Airtable get error:', error);
    throw error;
  }
}
```

---

## MAILERLITE CLIENT

**File:** `lib/mailerlite.ts`

```typescript
const MAILERLITE_API_URL = 'https://connect.mailerlite.com/api';

interface MailerLiteSubscriber {
  email: string;
  fields?: {
    name?: string;
    phone?: string;
    [key: string]: any;
  };
  groups?: string[];
}

// Add subscriber to nurture group (Screen 2b)
export async function addToMailerLite(data: MailerLiteSubscriber) {
  try {
    const response = await fetch(`${MAILERLITE_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        fields: {
          name: data.fields?.name || '',
          phone: data.fields?.phone || '',
          application_started: 'true',
          application_completed: 'false'
        },
        groups: [process.env.MAILERLITE_GROUP_NURTURE!]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`MailerLite API error: ${JSON.stringify(error)}`);
    }

    const result = await response.json();
    return {
      success: true,
      subscriberId: result.data.id
    };
  } catch (error) {
    console.error('MailerLite add error:', error);
    // Don't throw - make it non-blocking
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Add to welcome group (Screen 14)
export async function addToWelcomeGroup(email: string) {
  try {
    // Get subscriber ID
    const searchResponse = await fetch(
      `${MAILERLITE_API_URL}/subscribers?filter[email]=${email}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
          'Accept': 'application/json'
        }
      }
    );

    const searchData = await searchResponse.json();

    if (!searchData.data || searchData.data.length === 0) {
      throw new Error('Subscriber not found');
    }

    const subscriberId = searchData.data[0].id;

    // Add to welcome group (keeps nurture group)
    await fetch(
      `${MAILERLITE_API_URL}/subscribers/${subscriberId}/groups/${process.env.MAILERLITE_GROUP_WELCOME}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
          'Accept': 'application/json'
        }
      }
    );

    // Update custom fields
    await fetch(`${MAILERLITE_API_URL}/subscribers/${subscriberId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          application_completed: 'true',
          completed_at: new Date().toISOString()
        }
      })
    });

    return { success: true };
  } catch (error) {
    console.error('MailerLite welcome group error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
```

---

## RESEND EMAIL CLIENT

**File:** `lib/resend.ts`

```typescript
import { Resend } from 'resend';
import ApplicationConfirmationEmail from '@/emails/ApplicationConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(name: string, email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Juçanã - Seja Livre <jucana@sejalivre.com.br>',
      to: email,
      subject: '🎉 Aplicação Recebida!',
      react: ApplicationConfirmationEmail({ name })
    });

    if (error) {
      throw error;
    }

    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('Resend error:', error);
    throw error;
  }
}
```

---

## REQUEST QUEUE UTILITY

**File:** `lib/request-queue.ts`

```typescript
// Prevents race conditions from rapid screen navigation
class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private isProcessing = false;

  async add<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await request();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (!this.isProcessing) {
        this.process();
      }
    });
  }

  private async process() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const request = this.queue.shift()!;
    await request();
    this.process();
  }
}

export const formUpdateQueue = new RequestQueue();
```

---

## RATE LIMITER UTILITY

**File:** `lib/rate-limiter.ts`

```typescript
// Simple in-memory rate limiter (5 submissions per IP per hour)
interface RateLimitData {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitData>();

export function checkRateLimit(ip: string, limit = 5): boolean {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  const data = rateLimitMap.get(ip);

  if (!data || now > data.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + oneHour
    });
    return false; // Not rate limited
  }

  if (data.count >= limit) {
    return true; // Rate limited
  }

  data.count++;
  return false;
}

// Cleanup old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 60 * 1000);
```

---

## MAIN API ROUTE

**File:** `app/api/apply/update/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createApplication,
  updateApplication,
  getApplicationBySessionId
} from '@/lib/airtable';
import { addToMailerLite, addToWelcomeGroup } from '@/lib/mailerlite';
import { sendConfirmationEmail } from '@/lib/resend';
import { checkRateLimit } from '@/lib/rate-limiter';

const updateRequestSchema = z.object({
  action: z.enum(['create', 'update']),
  sessionId: z.string().uuid(),
  airtableRecordId: z.string().optional(),
  data: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    phoneCountry: z.string().optional(),
    email: z.string().email().optional(),
    instagram: z.string().optional(),
    situacaoAtual: z.enum(['A', 'B', 'C']).optional(),
    ticketInfoproduto: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G']).optional(),
    faturamentoMensal: z.enum(['A', 'B', 'C', 'D', 'E', 'F']).optional(),
    nicho: z.string().optional(),
    porQueAceita: z.string().optional(),
    investimento: z.enum(['A', 'B', 'C']).optional(),
    disponibilidadeTempo: z.enum(['Sim', 'Não']).optional(),
    comprometimento90d: z.enum(['Sim', 'Não']).optional(),
    expectativaInicio: z.string().optional(),
    confirmacao1: z.boolean().optional(),
    confirmacao2: z.boolean().optional(),
    confirmacao3: z.boolean().optional(),
    confirmacao4: z.boolean().optional(),
    currentScreen: z.number(),
    status: z.enum(['In Progress', 'Completed', 'Disqualified']).optional()
  })
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente em 1 hora.' },
        { status: 429 }
      );
    }

    // Parse and validate
    const body = await request.json();
    const validated = updateRequestSchema.parse(body);

    // CREATE (Screen 2)
    if (validated.action === 'create') {
      const result = await createApplication({
        sessionId: validated.sessionId,
        name: validated.data.name,
        phone: validated.data.phone,
        phoneCountry: validated.data.phoneCountry,
        currentScreen: validated.data.currentScreen,
        startedAt: new Date().toISOString()
      });

      return NextResponse.json({
        success: true,
        airtableRecordId: result.recordId
      });
    }

    // UPDATE (Screens 3-14)
    if (!validated.airtableRecordId) {
      return NextResponse.json(
        { error: 'Record ID required' },
        { status: 400 }
      );
    }

    // Screen 2b: Email + MailerLite
    if (validated.data.email && validated.data.currentScreen === 2.5) {
      const mlResult = await addToMailerLite({
        email: validated.data.email,
        fields: {
          name: validated.data.name,
          phone: validated.data.phone
        }
      });

      await updateApplication(validated.airtableRecordId, {
        email: validated.data.email,
        currentScreen: validated.data.currentScreen,
        addedToMailerLite: mlResult.success,
        mailerLiteSubscriberId: mlResult.subscriberId
      });

      return NextResponse.json({ success: true });
    }

    // Screen 6: Disqualification check
    if (validated.data.faturamentoMensal) {
      const isDisqualified = ['A', 'B'].includes(validated.data.faturamentoMensal);

      if (isDisqualified) {
        await updateApplication(validated.airtableRecordId, {
          faturamentoMensal: validated.data.faturamentoMensal,
          currentScreen: validated.data.currentScreen,
          status: 'Disqualified',
          disqualified: true,
          disqualificationReason: 'revenue_below_30k'
        });

        return NextResponse.json({
          success: true,
          disqualified: true
        });
      }

      await updateApplication(validated.airtableRecordId, {
        faturamentoMensal: validated.data.faturamentoMensal,
        currentScreen: validated.data.currentScreen,
        qualified: true
      });

      return NextResponse.json({ success: true });
    }

    // Screen 14: Completion
    if (validated.data.status === 'Completed') {
      const record = await getApplicationBySessionId(validated.sessionId);
      const email = record?.fields['Email'] as string;
      const name = record?.fields['Name'] as string;

      await updateApplication(validated.airtableRecordId, {
        ...validated.data,
        status: 'Completed',
        completedAt: new Date().toISOString()
      });

      // Async, non-blocking
      if (email && name) {
        sendConfirmationEmail(name, email).catch(console.error);
        addToWelcomeGroup(email).catch(console.error);
      }

      return NextResponse.json({ success: true });
    }

    // Regular update
    await updateApplication(validated.airtableRecordId, {
      ...validated.data,
      currentScreen: validated.data.currentScreen
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao processar. Tente novamente.' },
      { status: 500 }
    );
  }
}
```

---

## POSTHOG SETUP

**File:** `app/providers.tsx`

```typescript
'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    }
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
```

**Update `app/layout.tsx`:**

```typescript
import { Providers } from './providers';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## EXAMPLE FORM COMPONENT

**File:** `components/form/Screen2Phone.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneSchema } from '@/lib/validations';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { usePostHog } from 'posthog-js/react';

interface Screen2Props {
  onNext: (data: any) => void;
  defaultValues?: any;
}

export default function Screen2Phone({ onNext, defaultValues }: Screen2Props) {
  const posthog = usePostHog();
  const [phone, setPhone] = useState(defaultValues?.phone || '');
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(phoneSchema)
  });

  const onSubmit = async () => {
    setIsLoading(true);

    // Track event
    posthog?.capture('application_form_phone_entered', {
      screen: 2
    });

    // Get session data
    const sessionData = JSON.parse(localStorage.getItem('form_session') || '{}');

    try {
      // CREATE Airtable record (first save)
      const response = await fetch('/api/apply/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          sessionId: sessionData.sessionId,
          data: {
            name: sessionData.name,
            phone: phone,
            phoneCountry: 'BR',
            currentScreen: 2
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        // Store record ID
        sessionData.airtableRecordId = result.airtableRecordId;
        sessionData.phone = phone;
        localStorage.setItem('form_session', JSON.stringify(sessionData));

        onNext({ phone });
      } else {
        alert('Erro ao salvar. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão. Verifique sua internet.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <p className="text-beige text-sm mb-2">Informações Básicas</p>
        <h1 className="text-white text-2xl mb-8 font-serif">
          WhatsApp com DDD:
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <PhoneInput
            international
            defaultCountry="BR"
            value={phone}
            onChange={setPhone}
            className="w-full bg-navy-light text-white p-4 rounded text-lg"
          />

          {errors.phone && (
            <p className="text-red-400 mt-2">{errors.phone.message}</p>
          )}

          <p className="text-beige text-sm mt-4">
            Vou usar apenas para te enviar o link da nossa conversa.
            Nada de spam, prometo. 💙
          </p>

          <button
            type="submit"
            disabled={!phone || isLoading}
            className="w-full bg-borgonha text-white py-4 rounded-lg mt-8 text-lg font-bold hover:bg-borgonha-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? 'Salvando...' : 'OK'}
          </button>

          <p className="text-beige text-center text-sm mt-2">
            Pressione Enter ↵
          </p>
        </form>
      </div>
    </div>
  );
}
```

---

## EMAIL TEMPLATE

**File:** `emails/ApplicationConfirmation.tsx`

```typescript
import * as React from 'react';

interface ApplicationConfirmationEmailProps {
  name: string;
}

export default function ApplicationConfirmationEmail({
  name
}: ApplicationConfirmationEmailProps) {
  return (
    <div style={{
      fontFamily: 'Century Gothic, sans-serif',
      padding: '40px 20px',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px'
      }}>
        <h1 style={{
          color: '#81171F',
          fontSize: '24px',
          marginBottom: '20px'
        }}>
          🎉 Aplicação Recebida, {name}!
        </h1>

        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
          Obrigada por compartilhar sua história comigo. Eu li cada palavra
          e já estou pensando em como posso te ajudar.
        </p>

        <h2 style={{
          fontSize: '18px',
          marginTop: '30px',
          color: '#191F3A'
        }}>
          Próximos Passos:
        </h2>

        <ul style={{
          fontSize: '16px',
          lineHeight: '1.8',
          paddingLeft: '20px'
        }}>
          <li>✓ Vou analisar sua aplicação nas próximas 24-48 horas</li>
          <li>✓ Se somos fit, você recebe email + WhatsApp com link para agendar nossa Conversa de Descoberta</li>
          <li>✓ Na call de 45 minutos, vamos mergulhar fundo na sua situação e traçar seu roadmap de libertação</li>
        </ul>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#F5F5DC',
          borderRadius: '8px'
        }}>
          <h3 style={{
            fontSize: '16px',
            marginBottom: '10px',
            color: '#191F3A'
          }}>
            Enquanto isso:
          </h3>
          <p style={{ fontSize: '14px', margin: '5px 0' }}>
            → Fique de olho no seu email (confira spam também!)
          </p>
          <p style={{ fontSize: '14px', margin: '5px 0' }}>
            → Me segue no Instagram: <a href="https://instagram.com/jucanamaximiliano" style={{ color: '#81171F' }}>@jucanamaximiliano</a>
          </p>
          <p style={{ fontSize: '14px', margin: '5px 0' }}>
            → Prepare-se para nossa conversa pensando: "Como seria minha vida se meu negócio funcionasse sem mim?"
          </p>
        </div>

        <p style={{
          marginTop: '40px',
          fontSize: '16px',
          fontStyle: 'italic',
          color: '#666'
        }}>
          Do meu coração para o seu: você chegou até aqui por uma razão.
          Seu instinto está te dizendo que é hora de mudar. Confie nele.
        </p>

        <p style={{ fontSize: '16px', marginTop: '20px', color: '#333' }}>
          Até breve,<br />
          Juçanã 💙❤️🦅
        </p>

        <p style={{
          fontSize: '12px',
          color: '#999',
          marginTop: '40px',
          borderTop: '1px solid #eee',
          paddingTop: '20px'
        }}>
          P.S.: Se tiver qualquer dúvida antes da call, me manda DM no Instagram.
          Eu mesma respondo.
        </p>
      </div>
    </div>
  );
}
```

---

**Version:** 1.0
**Last Updated:** 2025-01-14
**Ready to implement!**
