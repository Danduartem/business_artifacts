# Style Guide Forge Templates

This folder contains output templates used by the Style Guide Director to assemble final deliverables.

## Templates

### style-guide.template.md
Complete human-readable style guide document. Contains placeholders for:
- Design principles
- Brand foundation
- Color system
- Typography system
- Spacing and layout
- Component specifications
- Motion guidelines
- Accessibility requirements

### design-principles.template.md
Standalone design principles document. Used for:
- Quick reference for designers
- Design Forge integration
- Team alignment

### component-spec.template.md
Detailed component documentation. Covers:
- 18+ UI component types
- All states and variants
- Accessibility requirements
- Do's and don'ts

### tokens.css.template
CSS custom properties export. Includes:
- Color tokens (all scales)
- Typography tokens
- Spacing tokens
- Border radius and shadow tokens
- Animation tokens
- Dark mode overrides
- Reduced motion support

### tailwind.config.template.js
Tailwind CSS configuration. Includes:
- Full color palette
- Typography scale
- Spacing scale
- Border radius scale
- Shadow scale
- Animation timing
- Breakpoints
- Container settings

## Placeholder Syntax

Templates use `{placeholder_name}` syntax for variable substitution.

Example:
```
--color-primary-500: {primary_500};
```

## Assembly Process

1. Style Guide Director collects outputs from all specialist agents
2. Agent outputs are merged into a unified data structure
3. Templates are populated with merged data
4. Final files are written to output folder

## Customization

To customize templates:
1. Copy template to output folder
2. Modify as needed
3. Use `*update` command to regenerate specific sections

Templates follow best practices from:
- Material Design
- Tailwind CSS
- IBM Carbon Design System
- WCAG 2.1 Guidelines
