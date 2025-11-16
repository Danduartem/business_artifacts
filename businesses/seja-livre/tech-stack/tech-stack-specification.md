# SEJA LIVRE - Technology Stack Specification

**Generated:** 2025-01-14
**Project:** Seja Livre Landing Page + Multi-Step Application Form
**Client:** Juçanã Maximiliano - Mentoria Seja Livre
**Budget:** Zero (Free tier tools only)
**Timeline:** Launch this week (3 days)

---

## EXECUTIVE SUMMARY

Complete technology stack for a high-ticket (R$60,000) mentoring program landing page with 14-screen progressive application form. All services remain free at projected volume (5-20 applications/month, 100-500 visitors/month).

**Total Monthly Cost: $0**

---

## COMPLETE TECH STACK

| Component | Technology | Cost | Why Selected |
|-----------|-----------|------|--------------|
| **Frontend Framework** | Next.js 14 (App Router) | FREE | Modern, fast, SEO-friendly |
| **Styling** | Tailwind CSS | FREE | Already using, rapid development |
| **Hosting** | Vercel | FREE | Next.js optimized, auto-deploy |
| **Form Handling** | React Hook Form + Zod | FREE | Type-safe validation |
| **Form Storage** | Airtable (1k records) | FREE | Beautiful UI, no admin build needed |
| **Transactional Email** | Resend (3k/month) | FREE | Developer-friendly, instant delivery |
| **Marketing Email** | MailerLite (12k/month) | FREE | Already using |
| **Analytics** | PostHog (1M events/mo) | FREE | Full funnel tracking + session replay |
| **Performance** | Vercel Analytics | FREE | Included with hosting |
| **Image Management** | /public folder + Next.js Image | FREE | Auto-optimization, CDN delivery |
| **Scheduling** | Calendly | FREE | Already using |
| **Payments** | Stripe | FREE | Already using, pay-as-you-go |

---

## PROJECT REQUIREMENTS

### Business Context
- **Product:** Grupo de Tração (High-ticket mentoring)
- **Price:** R$60,000 (12x R$6,293 or cash)
- **Target:** Female entrepreneurs, R$30k+/month revenue
- **Model:** 5 clients per quarter (intimate 1-on-1)

### Technical Requirements
- Landing page with 10 sections
- Multi-step form: 14 screens
- Progressive saves (data captured after each screen)
- Email collected on Screen 2b → MailerLite nurture list
- Form completion → MailerLite welcome list (keep in nurture too)
- Auto-approval initially (manual review later)
- Disqualification flow for revenue < R$30k
- Calendly integration on success page
- Analytics tracking full funnel

### Constraints
- **Budget:** Almost zero - free tiers only
- **Timeline:** Launch this week (urgent)
- **Team:** Solo developer (full-stack)
- **Scale:** Low volume initially (5-20 apps/month)
- **Approach:** Hybrid (free SaaS + custom code)

---

## ARCHITECTURE DECISIONS

### Why Airtable (vs. Database)?
- ✅ Beautiful UI for reviewing applications
- ✅ No admin panel build needed (saves 6-8 hours)
- ✅ Free tier: 1,000 records (4+ years at current scale)
- ✅ Native API (easy integration)
- ✅ Kanban views for pipeline management
- ❌ Less control than PostgreSQL
- ❌ 1k record limit (migrate later if needed)

**Verdict:** Perfect for launch, can migrate to database later

### Why Resend (vs. SendGrid/Mailgun)?
- ✅ Developer-friendly (designed for Next.js)
- ✅ React Email templates (write in JSX)
- ✅ 3k emails/month free (plenty for transactional)
- ✅ Modern API, great DX
- ❌ Newer service (less proven than SendGrid)

**Verdict:** Best developer experience, sufficient free tier

