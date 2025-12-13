# Avatar Component

## Overview

**Purpose**: Avatars provide visual representation of users, team members, or entities. They create immediate recognition and personalization in the interface.

**Usage**: Use avatars in headers, comments, activity feeds, user lists, and attribution. Show profile pictures, initials, or icons as fallbacks.

**Brand Context**: For Oitavo Café, avatars represent Carolina (profile), team members, clients in CRM, or content authors - adding a human touch to data-driven interfaces.

---

## Anatomy

```
Single Avatar:
┌──────┐
│ [CA] │  ← Initials (fallback)
└──────┘

┌──────┐
│ [🖼️] │  ← Image (preferred)
└──────┘

With Status:
┌──────┐
│ [🖼️]🟢│  ← Online indicator (bottom-right)
└──────┘

Avatar Group (Stacked):
┌──────┬───┬───┬────┐
│ [🖼️] │[🖼️]│[🖼️]│ +5 │  ← Overlapping avatars
└──────┴───┴───┴────┘
```

---

## Variants

### 1. **Image Avatar** (Default)
- Profile photo displayed
- `object-fit: cover` to fill circle
- Alt text required for accessibility
- Fallback to initials if image fails

### 2. **Initials Avatar**
- 1-2 characters (first name + last name)
- Auto-generated background color (based on name hash)
- High contrast text (white or dark)
- Font weight: `semibold` (600)

### 3. **Icon Avatar**
- Generic user icon or custom icon
- For system users, bots, or placeholders
- Icon size: 50% of avatar size
- Neutral background color

### 4. **Avatar Group**
- Overlapping stack of avatars
- Show first 3-4, then "+X" count
- Negative margin for overlap: `-8px` to `-12px`
- Border around each to prevent blending

---

## Sizes

### Extra Small (xs)
- **Size**: `24px × 24px`
- **Font Size**: `10px` (initials)
- **Icon Size**: `12px`
- **Border**: `1px`
- **Use**: Inline mentions, compact lists

### Small (sm)
- **Size**: `32px × 32px`
- **Font Size**: `12px`
- **Icon Size**: `16px`
- **Border**: `2px`
- **Use**: Comments, activity feeds, table cells

### Medium (md) - Default
- **Size**: `40px × 40px`
- **Font Size**: `14px`
- **Icon Size**: `20px`
- **Border**: `2px`
- **Use**: Navigation, headers, cards

### Large (lg)
- **Size**: `56px × 56px`
- **Font Size**: `20px`
- **Icon Size**: `28px`
- **Border**: `2px`
- **Use**: Profile pages, modals

### Extra Large (xl)
- **Size**: `80px × 80px`
- **Font Size**: `28px`
- **Icon Size**: `40px`
- **Border**: `3px`
- **Use**: Profile headers, account settings

---

## States

### Default
- **Border Radius**: `50%` (circular)
- **Border**: `2px solid` `neutral-200`
- **Background**: Auto-generated or `neutral-100`
- **Image**: `object-fit: cover`

### Hover (if clickable)
- **Border Color**: `primary-700`
- **Cursor**: `pointer`
- **Transform**: `scale(1.05)`
- **Transition**: `all 150ms ease-out`

### Focus
- **Outline**: `2px solid` `boxShadow.focus`
- **Outline Offset**: `2px`

### Loading
- **Background**: Skeleton shimmer animation
- **Border**: Same as default

### Error (image failed)
- **Fallback**: Initials or icon
- **Log error**: Console warning for debugging

---

## Props/API

```typescript
interface AvatarProps {
  src?: string;
  alt: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  showStatus?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'tight' | 'default' | 'loose';
  onExcessClick?: () => void;
  className?: string;
}
```

### Example Usage

```tsx
{/* Single Avatar */}
<Avatar
  src="/avatars/carolina.jpg"
  alt="Carolina"
  name="Carolina Silva"
  size="md"
  status="online"
  showStatus={true}
/>

{/* Initials Fallback */}
<Avatar
  name="João Santos"
  size="lg"
  onClick={() => navigate('/profile/joao')}
/>

{/* Avatar Group */}
<AvatarGroup
  avatars={[
    { src: '/avatar1.jpg', alt: 'Carolina', name: 'Carolina' },
    { src: '/avatar2.jpg', alt: 'João', name: 'João' },
    { src: '/avatar3.jpg', alt: 'Maria', name: 'Maria' },
    { name: 'Pedro' },
    { name: 'Ana' }
  ]}
  max={3}
  size="sm"
  onExcessClick={() => showAllMembers()}
/>
```

---

## Accessibility

### Guidelines
- **Alt text**: Descriptive (e.g., "Carolina Silva's profile picture")
- **Clickable avatars**: Use `<button>` or `<a>` with accessible label
- **Status indicators**: Include `aria-label="Online"` on status badge
- **Avatar groups**: Provide list of all users in tooltip or modal
- **Contrast**: Initials text minimum 4.5:1 against background

### ARIA Attributes
```html
<button class="avatar" aria-label="Ver perfil de Carolina">
  <img src="/carolina.jpg" alt="Carolina Silva" class="avatar__image" />
  <span class="avatar__status avatar__status--online" aria-label="Online"></span>
</button>

<!-- Initials Fallback -->
<div class="avatar" role="img" aria-label="João Santos">
  <span class="avatar__initials">JS</span>
</div>

<!-- Avatar Group -->
<div class="avatar-group" role="group" aria-label="Membros da equipe">
  <div class="avatar" role="img" aria-label="Carolina">...</div>
  <div class="avatar" role="img" aria-label="João">...</div>
  <button class="avatar avatar--excess" aria-label="Ver mais 5 membros">
    +5
  </button>
</div>
```

---

