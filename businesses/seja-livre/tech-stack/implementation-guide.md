# SEJA LIVRE - Implementation Guide

**Generated:** 2025-01-14
**Timeline:** 3 Days to Launch
**Estimated Hours:** 20-24 hours total

---

## 3-DAY BUILD PLAN

### **DAY 1: Foundation & Services (6-8 hours)**

#### Morning (3-4 hours): Service Configuration

**1. Airtable Setup (45 min)**
- [ ] Create account: https://airtable.com/signup
- [ ] Create base: "Seja Livre - Applications"
- [ ] Create all 28 fields (see airtable-schema.md)
- [ ] Get API key: Account → Generate token
- [ ] Get Base ID: Help → API documentation

**2. Resend Setup (15 min)**
- [ ] Sign up: https://resend.com/signup
- [ ] Verify domain: sejalivre.com.br (add DNS records)
- [ ] OR use: onboarding.resend.dev (for testing)
- [ ] Create API key: Dashboard → API Keys

**3. MailerLite Setup (30 min)**
- [ ] Log in to existing account
- [ ] Create group: "nurture"
- [ ] Create group: "welcome"
- [ ] Copy group IDs (from URL when viewing group)
- [ ] Get API key: Settings → Developer API

**4. PostHog Setup (20 min)**
- [ ] Sign up: https://app.posthog.com/signup
- [ ] Create project: "Seja Livre - Landing Page"
- [ ] Copy API key: Settings → Project API Key

**5. Environment Variables (10 min)**
- [ ] Create `.env.local` file
- [ ] Add all API keys (see template below)
- [ ] Verify `.gitignore` includes `.env.local`

**6. Next.js Project Setup (30 min)**
- [ ] `npx create-next-app@latest seja-livre-landing`
- [ ] Install dependencies (see package list below)
- [ ] Create folder structure
- [ ] Set up Tailwind config with brand colors

#### Afternoon (3-4 hours): Landing Page

**7. Landing Page Sections (3 hours)**
- [ ] Create 10 section components
- [ ] Add multiple CTAs (all link to `/form`)
- [ ] Add images to `/public/images/`
- [ ] Mobile-responsive styling

**8. PostHog Integration (30 min)**
- [ ] Create providers.tsx
- [ ] Update layout.tsx
- [ ] Add event tracking to CTAs

**9. Testing (30 min)**
- [ ] Test all CTAs link to form
- [ ] Test on mobile
- [ ] Verify PostHog tracking

---

### **DAY 2: Multi-Step Form (8-10 hours)**

#### Morning (4-5 hours): Form Screens 1-7

**10. Form Foundation (1 hour)**
- [ ] Create `/app/form/page.tsx` container
- [ ] Build progress bar component
- [ ] Set up form state management
- [ ] Create sessionId generator

**11. Screen 0: Intro (30 min)**
- [ ] Welcome message
- [ ] Expectations setting
- [ ] "COMEÇAR" button

**12. Screen 1: Name (30 min)**
- [ ] Text input
- [ ] Validation (2 words min)
- [ ] Save to localStorage only

**13. Screen 2: Phone (1 hour)**
- [ ] Phone input with country selector
- [ ] Validation
- [ ] **FIRST API CALL** - Create Airtable record
- [ ] Store airtableRecordId

**14. Screen 2b: Email (1 hour)**
- [ ] Email input
- [ ] Validation
- [ ] Update Airtable
- [ ] Add to MailerLite nurture group
- [ ] Error handling (non-blocking)

**15. Screens 3-7 (1.5 hours)**
- [ ] Screen 3: Instagram (optional)
- [ ] Screen 4: Situação Atual (radio)
- [ ] Screen 5: Ticket Infoproduto (radio)
- [ ] Screen 6: Faturamento (radio + disqualification)
- [ ] Screen 7: Nicho (textarea)

#### Afternoon (4-5 hours): Screens 8-14 + API

**16. Screens 8-13 (2 hours)**
- [ ] Screen 8: Por Que Aceita (textarea)
- [ ] Screen 9: Investimento (radio)
- [ ] Screen 10: Disponibilidade (radio)
- [ ] Screen 11: Comprometimento (radio)
- [ ] Screen 12: Expectativa (radio)
- [ ] Screen 13: Confirmações (4 checkboxes)

**17. Screen 14: Success (1 hour)**
- [ ] Success message
- [ ] Calendly embed
- [ ] Integration with Calendly

**18. Disqualification Screen (30 min)**
- [ ] Message for < R$30k revenue
- [ ] Alternative resources
- [ ] Instagram CTA

**19. API Routes (2 hours)**
- [ ] `/api/apply/update/route.ts`
- [ ] Request validation (Zod)
- [ ] Error handling with retries
- [ ] Rate limiting
- [ ] Request queuing

