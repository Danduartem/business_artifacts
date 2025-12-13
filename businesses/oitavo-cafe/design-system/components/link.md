# Link

## Overview
Links are text-based navigation elements that form the foundation of web navigation and content relationships in the Oitavo Café Design System. They enable users to navigate between pages, sections, and external resources. Links should be clearly identifiable, accessible, and provide context about their destination.

## Anatomy

```
┌─────────────────────────────────┐
│  Visit our website  [↗]         │
└─────────────────────────────────┘
         ↑              ↑
     Link Text      External Icon
    (underlined)      (optional)
```

**Component Parts:**
- **Link Text**: Required, descriptive text that indicates destination
- **Underline**: Required for inline links (accessibility)
- **Icon**: Optional, for external links or navigation indicators
- **Focus Ring**: Visible outline for keyboard navigation

## Variants

| Variant | Use Case | Key Differences |
|---------|----------|-----------------|
| Inline | Links within body text | Underlined, inherits text size, Coffee Maroon color |
| Standalone | Links as independent elements | No underline (underlines on hover), semibold weight, icon support |
| Navigation | Menu and navigation links | Neutral color, padding, background on hover |
| External | Links to external websites | External icon, opens in new tab, security attributes |

## Sizes

Links inherit font size from their parent context:

| Context | Font Size | Token Reference |
|---------|-----------|-----------------|
| Body text | 16px | var(--font-size-base) |
| Small text | 13px | var(--font-size-sm) |
| Large text | 20px | var(--font-size-md) |
| Headings | Inherit from heading | H1-H5 tokens |

**Note:** Font weight varies by variant (see variants table).

## States

### Inline Variant

| State | Color | Text Decoration | Font Weight |
|-------|-------|-----------------|-------------|
| default | var(--color-primary-600) | underline | inherit |
| hover | var(--color-primary-700) | underline | inherit |
| active | var(--color-primary-800) | underline | inherit |
| focus | var(--color-primary-600) | underline | inherit |
| visited | var(--color-secondary-700) | underline | inherit |

### Standalone Variant

| State | Color | Text Decoration | Font Weight | Gap (with icon) |
|-------|-------|-----------------|-------------|-----------------|
| default | var(--color-primary-600) | none | var(--font-weight-semibold) | 6px |
| hover | var(--color-primary-700) | underline | var(--font-weight-semibold) | 6px |
| active | var(--color-primary-800) | underline | var(--font-weight-semibold) | 6px |
| focus | var(--color-primary-600) | none | var(--font-weight-semibold) | 6px |

### Navigation Variant

| State | Color | Background | Font Weight | Padding |
|-------|-------|------------|-------------|---------|
| default | var(--color-neutral-700) | transparent | var(--font-weight-medium) | 8px 16px |
| hover | var(--color-primary-600) | var(--color-primary-50) | var(--font-weight-medium) | 8px 16px |
| active | var(--color-primary-700) | var(--color-primary-100) | var(--font-weight-medium) | 8px 16px |
| current | var(--color-primary-700) | transparent | var(--font-weight-bold) | 8px 16px |

**Current page indicator:**
- Border bottom: 2px solid var(--color-primary-700)
- aria-current="page"

### Focus State (All Variants)

| Property | Value |
|----------|-------|
| outline | 3px solid var(--color-primary-200) |
| outline-offset | 2px |
| border-radius | 2px |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'inline' \| 'standalone' \| 'navigation' | 'inline' | Link visual style |
| href | string | - | Link destination (required) |
| external | boolean | false | Opens in new tab with security attributes |
| current | boolean | false | Indicates current page (navigation variant) |
| icon | ReactNode | - | Icon to display (typically for external/navigation) |
| iconPosition | 'left' \| 'right' | 'right' | Icon position relative to text |
| underline | boolean | auto | Force underline (auto uses variant defaults) |
| disabled | boolean | false | Disabled state (use sparingly) |
| onClick | function | - | Click handler |
| children | ReactNode | - | Link text content |

## Accessibility

### Keyboard Navigation
| Key | Action |
|-----|--------|
| Tab | Move focus to link |
| Shift + Tab | Move focus to previous element |
| Enter | Activate link, navigate to destination |

