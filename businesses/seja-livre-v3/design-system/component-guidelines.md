# Component Guidelines

> **Seja Livre Design System**
> "Empreenda com leveza, cresca com liberdade"

This document specifies the component library for the Seja Livre brand. Every component embodies the core duality: **RATIONAL (Navy)** meets **EMOTIONAL (Burgundy)**, with **FREEDOM (Gold)** as the transformation catalyst.

---

## Design Principles Applied to Components

| Principle | Component Application |
|-----------|----------------------|
| **Leveza com Substancia** | Generous padding, subtle shadows, breathing room between elements |
| **Provocacao Visual** | Primary CTAs challenge, secondary CTAs comfort |
| **Transformacao Progressiva** | Navy (start) -> Burgundy (engage) -> Gold (achieve) |
| **Autoridade Acessivel** | Century Gothic headlines convey authority; Lora body text warms |
| **Convite, Nao Pressao** | Button text invites ("VAMOS?"), never demands ("BUY NOW") |
| **Sementes em Movimento** | Gentle hover lifts, smooth transitions (200ms ease-out) |
| **Espaco para Respirar** | Whitespace as intentional design element |

---

## 1. Buttons

Buttons are invitations, not commands. They should feel like a friend extending a warm hand.

### 1.1 Variants

| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| **Primary** | `#191F3A` (navy-800) | `#F8F8FA` (neutral-50) | none | Main CTA - 1-2 per viewport max |
| **Secondary** | `#81171F` (burgundy-700) | `#F8F8FA` (neutral-50) | none | Emotional/transformation actions |
| **Accent** | `#E0B83D` (gold-500) | `#191F3A` (navy-800) | none | Celebration moments, special offers |
| **Ghost** | transparent | `#191F3A` (navy-800) | 1px `#DCDCE4` | Tertiary actions, filters |
| **Destructive** | `#D93830` (error) | `#FFFFFF` | none | Dangerous actions (use sparingly) |

### 1.2 Sizes

| Size | Height | Padding | Font Size | Icon Size | Min Width |
|------|--------|---------|-----------|-----------|-----------|
| **Small (sm)** | 44px | 10px 16px | 14px | 16px | 80px |
| **Medium (md)** | 44px | 12px 24px | 16px | 20px | 120px |
| **Large (lg)** | 48px | 16px 32px | 18px | 24px | 140px |
| **Extra Large (xl)** | 56px | 16px 32px | 20px | 24px | 160px |

### 1.3 States

| State | Primary | Secondary | Accent | Ghost |
|-------|---------|-----------|--------|-------|
| **Default** | `#191F3A` | `#81171F` | `#E0B83D` | transparent + border |
| **Hover** | `#363D62` + lift -1px | `#9E2A35` + lift -1px | `#C99B1F` + glow | `#F4F5FA` bg |
| **Active** | `#0D1022` + press | `#5E1118` + press | `#A67E15` + press | `#E8EAF4` bg |
| **Focus** | 2px ring `#F8F8FA`, 4px ring `#191F3A` | 2px ring `#F8F8FA`, 4px ring `#81171F` | 2px ring `#F8F8FA`, 4px ring `#E0B83D` | 2px ring `#F8F8FA`, 4px ring `#6A74A3` |
| **Disabled** | `#DCDCE4` bg, `#A5A5B5` text | `#DCDCE4` bg, `#A5A5B5` text | `#DCDCE4` bg, `#A5A5B5` text | `#ECECF0` border, `#A5A5B5` text |
| **Loading** | Navy bg + white spinner | Burgundy bg + white spinner | Gold bg + navy spinner | Transparent + navy spinner |

### 1.4 Specifications

```css
.btn {
  font-family: 'Century Gothic', 'CenturyGothic', sans-serif;
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: 8px;
  transition: all 200ms ease-out;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(50, 50, 62, 0.1);
}

.btn:active {
  transform: translateY(0);
}

.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #F8F8FA, 0 0 0 4px var(--focus-color);
}
```

### 1.5 Button Text Patterns (Microcopy)