**20. Integration Clients (30 min)**
- [ ] `lib/airtable.ts`
- [ ] `lib/mailerlite.ts`
- [ ] `lib/resend.ts`
- [ ] `lib/request-queue.ts`
- [ ] `lib/rate-limiter.ts`

---

### **DAY 3: Testing & Launch (6-8 hours)**

#### Morning (3-4 hours): Testing

**21. End-to-End Testing (2 hours)**
- [ ] Complete full form submission
- [ ] Verify all 14 screens save
- [ ] Check Airtable has all data
- [ ] Verify MailerLite added to nurture
- [ ] Check received confirmation email
- [ ] After completion, verify welcome group
- [ ] Check Calendly loads

**22. Progressive Save Testing (1 hour)**
- [ ] Fill Screen 1, verify localStorage only
- [ ] Fill Screen 2, verify Airtable created
- [ ] Refresh page, verify can resume
- [ ] Fill Screen 2b, verify MailerLite added
- [ ] Continue form, verify updates work

**23. Edge Case Testing (1 hour)**
- [ ] Disqualification flow (select A or B on Screen 6)
- [ ] Back button behavior
- [ ] Disconnect internet mid-form
- [ ] Rate limiting (6 rapid submissions)
- [ ] Mobile testing (all screens)

#### Afternoon (3-4 hours): Security & Deployment

**24. Security Audit (1 hour)**
- [ ] Verify `.env.local` not committed
- [ ] Check API keys not in frontend
- [ ] Test rate limiting works
- [ ] Verify CORS protection
- [ ] Check server-side validation

**25. Deploy to Vercel (1 hour)**
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add environment variables
- [ ] Deploy
- [ ] Test production URL

**26. Production Testing (1 hour)**
- [ ] Submit test application on prod
- [ ] Verify all integrations work
- [ ] Check mobile works
- [ ] Test all landing page CTAs
- [ ] Monitor Vercel logs

**27. Go Live (30 min)**
- [ ] Announce on Instagram
- [ ] Send to email list
- [ ] Monitor first applications
- [ ] Watch PostHog for traffic

---

## ENVIRONMENT VARIABLES

Create `.env.local`:

```bash
# Airtable
AIRTABLE_API_KEY=patXXXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXX

# Resend
RESEND_API_KEY=re_XXXXXXXXXXXXXXXX

# MailerLite
MAILERLITE_API_KEY=mlXXXXXXXXXXXXXXXX
MAILERLITE_GROUP_NURTURE=12345678
MAILERLITE_GROUP_WELCOME=87654321

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_XXXXXXXXXXXXXXXX
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# App
NEXT_PUBLIC_SITE_URL=https://sejalivre.com.br
# For dev: http://localhost:3000
```

---

## PACKAGE INSTALLATION

```bash
# Create project
npx create-next-app@latest seja-livre-landing
cd seja-livre-landing

# Install dependencies
npm install @hookform/resolvers react-hook-form zod
npm install airtable
npm install resend react-email
npm install posthog-js
npm install react-phone-number-input libphonenumber-js
npm install uuid
npm install @types/uuid --save-dev
```

`package.json` will look like:
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "^18",
    "react-dom": "^18",
    "@hookform/resolvers": "^3.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "airtable": "^0.12.x",
    "resend": "^3.x",
    "react-email": "^2.x",
    "posthog-js": "^1.x",
    "react-phone-number-input": "^3.x",
    "libphonenumber-js": "^1.x",
    "uuid": "^9.x"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/uuid": "^9.x",
    "typescript": "^5",
    "tailwindcss": "^3.x"
  }
}
```

---

## TAILWIND CONFIG

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#191F3A',
          light: '#2A3154'
        },
        borgonha: {
          DEFAULT: '#81171F',
          dark: '#6a1319'
        },
        beige: '#F5F5DC',
        blue: '#0000FF',  // Brand blue 💙
        red: '#FF0000'    // Brand red ❤️
      },
      fontFamily: {
        serif: ['Lora', 'serif'],
        sans: ['Century Gothic', 'sans-serif']
      }
    },
  },
  plugins: [],
}
export default config
```

---

## FOLDER STRUCTURE

```
seja-livre-landing/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── form/page.tsx               # Form container
│   ├── layout.tsx
│   ├── globals.css
│   ├── providers.tsx
│   └── api/
│       └── apply/update/route.ts
│
├── components/
│   ├── landing/                    # 10 sections
│   ├── form/                       # 14 screens + progress
│   └── ui/                         # Reusable
│
├── emails/
│   └── ApplicationConfirmation.tsx
│
├── lib/
│   ├── airtable.ts
│   ├── mailerlite.ts
│   ├── resend.ts
│   ├── posthog.ts
│   ├── validations.ts
│   ├── rate-limiter.ts
│   └── request-queue.ts
│
├── types/
│   └── application.ts
│
└── public/
    └── images/
        ├── jucana/
        ├── testimonials/
        ├── brand/
        └── diagrams/
```

