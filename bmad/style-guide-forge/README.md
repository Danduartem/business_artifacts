# Style Guide Forge v2

> Multi-agent quality + Single-file simplicity

## Philosophy

Style Guide Forge v2 combines the best of both worlds:
- **5 specialist agents** for depth and quality
- **1 output file** that designers actually use
- **Feedback loop** for continuous improvement

**Note:** Code exports (tokens.css, tailwind.config.js) are handled by **design-system-forge**. This module creates design guidelines only.

## Architecture

```
INPUTS (brand guide, colors, reference URLs)
        ↓
   Style Guide Director (orchestrates)
        ↓
┌─────────────────────────────────────────────────┐
│  5 SPECIALISTS WORK IN PARALLEL                 │
│                                                 │
│  🎯 Brand Translator                            │
│     → Design Principles, Brand Foundation       │
│                                                 │
│  🔍 Reference Analyzer                          │
│     → Visual Direction                          │
│                                                 │
│  🏗️ Foundations Architect                       │
│     → Color, Typography, Spacing Guidelines     │
│                                                 │
│  🧩 Component Designer                          │
│     → Component Principles                      │
│                                                 │
│  ✨ Interaction Designer                        │
│     → Motion Principles, Accessibility          │
└─────────────────────────────────────────────────┘
        ↓
   Director REVIEWS each section
        ↓
┌─────────────────────────────────────────────────┐
│  FEEDBACK LOOP (if needed)                      │
│  - Director identifies weak sections            │
│  - Sends targeted feedback to specialist        │
│  - Specialist regenerates with guidance         │
│  - Max 3 rounds per specialist                  │
└─────────────────────────────────────────────────┘
        ↓
   Director COMPILES into ONE file
        ↓
OUTPUT: style-guide.md
```

## Output

**One file:** `style-guide.md`

Contains 9 sections:
1. **Design Principles** - 5-7 core principles with applications
2. **Brand Foundation** - Personality mapping, voice/tone for UI, logo usage
3. **Visual Direction** - Patterns to adopt/avoid from references
4. **Color Guidelines** - Color hierarchy with usage guidance
5. **Typography Guidelines** - Type scale with use cases
6. **Spacing & Layout** - Spacing scale, grid, breakpoints
7. **Component Principles** - When-to-use guidelines for UI components
8. **Motion Principles** - Animation philosophy, timing, easing
9. **Accessibility Checklist** - WCAG compliance checklist

## Why Multi-Agent?

| Single Agent | 5 Specialists |
|--------------|---------------|
| One perspective | 5 specialized perspectives |
| Generalist coverage | Deep expertise per domain |
| May miss nuances | Each specialist focuses fully |
| Sequential | Parallel (faster) |

The **Brand Translator** thinks differently than the **Foundations Architect**. One focuses on brand essence, the other on systematic scales.

## Quick Start

1. Start the agent:
   ```
   /bmad:style-guide-forge:agents:style-guide-director
   ```

2. Select `*generate`

3. Provide:
   - Brand guide path (PDF or MD)
   - Color palette path (from Color Forge)
   - 1-5 reference URLs
   - Brand personality (3-5 adjectives)
   - Target audience
   - Industry
   - Design goals

4. Wait for specialists + review + compilation

5. Get ONE file: `style-guide.md`

## Commands

| Command | Description |
|---------|-------------|
| `*generate` | Generate style guide (full workflow) |
| `*analyze` | Analyze reference URLs only (no file output) |
| `*help` | Show menu |
| `*exit` | Exit |

## Module Structure

```
style-guide-forge/
├── config.yaml
├── README.md
├── agents/
│   ├── style-guide-director.agent.yaml    # Orchestrator
│   ├── brand-translator.agent.yaml
│   ├── reference-analyzer.agent.yaml
│   ├── foundations-architect.agent.yaml
│   ├── component-designer.agent.yaml
│   └── interaction-designer.agent.yaml
├── workflows/
│   └── generate-style-guide/
│       ├── workflow.yaml
│       ├── instructions.md
│       └── checklist.md
└── data/
    ├── typography-best-practices.md
    ├── spacing-systems.md
    ├── component-patterns.md
    ├── accessibility-checklist.md
    └── motion-guidelines.md
```

## Feedback Loop

The Director reviews each specialist's output and can request improvements:

```
Your [section] needs improvement:

ISSUE: Values are too generic
EXAMPLE: "Use appropriate spacing" doesn't help designers
FIX: Use specific values like "24px section gaps, 16px card padding"

Please regenerate with this guidance.
```

**Rules:**
- Maximum 3 feedback rounds per specialist
- Feedback must be SPECIFIC (not "make it better")
- If still weak after 3 rounds, use best version

## Related Modules

- **Color Forge** - Generates color palettes (input for Style Guide Forge)
- **Design System Forge** - Creates code exports (tokens.css, tailwind.config.js)
- **Voice Forge** - Creates brand voice documentation

## v2 Changes

| v1 | v2 |
|----|-----|
| 7 agents | 5 agents (removed scorer) |
| Multiple JSON files | 1 markdown file |
| Code exports included | Code exports in design-system-forge |
| Separate scoring | Director reviews directly |
| Generic regeneration | Targeted feedback loop |

## Tips

1. **Better references = better output.** Pick sites whose design language you admire.
2. **Be specific about personality.** "Modern but warm" > "professional"
3. **Provide a color palette.** Run Color Forge first for best results.
4. **Use it daily.** Pin it, bookmark it, reference it before designing.

---

*Style Guide Forge v2 - Multi-agent quality. Single-file simplicity.*