### Why PostHog (vs. Google Analytics)?
- ✅ All-in-one: analytics + funnels + session replay + heatmaps
- ✅ 1M events/month free (you'll use ~5-10k)
- ✅ Privacy-friendly (GDPR compliant)
- ✅ Easy funnel setup for 14-screen form
- ❌ Less familiar than GA4

**Verdict:** Better features, easier setup, generous free tier

### Why Progressive Saves?
- ✅ Capture leads early (name + phone on Screen 2)
- ✅ Can contact even if form abandoned
- ✅ Each lead worth R$60k (can't lose data)
- ✅ Analytics shows exact drop-off points
- ❌ More complex than single submission

**Verdict:** Critical for high-ticket offer

---

## FREE TIER LIMITS VALIDATION

| Service | Free Limit | Your Usage | Safety Margin |
|---------|-----------|------------|---------------|
| **Vercel** | 100GB bandwidth/mo | ~5GB (500 visitors) | 20x headroom |
| **Airtable** | 1,000 records | 240/year (20/mo) | 4+ years |
| **Resend** | 3,000 emails/mo | ~150/mo | 20x headroom |
| **MailerLite** | 12,000 emails/mo | ~500-1000/mo | 12x headroom |
| **PostHog** | 1M events/mo | ~10k/mo | 100x headroom |
| **Calendly** | Unlimited (free) | N/A | ∞ |
| **Next.js Image** | 1k optimizations/mo | ~250/mo | 4x headroom |

**All services safe for 1-2 years minimum at projected scale.**

---

## SECURITY & VALIDATION

### Implemented Security Measures
- ✅ Server-side validation (Zod schemas on API routes)
- ✅ Rate limiting (5 submissions per IP per hour)
- ✅ CSRF protection (origin check)
- ✅ Request queuing (prevents race conditions)
- ✅ Error handling with retries
- ✅ No API keys in frontend
- ✅ Environment variables secured

### Production Readiness
- ✅ Error handling for all API failures
- ✅ Retry logic with exponential backoff
- ✅ Fallback to localStorage if APIs down
- ✅ Input validation client + server
- ✅ Rate limiting to prevent spam
- ✅ Mobile-responsive design
- ✅ SEO optimized (Next.js SSR)

---

## ALTERNATIVES CONSIDERED & REJECTED

### Form Builders
- ❌ **Typeform** - Free tier only 10 responses/month
- ❌ **Jotform** - Adds branding on free tier
- ❌ **Tally** - Requires credit card for branding removal
- ✅ **Custom Next.js** - Full control, no limits

### Databases
- ❌ **Notion** - Slower API, more complex integration
- ❌ **Supabase** - Requires building admin UI (6+ hours)
- ❌ **Vercel Postgres** - Same issue, admin UI needed
- ✅ **Airtable** - Beautiful UI out of box

### Email Services
- ❌ **ConvertKit** - Free tier 300 subscribers (might outgrow)
- ❌ **ActiveCampaign** - No free tier
- ✅ **MailerLite** - Already using (12k emails/mo)
- ✅ **Resend** - Perfect for transactional

### Analytics
- ❌ **Mixpanel** - Overkill for simple funnel
- ❌ **Google Analytics 4** - Complex setup, limited features
- ❌ **Umami** - Self-hosted (more setup time)
- ✅ **PostHog** - All features, easy setup, generous free tier

---

## SCALABILITY PATH

### Current Setup (Launch - Year 1)
- Airtable: 1,000 records
- 5-20 applications/month
- 100-500 visitors/month
- All free tiers

### When to Upgrade (Year 2+)

**If applications > 80/month:**
- Migrate Airtable → Vercel Postgres
- Build simple admin UI
- Estimated: 8-12 hours migration work

**If visitors > 5,000/month:**
- Still free tier (Vercel handles 10x more)
- May need paid PostHog ($20/mo) for more events

**If emails > 2,500/month:**
- Upgrade Resend ($20/mo for 50k emails)
- Or switch to SendGrid

**If revenue increases:**
- Consider Cloudinary for image management ($0-25/mo)
- Consider Vercel Pro ($20/mo for better support)

---

## MAINTENANCE REQUIREMENTS

### Monthly (5-10 minutes)
- Check Airtable for abandoned applications
- Review PostHog funnel metrics
- Monitor error logs in Vercel

### Quarterly (30 minutes)
- Review free tier usage (ensure not hitting limits)
- Update dependencies (Next.js, packages)
- Review conversion rates, optimize drop-off points

### As Needed
- Respond to form submissions (daily)
- Update landing page copy
- Add new testimonials

---

## SUCCESS CRITERIA

### Technical
- ✅ Page load < 2 seconds
- ✅ Mobile-responsive (all screens)
- ✅ 99.9% uptime (Vercel SLA)
- ✅ Zero data loss (progressive saves)
- ✅ SEO optimized (meta tags, schema)

### Business
- ✅ Landing → Application: 20-30%
- ✅ Application started → Completed: 40-50%
- ✅ Completed → Calendly scheduled: 60-70%
- ✅ Discovery call → Enrollment: 25-35%

---

## DECISION RATIONALE

**Why this stack over alternatives?**

1. **Zero Budget Met:** All tools free at scale
2. **Launch Speed:** 3 days vs 1-2 weeks (pre-built tools)
3. **Developer Experience:** Modern tools, great DX
4. **Production Ready:** Security, error handling, monitoring
5. **Scalable:** Can grow 10x without changing stack
6. **Maintainable:** Solo developer can manage alone
7. **SMB-Appropriate:** Not over-engineered

**Trade-offs accepted:**

- Airtable 1k limit (acceptable for 4+ years)
- Less control vs custom DB (worth speed gain)
- Vendor dependencies (mitigated by data export options)

---

## NEXT STEPS

1. **Day 1:** Service setup + Landing page
2. **Day 2:** Multi-step form + API integration
3. **Day 3:** Testing + Security + Deploy
4. **Week 2:** Monitor metrics, optimize funnel
5. **Month 2+:** Iterate based on data

---

**Version:** 1.0
**Last Updated:** 2025-01-14
**Status:** Ready for Implementation
