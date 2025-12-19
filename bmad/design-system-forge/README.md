# Design System Forge v2

> Multi-agent quality + Production-ready output

## Philosophy

Design System Forge v2 combines the best of both worlds:
- **3 specialist agents** for depth and quality
- **Code exports** that developers actually import
- **1 documentation file** for quick reference
- **Feedback loop** for continuous improvement

## Architecture

```
INPUTS (style guide, color palette)
        ↓
   Design System Architect (orchestrates)
        ↓
┌─────────────────────────────────────────────────┐
│  3 SPECIALISTS WORK IN PARALLEL                 │
│                                                 │
│  🔮 Token Architect                             │
│     → tokens.css, tokens.json                   │
│                                                 │
│  🧩 Component Specifier                         │
│     → Component Guidelines                      │
│                                                 │
│  ♿ Accessibility Auditor                       │
│     → WCAG Validation                           │
└─────────────────────────────────────────────────┘
        ↓
   Architect REVIEWS each output
        ↓
┌─────────────────────────────────────────────────┐
│  FEEDBACK LOOP (if needed)                      │
│  - Architect identifies issues                  │
│  - Sends targeted feedback to specialist        │
│  - Specialist regenerates with guidance         │
│  - Max 3 rounds per specialist                  │
└─────────────────────────────────────────────────┘
        ↓
   Architect COMPILES documentation
        ↓
OUTPUT:
├── tokens.css        (import this)
├── tokens.json       (for build tools)
└── design-system.md  (documentation)
```

## Output

**Three files:**

### tokens.css
CSS custom properties ready to import:
```css
@import 'tokens.css';

.my-component {
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
}
```

### tokens.json
Style Dictionary format for build tools:
```json
{
  "color": {
    "primary": { "value": "#2196F3" }
  }
}
```

### design-system.md
Single documentation file with:
1. **Quick Reference** - Key values at a glance
2. **Token Reference** - All tokens organized by category
3. **Component Guidelines** - Usage principles with code snippets
4. **Accessibility** - WCAG validation results

## Why Multi-Agent?

| Single Agent | 3 Specialists |
|--------------|---------------|
| One perspective | 3 specialized perspectives |
| May miss edge cases | Token expert + Component expert + A11y expert |
| No validation | Built-in accessibility audit |
| Sequential | Parallel (faster) |

## Quick Start

1. Start the agent:
   ```
   /bmad:design-system-forge:agents:design-system-architect
   ```

2. Select `*create`

3. Provide:
   - Style guide path (from style-guide-forge or manual)
   - Color palette path (from color-forge JSON)
   - Design system name
   - Brand personality

4. Wait for specialists + review + compilation

5. Get THREE files:
   - `tokens.css` - Import this in your CSS
   - `tokens.json` - For Style Dictionary / build tools
   - `design-system.md` - Documentation

## Commands

| Command | Description |
|---------|-------------|
| `*create` | Create design system (full workflow) |
| `*preview` | Preview current system state |
| `*help` | Show menu |
| `*exit` | Exit |

## Module Structure

```
design-system-forge/
├── config.yaml
├── README.md
├── agents/
│   ├── design-system-architect.agent.yaml  # Orchestrator
│   ├── token-architect.agent.yaml
│   ├── component-specifier.agent.yaml
│   └── accessibility-auditor.agent.yaml
├── workflows/
│   └── create-design-system/
│       ├── workflow.yaml
│       └── instructions.md
├── data/
│   └── wcag-standards.md
└── templates/
    ├── brand-guide-template.md
    ├── style-guide-template.md
    └── color-palette-template.md
```

## Feedback Loop

The Architect reviews each specialist's output and can request improvements:

```
Your tokens.css needs improvement:

ISSUE: Missing semantic color tokens
EXAMPLE: Only palette colors defined, no --color-text-primary
FIX: Add semantic tokens that reference palette values

Please regenerate with this guidance.
```

**Rules:**
- Maximum 3 feedback rounds per specialist
- Feedback must be SPECIFIC (not "make it better")
- If still weak after 3 rounds, use best version

## Token Architecture (3-Tier)

```
TIER 1: Global/Reference (raw values)
        --color-palette-blue-500: #2196F3
                    ↓
TIER 2: Semantic/Alias (purpose-based)
        --color-primary: var(--color-palette-blue-500)
                    ↓
TIER 3: Component (component-specific)
        --button-primary-bg: var(--color-primary)
```

## Related Modules

- **Color Forge** - Generates color palettes (input for Design System Forge)
- **Style Guide Forge** - Creates design guidelines (input for Design System Forge)
- **Voice Forge** - Creates brand voice documentation

## v2 Changes

| v1 | v2 |
|----|-----|
| 5 agents | 4 agents (removed documentation-writer) |
| Multiple output folders | Single folder with 3 files |
| 7+ doc files | 1 doc file (design-system.md) |
| Individual component specs | Component guidelines only |
| Sequential agents | Parallel with feedback loop |

## Tips

1. **Run Color Forge first.** The color palette JSON is essential input.
2. **Run Style Guide Forge second.** Gives you typography, spacing guidelines.
3. **Import tokens.css early.** Use it from day one of development.
4. **Check accessibility results.** Fix any contrast failures before shipping.

---

*Design System Forge v2 - Multi-agent quality. Production-ready output.*
