# WCAG Accessibility Standards Reference

## Overview

The Web Content Accessibility Guidelines (WCAG) establish standards for making web content accessible to people with disabilities. This reference focuses on color-related requirements.

---

## Contrast Ratio Requirements

### WCAG 2.1 Level AA (Minimum)

| Element | Minimum Ratio | Notes |
|---------|--------------|-------|
| Normal text | 4.5:1 | Text smaller than 18pt or 14pt bold |
| Large text | 3:1 | Text 18pt+ or 14pt+ bold |
| UI components | 3:1 | Buttons, inputs, icons |
| Graphical objects | 3:1 | Charts, infographics |

### WCAG 2.1 Level AAA (Enhanced)

| Element | Minimum Ratio | Notes |
|---------|--------------|-------|
| Normal text | 7:1 | Higher standard for better readability |
| Large text | 4.5:1 | Higher standard for large text |

---

## Calculating Contrast Ratios

### Formula
```
Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)
```
Where L1 is the relative luminance of the lighter color and L2 is the relative luminance of the darker color.

### Relative Luminance Calculation
```
L = 0.2126 * R + 0.7152 * G + 0.0722 * B
```
Where R, G, and B are:
- If value <= 0.03928: value / 12.92
- If value > 0.03928: ((value + 0.055) / 1.055) ^ 2.4

### Common Contrast Ratios

| Pair | Ratio | AA Normal | AA Large | AAA Normal | AAA Large |
|------|-------|-----------|----------|------------|-----------|
| Black on White | 21:1 | ✅ | ✅ | ✅ | ✅ |
| Navy on White | 16:1 | ✅ | ✅ | ✅ | ✅ |
| Gray-700 on White | 8.5:1 | ✅ | ✅ | ✅ | ✅ |
| Blue-600 on White | 5.4:1 | ✅ | ✅ | ❌ | ✅ |
| Blue-500 on White | 4.5:1 | ✅ | ✅ | ❌ | ✅ |
| Blue-400 on White | 3.0:1 | ❌ | ✅ | ❌ | ❌ |
| Gray-400 on White | 3.1:1 | ❌ | ✅ | ❌ | ❌ |

---

## Color Independence (1.4.1)

### Requirement
Color must not be the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.

### Common Violations
- Links only distinguished by color (no underline)
- Error fields only shown in red (no icon/text)
- Required fields only marked with color
- Chart data only differentiated by color

### Solutions
- Add underlines to links
- Use icons alongside color (✓ for success, ✗ for error)
- Add text labels ("Required", "Error: ...")
- Use patterns or shapes in addition to color

---

## Focus Indicators (2.4.7)

### Requirements
- Visible focus indicator for keyboard navigation
- Minimum 3:1 contrast for focus indicator
- Focus indicator must be visible against all backgrounds

### Best Practices
```css
/* Good focus indicator */
:focus-visible {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
}

/* Ensure visibility on all backgrounds */
:focus-visible {
  outline: 2px solid currentColor;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.8);
}
```

---

## Colorblind Considerations

### Types of Color Vision Deficiency

| Type | Affected | Prevalence | Confused Colors |
|------|----------|------------|-----------------|
| Deuteranopia | Red-Green (green cone) | 6% of males | Red/Green, Brown/Orange |
| Protanopia | Red-Green (red cone) | 2% of males | Red/Green, Red appears darker |
| Tritanopia | Blue-Yellow | <1% total | Blue/Yellow, Violet/Red |
| Achromatopsia | All colors | 0.003% | All (sees only grayscale) |

### Safe Color Combinations

**Do Use:**
- Blue + Orange (safe for all types)
- Blue + Yellow (safe for red-green)
- Purple + Orange
- Blue + Brown
- Dark Blue + Light Blue (luminance difference)

**Avoid:**
- Red + Green (problematic for 8% of males)
- Green + Brown
- Blue + Purple (tritanopia)
- Light green + Yellow

### Testing Tools
- Coblis Color Blindness Simulator
- Chrome DevTools (Rendering > Emulate vision deficiencies)
- Stark (Figma/Sketch plugin)
- Adobe Color Accessibility Tools

---

## Semantic Color Requirements

### Success States
- Primary: Green (#22C55E or similar)
- Must have 3:1 contrast on background
- Pair with checkmark icon
- Include text confirmation

### Error States
- Primary: Red (#EF4444 or similar)
- Must have 3:1 contrast on background
- Pair with X or warning icon
- Include descriptive error message

### Warning States
- Primary: Yellow/Amber (#F59E0B or similar)
- Often needs darker variant for text
- Pair with warning triangle icon
- Include explanatory text

### Info States
- Primary: Blue (#3B82F6 or similar)
- Pair with info icon
- Include helpful text

---

## Dark Mode Considerations

### Contrast in Dark Mode
- Light text on dark backgrounds should maintain same ratios
- Be careful with pure white (#FFFFFF) on dark - can cause eye strain
- Use slightly off-white (#F9FAFB) for body text
- Increase contrast for important elements

### Color Adjustments
| Light Mode | Dark Mode | Notes |
|------------|-----------|-------|
| primary-600 | primary-400 | Lighter for visibility |
| gray-700 | gray-300 | Invert for text |
| white bg | gray-900 bg | True inversion |
| black text | white text | True inversion |

### Common Dark Mode Issues
- Colored text losing contrast on dark backgrounds
- Semantic colors (red/green) being too dim
- Focus indicators not visible
- Shadows not visible (use lighter shadows or glows)

---

## Implementation Checklist

### Text
- [ ] Body text meets 4.5:1 (AA) or 7:1 (AAA)
- [ ] Large text meets 3:1 (AA) or 4.5:1 (AAA)
- [ ] Links have non-color indicator (underline)
- [ ] Placeholder text meets 4.5:1

### Interactive Elements
- [ ] Buttons have 3:1 contrast
- [ ] Focus indicators are visible (3:1)
- [ ] Disabled states are distinguishable
- [ ] Hover states are visible

### Forms
- [ ] Labels meet contrast requirements
- [ ] Error messages use icon + text + color
- [ ] Required indicators are not color-only
- [ ] Input borders meet 3:1

### Content
- [ ] Icons meet 3:1 if meaningful
- [ ] Charts use patterns + color
- [ ] No information conveyed by color alone

### Testing
- [ ] Tested with contrast checker
- [ ] Simulated colorblind views
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