### ARIA Attributes
- **href**: Required for semantic `<a>` element (must be valid URL or anchor)
- **aria-label**: Use when link text is not descriptive (e.g., "Read more")
- **aria-current**: Set to `"page"` for current page in navigation
- **aria-describedby**: Associate additional context if needed
- **rel**: Use `"noopener noreferrer"` for external links with target="_blank"
- **target**: Use `"_blank"` for external links

### External Link Indicators
External links must have one of the following:
1. Visible icon (external-link or arrow-up-right)
2. Screen reader text: `<span class="sr-only">abre em nova aba</span>`
3. aria-label that includes "abre em nova aba"

### Screen Reader Behavior
- Default: Announces "[Link text], link"
- External: Announces "[Link text], link, abre em nova aba"
- Current page: Announces "[Link text], current page"
- Visited: Announces "[Link text], visited, link"

### WCAG Compliance
- Links in text must be underlined (WCAG 1.4.1) - do not rely on color alone
- Minimum color contrast: 4.5:1 against background (WCAG AA)
- Focus indicator: Clearly visible 3px outline (WCAG 2.4.7)
- Link text must be descriptive (WCAG 2.4.4) - avoid "click here" or "read more"
- Link purpose clear from context or link text (WCAG 2.4.9 Level AAA)

## Usage Guidelines

