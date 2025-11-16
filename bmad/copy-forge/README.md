# Copy Forge

**Where brand authenticity meets conversion science.**

A professional creative studio module that forges landing page copy validated for both authentic brand-audience alignment and conversion effectiveness.

---

## Overview

Copy Forge creates conversion copy that works BECAUSE it's authentically you speaking to authentically them - not generic tactics, but genuine alignment that produces sustainable results.

### Core Philosophy

**Results + Connection**

Most copywriting tools optimize for results without connection (generic high-converting copy) OR connection without results (brand storytelling that doesn't convert). Copy Forge validates BOTH simultaneously through institutional-grade quality assurance.

**What Copy Forge Provides:**

- **8-Agent Professional Studio** - Specialized craftspeople and quality inspectors
- **25-Point Validation System** - Comprehensive quality assurance (7 brand voice + 8 audience + 10 conversion criteria)
- **Sequential Quality Compounding** - Voice → Audience → Effectiveness validation layers build on each other
- **LP Architect Integration** - Seamless blueprint-to-copy workflow
- **Multi-Avatar Support** - Precision targeting for different audience segments

---

## Installation

```bash
# Install Copy Forge module
bmad install copy-forge
```

During installation, you'll configure:
- Output folder for generated copy
- Validation detail level preference
- Default avatar profile

---

## Quick Start

### 1. Prepare Your Inputs

Copy Forge requires three essential inputs:

1. **LP Architect Blueprint** - Structure, word counts, section purposes
2. **Brand Voice Document** - Tone, personality, messaging guidelines
3. **Avatar Profile** - Audience demographics, pain points, desires, language patterns

**Templates & Examples Provided:**
- `bmad/copy-forge/data/brand-voice/TEMPLATE-brand-voice.md` - Template to fill out
- `bmad/copy-forge/data/brand-voice/examples/` - Real-world examples (comprehensive & simplified)
- `bmad/copy-forge/data/avatars/TEMPLATE-avatar-profile.md` - Template to fill out
- `bmad/copy-forge/data/avatars/examples/` - Real-world examples (comprehensive & simplified)

**Tip:** Check the examples folder to see professional brand voice and avatar documentation in action!

### 2. Load the Blueprint Coordinator

```
/bmad:copy-forge:agents:blueprint-coordinator
```

### 3. Generate Your Landing Page Copy

```
*forge-complete-lp
```

The Blueprint Coordinator will:
- Interpret your LP blueprint
- Orchestrate specialized copywriters
- Run sequential validation (Brand Voice Guardian → Avatar Advocate)
- Present complete, validated copy
- Collaborate with you on refinements

---

## Module Components

### Phase 1 - MVP (Current)

**Agents (5):**

1. **Blueprint Coordinator** - Master foreman who orchestrates the studio
2. **Hero Writer** - Specialist in hero section copy
3. **CTA Specialist** - Expert in calls-to-action
4. **Brand Voice Guardian** - Validates voice/branding alignment (7 criteria)
5. **Avatar Advocate** - Validates audience resonance (8 criteria)

**Workflows (3):**

1. **forge-complete-lp** - End-to-end LP copy generation (master workflow)
2. **forge-hero-section** - Generate/regenerate hero section only
3. **forge-cta** - Generate/regenerate call-to-action only

### Phase 2 - Enhancement (Planned)

**Additional Agents (3):**

6. **Story/Narrative Writer** - Master storyteller
7. **Benefits/Features Writer** - Value proposition expert
8. **Conversion Analyst** - Results validator (10 criteria)

**Additional Workflows (5):**

4. **forge-story-section** - Narrative sections
5. **forge-benefits-section** - Benefits/features sections
6. **validate-existing-copy** - Quality check any copy
7-8. Additional modular section workflows

### Phase 3 - Intelligence (Future)

- Learning system (improves over time)
- A/B test prediction
- Competitor analysis integration
- Real-time conversion tracking
- Utility workflows for asset creation

---

## Validation Architecture

### Brand Voice Guardian Checks (7 Dimensions)

- Tone alignment
- Vocabulary choices
- Sentence structure/rhythm
- Personality expression
- Messaging consistency
- Authenticity
- Emotional resonance

### Avatar Advocate Checks (8 Dimensions)

- Language match
- Pain point resonance
- Desire alignment
- Objection handling
- Clarity for audience level
- Relatability
- Emotional connection
- Trust building

### Conversion Analyst Checks (10 Dimensions - Phase 2)

- Clear value proposition
- Compelling hook
- Persuasion framework adherence
- CTA clarity and strength
- Social proof integration
- Urgency/scarcity elements
- Objection elimination
- Logical flow/structure
- Specificity and credibility
- Readability and skimmability

---

## Usage Examples

### Example 1: Complete LP Generation

```
User: Load Blueprint Coordinator
User: *forge-complete-lp
Coordinator: I'll need your LP Architect blueprint, brand voice document, and avatar profile.
User: [Provides documents]
Coordinator: Excellent! Let me interpret these requirements and coordinate our craftspeople...
[Process runs through creation → validation → cohesion → refinement]
Coordinator: Your validated LP copy is ready! It scored 92% on brand voice and 88% on audience alignment. Would you like to review or make any refinements?
```

### Example 2: Hero Section Refinement

```
User: The hero section needs to be punchier
Coordinator: *forge-hero-section
Coordinator: I'll have our Hero Writer create a new version with more punch...
[Hero Writer creates → Validators check → Present]
Coordinator: Here's a more dynamic hero with a stronger hook. How does this feel?
```

---

## Module Structure

```
copy-forge/
├── agents/
│   ├── blueprint-coordinator.md
│   ├── hero-writer.md
│   ├── cta-specialist.md
│   ├── brand-voice-guardian.md
│   └── avatar-advocate.md
├── workflows/
│   ├── forge-complete-lp/
│   ├── forge-hero-section/
│   └── forge-cta/
├── data/
│   ├── brand-voice/           # Your brand voice documents
│   └── avatars/                # Your avatar profiles
├── templates/                  # Copy templates
└── config.yaml                 # Module configuration
```

---

## Configuration

After installation, configure Copy Forge in `bmad/copy-forge/config.yaml`

Key settings:
- `copy_output_folder` - Where generated copy is saved
- `validation_detail_level` - Feedback detail preference
- `default_avatar_profile` - Which avatar to use by default

---

## Development Roadmap

- [x] **Phase 0:** Brainstorming & Module Brief (Completed)
- [x] **Phase 0:** Module Structure Created (Completed)
- [x] **Phase 1:** Build MVP (5 agents + 3 workflows) - COMPLETE! 🎉
  - [x] Blueprint Coordinator agent
  - [x] Hero Writer agent
  - [x] CTA Specialist agent
  - [x] Brand Voice Guardian agent
  - [x] Avatar Advocate agent
  - [x] forge-complete-lp workflow
  - [x] forge-hero-section workflow
  - [x] forge-cta workflow
- [ ] **Phase 2:** Enhancement (8 agents + 8 workflows) - 2-4 weeks
- [ ] **Phase 3:** Intelligence & Learning - Ongoing

---

## Contributing

To extend Copy Forge:

1. **Add new agents:** Use `/bmad:bmb:workflows:create-agent`
2. **Add new workflows:** Use `/bmad:bmb:workflows:create-workflow`
3. **Add new validation criteria:** Update validator agent definitions
4. **Add new LP section types:** Create specialized copywriter agents

---

## Support & Documentation

- **Module Brief:** `/docs/module-brief-conversion-copy-2025-11-10.md`
- **Brainstorming Session:** `/docs/brainstorming-session-results-2025-11-10.md`
- **Architecture Design:** See module brief for complete validation matrix and agent interactions

---

## Philosophy

"In the Copy Forge, we don't just generate words - we forge connections. Every headline is hammered on the anvil of authenticity. Every call-to-action is tempered in the fires of persuasion. Every landing page emerges as a refined tool, purpose-built to connect your brand's truth with your audience's needs."

---

## Author

Created by Daniel on 2025-11-10

**Module Code:** copy-forge
**Module Version:** 1.0.0-alpha
**Status:** In Development (Phase 1)

---

**Forgemaster Achievement:** Generate 10 successful LPs to unlock special recognition!

_Generated with the BMAD Method Module Builder_