| Context | Do | Don't |
|---------|-----|-------|
| Primary CTA | "VAMOS?", "Quero minha liberdade", "Comecar agora" | "Submit", "Buy now", "Clique aqui" |
| Secondary CTA | "Ver detalhes primeiro", "Conhecer o metodo" | "Learn more", "Saiba mais" |
| Confirmation | "Conta comigo", "Pode deixar" | "Confirm", "Confirmar" |
| Cancellation | "Agora nao", "Deixa pra depois" | "Cancel", "No" |
| Form Submit | "Enviar mensagem", "Falar com a Jucana" | "Submit", "Enviar" |

### 1.6 Usage Guidelines

**Do:**
- Use warm, inviting language that empowers
- Limit primary buttons to 1-2 per viewport
- Include loading states for async actions
- Use accent (gold) buttons for celebratory moments
- Provide adequate touch targets (48px recommended)

**Don't:**
- Use generic text like "Clique aqui" or "Submit"
- Disable buttons without explanation
- Stack multiple buttons of same hierarchy
- Use countdown timers or fake scarcity
- Use destructive styling for non-destructive actions

---

## 2. Form Inputs

Form fields should feel approachable and guide users gently. Labels are warm invitations to share.

### 2.1 Text Input Variants

| Type | Usage |
|------|-------|
| **Text** | General text entry |
| **Email** | Email addresses (with validation) |
| **Password** | Secure text with toggle visibility |
| **Tel** | Phone numbers |
| **Search** | Search queries with clear button |
| **Number** | Numeric input with increment/decrement |

### 2.2 Sizes

| Size | Height | Padding | Font Size | Label Size |
|------|--------|---------|-----------|------------|
| **Small (sm)** | 36px | 12px horizontal | 14px | 12px |
| **Medium (md)** | 44px | 16px horizontal | 16px | 14px |
| **Large (lg)** | 52px | 20px horizontal | 18px | 16px |

### 2.3 States

| State | Border | Background | Shadow |
|-------|--------|------------|--------|
| **Default** | 1px `#DCDCE4` | `#FFFFFF` | none |
| **Hover** | 1px `#B3B9D6` | `#FFFFFF` | none |
| **Focus** | 2px `#191F3A` | `#FFFFFF` | `0 0 0 3px rgba(25, 31, 58, 0.1)` |
| **Filled** | 1px `#C4C4D0` | `#FFFFFF` | none |
| **Disabled** | 1px `#DCDCE4` | `#ECECF0` | none |
| **Error** | 2px `#D93830` | `#FFFFFF` | `0 0 0 3px rgba(217, 56, 48, 0.1)` |
| **Success** | 2px `#2DA55D` | `#FFFFFF` | `0 0 0 3px rgba(45, 165, 93, 0.1)` |

### 2.4 Specifications

```css
.input {
  background: #FFFFFF;
  border: 1px solid #DCDCE4;
  border-radius: 8px;
  font-family: 'Lora', Georgia, serif;
  font-size: 16px;
  color: #1D1D26;
  transition: border-color 150ms ease-out, box-shadow 150ms ease-out;
}

.input::placeholder {
  color: #85859A;
}

.input-label {
  font-family: 'Century Gothic', 'CenturyGothic', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #1D1D26;
  margin-bottom: 6px;
}

.input-helper {
  font-size: 12px;
  color: #656578;
  margin-top: 4px;
}
```

### 2.5 Form Field Labels (Warm, Inviting)

| Field | Label | Helper Text |
|-------|-------|-------------|
| Name | "Como posso te chamar?" | - |
| Email | "Seu melhor e-mail" | "Prometo: so mando o que vale a pena" |
| Phone | "WhatsApp (se quiser)" | "Pra gente conversar mais rapido" |
| Message | "O que ta na sua cabeca?" | - |
| Challenge | "Qual sua maior dor hoje?" | "Isso me ajuda a te entender melhor" |
| Company | "Nome do seu negocio" | - |

### 2.6 Error Messages (Supportive, Never Blaming)

