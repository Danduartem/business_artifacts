# SEJA LIVRE v2 - Technology Stack Specification

**Generated:** 2025-12-10
**Project:** SEJA LIVRE Landing Page + Multi-Step Application Form
**Business:** Mentoria SEJA LIVRE (Juçanã Maximiliano)
**Budget:** Zero (Free tier tools only)
**Stack Advisor Version:** 2.0

---

## Executive Summary

Complete technology stack for a high-ticket (€4,500) mentoring program landing page with 11-screen progressive application form. All services remain free at projected volume (20-40 applications/month, 500-1000 visitors/month).

**Total Monthly Cost: €0**

---

## Complete Tech Stack

| Component | Technology | Cost | Why Selected |
|-----------|-----------|------|--------------|
| **Frontend Framework** | Next.js 14 (App Router) | FREE | Team expertise, SEO-friendly, modern |
| **Styling** | Tailwind CSS | FREE | Team expertise, rapid development |
| **Hosting** | Vercel | FREE | Next.js optimized, auto-deploy, global CDN |
| **Form Handling** | React Hook Form + Zod | FREE | Type-safe validation, great DX |
| **Data Storage** | Notion | FREE | User preference, unlimited blocks, beautiful UI |
| **Lead Tracking** | Todoist | FREE | User preference, task management, due dates |
| **Transactional Email** | Resend (3k/month) | FREE | Developer-friendly, React Email support |
| **Marketing Email** | MailerLite (1k subs) | FREE | Already using, nurture sequences |
| **Analytics** | PostHog (1M events/mo) | FREE | Full funnel tracking, session replay |
| **Scheduling** | Calendly | FREE | Already using, easy embed |
| **WhatsApp Button** | Custom Component | FREE | Direct contact, PT/BR market essential |

---

## Project Requirements

### Business Context

| Aspect | Details |
|--------|---------|
| **Product** | SEJA LIVRE Mentoria Empresarial |
| **Price** | €4,500 (6x €750/mês) |
| **Target** | Service business owners, €15k-40k/mês revenue |
| **Personas** | Carolina/Carlos (33-45 years, PT/BR) |
| **Model** | 1-on-1 mentoring, 6 months, 24 sessions |
| **CTA** | Free diagnostic session booking |

### Technical Requirements

- Landing page with 12 sections (long-form, high-ticket optimized)
- Multi-step application form: 11 screens (OQPS style)
- Progressive saves (data captured after Screen 2)
- Qualification gate at Screen 5 (revenue) and Screen 6 (team size)
- Abandonment tracking with 48h follow-up system
- Calendly integration on success page
- WhatsApp floating button for direct contact
- Full funnel analytics tracking

### Constraints

| Constraint | Requirement |
|------------|-------------|
| **Budget** | Zero - free tiers only |
| **Team Skills** | Next.js + Tailwind (existing expertise) |
| **Tools** | Notion + Todoist (user preference) |
| **Markets** | Portugal (primary), Brazil (secondary) |
| **Scale** | 20-40 applications/month initially |

---

## Free Tier Limits Validation

| Service | Free Limit | Expected Usage | Headroom | Status |
|---------|-----------|----------------|----------|--------|
| **Vercel** | 100GB bandwidth/mo | ~10GB | 10x | ✅ Safe |
| **Notion** | Unlimited blocks | ~40 pages/mo | ∞ | ✅ Safe |
| **Todoist** | 80 tasks/project | ~40 tasks/mo | 2 months | ⚠️ Archive monthly |
| **Resend** | 3,000 emails/mo | ~100/mo | 30x | ✅ Safe |
| **MailerLite** | 1,000 subscribers | ~40/mo | 25 months | ✅ Safe |
| **PostHog** | 1M events/mo | ~20k/mo | 50x | ✅ Safe |
| **Calendly** | Unlimited | N/A | ∞ | ✅ Safe |

**All services safe for 12+ months at projected scale.**

---

## Architecture Decisions

### Why Notion (vs. Airtable/Database)?

| Pro | Con |
|-----|-----|
| ✅ User already knows it | ❌ API slower than Airtable |
| ✅ Unlimited blocks (free) | ❌ More complex integration |
| ✅ Beautiful database views | |
| ✅ No new tool to learn | |

**Verdict:** User preference + familiarity outweighs API speed difference at this scale.

### Why Todoist (vs. Just Notion)?

