# Landing Page Architect - Quick Start Guide

**Version:** 1.0.0 | **Module Code:** lp-architect

---

## Installation (5 minutes)

```bash
npm run install-bmad
```

Select "Landing Page Architect" → Configure 3 settings → Done!

**Verify:**
```bash
ls bmad/lp-architect/agents/*.md
/generate-architecture
```

---

## Your First Architecture Blueprint (30 minutes)

### Step 1: Prepare Your Inputs (5 min)

**Required:**
- Target persona (demographics, psychographics, behaviors)
- Offer details (what you're selling, price)
- Business niche/industry

**Optional but helpful:**
- 2-3 main competitors
- Current page (if redesign)

### Step 2: Invoke Workflow (1 min)

```
/generate-architecture
```

### Step 3: Answer Context Questions (5 min)

The workflow will ask about:
- Your business type and niche
- Your offer and price point
- Your target persona
- Whether it's new or redesign

**Tip:** Be specific! The more context you provide, the better the architecture.

### Step 4: Review Research (10 min)

**Agent Cipher** will present:
- Competitive intelligence findings
- What converts in your niche
- Differentiation opportunities
- Performance benchmarks

Validate or provide corrections.

### Step 5: Confirm Persona Insights (5 min)

**The Whisperer** will share:
- Deep persona psychology
- Unspoken fears and desires
- Hidden objections to address
- Emotional triggers to leverage

Confirm accuracy or add context.

### Step 6: Approve Strategic Approach (2 min)

**Conversion Strategist** validates:
- 7 conversion principles applied
- 5-step sequence implemented
- 3D matrix requirements met

Checkpoints for your confirmation.

### Step 7: Receive Blueprint (2 min)

**Director Arc** delivers:
- Complete section-by-section architecture
- Strategic rationale for each section
- Implementation guidance
- Success metrics

**Output:** `{blueprint_output_folder}/lp-architecture-blueprint-{date}.md`

---

## What You'll Get

Your architecture blueprint includes:

### 1. Executive Summary
- Key strategic decisions
- 3D matrix position
- Architecture overview

### 2. Business Context
- Your niche positioning
- Awareness level analysis
- Price tier considerations
- Complexity assessment

### 3. Competitive Intelligence
- What converts in your niche
- Competitor patterns
- Differentiation strategy
- Benchmarks to beat

### 4. Persona Psychology
- Deep psychological insights
- Fear and desire mapping
- Objection handling strategy
- Emotional trigger placement

### 5. Strategic Principles
- How each of 7 principles applies
- Why each decision was made
- Conversion sequence validation

### 6. Complete Architecture
**For each section:**
- Section name and purpose
- Strategic rationale (WHY this section)
- Placement explanation (WHY here)
- Content guidance (WHAT goes here)
- Proof/trust elements needed

### 7. Implementation Guidance
- Designer handoff notes
- Copywriter brief
- Developer considerations
- Section priority order

### 8. Success Metrics
- Expected conversion benchmarks
- Key metrics to track
- Performance indicators
- Optimization opportunities

---

## The 4 Agents

### Conversion Strategist 📊
**"Let me show you what the data says..."**

Validates your architecture against 7 conversion principles and 5-step sequence.

**Consult directly:**
```
@bmad/lp-architect/agents/conversion-strategist.md
```

**Commands:**
- `*explain-principles` - Learn the 7 principles
- `*validate-concept` - Validate an idea
- `*matrix-guide` - Navigate 3D matrix
- `*conversion-research` - Research best practices

---

### Agent Cipher 🔍
**"I've cracked the code on what converts in your space..."**

Conducts competitive intelligence and identifies niche patterns.

**Consult directly:**
```
@bmad/lp-architect/agents/agent-cipher.md
```

**Commands:**
- `*analyze-competitors` - Deep competitive analysis
- `*niche-patterns` - Niche conversion patterns
- `*benchmark-data` - Performance benchmarks
- `*differentiation-strategy` - How to stand out

---

### The Whisperer 💭
**"Your customers won't say this, but they're thinking..."**

Analyzes persona psychology and emotional triggers.

**Consult directly:**
```
@bmad/lp-architect/agents/the-whisperer.md
```

**Commands:**
- `*analyze-persona` - Deep psychology analysis
- `*map-objections` - Identify objections
- `*emotional-triggers` - Find trigger points
- `*persona-resonance-check` - Validate alignment

**Note:** The Whisperer ANALYZES your persona, doesn't create one.

---

### Director Arc 🎬
**"Here's how we guide them from stranger to customer..."**

Synthesizes everything into cohesive architecture blueprint.

**Consult directly:**
```
@bmad/lp-architect/agents/director-arc.md
```

**Commands:**
- `*explain-journey` - Journey design principles
- `*section-sequencing` - Section order strategy
- `*review-architecture` - Review existing architecture
- `*quick-blueprint` - Fast architecture draft

---

## The 3D Matrix

Your architecture adapts based on 3 dimensions:

### Awareness Level
- **Unaware:** Don't know problem exists → Need education
- **Problem-aware:** Know problem → Need solution education
- **Solution-aware:** Comparing options → Need differentiation
- **Product-aware:** Considering you → Need objection removal

### Price Tier
- **Low ($0-$50):** Minimal proof, 4-6 sections
- **Medium ($50-$500):** Solid credibility, 6-9 sections
- **High ($500+):** Extensive trust-building, 10-15 sections

### Complexity
- **Simple:** Easy to understand → Short architecture
- **Moderate:** Some explanation → Medium architecture
- **Complex:** Detailed breakdown → Long architecture

**Example:** Unaware + High Price + Complex = 12-15 sections with deep education

---

## Tips for Best Results

### Before You Start

✅ **Have persona documented** - Not just demographics; include psychographics and behaviors
✅ **Know your price** - Exact or range (affects proof requirements)
✅ **Identify competitors** - 2-3 examples help research
✅ **Understand your audience awareness** - Where are they in their journey?

### During the Process

✅ **Be specific** - "B2B SaaS for healthcare compliance" > "SaaS"
✅ **Share context** - "Our customers are risk-averse CFOs" helps agents
✅ **Ask questions** - If unclear, ask agents to explain
✅ **Validate at checkpoints** - Correct if something feels off

### After Blueprint Delivery

✅ **Review with team** - Share with designer, copywriter, developer
✅ **Use rationale** - "Why" sections explain decisions
✅ **Track metrics** - Benchmark data guides success measures
✅ **Iterate if needed** - Can run workflow again with adjustments

---

## Common Questions

**Q: How long does it take?**
A: 20-40 minutes depending on research depth setting.

**Q: Can I use this for blog posts or product pages?**
A: No - specifically for conversion-focused landing pages.

**Q: Do I need a persona already defined?**
A: Yes - The Whisperer analyzes personas, doesn't create them. Define persona first.

**Q: Can I skip the research phase?**
A: Research is essential for differentiation. If you skip it, you lose competitive intelligence value.

**Q: What if the architecture doesn't feel right?**
A: Layer 2 validation specifically catches this. Share your concerns at checkpoints - agents will refine.

**Q: Can I consult agents individually?**
A: Yes! Each agent has 4 standalone commands for targeted consultation.

**Q: Does this create the actual page?**
A: No - it creates the strategic ARCHITECTURE (what sections, why, in what order). Design, copy, and code come after.

---

## Workflow Duration

**Quick (research_depth: quick):** 20-25 minutes
- Top 3-5 competitors analyzed
- Core patterns identified
- Good for simple offers

**Standard (research_depth: standard):** 30-40 minutes (Recommended)
- Top 10 competitors analyzed
- Comprehensive pattern analysis
- Balanced depth and speed

**Comprehensive (research_depth: comprehensive):** 50-60 minutes
- Top 20 competitors analyzed
- Extensive benchmarking
- Deep competitive intelligence

*Set in config.yaml*

---

## Configuration

Located at: `bmad/lp-architect/config.yaml`

```yaml
blueprint_output_folder: [where blueprints save]
detail_level: standard | detailed | concise
research_depth: quick | standard | comprehensive
```

**Change anytime** - edits take effect immediately.

---

## Support

**Full Documentation:** `bmad/lp-architect/README.md`
**Installation Help:** `bmad/lp-architect/INSTALLATION.md`
**Module Details:** `bmad/lp-architect/MODULE-SUMMARY.md`

**Issues:** github.com/anthropics/claude-code/issues
**Docs:** docs.claude.com/claude-code

---

## Next Steps

1. **Install the module** (if not done)
   ```bash
   npm run install-bmad
   ```

2. **Prepare your inputs** (persona, offer, niche)

3. **Generate your first blueprint**
   ```
   /generate-architecture
   ```

4. **Use blueprint to guide implementation**

5. **Track success metrics** (from blueprint)

6. **Optimize based on data**

---

**Ready to build landing pages that convert?**

```
/generate-architecture
```

---

*Intelligence over Templates, Strategy over Guesswork*

**Landing Page Architect** v1.0.0