| Context | Do | Don't |
|---------|-----|-------|
| Email invalid | "Ops, esse e-mail nao chegou direito. Pode conferir?" | "Invalid email", "E-mail invalido" |
| Required field | "Preciso dessa informacao pra te ajudar melhor" | "Required field", "Campo obrigatorio" |
| Password weak | "A senha precisa de pelo menos 8 caracteres pra te proteger" | "Password too weak" |
| Password mismatch | "As senhas nao estao iguais ainda. Sem pressa!" | "Passwords don't match" |
| General invalid | "Algo nao ficou certo aqui. Vamos tentar de novo?" | "Invalid input" |

### 2.7 Success Messages (Warm, Grounded)

| Context | Do | Don't |
|---------|-----|-------|
| Form sent | "Recebi sua mensagem. Te respondo em ate 24h. Do meu coracao para o seu." | "Form submitted!" |
| Signup | "Bem-vinda! Voce acabou de dar o primeiro passo." | "Registration complete!" |
| Save | "Pronto! Suas alteracoes foram salvas." | "Saved successfully" |
| Payment | "VAMOS! Voce ta dentro. Olha seu e-mail." | "Payment approved" |

---

## 3. Cards

Cards are warm containers that invite exploration. They should feel like opening a friendly letter.

### 3.1 Variants

| Variant | Description | Usage |
|---------|-------------|-------|
| **Standard** | Basic content container | General content grouping |
| **Interactive** | Clickable with hover lift | Links to detail pages |
| **Media** | Prominent image/video at top | Blog posts, course modules |
| **Testimonial** | Quote with avatar | Social proof, success stories |
| **Pricing** | Plan/package presentation | Pricing pages |
| **Featured** | Accent border highlight | Premium content, recommendations |

### 3.2 Sizes

| Size | Padding | Border Radius | Shadow |
|------|---------|---------------|--------|
| **Small (sm)** | 16px | 8px | shadow-sm |
| **Medium (md)** | 24px | 12px | shadow-sm |
| **Large (lg)** | 32px | 16px | shadow-md |

### 3.3 States

| State | Transform | Shadow | Border |
|-------|-----------|--------|--------|
| **Default** | none | `0 1px 2px rgba(50, 50, 62, 0.05)` | 1px `#ECECF0` |
| **Hover** (interactive) | `translateY(-4px)` | `0 10px 15px rgba(50, 50, 62, 0.1)` | 1px `#DCDCE4` |
| **Active** | `translateY(-2px)` | `0 4px 6px rgba(50, 50, 62, 0.1)` | 1px `#DCDCE4` |
| **Focus** | none | `0 0 0 3px rgba(25, 31, 58, 0.1)` | 2px `#191F3A` |
| **Selected** | none | `0 4px 6px rgba(50, 50, 62, 0.1)` | 2px `#191F3A` |
| **Featured** | none | `0 1px 2px rgba(50, 50, 62, 0.05)` | 2px `#E0B83D` (gold accent) |

### 3.4 Specifications

```css
.card {
  background: #FFFFFF;
  border: 1px solid #ECECF0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(50, 50, 62, 0.05);
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}

.card-interactive:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px rgba(50, 50, 62, 0.1);
}

.card-featured {
  border: 2px solid #E0B83D;
}

.card-testimonial {
  background: #FDF5F5; /* secondary-50 for warmth */
}
```

### 3.5 Card Anatomy

```
+----------------------------------+
|  [Optional: Media/Image]         |
+----------------------------------+
|  [Optional: Badge/Tag]           |
|                                  |
|  HEADING (Century Gothic)        |
|                                  |
|  Body text in Lora serif that    |
|  feels warm and approachable.    |
|                                  |
|  [Optional: Actions/Buttons]     |
+----------------------------------+
```

### 3.6 Usage Guidelines

**Do:**
- Use consistent padding within card types
- Include clear visual hierarchy
- Use white background on cream (`#F8F8FA`) page background
- Add subtle hover lift for interactive cards

**Don't:**
- Nest cards within cards
- Make entire card clickable if it has multiple actions
- Use heavy shadows (keep them subtle and warm)
- Overcrowd with too much content

---

## 4. Typography Components

