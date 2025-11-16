# Stack Advisor

Multi-agent advisory system that delivers modern, stable technical architecture recommendations for small-medium business websites. Provides constraint-aware tech stack selection with detailed documentation, architecture diagrams, comparison matrices, and migration plans—without writing code.

## Overview

Stack Advisor helps solo developers and agencies make smart tech stack decisions. Instead of AI coding with outdated libraries, you get a complete advisory team that:

- Gathers comprehensive requirements
- Researches current, stable frameworks (not 1+ months outdated)
- Designs right-sized architectures (no enterprise over-engineering)
- Validates production-readiness
- Compares alternatives with clear trade-offs
- Documents everything professionally
- Plans safe migrations from current tech

## Installation

```bash
bmad install stack-advisor
```

During installation, you'll configure:
- Output location for deliverables
- Tech currency threshold (how recent frameworks should be)
- Target business scale (micro/small/medium)

## Components

### Agents (7)

**Alex 🤝 - Requirements Analyst**
- Product Manager vibe, collaborative partner
- Commands: `*intake`, `*check`, `*validate`, `*view-stack`
- Gathers business requirements, scale expectations, and constraints

**Scout 🔍 - Tech Research**
- Early Adopter, always current
- Commands: `*filter`, `*materials`, `*check-fresh`, `*research`, `*update`
- Tracks latest stable releases, maintains framework knowledge

**Jordan 🏗️ - Solutions Architect**
- Technical Co-founder, big picture thinker
- Commands: `*blueprint`, `*review`, `*patterns`, `*trade-offs`, `*diagram`
- Designs system architecture, creates diagrams

**Sam 🛡️ - Stack Validator**
- Senior Dev, pragmatic reality check
- Commands: `*validate`, `*compat`, `*smb-check`, `*security`, `*production`
- Pressure tests recommendations, validates SMB-appropriateness

**Dana 📊 - Comparison Analyst**
- Data-Driven, structures decisions
- Commands: `*compare`, `*quick-compare`, `*score`, `*trade-offs`, `*recommend`
- Builds comparison matrices, weighs alternatives

**Casey 📝 - Documentation Specialist**
- Tech Writer Who Codes, clarity-focused
- Commands: `*generate`, `*draft`, `*simplify`, `*rationale`, `*review`
- Compiles deliverables, makes complex simple

**Riley 🔄 - Integration Strategist**
- DevOps Expert, smooth transitions
- Commands: `*migrate`, `*analyze`, `*phases`, `*risks`, `*rollback`
- Plans migration paths, ensures safe transitions

### Workflows (10)

**Core Advisory Workflows:**
1. ✅ **smart-intake** - Comprehensive requirements gathering session
2. ✅ **constraint-filter** - Eliminate incompatible options early
3. ✅ **materials-lab** - Select specific frameworks/libraries
4. ✅ **blueprint-architect** - Design system architecture with diagrams
5. ✅ **comparison-matrix** - Generate detailed trade-off analysis
6. ✅ **migration-plan** - Map current → target migration with phases
7. ✅ **spec-generator** - Compile comprehensive final specification

**Master Orchestration & Reporting:**
8. ✅ **end-to-end-advisory** - Complete 3-6 hour orchestrated advisory session
9. ✅ **executive-summary** - High-level stakeholder summaries (4-8 pages)
10. ✅ **cost-analysis** - Comprehensive TCO and financial projections

### Tasks

None currently - workflows handle the advisory flow

## Quick Start

### 1. Load the main agent

```
agent alex
```

### 2. Start requirements gathering

```
*intake
```

This launches the Smart Intake Session to gather:
- Business requirements and goals
- Current tech stack (if applicable)
- Scale expectations
- Constraints (team, budget, timeline)

### 3. Work with specialist agents

After intake, consult specialists:

**Research latest tech:**
```
agent scout
*research
```

**Design architecture:**
```
agent jordan
*blueprint
```

**Validate choices:**
```
agent sam
*validate
```

**Compare alternatives:**
```
agent dana
*compare
```

**Get final documentation:**
```
agent casey
*generate
```

