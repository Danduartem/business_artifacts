# Landing Page Architect

**Version:** 1.0.0
**Module Code:** lp-architect
**Type:** Standard Module

---

## Overview

Landing Page Architect is an intelligent conversion advisory system that generates research-backed landing page architecture blueprints tailored to your specific business context. Using 4-agent collaboration, 3D matrix analysis, and conversion science, this module delivers strategic architecture recommendations that maximize conversion potential.

## Core Value Proposition

**Intelligence over Templates**

Unlike generic template libraries, Landing Page Architect provides:
- **Dynamic blueprints** that adapt based on your awareness level, price point, and complexity
- **Strategic rationale** explaining WHY each section works for YOUR context
- **Niche research** showing what actually converts in your industry
- **Persona psychology** ensuring your architecture resonates with your audience
- **Competitive intelligence** identifying differentiation opportunities

## The 4-Agent Expert Team

### 📊 Conversion Strategist
**Role:** Strategic validation and conversion education

**Expertise:**
- 7 fundamental conversion principles
- 5-step conversion sequence
- 3D matrix intelligence
- Evidence-backed recommendations

**Voice:** "Let me show you what the data says..."

---

### 🔍 Agent Cipher
**Role:** Competitive intelligence and niche research

**Expertise:**
- Competitor analysis
- Niche-specific conversion patterns
- Benchmark data and performance expectations
- Differentiation strategy

**Voice:** "I've cracked the code on what converts in your space..."

---

### 💭 The Whisperer
**Role:** Persona psychology analyst

**Expertise:**
- Deep persona psychology analysis
- Unspoken fears and desires
- Hidden objections mapping
- Emotional trigger identification

**Voice:** "Your customers won't say this, but they're thinking..."

---

### 🎬 Director Arc
**Role:** Architecture blueprint director

**Expertise:**
- Journey design and narrative flow
- Section sequencing strategy
- Blueprint synthesis and creation
- Progressive revelation principles

**Voice:** "Here's how we guide them from stranger to customer..."

## The 3D Matrix Framework

Landing Page Architect uses a 3-dimensional intelligence framework to determine optimal architecture:

### Dimension 1: Awareness Level
- **Unaware** - Don't know problem exists (needs problem education)
- **Problem-aware** - Know problem, seeking solutions (needs solution education)
- **Solution-aware** - Know solution types, comparing options (needs differentiation)
- **Product-aware** - Know your brand, considering purchase (needs objection removal)

### Dimension 2: Price Tier
- **Low ($0-$50)** - Minimal proof needed, short architecture
- **Medium ($50-$500)** - Solid credibility, moderate proof
- **High ($500+)** - Extensive trust-building, deep proof layers

### Dimension 3: Complexity
- **Simple** - Easy to understand, straightforward value
- **Moderate** - Some explanation needed
- **Complex** - Requires detailed breakdown and education

**Matrix Intelligence:**
- **Easy Mode** (Product-aware + Low + Simple) = 4-5 sections
- **Standard** (Solution-aware + Medium + Moderate) = 6-8 sections
- **Expert Mode** (Unaware + High + Complex) = 12-15 sections

## Core Workflow

### generate-architecture

**Purpose:** Generate complete landing page architecture blueprint

**Process:**
1. Gather business context (niche, offer, persona, price)
2. Determine 3D matrix position
3. Agent Cipher: Competitive research
4. The Whisperer: Persona psychology analysis
5. Conversion Strategist: Strategic validation
6. Director Arc: Blueprint creation
7. Two-layer validation (agents + user)
8. Final deliverable generation

**Duration:** 20-40 minutes
**Output:** Complete architecture blueprint with strategic rationale

**Invoke:** `/generate-architecture`

## Key Features

### ✅ Intelligence-Driven Architecture
- Adapts to your specific business context
- Not one-size-fits-all templates
- Context-aware recommendations

### ✅ Research-Backed Recommendations
- Competitive intelligence analysis
- Niche-specific conversion patterns
- Performance benchmarks and expectations

### ✅ Persona-Centric Design
- Psychology-driven section placement
- Emotional trigger mapping
- Objection handling strategy

### ✅ Educational Approach
- Learn conversion principles while building
- Understand the "why" behind every decision
- Become smarter about optimization

### ✅ Two-Layer Validation
- Internal agent review (strategic quality)
- User confirmation (contextual accuracy)
- High-confidence final blueprints

### ✅ Clear Scope Boundaries
- Strategic architecture only (no design, no copy, no code)
- Focus on WHAT sections and WHY
- Hand off to execution teams

## Target Users

### Solo Entrepreneurs/Founders
**Needs:** Education, hand-holding, confidence
**Benefit:** Learn conversion principles while building first landing page

### Agencies/Consultants
**Needs:** Speed, professionalism, client-ready deliverables
**Benefit:** Research-backed blueprints with strategic rationale for clients

### Established Businesses
**Needs:** Performance, competitive advantage, ROI focus
**Benefit:** Data-driven redesigns that beat industry benchmarks

## Installation

### Requirements
- BMAD Core module installed
- Node.js (for installer)
- Project initialized with BMAD

### Install Steps

1. Run BMAD installer in your project:
   ```bash
   npm run install-bmad
   ```

2. Select "Landing Page Architect" from module list

3. Configure during installation:
   - Blueprint output location
   - Detail level preference
   - Research depth preference

