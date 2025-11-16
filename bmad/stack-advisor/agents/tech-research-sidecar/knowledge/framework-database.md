# Framework & Library Database

**Last Updated:** 2025-11-13
**Currency Threshold:** 1-month for recommendations
**Target:** SMB projects (small/medium business scale)

---

## Frontend Frameworks

### React
- **Latest Stable:** 18.3.1 (April 2024)
- **Release Frequency:** Major releases ~18 months, patches monthly
- **Status:** Production-ready, mature (10+ years)
- **Community:** Very active (220k+ GitHub stars)
- **SMB Fit:** Excellent - huge ecosystem, best hiring pool, component reusability
- **Learning Curve:** Medium
- **Notes:** React 19 RC available (Nov 2024) - not recommended for production yet
- **Use Cases:** SPAs, complex UIs, large applications
- **Avoid If:** Need SEO out of box (use Next.js instead)

### Vue.js
- **Latest Stable:** 3.4.38 (Oct 2024)
- **Release Frequency:** Minor releases monthly, patches weekly
- **Status:** Production-ready, mature (8+ years)
- **Community:** Active (207k+ GitHub stars)
- **SMB Fit:** Excellent - gentle learning curve, great DX, comprehensive docs
- **Learning Curve:** Low-Medium (easiest of the big 3)
- **Notes:** Vue 2 EOL Dec 2023 - migrate to Vue 3
- **Use Cases:** Progressive enhancement, rapid development, smaller teams
- **Avoid If:** Need huge ecosystem (React has more)

### Angular
- **Latest Stable:** 17.3.x (March 2024)
- **Release Frequency:** Major releases every 6 months
- **Status:** Production-ready, mature (Google-backed)
- **Community:** Active (94k+ GitHub stars)
- **SMB Fit:** Questionable - over-engineered for most SMB needs, steep learning curve
- **Learning Curve:** High (TypeScript, RxJS, opinionated)
- **Notes:** Best for enterprise with existing Angular investment
- **Use Cases:** Large enterprise applications, teams already familiar
- **Avoid If:** SMB greenfield project, small team, rapid development needed

### Svelte
- **Latest Stable:** 4.2.x (Oct 2024)
- **Release Frequency:** Minor releases quarterly, patches monthly
- **Status:** Production-ready, growing adoption
- **Community:** Active (76k+ GitHub stars)
- **SMB Fit:** Good - excellent DX, small bundle sizes, fast performance
- **Learning Curve:** Low (no virtual DOM, simpler mental model)
- **Notes:** Svelte 5 in RC (runes, signals) - releasing soon
- **Use Cases:** Performance-critical apps, smaller bundles, modern greenfield
- **Avoid If:** Need massive ecosystem or easy hiring

### Solid.js
- **Latest Stable:** 1.8.x (Oct 2024)
- **Release Frequency:** Minor releases quarterly
- **Status:** Production-ready, emerging
- **Community:** Growing (31k+ GitHub stars)
- **SMB Fit:** Fair - bleeding edge, small ecosystem, harder hiring
- **Learning Curve:** Medium (fine-grained reactivity)
- **Notes:** Excellent performance, React-like syntax
- **Use Cases:** Performance-critical, modern greenfield, small teams willing to bet on emerging tech
- **Avoid If:** Need mature ecosystem, conservative tech choices

---

## Meta-Frameworks (Full-stack React/Vue/Svelte)

### Next.js (React)
- **Latest Stable:** 14.2.x (April 2024)
- **Release Frequency:** Minor releases monthly
- **Status:** Production-ready, industry standard for React SSR
- **Community:** Very active (122k+ GitHub stars)
- **SMB Fit:** Excellent - SSR, SEO, great DX, Vercel backing
- **Learning Curve:** Medium (builds on React)
- **Notes:** App Router (RSC) is now stable, Pages Router still supported
- **Use Cases:** SEO-critical sites, content-heavy, e-commerce, SaaS
- **Avoid If:** Simple SPA with no SSR needs (use Vite + React)

