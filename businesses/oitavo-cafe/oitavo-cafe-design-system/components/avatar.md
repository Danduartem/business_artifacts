# Avatar Component

**Component Category:** Data Display
**Design System:** Oitavo Café Design System
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

Avatars are visual representations of users, clients, or entities within the system. They humanize the interface and provide quick visual identification. In the Oitavo Café system, avatars represent Carolina's clients, team members, and testimonial sources - putting faces to ROI success stories.

**Primary Use Cases:**
- Client testimonials with photos
- Team member profiles
- User account indicators
- Comment and activity attribution
- Client success story cards

**Design Principle Alignment:**
Following "Trust Before Push," avatars humanize metrics and testimonials by showing real people behind the numbers. They support the brand's friendly, approachable personality.

---

## Anatomy

```
┌─────────┐
│         │
│  Image  │  ← Photo avatar
│         │
└─────────┘

┌─────────┐
│         │
│   CM    │  ← Initials fallback
│         │
└─────────┘

┌─────────┐
│    ●    │
│  Image  │  ← With status indicator
│         │
└─────────┘

┌─────────┐┌─────────┐┌─────────┐
│  Img 1  ││  Img 2  ││  Img 3  │  ← Avatar group
└─────────┘└─────────┘└─────────┘
```

**Anatomy Parts:**
1. **Container** - Circular or rounded square wrapper
2. **Image** - User photo (primary content)
3. **Fallback** - Initials or icon when no image
4. **Status Indicator** (optional) - Online/offline dot
5. **Border** (optional) - Subtle border for definition
6. **Badge** (optional) - Notification count or role indicator

---

## Variants

### 1. Image Avatar
Displays user's photo or profile picture.

**Visual Characteristics:**
- Circular shape (default)
- Image fills container with object-fit cover
- Subtle border for definition against backgrounds

**When to Use:**
- User profiles with uploaded photos
- Client testimonials
- Team member directories
- Success story cards

### 2. Initials Avatar
Shows 1-2 letter initials when no photo available.

**Visual Characteristics:**
- Circular shape
- Warm background colors from brand palette
- High contrast text (white or dark)
- Generated color based on name hash for consistency

**When to Use:**
- Users without profile photos
- Fallback when image fails to load
- Quick user identification
- Placeholder during onboarding

### 3. Icon Avatar
Uses an icon instead of photo or initials.

**Visual Characteristics:**
- Circular or rounded square
- Icon centered in container
- Neutral or semantic colors

**When to Use:**
- System-generated actions
- Generic user representations
- Service/product avatars
- Placeholder states

### 4. Avatar with Status
Shows online/offline/busy status indicator.

**Visual Characteristics:**
- Small dot positioned on bottom-right edge
- Dot has white border for separation
- Color-coded status (green/gray/red)

**When to Use:**
- Team collaboration tools
- Chat interfaces
- Real-time user presence
- Admin dashboards

### 5. Avatar Group
Multiple overlapping avatars showing a group.

**Visual Characteristics:**
- Avatars overlap by 25-50%
- Stacking order: first on top
- Optional "+N" indicator for overflow
- White border between overlapping avatars

**When to Use:**
- Multiple assignees on projects
- Shared ownership
- Team composition
- Social proof (testimonials from multiple clients)

---

## Sizes

### Extra Small (XS)
- Size: 24×24px
- Initials font: 10px
- Status dot: 6px
- Use: Inline mentions, compact lists

### Small
- Size: 32×32px
- Initials font: 12px
- Status dot: 8px
- Use: Comments, activity feeds, table rows

### Medium (Default)
- Size: 40×40px
- Initials font: 14px
- Status dot: 10px
- Use: Headers, cards, standard UI

### Large
- Size: 56×56px
- Initials font: 18px
- Status dot: 12px
- Use: Profile pages, featured testimonials

