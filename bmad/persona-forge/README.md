# Persona Forge 🔥

**Research-Validated Customer Intelligence Based on Eugene Schwartz's 5 Levels of Customer Awareness**

---

## Overview

Persona Forge is a comprehensive customer intelligence system that generates, validates, and maintains research-backed persona documents based on Eugene Schwartz's proven 5 Levels of Customer Awareness framework. Unlike traditional static persona tools, Persona Forge tracks 1-3 distinct customer personas through their complete awareness journey, provides lifecycle management through updates, and ensures quality through validation workflows - creating living intelligence that evolves with your market.

### Key Differentiators

- **Awareness Journey Tracking** - Maps how personas evolve across all 5 awareness levels (Unaware → Problem Aware → Solution Aware → Product Aware → Most Aware)
- **Research Validation** - Three-agent system ensures personas are grounded in market reality, not assumptions
- **Real-Time Qualification** - Built-in questions identify persona type AND awareness level during sales calls
- **Strategic Precision** - Creates up to 15 distinct targeting scenarios (3 personas × 5 levels) for scalable personalization
- **Living Intelligence** - Update personas with market data or qualification results; validate for quality over time
- **Go-to-Market Focus** - Explicitly designed for marketing, sales, copywriting, design, and advertising excellence with extensive practical tools

---

## What You Get

### Deliverables

When you run Persona Forge, you receive:

1. **Comprehensive Persona Documents** (1-3 per session)
   - Quick Reference (1-page overview)
   - Core Persona Profile (stable characteristics)
   - Awareness Journey (evolution through all 5 levels)
   - Practical Tools (qualification questions, messaging examples, red flags, success metrics)

2. **Qualification Question Set** (separate reference)
   - Scored questions for live call use
   - Persona identification guidance
   - Awareness level detection
   - Real-time approach recommendations

### Agent Team

Persona Forge uses a three-agent validation system with "healthy tension" culture:

- **🎯 Persona Strategist** - Creates comprehensive initial drafts through guided brainstorming
- **🔍 Market Intelligence Analyst** - Validates with real market research and directly challenges assumptions
- **⭐ Senior Persona Specialist** - Ensures quality standards with exacting perfectionism

---

## Installation

### Prerequisites

- BMAD Method installed in your project
- Node.js and npm (for BMAD installer)

### Install Steps

1. **Copy persona-forge folder** to your project's `bmad/` directory:
   ```
   your-project/
   └── bmad/
       └── persona-forge/  (this module)
   ```

2. **Run the BMAD Method installer:**
   ```bash
   bmad install
   ```

3. **Select 'Compile Agents'** option after confirming folder location