### Remix
- **Latest Stable:** 2.x (Oct 2024)
- **Release Frequency:** Minor releases monthly
- **Status:** Production-ready (acquired by Shopify)
- **Community:** Active (28k+ GitHub stars)
- **SMB Fit:** Good - excellent DX, web standards focused
- **Learning Curve:** Medium
- **Notes:** Merging with React Router in future
- **Use Cases:** Progressive enhancement, forms-heavy apps, resilient UX
- **Avoid If:** Need static site generation

### Nuxt (Vue)
- **Latest Stable:** 3.x (Oct 2024)
- **Release Frequency:** Minor releases monthly
- **Status:** Production-ready
- **Community:** Active (52k+ GitHub stars)
- **SMB Fit:** Excellent - if using Vue, Nuxt is default choice for SSR
- **Learning Curve:** Medium (builds on Vue)
- **Notes:** Nuxt 3 fully stable, great developer experience
- **Use Cases:** Vue projects needing SSR, SEO, full-stack
- **Avoid If:** Don't need SSR (use Vite + Vue)

### SvelteKit
- **Latest Stable:** 2.x (Oct 2024)
- **Release Frequency:** Minor releases monthly
- **Status:** Production-ready (v1.0 Dec 2022)
- **Community:** Active (18k+ GitHub stars)
- **SMB Fit:** Good - excellent performance, modern DX
- **Learning Curve:** Low-Medium
- **Notes:** Official Svelte framework, replaces Sapper
- **Use Cases:** Svelte projects, performance-critical, modern stack
- **Avoid If:** Need mature ecosystem

### Astro
- **Latest Stable:** 4.x (Oct 2024)
- **Release Frequency:** Minor releases monthly
- **Status:** Production-ready
- **Community:** Active (43k+ GitHub stars)
- **SMB Fit:** Excellent for content sites - partial hydration, framework agnostic
- **Learning Curve:** Low
- **Notes:** Zero JS by default, bring your own framework for islands
- **Use Cases:** Content sites, blogs, marketing sites, documentation
- **Avoid If:** Need heavy client-side interactivity

---

## Backend Frameworks - Node.js

### Express.js
- **Latest Stable:** 4.19.x (March 2024)
- **Release Frequency:** Patches quarterly
- **Status:** Mature, stable (12+ years)
- **Community:** Active (64k+ GitHub stars)
- **SMB Fit:** Excellent - simple, proven, huge ecosystem
- **Learning Curve:** Low
- **Notes:** v5 in development for years, v4 still recommended
- **Use Cases:** REST APIs, simple backends, microservices
- **Avoid If:** Need opinionated structure (use NestJS)

### Fastify
- **Latest Stable:** 4.x (Oct 2024)
- **Release Frequency:** Minor releases quarterly
- **Status:** Production-ready, mature
- **Community:** Active (31k+ GitHub stars)
- **SMB Fit:** Excellent - faster than Express, modern, good DX
- **Learning Curve:** Low (similar to Express)
- **Notes:** 2-3x faster than Express in benchmarks
- **Use Cases:** Performance-critical APIs, modern Express alternative
- **Avoid If:** Need Express-specific middleware ecosystem

### NestJS
- **Latest Stable:** 10.x (July 2024)
- **Release Frequency:** Minor releases quarterly
- **Status:** Production-ready
- **Community:** Active (65k+ GitHub stars)
- **SMB Fit:** Fair - opinionated, Angular-inspired, over-engineered for many SMB needs
- **Learning Curve:** High (TypeScript, decorators, DI, modules)
- **Notes:** Great for teams from Angular/Java/C# backgrounds
- **Use Cases:** Large Node.js backends, teams needing structure
- **Avoid If:** Small team, simple API, rapid development

### Hono
- **Latest Stable:** 4.x (Oct 2024)
- **Release Frequency:** Minor releases monthly
- **Status:** Production-ready, emerging
- **Community:** Growing (17k+ GitHub stars)
- **SMB Fit:** Good - ultrafast, edge-first, modern
- **Learning Curve:** Low
- **Notes:** Works on Cloudflare Workers, Deno, Bun, Node.js
- **Use Cases:** Edge functions, serverless, performance-critical
- **Avoid If:** Need mature ecosystem, traditional server hosting