**Plan migration:**
```
agent riley
*migrate
```

## Module Structure

```
stack-advisor/
├── agents/                           # 7 agent definitions
│   ├── requirements-analyst.agent.yaml
│   ├── tech-research.agent.yaml
│   ├── tech-research-sidecar/       # Scout's knowledge base
│   │   └── knowledge/
│   │       └── framework-database.md  # 100+ frameworks
│   ├── solutions-architect.agent.yaml
│   ├── stack-validator.agent.yaml
│   ├── comparison-analyst.agent.yaml
│   ├── documentation-specialist.agent.yaml
│   └── integration-strategist.agent.yaml
│
├── workflows/                        # 10 complete workflows
│   ├── smart-intake/                # Requirements gathering
│   ├── constraint-filter/           # Eliminate incompatible options
│   ├── materials-lab/               # Technology selection
│   ├── blueprint-architect/         # Architecture design + diagrams
│   ├── comparison-matrix/           # Technology comparison
│   ├── migration-plan/              # Migration planning
│   ├── spec-generator/              # Final specification
│   ├── end-to-end-advisory/         # Master orchestration
│   ├── executive-summary/           # Stakeholder summaries
│   └── cost-analysis/               # TCO & financial projections
│
├── data/                             # Reference data & frameworks
│   ├── framework-database.md        # (also in Scout's knowledge)
│   ├── validation-rules.yaml        # 100+ validation rules
│   ├── decision-criteria.yaml       # Decision framework
│   ├── stack-patterns.yaml          # 15+ proven stacks
│   ├── compatibility-matrix.yaml    # Technology compatibility
│   └── decision-playbooks/          # 8 decision trees
│       ├── frontend-framework.yaml
│       ├── backend-language.yaml
│       ├── database-selection.yaml
│       ├── hosting-platform.yaml
│       ├── authentication-strategy.yaml
│       ├── architecture-pattern.yaml
│       ├── rendering-strategy.yaml
│       └── build-vs-buy.yaml
│
├── tools/                            # API integrations
│   ├── npm-version-checker.md       # Query npm for current versions
│   └── pypi-version-checker.md      # Query PyPI for current versions
│
├── _module-installer/                # Installation config
│   └── install-config.yaml
│
├── README.md                         # This file
├── QUICKSTART.md                     # Getting started guide
└── TODO.md                           # Development roadmap
```

## Configuration

After installation, the module can be configured in `bmad/stack-advisor/config.yaml`

**Key settings:**
- `output_location` - Where deliverables are saved
- `tech_currency_threshold` - How recent frameworks should be (2-weeks/1-month/3-months)
- `smb_scale_level` - Target business scale (micro/small/medium)

## Deliverables

Stack Advisor produces comprehensive documentation for your technology decisions:

**Core Technical Documents:**
1. **Technology Stack Specification** (30-50 pages) - Complete recommendations with rationale, architecture, implementation roadmap
2. **Architecture Blueprint** (15-25 pages) - System design, component architecture, data flow, deployment diagrams (Mermaid)
3. **Comparison Matrix** (10-15 pages) - Detailed alternatives analysis with weighted scoring and trade-offs
4. **Migration Plan** (20-30 pages) - Phased migration roadmap with risks, rollback strategies, and timeline

**Business & Financial Documents:**
5. **Executive Summary** (4-8 pages) - High-level overview for stakeholders, board, or investors
6. **Cost Analysis** (15-25 pages) - 3-year TCO, scaling projections, break-even analysis, optimization recommendations

**Supporting Artifacts:**
7. **Requirements Document** - Project overview, constraints, success criteria from intake session
8. **Technology Selection Report** - Filtered and selected technologies with validation results

All documents are professional quality, ready for stakeholder presentation or client delivery.

## Example Use Cases

### Use Case 1: New E-commerce Site (Greenfield)

1. Run `*intake` with Alex - gather requirements
2. Consult Scout - research current e-commerce stacks
3. Work with Jordan - design architecture
4. Validate with Sam - ensure SMB-appropriate
5. Compare options with Dana - Stripe vs PayPal, etc.
6. Generate docs with Casey - final deliverables

