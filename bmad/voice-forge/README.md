# Voice Forge v2

> Multi-agent quality + Single-file simplicity
>
> **Language:** Portuguese BR only

## Philosophy

Voice Forge v2 combines the best of both worlds:
- **5 specialist agents** for depth and quality
- **1 output file** that copywriters actually use
- **Feedback loop** for continuous improvement

## Architecture

```
INPUTS (brand context, reference URLs)
        ↓
   Voice Director (orchestrates)
        ↓
┌─────────────────────────────────────────────────┐
│  5 SPECIALISTS WORK IN PARALLEL                 │
│                                                 │
│  🏛️ Voice Identity Architect                    │
│     → Voice Snapshot, Voice Dimensions          │
│                                                 │
│  🎯 Tone Strategist                             │
│     → Golden Rules                              │
│                                                 │
│  📚 Lexicon Curator                             │
│     → Say This/Not That, Red Lines              │
│                                                 │
│  📱 Channel Specialist                          │
│     → Channel Quick Reference                   │
│                                                 │
│  ✍️ Content Exemplar                            │
│     → Do/Don't, Before/After Examples           │
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
OUTPUT: voice-guide.md (~3-4 pages)
```

## Output

**One file:** `voice-guide.md`

Contains 8 sections:
1. **Voice Snapshot** - 3 words + archetype + "if we were a person"
2. **Voice Dimensions** - Position on 4 scales with examples
3. **Golden Rules** - 5 core principles with examples
4. **Do/Don't** - Quick reference table (8-10 rows)
5. **Say This/Not That** - Vocabulary guide (8-10 rows)
6. **Before/After Examples** - 5-7 transformations (most valuable)
7. **Channel Quick Reference** - One line per platform
8. **Red Lines** - What to NEVER do

## Why Multi-Agent?

| Single Agent | 5 Specialists |
|--------------|---------------|
| One perspective | 5 specialized perspectives |
| Generalist coverage | Deep expertise per domain |
| May miss nuances | Each specialist focuses fully |
| Sequential | Parallel (faster) |

The **Voice Identity Architect** thinks differently than the **Lexicon Curator**. One focuses on WHO the brand is, the other on the ATOMS of language.

## Quick Start

1. Start the agent:
   ```
   /bmad:voice-forge:agents:voice-director
   ```

2. Select `*generate`

3. Provide:
   - Brand name
   - 3-5 reference URLs
   - Target audience
   - 3-5 personality words
   - Persona name & gender
   - What to avoid

4. Wait for specialists + review + compilation

5. Get ONE file: `voice-guide.md`

## Commands

| Command | Description |
|---------|-------------|
| `*generate` | Generate voice guide (full workflow) |
| `*analyze` | Analyze URLs only (no file output) |
| `*help` | Show menu |
| `*exit` | Exit |

## Module Structure

```
voice-forge/
├── config.yaml
├── README.md
├── agents/
│   ├── voice-director.agent.yaml        # Orchestrator
│   ├── voice-identity-architect.agent.yaml
│   ├── tone-strategist.agent.yaml
│   ├── lexicon-curator.agent.yaml
│   ├── channel-specialist.agent.yaml
│   └── content-exemplar.agent.yaml
├── workflows/
│   └── generate-voice/
│       ├── workflow.yaml
│       ├── instructions.md
│       └── checklist.md
└── data/
    ├── voice-dimensions.md
    ├── brand-archetypes.md
    ├── copywriter-standards.md
    ├── channel-conventions.md
    └── tone-situations.md
```

## Feedback Loop

The Director reviews each specialist's output and can request improvements:

```
Your [section] needs improvement:

ISSUE: Examples are too generic
EXAMPLE: "We help businesses grow" could be any company
FIX: Use specific examples like "We help SaaS founders hit $10k MRR"

Please regenerate with this guidance.
```

**Rules:**
- Maximum 3 feedback rounds per specialist
- Feedback must be SPECIFIC (not "make it better")
- If still weak after 3 rounds, use best version

## Copywriter Standards (Red Lines) - Portuguese BR

Built into ALL generated content:
- **No em-dashes (—)** - signals AI-generated text
- **No gender markers (a)/(o)** - looks automated (choose one gender consistently)
- **No: gratuito, grátis, Pix** - cheapens brand perception
- **No sensationalist headlines** - "do X à Y" transformation patterns
- **No "única/único" claims** - use specific evidence instead

## Reference Data

### Voice Dimensions (NN/g Framework)
- Formal ↔ Casual
- Serious ↔ Funny
- Respectful ↔ Irreverent
- Matter-of-fact ↔ Enthusiastic

### Brand Archetypes (12 Jungian)
Innocent, Explorer, Sage, Hero, Outlaw, Magician, Regular Guy, Lover, Jester, Caregiver, Creator, Ruler

## v2 Changes

| v1 | v2 |
|----|-----|
| 7 output files (~280KB) | 1 output file (~5KB) |
| JSON + Markdown | Markdown only |
| Separate scoring agent | Director reviews directly |
| Generic regeneration | Targeted feedback loop |
| Files saved during process | In-memory until final |

## Tips

1. **Better references = better output.** Pick brands whose voice you genuinely admire.
2. **Be specific about personality.** "Friendly but expert" > "professional"
3. **Name your persona.** Creates more targeted examples.
4. **Use it daily.** Pin it, bookmark it, reference it before publishing.

---

*Voice Forge v2 - Multi-agent quality. Single-file simplicity.*
