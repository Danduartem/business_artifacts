# Forge CTA Workflow v2.0

Generate or regenerate CTA section with sequential validation.

---

## Overview

This workflow creates CTAs (button text, supporting copy, friction reduction)
validated for both brand voice and audience resonance.

Use this workflow to:
- Generate a new CTA section
- Regenerate/refine an existing CTA
- Optimize for higher conversion

---

## Inputs

### Required
- **brand_voice_document**: Brand voice doc (tone, how brand approaches urgency)
- **avatar_profile**: Avatar profile (objections, motivations, hesitations)
- **desired_action**: What users should DO

### Optional
- **urgency_level**: Genuine deadline, limited capacity, or ongoing
- **conversion_context**: Funnel position, commitment level

---

## Pipeline Phases

### Phase 1: Context Gathering
**Agent**: Blueprint Coordinator

1. Request brand voice document path
2. Request avatar profile path
3. Clarify desired action
4. Gather urgency level (ONLY if genuine)

### Phase 2: CTA Creation
**Agent**: CTA Specialist

1. Analyze friction points from avatar profile
2. Study avatar motivations and objections
3. Create 3-5 button text variations
4. Select strongest button text
5. Create friction-reduction elements
6. Add urgency (ONLY if genuine)
7. Design alternative CTA (for hesitant users)

### Phase 3: Brand Voice Validation
**Agent**: Brand Voice Guardian

Validate 7 criteria. All must pass.

### Phase 4: Audience Resonance Validation
**Agent**: Avatar Advocate

Validate 8 criteria from avatar POV. All must pass.

### Phase 5: Presentation
**Agent**: Blueprint Coordinator

Present validated CTA with scores and refinement options.

---

## Output

```markdown
CTA SECTION
===========

PRIMARY CTA BUTTON:
"[Button text]"

SUPPORTING COPY:
[Subhead or microcopy]

FRICTION-REDUCTION:
- [Element 1]
- [Element 2]

URGENCY:
[Genuine deadline or "N/A - ongoing"]

ALTERNATIVE CTA:
[Secondary option or "N/A"]

VALIDATION:
- Brand Voice: 7/7 (100%)
- Audience Resonance: 8/8 (100%)

STRATEGIC RATIONALE:
- Action verb: [Why chosen]
- Friction addressed: [What barriers removed]
- Objections handled: [Which concerns addressed]
```

---

## Urgency Rules

**ONLY use if genuine:**
- Real deadline: "Enrollment closes Friday"
- True capacity: "Only 5 spots available"

**NEVER use fake scarcity.**

---

## Usage

```
/bmad:copy-forge:agents:blueprint-coordinator
*forge-cta
```

---

*Copy Forge v2.0 - CTAs that compel without pressure.*