**Result:** Complete tech stack recommendation with clear rationale

### Use Case 2: Migrating Legacy Site

1. Run `*intake` with Alex - document current stack and pain points
2. Scout researches modern alternatives
3. Jordan designs target architecture
4. Riley plans phased migration
5. Sam validates migration risks
6. Casey documents everything

**Result:** Safe migration plan with rollback strategies

### Use Case 3: Agency Client Project

1. Intake session captures client needs
2. Scout finds frameworks matching team skills
3. Jordan designs scalable architecture
4. Dana compares hosting options
5. Sam validates security requirements
6. Casey creates client-ready documentation

**Result:** Professional tech stack proposal for client approval

### Use Case 4: Complete Advisory Session (End-to-End)

1. Run `/end-to-end-advisory` workflow
2. Guided through all 5 phases automatically:
   - Phase 1: Requirements (Alex)
   - Phase 2: Research & Selection (Scout)
   - Phase 3: Architecture (Jordan)
   - Phase 4: Validation (Sam & Dana)
   - Phase 5: Documentation (Casey & Riley)
3. All 8 deliverables created in one session

**Result:** Complete technology stack advisory in 3-6 hours with all professional documentation

### Use Case 5: Stakeholder Approval Package

After completing advisory:
1. Run `/executive-summary` - Create 4-8 page business summary
2. Run `/cost-analysis` - Generate comprehensive TCO and budget
3. Present both to executives/board for approval

**Result:** Business-ready documentation for confident decision-making

## What's New in v2.0

**All phases complete!** Stack Advisor is production-ready with comprehensive capabilities:

### ✅ Phase 1: Core Workflows (Complete)
- All 7 core workflows operational
- Each agent has their signature workflow commands
- Complete documentation and templates

### ✅ Phase 2: Templates & Data (Complete)
- 100+ frameworks in knowledge base
- 100+ validation rules
- Complete decision criteria framework
- All templates for 8 document types

### ✅ Phase 3: Enhanced Features (Complete)
- npm/PyPI API integration guides for version checking
- Stack patterns library (15+ proven stacks)
- Decision playbooks (8 comprehensive guides)
- Compatibility matrix with known conflicts
- SMB-focused validation throughout

### ✅ Phase 4: Master Orchestration (Complete)
- End-to-end advisory workflow (3-6 hour sessions)
- Executive summary generator
- Comprehensive cost analysis with TCO
- Professional reporting for all stakeholder types

### Future Enhancements (Optional)
- Live integration with npm/PyPI APIs (currently manual)
- Security vulnerability scanning integration
- Performance benchmarking data
- Community-contributed stack patterns
- Video walkthrough library

## Quick Commands

**Create additional workflows:**
```
workflow create-workflow
```

**Test existing workflow:**
```
workflow smart-intake
```

## Contributing

To extend this module:

1. Add new agents using `workflow create-agent`
2. Add new workflows using `workflow create-workflow`
3. Update framework database in `data/`
4. Enhance templates in `templates/`

## Module Principles

**Stack Advisor operates on these core beliefs:**

1. **Always Current** - Recommendations stay current (not 1+ months outdated)
2. **SMB-Appropriate** - Right-sized for small/medium business (no enterprise over-engineering)
3. **Constraint-Aware** - Adapts to existing tools, team skills, budget realities
4. **Planning-First** - Advisory before coding (no premature implementation)
5. **Specific & Actionable** - Clear recommendations with rationale (no ambiguity)
6. **Production-Ready** - Stable, proven technologies (not bleeding edge experiments)

## Author

Created by Daniel

## Version

**2.0.0** (2025-01-14) - Complete production release
- All 10 workflows operational
- Comprehensive data infrastructure (100+ frameworks, 100+ rules, 15+ patterns, 8 playbooks)
- Master orchestration and enhanced reporting
- Production-ready for professional stack advisory services

**1.0.0** (2025-11-13) - Initial release
- 7 agents and foundation structure
- 1 workflow (smart-intake)
