# FAQ Section Design Brief

**Source**: Adapted from `7_faq_section_guide.md`

---

## 1) Purpose & Psychological Goal

**Job**: Remove last objections right before final conversion action.

**Psychological Outcome**:
- "My concerns are addressed" (objection removal)
- "They anticipated my questions" (thoughtfulness, trust)
- "This feels safe to proceed" (risk reduction)
- "I have all the information I need" (confidence)

**User Journey Moment**: Pre-conversion objection handling, final barrier removal, confidence building

---

## 2) Structural Requirements

### Must-Have Elements:
- [ ] **Section eyebrow + headline** (e.g., "FAQ" / "Perguntas Frequentes")
- [ ] **Short preface line** (sets intent: "Tire suas dúvidas em 60s")
- [ ] **7-12 FAQ items** (focused, objection-driven)
- [ ] **Accordion interaction** (one level, clean)
- [ ] **Trust micro-row** (badge/testimonial/refund note)
- [ ] **Soft CTA anchor** to register/purchase

### Layout Priority (First → Second → Third):
1. **First**: Section eyebrow + headline (clear visual priority)
2. **Second**: Top 3 high-friction questions surfaced at top (price, time, guarantee/logistics)
3. **Third**: Trust micro-row and soft CTA anchor

---

## 3) Content Strategy (Objection-Driven)

### Message Framework:
- Write each FAQ to **neutralize a specific objection**
  - Time, value, logistics, risk, inclusivity
- Order questions by **likelihood + friction** (highest first)
- Keep answers **concise** (2-5 lines)
- Optional "Saiba mais" link if depth needed

### Copy Principles:
- **Plain, empathetic language** (PT-PT or appropriate localization)
- Avoid jargon; mirror audience wording
- If needed, group into **micro-categories**
  - Examples: Logística, Pagamento, Conteúdo, Resultados

### Top Priority Questions (Surface First):
1. **Pricing/Value**: "How much?" / "What's included?" / "Is it worth it?"
2. **Time/Commitment**: "How long?" / "When?" / "Can I attend if...?"
3. **Logistics**: "Where?" / "How do I get there?" / "What about parking?"
4. **Risk/Guarantee**: "What's the refund policy?" / "Can I transfer?"
5. **Inclusivity/Fit**: "Is this for me?" / "What level of experience?"

---

## 4) Role & Placement

### Positioning:
- Place FAQ **before the Final CTA** to remove objections where action happens
- Total FAQs: ≈ **7-12 items**
- More than 12 → collapse into categories

### Integration:
- Natural flow from offer/proof sections
- Bridge to final CTA
- Can include in-context micro-CTA after last 1-2 answers

---

## 5) Interaction Pattern

### Accordion Design:
- Clean **accordion** (one level)
- Click area is full question row
- Visible **affordance** (+/chevron) that rotates on open/close
- Smooth, **subtle** open/close animation (200-250ms)
- No "circus" effects
- Optional: Keep only **one question open** at a time (reduce cognitive load)

### Accessibility:
- Accordion uses **semantic buttons** with `aria-expanded`
- Keyboard support (Enter/Space to toggle, Tab to navigate)
- Focus ring **visible** and on-brand

---

## 6) Visual Composition

### Layout:
- One simple **column stack** on mobile
- Optional two-column on desktop **only** if scannability improves
- Generous **white space** between items (≥ 24-32px) for premium feel
- Use **dividers** (hairline) or soft cards to separate Q&As
- Never heavy boxes
- Maintain clear **left alignment** for fast scanning

### Visual Hierarchy:
- Questions visually dominant
- Answers subordinate but readable
- Clear open/closed states

---

## 7) Typography

### Type Treatment:
- **Questions**: Heading style (brand heading font, bold/semibold)
- **Answers**: Body font (brand), comfortable line height (1.6+)
- **Contrast**: WCAG-compliant; never rely on color alone for state
- Truncate long questions on mobile (2 lines) with ellipsis if needed

### Readability:
- Minimum 16px base size
- Sufficient color contrast
- Adequate spacing between items
- Short line lengths for answers (≈45-75 chars)

---

## 8) Color & Accents

### Color Strategy:
- **Background**: Neutral (brand light/white)
- **Accent color**: Section eyebrow, icons, hover/focus states (match style guide)
- **Subtle emphasis**: Bold or accent for key phrases in answers (e.g., "lugares limitados")
- Keep error-prone red/orange minimal
- Prefer **trusted accent** for positivity/reassurance