### Extra Large (XL)
- Size: 80×80px
- Initials font: 28px
- Status dot: 14px
- Use: Hero sections, client success stories

### 2XL
- Size: 128×128px
- Initials font: 42px
- Status dot: 16px
- Use: Full profile views, about pages

---

## States

### Default
- Standard appearance with defined borders
- Full opacity

### Hover (for clickable avatars)
```css
transform: scale(1.05);
box-shadow: var(--shadow-md);
cursor: pointer;
transition: all var(--duration-base) var(--ease-gentle);
```

### Focus
```css
outline: 2px solid var(--primary-600);
outline-offset: 2px;
border-radius: 50%;
```

### Loading
```css
background: var(--neutral-200);
animation: pulse 2s ease-in-out infinite;

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### Error (image failed to load)
- Automatically falls back to initials or icon
- No error state shown to user

---

## Color Specifications

### Image Avatars

**Border**
```css
border: 2px solid white;
box-shadow: 0 0 0 1px var(--neutral-300);
```

**Background (while loading)**
```css
background: var(--neutral-100);
```

### Initials Avatars

Generate colors from brand palette for consistency:

**Warm Palette (Primary)**
```css
background: var(--primary-600);   /* #993A33 */
color: white;
```

**Terracotta (Secondary)**
```css
background: var(--secondary-600); /* #973E16 */
color: white;
```

**Cream (Support)**
```css
background: var(--support-500);   /* #9B7045 */
color: white;
```

**Neutral**
```css
background: var(--neutral-600);   /* #685A56 */
color: white;
```

**Color Assignment Logic:**
Use first letter of name to consistently assign color:
- A-F: Primary
- G-L: Secondary
- M-R: Support
- S-Z: Neutral

### Status Indicator Colors

**Online**
```css
background: #10B981; /* Green */
border: 2px solid white;
```

**Away**
```css
background: var(--accent-500); /* #AA6B00 - Golden Amber */
border: 2px solid white;
```

**Busy**
```css
background: var(--primary-700); /* #75201C */
border: 2px solid white;
```

**Offline**
```css
background: var(--neutral-400); /* #958986 */
border: 2px solid white;
```

---

## Typography

### Initials
- Font Family: System font stack (inherited)
- Font Weight: 600 (semibold)
- Line Height: 1
- Text Transform: Uppercase
- Letter Spacing: 0.05em
- Text Align: Center

---

## Spacing & Layout

**Border Width:**
- Standard: 2px solid white
- With shadow: box-shadow for separation

**Status Dot Position:**
- Bottom-right corner
- Offset: 10% from edge
- Border: 2px solid white

**Avatar Group Overlap:**
- Negative margin: -8px (small)
- Negative margin: -12px (medium/large)
- z-index: reverse order (first avatar highest)

---

## Accessibility

### Semantic HTML

```html
<!-- Image avatar -->
<img
  class="avatar"
  src="/path/to/image.jpg"
  alt="Carolina Silva"
  loading="lazy"
/>

<!-- Initials avatar -->
<div class="avatar avatar--initials" aria-label="Carolina Silva">
  <span aria-hidden="true">CS</span>
</div>

<!-- Avatar with status -->
<div class="avatar-wrapper">
  <img class="avatar" src="/path/to/image.jpg" alt="Carolina Silva" />
  <span class="avatar__status avatar__status--online" aria-label="Online"></span>
</div>

<!-- Clickable avatar (link) -->
<a href="/profile/carolina" class="avatar-link">
  <img class="avatar" src="/path/to/image.jpg" alt="View Carolina Silva's profile" />