---

## QUICK TROUBLESHOOTING

### "Cannot find module '@/lib/...'"

**Fix:** Check `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### "Airtable API returns 401"

**Fix:**
- Verify API key in `.env.local`
- Check Base ID is correct
- Ensure token has write permissions

### "MailerLite returns 404"

**Fix:**
- Check group IDs are correct
- Verify API key is valid
- Ensure endpoint URL correct

### "Form doesn't save to Airtable"

**Debug:**
1. Check Network tab in browser
2. Look for `/api/apply/update` call
3. Check response for errors
4. Verify `.env.local` loaded (restart dev server)

### "PostHog not tracking"

**Fix:**
- Check `NEXT_PUBLIC_` prefix on keys
- Verify PostHog provider in layout
- Check browser console for errors
- Disable ad blockers for testing

---

## TESTING CHECKLIST

### Functional Testing
- [ ] All 14 screens navigate correctly
- [ ] Progressive saves work (check Airtable after each screen)
- [ ] Validation errors show correctly
- [ ] Disqualification message shows for < R$30k
- [ ] Success page loads with Calendly
- [ ] All landing page CTAs link to form

### Integration Testing
- [ ] Airtable creates record on Screen 2
- [ ] Airtable updates on Screens 3-14
- [ ] MailerLite adds to nurture (Screen 2b)
- [ ] MailerLite adds to welcome (Screen 14)
- [ ] Resend sends confirmation email
- [ ] PostHog tracks events

### Error Handling
- [ ] Retry logic works (simulate API failure)
- [ ] localStorage fallback works
- [ ] Non-blocking MailerLite (doesn't block user)
- [ ] Rate limiting triggers after 5 submissions
- [ ] Form resume works after refresh

### Mobile Testing
- [ ] All screens responsive
- [ ] Phone input works on mobile
- [ ] Progress bar visible
- [ ] Buttons accessible
- [ ] Text readable (font sizes)

### Security Testing
- [ ] API keys not in frontend code
- [ ] Rate limiting works
- [ ] Server-side validation active
- [ ] CORS protection works

---

## LAUNCH CHECKLIST

### Pre-Launch
- [ ] All environment variables set in Vercel
- [ ] Domain configured (sejalivre.com.br)
- [ ] DNS records added for Resend
- [ ] MailerLite automation sequences active
- [ ] Calendly event type configured
- [ ] PostHog project ready

### Deploy
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Verify build succeeds
- [ ] Check deployment URL

### Post-Deploy
- [ ] Submit test application on production
- [ ] Verify Airtable saves
- [ ] Verify emails send
- [ ] Verify MailerLite adds
- [ ] Check mobile works
- [ ] Check all CTAs

### Monitoring
- [ ] Watch Airtable for new submissions
- [ ] Monitor PostHog for traffic
- [ ] Check Vercel logs for errors
- [ ] Monitor email delivery (Resend dashboard)

### Go Live
- [ ] Announce on Instagram
- [ ] Send to email list
- [ ] Monitor first 10 applications closely

---

## ESTIMATED TIME BREAKDOWN

| Task | Hours |
|------|-------|
| **Day 1** | |
| Service setup | 2-3 |
| Next.js project setup | 1 |
| Landing page | 3-4 |
| **Day 2** | |
| Form screens 1-7 | 4-5 |
| Form screens 8-14 | 2-3 |
| API routes + clients | 2-3 |
| **Day 3** | |
| Testing | 3-4 |
| Security audit | 1 |
| Deploy + production testing | 2 |
| Go live | 0.5 |
| **TOTAL** | **20-24 hrs** |

---

## SUCCESS METRICS TO TRACK

**Week 1:**
- Applications submitted
- Completion rate (started → finished)
- Calendly scheduled
- PostHog funnel conversion

**Week 2+:**
- Drop-off points (which screen loses most people)
- Email open rates (MailerLite)
- Discovery call attendance
- Enrollment rate

**Optimize based on data!**

---

## SUPPORT RESOURCES

- **Next.js Docs:** https://nextjs.org/docs
- **Airtable API:** https://airtable.com/developers/web/api
- **Resend Docs:** https://resend.com/docs
- **MailerLite API:** https://developers.mailerlite.com/docs
- **PostHog Docs:** https://posthog.com/docs
- **React Hook Form:** https://react-hook-form.com/
- **Zod:** https://zod.dev/

---

**Version:** 1.0
**Last Updated:** 2025-01-14
**Ready to Build!** 🚀
