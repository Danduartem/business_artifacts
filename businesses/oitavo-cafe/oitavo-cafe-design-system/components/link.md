# Link Component Specification

## Overview

Links are navigation elements that allow users to move between pages, sections, or external resources. Unlike Buttons (which trigger actions), Links navigate users to different locations. The Oitavo Café Link component balances clarity with the warm, professional brand aesthetic through subtle underlines and thoughtful color states.

**Design Principle**: Links signal navigation, not action. Use semantic HTML (`<a>`) for SEO and accessibility. Reserve Buttons for actions (submit, delete, etc.).

---

## Anatomy

```
┌─────────────────────────────────┐
│  [Icon]  Link Text  [Icon]      │ ← Link Container
└─────────────────────────────────┘
     ↑         ↑           ↑
  Leading   Content    Trailing
   Icon      Label       Icon
  (opt)               (opt, →)

Components:
- Container: Inline or inline-flex element
- Label: Typography (link text)
- Underline: Visual indicator (default, hover, or none)
- Icons: Optional leading/trailing icons
- Focus Ring: 2px outline for keyboard navigation
```

---

## Variants

| Variant | Use Case | Color | Underline | Font Weight |
|---------|----------|-------|-----------|-------------|
| **Primary** | In-content links, primary navigation | `var(--color-brand-primary)` (#75201C) | On hover | 600 (semibold) |
| **Subtle** | Footer links, secondary navigation | `var(--color-text-secondary)` | On hover | 400 (regular) |
| **Standalone** | Isolated links, "Learn more" CTAs | `var(--color-interactive-primary)` (#8D4C00) | Always visible | 600 (semibold) |
| **Inline** | Text within paragraphs | Inherits text color | Always visible | Inherits (typically 400) |

**Visual Hierarchy**: Standalone > Primary > Subtle > Inline

---

## Sizes

| Size | Font Size | Line Height | Icon Size | Gap (icon-text) |
|------|-----------|-------------|-----------|-----------------|
| **Small** | 14px | 20px | 16px | 4px |
| **Medium** | 16px | 24px | 20px | 6px |
| **Large** | 18px | 28px | 24px | 8px |

**Notes**:
- Medium is the default size
- Size should match surrounding text for inline links
- Standalone links can use larger sizes for emphasis

---

## States

| State | Visual Changes | Interaction | CSS Properties |
|-------|----------------|-------------|----------------|
| **Default** | Base styling per variant | Interactive | Base color, cursor: pointer, underline based on variant |
| **Hover** | Underline appears/darkens, color deepens | Pointer over link | Underline visible, `color: darken(5%)` or `filter: brightness(0.9)` |
| **Active** | Slight color shift | Click/tap | `color: darken(10%)`, underline remains |
| **Focus** | Focus ring appears | Keyboard navigation | `outline: 2px solid var(--shadow-focus)`, `outline-offset: 2px` |
| **Visited** | Subtle color shift (optional) | Previously visited | `color: var(--color-brand-primary)` with slight opacity |
| **Disabled** | Reduced opacity, no underline, no interaction | Cannot interact | `opacity: 0.5`, `cursor: not-allowed`, `text-decoration: none`, `pointer-events: none` |

**Transition**: All state changes use `var(--duration-fast)` (200ms) with `var(--ease-gentle)` easing.

### Underline Behavior

| Variant | Default | Hover | Active | Focus |
|---------|---------|-------|--------|-------|
| **Primary** | None | Visible | Visible | Visible |
| **Subtle** | None | Visible | Visible | Visible |
| **Standalone** | Visible | Thicker/darker | Visible | Visible |
| **Inline** | Visible (subtle) | Thicker | Visible | Visible |

**Underline style**:
- Thickness: 1px (default), 2px (hover/standalone)
- Offset: 2px below baseline (`text-underline-offset: 2px`)
- Color: Matches text color

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'subtle' \| 'standalone' \| 'inline'` | `'primary'` | No | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Link size |
| `href` | `string` | - | Yes | Destination URL |
| `external` | `boolean` | `false` | No | Opens in new tab (adds target="_blank" rel="noopener noreferrer") |
| `disabled` | `boolean` | `false` | No | Disables link interaction |
| `leadingIcon` | `ReactNode \| string` | `null` | No | Icon before label |
| `trailingIcon` | `ReactNode \| string` | `null` | No | Icon after label (e.g., →, ↗) |
| `underline` | `'none' \| 'hover' \| 'always'` | Variant default | No | Override underline behavior |
| `onClick` | `(event: Event) => void` | `undefined` | No | Click handler (e.g., for analytics) |
| `ariaLabel` | `string` | `undefined` | No | Accessible label override |
| `className` | `string` | `''` | No | Additional CSS classes |
| `children` | `ReactNode \| string` | - | Yes | Link text content |

---

## Accessibility

### Keyboard Navigation
- **Tab**: Focus next/previous link
- **Enter**: Activate link (navigate to href)
- **Shift + Tab**: Focus previous link

### ARIA Attributes

```html
<!-- Standard link -->
<a
  href="/sobre"
  class="link link--primary">
  Sobre nós
</a>

<!-- External link -->
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  class="link link--standalone">
  Visitar site externo
  <svg aria-hidden="true" class="link__icon link__icon--trailing">
    <!-- External link icon ↗ -->
  </svg>
  <span class="sr-only">(abre em nova aba)</span>
</a>

<!-- Link with custom aria-label -->
<a
  href="/download/relatorio.pdf"
  class="link link--primary"
  aria-label="Baixar relatório de ROI em PDF">
  Baixar relatório
  <svg aria-hidden="true" class="link__icon link__icon--trailing">
    <!-- Download icon -->
  </svg>
</a>

<!-- Disabled link (avoid when possible) -->
<a
  href="/indisponivel"
  class="link link--primary link--disabled"
  aria-disabled="true"
  tabindex="-1"
  onclick="return false;">
  Link indisponível
</a>
```

### Screen Reader Considerations
- Link text should be descriptive and make sense out of context
- Avoid "click here" or "read more" without context
- External links should announce "opens in new tab/window"
- Icons should have `aria-hidden="true"` with text alternatives
- Use `aria-label` to provide additional context when needed

### Focus Management
- Visible focus indicator (2px ring) meets WCAG 2.2 AA
- Focus ring color: `var(--shadow-focus)` with sufficient contrast
- Focus ring offset: 2px from link boundary
- Skip links should be provided for main navigation

---

## Guidelines

### Do ✓

- **Use descriptive link text**: "Ver relatório de ROI" not "Clique aqui"
- **Indicate external links**: Use trailing icon (↗) and screen reader text
- **Use semantic HTML**: Always use `<a>` tags for navigation
- **Maintain color contrast**: Ensure 4.5:1 contrast ratio minimum
- **Use underlines for clarity**: Especially in body text (inline variant)
- **Group related links**: Footer navigation, breadcrumbs, etc.

### Don't ✗

- **Don't use links for actions**: Use Button component instead (e.g., "Submit form")
- **Don't rely on color alone**: Use underlines to distinguish links from text
- **Don't use vague text**: Avoid "Click here", "More", "Link" without context
- **Don't open new tabs unexpectedly**: Mark external links clearly
- **Don't disable links without reason**: Remove from DOM or explain why disabled
- **Don't use buttons styled as links**: Use the Link component for navigation

### Link vs. Button Decision Tree

```
Does it navigate to a URL?
├─ Yes → Use Link component
│  ├─ Internal page → variant="primary"
│  ├─ External site → variant="standalone", external={true}
│  └─ Anchor link → variant="primary", href="#section"
│
└─ No → Use Button component
   ├─ Submits form → Button with type="submit"
   ├─ Opens modal → Button with onClick handler
   ├─ Toggles state → Button or IconButton
   └─ Triggers action → Button
```

### Copy Examples

| ✓ Good | ✗ Bad |
|--------|-------|
| Ver relatório completo | Clique aqui |
| Baixar guia em PDF | Download |
| Saiba mais sobre ROI | Leia mais |
| Contatar suporte | Fale conosco |
| Acessar painel | Ir para painel |

---

## Code Examples

### HTML + CSS

```html
<!-- Primary Link (Default) -->
<a href="/sobre" class="link link--primary link--md">
  Sobre a Oitavo Café
</a>

<!-- Standalone Link with Trailing Icon -->
<a href="/roi-calculator" class="link link--standalone link--md">
  Calcular meu ROI
  <svg class="link__icon link__icon--trailing" aria-hidden="true" width="20" height="20">
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/>
  </svg>
</a>

<!-- External Link -->
<a
  href="https://blog.oitavocafe.com"
  target="_blank"
  rel="noopener noreferrer"
  class="link link--standalone link--md">
  Visitar blog
  <svg class="link__icon link__icon--trailing" aria-hidden="true" width="20" height="20">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" stroke-width="2" fill="none"/>
  </svg>
  <span class="sr-only">(abre em nova aba)</span>
</a>

<!-- Inline Link (within paragraph) -->
<p>
  A Oitavo Café ajuda empreendedores a
  <a href="/sobre" class="link link--inline">
    maximizar seu ROI
  </a>
  através de ferramentas inteligentes.
</p>

<!-- Subtle Link (Footer) -->
<footer>
  <nav aria-label="Rodapé">
    <a href="/privacidade" class="link link--subtle link--sm">Privacidade</a>
    <a href="/termos" class="link link--subtle link--sm">Termos de Uso</a>
    <a href="/contato" class="link link--subtle link--sm">Contato</a>
  </nav>
</footer>

<!-- Link with Leading Icon -->
<a href="/download/relatorio.pdf" class="link link--primary link--md" download>
  <svg class="link__icon link__icon--leading" aria-hidden="true" width="20" height="20">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" fill="none"/>
  </svg>
  Baixar relatório
</a>

<!-- Disabled Link (avoid when possible) -->
<a
  href="#"
  class="link link--primary link--md link--disabled"
  aria-disabled="true"
  tabindex="-1"
  onclick="return false;">
  Funcionalidade em breve
</a>
```

### CSS

```css
/* Base Link Styles */
.link {
  /* Typography */
  font-family: var(--font-family-body);
  text-decoration: none;

  /* Layout */
  display: inline-flex;
  align-items: center;
  gap: 6px;

  /* Interaction */
  cursor: pointer;
  user-select: none;

  /* Transition */
  transition: all var(--duration-fast) var(--ease-gentle);

  /* Position for focus ring */
  position: relative;
}

/* Sizes */
.link--sm {
  font-size: 14px;
  line-height: 20px;
  gap: 4px;
}

.link--md {
  font-size: 16px;
  line-height: 24px;
  gap: 6px;
}

.link--lg {
  font-size: 18px;
  line-height: 28px;
  gap: 8px;
}

/* Variants */
.link--primary {
  color: var(--color-brand-primary); /* #75201C */
  font-weight: 600;
  text-decoration: none;
}

.link--primary:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
  filter: brightness(0.9);
}

.link--subtle {
  color: var(--color-text-secondary);
  font-weight: 400;
  text-decoration: none;
}

.link--subtle:hover {
  color: var(--color-brand-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.link--standalone {
  color: var(--color-interactive-primary); /* #8D4C00 */
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
}

.link--standalone:hover {
  text-decoration-thickness: 2px;
  filter: brightness(0.9);
}

.link--inline {
  color: inherit;
  font-weight: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  text-decoration-color: var(--color-brand-primary);
}

.link--inline:hover {
  text-decoration-thickness: 2px;
  color: var(--color-brand-primary);
}

/* States - Active */
.link:active:not(.link--disabled) {
  filter: brightness(0.8);
}

/* States - Focus */
.link:focus-visible {
  outline: 2px solid var(--shadow-focus);
  outline-offset: 2px;
  border-radius: 2px;
}

/* States - Visited (subtle shift, optional) */
.link:visited {
  /* Maintain same color for consistency in app navigation */
  /* For external links, could use slightly different shade */
}

/* States - Disabled */
.link--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  text-decoration: none;
  pointer-events: none;
}

/* Icons */
.link__icon {
  flex-shrink: 0;
  color: currentColor;
}

.link--sm .link__icon {
  width: 16px;
  height: 16px;
}

.link--md .link__icon {
  width: 20px;
  height: 20px;
}

.link--lg .link__icon {
  width: 24px;
  height: 24px;
}

.link__icon--leading {
  margin-right: -2px;
}

.link__icon--trailing {
  margin-left: -2px;
}

/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### React Example

```jsx
import React from 'react';
import { ArrowRight, ExternalLink, Download } from 'lucide-react';

const Link = ({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  underline,
  onClick,
  ariaLabel,
  className = '',
  children,
  ...props
}) => {
  const baseClass = 'link';
  const variantClass = `link--${variant}`;
  const sizeClass = `link--${size}`;
  const disabledClass = disabled ? 'link--disabled' : '';

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  const linkProps = {
    className: classes,
    href: disabled ? undefined : href,
    'aria-label': ariaLabel,
    'aria-disabled': disabled,
    onClick: disabled ? (e) => e.preventDefault() : onClick,
    ...(external && !disabled && {
      target: '_blank',
      rel: 'noopener noreferrer'
    }),
    ...(disabled && {
      tabIndex: -1
    }),
    ...props
  };

  return (
    <a {...linkProps}>
      {leadingIcon && (
        <span className="link__icon link__icon--leading" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children}
      {trailingIcon && (
        <span className="link__icon link__icon--trailing" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
      {external && !disabled && (
        <span className="sr-only">(abre em nova aba)</span>
      )}
    </a>
  );
};

// Usage Examples
export const LinkExamples = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    {/* Primary navigation link */}
    <Link variant="primary" href="/sobre">
      Sobre a Oitavo Café
    </Link>

    {/* Standalone CTA link */}
    <Link variant="standalone" href="/roi-calculator" trailingIcon={<ArrowRight />}>
      Calcular meu ROI
    </Link>

    {/* External link */}
    <Link
      variant="standalone"
      href="https://blog.oitavocafe.com"
      external
      trailingIcon={<ExternalLink />}>
      Visitar blog
    </Link>

    {/* Link with leading icon */}
    <Link variant="primary" href="/download/report.pdf" leadingIcon={<Download />}>
      Baixar relatório
    </Link>

    {/* Inline link within text */}
    <p>
      A Oitavo Café ajuda empreendedores a{' '}
      <Link variant="inline" href="/sobre">
        maximizar seu ROI
      </Link>{' '}
      através de ferramentas inteligentes.
    </p>

    {/* Subtle footer links */}
    <nav style={{ display: 'flex', gap: '16px' }}>
      <Link variant="subtle" size="sm" href="/privacidade">
        Privacidade
      </Link>
      <Link variant="subtle" size="sm" href="/termos">
        Termos de Uso
      </Link>
      <Link variant="subtle" size="sm" href="/contato">
        Contato
      </Link>
    </nav>

    {/* Disabled link */}
    <Link variant="primary" href="#" disabled>
      Funcionalidade em breve
    </Link>
  </div>
);

export default Link;
```

---

## Usage Examples

### Navigation Menu
```html
<nav aria-label="Menu principal">
  <ul class="nav-list">
    <li><a href="/" class="link link--primary link--md">Início</a></li>
    <li><a href="/produtos" class="link link--primary link--md">Produtos</a></li>
    <li><a href="/sobre" class="link link--primary link--md">Sobre</a></li>
    <li><a href="/blog" class="link link--primary link--md">Blog</a></li>
    <li><a href="/contato" class="link link--primary link--md">Contato</a></li>
  </ul>
</nav>

<style>
  .nav-list {
    display: flex;
    gap: 32px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @media (max-width: 768px) {
    .nav-list {
      flex-direction: column;
      gap: 16px;
    }
  }
</style>
```

### Breadcrumbs
```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li>
      <a href="/" class="link link--subtle link--sm">Início</a>
    </li>
    <li aria-hidden="true">/</li>
    <li>
      <a href="/produtos" class="link link--subtle link--sm">Produtos</a>
    </li>
    <li aria-hidden="true">/</li>
    <li>
      <span class="link link--subtle link--sm" aria-current="page">Calculadora de ROI</span>
    </li>
  </ol>
</nav>

<style>
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
```

### Footer Links
```html
<footer class="footer">
  <div class="footer__section">
    <h3>Empresa</h3>
    <nav aria-label="Links da empresa">
      <a href="/sobre" class="link link--subtle link--sm">Sobre nós</a>
      <a href="/equipe" class="link link--subtle link--sm">Equipe</a>
      <a href="/carreiras" class="link link--subtle link--sm">Carreiras</a>
    </nav>
  </div>

  <div class="footer__section">
    <h3>Recursos</h3>
    <nav aria-label="Links de recursos">
      <a href="/blog" class="link link--subtle link--sm">Blog</a>
      <a href="/guias" class="link link--subtle link--sm">Guias</a>
      <a href="/api" class="link link--subtle link--sm">API</a>
    </nav>
  </div>

  <div class="footer__section">
    <h3>Legal</h3>
    <nav aria-label="Links legais">
      <a href="/privacidade" class="link link--subtle link--sm">Privacidade</a>
      <a href="/termos" class="link link--subtle link--sm">Termos</a>
    </nav>
  </div>
</footer>

<style>
  .footer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 48px;
    padding: 48px 0;
  }

  .footer__section nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }
</style>
```

### Call-to-Action Links
```html
<!-- Hero section CTA -->
<section class="hero">
  <h1>Maximize seu ROI com a Oitavo Café</h1>
  <p>Ferramentas inteligentes para empreendedores sempre ligados</p>

  <div class="hero__actions">
    <!-- Primary action: Button -->
    <button class="btn btn--primary btn--lg">Começar teste grátis</button>

    <!-- Secondary navigation: Link -->
    <a href="/como-funciona" class="link link--standalone link--lg">
      Como funciona
      <svg class="link__icon link__icon--trailing" aria-hidden="true">
        <!-- Arrow right icon -->
      </svg>
    </a>
  </div>
</section>
```

---

## Related Components

- **Button**: For actions and form submissions (see button.md)
- **Breadcrumb**: Specialized navigation component (future)
- **Tabs**: For sectioned navigation (future)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-13 | Initial specification |

---

**Design System**: Oitavo Café
**Component Type**: Action / Navigation
**Status**: Ready for Implementation