---

## Backend Frameworks - Python

### Django
- **Latest Stable:** 5.0.x (Dec 2023, LTS 4.2)
- **Release Frequency:** Major releases annually, LTS every 2-3 years
- **Status:** Mature, production-ready (18+ years)
- **Community:** Very active
- **SMB Fit:** Excellent - batteries included, admin panel, ORM
- **Learning Curve:** Medium
- **Notes:** LTS 4.2 supported until April 2026
- **Use Cases:** Content management, admin-heavy apps, rapid development
- **Avoid If:** Need microservices (monolithic by design)

### FastAPI
- **Latest Stable:** 0.109.x (Jan 2024)
- **Release Frequency:** Minor releases monthly
- **Status:** Production-ready, modern Python framework
- **Community:** Very active (72k+ GitHub stars)
- **SMB Fit:** Excellent - fast, modern, great DX, automatic docs
- **Learning Curve:** Low-Medium (Python + type hints)
- **Notes:** Based on Starlette and Pydantic
- **Use Cases:** REST APIs, microservices, ML APIs, modern Python backends
- **Avoid If:** Need admin panel out of box (use Django)

### Flask
- **Latest Stable:** 3.0.x (Sept 2023)
- **Release Frequency:** Minor releases annually
- **Status:** Mature, stable (13+ years)
- **Community:** Active (67k+ GitHub stars)
- **SMB Fit:** Good - lightweight, flexible, simple
- **Learning Curve:** Low
- **Notes:** Micro-framework, bring your own everything
- **Use Cases:** Small APIs, prototypes, microservices
- **Avoid If:** Need batteries included (use Django or FastAPI)

---

## Backend Frameworks - Ruby

### Ruby on Rails
- **Latest Stable:** 7.1.x (Oct 2023)
- **Release Frequency:** Major releases ~18 months
- **Status:** Mature, production-ready (19+ years)
- **Community:** Active
- **SMB Fit:** Excellent - convention over configuration, rapid development
- **Learning Curve:** Medium
- **Notes:** Hotwire for modern UX without much JS
- **Use Cases:** Rapid MVP development, CRUD-heavy apps, startups
- **Avoid If:** Performance-critical (slower than Go/Rust), small Ruby hiring pool

---

## Backend Frameworks - Go

### Gin / Fiber / Echo
- **Latest Stable:** Gin 1.9.x, Fiber 2.52.x (Oct 2024)
- **Status:** Production-ready
- **Community:** Active (Gin: 76k stars, Fiber: 32k stars)
- **SMB Fit:** Good - high performance, compiled, good for microservices
- **Learning Curve:** Medium (need to learn Go)
- **Notes:** Go ecosystem less mature than Node.js/Python
- **Use Cases:** High-performance APIs, microservices, system tools
- **Avoid If:** Need rapid development, small team unfamiliar with Go

---

## Databases - Relational

### PostgreSQL
- **Latest Stable:** 16.1 (Nov 2023)
- **Release Frequency:** Major releases annually
- **Status:** Production-ready, mature (28+ years)
- **Community:** Very active
- **SMB Fit:** Excellent - powerful, reliable, JSON support, extensions
- **Learning Curve:** Medium (SQL + PostgreSQL-specific features)
- **Notes:** Most feature-rich open-source RDBMS
- **Use Cases:** Default choice for most projects, complex queries, JSONB
- **Avoid If:** Need simplicity (use SQLite for small projects)

### MySQL / MariaDB
- **Latest Stable:** MySQL 8.2 / MariaDB 11.2 (Oct 2024)
- **Release Frequency:** Minor releases quarterly
- **Status:** Production-ready, mature (MySQL: 28+ years)
- **Community:** Active
- **SMB Fit:** Excellent - proven, widespread, good hosting support
- **Learning Curve:** Low-Medium
- **Notes:** MariaDB is MySQL fork with additional features
- **Use Cases:** Traditional web apps, WordPress, wide hosting compatibility
- **Avoid If:** Need advanced features (PostgreSQL better)

