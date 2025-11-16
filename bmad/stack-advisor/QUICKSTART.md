# Stack Advisor Quick Start Guide

Get started with Stack Advisor in 5 minutes. This guide walks you through your first technology stack advisory session.

## Prerequisites

**Already installed Stack Advisor?**
```bash
bmad install stack-advisor
```

If not, install it first, then return to this guide.

---

## Choose Your Path

### Path 1: Complete Advisory Session (Recommended for First Time)

**Best for:** Getting the full Stack Advisor experience
**Time:** 3-6 hours
**Deliverables:** All 8 documents

[Jump to Complete Advisory](#path-1-complete-advisory-session)

### Path 2: Quick Consultation (Single Topic)

**Best for:** Specific questions or focused needs
**Time:** 30-90 minutes
**Deliverables:** 1 document

[Jump to Quick Consultation](#path-2-quick-consultation)

### Path 3: Individual Workflows (Piecemeal Approach)

**Best for:** Experienced users who know what they need
**Time:** Varies by workflow
**Deliverables:** As needed

[Jump to Individual Workflows](#path-3-individual-workflows)

---

## Path 1: Complete Advisory Session

The **end-to-end advisory** workflow orchestrates all 7 agents through a complete technology stack advisory process.

### Step 1: Launch the Workflow

```
/end-to-end-advisory
```

or

```
workflow end-to-end-advisory
```

### Step 2: Follow the 5 Phases

The workflow will guide you through:

**Phase 1: Discovery & Requirements** (30-60 min)
- Alex gathers your project requirements
- Documents constraints and priorities
- Sets success criteria

**Phase 2: Research & Filtering** (45-90 min)
- Scout eliminates incompatible options
- Researches current frameworks
- Helps you select specific technologies

**Phase 3: Architecture & Design** (60-120 min)
- Jordan designs your system architecture
- Creates Mermaid diagrams
- Documents component structure

**Phase 4: Validation & Comparison** (30-60 min)
- Sam validates your choices
- Dana compares alternatives (optional)
- Risk assessment

**Phase 5: Documentation & Migration** (60-90 min)
- Riley creates migration plan (if migrating)
- Casey generates final specification
- All deliverables compiled

### Step 3: Review Deliverables

At the end, you'll have:
- ✅ Project Requirements Document
- ✅ Filtered Technology Options
- ✅ Technology Stack Selections
- ✅ System Architecture Design (with diagrams)
- ✅ Validation Report
- ✅ Comparison Matrix (if created)
- ✅ Migration Plan (if migrating)
- ✅ Complete Technology Stack Specification

### Step 4: Create Executive Summary & Cost Analysis

After completing the main advisory:

**Executive Summary** (for stakeholders):
```
/executive-summary
```

**Cost Analysis** (financial projections):
```
/cost-analysis
```

---

## Path 2: Quick Consultation

### Scenario 1: "Which framework should I use?"

**Talk to Scout:**
```
agent scout
```

Then ask:
```
I'm building a [type of project]. Should I use [technology A] or [technology B]?
```

Scout will:
- Research both options
- Compare based on your needs
- Recommend best fit for SMB scale
- Explain the rationale

**Time:** 15-30 minutes

---

### Scenario 2: "How should I architect this?"

**Talk to Jordan:**
```
agent jordan
```

Then:
```
*blueprint
```

Or just describe your project and ask for architecture advice.

Jordan will:
- Design system architecture
- Create diagrams
- Recommend patterns
- Document component structure

**Time:** 30-60 minutes (full blueprint) or 15-30 minutes (quick advice)

---

### Scenario 3: "Is this stack a good idea?"

**Talk to Sam:**
```
agent sam
```

Then describe your stack or share your technology choices.

Sam will:
- Validate against SMB best practices
- Check for common pitfalls
- Assess production readiness
- Flag risks

**Time:** 15-30 minutes

---

### Scenario 4: "What will this cost?"

**Talk to Morgan (via cost-analysis workflow):**
```
/cost-analysis
```

Or talk to Morgan directly:
```
agent morgan
```

Morgan will:
- Break down all costs
- Project 3-year TCO
- Show scaling costs
- Identify optimization opportunities

**Time:** 60-90 minutes (full analysis) or 20-30 minutes (estimate)

---

### Scenario 5: "How do I migrate from my current stack?"

**Talk to Riley:**
```
agent riley
*migrate
```

Riley will:
- Analyze current stack
- Design migration phases
- Identify risks
- Create rollback strategies

**Time:** 60-90 minutes (full plan) or 20-30 minutes (overview)

---

## Path 3: Individual Workflows

Run specific workflows when you know exactly what you need:

### Requirements Gathering
```
/smart-intake
```
or
```
agent alex
*intake
```

**Output:** Requirements Document
**Time:** 30-60 minutes

---

### Filter Technologies
```
/constraint-filter
```
or
```
agent scout
*filter
```

**Output:** Filtered Options List
**Time:** 20-40 minutes

---

### Select Technologies
```
/materials-lab
```
or
```
agent scout
*materials
```

**Output:** Technology Stack Selections
**Time:** 45-90 minutes

---

### Design Architecture
```
/blueprint-architect
```
or
```
agent jordan
*blueprint
```

**Output:** Architecture Blueprint (15-25 pages)
**Time:** 60-120 minutes

---

### Compare Options
```
/comparison-matrix
```
or
```
agent dana
*compare
```

**Output:** Comparison Matrix (10-15 pages)
**Time:** 60-90 minutes

---

### Plan Migration
```
/migration-plan
```
or
```
agent riley
*migrate
```

**Output:** Migration Plan (20-30 pages)
**Time:** 90-180 minutes

---

### Generate Specification
```
/spec-generator
```
or
```
agent casey
*generate
```

**Output:** Tech Stack Specification (30-50 pages)
**Time:** 90-150 minutes

---

### Executive Summary
```
/executive-summary
```

**Output:** Executive Summary (4-8 pages)
**Time:** 20-40 minutes

---

### Cost Analysis
```
/cost-analysis
```

**Output:** Cost Analysis (15-25 pages)
**Time:** 60-90 minutes

---

## Common Workflows for Different Needs

### For Startups Seeking Funding

1. `/end-to-end-advisory` - Complete stack advisory
2. `/executive-summary` - For investors/board
3. `/cost-analysis` - Financial projections

**Total Time:** 4-7 hours
**Deliverables:** Complete package for investor presentation

---

### For Agency Proposals

1. `/smart-intake` - Capture client requirements
2. `/materials-lab` - Select technologies
3. `/blueprint-architect` - Design architecture
4. `/cost-analysis` - Project costs
5. `/spec-generator` - Create proposal

**Total Time:** 4-6 hours
**Deliverables:** Client-ready proposal

---

### For Migrating Existing Systems

1. `/smart-intake` - Document current state
2. `/materials-lab` - Select target stack
3. `/migration-plan` - Plan the migration
4. `/cost-analysis` - Migration costs

**Total Time:** 3-5 hours
**Deliverables:** Complete migration plan

---

### For Quick Technology Decisions

1. Talk to Scout directly - "Should I use X or Y?"
2. Quick validation with Sam
3. Done in 30-60 minutes

**For detailed comparison:**
1. `/comparison-matrix` with Dana

---

## Tips for Success

### 1. Start with Requirements

Always begin with `/smart-intake` or talk to Alex first. Clear requirements lead to better recommendations.

### 2. Be Specific

Instead of: "I need a website"
Say: "I'm building an e-commerce site for handmade goods, expecting 100-1000 users in first year, solo developer, $5k budget"

### 3. Trust the Process

The end-to-end advisory takes 3-6 hours for a reason - comprehensive analysis takes time. The deliverables are worth it.

### 4. Ask Questions

All agents are conversational. If something is unclear, ask! They'll explain their reasoning.

### 5. Save Everything

All documents are saved to your configured output folder. Keep them for reference and updates.

### 6. Iterate

Come back to Stack Advisor as your project evolves. Re-run workflows when requirements change.

---

## Troubleshooting

### "Which agent should I talk to?"

- **Requirements?** → Alex
- **Research frameworks?** → Scout
- **Architecture design?** → Jordan
- **Validate choices?** → Sam
- **Compare alternatives?** → Dana
- **Final documentation?** → Casey
- **Migration planning?** → Riley
- **Not sure?** → Start with `/end-to-end-advisory`

### "How do I invoke a workflow?"

Three ways:
1. Direct: `/workflow-name` (e.g., `/smart-intake`)
2. Command: `workflow workflow-name`
3. Via agent: `agent name` then `*command`

### "Can I pause and resume?"

Yes!
- End-to-end advisory supports breaks between phases
- Individual workflows can be resumed later
- All progress is saved

### "What if I don't need everything?"

Skip what you don't need:
- Need just architecture? Run `/blueprint-architect`
- Need just cost analysis? Run `/cost-analysis`
- Mix and match workflows as needed

### "How do I update my technology choices?"

1. Re-run the relevant workflow
2. Or talk to the agent directly
3. Update the specification with `/spec-generator`

---

## Next Steps

### After Your First Session

1. **Review deliverables** - Check all generated documents
2. **Share with team** - Get feedback from stakeholders
3. **Refine as needed** - Re-run workflows to adjust
4. **Start building** - Use the architecture and spec to implement

### Regular Maintenance

- **Monthly:** Check with Scout for framework updates
- **Quarterly:** Review and update technology choices
- **As needed:** Re-run cost analysis for budget updates

### Learn More

- Read the full [README.md](README.md) for complete documentation
- Check [TODO.md](TODO.md) for module roadmap
- Explore individual workflow README files in `workflows/*/README.md`

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│  STACK ADVISOR QUICK REFERENCE                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Complete Advisory:                                      │
│    /end-to-end-advisory                                  │
│                                                          │
│  Talk to Agents:                                         │
│    agent alex    → Requirements                          │
│    agent scout   → Research                              │
│    agent jordan  → Architecture                          │
│    agent sam     → Validation                            │
│    agent dana    → Comparison                            │
│    agent casey   → Documentation                         │
│    agent riley   → Migration                             │
│                                                          │
│  Quick Workflows:                                        │
│    /smart-intake          → Gather requirements          │
│    /blueprint-architect   → Design architecture          │
│    /cost-analysis         → Financial analysis           │
│    /executive-summary     → Stakeholder summary          │
│                                                          │
│  Need Help?                                              │
│    Ask any agent for guidance                            │
│    They'll point you in the right direction              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

**Ready to start?** Choose your path above and dive in!

**Questions?** Just ask any Stack Advisor agent - they're here to help.

**Good luck with your technology decisions!** 🚀
