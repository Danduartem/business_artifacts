# Form Experience Design Brief

**Source**: Custom – aligned with Hero / Offer / CTA briefs

---

## 1) Purpose & Psychological Goal

**Job**: Capture the right information with minimum friction, maximum clarity, and a feeling of security and professionalism.

**Psychological Outcome**:
- "This feels easy to fill out" (low friction)
- "I understand why they're asking this" (transparency)
- "My data is safe here" (trust)
- "It's worth the time I'm investing" (perceived value)

**User Journey Moment**: Critical action moment – lead capture, application, registration, seat reservation, pre-checkout, diagnostic. This is the **behavioral bottleneck** of the funnel.

---

## 2) Form Types & Use Cases (Scope)

The form system must support:

### 2.A) Simple Forms
- Newsletter / waitlist / VIP list
- Quick contact / "Talk to us"

### 2.B) Lead / Registration Forms
- Event registration
- Application for mentorship / exclusive groups
- Seat reservation for launches

### 2.C) Transactional Forms
- Step 1 of checkout (name, email, WhatsApp)
- Billing data collection (when necessary)

### 2.D) Diagnostic / Quiz Forms
- Screening questionnaires
- Self-diagnosis of stage / revenue / ticket
- Client intake for consulting

> Same principles apply – only **depth** and **order** of questions change.

---

## 3) Structural Requirements

### Must-Have Elements (for any important form):

- [ ] **Eyebrow / section label** (e.g., "Application", "Contact Details")
- [ ] **Headline** (benefit or context: why fill this out)
- [ ] **Expectation microcopy** (what happens after I submit)
- [ ] **Form container** (card or visually distinct block)
- [ ] **Fields with visible labels**
- [ ] **Primary action button** (clear CTA)
- [ ] **Security / privacy microcopy**
- [ ] **Error and success states** (clear, helpful)

### Optional Elements:

- [ ] Progress indicator (multi-step)
- [ ] Help text / hints per field
- [ ] "(optional)" marking when applicable
- [ ] Secondary actions (e.g., "Chat on WhatsApp")
- [ ] "Estimated time" badge (e.g., "takes less than 2 minutes")

### Layout Priority (Eye Path: 1 → 2 → 3):

1. **Headline & reason to fill out**
2. **Fields** (what I need to do)
3. **CTA + reassurance** (what happens when I click)

---

## 4) Field Strategy (Ask for Less, Get More)

### Principles:

- **Only ask what will be used in the next 14–30 days.**
- Each field needs an explicit reason:
  - If it won't be used in qualification, follow-up, or segmentation, remove it.
- Fields are grouped by "mental blocks":
  - Block 1: Basic identification (name, email, WhatsApp)
  - Block 2: Business / product (ticket, niche, revenue)
  - Block 3: Open / qualitative questions
  - Block 4: Investment / commitment confirmation

### Required vs Optional:

- Mark **(optional)** in the label, instead of filling everything with `*`.
- The more "sensitive" the data, the stronger needs to be:
  - The justification (helper text)
  - Or evidence of value + security.

---

## 5) Layout & Composition

### Desktop:

- Prefer **single column** for most forms (better focus).
- Two columns only for fields:
  - Short + related (First Name / Last Name, City / Country)
- Consistent vertical rhythm:
  - 24–32px between field groups
  - 16–24px between individual fields
- Form width:
  - ~480–640px reading width
  - Centered or well-anchored within page grid

### Mobile:

- Always **single column**, 100% width.
- Generous lateral padding (16–24px).
- Large buttons, comfortable for thumb.

---

## 6) Labeling & Microcopy

### Labels:

- Labels **always visible** above the field.
- Never rely only on placeholder to explain the field.
- Clear, short language:
  - "Full name"
  - "Work email"
  - "WhatsApp with country code"

### Helper Text:

Use for fields that might generate doubt:

- Explain **why** the field exists:
  - "We'll send the access link here."
- Specify format:
  - "Example: +351 912 345 678"
- Place right below label or field (not hidden).

### Errors:

- Very short, specific messages:
  - "Enter a valid email."
  - "This field is required to reserve your seat."

---

## 7) States (Default, Focus, Error, Success, Disabled)

For each field:

1. **Default**
   - Neutral border, soft background, readable text.
2. **Hover (desktop)**
   - Subtle change in border or background, no dramatics.
3. **Focus**
   - Stronger border/outline (brand accent color).
4. **Error**
   - Error color border + error message + icon (optional).
5. **Disabled / read-only**
   - Slightly reduced opacity, but text remains readable.

For the form as a whole:

