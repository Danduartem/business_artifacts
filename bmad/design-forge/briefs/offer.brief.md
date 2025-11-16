# Offer Section Design Brief

**Source**: Adapted from `6_offer_section_guide.md`

---

## 1) Purpose & Psychological Goal

**Job**: Present the offer with crystal clarity and remove friction for conversion.

**Psychological Outcome**:
- "I know exactly what I'm getting" (clarity)
- "The value is obvious" (perceived value > price)
- "I understand the next steps" (process transparency)
- "This feels safe and trustworthy" (risk reversal)
- "I'm ready to commit" (conversion confidence)

**User Journey Moment**: Conversion decision point, final objection handling, purchase initiation

---

## 2) Structural Requirements

### Must-Have Elements:
- [ ] **Benefit-driven headline** (states promise: sell more, work fewer hours)
- [ ] **Short subheadline** (who it's for + what they get)
- [ ] **Value stack** (3-5 concise benefit bullets, outcomes > features)
- [ ] **Primary CTA** (action-oriented, e.g., "Reserve my seat")
- [ ] **Micro-assurance** under CTA (two-step flow explained)
- [ ] **Step 1 form** (name, email, essential fields only - CRM capture)
- [ ] **Urgency/scarcity** (tasteful: limited seats, early-bird deadline)
- [ ] **Social proof** (one compact element: rating, badge, short testimonial)
- [ ] **GDPR consent** + Privacy/Terms link
- [ ] **Optional**: Pricing (if shown), modules/agenda, refund/transfer policy

### Layout Priority (Eye Path: 1 → 2 → 3):
1. **Headline** (benefit-driven, clear promise)
2. **Value bullets/visual** (what they get)
3. **CTA** (visually distinct, reachable without hunting)

---

## 3) Content Strategy

### Message Framework:
- **Headline**: Promise-focused (transformation, not features)
- **Subheadline**: Context (who + what)
- **Optional micro-copy**: Outcome emphasis

### Value Stack (What They Get):
- 3-5 concise benefit bullets
- Focus on **outcomes** over features
- Optional icons for scanning (minimal, consistent)
- If modules/agenda: Keep scannable (short labels, not dense)

### Copy Tone:
- Clear, confident, reassuring
- Transparent about process
- No hype or false scarcity
- Empowering, not pushy

---

## 4) Pricing & Framing (If Shown)

### Pricing Display:
- Clear value framing (original vs now / or "what's included")
- If multiple tiers: Mark one as "Most popular" (avoid more than 3 tiers)
- Avoid dense tables; prefer elegant cards or simple list

### Value Communication:
- Show ROI or value comparison
- Break down what's included
- Emphasize investment vs cost

---

## 5) CTA & Two-Step Flow (Data → Payment)

### Primary CTA:
- **Label**: Action-oriented (e.g., "Reserve my seat", "Garantir minha vaga")
- **Micro-assurance** under button: "Step 1: save your spot. Step 2: payment."
- Clear indication of **Step 1** (short form) and **Step 2** (checkout)

### Secondary CTA (Optional):
- Low-friction (e.g., "Ask a question", "See details")
- Visually subordinate (doesn't compete)

### Form (Step 1: CRM Capture):
- **Only essential fields** (name, email, phone if truly needed)
- **Single column**, large touch targets, clear labels
- **Inline validation** and one clear submit action
- **Consent/GDPR checkbox** with concise wording (Portugal/EU compliant)
- **Success state** obvious (progress to payment or clear next steps)

---

## 6) Urgency & Scarcity (Tasteful)

### Effective Approaches:
- Simple, believable cues (e.g., "Limited seats" / "Early-bird ends DD/MM")
- Optional small countdown or seat indicator (non-intrusive)
- Urgency near CTA, not dominating layout

### What to Avoid:
- Fake scarcity or false urgency
- Aggressive countdowns (feels spammy)
- Anxiety-inducing tactics

---

## 7) Social Proof & Trust

### Proof Elements:
- **One compact element** near CTA
- Examples: Star-rating, badge, short testimonial
- Trust badges (secure checkout, venue credibility) kept subtle
- If full Social Proof section exists elsewhere, **keep minimal** here

### Trust Signals:
- Secure payment indicators
- Refund/transfer policy summary (short, reassuring)
- Venue/date/time clearly visible or one click away

---

## 8) Visual Guidelines

### Imagery & Aesthetics:
- One strong, relevant image (aspirational, in-room energy, location vibe)
- Image supports promise; doesn't compete with CTA
- Color palette follows style guide
- **CTA uses high-contrast accent** (stands out clearly)
- Elegant typography hierarchy (headline > subhead > bullets)
- No cramped lines

### Composition:
- Whitespace creates breathing room
- Clear visual hierarchy
- CTA unmistakable
- Form fields comfortable and inviting

---

## 9) Motion & Micro-Interactions

### Animation Approach:
- Subtle hover/press states on buttons (tactile feedback)
- Gentle reveal animations (fade/slide for bullets) with low intensity
- Avoid flashy effects; motion guides attention, not distracts

### Interactive States:
- Button hover: Slight elevation or color shift
- Form field focus: Clear border/shadow
- All states accessible and consistent

---

## 10) Typography & Color

### Type Hierarchy:
- **Headline**: Large, bold, benefit-focused
- **Subheadline**: Clear, supportive
- **Bullets**: Scannable, adequate spacing
- **Body text**: Minimum 16px, generous line height
- **CTA text**: Clear, readable, adequate letter-spacing

### Color Strategy:
- High contrast for text/background (WCAG AA+)
- Accent color for CTA (stands out)
- Trust elements subtle (not loud)
- Form fields clearly defined

---

## 11) Accessibility & Readability

### Non-Negotiables:
- Text/background contrast meets WCAG (aim AA+)
- Buttons have clear labels
- Form fields have visible labels (not placeholder-only)
- Keyboard navigable; focus states visible
- Screen reader friendly (semantic HTML, ARIA labels)

---

## 12) Mobile-First Checks

### Mobile Optimization:
- Stack order preserves eye path: **Headline → Benefits → CTA → Form**
- Sticky or repeated CTA if section is tall
- Touch targets ≥ 44px
- Inputs use correct keyboards (email, tel)
- Images responsive; no tiny text overlays
- Form comfortable to fill on mobile

---

## 13) Performance & Clarity

### Technical Requirements:
- Optimize images; avoid heavy video in offer block
- Keep copy succinct; remove non-essential words
- No competing CTAs or links that pull away from conversion
- Fast load time (critical for conversion)
- No layout shift (CLS ≈ 0)

---

## 14) Legal & Confidence

### Required Elements:
- GDPR consent + link to Privacy/Terms (clean, unobtrusive)
- Refund/transfer policy summarized (short, reassuring line if applicable)
- Venue/date/time clearly visible or one click away (reduce purchase anxiety)

---

## 15) Anti-Patterns (What NOT to Do)

❌ Overload with features (focus on benefits)
❌ Dense pricing tables
❌ Multiple competing CTAs
❌ Imagery overshadowing CTA
❌ Reduced text legibility
❌ Fake scarcity or aggressive countdowns
❌ Long, complex forms
❌ Hidden or unclear process (two-step flow must be transparent)
❌ No trust signals (increases anxiety)
❌ Poor mobile experience

---

## 16) Success Criteria (Pre-Launch QA)

✅ Visitor can answer: "What am I getting?" in 5 seconds
✅ CTA is unmistakable and action-oriented
✅ Two-step flow is transparent and reassuring
✅ Form is ultra-short and mobile-friendly
✅ Trust signals present but subtle
✅ Urgency is believable and not anxiety-inducing
✅ Mobile experience is comfortable
✅ All text is readable (contrast, size, spacing)
✅ Legal requirements met (GDPR, privacy, terms)

---

## 17) Analytics & Experimentation

### Track:
- Clicks on primary/secondary CTAs
- Form completion (Step-1 → Step-2)
- Form field abandonment
- Mobile vs desktop conversion
- Scroll depth to CTA

### A/B Test:
- Headline variation
- CTA copy
- Benefit order
- Micro-assurances
- Form field quantity
- Urgency messaging

---

## 18) Optional Blocks (Use Sparingly)

- [ ] Mini "What's Included" grid (icons + labels)
- [ ] Bonus/early-bird ribbon on card
- [ ] Tiny testimonial chip beside CTA (1-2 lines max)
- [ ] FAQ accordion (2-3 most common objections only)

---

## 19) Quick Do / Don't Summary

### Do:
- Lead with the promise
- Support with 3-5 benefits
- Make CTA unmistakable
- Use whitespace and contrast for effortless reading
- Keep Step-1 form ultra-short
- Reassure about two-step process
- Make urgency believable

### Don't:
- Feature dump
- Dense pricing tables
- Multiple competing CTAs
- Let imagery overshadow CTA
- Reduce text legibility
- Fake scarcity
- Create long, complex forms
- Hide the process