Typography conveys the brand duality: **Century Gothic** (authority) paired with **Lora** (warmth).

### 4.1 Heading Levels

| Level | Font | Size (Desktop) | Weight | Line Height | Color |
|-------|------|----------------|--------|-------------|-------|
| **H1** | Century Gothic | 3.815rem (61px) | 700 | 1.2 | `#191F3A` |
| **H2** | Century Gothic | 3.052rem (49px) | 700 | 1.2 | `#191F3A` |
| **H3** | Century Gothic | 2.441rem (39px) | 700 | 1.375 | `#191F3A` |
| **H4** | Century Gothic | 1.953rem (31px) | 600 | 1.375 | `#191F3A` |
| **H5** | Century Gothic | 1.5625rem (25px) | 600 | 1.375 | `#191F3A` |
| **H6** | Century Gothic | 1.25rem (20px) | 600 | 1.5 | `#191F3A` |

### 4.2 Body Text

| Type | Font | Size | Weight | Line Height | Color |
|------|------|------|--------|-------------|-------|
| **Body Large** | Lora | 1.25rem (20px) | 400 | 1.5 | `#4A4A5A` |
| **Body** | Lora | 1rem (16px) | 400 | 1.5 | `#4A4A5A` |
| **Body Small** | Lora | 0.875rem (14px) | 400 | 1.5 | `#4A4A5A` |
| **Caption** | Lora | 0.8rem (13px) | 400 | 1.5 | `#656578` |

### 4.3 Special Typography

| Type | Style | Color | Usage |
|------|-------|-------|-------|
| **Emphasis** | Lora Bold | `#81171F` (burgundy) | Emotional emphasis, key phrases |
| **Quote** | Lora Italic | `#81171F` (burgundy) | Testimonials, pull quotes |
| **Link** | Lora Regular + underline | `#4F5785` -> `#363D62` | Interactive text links |
| **Lead** | Lora | `#4A4A5A` | Intro paragraphs (larger size) |
| **Muted** | Lora | `#656578` | Secondary information |

### 4.4 Link Styles

```css
a {
  color: #4F5785; /* primary-600 */
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 100ms ease-out;
}

a:hover {
  color: #363D62; /* primary-700 */
}

a:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #F8F8FA, 0 0 0 4px #6A74A3;
  border-radius: 2px;
}
```

---

## 5. Navigation

Navigation guides users through their transformation journey. It should feel like a gentle hand showing the way.

### 5.1 Header/Navbar

| Property | Value |
|----------|-------|
| **Height** | 72px |
| **Background** | `#FFFFFF` (solid) or transparent (hero) |
| **Border** | 1px `#ECECF0` bottom |
| **Shadow (scrolled)** | `0 4px 6px rgba(50, 50, 62, 0.1)` |
| **Logo Height** | 40px |
| **Nav Item Gap** | 32px |
| **Font** | Century Gothic, 16px, 500 weight |
| **Z-index** | 100 |

### 5.2 Nav Item States

| State | Color | Decoration |
|-------|-------|------------|
| **Default** | `#656578` | none |
| **Hover** | `#191F3A` | none |
| **Active (current page)** | `#191F3A` | 600 weight or burgundy underline |
| **Focus** | `#191F3A` | focus ring |

### 5.3 Mobile Navigation

| Property | Value |
|----------|-------|
| **Breakpoint** | < 768px |
| **Panel Width** | 280px |
| **Panel Background** | `#FFFFFF` |
| **Slide Direction** | From right |
| **Animation** | 300ms ease-out (open), 200ms ease-in (close) |
| **Overlay** | `rgba(29, 29, 38, 0.6)` |
| **Item Height** | 48px |

### 5.4 Specifications

```css
.navbar {
  height: 72px;
  background: #FFFFFF;
  border-bottom: 1px solid #ECECF0;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: box-shadow 200ms ease-out;
}

.navbar--scrolled {
  box-shadow: 0 4px 6px rgba(50, 50, 62, 0.1);
}

.nav-item {
  font-family: 'Century Gothic', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #656578;
  transition: color 150ms ease-out;
}

.nav-item:hover,
.nav-item--active {
  color: #191F3A;
}

.mobile-menu {
  position: fixed;
  right: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: #FFFFFF;
  padding: 24px;
  transform: translateX(100%);
  transition: transform 300ms ease-out;
  z-index: 200;
}

.mobile-menu--open {
  transform: translateX(0);
}
```

