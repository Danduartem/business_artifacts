# Design Forge - Archetype Templates

This folder contains the detailed specifications for each of the 5 design archetypes used by Design Forge.

## Purpose

These templates serve as:
1. **Reference Documentation** - Detailed specifications for each archetype's design philosophy
2. **Prompt Engineering Foundation** - Source material for the Design Director's embedded prompts
3. **Quality Standards** - Guidelines ensuring each archetype maintains its distinct character
4. **Maintenance Resource** - Central location for refining archetype definitions

## Archetype Files

### 1. archetype-minimalist.md
**Philosophy:** "Less is more. Every element must earn its place."
**Emotion:** Calm, sophisticated, clear
**Best For:** Premium products, professional services, tech platforms

### 2. archetype-bold-innovator.md
**Philosophy:** "Design should make a statement. Break conventions."
**Emotion:** Energetic, confident, disruptive
**Best For:** Startups, creative agencies, disruptive brands

### 3. archetype-professional.md
**Philosophy:** "Trust through polish. Credibility through consistency."
**Emotion:** Trustworthy, reliable, established
**Best For:** B2B, financial services, enterprise software

### 4. archetype-modern-artisan.md
**Philosophy:** "Contemporary craft. Innovation meets refinement."
**Emotion:** Innovative, approachable, quality-conscious
**Best For:** SaaS products, modern brands, tech-forward companies

### 5. archetype-elegant-curator.md
**Philosophy:** "Luxury through restraint. Excellence in the details."
**Emotion:** Elegant, exclusive, aspirational
**Best For:** Luxury brands, high-end services, boutique offerings

## Template Structure

Each archetype template includes:

### Core Parameters
- Layout Structure preferences
- Visual Style/Mood characteristics
- Animation Patterns approach
- Color Schemes guidance
- Typography Approach standards
- Spacing/Density philosophy
- Content Arrangement principles
- Visual Weight guidelines
- Component Style preferences
- Interaction Patterns approach

### Prompt Template
Complete prompt structure for spawning designer agents with this archetype

### Best Practices
Do's and Don'ts specific to the archetype

### Example Sections
Concrete examples of how the archetype approaches different section types

### Quality Checklist
Validation criteria for this archetype

## Usage in Design Forge

**v1.0 Implementation:**
The Design Director agent has these archetype definitions embedded directly in its `*generate` action prompt. The templates in this folder serve as reference documentation and source of truth.

**Future Enhancement (v1.5+):**
These templates may be dynamically loaded by the Design Director for:
- Runtime archetype selection
- Custom archetype creation
- A/B testing different prompts
- User-customizable archetype definitions

## Maintaining Archetypes

### When to Update Templates

**Quality Issues:**
If generated prototypes don't match archetype philosophy consistently, refine the template specifications.

**User Feedback:**
Incorporate learnings from real usage to improve archetype definitions.

**New Techniques:**
As CSS/design techniques evolve, update templates to reflect modern best practices.

### Update Process

1. Edit the relevant archetype template file
2. Test changes by updating Design Director agent prompts
3. Generate prototypes to validate improvements
4. Document changes in module TODO.md
5. Consider versioning for significant changes

## Extending Archetypes

### Adding New Archetypes (v2.0+)

To add a custom archetype:

1. **Create New Template**
   - Copy an existing template as starting point
   - Define unique design philosophy
   - Specify all 10 core parameters
   - Write prompt template
   - Add best practices and examples

2. **Update Design Director**
   - Add new archetype to selection logic
   - Include prompt template in agent
   - Update context-aware selection rules

3. **Test Thoroughly**
   - Generate prototypes with new archetype
   - Validate distinct character
   - Ensure production-ready output

4. **Document**
   - Add to README.md
   - Include in TODO.md roadmap
   - Update module brief if significant

## Quality Standards

All archetype templates must ensure:
- **Distinct Character** - Each archetype feels genuinely different
- **Internal Consistency** - All parameters align with philosophy
- **Production Ready** - Generated code meets quality standards
- **Accessibility** - WCAG 2.1 compliance maintained
- **Responsiveness** - Mobile-first approach across all archetypes
- **Modern Standards** - Current CSS techniques and best practices

## Reference

**Design Director Agent:** `/agents/design-director.md`
- Contains embedded archetype prompts (source: these templates)
- Handles archetype selection logic
- Spawns designer agents with archetype specifications

**Module Brief:** `/docs/module-brief-design-forge-2025-11-10.md`
- Strategic rationale for archetype approach
- User research supporting 5 archetypes
- Success criteria and validation plans

**Brainstorming Results:** `/docs/brainstorming-design-prototyping-module-2025-11-10.md`
- Original ideation behind archetype strategy
- Beautiful Variation Engine framework
- Emotional Range + Visual Hierarchy principles

---

*These archetypes are the heart of Design Forge's Vision Translation Engine.*