- **Submitting**:
  - Button shows loading state ("Sending…", "Validating…")
  - Prevent multiple clicks.
- **Success**:
  - Clear confirmation message + next step
  - Optional: redirect with short delay (1–2s)

---

## 8) Validation & Error Handling (UX-First)

- Validate:
  - On submit attempt
  - And, when it makes sense, on blur (leaving field)
- Always keep what the user has typed.
- Take user to first error and focus the field.
- Avoid message stacks – **1 message per field** is sufficient.

Tone: never blame, always help.

---

## 9) Visual Guidelines (Premium Look)

### Form Container:

- Treat as a **premium card**:
  - Slightly rounded corners
  - Soft shadow or well-defined border
  - Generous internal padding (24–40px)
- Card stands out from background:
  - Page background can be solid or discrete gradient.
  - Form in neutral light or dark color (depending on theme).

### Fields:

- Consistent height (44–52px for single-line inputs).
- Comfortable horizontal internal padding.
- Background with light "tint" (gray/almost transparent) for depth.

### Buttons:

- Brand primary accent color.
- Strong contrast with background.
- On mobile, take full width (or almost).

---

## 10) Typography & Color

### Typography:

- Minimum text size:
  - 16px for labels and input text.
  - 14–15px for helper / error text.
- Labels in semi-bold / medium.
- Avoid ALL CAPS for long texts.

### Color:

- Maintain AA contrast:
  - Text vs background
  - Button vs background
- Color usage:
  - Neutrals (grays) for background/borders.
  - Brand accent for focus/CTA.
  - Alert color only for errors.

---

## 11) Motion & Micro-Interactions

- Short animations (150–250ms).
- Desirable effects:
  - Slight color/elevation change on button hover.
  - Smooth transition between focus states.
- Respect `prefers-reduced-motion`:
  - Disable non-essential animations for those who prefer.

Rule: animation **calm**, no carnival in application form.

---

## 12) Multi-Step Forms & Progress

Use multi-step forms when:

- You have **more than 7 fields**, or
- There are **different information blocks** (profile, business, goals).

Best practices:

- Each step addresses **a single theme**:
  - Step 1: Basic data
  - Step 2: Business / product
  - Step 3: Revenue / ticket
  - Step 4: Open questions / commitment
- Show progress:
  - "Step 2 of 4" or simple progress bar.
- First step **light**:
  - Easy fields → feeling of quick progress.
- Allow going back without losing data.

---

## 13) Mobile-First & Responsiveness

- 100% width inputs, with lateral padding.
- Minimum field and button height: 44px.
- Never require zoom to read or click.
- Ensure:
  - No horizontal scroll
  - Minimum distance between clickable buttons/fields

---

## 14) Accessibility (Non-Negotiables)

- Labels always connected to inputs (in design, this means clear, close labels).
- Don't rely only on color to indicate error:
  - Icon + text + color.
- Visible focus states for keyboard navigation.
- Objective error messages placed right below the field.

---

## 15) Trust, Security & Legal

Especially for EU / Brazil / sensitive data:

- Consent checkbox when:
  - Email will be used for ongoing marketing.
  - Data will be stored for future campaigns.
- Links near form:
  - Privacy Policy
  - Terms of Use
- Security microcopy:
  - "We hate spam too."
  - "You can unsubscribe anytime."

In investment/high-income context:
- Make clear if **application doesn't guarantee seat**.
- Reinforce selection process when it's an exclusive group.

---

## 16) Analytics & Measurement

Events to instrument:

- Form impression
- CTA click / start filling
- Fields with highest error rate
- Form abandonment (per step)
- Completion rate (per device)

Use this data to:

- Remove unnecessary fields
- Rewrite confusing labels
- Adjust question order
- Test multi-step vs single screen version

---

## 17) Anti-Patterns (What NOT to Do)

❌ Giant forms on a single screen without organization
❌ Labels hidden inside placeholder
❌ Asking irrelevant data "just in case"
❌ Small, close buttons on mobile
❌ Aggressive or generic error messages
❌ Resetting entire form on error
❌ Using many colors and shadows without hierarchy
❌ Weak contrast (light gray on light gray)
❌ Mixing many different CTAs in the same area

---

## 18) Success Criteria (Form Preflight Checklist)

Before publishing:

- [ ] Headline clearly explains **why** to fill the form.
- [ ] Fields reduced to **absolute minimum**.
- [ ] Labels are short, clear, and always visible.
- [ ] Errors and successes have defined, friendly messages.
- [ ] CTA is visually unmistakable and strong.
- [ ] Mobile version manually reviewed.
- [ ] Security / privacy / consent messages are visible.
- [ ] Typography and colors follow project style guide.
- [ ] You can fill the form in **60–90 seconds** without overthinking.
- [ ] Experience is consistent with premium positioning (tone, colors, visual calm).

---

## 19) Standard Form Patterns (Variants)

### 19.A) Hero Lead Form (Simple)

**Use:**
- Initial capture in Hero (waitlist, cold lead, quick signup).

**Characteristics:**
- 2–3 fields (Name, Email, WhatsApp).
- Direct CTA: "I want to join the list", "Reserve my spot".
- Microcopy below:
  - "We'll send next steps via email."

### 19.B) Application / Qualification Form (Deep)

**Use:**
- Application for mentorship, exclusive group, premium consulting.

**Characteristics:**
- Multi-step or one-question-at-a-time (see Section 20).
- Blocks:
  1. Identification
  2. Business/product
  3. Revenue / stage
  4. Niche / context
  5. Open questions ("Why you?", "What do you expect?")
  6. Investment confirmation (capacity + intention)

### 19.C) Pre-Checkout Form (Step 1)

**Use:**
- Before actual payment (Stripe, etc.), capture key data.

**Characteristics:**
- Minimum fields:
  - Name
  - Email
  - WhatsApp
- Microcopy reinforcing:
  - "Step 1: reserve your seat. Step 2: secure payment."

---

## 20) Conversational / One-Question-at-a-Time Variant

> **Typeform-like** pattern – as in the examples you sent: one question per screen, total focus, guided conversation feeling.

### 20.1 Objective

- Transform form into a **guided conversation**:
  - One question at a time.
  - Less anxiety.
  - Premium, personalized experience feeling.

Ideal for:

- High-qualification applications (traction groups, mastermind, mentorship).
- Diagnostics with multiple questions.
- Flows where the **process itself** already communicates value.

---

### 20.2 Structure of Each Screen

Each "step" has:

1. **Eyebrow (optional)**
   - E.g., "Basic info", "About your business", "Investment".
2. **Main question**
   - In spoken language, clear:
   - "Which option below best represents you?"
3. **Required indicator**
   - `*` aligned consistently (always same corner).
4. **Answer zone**
   - Text input (single or multi-line)
   **or**
   - List of options in buttons/cards (A, B, C…)
5. **Primary action**
   - "OK", "Continue" button or similar.
   - Keyboard shortcut: "Press Enter ⏎".

General layout:
- Full-screen background (brand color, e.g., deep blue).
- Content aligned to safe area (left or center).
- Lots of whitespace to breathe.

---

### 20.3 Question Types

1. **Short text**
   - Name, @Instagram, brief niche.
   - Placeholder: "Type your answer here…"
2. **Long text**
   - "Why should your application be accepted?"
   - Show hint: `Shift + Enter` for line break.
3. **Multiple choice (card-style buttons)**
   - One button per option:
     - Badge with letter (A, B, C…)
     - Text always in complete sentence.
   - States:
     - Normal: light border, solid background.
     - Hover: slight darkening.
     - Selected: more intense background + highlighted border + inverted badge.
4. **Scales / ranges**
   - Ticket (up to X, between X and Y, etc.).
   - Revenue (ranges of R$ 10k, 30k, 50k, 100k, 500k…).

---

### 20.4 Question Order (Flow)

Example for traction group / mentorship:

1. Full name
2. WhatsApp
3. Instagram @
4. Current situation (e.g., "Which option best represents you?")
5. Product ticket
6. Average monthly revenue
7. Operating niche
8. Current challenges (open text)
9. Expectation/desired results (open text)
10. Commitment question:
    - "Why do you think your application should be accepted?"
11. Investment capacity:
    - "The investment is X… Which option applies to you?"

Golden rule:
- Start **extremely easy**.
- Middle **diagnostic/structured**.
- End **reflective + financial**.

---

### 20.5 Progress & Motivation

- Show progress discreetly:
  - "Question 3 of 11"
  - Or thin bar at top.
- Occasional microcopy:
  - "Just 2 questions left."
  - "Thank you for answering honestly."

This reduces anxiety in long forms.

---

### 20.6 Validation & Errors in Conversational Flow

- Validate **on screen submission** (when they click OK or Enter).
- In case of error:
  - Stay on same question.
  - Show message right below field:
    - "Please select one of the options."
    - "Enter a valid WhatsApp number."
- Never erase what user has typed.

No modals, no page reload – everything should feel like continuous flow.

---

### 20.7 Motion & Transitions Between Questions