---

## 6. Hero Sections

Hero sections are the first impression - they should challenge and invite simultaneously.

### 6.1 Structure

```
+-----------------------------------------------+
|  [Navigation Bar]                             |
+-----------------------------------------------+
|                                               |
|     PROVOCATIVE HEADLINE                      |
|     (Century Gothic, 4xl-6xl, Navy)           |
|                                               |
|     Supporting text that grounds              |
|     the provocation with empathy              |
|     (Lora, lg-xl, Neutral-700)                |
|                                               |
|     [ PRIMARY CTA ]  [ GHOST CTA ]            |
|                                               |
+-----------------------------------------------+
```

### 6.2 Background Options

| Type | CSS |
|------|-----|
| **Transformation Gradient** | `linear-gradient(135deg, #191F3A 0%, #81171F 100%)` |
| **Light/Minimal** | `#F8F8FA` (neutral-50) |
| **Sunrise (Full Journey)** | `linear-gradient(135deg, #191F3A 0%, #81171F 40%, #E0B83D 100%)` |
| **Image with Overlay** | Image + `rgba(25, 31, 58, 0.7)` overlay |

### 6.3 Specifications

```css
.hero {
  min-height: 80vh;
  padding: 96px 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-headline {
  font-family: 'Century Gothic', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4.768rem);
  font-weight: 700;
  line-height: 1.2;
  color: #191F3A; /* or #F8F8FA on dark bg */
  max-width: 800px;
}

.hero-subtext {
  font-family: 'Lora', serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.5;
  color: #4A4A5A; /* or #E8EAF4 on dark bg */
  max-width: 600px;
  margin-top: 24px;
}

.hero-cta-group {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}
```

### 6.4 Typography on Dark Backgrounds

| Element | Color |
|---------|-------|
| Headline | `#F8F8FA` (neutral-50) |
| Subtext | `#E8EAF4` (primary-100) |
| Muted | `#B3B9D6` (primary-300) |

---

## 7. Testimonials / Social Proof

Testimonials should feel like heartfelt recommendations from a trusted friend.

### 7.1 Testimonial Card Structure

```
+-----------------------------------------------+
|                                               |
|  "Quote text in Lora Italic.                  |
|   The transformation was incredible..."       |
|                                               |
|  [Avatar]  Name                               |
|            Role/Company                       |
|                                               |
+-----------------------------------------------+
```

### 7.2 Specifications

```css
.testimonial-card {
  background: #FDF5F5; /* secondary-50 - warm tint */
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid #81171F; /* burgundy accent */
}

.testimonial-quote {
  font-family: 'Lora', serif;
  font-style: italic;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #4A4A5A;
}

.testimonial-quote::before {
  content: '"';
  font-size: 3rem;
  color: #81171F;
  opacity: 0.3;
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #FFFFFF;
  box-shadow: 0 2px 4px rgba(50, 50, 62, 0.1);
}

.testimonial-name {
  font-family: 'Century Gothic', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #191F3A;
}

.testimonial-role {
  font-family: 'Lora', serif;
  font-size: 14px;
  color: #656578;
}
```

### 7.3 Variants

| Variant | Background | Accent |
|---------|------------|--------|
| **Default** | `#FDF5F5` (secondary-50) | Burgundy left border |
| **Highlighted** | `#FEF7E6` (warning-light/gold tint) | Gold left border |
| **Minimal** | `#FFFFFF` | Burgundy quote marks only |
| **Card** | `#FFFFFF` + shadow | Burgundy top border |

---

## 8. Footer

The footer is a warm goodbye - the last touchpoint before users leave.

### 8.1 Specifications

