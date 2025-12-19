# Generate Voice Guide - Instructions

## Overview

Creates a comprehensive brand voice guide using 5 specialist agents, with Director review and feedback loop, compiled into ONE actionable file.

**Architecture:** Multi-agent depth + Single-file simplicity

## What You'll Get

ONE file: `voice-guide.md` (~3-4 pages)

Contains 8 sections:
1. **Voice Snapshot** - Who you are in 3 words + archetype
2. **Voice Dimensions** - Position on 4 scales with examples
3. **Golden Rules** - 5 core principles
4. **Do/Don't** - Quick reference table
5. **Say This/Not That** - Vocabulary guide
6. **Before/After Examples** - Learn by example
7. **Channel Quick Reference** - One line per platform
8. **Red Lines** - What to NEVER do

## What You Need

1. **Brand Name** - As it appears in copy
2. **3-5 Reference URLs** - Brands with voices you admire
3. **Target Audience** - Who you're talking to
4. **3-5 Personality Words** - How you want to sound
5. **Persona Name** - Your ideal customer's name (e.g., "Carolina")
6. **Persona Gender** - For consistent gender in copy
7. **What to AVOID** - Tones that don't fit

## How It Works

```
1. You provide inputs
        ↓
2. Director analyzes reference URLs
        ↓
3. 5 specialists work in PARALLEL:
   - Voice Identity Architect → Snapshot + Dimensions
   - Tone Strategist → Golden Rules
   - Lexicon Curator → Vocabulary + Red Lines
   - Channel Specialist → Channel Reference
   - Content Exemplar → Do/Don't + Before/After
        ↓
4. Director REVIEWS each section
        ↓
5. FEEDBACK LOOP (if needed):
   - Director sends specific feedback
   - Specialist regenerates
   - Max 3 rounds
        ↓
6. Director COMPILES into one file
        ↓
7. You get: voice-guide.md
```

## Commands

| Command | Description |
|---------|-------------|
| `*generate` | Full workflow with specialists |
| `*analyze` | Analyze URLs only (no file output) |
| `*help` | Show menu |
| `*exit` | Exit |

## Why Multi-Agent?

Each specialist brings unique expertise:

| Specialist | Focus |
|------------|-------|
| Voice Identity Architect | WHO the brand is (archetype, personality) |
| Tone Strategist | Core principles that define the voice |
| Lexicon Curator | Word choices, grammar, prohibitions |
| Channel Specialist | Platform-specific adaptations |
| Content Exemplar | Real examples showing voice in action |

A single agent doing all of this would be shallower on each area.

## The Feedback Loop

If a section is weak, the Director sends targeted feedback:

```
Your Golden Rules section needs improvement:

ISSUE: Rules are too generic
EXAMPLE: "Be authentic" could apply to any brand
FIX: Make rules specific like "Always lead with ROI numbers"

Please regenerate with this guidance.
```

**Rules:**
- Maximum 3 rounds per specialist
- Feedback must be SPECIFIC
- If still weak after 3 rounds, use best version

## Tips

- **Better references = better output.** Include about pages, blog posts, social profiles.
- **Be specific about personality.** "Friendly but expert" > "professional"
- **Name your persona.** It helps create targeted examples.

## What's NOT in the Output

- JSON files (copywriters don't read JSON)
- Detailed channel playbooks (one line is enough)
- 8+ situational tone matrices (too granular)
- Intermediate process files (all in memory)

---

*Voice Forge v2 - Multi-agent quality. Single-file simplicity.*