</a>
```

### ARIA Guidelines
- `alt` attribute: Use person's full name (not "avatar" or "profile picture")
- Initials: Use `aria-label` with full name, `aria-hidden="true"` on initials text
- Status: Include `aria-label` describing status ("Online", "Away", "Offline")
- Avatar groups: Use `aria-label` for overflow count ("+3 more team members")
- Decorative avatars: Use `alt=""` or `aria-hidden="true"`

### Keyboard Interaction
- Clickable avatars: Fully keyboard accessible (Tab to focus, Enter to activate)
- Focus indicator: 2px outline with 2px offset
- Avatar groups: First avatar receives focus, activates group action

### Color Contrast
- Initials text: White on dark backgrounds (AAA contrast)
- Status dots: 3:1 contrast with avatar background
- Borders: Ensure separation from page background

### Screen Reader Considerations
- Full name in `alt` or `aria-label`, not just initials
- Status announced: "Carolina Silva, online"
- Avatar groups: Announce count and purpose
- Loading state: `aria-busy="true"` while image loads

---

## Responsive Behavior

Avatars maintain fixed sizes but follow these guidelines:

**Mobile (< 768px):**
- Use small to medium sizes (32-40px) in lists
- Large sizes (56px+) for featured content only
- Ensure tap targets for clickable avatars are 44×44px minimum
- Avatar groups: Limit visible avatars to 3-4, use "+N" overflow

**Tablet (768px - 1024px):**
- Medium size (40px) standard
- Large size (56px) for headers/cards
- Full avatar groups visible

**Desktop (> 1024px):**
- All sizes appropriate
- Can use XL/2XL for hero sections
- Hover effects enabled

---

## Do's and Don'ts

### Do

- **Do** use circular avatars for people, rounded squares for brands/products
- **Do** provide meaningful alt text with person's full name
- **Do** implement proper fallback to initials when image fails
- **Do** maintain consistent sizing within the same context
- **Do** use high-quality images (at least 2x size for retina displays)
- **Do** crop images to center faces
- **Do** add subtle borders for definition against white backgrounds
- **Do** use avatar groups to show collaboration and social proof

### Don't

- **Don't** use low-quality or pixelated images
- **Don't** crop faces awkwardly (ensure head/shoulders visible)
- **Don't** use generic placeholder icons when names are available (use initials)
- **Don't** make avatars too large in compact contexts
- **Don't** forget loading states for async images
- **Don't** use colors that fail contrast requirements for initials
- **Don't** stack too many avatars in groups (max 5 visible, rest as "+N")

### Brand-Specific Guidance

**Carolina's Dashboard Context:**
- Use avatars for client testimonials with photos
- Show real people behind ROI success stories
- In team sections, represent Oitavo Café team members
- Avatar groups for shared client projects
- Always pair with names - no anonymous avatars
- Use warm brand colors for initials fallbacks

**Testimonial Best Practice:**
```
┌────────────────────────────────┐
│  ┌──────┐  "ROI de 350% em     │
│  │ CS   │  4 meses."            │
│  │Avatar│  - Carolina Silva     │
│  └──────┘    Clínica Estética   │
└────────────────────────────────┘
```

---

## Code Examples

### Basic Image Avatar

```html
<img
  class="avatar avatar--md"
  src="/images/carolina-silva.jpg"
  alt="Carolina Silva"
  loading="lazy"
/>
```

```css
.avatar {
  display: inline-block;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 1px var(--neutral-300);
  background: var(--neutral-100);
}

.avatar--xs { width: 24px; height: 24px; }
.avatar--sm { width: 32px; height: 32px; }
.avatar--md { width: 40px; height: 40px; }
.avatar--lg { width: 56px; height: 56px; }
.avatar--xl { width: 80px; height: 80px; }
.avatar--2xl { width: 128px; height: 128px; }
```

### Initials Avatar

```html
<div class="avatar avatar--initials avatar--md" aria-label="Carolina Silva">
  <span aria-hidden="true">CS</span>
</div>
```

```css
.avatar--initials {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-600);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  user-select: none;
}

.avatar--md.avatar--initials {
  font-size: 14px;
}