```css
.footer {
  background: #191F3A; /* navy-800 */
  padding: 48px 24px;
  color: #F8F8FA;
}

.footer-heading {
  font-family: 'Century Gothic', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #F8F8FA;
  margin-bottom: 16px;
}

.footer-link {
  font-family: 'Lora', serif;
  font-size: 14px;
  color: #B3B9D6; /* primary-300 */
  text-decoration: none;
  transition: color 150ms ease-out;
}

.footer-link:hover {
  color: #F8F8FA;
}

.footer-divider {
  border-color: #363D62; /* primary-700 */
}

.footer-copyright {
  font-size: 14px;
  color: #8E96BE; /* primary-400 */
}

.footer-signature {
  font-family: 'Lora', serif;
  font-style: italic;
  color: #F8F8FA;
}
```

### 8.2 Brand Elements

| Element | Content |
|---------|---------|
| **Signature Closing** | "Do meu coracao para o seu" |
| **Tagline** | "Empreenda com leveza, cresca com liberdade" |
| **Social Icons** | Instagram, LinkedIn, YouTube |

### 8.3 Footer Structure

```
+-----------------------------------------------+
|  [Logo]                                       |
|                                               |
|  Column 1      Column 2      Column 3         |
|  - Link        - Link        - Link           |
|  - Link        - Link        - Link           |
|  - Link        - Link        - Link           |
|                                               |
|  -------------------------------------------  |
|                                               |
|  [Social Icons]                               |
|                                               |
|  "Do meu coracao para o seu"                  |
|  (c) 2025 Seja Livre. Todos os direitos...    |
+-----------------------------------------------+
```

---

## 9. Modals / Dialogs

Modals interrupt flow - use sparingly. When used, they should feel like a personal conversation.

### 9.1 Sizes

| Size | Width | Max Height |
|------|-------|------------|
| **Small (sm)** | 400px | 80vh |
| **Medium (md)** | 560px | 85vh |
| **Large (lg)** | 720px | 90vh |
| **Extra Large (xl)** | 900px | 90vh |
| **Full** | calc(100vw - 48px) | calc(100vh - 48px) |

### 9.2 Specifications

```css
.modal-overlay {
  background: rgba(29, 29, 38, 0.6);
  backdrop-filter: blur(4px);
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.modal {
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(50, 50, 62, 0.25);
  max-width: 560px;
  width: calc(100% - 32px);
  max-height: 85vh;
  overflow-y: auto;
}

.modal-header {
  padding: 24px 24px 0;
  border-bottom: 1px solid #ECECF0;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 0 24px 24px;
  border-top: 1px solid #ECECF0;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #656578;
  transition: all 150ms ease-out;
}

.modal-close:hover {
  background: #F4F5FA;
  color: #191F3A;
}
```

### 9.3 Animation

```css
/* Overlay fade in */
@keyframes modal-overlay-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Content slide up and scale */
@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-overlay { animation: modal-overlay-enter 200ms ease-out; }
.modal { animation: modal-enter 300ms ease-out 50ms both; }
```

---

## 10. Alerts / Messages

Alerts should feel supportive, never alarming. They guide rather than blame.

### 10.1 Types

| Type | Background | Border | Icon Color | Text Color |
|------|------------|--------|------------|------------|
| **Success** | `#E8F7EE` | `#2DA55D` | `#2DA55D` | `#1A6B3A` |
| **Warning** | `#FEF7E6` | `#D4A017` | `#D4A017` | `#8B6914` |
| **Error** | `#FEF0EE` | `#D93830` | `#D93830` | `#8E2520` |
| **Info** | `#EEF2FD` | `#3B5ED9` | `#3B5ED9` | `#283D8E` |

### 10.2 Specifications

```css
.alert {
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-left: 4px solid;
}

.alert-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.alert-title {
  font-family: 'Century Gothic', sans-serif;
  font-weight: 600;
  font-size: 14px;
}

.alert-message {
  font-family: 'Lora', serif;
  font-size: 14px;
  line-height: 1.5;
}
```

### 10.3 Toast Notifications

```css
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  min-width: 300px;
  max-width: 400px;
  z-index: 1100;
}

/* Enter animation - floats up */
@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Exit animation - floats away */
@keyframes toast-exit {
  to {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
}
```

