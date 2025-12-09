# Icon System - Professional Iconography Guidelines

## ❌ **NEVER Use Emojis**

**Why emojis are banned:**
- Unprofessional appearance
- Inconsistent rendering across platforms (iOS vs Android vs Windows)
- Poor accessibility (screen readers announce them awkwardly)
- Break brand cohesion
- Not scalable or customizable
- No control over color or style

---

## ✅ **Professional Icon Systems**

### **1. Lucide Icons (PRIMARY CHOICE)**
**Why we prefer Lucide:**
- Minimal, consistent design language
- Well-documented and actively maintained
- Great for professional/corporate projects
- Excellent accessibility support
- SVG-based, fully scalable

**CDN:**
```html
<script src="https://unpkg.com/lucide@latest"></script>
```

**Example Usage:**
```html
<!-- Check icon -->
<i data-lucide="check" class="w-6 h-6"></i>

<!-- Alert Circle -->
<i data-lucide="alert-circle" class="w-6 h-6"></i>

<!-- Heart -->
<i data-lucide="heart" class="w-6 h-6"></i>
```

**Common Icons:**
- `check` - Success, completion
- `x` - Close, error, remove
- `alert-circle` - Warning, attention
- `info` - Information
- `arrow-right` - Forward, next
- `chevron-down` - Dropdown, expand
- `user` - Profile, account
- `mail` - Email, contact
- `phone` - Call, contact
- `calendar` - Date, schedule

---

### **2. Heroicons (SECONDARY)**
**When to use:**
- Tailwind CSS projects
- Need outline + solid variants
- MIT licensed projects

**CDN:**
```html
<!-- Via CDN (outline style) -->
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="..." />
</svg>
```

---

### **3. Phosphor Icons**
**When to use:**
- Need elegant, versatile icons
- Want multiple weight options (thin, light, regular, bold, fill)
- More stylized aesthetic

**CDN:**
```html
<script src="https://unpkg.com/@phosphor-icons/web"></script>
```

---

### **4. Feather Icons**
**When to use:**
- Ultra-clean, minimal aesthetic
- Simpler icon needs
- Smaller file sizes

**CDN:**
```html
<script src="https://unpkg.com/feather-icons"></script>
```

---

## 🎨 **Icon Styling Guidelines**

### **Color Usage:**
```css
/* Inherit from text color */
.icon {
  color: inherit;
  stroke: currentColor;
}

/* Navy for structure/navigation */
.icon-structure {
  color: #191F3A;
}

/* Borgonha for actions/CTAs */
.icon-action {
  color: #81171F;
}

/* Gold for achievements/highlights */
.icon-highlight {
  color: #C9A227;
}
```

### **Sizing:**
- **UI icons**: 16-24px (1rem - 1.5rem)
- **Feature highlights**: 32-48px (2rem - 3rem)
- **Hero/decorative**: 64px+ (4rem+)

### **Stroke Width:**
- Maintain consistent stroke across all icons (usually 2px or 1.5px)
- Match stroke width to typography weight

---

## ♿ **Accessibility Requirements**

### **ARIA Labels:**
```html
<!-- Decorative icon (hidden from screen readers) -->
<svg aria-hidden="true" class="icon">...</svg>

<!-- Meaningful icon (needs label) -->
<svg aria-label="Success" role="img" class="icon">...</svg>

<!-- Icon with text (icon is decorative) -->
<button>
  <svg aria-hidden="true" class="icon">...</svg>
  <span>Submit</span>
</button>

<!-- Icon-only button (needs label) -->
<button aria-label="Close menu">
  <svg aria-hidden="true" class="icon">...</svg>
</button>
```

### **Focus States:**
```css
.icon-button:focus {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}
```

---

## 📋 **Icon Usage Checklist**

- [ ] Using professional icon system (Lucide, Heroicons, Phosphor, Feather)
- [ ] NO emojis anywhere in the design
- [ ] Consistent icon family across entire project
- [ ] SVG format (scalable, accessible)
- [ ] Proper ARIA labels for meaningful icons
- [ ] Consistent stroke width
- [ ] Color matches brand palette
- [ ] Sized appropriately for context
- [ ] Works with screen readers
- [ ] Has focus states for interactive icons

---

## 🚫 **Common Mistakes to Avoid**

### ❌ **Don't:**
```html
<!-- Emojis -->
<span class="icon">✅</span>
<span class="icon">❌</span>

<!-- Mixed icon systems -->
<i data-lucide="check"></i>
<svg class="heroicon">...</svg>

<!-- Raster images as icons -->
<img src="icon.png" alt="Check">

<!-- No ARIA labels on meaningful icons -->
<svg class="icon"><path d="..."/></svg>
```

### ✅ **Do:**
```html
<!-- Consistent professional system -->
<i data-lucide="check"></i>
<i data-lucide="x"></i>

<!-- Proper accessibility -->
<svg aria-label="Success" role="img">
  <path d="..."/>
</svg>

<!-- SVG with proper attributes -->
<svg xmlns="http://www.w3.org/2000/svg"
     width="24" height="24"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
     aria-hidden="true">
  <path d="..."/>
</svg>
```

---

## 🔗 **Icon System Resources**

**Lucide Icons:**
- Website: https://lucide.dev/
- NPM: `npm install lucide`
- CDN: `https://unpkg.com/lucide@latest`

**Heroicons:**
- Website: https://heroicons.com/
- NPM: `npm install @heroicons/react`
- GitHub: https://github.com/tailwindlabs/heroicons

**Phosphor Icons:**
- Website: https://phosphoricons.com/
- NPM: `npm install @phosphor-icons/web`
- CDN: `https://unpkg.com/@phosphor-icons/web`

**Feather Icons:**
- Website: https://feathericons.com/
- NPM: `npm install feather-icons`
- CDN: `https://unpkg.com/feather-icons`

---

## 📝 **Implementation Example**

### **Complete Icon Button:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    .icon-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: #81171F;
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background 0.3s;
    }

    .icon-button:hover {
      background: #A01F29;
    }

    .icon-button:focus {
      outline: 2px solid #C9A227;
      outline-offset: 2px;
    }

    .icon-button svg {
      width: 1.25rem;
      height: 1.25rem;
      stroke: currentColor;
    }
  </style>
</head>
<body>
  <button class="icon-button">
    <i data-lucide="arrow-right" aria-hidden="true"></i>
    <span>Começar Agora</span>
  </button>

  <script>
    lucide.createIcons();
  </script>
</body>
</html>
```

---

**Remember: Professional projects use professional icon systems. Emojis are for text messages, not UI design.**