### SQLite
- **Latest Stable:** 3.44.x (Nov 2023)
- **Release Frequency:** Patches monthly
- **Status:** Production-ready, ultra-mature (23+ years)
- **Community:** Active (maintained by core team)
- **SMB Fit:** Excellent for small projects - zero-config, embedded
- **Learning Curve:** Low
- **Notes:** Most deployed database in world
- **Use Cases:** Small apps, embedded, mobile, local-first, prototypes
- **Avoid If:** High concurrency writes, multi-GB datasets, distributed systems

---

## Databases - NoSQL

### MongoDB
- **Latest Stable:** 7.0.x (Aug 2023)
- **Release Frequency:** Major releases annually
- **Status:** Production-ready, mature
- **Community:** Active
- **SMB Fit:** Good - flexible schema, JSON-native, good for prototypes
- **Learning Curve:** Low (no schema design upfront)
- **Notes:** Free tier on MongoDB Atlas
- **Use Cases:** Rapid prototyping, document-heavy, flexible schema needs
- **Avoid If:** Need complex queries, transactions, relational data

### Redis
- **Latest Stable:** 7.2.x (Aug 2023)
- **Release Frequency:** Minor releases quarterly
- **Status:** Production-ready, mature
- **Community:** Very active
- **SMB Fit:** Excellent for caching - in-memory, fast, simple
- **Learning Curve:** Low
- **Notes:** Not a primary database, use for caching/sessions/queues
- **Use Cases:** Caching, session storage, pub/sub, rate limiting
- **Avoid If:** Primary database needs (use PostgreSQL/MySQL)

---

## Backend-as-a-Service (BaaS)

### Supabase
- **Latest:** Continuous deployment
- **Status:** Production-ready
- **Community:** Very active (68k+ GitHub stars)
- **SMB Fit:** Excellent - PostgreSQL + auth + storage + realtime
- **Learning Curve:** Low
- **Notes:** Open-source Firebase alternative
- **Use Cases:** Rapid development, auth needs, realtime, PostgreSQL preference
- **Avoid If:** Need custom backend logic (add functions)

### Firebase
- **Latest:** Continuous deployment (Google)
- **Status:** Production-ready, mature
- **Community:** Very active (Google-backed)
- **SMB Fit:** Good - quick setup, realtime, generous free tier
- **Learning Curve:** Low
- **Notes:** NoSQL (Firestore), vendor lock-in concern
- **Use Cases:** Rapid prototyping, mobile apps, realtime apps
- **Avoid If:** Need relational data, avoid vendor lock-in

### Appwrite
- **Latest:** 1.5.x (Oct 2024)
- **Status:** Production-ready
- **Community:** Active (42k+ GitHub stars)
- **SMB Fit:** Good - self-hosted alternative to Firebase
- **Learning Curve:** Low-Medium
- **Notes:** Open-source, can self-host
- **Use Cases:** Firebase alternative, self-hosting preference
- **Avoid If:** Don't want to manage infrastructure

---

## UI Component Libraries (React)

### Material-UI (MUI)
- **Latest Stable:** 5.14.x (Oct 2023)
- **Status:** Production-ready, mature
- **Community:** Very active (92k+ GitHub stars)
- **SMB Fit:** Excellent - comprehensive, customizable, Material Design
- **Learning Curve:** Medium
- **Use Cases:** Admin panels, dashboards, Material Design apps
- **Avoid If:** Want lightweight (large bundle), different design language

### Chakra UI
- **Latest Stable:** 2.8.x (Sept 2023)
- **Status:** Production-ready
- **Community:** Active (37k+ GitHub stars)
- **SMB Fit:** Excellent - accessible, good DX, composable
- **Learning Curve:** Low
- **Use Cases:** Modern apps, accessibility-first, rapid UI development
- **Avoid If:** Need specific design system

