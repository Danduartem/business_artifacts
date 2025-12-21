# Copy Forge

**Landing Page Copy Generator** - Multi-Agent System for Validated Copy

Version: 2.0.0

---

## Overview

Copy Forge is a BMAD module that generates landing page copy validated for both brand authenticity and audience resonance. Powered by 5 specialized AI agents in a sequential pipeline with feedback loop, it creates complete landing pages from blueprints, brand voice, and avatar profiles.

**Key Features:**
- **5 Specialized Agents** - Copywriters + validators in sequential pipeline
- **15-Point Validation** - 7 brand voice + 8 audience resonance criteria
- **Sequential Quality** - Voice → Audience → User validation flow
- **Feedback Loop** - Max 3 rounds per section for quality refinement
- **2-File Output** - Landing page copy + validation report (80/20 rule)
- **No Fake Urgency** - Authentic CTAs only

**Output feeds into:** Design implementation, development

---

## Agents

| Agent | Role |
|-------|------|
| **Blueprint Coordinator** | Orchestrator - coordinates pipeline |
| **Hero Writer** | Copywriter - headlines, subheadlines, hooks |
| **CTA Specialist** | Copywriter - CTAs, friction reduction |
| **Brand Voice Guardian** | Validator - 7-criteria voice check |
| **Avatar Advocate** | Validator - 8-criteria audience check |

---

## Required Inputs

Copy Forge needs three inputs:

1. **LP Architect Blueprint** - Section structure, word counts, purposes
2. **Brand Voice Document** - Tone, vocabulary, personality, messaging
3. **Avatar Profile** - Pain points, desires, objections, language patterns

Templates and examples in `bmad/copy-forge/data/`.

---

## Quick Start

### 1. Launch Blueprint Coordinator

```bash
/bmad:copy-forge:agents:blueprint-coordinator
```

### 2. Generate Complete LP

```
*forge-complete-lp
```

---

## Output

Two files only (80/20 rule):

```
{output_folder}/copy/
├── {brand}-landing-page.md       # Complete validated copy
└── {brand}-validation-report.md  # Scores and feedback
```

---

## Validation System

### Brand Voice Guardian (7 criteria)

All must pass:
1. Tone alignment
2. Vocabulary choices
3. Sentence rhythm
4. Personality expression
5. Messaging consistency
6. Authenticity
7. Emotional resonance

### Avatar Advocate (8 criteria)

All must pass:
1. Language match
2. Pain point resonance
3. Desire alignment
4. Objection handling
5. Clarity level
6. Relatability
7. Emotional connection
8. Trust building

---

## Quality Thresholds

| Metric | Minimum | Blocking? |
|--------|---------|-----------|
| Brand Voice (7/7) | 100% | Yes |
| Audience Resonance (8/8) | 100% | Yes |
| Word Count Tolerance | ±10% | No |

Feedback loop: Max 3 rounds per section.

---

## Workflows

| Workflow | Description |
|----------|-------------|
| `*forge-complete-lp` | Generate complete LP from blueprint |
| `*forge-hero-section` | Generate/regenerate hero section only |
| `*forge-cta` | Generate/regenerate CTA only |

---

## File Structure

```
bmad/copy-forge/
├── _module-installer/
│   └── install-config.yaml
├── agents/
│   ├── blueprint-coordinator.agent.yaml
│   ├── hero-writer.agent.yaml
│   ├── cta-specialist.agent.yaml
│   ├── brand-voice-guardian.agent.yaml
│   └── avatar-advocate.agent.yaml
├── workflows/
│   ├── forge-complete-lp/
│   │   ├── workflow.yaml
│   │   ├── instructions.md
│   │   └── checklist.md
│   ├── forge-hero-section/
│   │   ├── workflow.yaml
│   │   ├── instructions.md
│   │   └── checklist.md
│   └── forge-cta/
│       ├── workflow.yaml
│       ├── instructions.md
│       └── checklist.md
├── data/
│   ├── brand-voice/    # Brand voice docs
│   └── avatars/        # Avatar profiles
├── config.yaml
└── README.md
```

---

## Version History

### 2.0.0 (Current)
- **Simplified Agent Format** - Flat YAML structure (name, version, persona, instructions, spawn_prompt)
- **Declarative Workflows** - Clear phases with quality gates
- **2-File Output** - 80/20 rule (LP copy + validation report)
- **Removed Templates** - Instructions.md now contains all context
- **Added Checklists** - Quality validation per workflow
- **Feedback Loop** - Max 3 rounds for quality

### 1.0.0-alpha
- Initial release with 5 agents
- XML-style workflow DSL
- Multiple output files

---

*Copy Forge v2.0 - Results + Connection = Sustainable Conversion. 2 files. Production ready.*
