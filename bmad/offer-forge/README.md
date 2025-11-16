# Offer Forge

**Transform customer intelligence into irresistible offer stacks**

Version: 1.0.0 (MVP)
Category: Business/Marketing - Offer Development
Complexity: Standard Module

---

## Overview

**Offer Forge** is a business offer creation system that complements Persona Forge by designing clear, conversion-optimized offer stacks with strategic pricing and compelling messaging. The module helps businesses create structured offers (entry/core/premium tiers) that guide customer ascension and maximize conversions.

### What It Solves

- Unclear value articulation in offers
- Low conversion offers that don't resonate
- Generic positioning without differentiation
- Confused messaging that fails to convert
- Lack of structured offer stacks

### How It Works

A 5-agent system works collaboratively to:
1. **Design** complete offer stack structure
2. **Enhance** with transformation-focused messaging
3. **Optimize** pricing using psychology and market positioning
4. **Validate** against conversion criteria
5. **Generate** ready-to-use deliverables

---

## Installation

```bash
# Installation handled by BMAD installer
# Module will be available after BMAD Method installation
```

The module installs to: `{project-root}/bmad/offer-forge/`

---

## Components

### Agents (5)

**1. Offer Forge** (Hub/Orchestrator)
- Main gateway and menu system
- Professional, efficient, direct consultant style
- Commands: `*create`, `*update`, `*validate`, `*help`, `*exit`

**2. Offer Architect** (Specialist)
- Designs complete offer stack structure (all 12 elements)
- Visionary designer personality
- Handles: Structure, features, value ladder, competitive research, initial pricing

**3. Value Proposition Specialist** (Specialist)
- Crafts transformation promises and compelling messaging
- Master storyteller personality
- Handles: Transformation promises, USPs, objection handling, awareness-level messaging

**4. Pricing Strategist** (Specialist)
- Optimizes pricing for conversion and profitability
- Hybrid personality: Psychology + Strategy + Economics
- Handles: Market validation, pricing psychology, guarantees, payment structures

**5. Senior Offer Specialist** (Validator)
- Quality validation with approval/rejection feedback
- Hybrid personality: Conversion + Experience
- Validates: 8 criteria including coherence, differentiation, conversion potential

### Workflows

**Core Workflows (MVP):**

**1. CREATE - Build New Offer Stack** ⭐
- Create complete offer stack from scratch or enhance existing offer
- 6-phase workflow through all specialist agents
- Duration: 45-75 minutes
- Output: 4 core deliverables

**Feature Workflows (V2+):**
- UPDATE - Refresh existing offers
- VALIDATE - Quality check offers
- COMPARE - A/B test variations
- OPTIMIZE - Targeted improvements
- AUDIT-COMPETITOR - Competitive intelligence

---

## Quick Start

### 1. Load the Offer Forge Agent

```
@bmad/offer-forge/agents/offer-forge.md
```

### 2. View Available Commands

```
*help
```

### 3. Create Your First Offer Stack

```
*create
```

Follow the guided workflow through 6 phases:
1. **Context Gathering** - Answer questions about your business and offer
2. **Architect Draft** - Review complete offer structure
3. **Value Prop Enhancement** - Review compelling messaging
4. **Pricing Optimization** - Review psychologically optimized pricing
5. **Quality Validation** - Automatic validation against 8 criteria
6. **Deliverables** - Receive 4 ready-to-use documents

---

## Deliverables

The CREATE workflow generates **4 core deliverables**:

### 1. Complete Offer Stack Document
12-section master document including:
- Executive Summary
- Offer Stack Overview (visual diagram)
- Detailed Tier Breakdowns
- Transformation Promises
- Pricing Strategy & Rationale
- Competitive Differentiation
- Objection Handling
- Qualification Criteria
- Cross-sell/Upsell Paths
- Messaging Variations
- Guarantee/Risk-Reversal
- Value Ladder Logic

### 2. Individual Offer Sheets
- Sales-ready one-pagers for each tier
- Instantly usable in sales conversations
- Clear value differentiation

### 3. Pricing Strategy Document
- Pricing rationale and psychology
- Payment structure options
- Competitive positioning
- Price-value optimization

### 4. Objection Handling Guide
- Pre-emptive responses to common hesitations
- Conversion-critical messaging
- Tier-specific objection handling

---

## Core Methodologies

Offer Forge is built on 3 proven frameworks:

### 1. Value Ladder Construction (5 Principles)
- Clear transformation at each tier
- Natural progression between tiers
- Support level increases (self-serve → done-with-you → done-for-you)
- 3-5x pricing jumps for psychological anchoring
- Increasing access/intimacy (group → small group → 1-on-1)

### 2. Pricing Psychology Framework (5 Techniques)
- Decoy Effect (middle tier makes premium irresistible)
- Anchoring Effect (show premium first)
- Tiered Pricing Visual Comparison
- Payment Plan Psychology
- Price Framing ("only $X/day")

