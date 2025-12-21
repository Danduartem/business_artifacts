# Generate Institutional Architecture Workflow

**Version:** 1.0.0
**Module:** Institutional Page Architect (institutional-architect)
**Type:** Document Workflow

## Purpose

Generate intelligent, research-backed institutional page architecture blueprints using 6-agent collaboration, 3D Trust Matrix analysis (Organization Type × Maturity Stage × Trust Requirements), and Stanford credibility science. This workflow orchestrates expert agents to deliver strategic architecture recommendations focused on building TRUST, not conversions.

## How It Works

### The 6-Agent Team

1. **Trust Director** 🎬 - Orchestrates workflow, synthesizes outputs, compiles blueprints
2. **Trust Guardian** 🛡️ - Stanford credibility validation, trust science expert
3. **Sector Cipher** 🔍 - Sector intelligence, institutional benchmarking
4. **The Audience Oracle** 👁️ - Multi-stakeholder psychology, audience orchestration
5. **Narrative Architect** 📐 - Trust journey design, section sequencing
6. **Content Compass** 🧭 - Content strategy, blog/article architecture, SEO

### Process Flow

**Step 1:** Gather organizational context (type, maturity, stakeholders, trust level)
**Step 2:** Determine 3D Trust Matrix position and architecture requirements
**Step 3:** PARALLEL SPECIALIST EXECUTION - 5 specialists analyze simultaneously
**Step 4:** Trust Director synthesizes specialist outputs
**Step 5:** Build unified blueprint with Narrative Architect
**Step 6:** Two-layer validation (internal agents + user checkpoints)
**Step 7:** User confirmation and final adjustments
**Step 8:** Generate final architecture blueprint document

## How to Invoke

### From CLI or IDE
```
/generate-institutional-architecture
```

### From Agent Menu
Agents can reference this workflow:
```yaml
workflow: "{project-root}/bmad/institutional-architect/workflows/generate-institutional-architecture/workflow.yaml"
```

### From Another Workflow
```xml
<invoke-workflow>{project-root}/bmad/institutional-architect/workflows/generate-institutional-architecture/workflow.yaml</invoke-workflow>
```

## Required Inputs

**User must provide:**
- Organization type (B2B, B2C, Nonprofit, Government, Hybrid)
- Maturity stage (Startup, Growth, Established, Enterprise, Heritage)
- Page type (About, Contact, Team, Mission, Careers, FAQ, Partners, Blog)
- Primary stakeholders and their needs
- Trust level requirements (Low, Medium, High, Regulated)
- Available credibility assets (certifications, team, proof)

**Important:** This workflow builds TRUST architecture, not conversion-focused landing pages.

## Generated Output

**File:** `{blueprint_output_folder}/institutional-architecture-blueprint-{date}.md`

**Contains:**
- Executive summary with key decisions
- Organizational context and 3D Trust Matrix analysis
- Stakeholder mapping and pathway design
- Sector credibility intelligence
- Stanford Web Credibility Guidelines application
- Trust journey narrative
- Complete section-by-section architecture with rationale
- Implementation guidance for designers/content creators/developers
- Credibility success metrics

## Expected Duration

- **Simple (Single Stakeholder):** 25-35 minutes
- **Standard (Multi-Stakeholder):** 35-45 minutes
- **Complex (Regulated/Enterprise):** 45-60 minutes

## Interaction Style

**Intent-Based + Medium Interactivity:**
- Adaptive conversations based on organization complexity
- Key decision points with validation
- Educational approach (teaches credibility science throughout)
- User confirmation checkpoints for accuracy

## Dependencies

**Required Tasks:**
- `trust-matrix-calculator.xml` - Calculates architecture requirements
- `credibility-validation-framework.xml` - Runs two-layer validation
- `sector-research-protocol.xml` - Guides sector credibility research

**Module Config:**
- `blueprint_output_folder` - Where blueprints are saved
- `user_name` - User identification
- `communication_language` - Language preference

## Success Criteria

**A successful blueprint includes:**
- ✅ Clear 3D Trust Matrix position with rationale
- ✅ All primary stakeholders served with clear pathways
- ✅ Stanford Web Credibility Guidelines addressed
- ✅ Sector credibility patterns incorporated
- ✅ Trust journey with progressive revelation
- ✅ Section-by-section design with credibility rationale
- ✅ Implementation guidance for execution team
- ✅ Two-layer validation passed

## Supported Page Types

### Tier 1 - Core (Fundamental Trust Pages)
- **Homepage** - Hub + first impression + stakeholder pathways
- **About Us** - Organizational identity and story
- **Contact** - Accessibility and availability
- **Team/People** - Human credibility and expertise

### Tier 2 - Common (Extended Trust Pages)
- **Mission/Values** - Purpose and principles
- **Careers** - Culture and employee experience
- **FAQ** - Transparency and service
- **Client Logos/Partners** - Third-party validation

### Content Pages
- **Blog/Article** - Authority-building content

## Example Use Cases

**Small Nonprofit:**
- Building first About page
- Needs to establish credibility with donors
- Limited resources, maximum impact focus

**B2B Tech Company:**
- Redesigning Team page for enterprise clients
- High-trust requirements (regulated industry)
- Multiple stakeholders (buyers, users, executives)

**Established Corporation:**
- Creating Careers page for talent attraction
- Heritage organization modernizing presence
- Balancing legacy with innovation

**Government Agency:**
- Building FAQ page for citizens
- Accessibility and compliance requirements
- Service-focused, trust-essential

## Troubleshooting

**"I'm not sure what our trust level is"**
- Trust Guardian helps determine this during intake
- Consider: What's at stake for your stakeholders?
- Regulated = mandatory disclosures, compliance
- High = high-stakes decisions, unknown brand
- Medium = considered decisions, some proof needed
- Low = known brand, simple engagement

**"We have conflicting stakeholder needs"**
- This is common and expected
- The Audience Oracle specializes in conflict resolution
- Architecture will include segmented pathways

**"Can I use this for a landing page?"**
- No - this module builds TRUST, not conversions
- Use Landing Page Architect (lp-architect) for conversion-focused pages
- Different goals require different frameworks

## Related Workflows

- **lp-architect/generate-architecture** (for conversion-focused landing pages)
- **voice-forge** (for developing brand voice documentation)
- **style-guide-forge** (for visual style guidelines)

## Version History

**v1.0.0** (2025-12-20)
- Initial release
- 6-agent collaboration system
- 3D Trust Matrix intelligence
- Stanford Credibility Guidelines integration
- Two-layer validation framework
- 8 page types supported

---

*Part of the Institutional Page Architect module - Intelligent credibility advisory through AI collaboration*