### 10.4 Alert Messages (Brand Voice)

| Type | Example Message |
|------|-----------------|
| **Success** | "Maravilha! Suas alteracoes foram salvas." |
| **Success** | "Perfeito! Mensagem enviada com sucesso." |
| **Warning** | "Ei, so um detalhe: sua sessao vai expirar em 5 minutos." |
| **Error** | "Hmm, algo nao deu certo. Vamos tentar de novo?" |
| **Error** | "Ops! Parece que houve um problema. Estamos trabalhando nisso." |
| **Info** | "Bom saber: voce pode editar isso a qualquer momento." |

---

## Loading States

Loading states should feel calm and unhurried - like dandelion seeds drifting.

### Loading Messages (Brand Voice)

| Context | Message |
|---------|---------|
| Page loading | "Preparando tudo pra voce..." |
| Form submitting | "Enviando com carinho..." |
| Processing | "Processando. Quase la..." |
| Data loading | "Buscando suas informacoes..." |

**Avoid:** "Aguarde...", "Carregando...", "Loading...", "Please wait..."

### Skeleton Loader

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #ECECF0 0%,
    #F8F8FA 50%,
    #ECECF0 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1800ms ease-in-out infinite;
  border-radius: 4px;
}

@keyframes skeleton-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Spinner

```css
.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #DCDCE4;
  border-top-color: #191F3A;
  border-radius: 50%;
  animation: spinner-rotate 1200ms linear infinite;
}

@keyframes spinner-rotate {
  to { transform: rotate(360deg); }
}
```

---

## Accessibility Requirements

### Focus States

All interactive elements must have visible focus states:

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #F8F8FA, 0 0 0 4px #6A74A3;
}
```

### Touch Targets

- **Minimum:** 44px x 44px
- **Recommended:** 48px x 48px
- **Spacing between targets:** 8px minimum

### Color Contrast

All text must meet WCAG AA (4.5:1 for normal text, 3:1 for large text):

| Pairing | Ratio | Level |
|---------|-------|-------|
| Navy-800 on white | 13.5:1 | AAA |
| Neutral-700 on neutral-50 | 8.2:1 | AAA |
| Burgundy-700 on white | 8.2:1 | AAA |
| Gold-500 on navy-800 | 8.5:1 | AAA |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Quick Reference

### Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-800` | `#191F3A` | Primary CTA, headings |
| `--color-secondary-700` | `#81171F` | Secondary CTA, emphasis |
| `--color-accent-500` | `#E0B83D` | Accent CTA, celebrations |
| `--color-neutral-50` | `#F8F8FA` | Page background |
| `--color-neutral-700` | `#4A4A5A` | Body text |

### Spacing Scale

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 64px |
| `--space-4xl` | 96px |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Chips, tags |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Modals |
| `--radius-full` | 9999px | Pills, avatars |

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(50, 50, 62, 0.05);
--shadow-md: 0 4px 6px rgba(50, 50, 62, 0.1);
--shadow-lg: 0 10px 15px rgba(50, 50, 62, 0.1);
--shadow-xl: 0 20px 25px rgba(50, 50, 62, 0.1);
```

### Transitions

```css
--duration-fast: 100ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in: cubic-bezier(0.7, 0, 0.84, 0);
--ease-emphasized: cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## Pre-Publishing Checklist

Before shipping any component:

- [ ] Does it sound like Jucana talking to an amiga empresaria?
- [ ] Does the design have room to breathe (leveza)?
- [ ] Does the interaction invite rather than pressure?
- [ ] Are we showing method over mystery?
- [ ] Would Carolina recognize her pain in the first 3 seconds?
- [ ] Is it free of em-dashes and guru language?
- [ ] Does it terminate with energy ("VAMOS?") or warmth ("Do meu coracao")?
- [ ] Does it meet WCAG AA accessibility standards?
- [ ] Does it respect reduced motion preferences?
- [ ] Are touch targets at least 44px?

---

*Component Guidelines v1.0*
*Generated by Component Specifier - Design System Forge*
*Brand: Seja Livre / Jucana Mentoria*