### 3. Awareness-Level Mapping
Maps offers to Eugene Schwartz's 5 Levels of Customer Awareness:
- **Entry Tier** → Solution Aware & Product Aware (Levels 3-4)
- **Core Tier** → Product Aware & Most Aware (Levels 4-5)
- **Premium Tier** → Most Aware (Level 5)

---

## Philosophical Foundation

### The 4 Foundational Truths

Every decision in Offer Forge aligns with these core principles:

1. **Identity Alignment** - People buy offers that match who they want to become, not just what they want to have
2. **Before/After Gap** - The bigger and clearer the transformation gap, the more irresistible the offer
3. **Clarity Principle** - Confusion kills conversion; crystal clear offers drive decisions
4. **Trust Currency** - Without trust, no offer works; with trust, almost any offer can work

---

## Integration with Persona Forge

### Current (MVP)
- Optional manual loading of Persona Forge documents
- Paste persona file path when prompted
- Persona data informs offer design

### Future (V2)
- **Persona-to-Offer Pipeline** - Seamless handoff from Persona Forge
- At end of Persona Forge CREATE workflow, option to launch Offer Forge
- Automatic data transfer: awareness levels, pain points, language, transformations

---

## Module Structure

```
bmad/offer-forge/
├── agents/
│   ├── offer-forge.md
│   ├── offer-architect.md
│   ├── value-proposition-specialist.md
│   ├── pricing-strategist.md
│   └── senior-offer-specialist.md
├── workflows/
│   ├── create-offer-stack/
│   ├── update-offer/          (V2)
│   ├── validate-offer/        (V2)
│   ├── compare-offers/        (V2)
│   ├── optimize-offer/        (V2)
│   └── audit-competitor/      (Moonshot)
├── templates/
│   ├── offer-stack-document.md
│   ├── offer-sheet-template.md
│   ├── pricing-strategy-document.md
│   └── objection-handling-guide.md
├── data/
├── config.yaml
└── README.md
```

---

## Configuration

Module configuration is stored in `bmad/offer-forge/config.yaml`

### Key Settings

- `module_version`: Current version (1.0.0)
- `data_path`: Module data location
- `templates_path`: Deliverable templates location
- `user_name`: Inherited from BMAD core
- `communication_language`: Inherited from BMAD core
- `output_folder`: Where offer documents are saved (inherited)

---

## Examples

### Example 1: Consultant Creating Service Tiers

**Input:** Generic "consulting services" offer

**Process:**
1. Describe business and current offer
2. Choose 3-tier structure
3. Review drafted stack: Entry (group program), Core (small cohort), Premium (1-on-1)
4. Review enhanced messaging with transformation promises
5. Review optimized pricing: $997 / $4,997 / $19,997
6. Receive 4 deliverables

**Outcome:** Complete, conversion-optimized 3-tier consulting stack ready to deploy

### Example 2: Pizza Delivery Enhancing Offer

**Input:** Existing "pizza delivery" service

**Process:**
1. Indicate having existing offer to enhance
2. Architect builds around it
3. Entry: Single pizza delivery
4. Core: Family meal bundles + priority delivery
5. Premium: Catering service + dedicated account manager

**Outcome:** Transformed commodity into structured offer stack

---

## Development Roadmap

### Phase 1: MVP (Current - v1.0.0)
- ✅ 5-agent system operational
- ✅ CREATE workflow complete
- ✅ Core 4 deliverables
- ✅ 3 core methodologies embedded

### Phase 2: Enhancement (v2.0.0)
- 🔮 Persona-to-Offer Pipeline integration
- 🔮 Enhancement mode for existing offers
- 🔮 Conversational discovery (AI-led questions)
- 🔮 Optional advanced deliverables
- 🔮 UPDATE workflow

### Phase 3: Polish (v3.0.0+)
- 🚀 Complete workflow suite (7-8 workflows)
- 🚀 E-commerce checkout intelligence
- 🚀 Performance optimizations
- 🚀 Multi-persona offer stacks

---

## Contributing

To extend this module:

1. **Add new agents** using `bmad/bmb/workflows/create-agent`
2. **Add new workflows** using `bmad/bmb/workflows/create-workflow`
3. **Test thoroughly** with real business scenarios
4. **Document** all changes in this README

---

## Support

For issues or questions:
- Review the Module Brief: `docs/module-brief-offer-forge-2025-11-04.md`
- Review brainstorming session: `docs/brainstorming-session-results-2025-11-04.md`
- Check agent documentation in `agents/` directory
- Review workflow instructions in `workflows/*/instructions.md`

---

## Author

Created by **Daniel** on 2025-11-04
Source: 150+ ideas from comprehensive brainstorming session
Built using the BMAD Method Module Builder

---

## License

Part of the BMAD Method ecosystem
For use within BMAD-compatible projects

---

_"Transform customer insights into irresistible offer stacks"_