.avatar--lg.avatar--initials {
  font-size: 18px;
}
```

### Avatar with Status Indicator

```html
<div class="avatar-wrapper">
  <img class="avatar avatar--md" src="/images/user.jpg" alt="Carolina Silva" />
  <span class="avatar__status avatar__status--online" aria-label="Online"></span>
</div>
```

```css
.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar__status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.avatar__status--online {
  background: #10B981;
}

.avatar__status--away {
  background: var(--accent-500);
}

.avatar__status--busy {
  background: var(--primary-700);
}

.avatar__status--offline {
  background: var(--neutral-400);
}
```

### Clickable Avatar with Hover

```html
<a href="/profile/carolina" class="avatar-link">
  <img class="avatar avatar--md" src="/images/user.jpg" alt="View Carolina Silva's profile" />
</a>
```

```css
.avatar-link {
  display: inline-block;
  border-radius: 50%;
  transition: transform var(--duration-base) var(--ease-gentle);
}

.avatar-link:hover {
  transform: scale(1.05);
}

.avatar-link:hover .avatar {
  box-shadow: var(--shadow-md);
}

.avatar-link:focus-visible {
  outline: 2px solid var(--primary-600);
  outline-offset: 2px;
}
```

### Avatar Group

```html
<div class="avatar-group" aria-label="Team members">
  <img class="avatar avatar--sm" src="/user1.jpg" alt="Carolina Silva" />
  <img class="avatar avatar--sm" src="/user2.jpg" alt="João Santos" />
  <img class="avatar avatar--sm" src="/user3.jpg" alt="Maria Oliveira" />
  <div class="avatar avatar--sm avatar--overflow" aria-label="2 more team members">
    <span>+2</span>
  </div>
</div>
```

```css
.avatar-group {
  display: inline-flex;
  align-items: center;
  flex-direction: row-reverse;
}

.avatar-group .avatar {
  margin-left: -12px;
  border: 2px solid white;
  transition: transform var(--duration-fast) var(--ease-gentle);
}

.avatar-group .avatar:first-child {
  margin-left: 0;
}

.avatar-group .avatar:hover {
  transform: translateY(-2px);
  z-index: 10;
}