4. Installer will:
   - Copy module files to `bmad/lp-architect/`
   - Compile 4 agents to .md format
   - Register workflows
   - Create config.yaml with your settings

### Verification

After installation:
```bash
# Verify agents are compiled
ls bmad/lp-architect/agents/*.md

# Should show:
# - conversion-strategist.md
# - agent-cipher.md
# - the-whisperer.md
# - director-arc.md

# Verify workflow is available
/generate-architecture
```

## Usage Guide

### Quick Start

1. **Prepare your inputs:**
   - Define your target persona
   - Know your offer details and price
   - Understand your niche/industry

2. **Run the workflow:**
   ```
   /generate-architecture
   ```

3. **Follow the guided process:**
   - Answer context questions
   - Review research findings
   - Validate architecture decisions
   - Confirm final blueprint

4. **Receive deliverable:**
   - Complete architecture blueprint
   - Strategic rationale for each section
   - Implementation guidance
   - Success metrics

### Best Practices

**Before You Start:**
- Have target persona documented (demographics, psychographics, behaviors)
- Know your price point and offer complexity
- Identify 2-3 main competitors (optional but helpful)

**During the Process:**
- Be specific in your responses (avoid vague descriptions)
- Share context agents might not know
- Validate decisions at checkpoints
- Ask questions if unclear

**After Blueprint Delivery:**
- Review with your execution team (designer, copywriter, developer)
- Use strategic rationale to guide implementation
- Reference "why" sections to maintain conversion focus
- Track recommended success metrics

### Standalone Agent Access

All 4 agents can be invoked directly for consultation:

**Conversion Strategist:**
- `/bmad/lp-architect/agents/conversion-strategist.md`
- Commands: *explain-principles, *validate-concept, *matrix-guide, *conversion-research

**Agent Cipher:**
- `/bmad/lp-architect/agents/agent-cipher.md`
- Commands: *analyze-competitors, *niche-patterns, *benchmark-data, *differentiation-strategy

**The Whisperer:**
- `/bmad/lp-architect/agents/the-whisperer.md`
- Commands: *analyze-persona, *map-objections, *emotional-triggers, *persona-resonance-check

**Director Arc:**
- `/bmad/lp-architect/agents/director-arc.md`
- Commands: *explain-journey, *section-sequencing, *review-architecture, *quick-blueprint

## Module Structure

```
bmad/lp-architect/
├── agents/                          # 4 expert agents
│   ├── conversion-strategist.agent.yaml
│   ├── conversion-strategist.md     (compiled)
│   ├── agent-cipher.agent.yaml
│   ├── agent-cipher.md              (compiled)
│   ├── the-whisperer.agent.yaml
│   ├── the-whisperer.md             (compiled)
│   ├── director-arc.agent.yaml
│   └── director-arc.md              (compiled)
├── workflows/
│   └── generate-architecture/       # Core workflow
│       ├── workflow.yaml
│       ├── instructions.md
│       ├── template.md
│       ├── checklist.md
│       └── README.md
├── tasks/                           # Support tasks
│   ├── matrix-calculator.xml
│   ├── validation-framework.xml
│   └── niche-research-protocol.xml
├── _module-installer/               # Installation config
│   └── install-config.yaml
├── config.yaml                      (generated at install)
└── README.md                        (this file)
```

## Configuration

After installation, your config is at: `bmad/lp-architect/config.yaml`

**Generated Configuration:**
```yaml
# Inherited from installer
user_name: [Your Name]
communication_language: [Your Language]
document_output_language: [Your Language]
output_folder: [Your Output Folder]

# Module-specific
blueprint_output_folder: [Where blueprints are saved]
detail_level: [standard|detailed|concise]
research_depth: [quick|standard|comprehensive]
module_version: 1.0.0
```

## Troubleshooting

### "I don't have a persona defined"
**Solution:** The workflow requires a target persona as input. Either:
- Use a persona development tool first
- Provide basic demographics/psychographics to start
- The Whisperer can help analyze what you know

### "The research phase takes too long"
**Solution:** Adjust research_depth in config:
- `quick` - 15-20 minutes (top 3-5 competitors)
- `standard` - 30-40 minutes (recommended)
- `comprehensive` - 60+ minutes (extensive)

### "Architecture doesn't feel right for my audience"
**Solution:** This is exactly what Layer 2 validation catches:
- Share context at confirmation checkpoints
- Agents will refine based on your insights
- Your knowledge + their intelligence = accurate blueprint

### "Can I use this for blog posts or product pages?"
**Solution:** No - this module is specifically for conversion-focused landing pages. Other page types have different requirements.

## Roadmap

### Future Enhancements (v2.0)
- Alternative architecture versions (A/B testing recommendations)
- Copywriting angle suggestions (strategic messaging directions)
- Implementation guides (wireframe notes, designer briefs)
- Expanded niche database (more specialized industries)
- Post-launch optimization workflow

## Support & Feedback

**Issues:** Report at github.com/anthropics/claude-code/issues
**Documentation:** docs.claude.com/claude-code
**Module Version:** 1.0.0

## License

Part of the BMAD ecosystem. See main BMAD license for details.

---

**Landing Page Architect** - Intelligence over Templates, Strategy over Guesswork

*Powered by 4-agent collaboration, 3D matrix intelligence, and conversion science*
