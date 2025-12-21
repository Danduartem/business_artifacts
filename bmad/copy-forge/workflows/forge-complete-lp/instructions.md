# Forge Complete Landing Page Workflow v2.0

This workflow generates complete landing page copy through a sequential
multi-agent pipeline with validation feedback loop.

---

## Overview

Copy Forge v2 coordinates 5 specialized agents:

1. **Blueprint Coordinator** - Orchestrates pipeline and cohesion review
2. **Hero Writer** - Creates headlines, subheadlines, opening hooks
3. **CTA Specialist** - Creates calls-to-action, friction reduction
4. **Brand Voice Guardian** - Validates 7 voice criteria
5. **Avatar Advocate** - Validates 8 audience resonance criteria

**Key Features:**
- Sequential validation (Brand Voice → Audience → User)
- Feedback loop (max 3 rounds per section)
- 2 output files only (80/20 rule)
- All criteria must pass (no partial validation)

---

## Inputs

### Required
- **lp_blueprint**: LP Architect blueprint (sections, word counts, purposes)
- **brand_voice_document**: Brand voice doc (tone, vocabulary, personality)
- **avatar_profile**: Avatar profile (pain points, desires, objections, language)

### Optional
- **urgency_level**: For CTAs (genuine deadline or ongoing)
- **word_count_tolerance**: Percentage tolerance (default: ±10%)

---

## Pipeline Phases

### Phase 1: Context Gathering
**Agent**: Blueprint Coordinator

**Actions**:
1. Request LP blueprint path
2. Request brand voice document path
3. Request avatar profile path
4. Parse blueprint: extract sections, word counts, purposes
5. Present interpretation for user confirmation

---

### Phase 2: Section-by-Section Creation
**Agents**: Hero Writer, CTA Specialist

**Actions**:
1. For each section in blueprint:
   - Create creative brief (section + brand voice + avatar)
   - Route to appropriate copywriter:
     - hero → Hero Writer
     - cta → CTA Specialist
     - other → Hero Writer (general)
2. Receive copy from copywriter
3. Route to validation (Phase 3)

---

### Phase 3: Brand Voice Validation
**Agent**: Brand Voice Guardian

**Actions**:
1. Validate copy against 7 criteria:
   - Tone alignment
   - Vocabulary choices
   - Sentence rhythm
   - Personality expression
   - Messaging consistency
   - Authenticity
   - Emotional resonance
2. Score each criterion: Pass or Flag

**Quality Gate**: 7/7 must pass (100%)

**Feedback Loop**: If <7 pass, return to copywriter with feedback

---

### Phase 4: Audience Resonance Validation
**Agent**: Avatar Advocate

**Actions**:
1. Validate copy against 8 criteria (from avatar POV):
   - Language match
   - Pain point resonance
   - Desire alignment
   - Objection handling
   - Clarity level
   - Relatability
   - Emotional connection
   - Trust building
2. Score each criterion: Pass or Flag

**Quality Gate**: 8/8 must pass (100%)

**Feedback Loop**: If <8 pass, return to copywriter with avatar feedback

---

### Phase 5: Cohesion Review
**Agent**: Blueprint Coordinator

**Actions**:
1. Review complete LP for:
   - Flow between sections
   - Message consistency
   - Tone maintenance
   - Avatar emotional journey
   - Strategic structure
2. Flag cohesion issues if found
3. Request refinements if needed

---

### Phase 6: Final Compilation
**Agent**: Blueprint Coordinator

**Actions**:
1. Compile `{brand}-landing-page.md`
2. Compile `{brand}-validation-report.md`
3. Present summary with scores to user
4. Offer refinement options

---

## Output Files

### {brand}-landing-page.md
Complete copy with all sections:

```markdown
# [Brand] Landing Page

## Hero Section
[Headline]
[Subheadline]
[Opening hook]

## [Section 2]
[Copy]

## Call to Action
[CTA copy]
```

### {brand}-validation-report.md
Validation scores and feedback:

```markdown
# Validation Report

## Summary
- Brand Voice Alignment: X%
- Audience Resonance: X%
- Cohesion: Passed

## Section Scores
[Per-section breakdown]

## Feedback History
[Revision notes if any]
```

---

## Quality Thresholds

| Metric | Minimum | Blocking? |
|--------|---------|-----------|
| Brand Voice (7/7) | 100% | Yes |
| Audience Resonance (8/8) | 100% | Yes |
| Word Count Tolerance | ±10% | No |

Feedback loop: Max 3 rounds per section.

---

## Usage

### Start Workflow
```
/bmad:copy-forge:agents:blueprint-coordinator
```

### Generate Complete LP
```
*forge-complete-lp
```

---

*Copy Forge v2.0 - Results + Connection = Sustainable Conversion. 2 files. Production ready.*