### shadcn/ui
- **Latest:** Continuous updates (copy-paste components)
- **Status:** Production-ready
- **Community:** Viral growth (52k+ GitHub stars)
- **SMB Fit:** Excellent - modern, Tailwind-based, own the code
- **Learning Curve:** Low (if know Tailwind)
- **Notes:** Not an npm package - copy components you need
- **Use Cases:** Modern apps, Tailwind projects, full control over components
- **Avoid If:** Don't use Tailwind

### Ant Design
- **Latest Stable:** 5.x (Oct 2024)
- **Status:** Production-ready, mature
- **Community:** Active (90k+ GitHub stars)
- **SMB Fit:** Good - enterprise-grade, comprehensive
- **Learning Curve:** Medium
- **Notes:** Chinese company, extensive components
- **Use Cases:** Admin panels, data-heavy dashboards, enterprise apps
- **Avoid If:** Want lightweight, different aesthetic

---

## CSS Frameworks

### Tailwind CSS
- **Latest Stable:** 3.4.x (Jan 2024)
- **Release Frequency:** Minor releases quarterly
- **Status:** Production-ready, industry standard
- **Community:** Very active (79k+ GitHub stars)
- **SMB Fit:** Excellent - utility-first, rapid development, small production builds
- **Learning Curve:** Low-Medium (different paradigm)
- **Use Cases:** Modern web apps, rapid UI, responsive design
- **Avoid If:** Prefer traditional CSS, semantic class names

### Bootstrap
- **Latest Stable:** 5.3.x (May 2023)
- **Release Frequency:** Minor releases annually
- **Status:** Mature, stable (12+ years)
- **Community:** Active (168k+ GitHub stars)
- **SMB Fit:** Good - familiar, comprehensive, responsive
- **Learning Curve:** Low
- **Notes:** jQuery dependency removed in v5
- **Use Cases:** Traditional websites, rapid prototyping, familiarity
- **Avoid If:** Want modern aesthetic (dated look), customization

---

## State Management (React)

### Zustand
- **Latest Stable:** 4.4.x (Aug 2023)
- **Status:** Production-ready
- **Community:** Active (44k+ GitHub stars)
- **SMB Fit:** Excellent - simple, minimal boilerplate, small bundle
- **Learning Curve:** Low
- **Use Cases:** Modern React apps, simple state needs
- **Avoid If:** Need Redux DevTools integration (though supported)

### Redux Toolkit
- **Latest Stable:** 2.0.x (Nov 2023)
- **Status:** Production-ready, official Redux approach
- **Community:** Very active
- **SMB Fit:** Good - opinionated Redux, less boilerplate than old Redux
- **Learning Curve:** Medium
- **Use Cases:** Complex state, time-travel debugging, Redux ecosystem
- **Avoid If:** Simple state needs (use Zustand/Context)

### Jotai
- **Latest Stable:** 2.6.x (Nov 2024)
- **Status:** Production-ready
- **Community:** Active (17k+ GitHub stars)
- **SMB Fit:** Good - atomic state, bottom-up approach
- **Learning Curve:** Low-Medium
- **Use Cases:** Complex derived state, React Suspense integration
- **Avoid If:** Need simple solution (use Zustand)

### Context API (React built-in)
- **Status:** Built into React
- **SMB Fit:** Excellent for simple state - no dependencies
- **Learning Curve:** Low
- **Use Cases:** Simple state, theming, auth context
- **Avoid If:** Complex state, performance-critical updates

---

## State Management (Vue)

### Pinia
- **Latest Stable:** 2.1.x (June 2023)
- **Status:** Production-ready, official Vue state management
- **Community:** Active (12k+ GitHub stars)
- **SMB Fit:** Excellent - official replacement for Vuex, simpler API
- **Learning Curve:** Low
- **Use Cases:** Vue 3 projects, modern state management
- **Avoid If:** Still on Vue 2 (use Vuex)

---

## Testing Frameworks