4. **Configure during installation** (you'll be asked):
   - Where to save generated persona documents (default: `docs/personas`)

5. **Installation complete!** The module is now available.

---

## Quick Start

### Creating Your First Persona

1. **Invoke the Persona Forge Master Agent:**
   ```
   @persona-forge
   ```
   or via slash command:
   ```
   /persona-forge
   ```

2. **Select "Create" from the menu**

3. **Answer the guided interview** about your business, customers, and market

4. **Review drafts at checkpoints** as the three agents work collaboratively

5. **Receive final deliverables:**
   - Complete persona document(s) (1-3 depending on selection)
   - Unified qualification questions set
   - Persona set summary (if multiple personas created)

### Seven Core Workflows

**Persona Creation & Management:**

**1. Create Personas** (`create`)
- Generate 1-3 research-validated personas from scratch
- Three-agent validation system with correction loop
- Outputs: Persona documents + qualification questions

**2. Update Personas** (`update`)
- Refresh existing personas with new market research
- Incorporate real qualification call data for calibration
- General refresh for aging personas
- Outputs: Updated persona documents with version tracking

**3. Validate Personas** (`validate`)
- Quality check existing persona documents (created in or outside Persona Forge)
- Three validation types: Quick (5 min) / Standard (10 min) / Deep with Research (20 min)
- Quality scoring (0-100) with actionable improvement recommendations
- Outputs: Validation report + optional routing to Update Workflow

**Advanced Analytics & Tools (V3):**

**4. Compare Personas** (`compare`)
- Side-by-side comparison of 2-3 personas
- Three depths: Quick/Detailed/Strategic analysis
- Market opportunity scoring and resource allocation guidance
- Outputs: Comparison report with strategic recommendations

**5. Export Personas** (`export`)
- Export to 7 formats: JSON, CSV, PDF-ready, CRM, API, Presentation, Print
- Configure options per format
- Share with teams and integrate with tools
- Outputs: Multiple format exports with usage guidance

**6. Track Evolution** (`evolution`)
- Analyze how personas evolved over time
- Identify trends and patterns across versions
- Quality trajectory and stability analysis
- Outputs: Evolution report with strategic insights

**7. Health Check** (`health`)
- Calculate persona health score (0-100)
- Component scoring: Freshness, Accuracy, Usage, Market Alignment
- Get maintenance recommendations
- Outputs: Health report with action plan

### Using Your Personas

**For Sales Teams:**
- Use qualification questions during initial calls
- Identify which persona and awareness level a lead matches
- Adjust your positioning in real-time

**For Marketing Teams:**
- Reference awareness-specific messaging examples
- Create campaigns for different persona/level combinations
- Use emotional triggers and pain points in copy

**For Copywriters:**
- Extract customer language from "In Their Own Words" quotes
- Reference messaging frameworks for each awareness level
- Understand emotional journey from cold to hot

**For Designers:**
- Use channel recommendations for platform selection
- Understand visual preferences and content types
- Reference demographics for design decisions

**For Leadership:**
- Make strategic decisions with confidence
- Align team around shared customer intelligence
- Track persona accuracy and refine over time

---

## Module Structure

```
persona-forge/
├── agents/
│   ├── persona-forge.agent.yaml           # Master agent (module hub)
│   ├── persona-strategist.agent.yaml      # Initial draft creation
│   ├── market-intelligence-analyst.agent.yaml  # Research validation
│   └── senior-persona-specialist.agent.yaml   # Quality control
│
├── workflows/
│   └── create-personas/
│       ├── workflow.yaml                   # Main workflow config
│       ├── instructions.md                 # Step-by-step logic
│       └── checklist.md                    # Validation checklist
│
├── templates/
│   ├── persona-document.md                 # Persona template
│   └── qualification-questions.md          # Questions template
│
├── data/                                   # Reference data (if needed)
│
├── _module-installer/
│   └── install-config.yaml                 # Installation config
│
└── README.md                               # This file
```

---

## Configuration

After installation, configure Persona Forge in:
`bmad/persona-forge/config.yaml`

### Configuration Options

| Setting | Description | Default |
|---------|-------------|---------|
| `persona_output_folder` | Where to save generated personas | `{output_folder}/personas` |
| `default_research_depth` | Standard or deep research | `standard` |
| `max_persona_count` | Maximum personas per session | `3` |
| `module_version` | Current version | `2.0.0` |

---

## Features by Version

### ✅ Version 1 (MVP) - Released

- Create single comprehensive persona
- Three-agent validation system
- Research validation with market data
- Correction loop (max 3 cycles)
- Temperature gradient color coding
- Real customer quote integration
- Qualification questions generation
- Sample messaging by awareness level
- Quick Reference 1-page summary

### ✅ Version 2 - Released

**Multi-Persona Capabilities:**
- Create 1-3 personas in one session
- Multi-persona differentiation and comparison
- Unified qualification questions (persona identification + awareness level)
- Persona set summary document

**Persona Lifecycle Management:**
- Update personas with new market research
- Update personas with qualification call data
- General refresh workflow for aging personas
- Version tracking with revision history

**Quality Assurance:**
- Validate existing persona documents (3 validation types: quick/standard/deep)
- Quality scoring (0-100) with detailed breakdown
- Market data validation for currency checks
- Integration with Update Workflow for systematic improvements

**Enhanced Practical Tools:**
- Email templates for all 5 awareness levels
- Sales scripts & talk tracks
- Objection handling guide (5 common objections with responses)
- Campaign templates by awareness level
- Content ideas library (blog, social, video)
- CTA examples with friction guidance
- Persona scenario playbooks (6 common scenarios)

### ✅ Version 3 (Current) - Released

**Analytics & Tracking:**
- Evolution tracking system (analyze persona changes over time)
- Trend identification (refinement, expansion, pivot, market response patterns)
- Quality trajectory analysis (is persona improving or declining?)
- Stability scoring and drift metrics
- Version-by-version comparison with visualizations

**Comparison & Strategy:**
- Side-by-side persona comparison (2-3 personas)
- Three comparison depths (quick/detailed/strategic)
- Market opportunity scoring and priority rankings
- Resource allocation recommendations
- Cross-persona insights (migration patterns, cross-sell opportunities)
- Strategic go-to-market sequencing

**Export System:**
- JSON export (structured data for integrations)
- CSV export (spreadsheet analysis)
- PDF-ready Markdown (optimized for conversion)
- CRM format (Salesforce/HubSpot/Generic compatible)
- API format (RESTful with hypermedia links)
- Presentation format (slide-optimized summaries)
- Print-friendly format (physical distribution)

**Health & Maintenance:**
- Persona health scoring (0-100 with status ratings)
- Component scoring (Freshness, Accuracy, Usage, Market Alignment)
- Automated maintenance recommendations
- Health dashboard with visual indicators
- Proactive deterioration alerts

**Integration Capabilities:**
- CRM export helpers with field mapping
- API-ready formats for custom integrations
- Multi-format support for various tools and platforms

### 🚀 Version 4 (Future)

- Real-time qualification data feedback loop
- Automated A/B testing recommendations
- Machine learning-powered persona refinement suggestions
- Integration marketplace for popular tools
- Collaborative team annotations and comments
- Advanced visualization dashboard
- Industry benchmarking capabilities

---

## Examples & Use Cases

### Use Case 1: Multi-Business Portfolio

An entrepreneur running online mentoring, restaurant, and marketing agency businesses uses Persona Forge to create distinct persona sets for each venture, maintaining strategic intelligence across diverse markets.

### Use Case 2: Agency Client Onboarding

A marketing agency uses Persona Forge during client onboarding to rapidly develop research-backed personas, demonstrating strategic value and creating shared language with clients from day one.

### Use Case 3: Persona Evolution Tracking

A business updates personas quarterly by feeding real qualification call data through the update workflow (V2), creating a living intelligence system that improves over time.

---

## The Eugene Schwartz Framework

Persona Forge is built on Eugene Schwartz's 5 Levels of Customer Awareness from his seminal work "Breakthrough Advertising" (1966):

### 🔵 Level 1: Unaware
They don't know they have a problem. Focus on problem education and awareness building.

### 🟢 Level 2: Problem Aware
They know they have a problem but don't know solutions exist. Validate their problem and introduce solution categories.

### 🟡 Level 3: Solution Aware
They know solutions exist but don't know about your specific solution. Differentiate your approach and provide proof.

### 🟠 Level 4: Product Aware
They know about your product but haven't decided to buy. Address objections and reinforce unique value.

### 🔴 Level 5: Most Aware
They're ready to buy, just need the right offer. Present clear offer and remove friction.

---

## Best Practices

### Creating High-Quality Personas

1. **Provide Specific Context** - Generic inputs produce generic personas. Share actual customer conversations, survey data, and observations.

2. **Trust the Research Phase** - The Market Intelligence Analyst may contradict your assumptions. This is valuable - it catches blind spots.

3. **Don't Rush Quality Validation** - If the Senior Persona Specialist rejects your persona, the feedback will make it better. Use the correction loop.

4. **Share the Quick Reference** - Your team won't read 20-page documents. The 1-page Quick Reference gets them 80% of the value immediately.

5. **Use Qualification Questions Live** - Don't wait to "perfect" the questions. Use them on your next call and calibrate based on results.

6. **Track Accuracy** - Note which leads actually match your personas. Feed this data back for updates (V2 feature).

### Common Mistakes to Avoid

❌ **Creating Personas Without Data** - "We think our customers are..." doesn't work. Provide real insights or let research fill gaps.

❌ **Ignoring Research Contradictions** - If the Analyst says your assumptions are wrong, listen. That's literally their job.

❌ **Accepting Below-Standard Personas** - Don't approve just to finish. Weak personas waste more time than creating good ones takes.

❌ **Creating and Forgetting** - Personas are living documents. Plan to update them quarterly (V2 will make this easy).

❌ **Over-Indexing on Demographics** - Age and income matter, but psychographics and awareness levels drive behavior.

---

## Troubleshooting

### "My persona feels generic"

**Likely Cause:** Not enough specific context provided during guided interview.

**Solution:** Provide actual customer language, specific pain points you've heard, real objections, concrete examples. The more specific your inputs, the more specific your persona.

---

### "Research contradicted most of my assumptions"

**Good News:** That's exactly what the Market Intelligence Analyst is supposed to do! This means you're catching blind spots before they become expensive marketing mistakes.

**Next Step:** Trust the research. The Analyst cites sources - review them if you're skeptical. But usually, market data beats internal assumptions.

---

### "Senior Persona Specialist keeps rejecting my persona"

**Likely Cause:** Missing critical information, research not integrated, or doesn't meet best practices.

**Solution:** Read the specific feedback carefully. The Specialist tells you exactly what to fix. If you're on rejection #3, consider discussing the specific standards with the Specialist to understand the gap.

---

### "Qualification questions aren't accurate"

**Expected:** First version won't be perfect. Qualification questions improve with calibration.

**Solution:** Track which leads the questions correctly identify vs. misidentify. After 10-20 uses, patterns will emerge. Update the scoring in V2 based on real results.

---

## Support & Feedback

### Getting Help

- **Documentation:** Review this README and the module brief
- **Agent Help:** Invoke `@persona-forge` and select "Help" from menu
- **Workflow Issues:** Check `/bmad/persona-forge/workflows/create-personas/instructions.md`

### Providing Feedback

We want to hear about your experience:

- **What worked well?** - Which features were most valuable?
- **What needs improvement?** - Where did you get stuck or frustrated?
- **What's missing?** - What capabilities would make this 10x better?
- **Accuracy feedback?** - How well do generated personas match your actual customers?

---

## Credits

**Framework:** Eugene Schwartz's 5 Levels of Customer Awareness (1966)

**Created By:** Daniel

**Module Type:** BMAD Standard Module

**Version:** 1.0.0-mvp

**License:** (Specify your license)

---

## Roadmap

See the [Module Brief](../../docs/module-brief-persona-forge-2025-11-04.md) for detailed development roadmap and future plans.

### Next Milestones

- **V1 Testing:** Validate MVP with real businesses (mentoring, restaurant, agency)
- **V2 Development:** Multi-persona support and update workflow
- **V3 Features:** Data feedback loop and continuous improvement

---

**🔥 Welcome to Persona Forge - Transform customer understanding from guesswork into strategic intelligence.**

---

_Last Updated: 2025-11-04_
_Module Status: MVP Ready for Testing_