## Code Examples

### HTML Structure

```html
<!-- Image Avatar with Status -->
<div class="avatar avatar--md">
  <img src="/avatars/carolina.jpg" alt="Carolina Silva" class="avatar__image" />
  <span class="avatar__status avatar__status--online" aria-label="Online"></span>
</div>

<!-- Initials Avatar -->
<div class="avatar avatar--lg avatar--initials" style="--avatar-bg: #B75B53;" role="img" aria-label="João Santos">
  <span class="avatar__initials">JS</span>
</div>

<!-- Icon Avatar -->
<div class="avatar avatar--sm avatar--icon">
  <svg class="avatar__icon" width="20" height="20">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
</div>

<!-- Avatar Group -->
<div class="avatar-group">
  <div class="avatar avatar--sm">
    <img src="/avatar1.jpg" alt="Carolina" class="avatar__image" />
  </div>
  <div class="avatar avatar--sm">
    <img src="/avatar2.jpg" alt="João" class="avatar__image" />
  </div>
  <div class="avatar avatar--sm">
    <img src="/avatar3.jpg" alt="Maria" class="avatar__image" />
  </div>
  <button class="avatar avatar--sm avatar--excess" aria-label="Ver mais 5 membros">
    <span>+5</span>
  </button>
</div>
```

### CSS Implementation

```css
.avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 50%;
  background: var(--neutral-100);
  border: 2px solid var(--neutral-200);
  font-weight: 600;
  user-select: none;
}

/* Sizes */
.avatar--xs {
  width: 24px;
  height: 24px;
  font-size: 10px;
  border-width: 1px;
}

.avatar--sm {
  width: 32px;
  height: 32px;
  font-size: 12px;
}

.avatar--md {
  width: 40px;
  height: 40px;
  font-size: 14px;
}

.avatar--lg {
  width: 56px;
  height: 56px;
  font-size: 20px;
}

.avatar--xl {
  width: 80px;
  height: 80px;
  font-size: 28px;
  border-width: 3px;
}

/* Image */
.avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Initials */
.avatar--initials {
  background: var(--avatar-bg, var(--primary-500));
  color: white;
  text-transform: uppercase;
}

/* Icon */
.avatar__icon {
  fill: var(--neutral-500);
}

/* Status Badge */
.avatar__status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 25%;
  min-width: 8px;
  min-height: 8px;
  border-radius: 50%;
  border: 2px solid white;
}

.avatar__status--online {
  background: #10B981; /* Green */
}

.avatar__status--offline {
  background: var(--neutral-400);
}

.avatar__status--away {
  background: #F59E0B; /* Amber */
}

.avatar__status--busy {
  background: #EF4444; /* Red */
}

/* Clickable */
.avatar--clickable {
  cursor: pointer;
  transition: all 150ms ease-out;
}

.avatar--clickable:hover {
  border-color: var(--primary-700);
  transform: scale(1.05);
}

.avatar--clickable:focus-visible {
  outline: 2px solid rgba(117, 32, 28, 0.20);
  outline-offset: 2px;
}

/* Avatar Group */
.avatar-group {
  display: inline-flex;
  align-items: center;
}

.avatar-group .avatar {
  margin-left: -8px;
  border: 2px solid white;
  transition: transform 150ms ease-out, z-index 0s;
}

.avatar-group .avatar:first-child {
  margin-left: 0;
}

.avatar-group .avatar:hover {
  transform: translateY(-2px);
  z-index: 10;
}

.avatar--excess {
  background: var(--neutral-200);
  color: var(--neutral-700);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.avatar--excess:hover {
  background: var(--neutral-300);
}

/* Square Variant */
.avatar--square {
  border-radius: var(--borderRadius-md);
}

/* Loading State */
.avatar--loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### JavaScript - Generate Initials & Color

```javascript
class Avatar {
  static getInitials(name) {
    if (!name) return '?';

    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  static generateColor(name) {
    // Generate consistent color based on name hash
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = [
      '#B75B53', // Coffee Maroon
      '#B45F3D', // Terracotta
      '#AA6B00', // Golden Amber
      '#8A7B76', // Warm Gray
      '#2D5016', // Success Green
    ];

    return colors[Math.abs(hash) % colors.length];
  }

  static createAvatar(element, { name, src, size = 'md', status }) {
    const avatar = element;
    avatar.classList.add('avatar', `avatar--${size}`);

    if (src) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = name;
      img.className = 'avatar__image';

      img.onerror = () => {
        // Fallback to initials if image fails
        avatar.innerHTML = '';
        this.renderInitials(avatar, name);
      };

      avatar.appendChild(img);
    } else {
      this.renderInitials(avatar, name);
    }

    if (status) {
      const statusBadge = document.createElement('span');
      statusBadge.className = `avatar__status avatar__status--${status}`;
      statusBadge.setAttribute('aria-label', status);
      avatar.appendChild(statusBadge);
    }
  }

  static renderInitials(avatar, name) {
    const initials = this.getInitials(name);
    const color = this.generateColor(name);

    avatar.classList.add('avatar--initials');
    avatar.style.setProperty('--avatar-bg', color);
    avatar.innerHTML = `<span class="avatar__initials">${initials}</span>`;
    avatar.setAttribute('role', 'img');
    avatar.setAttribute('aria-label', name);
  }
}

// Usage
const avatarEl = document.querySelector('.avatar');
Avatar.createAvatar(avatarEl, {
  name: 'Carolina Silva',
  src: '/avatars/carolina.jpg',
  size: 'md',
  status: 'online'
});
```

---

## Related Components
- **Badge** - Status indicators
- **Tooltip** - Show full name on hover
- **Dropdown** - User menu triggered by avatar
- **List** - Display users with avatars