### Vitest
- **Latest Stable:** 1.0.x (Dec 2023)
- **Status:** Production-ready
- **Community:** Active (12k+ GitHub stars)
- **SMB Fit:** Excellent - fast, Vite-native, Jest-compatible API
- **Learning Curve:** Low (if know Jest)
- **Use Cases:** Vite projects, unit/integration tests, modern test runner
- **Avoid If:** Not using Vite (use Jest)

### Jest
- **Latest Stable:** 29.7.x (Sept 2023)
- **Status:** Mature, stable
- **Community:** Active (43k+ GitHub stars)
- **SMB Fit:** Excellent - industry standard, comprehensive
- **Learning Curve:** Low-Medium
- **Use Cases:** React projects, established projects, comprehensive testing
- **Avoid If:** Using Vite (use Vitest instead)

### Playwright
- **Latest Stable:** 1.40.x (Nov 2023)
- **Status:** Production-ready
- **Community:** Very active (62k+ GitHub stars, Microsoft)
- **SMB Fit:** Excellent - cross-browser, reliable, modern E2E
- **Learning Curve:** Low-Medium
- **Use Cases:** E2E testing, cross-browser testing, modern test automation
- **Avoid If:** Simple E2E needs (Cypress might be easier)

### Cypress
- **Latest Stable:** 13.6.x (Nov 2023)
- **Status:** Production-ready, mature
- **Community:** Active (46k+ GitHub stars)
- **SMB Fit:** Good - easy to use, great DX, visual debugging
- **Learning Curve:** Low
- **Use Cases:** E2E testing, developer-friendly tests
- **Avoid If:** Need multi-browser (Chrome-focused), flaky in CI/CD

---

## Build Tools

### Vite
- **Latest Stable:** 5.0.x (Nov 2023)
- **Status:** Production-ready, industry standard for new projects
- **Community:** Very active (65k+ GitHub stars)
- **SMB Fit:** Excellent - fast, modern, excellent DX
- **Learning Curve:** Low
- **Use Cases:** Modern frontend projects (React, Vue, Svelte), default choice
- **Avoid If:** Legacy project with Webpack config

### Webpack
- **Latest Stable:** 5.89.x (Oct 2023)
- **Status:** Mature, stable
- **Community:** Active (64k+ GitHub stars)
- **SMB Fit:** Fair - powerful but complex, being replaced by Vite
- **Learning Curve:** High (complex configuration)
- **Use Cases:** Legacy projects, complex build needs, existing Webpack setup
- **Avoid If:** Starting new project (use Vite)

### esbuild
- **Latest Stable:** 0.19.x (Oct 2023)
- **Status:** Production-ready
- **Community:** Active (37k+ GitHub stars)
- **SMB Fit:** Good - extremely fast bundler
- **Learning Curve:** Low-Medium
- **Use Cases:** Build step for libraries, Vite's dependency pre-bundling
- **Avoid If:** Need full build tool (Vite uses esbuild under hood)

### Turbopack
- **Latest:** Alpha (part of Next.js)
- **Status:** Not production-ready yet
- **Community:** Growing (Vercel-backed)
- **SMB Fit:** N/A - wait for stable release
- **Notes:** Rust-based, will replace Webpack in Next.js
- **Avoid:** Not ready for production (use Vite or Webpack)

---

## Package Managers

### npm
- **Latest Stable:** 10.x (Oct 2023, bundled with Node.js)
- **Status:** Default, mature
- **SMB Fit:** Excellent - default choice, universal
- **Learning Curve:** Low
- **Use Cases:** Any Node.js project, default choice
- **Avoid If:** Want faster installs (use pnpm)

### pnpm
- **Latest Stable:** 8.x (Oct 2023)
- **Status:** Production-ready
- **SMB Fit:** Excellent - faster, disk-efficient, strict
- **Learning Curve:** Low (mostly compatible with npm)
- **Use Cases:** Monorepos, large projects, faster CI/CD
- **Avoid If:** Need maximum compatibility (rare edge cases)

### Yarn
- **Latest Stable:** 4.x (Yarn Berry) / 1.x (Classic)
- **Status:** Mature
- **SMB Fit:** Fair - being replaced by pnpm
- **Learning Curve:** Low
- **Use Cases:** Legacy projects using Yarn
- **Avoid If:** Starting new project (use npm or pnpm)