| Pro | Con |
|-----|-----|
| ✅ User already uses it | ❌ 80 task/project limit |
| ✅ Due date reminders | ❌ Requires monthly archiving |
| ✅ Mobile app for on-the-go | |
| ✅ Natural workflow integration | |

**Verdict:** Perfect for lead follow-up workflow. Archive tasks monthly to stay within limits.

### Why Progressive Saves?

| Pro | Con |
|-----|-----|
| ✅ Capture leads early (Screen 2) | ❌ More API calls |
| ✅ Can contact abandoned leads | ❌ Slightly more complex |
| ✅ Each lead worth €4,500 | |
| ✅ Analytics shows exact drop-off | |

**Verdict:** Critical for high-ticket. Can't lose €4,500 potential leads.

### Why WhatsApp Button?

| Pro | Con |
|-----|-----|
| ✅ Essential for PT/BR markets | ❌ None |
| ✅ Direct, personal contact | |
| ✅ Higher trust for high-ticket | |
| ✅ Zero cost (custom component) | |

**Verdict:** Must-have for Portuguese/Brazilian audience.

---

## Security Measures

| Measure | Implementation |
|---------|----------------|
| **Server-side validation** | Zod schemas on all API routes |
| **Rate limiting** | 5 submissions per IP per hour |
| **CSRF protection** | Origin header verification |
| **API key security** | Server-side only (.env.local) |
| **HTTPS** | Enforced by Vercel |
| **Input sanitization** | Zod validation + HTML escape |
| **Error handling** | Graceful failures, no info leakage |

---

## Abandonment Tracking System

### Overview

Leads who start but don't complete the form are tracked and followed up within 48 hours.

### Flow

```
Screen 2 (WhatsApp captured)
         │
         ├──▶ NOTION: Create record, status = "In Progress"
         ├──▶ TODOIST: Create task, due in 48h
         └──▶ Track lastActivityAt on every update

IF completes → Update task to "Follow up for diagnostic"
IF abandons → Todoist due date triggers team reminder
```

### Notion Views

1. **Pipeline (Kanban)** - By status
2. **Abandonados** - In Progress + Last Activity > 48h ago
3. **Esta Semana** - Recent applications
4. **Qualificados** - Ready for diagnostic call

### Todoist Tasks

- Created on Screen 2 (first save)
- Due: +48 hours
- Contains: Name, WhatsApp, where they stopped
- Updated on completion with new action

---

## Scalability Path

### Current Setup (Year 1)

- 20-40 applications/month
- 500-1000 visitors/month
- All free tiers sufficient

### When to Upgrade

| Trigger | Action | Cost |
|---------|--------|------|
| Todoist > 80 tasks | Archive monthly or upgrade | €4/mo |
| MailerLite > 1000 subs | Upgrade plan | €10/mo |
| Need automation | Add Make.com/n8n | Free-€10/mo |
| Volume > 100 apps/mo | Consider Supabase for DB | €0-25/mo |

---

## Maintenance Requirements

### Weekly (10-15 minutes)

- Check Notion for new applications
- Review Todoist for follow-up tasks
- Contact abandoned leads

### Monthly (30 minutes)

- Archive completed Todoist tasks
- Review PostHog funnel metrics
- Check free tier usage

### As Needed

- Update landing page copy
- Add new testimonials
- Respond to WhatsApp inquiries

---

## Success Metrics

### Technical

| Metric | Target |
|--------|--------|
| Page load | < 2 seconds |
| Mobile responsive | 100% |
| Uptime | 99.9% (Vercel SLA) |
| Data loss | Zero (progressive saves) |

### Business (Funnel)

| Stage | Target |
|-------|--------|
| Landing → Form Start | 15-25% |
| Form Start → Screen 2 | 85%+ |
| Screen 5 Qualified | 60-70% |
| Qualified → Complete | 70-80% |
| Complete → Scheduled | 60-70% |
| Abandoned → Recovered | 10-20% |

---

## Environment Variables

```env
# Notion
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=xxx

# Todoist
TODOIST_API_KEY=xxx
TODOIST_PROJECT_ID=xxx

# Resend
RESEND_API_KEY=re_xxx

# MailerLite
MAILERLITE_API_KEY=xxx
MAILERLITE_GROUP_ID=xxx

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=351912345678
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-10 | Initial specification |

---

**Status:** Ready for Implementation

**Generated by:** Stack Advisor (BMAD Module)
