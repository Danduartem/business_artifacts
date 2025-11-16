# Generate Prototypes Workflow

**Status:** v1.0 - Embedded in Agent

## Overview

The generate-prototypes functionality is currently embedded within the Design Director agent's `*generate` action for v1.0 simplicity and efficiency.

## How to Use

1. Load the Design Director agent: `/design-forge` or agent activation command
2. Run the `*generate` command
3. Follow the interactive prompts to generate 5 prototypes

## What Happens

1. **Requirements Gathering** - Design Director asks for section type and design vision
2. **Context Analysis** - Analyzes your input to understand audience, personality, goals
3. **Archetype Selection** - Intelligently selects 5 appropriate design archetypes
4. **Parallel Generation** - Spawns 5 isolated designer agents simultaneously
5. **Result Presentation** - Delivers 5 HTML files with comparison guidance

## Output

**Location:** `{prototype_output_folder}/` (configured during installation)

**Files:**
- `prototype-minimalist.html`
- `prototype-bold-innovator.html`
- `prototype-professional.html`
- `prototype-modern-artisan.html`
- `prototype-elegant-curator.html`

Each file is self-contained with embedded CSS/JS, production-ready, and responsive.

## Supported Sections (v1.0)

- Hero sections
- Feature/benefit sections
- Pricing tables
- Testimonial sections
- Call-to-action sections
- Footer sections
- Navigation bars

## Future (v1.5+)

This workflow may be extracted into a standalone workflow.yaml for:
- Better separation of concerns
- Enhanced customization options
- Integration with other modules
- Advanced features (context-aware archetype selection, diversity dial)

For now, the embedded approach provides the fastest path to value.

---

_Part of Design Forge module - Vision Translation Engine_