### Bun
- **Latest Stable:** 1.0.x (Sept 2023)
- **Status:** Production-ready but emerging
- **SMB Fit:** Fair - very fast but new, limited ecosystem
- **Learning Curve:** Low (mostly npm compatible)
- **Use Cases:** Performance-critical, early adopters
- **Avoid If:** Conservative tech choices, production-critical

---

## Hosting & Deployment

### Vercel
- **Status:** Production-ready, mature
- **SMB Fit:** Excellent - zero-config, great DX, Next.js native
- **Pricing:** Free tier → $20/month Pro → Enterprise
- **Use Cases:** Next.js, Vite, static sites, serverless functions
- **Avoid If:** Need full backend server (use Railway/Render)

### Netlify
- **Status:** Production-ready, mature
- **SMB Fit:** Excellent - JAMstack focus, great DX, generous free tier
- **Pricing:** Free tier → $19/month Pro
- **Use Cases:** Static sites, SPAs, serverless functions, JAMstack
- **Avoid If:** Need traditional server

### Railway
- **Status:** Production-ready
- **SMB Fit:** Excellent - simple, full-stack, database hosting
- **Pricing:** $5 usage credit/month → pay as you go
- **Use Cases:** Full-stack apps, databases, backend services
- **Avoid If:** Need advanced DevOps features

### Render
- **Status:** Production-ready
- **SMB Fit:** Excellent - Heroku alternative, simpler pricing
- **Pricing:** Free tier → $7/month basic
- **Use Cases:** Full-stack apps, APIs, databases, cron jobs
- **Avoid If:** Need complex infrastructure

### DigitalOcean
- **Status:** Production-ready, mature
- **SMB Fit:** Good - affordable, developer-friendly
- **Pricing:** $4/month droplets → managed services
- **Use Cases:** VPS, traditional hosting, control over infrastructure
- **Avoid If:** Want zero DevOps (use Vercel/Netlify)

### AWS / Azure / GCP
- **Status:** Production-ready, enterprise-grade
- **SMB Fit:** Poor - over-engineered, complex, expensive for SMB
- **Learning Curve:** Very High
- **Use Cases:** Enterprise scale, specific cloud service needs
- **Avoid If:** SMB project without dedicated DevOps (use alternatives above)

---

## Authentication Services

### Clerk
- **Status:** Production-ready
- **SMB Fit:** Excellent - beautiful UI, great DX, modern
- **Pricing:** Free tier (10k MAU) → $25/month Pro
- **Use Cases:** Modern SaaS, React/Next.js apps, beautiful auth UI
- **Avoid If:** Budget-constrained (Supabase cheaper at scale)

### Supabase Auth
- **Status:** Production-ready
- **SMB Fit:** Excellent - PostgreSQL-based, included with Supabase
- **Pricing:** Free tier → $25/month Pro
- **Use Cases:** Supabase projects, PostgreSQL preference, budget-friendly
- **Avoid If:** Need advanced auth features (Clerk better)

### Auth0
- **Status:** Production-ready, mature
- **SMB Fit:** Good but expensive - enterprise-grade
- **Pricing:** Free tier (7k users) → $35/month
- **Use Cases:** Enterprise requirements, compliance needs
- **Avoid If:** SMB budget (use Clerk or Supabase)

### Firebase Authentication
- **Status:** Production-ready, mature
- **SMB Fit:** Good - generous free tier, simple setup
- **Pricing:** Free tier → pay per use
- **Use Cases:** Firebase projects, mobile apps, rapid prototyping
- **Avoid If:** Want relational database (Firebase is NoSQL)

---

## Payment Processing

### Stripe
- **Status:** Production-ready, industry standard
- **SMB Fit:** Excellent - developer-friendly, comprehensive
- **Pricing:** 2.9% + 30¢ per transaction
- **Use Cases:** E-commerce, SaaS subscriptions, marketplaces
- **Avoid If:** High transaction volume needing lower fees