### Visual Elements:
- Consistent affordance indicators (+/chevron)
- Subtle hover/focus states
- No rainbow effects

---

## 9) Iconography & Micro-Visuals

### Icon Treatment:
- Use **single, consistent icon style** (line or duotone) for chevrons/markers
- Optional small **trust icons** (shield/lock/refund) inline with answers
  - Subtle, not loud
- Consider **soft decorative element** (very low-contrast motif) in section background

---

## 10) Trust & Risk Removal

### Essential Answers:
- [ ] **Refund/transfer policy**
- [ ] **Safety/security**
- [ ] **Payment methods**
- [ ] **Location/logistics** (bairro, acesso, transporte, duração)

### Proof Elements:
- **Micro-testimonial** or "Seen by ___ empreendedoras" line near end
- If seats limited: State **scarcity** clearly (and truthfully)

---

## 11) CTA Integration (Two-Step Flow)

### In-Context Micro-CTA:
- Add after last 1-2 answers: "**Reserve seu lugar**"
- Clarify **two-step**: 1) dados básicos → 2) pagamento seguro
- Provide **secondary inline link** inside high-intent answer
  - Example: "Como garantimos sua vaga?" includes CTA

### Primary CTA:
- Ensure **primary CTA button** visible **immediately after** FAQ block
- No friction between objection handling and conversion

---

## 12) Motion & States

### Animation Approach:
- Hover/focus states for question rows and icons (accessibility + feedback)
- **No parallax or flashy reveals**
- Keep transitions subtle and consistent
- Persist **open state** when navigating back (optional nice-to-have)

---

## 13) Accessibility

### Non-Negotiables:
- Accordion uses **semantic buttons** with `aria-expanded` and keyboard support
- Focus ring **visible** and on-brand
- Copy at least **16px** base size; sufficient color contrast
- Avoid conveying meaning by color alone; use icons/text labels

---

## 14) Mobile-First Responsiveness

### Mobile Optimization:
- Touch targets **≥ 44px** height
- Ample spacing between items
- Long answers collapse gracefully
- Scrolling within page is smooth
- Performance budget respected (no heavy images/scripts)

---

## 15) Performance & Hygiene

### Technical Requirements:
- Defer non-critical scripts; **CSS first paint** prioritized
- SVG icons inlined or sprite-based; minimal HTTP requests
- No layout shift on accordion open/close (reserve space or animate height smoothly)

---

## 16) Measurement & Iteration

### Analytics:
- Track **accordion opens** per question (which objections matter most)
- A/B test **question order**, **CTA placement**, **micro-copy** in top 3 FAQs
- Monitor drop-off from FAQ → CTA
- Iterate on final **handoff sentence** and button label

---

## 17) Anti-Patterns (What NOT to Do)

❌ Too many FAQs (creates overwhelm)
❌ Dense, paragraph-length answers
❌ Vague or unhelpful answers
❌ Fake questions (not real objections)
❌ Competing CTAs throughout FAQ
❌ Heavy boxes or loud styling
❌ Multiple accordion levels (keep flat)
❌ Jargon or complex language
❌ Poor mobile experience (small tap targets, cramped)
❌ No clear path to CTA after FAQ

---

## 18) Success Criteria (Ready-to-Ship Preflight)

✅ All FAQs map to **real objections**; fluff removed
✅ Visual priority: headline → top questions → trust cue → CTA is **obvious**
✅ Copy localized appropriately, tone is warm, direct, supportive
✅ Accordion is accessible, responsive, and pleasantly **minimal**
✅ Primary CTA after FAQ reiterates **two-step flow** clearly
✅ Top 3 questions address highest-friction objections
✅ Answers are concise (2-5 lines max)
✅ Trust signals present but subtle

---

## 19) Question Categories (Common Patterns)

### Logística:
- Where is it? How do I get there? Parking?
- What time does it start/end?
- What should I bring?

### Pagamento:
- How much does it cost?
- What payment methods accepted?
- Can I get a refund?
- Is there a payment plan?

### Conteúdo:
- What will we cover?
- What level is this for?
- Will there be recordings?
- What materials do I get?

### Resultados:
- What results can I expect?
- How long until I see results?
- Is this proven?

### Adequação (Fit):
- Is this for me?
- What if I'm [beginner/advanced]?
- Do I need prior experience?

---

## 20) Preface Line Examples

- "Tire suas dúvidas em 60 segundos"
- "Common questions answered"
- "Everything you need to know"
- "Quick answers to help you decide"
