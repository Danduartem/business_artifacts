# Remix Prototypes Workflow

**Status:** ✅ Implemented (v2.0)
**Type:** Interactive Workflow
**Complexity:** Advanced
**Duration:** 5-10 minutes

---

## Overview

The Remix Prototypes workflow is Design Forge's creative v2.0 feature that intelligently combines design elements from multiple generated prototypes into custom variations.

**Think of it as:**
- "This layout + that color scheme + those animations"
- Design DNA mixing with coherence validation
- The best elements from 5 prototypes combined into 1 perfect design

---

## Quick Start

**From Design Director:**
```
Load agent: /design-forge
Run: *remix
```

**Prerequisites:**
- At least 2 existing prototype HTML files
- Clear sense of which elements you prefer

**Basic flow:**
1. Select 2-5 source prototypes
2. Choose remix strategy (Interactive / Best-of / Hybrid)
3. Set output count (1-3 remixes)
4. Specify focus areas (layout, colors, typography, etc.)
5. Review and approve
6. Generate remix prototypes

---

## Files in This Workflow

### workflow.yaml
Complete workflow specification with:
- Input configuration
- 3 remix strategies (Interactive, Best-of, Hybrid)
- Element extraction logic
- Compatibility validation
- Conflict resolution
- Parallel generation

### instructions.md
Comprehensive 60+ page guide covering:
- Step-by-step walkthrough
- Strategy deep-dives
- Troubleshooting
- Best practices
- Advanced techniques
- Configuration reference

### Supporting Agents

**Remix Analyzer** (`/agents/remix-analyzer.agent.yaml`)
- Parses HTML prototypes
- Extracts 10 design parameters
- Calculates quality scores
- Builds compatibility matrix
- Generates conflict resolutions

---

## Three Remix Strategies

### 1. Interactive
**Control:** High - you choose every element
**Speed:** Slower (3-5 min)
**Best for:** Specific vision, learning the system

User selects elements category-by-category with real-time validation.

### 2. Best of Each (Recommended)
**Control:** Medium - AI selects based on quality
**Speed:** Fast (1-2 min)
**Best for:** Trust AI judgment, want best quality

AI analyzes elements, scores quality, tests harmony, selects optimal combinations.

### 3. Hybrid
**Control:** Low - AI creates fusion
**Speed:** Fast (1-2 min)
**Best for:** Discovering middle ground between archetypes

AI blends design philosophies into smooth gradient, creating unique new archetype.

---

## How It Works

### Phase 1: Analysis
```
Remix Analyzer parses each prototype:
├── Extract CSS (colors, typography, spacing, animations)
├── Extract HTML (layout structure, semantic patterns)
├── Score elements (clarity, sophistication, innovation, accessibility, technical)
├── Identify archetype signatures
└── Build compatibility matrix
```

### Phase 2: Selection
```
Based on chosen strategy:

Interactive:
└── User selects element-by-element with validation

Best-of:
├── AI scores all elements (0-100)
├── Tests combinations for harmony
├── Applies user's focus priorities
└── Generates N optimal combinations

Hybrid:
├── Identifies archetype signatures
├── Calculates weighted blends
├── Validates coherence
└── Creates fusion specification
```

### Phase 3: Validation
```
Compatibility checks:
├── Color contrast (WCAG compliance)
├── Typography scale alignment
├── Spacing system compatibility
├── Animation timing harmony
└── Component coherence

If conflicts:
└── Generate specific resolutions with options
```

### Phase 4: Generation
```
For each remix:
├── Spawn designer agent with custom prompt
├── Provide selected elements as constraints
├── Apply conflict resolutions
├── Maintain design principles compliance
└── Generate production-ready HTML with documentation
```

---

## Output

**Generated files:**
```
{prototype_output_folder}/
├── remix-20251110-145533-1.html  (First remix)
├── remix-20251110-145533-2.html  (Second remix)
└── .remix-metadata.json           (Tracking metadata)
```

**Each HTML includes:**
- Production-ready self-contained code
- Embedded design rationale comments
- Source prototype attributions
- Element selection explanations
- Archetype blend percentages
- Coherence scores

**Metadata tracks:**
- Source prototypes used
- Strategy and focus areas
- Element selection decisions
- Conflict resolutions applied
- Generation timestamps

---

## Quality Assurance

**Every remix validated for:**
- ✓ Valid HTML structure
- ✓ WCAG 2.1 AA accessibility
- ✓ Responsive (375px, 768px, 1440px)
- ✓ 60fps animations
- ✓ Coherence score ≥80

**Coherence scoring:**
- **90-100:** Exceptional harmony (naturally compatible)
- **80-89:** Strong coherence (minor adjustments)
- **70-79:** Good blend (creative tension)
- **60-69:** Challenging (significant conflicts)
- **<60:** Incompatible (not recommended)

---

## Configuration

**Module config values used:**
```yaml
prototype_output_folder: '{project-root}/prototype/'
design_principles_path: '{project-root}/context/design-principles.md'
style_guide_path: '{project-root}/context/style-guide.md'
include_design_rationale: true
```

---

## Use Cases

**Perfect for:**
- "I love 2 different prototypes equally"
- "This layout with that color scheme"
- Exploring hybrid archetype approaches
- Creating variations beyond the original 5
- A/B testing material generation

**Typical workflow:**
```
Day 1: Generate 5 prototypes (*generate)
       Review with stakeholders
       Identify favorite elements

Day 2: Remix best elements (*remix)
       Generate 2-3 combinations
       Compare with originals

Day 3: Select winner
       Extract to production
```

---

## Best Practices

**Do:**
- ✓ Start with quality source prototypes
- ✓ Use compatible archetypes (check harmony)
- ✓ Focus on 2-3 parameters for strong coherence
- ✓ Trust the validation and accept resolutions
- ✓ Generate multiple outputs to compare
- ✓ Read embedded documentation

**Don't:**
- ✗ Remix too many prototypes at once (5+ gets complex)
- ✗ Ignore coherence scores (<80 needs attention)
- ✗ Mix all 6 parameters without strategy
- ✗ Skip validation step
- ✗ Expect magic (combines existing, doesn't invent)

---

## Future Enhancements (v2.5+)

**Planned features:**
- Visual diff showing changes from originals
- A/B testing suggestions
- Export remixes as reusable templates
- Learning system (remember preferences)
- Context-aware suggestions

---

## Version History

**v2.0.0** (2025-11-10)
- Initial implementation
- 3 remix strategies (Interactive, Best-of, Hybrid)
- Remix Analyzer agent with full element extraction
- Compatibility matrix and conflict resolution
- Comprehensive documentation

---

## Related Documentation

**Read next:**
- `instructions.md` - Complete step-by-step guide (60+ pages)
- `/agents/remix-analyzer.agent.yaml` - Technical specs for analysis agent
- `/templates/README.md` - Understanding the 5 archetypes
- `workflow.yaml` - Full workflow specification

**Module docs:**
- `/bmad/design-forge/README.md` - Design Forge overview
- `/bmad/design-forge/TODO.md` - Development roadmap
- `/docs/module-brief-design-forge-2025-11-10.md` - Strategic blueprint

---

**Remix Prototypes - Where the best ideas from 5 prototypes become 1 perfect design.**

**Version:** 2.0.0
**Status:** Production Ready
**Maintained by:** Design Forge Module
