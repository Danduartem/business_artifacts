# Premium Landing Page — Design Principles (System Rules)
*(Principles only. No brand tokens, no copy tone. See `style_guide.md` for tokens and `voice_tone.md` for copy rules. Audience specifics live in `avatar.md`.)*

## 1) Core Philosophy
- **Single Purpose:** One primary goal per page (convert, capture, book). Everything else supports it.
- **Restraint = Luxury:** Minimal elements, maximum intention. Edit aggressively.
- **Clarity Over Cleverness:** 5‑second skim must explain what/for whom/value.
- **Trust Before Push:** Evidence precedes CTA emphasis.
- **Consistency:** Components, spacing, and interactions follow the Style Guide.
- **Accessibility by Default (WCAG AA+):** Inclusive by design.
- **Speed Is Brand:** Performance is part of the premium feel.

## 2) Narrative & Strategy (Structure, not copy)
- **JTBD Alignment:** Page structure maps to the audience job (see `avatar.md`).
- **Promise → Mechanism → Proof → Offer:** Order of sections; copy tone defined in `voice_tone.md`.
- **Objection Mapping:** Top 5 objections resolved with sections/FAQ.
- **Scroll Story:** Each viewport earns the next; remove dead zones.
- **CTA Pathing:** One primary action repeated; one secondary “safety” path at most.

## 3) Visual System & Layout (Token‑Agnostic)
- **Grid:** 12‑column + consistent gutters; vertical rhythm.
- **Hierarchy:** Size/weight/spacing guide attention; accent color used sparingly.
- **Imagery:** Editorial‑grade; avoid generic stock.
- **Depth:** Subtle elevation for plane separation only.
- **Dividers:** Light rules/hairlines for structure without heaviness.
- **Density:** Fewer, larger elements with generous whitespace.

## 4) Interaction & Motion (Principles)
- **Micro‑interactions:** 150–250ms; ease‑in‑out; purpose = feedback.
- **States:** Hover/active/focus distinct and accessible.
- **Respect Reduced Motion:** Honor OS preference.
- **Sticky Helpers:** Only if clarity/conversion improves (e.g., mobile sticky CTA).

## 5) Forms & Conversion UX
- **Field Minimization:** Ask only what’s necessary; progressive disclosure for extras.
- **Two‑Step Option:** Qualifier → contact for higher completion.
- **Labels Always Visible:** No placeholder‑as‑label.
- **Inline Validation:** Specific, human errors.
- **Trust Microcopy:** Privacy/response time near CTA.
- **Thank‑You State:** Clear next step (calendar/download/onboarding).

## 6) Performance, SEO, Analytics (Principles)
- **Vitals Targets:** LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **Media Discipline:** Modern formats, responsive sizes, lazy‑load below fold.
- **Semantic Structure:** One H1; logical H2/H3; meaningful alt text.
- **Metadata & Schema:** Title/meta/OG; use relevant schema (FAQ/Organization/etc.).
- **Analytics Events:** `view_hero`, `click_cta_primary`, `form_start`, `form_submit`, `faq_toggle`, `exit_intent` (names only; implementation outside this file).

## 7) Governance
- **Design Debt Log:** Track compromises + scheduled refactors.
- **Reusable Blocks:** Versioned sections with clear variants.
- **Sources of Truth:** This file (principles) + `style_guide.md` (tokens) + component library + `voice_tone.md` + `avatar.md`.
