# Generate Architecture Workflow

**Version:** 1.0.0
**Module:** Landing Page Architect (lp-architect)
**Type:** Document Workflow

## Purpose

Generate intelligent, research-backed landing page architecture blueprints using 4-agent collaboration, 3D matrix analysis (Awareness × Price × Complexity), and persona-driven design. This workflow orchestrates expert agents to deliver strategic architecture recommendations with full rationale.

## How It Works

### The 4-Agent Team

1. **Conversion Strategist** 📊 - Validates against 7 conversion principles and 5-step sequence
2. **Agent Cipher** 🔍 - Conducts competitive research and niche pattern analysis
3. **The Whisperer** 💭 - Analyzes persona psychology and emotional triggers
4. **Director Arc** 🎬 - Synthesizes inputs into cohesive architecture blueprint

### Process Flow

**Step 1:** Gather business context (niche, offer, persona, price, complexity)
**Step 2:** Determine 3D matrix position and architecture requirements
**Step 3:** Agent Cipher performs competitive intelligence research
**Step 4:** The Whisperer analyzes persona psychology
**Step 5:** Conversion Strategist validates strategic principles
**Step 6:** Director Arc creates section-by-section blueprint
**Step 7:** Two-layer validation (internal agents + user checkpoints)
**Step 8:** Generate final architecture blueprint document

## How to Invoke

### From CLI or IDE
```
/generate-architecture
```

### From Agent Menu
Agents can reference this workflow:
```yaml
workflow: "{project-root}/bmad/lp-architect/workflows/generate-architecture/workflow.yaml"
```

### From Another Workflow
```xml
<invoke-workflow>{project-root}/bmad/lp-architect/workflows/generate-architecture/workflow.yaml</invoke-workflow>
```

## Required Inputs

**User must provide:**
- Business type/niche
- Offer details (what they're selling, price range)
- Target persona (demographics, psychographics, behaviors)
- Current state (new page or redesign)

**Important:** This workflow ANALYZES personas provided by the user, it does not create personas.

## Generated Output

**File:** `{blueprint_output_folder}/lp-architecture-blueprint-{date}.md`

**Contains:**
- Executive summary with key decisions
- Business context and 3D matrix analysis
- Competitive intelligence findings
- Persona psychology insights
- Strategic principles application
- Complete section-by-section architecture with rationale
- Implementation guidance for designers/copywriters/developers
- Success metrics and benchmarks

## Expected Duration

- **Quick (Solo Founder):** 25-35 minutes (more educational guidance)
- **Standard (Agency/Business):** 20-30 minutes (efficient, professional)
- **Complex (High-touch):** 40-50 minutes (extensive validation)

## Interaction Style

**Intent-Based + Medium Interactivity:**
- Adaptive conversations based on user expertise
- Key decision points with validation
- Educational approach (teaches "why" throughout)
- User confirmation checkpoints for accuracy

## Dependencies

**Required Tasks:**
- `matrix-calculator.xml` - Calculates architecture requirements
- `validation-framework.xml` - Runs two-layer validation
- `niche-research-protocol.xml` - Guides competitive research

**Module Config:**
- `blueprint_output_folder` - Where blueprints are saved
- `user_name` - User identification
- `communication_language` - Language preference

## Success Criteria

**A successful blueprint includes:**
- ✅ Clear 3D matrix position with rationale
- ✅ Research-backed competitive intelligence
- ✅ Persona psychology mapped to architecture
- ✅ All 7 conversion principles validated
- ✅ Section-by-section design with strategic rationale
- ✅ Implementation guidance for execution team
- ✅ Performance benchmarks and success metrics
- ✅ Two-layer validation passed

## Example Use Cases

**Solo Entrepreneur:**
- Building first landing page
- Needs education and guidance
- Wants to understand conversion principles
- Budget-conscious, DIY approach

**Agency:**
- Creating client landing pages
- Needs speed and professionalism
- Wants client-ready deliverables
- Competitive positioning focus

**Established Business:**
- Redesigning existing page
- ROI and performance focused
- Strategic competitive advantage
- Data-driven decision making

## Troubleshooting

**"I don't have a persona defined yet"**
- This workflow requires a target persona as input
- Consider using a persona development workflow first
- Or provide basic demographics/psychographics to start

**"The architecture doesn't feel right"**
- Layer 2 validation specifically addresses this
- Share context the agents might be missing
- The workflow will refine based on your insights

**"Can I skip the research phase?"**
- Research is essential for differentiation strategy
- Skipping it removes competitive intelligence value
- Consider using a simpler template tool instead

## Related Workflows

- **persona-development** (if you need to define your target audience)
- **copywriting-brief** (next step after architecture)
- **page-review** (validate existing pages against conversion principles)

## Version History

**v1.0.0** (2025-11-05)
- Initial release
- 4-agent collaboration system
- 3D matrix intelligence
- Two-layer validation framework

---

*Part of the Landing Page Architect module - Intelligent conversion advisory through AI collaboration*
