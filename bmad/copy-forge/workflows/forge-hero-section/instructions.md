# Forge Hero Section Workflow v2.0

Generate or regenerate hero section copy with sequential validation.

---

## Overview

This workflow creates hero sections (headline, subheadline, opening hook)
validated for both brand voice and audience resonance.

Use this workflow to:
- Generate a new hero section
- Regenerate/refine an existing hero section
- Test alternative headline approaches

---

## Inputs

### Required
- **brand_voice_document**: Brand voice doc (tone, vocabulary, personality)
- **avatar_profile**: Avatar profile (pain points, desires, language)

### Optional
- **word_count_target**: Target word count (default: 50-150 words)
- **headline_framework**: Preferred approach (benefit/transformation/problem/curiosity/direct)

---

## Pipeline Phases

### Phase 1: Context Gathering
**Agent**: Blueprint Coordinator

1. Request brand voice document path
2. Request avatar profile path
3. Gather strategic preferences (framework, word count)

### Phase 2: Hero Creation
**Agent**: Hero Writer

1. Analyze brand voice + avatar
2. Select headline framework
3. Create 3-5 headline variations
4. Select strongest headline
5. Craft subheadline and opening hook

### Phase 3: Brand Voice Validation
**Agent**: Brand Voice Guardian

Validate 7 criteria. All must pass.

### Phase 4: Audience Resonance Validation
**Agent**: Avatar Advocate

Validate 8 criteria from avatar POV. All must pass.

### Phase 5: Presentation
**Agent**: Blueprint Coordinator

Present validated hero section with scores and refinement options.

---

## Output

```markdown
HERO SECTION
============

HEADLINE:
[Headline text]

SUBHEADLINE:
[Subheadline text]

OPENING HOOK:
[Opening paragraph]

WORD COUNT: X words

VALIDATION:
- Brand Voice: 7/7 (100%)
- Audience Resonance: 8/8 (100%)

STRATEGIC RATIONALE:
- Framework: [Which and why]
- Brand alignment: [Key elements]
- Avatar connection: [Pain/desire addressed]
```

---

## Usage

```
/bmad:copy-forge:agents:blueprint-coordinator
*forge-hero-section
```

---

*Copy Forge v2.0 - Hero sections that stop the scroll.*
