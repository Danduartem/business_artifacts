# Color Forge

**Design System Creation Engine** - Multi-Agent System for Comprehensive Design Systems

Version: 2.0.0

---

## Overview

Color Forge is a BMAD module that transforms your brand assets into comprehensive, production-ready design systems. Powered by 5 specialized AI agents, it creates complete design tokens, component specifications, accessibility audits, and documentation from your brand guide, style guide, and color palette.

---

## Key Features

- **5 Specialized Agents** - Each expert in a specific domain
- **3-Tier Token Architecture** - Global → Semantic → Component tokens
- **Comprehensive Components** - 30+ component specifications with all states
- **WCAG 2.1 AA Compliant** - Full accessibility audit with actionable recommendations
- **Framework Agnostic** - CSS custom properties work anywhere
- **Production Ready** - Copy-paste code examples for every component

---

## Agents

| Agent | Role | Output |
|-------|------|--------|
| **Design System Architect** | Orchestrates the entire pipeline | Coordination & quality assurance |
| **Token Architect** | Extracts and structures design tokens | `tokens.json`, `tokens.css` |
| **Component Specifier** | Creates detailed component specifications | Component markdown docs |
| **Accessibility Auditor** | Validates WCAG compliance | Audit report with fixes |
| **Documentation Writer** | Produces adoption documentation | Getting started, guides |

---

## Quick Start

### 1. Prepare Your Inputs

You need 3 key documents:
- **Brand Guide** - Brand personality, voice, visual identity
- **Style Guide** - Typography, spacing, component rules
- **Color Palette** - All brand colors with roles

Use templates in `/templates/` if needed.

### 2. Configure Paths

Edit `config.yaml`:

```yaml
brand_guide_path: "/path/to/brand-guide.md"
style_guide_path: "/path/to/style-guide.md"
color_palette_path: "/path/to/color-palette.md"
```

### 3. Launch Design System Architect

```bash
/bmad:color-forge:agents:design-system-architect
```

### 4. Create Design System

Use `*create` for the full pipeline, or individual commands:
- `*tokens` - Generate design tokens only
- `*components` - Specify components only
- `*audit` - Run accessibility audit
- `*docs` - Generate documentation

---

## Commands

| Command | Description |
|---------|-------------|
| `*create` | Full design system pipeline (recommended) |
| `*tokens` | Generate design tokens only |
| `*components` | Specify components only |
| `*audit` | Run accessibility audit |
| `*docs` | Generate documentation |
| `*load` | Load/update brand inputs |
| `*preview` | View current system state |
| `*export` | Package for distribution |
| `*help` | Show all commands |
| `*exit` | Exit Color Forge |

---

## Output Structure

The full pipeline produces this structure:

```
{output_folder}/design-system/
├── README.md                    # Design system overview
├── accessibility-audit.md       # WCAG compliance report
├── tokens/
│   ├── tokens.json             # Style Dictionary format
│   └── tokens.css              # CSS custom properties
├── components/
│   ├── README.md               # Component library overview
│   ├── button.md               # Button specification
│   ├── input.md                # Input specification
│   └── ...                     # 30+ component specs
└── docs/
    ├── README.md               # Getting started
    ├── installation.md         # Setup guide
    ├── tokens.md               # Token documentation
    ├── components.md           # Component overview
    ├── accessibility.md        # A11y guidelines
    └── contributing.md         # Contribution guide
```

---

## Output Formats

### tokens.json (Style Dictionary)

```json
{
  "color": {
    "palette": {
      "blue": {
        "500": { "value": "#2196F3" }
      }
    },
    "primary": { "value": "{color.palette.blue.500}" },
    "text": {
      "primary": { "value": "{color.palette.gray.900}" }
    }
  },
  "spacing": {
    "md": { "value": "1rem" }
  }
}
```

### tokens.css (CSS Custom Properties)

```css
:root {
  /* Colors: Palette */
  --color-palette-blue-500: #2196F3;

  /* Colors: Semantic */
  --color-primary: var(--color-palette-blue-500);
  --color-text-primary: var(--color-palette-gray-900);

  /* Spacing */
  --spacing-md: 1rem;
}
```

### Component Spec (Markdown)

Each component includes:
- Overview & use cases
- Anatomy diagram
- Variants & sizes
- State matrix
- Props/API
- Accessibility (keyboard, ARIA)
- Code examples

---

## Configuration

### config.yaml

```yaml
# User Settings
user_name: "Your Name"
communication_language: "English"

# Design System Settings
design_system_name: "My Design System"
tech_stack: "css-only"  # css-only | react-tailwind | react-css-in-js | vue-css
component_scope: "comprehensive"  # core | standard | comprehensive

# Output Settings
output_folder: "/path/to/output"

# Input File Paths
brand_guide_path: "/path/to/brand-guide.md"
style_guide_path: "/path/to/style-guide.md"
color_palette_path: "/path/to/color-palette.md"

# Accessibility
wcag_level: "AA"  # AA | AAA
include_accessibility_audit: true
auto_generate_docs: true
```

---

## Component Scope

| Scope | Components | Description |
|-------|------------|-------------|
| **core** | 8 | Button, Input, Card, Typography, Icon, Link, Badge, Alert |
| **standard** | 15 | Core + Modal, Dropdown, Nav, Form, Tabs, Toast |
| **comprehensive** | 30+ | Full library including Table, Sidebar, Drawer, etc. |

---

## File Structure

```
bmad/color-forge/
├── _module-installer/
│   └── install-config.yaml
├── agents/
│   ├── design-system-architect.md   # Primary orchestrator
│   ├── token-architect.md           # Token specialist
│   ├── component-specifier.md       # Component expert
│   ├── accessibility-auditor.md     # WCAG specialist
│   └── documentation-writer.md      # Documentation expert
├── workflows/
│   └── create-design-system/
│       ├── workflow.yaml
│       └── instructions.md
├── templates/
│   ├── brand-guide-template.md
│   ├── style-guide-template.md
│   └── color-palette-template.md
├── briefs/                          # User inputs stored here
├── config.yaml
└── README.md
```

---

## Best Practices

### Preparing Inputs
- Use the templates in `/templates/` as starting points
- Be specific about typography (exact font names, weights, sizes)
- Include full color scales (50-900) when possible
- Document spacing as a scale, not individual values

### Token Architecture
- Let semantic tokens reference global tokens (not hardcoded)
- Use consistent naming throughout
- Keep component tokens minimal - override only when needed

### Component Specifications
- Include ALL states (default, hover, focus, active, disabled)
- Document keyboard interactions completely
- Provide copy-paste ready code examples

---

## Troubleshooting

### Missing input files
Run `*load` to see current input status and provide missing files.

### Accessibility failures
The audit provides specific fixes. Address high-severity issues before deploying.

### Token naming conflicts
Use a unique prefix in your design system name to avoid CSS variable collisions.

---

## Version History

### 2.0.0 (Design System Engine)
- Complete rewrite as design system creation engine
- 5 specialized agents for comprehensive output
- 3-tier token architecture
- 30+ component specifications
- WCAG 2.1 AA accessibility audit
- Full documentation generation

### 1.0.0 (Color Palette Generator)
- Original color palette generation module
- 5 color approach agents
- Palette scoring system

---

## Credits

Built with the BMAD Framework.

Follows the proven multi-agent pattern for generating comprehensive, high-quality outputs.