### ✅ Do
- Use semantic `<a>` element with href attribute
- Underline links within body text (don't rely on color alone)
- Write descriptive link text that makes sense out of context
- Use external link indicators (icon or text) for new tab links
- Add rel="noopener noreferrer" to external links with target="_blank"
- Make focus indicators clearly visible
- Use navigation variant for menus and primary navigation
- Indicate current page with aria-current="page"

### ❌ Don't
- Don't use links for actions that don't navigate (use buttons instead)
- Don't use vague link text like "click here", "read more", "learn more"
- Don't open links in new tabs without indication
- Don't remove underlines from inline text links (accessibility violation)
- Don't use javascript:void(0) or # for href (use button instead)
- Don't style links to look like buttons (use actual button component)
- Don't link the current page in navigation (confusing and redundant)
- Don't remove focus indicators (required for keyboard users)

## Link Text Best Practices

### Good Examples:
- "Download the ROI calculator" (specific, action-oriented)
- "View our case studies" (clear destination)
- "Read the full privacy policy" (descriptive)
- "Contact the sales team" (clear purpose)

### Bad Examples:
- "Click here" (no context when read alone)
- "Learn more" (more about what?)
- "Read more" (not specific)
- "This page" (vague)

## Code Examples

### HTML

```html
<!-- Inline Link (in body text) -->
<p>
  Oitavo Café helps businesses grow with
  <a href="/services/growth-marketing" class="link link-inline">
    data-driven growth marketing
  </a>
  strategies.
</p>

<!-- Standalone Link with Icon -->
<a href="/case-studies" class="link link-standalone">
  View our case studies
  <svg class="link-icon" aria-hidden="true">→</svg>
</a>

<!-- External Link -->
<a
  href="https://example.com"
  class="link link-standalone link-external"
  target="_blank"
  rel="noopener noreferrer"
>
  Visit our website
  <svg class="link-icon-external" aria-hidden="true">↗</svg>
  <span class="sr-only">abre em nova aba</span>
</a>

<!-- Navigation Link -->
<nav aria-label="Main navigation">
  <ul class="nav-list">
    <li>
      <a href="/services" class="link link-nav">
        Serviços
      </a>
    </li>
    <li>
      <a href="/about" class="link link-nav" aria-current="page">
        Sobre Nós
      </a>
    </li>
    <li>
      <a href="/contact" class="link link-nav">
        Contato
      </a>
    </li>
  </ul>
</nav>

<!-- Link with aria-label (when text isn't descriptive enough) -->
<a
  href="/blog/roi-calculator-guide"
  class="link link-standalone"
  aria-label="Read the complete guide to our ROI calculator"
>
  Read more
  <svg class="link-icon" aria-hidden="true">→</svg>
</a>
```

### CSS

```css
/* Inline Link (Default) */
.link-inline {
  color: var(--color-primary-600);
  text-decoration: underline;
  font-weight: inherit;
  cursor: pointer;
  transition: color var(--duration-fast) var(--easing-ease-out);
}

.link-inline:hover {
  color: var(--color-primary-700);
}

.link-inline:active {
  color: var(--color-primary-800);
}

.link-inline:focus-visible {
  outline: 3px solid var(--color-primary-200);
  outline-offset: 2px;
  border-radius: 2px;
}

.link-inline:visited {
  color: var(--color-secondary-700);
}

/* Standalone Link */
.link-standalone {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-primary-600);
  text-decoration: none;
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--duration-fast) var(--easing-ease-out);
}

.link-standalone:hover {
  color: var(--color-primary-700);
  text-decoration: underline;
}

.link-standalone:active {
  color: var(--color-primary-800);
}

.link-standalone:focus-visible {
  outline: 3px solid var(--color-primary-200);
  outline-offset: 2px;
  border-radius: 2px;
}

.link-icon {
  width: 16px;
  height: 16px;
  transition: transform var(--duration-fast) var(--easing-ease-out);
}

.link-standalone:hover .link-icon {
  transform: translateX(2px);
}

.link-icon-external {
  width: 16px;
  height: 16px;
}

/* Navigation Link */
.link-nav {
  display: inline-block;
  padding: var(--spacing-2) var(--spacing-4);
  color: var(--color-neutral-700);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius-sm);
  transition: all var(--duration-fast) var(--easing-ease-out);
}

.link-nav:hover {
  color: var(--color-primary-600);
  background: var(--color-primary-50);
}

.link-nav:active {
  color: var(--color-primary-700);
  background: var(--color-primary-100);
}

.link-nav[aria-current="page"] {
  color: var(--color-primary-700);
  font-weight: var(--font-weight-bold);
  border-bottom: 2px solid var(--color-primary-700);
  pointer-events: none;
}

.link-nav:focus-visible {
  outline: 3px solid var(--color-primary-200);
  outline-offset: 2px;
}

/* Screen reader only text */
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

### React Component Example

```jsx
import React from 'react';
import './Link.css';

export const Link = ({
  variant = 'inline',
  href,
  external = false,
  current = false,
  icon,
  iconPosition = 'right',
  underline,
  disabled = false,
  children,
  ...props
}) => {
  const classNames = [
    'link',
    `link-${variant}`,
    external && 'link-external',
    disabled && 'link-disabled',
  ].filter(Boolean).join(' ');

  const linkProps = {
    className: classNames,
    href: disabled ? undefined : href,
    ...(external && {
      target: '_blank',
      rel: 'noopener noreferrer',
    }),
    ...(current && variant === 'navigation' && {
      'aria-current': 'page',
    }),
    ...props,
  };

  const renderContent = () => (
    <>
      {icon && iconPosition === 'left' && (
        <span className="link-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="link-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {external && (
        <>
          <svg className="link-icon-external" aria-hidden="true">
            ↗
          </svg>
          <span className="sr-only">abre em nova aba</span>
        </>
      )}
    </>
  );

  if (disabled) {
    return (
      <span className={classNames} aria-disabled="true">
        {renderContent()}
      </span>
    );
  }

  return <a {...linkProps}>{renderContent()}</a>;
};

// Usage Examples:
// <Link href="/services">Our Services</Link>
// <Link href="/case-studies" variant="standalone" icon="→">View Case Studies</Link>
// <Link href="https://example.com" external>Visit Website</Link>
// <Link href="/about" variant="navigation" current>About Us</Link>
```

### Skip Link Pattern

```html
<!-- Skip to main content (for accessibility) -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<!-- Skip link CSS -->
<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary-700);
  color: var(--color-white);
  padding: var(--spacing-2) var(--spacing-4);
  text-decoration: none;
  font-weight: var(--font-weight-semibold);
  z-index: 1000;
  transition: top var(--duration-fast) var(--easing-ease-out);
}

.skip-link:focus {
  top: 0;
  outline: 3px solid var(--color-accent-400);
  outline-offset: 2px;
}
</style>
```

## Related Components
- **Button** - For actions that don't navigate (use buttons, not links)
- **Navigation** - Primary navigation menus
- **Breadcrumb** - Hierarchical navigation links
- **Card** - Cards can contain links to detail pages
- **Footer** - Footer often contains navigation links
