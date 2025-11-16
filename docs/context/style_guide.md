# Style Guide — Mentoria Brand Foundation
*(Core visual identity. See `design-principles.md` for behavior/UX patterns.)*

> These are the brand anchors, not rigid rules. Use the 60/30/10 philosophy: 60% neutrals for breathing room, 30% Navy for structure and trust, 10% Borgonha for conversion moments.

## 1) Color Philosophy

### Brand Core
**Navy (#191F3A)** — Authority, clarity, discipline
**Borgonha (#81171F)** — Action, commitment, transformation
**Gold Highlight (#C9A227)** — Achievement moments (use sparingly)

### Palette Available
```css
/* Navy scale: #F2F4F8 → #191F3A → #0D1426 (light to dark) */
/* Borgonha scale: #F9E9EB → #81171F → #390A0E */
/* Neutrals: #FFFFFF → #1E1E1E (white to near-black) */
```

Full tonal scales provided for flexibility — lighter tones for backgrounds/hover states, darker for emphasis. Build your own variants as needed.

### Semantic Colors
- **Success:** `#2E7D6D` on `#E6F3F0`
- **Warning:** `#B9821E` on `#FAF1DE`
- **Error:** `#C43842` on `#F9E7E9`

### Guidelines
- Keep buttons flat (no gradients) for clarity and performance
- Gradients are welcome in hero sections or as subtle transitions
- Always maintain WCAG AA contrast (4.5:1) for text and interactive elements
- Use Borgonha intentionally — it should draw the eye to conversion points

## 2) Typography

### Font Families
- **Headings:** `'Lora', serif` — For storytelling, transformation moments, emotional connection
- **Body:** `'CenturyGothic', sans-serif` — Clean, professional, scannable
- **Mono:** System default — Only if truly needed

### Hierarchy Philosophy
Build your own scale, but keep these principles:
- **Headlines (Lora)** should feel confident and transformational
- **Body (CenturyGothic)** should be comfortable to read, around 16px base
- **Generous line-height** (1.5–1.6) for body text to aid scanning
- **Weights:** Regular (400) for body, Semibold/Bold (600–700) for emphasis

### Usage Notes
- Lora brings warmth to success stories and value propositions
- CenturyGothic keeps UI elements and data points crisp
- Consider tabular figures for metrics to reinforce credibility
- Add slight letter-spacing to CTAs for clarity

## 3) Spacing & Layout

### Spacing Philosophy
- **Base unit:** 8px — Use multiples for visual harmony
- **Common rhythm:** 16px, 24px, 32px, 48px, 64px
- Think in proportional relationships, not exact measurements

### Layout Guidelines
- **Content width:** Around 1200px max for desktop, narrower for reading-heavy sections
- **Breathing room:** Give sections space to breathe — generous padding on mobile
- **Responsive:** Design mobile-first, enhance for larger screens
- **Grid:** 12 columns gives flexibility; use fewer columns for simpler layouts

### Practical Tips
- Keep body text under 65–75 characters per line for readability
- Section spacing should grow proportionally on larger screens
- Use consistent gutters in card grids for visual rhythm

## 4) Visual Details

### Border Radii
- **Subtle curves** (4–8px) for buttons and inputs — professional without being sterile
- **Gentle rounds** (8–12px) for cards — approachable but not playful
- Maintain consistency across components; avoid mixing sharp and very rounded styles

### Shadows & Elevation
- Use sparingly to establish hierarchy
- Subtle shadows for cards and hover states
- Stronger shadows for modals and critical UI that needs separation
- Avoid heavy drop shadows — keep it clean

### Borders
- 1px default for dividers and input fields
- 2px for focus rings (accessibility requirement)
- Light neutral borders; reduce opacity for subtle separators

## 5) Iconography & Imagery

### Icons

**CRITICAL: Never Use Emojis**
- ❌ Emojis are unprofessional and render inconsistently
- ❌ They break brand cohesion and accessibility
- ✅ Always use professional icon systems instead

**Preferred Icon Systems:**
1. **Lucide Icons** (minimal, consistent) - PRIMARY CHOICE
2. **Heroicons** (Tailwind's set) - SECONDARY
3. **Phosphor Icons** (elegant, versatile)
4. **Feather Icons** (ultra-clean)
5. **Custom SVG icons** (brand-aligned, designed in-house)

**Icon Requirements:**
- **Consistent style:** Choose ONE family and stick with it across entire project
- **Sizing:** 16–24px for UI, larger (32–48px) for feature highlights
- **Color:** Inherit from surrounding text, or use Navy for structure / Borgonha for actions
- Use custom SVG vectors only — never emojis or raster icons
- All icons must share the same stroke width and visual weight
- Designed on a 24×24 px grid, aligned to pixel grid
- Delivered as optimized SVG (via SVGO), styled through CSS/Tailwind `fill-current` and `stroke-current`
- Store in `/icons/` and import via inline SVG, sprite, or SVGR component

**Implementation:**
```html
<!-- Good: SVG icon from Lucide -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M20 6L9 17l-5-5"/>
</svg>

<!-- Bad: Emoji -->
<span>✅</span>
```

### Photography
- **Authentic and warm:** Real mentoring moments, workspaces, genuine expressions
- **Natural lighting:** Avoid overly staged or stock-feeling images
- **Navy/Borgonha overlays** work well for hero sections with text
- Keep backgrounds uncluttered when text overlays are needed

### Illustration (if used)
- Minimal line-art style
- Stick to brand palette
- Use for concepts that photos can't capture (process flows, abstract ideas)

## 6) Component Principles

### Buttons
- **Primary (Borgonha):** For main conversion actions — use sparingly per screen
- **Secondary (Navy tints):** For supporting actions
- **Ghost/Text:** For tertiary actions and navigation
- Ensure adequate padding for touch targets (44px+ on mobile)
- Include hover/focus states for feedback

### Forms
- Clear labels, visible focus rings
- Helpful error messages in semantic red
- Adequate spacing between fields
- Consider helper text for complex inputs

### Cards
- Consistent padding and shadows
- Hover states for interactive cards
- Clear hierarchy between card title, content, and actions

### Navigation
- Clear active/current page indicators
- Adequate touch targets on mobile
- Consider sticky nav for long pages

## 7) Motion & Interaction

### Animation Philosophy
- **Fast and purposeful** — 150–250ms for most transitions
- **Subtle feedback** — Hover states, focus rings, micro-interactions
- **Meaningful motion** — Use animation to guide attention, not distract
- Always respect `prefers-reduced-motion` for accessibility

### Common Patterns
- Fade-ins for appearing content
- Subtle slides for dropdowns and modals
- Gentle scale or shadow changes for hover states
- Avoid heavy animation on mobile (performance)

## 8) Accessibility Essentials

### Non-Negotiables
- **Focus indicators:** Always visible (2px ring, good contrast)
- **Color contrast:** WCAG AA minimum (4.5:1 for text)
- **Touch targets:** 44px+ on mobile for tappable elements
- **Semantic HTML:** Use proper elements (button, nav, header, etc.)
- **Alt text:** Describe meaningful images, use empty alt for decorative ones

### Brazilian Portuguese Localization
- Currency: R$ 1.500,00 format
- Dates: DD/MM/YYYY format
- Formal "você" tone with natural PT-BR flow

## 9) Implementation Notes

### Technical Approach
- Define colors and spacing as CSS custom properties for easy updates
- Use modern image formats (WebP, AVIF) with fallbacks
- Load fonts efficiently (WOFF2, subset characters, display: swap)
- Keep the design system in sync across code and design tools

### Quality Checks
- Test contrast ratios regularly
- Review on real devices (mobile, tablet, desktop)
- Verify accessibility with keyboard navigation
- Get feedback from actual users in your target market