### PayPal
- **Status:** Production-ready, mature
- **SMB Fit:** Good - familiar to consumers, higher fees
- **Pricing:** 3.49% + 49¢ per transaction
- **Use Cases:** Consumer familiarity, international, alternative to credit cards
- **Avoid If:** Want best fees (Stripe cheaper)

### Paddle
- **Status:** Production-ready
- **SMB Fit:** Excellent for SaaS - merchant of record, handles VAT/sales tax
- **Pricing:** 5% + 50¢ per transaction (but includes taxes)
- **Use Cases:** SaaS products, international sales, tax simplification
- **Avoid If:** Low margins (higher fees than Stripe)

---

## Email Services

### SendGrid
- **Status:** Production-ready, mature
- **SMB Fit:** Good - reliable, generous free tier
- **Pricing:** Free (100/day) → $19.95/month (40k/month)
- **Use Cases:** Transactional emails, marketing emails
- **Avoid If:** Need simple SMTP (use Resend)

### Resend
- **Status:** Production-ready, emerging
- **SMB Fit:** Excellent - developer-first, React Email integration
- **Pricing:** Free (3k/month) → $20/month (50k/month)
- **Use Cases:** Transactional emails, React Email, modern API
- **Avoid If:** Need marketing email features

### Mailgun
- **Status:** Production-ready, mature
- **SMB Fit:** Good - reliable, fair pricing
- **Pricing:** Free trial → $35/month (50k emails)
- **Use Cases:** Transactional emails, flexible API
- **Avoid If:** Need simple setup (Resend easier)

---

## Monitoring & Error Tracking

### Sentry
- **Status:** Production-ready, industry standard
- **SMB Fit:** Excellent - free tier, comprehensive error tracking
- **Pricing:** Free tier → $26/month Team
- **Use Cases:** Error tracking, performance monitoring, release tracking
- **Avoid If:** None - should use Sentry

### LogRocket
- **Status:** Production-ready
- **SMB Fit:** Good - session replay, error tracking combined
- **Pricing:** Free tier → $99/month Team
- **Use Cases:** Debugging UX issues, session replay, performance
- **Avoid If:** Budget-constrained (expensive)

### Datadog / New Relic
- **Status:** Production-ready, enterprise
- **SMB Fit:** Poor - over-engineered, expensive for SMB
- **Use Cases:** Enterprise monitoring, complex infrastructure
- **Avoid If:** SMB project (use Sentry instead)

---

## Content Management Systems (CMS)

### Sanity
- **Status:** Production-ready
- **SMB Fit:** Excellent - structured content, great DX, real-time
- **Pricing:** Free tier → $99/month Growth
- **Use Cases:** Content-heavy sites, structured content, modern stack
- **Avoid If:** Need traditional CMS UI (use Strapi)

### Contentful
- **Status:** Production-ready, mature
- **SMB Fit:** Good but expensive
- **Pricing:** Free tier → $300/month Team
- **Use Cases:** Enterprise content management, multi-channel
- **Avoid If:** Budget-constrained (use Sanity)

### Strapi
- **Status:** Production-ready, open-source
- **SMB Fit:** Excellent - self-hosted, flexible, free
- **Pricing:** Free (self-hosted) → $99/month Cloud
- **Use Cases:** Custom content models, self-hosting, flexibility
- **Avoid If:** Don't want to manage CMS hosting

### WordPress
- **Status:** Mature, ubiquitous (powers 43% of web)
- **SMB Fit:** Excellent for content sites - huge ecosystem, easy hosting
- **Learning Curve:** Low
- **Use Cases:** Blogs, content sites, traditional websites, client sites
- **Avoid If:** Building modern SPA/SaaS (not designed for that)

---

**Notes:**
- Version numbers are current as of November 2025
- Always verify latest versions before recommendations
- SMB Fit considers: cost, complexity, hiring, ecosystem, maintenance burden
- Update this database monthly to maintain currency threshold
- For each recommendation, consider: team skills, project requirements, timeline, budget