.avatar--overflow {
  background: var(--neutral-600);
  color: white;
  font-size: 11px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### Avatar with Fallback (Progressive Enhancement)

```html
<div class="avatar-container" data-name="Carolina Silva" data-image="/images/carolina.jpg">
  <!-- JavaScript will populate -->
</div>
```

```javascript
class Avatar {
  constructor(container) {
    this.container = container;
    this.name = container.dataset.name;
    this.imageSrc = container.dataset.image;
    this.size = container.dataset.size || 'md';

    this.render();
  }

  getInitials(name) {
    return name
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  getColorFromName(name) {
    const colors = [
      'var(--primary-600)',
      'var(--secondary-600)',
      'var(--support-500)',
      'var(--neutral-600)'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }

  renderInitials() {
    const initials = this.getInitials(this.name);
    const color = this.getColorFromName(this.name);

    this.container.innerHTML = `
      <div
        class="avatar avatar--initials avatar--${this.size}"
        style="background: ${color}"
        aria-label="${this.name}"
      >
        <span aria-hidden="true">${initials}</span>
      </div>
    `;
  }

  render() {
    if (!this.imageSrc) {
      this.renderInitials();
      return;
    }

    const img = new Image();
    img.onload = () => {
      this.container.innerHTML = `
        <img
          class="avatar avatar--${this.size}"
          src="${this.imageSrc}"
          alt="${this.name}"
          loading="lazy"
        />
      `;
    };
    img.onerror = () => {
      this.renderInitials();
    };
    img.src = this.imageSrc;

    // Show loading state
    this.container.innerHTML = `
      <div class="avatar avatar--${this.size} avatar--loading"></div>
    `;
  }
}

// Initialize all avatars
document.querySelectorAll('.avatar-container').forEach(el => {
  new Avatar(el);
});
```

---

## React/Component Example

```jsx
// Avatar.jsx
import { useState, useEffect } from 'react';

const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  status,
  clickable = false,
  href,
  onClick,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getColorFromName = (name) => {
    const colors = [
      'var(--primary-600)',
      'var(--secondary-600)',
      'var(--support-500)',
      'var(--neutral-600)'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  useEffect(() => {
    if (src) {
      setImageLoading(true);
      setImageError(false);
    }
  }, [src]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const renderAvatar = () => {
    // Show initials if no image or image failed
    if (!src || imageError) {
      return (
        <div
          className={`avatar avatar--initials avatar--${size}`}
          style={{ background: getColorFromName(name || alt) }}
          aria-label={name || alt}
          {...props}
        >
          <span aria-hidden="true">{getInitials(name || alt)}</span>
        </div>
      );
    }

    // Show image
    return (
      <img
        className={`avatar avatar--${size} ${imageLoading ? 'avatar--loading' : ''}`}
        src={src}
        alt={alt || name}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        {...props}
      />
    );
  };

  const avatarContent = (
    <div className="avatar-wrapper">
      {renderAvatar()}
      {status && (
        <span
          className={`avatar__status avatar__status--${status}`}
          aria-label={status}
        />
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="avatar-link">
        {avatarContent}
      </a>
    );
  }

  if (clickable || onClick) {
    return (
      <button className="avatar-link" onClick={onClick}>
        {avatarContent}
      </button>
    );
  }

  return avatarContent;
};

// AvatarGroup.jsx
const AvatarGroup = ({ avatars, max = 5, size = 'sm', ...props }) => {
  const visibleAvatars = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className="avatar-group" {...props}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar key={index} size={size} {...avatar} />
      ))}
      {overflow > 0 && (
        <div
          className={`avatar avatar--${size} avatar--overflow`}
          aria-label={`${overflow} more`}
        >
          <span>+{overflow}</span>
        </div>
      )}
    </div>
  );
};

// Usage
<Avatar
  src="/images/carolina.jpg"
  name="Carolina Silva"
  size="lg"
  status="online"
/>

<AvatarGroup
  avatars={[
    { src: '/user1.jpg', name: 'Carolina Silva' },
    { src: '/user2.jpg', name: 'João Santos' },
    { name: 'Maria Oliveira' }, // Will show initials
  ]}
  max={3}
/>
```

---

## Design Tokens Reference

```css
/* Avatar-specific tokens */
:root {
  /* Sizes */
  --avatar-size-xs: 24px;
  --avatar-size-sm: 32px;
  --avatar-size-md: 40px;
  --avatar-size-lg: 56px;
  --avatar-size-xl: 80px;
  --avatar-size-2xl: 128px;

  /* Border */
  --avatar-border-width: 2px;
  --avatar-border-color: white;
  --avatar-shadow: 0 0 0 1px var(--neutral-300);

  /* Status */
  --avatar-status-size-sm: 8px;
  --avatar-status-size-md: 10px;
  --avatar-status-size-lg: 12px;
  --avatar-status-border: 2px solid white;

  /* Group */
  --avatar-group-overlap-sm: -8px;
  --avatar-group-overlap-md: -12px;

  /* Transition */
  --avatar-transition: transform var(--duration-base) var(--ease-gentle);
}
```

---

## Related Components

- **Badge** - Can be combined for role/notification indicators
- **Card** - Often includes avatar in header
- **List** - Avatar + text pattern common in lists
- **Tooltip** - Provide additional info on hover

---

## References

- Design Principle: "Trust Before Push" - humanize with real faces
- Brand Personality: Friendly, human, approachable
- Carolina's Use Case: Client testimonials, team profiles
- Color Palette: Warm colors for initials (primary, secondary, support)

---

*Generated for Oitavo Café Design System - Putting faces to success stories*