- Simple transition:
  - Light slide of old question out and new one in.
  - Or quick fade-in.
- Questions appear **in same screen position**:
  - Creates visual anchoring and reduces effort.

Always smooth animations:
- 150–250ms
- Standard easing curves (`ease-out`)

---

### 20.8 Mobile for One-Question-at-a-Time

- Each step takes **entire screen** without vertical scroll, if possible.
- Large inputs and buttons, easy to touch.
- CTA (OK/Continue) positioned near thumb area.
- Keep same colors/typography as desktop, but with even more focus on readability.

---

### 20.9 Consistency with Rest of System

Even being a "conversational" flow, it still needs to:

- Use the **brand's palette, typography, and tone of voice**.
- Align with:
  - Hero: promise and framing.
  - Offer: value and investment context.
  - FAQ: resistances and objections answered.

The result at end of filling should:
- Feel like a **natural step** in the page narrative.
- Reinforce premium positioning (exclusive group, limited seats, serious process).

---

## 21) Layout Patterns for Standard Forms

### Pattern A: Inline Hero Form
- Embedded in Hero section
- Horizontal layout (fields + button on same row)
- Desktop: 3-4 fields max
- Mobile: stacks vertically

### Pattern B: Sidebar Form Card
- Positioned alongside content
- Vertical card with padding
- Sticky behavior on scroll
- Works for lead gen + checkout

### Pattern C: Modal / Overlay Form
- Triggered by CTA
- Centered overlay with backdrop
- Close button prominent
- Focus trapped inside modal

### Pattern D: Full-Section Dedicated Form
- Own section on page
- Headline + form + reassurance
- Best for applications
- Ample whitespace

### Pattern E: Conversational Full-Screen
- One question at a time
- Full screen per question
- Progress indicator
- Premium experience

---

## 22) Form Container Variants

### Variant A: Elevated Card
- White/light background
- Soft shadow (0 4px 24px rgba)
- Rounded corners (8-16px)
- Padding 24-40px
- Floats above page

### Variant B: Inline Subtle
- Minimal container styling
- Light border or no border
- Blends with page
- Clean, modern feel

### Variant C: Dark Hero Form
- Dark background form
- Light text on dark
- High contrast CTA
- Premium, bold feeling

### Variant D: Gradient Container
- Subtle gradient background
- Brand colors
- Elevated feel
- Modern, premium

---

## 23) Button & CTA Styling

### Primary CTA:
- **Size**: 44-52px height minimum
- **Width**: Auto with padding (24-32px sides) or full-width on mobile
- **Typography**: 16-18px, semi-bold, clear letter-spacing
- **Color**: Brand accent, high contrast with background
- **States**:
  - Default: solid color
  - Hover: slight darken or elevate (2-4px shadow)
  - Active/Press: slightly depress effect
  - Loading: spinner + "Sending…" text
  - Disabled: reduced opacity (0.5-0.6)

### Secondary Actions:
- Text link or ghost button
- Below primary CTA
- Clear visual hierarchy (subordinate)
- Examples: "Contact via WhatsApp", "Have questions?"

---

## 24) Field Type Specifications

### Text Input (Single Line):
- Height: 44-52px
- Padding: 12-16px horizontal
- Border: 1-2px solid neutral
- Border radius: 4-8px
- Font size: 16px minimum
- Background: very light tint

### Text Area (Multi-Line):
- Min height: 120px
- Same padding as text input
- Resize: vertical only or none
- Clear indication it's multi-line

### Select / Dropdown:
- Same height as text input
- Custom styling or native (depends on brand)
- Clear arrow indicator
- Adequate click/touch area

### Radio Buttons:
- Large touch targets (24-32px)
- Clear visual states (default, checked)
- Label clickable
- Grouped with visible connection

### Checkboxes:
- Same size as radio buttons
- Clear checked state
- Used for consent/agreements
- Label clickable and adjacent

### File Upload:
- Clear "Choose file" or drag-drop area
- Show selected file name
- File type/size limits visible
- Progress indicator if uploading

---

## 25) Progressive Disclosure for Complex Forms

When form needs many fields:

### Technique A: Conditional Fields
- Show fields only when relevant
- E.g., "Other" option reveals text field
- Reduces visual overwhelm
- Smooth animation on reveal

### Technique B: Accordion Sections
- Group related fields
- Expand/collapse sections
- One section open at a time
- Progress saved on collapse

### Technique C: Wizard / Multi-Step
- Break into logical steps
- Clear progress indicator
- Back/Next navigation
- Save state between steps

---

## 26) Copy Formulas & Microcopy

### Form Headlines:
- **Benefit-driven**: "Reserve Your Seat for [Event Name]"
- **Action-oriented**: "Apply for [Program Name]"
- **Clarity-focused**: "Tell Us About Your Business"
- **Trust-building**: "Secure Your Spot (Step 1 of 2)"

### Helper Text Examples:
- "We'll use this to send your access link"
- "Your number format: +351 912 345 678"
- "This helps us match you with the right program"
- "We never share your information (Privacy Policy)"

### Error Messages:
- "Please enter a valid email address"
- "This field is required"
- "Phone number should include country code"
- "Password must be at least 8 characters"

### Success Messages:
- "✓ Application submitted! Check your email for next steps."
- "✓ Seat reserved! Redirecting to payment…"
- "✓ Thank you! We'll reach out within 24 hours."

### Security Reassurance:
- "🔒 Your data is encrypted and secure"
- "We hate spam as much as you do"
- "Unsubscribe anytime with one click"
- "Your privacy is our priority (Privacy Policy)"

---

## 27) Conversion Optimization Tactics

### Reduce Friction:
- Remove unnecessary fields (each field costs ~5-10% conversion)
- Use smart defaults when possible
- Auto-format inputs (phone, date, currency)
- Enable autofill/autocomplete

### Increase Clarity:
- Explain what happens after submit
- Show progress in multi-step
- Make required vs optional crystal clear
- Use examples in helper text

### Build Trust:
- Show security badges (if transactional)
- Include privacy policy link
- Add testimonial near form
- Display completion count ("Join 500+ founders")

### Create Urgency:
- Real scarcity ("Only 3 seats left")
- Time limit ("Early bird ends in 2 days")
- Show others filling ("5 people viewing")
- Limited bonus ("Submit by Friday for bonus")

---

## 28) Form Context Integration

Forms don't exist in isolation. They must integrate with:

### Before the Form:
- **Hero**: Sets promise and expectation
- **Problem**: Creates desire for solution
- **Solution**: Shows how it works
- **Offer**: Presents value and price

Form is the **conversion point** where all previous sections culminate.

### After the Form:
- **Success page**: Confirms submission, sets expectations
- **Email**: Immediate confirmation + next steps
- **Follow-up**: Nurture sequence or application review

### Form Placement Strategy:
- **Primary form**: In Offer section or dedicated section
- **Secondary forms**: After testimonials, in FAQ
- **Sticky form**: In sidebar or floating bar (use carefully)
- **Exit intent**: Last-chance popup (use sparingly)

---

## 29) A/B Testing Priorities

Test one element at a time:

### High-Impact Tests:
1. **Number of fields** (fewer vs more)
2. **Form headline** (benefit vs action-oriented)
3. **CTA copy** ("Submit" vs "Reserve My Seat")
4. **Single vs multi-step** (different completion rates)
5. **Field order** (easy-first vs demographic-first)

### Medium-Impact Tests:
- Button color and size
- Required vs optional field marking
- Helper text presence/absence
- Progress indicator style
- Trust badge placement

### Low-Impact Tests:
- Border radius and shadows
- Label positioning (top vs left)
- Font size variations
- Animation presence

### Metrics to Track:
- Form impression rate
- Start rate (clicked into form)
- Field completion rate
- Error rate per field
- Abandonment per field
- Overall completion rate
- Time to complete
- Mobile vs desktop performance

---

## 30) Technical Considerations

### Frontend Requirements:
- Real-time validation
- Auto-save for long forms
- Keyboard navigation support
- Screen reader compatibility
- Touch-friendly on mobile
- Cross-browser testing
- Error state handling
- Success state handling
- Loading states

### Backend Requirements:
- Fast submission (< 500ms response)
- Data validation server-side
- Duplicate submission prevention
- Rate limiting (spam protection)
- Data encryption (in transit + at rest)
- GDPR/privacy compliance
- Error logging
- Submission tracking

### Integration Points:
- CRM/email platform
- Payment processor
- Analytics tools
- Marketing automation
- Calendar (for bookings)
- Notification systems

---

## Summary

This brief defines a form system that ranges from **simple Hero form** to **conversational premium application flow**, maintaining visual consistency, extreme clarity, and smooth experience – especially for female entrepreneurs in service businesses aged 30–50, who value care, seriousness, and beauty in the interface.

**Core Philosophy**: Every field must earn its place. Every word must reduce friction. Every visual choice must build trust. Forms are not obstacles – they are **guided conversations that feel like natural next steps** in the user's journey toward transformation.
