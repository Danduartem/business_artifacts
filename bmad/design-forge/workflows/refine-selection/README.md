# Refine Selection Workflow

**Status:** ✅ Implemented (v1.5)
**Type:** Interactive Workflow
**Complexity:** Medium
**Duration:** 3-7 minutes per iteration (2-3 iterations typical)

---

## Overview

The Refine Selection workflow transforms Design Forge into a conversation partner, enabling iterative refinement of a single prototype through natural language feedback.

**Think of it as:**
- Sculptor refining a clay model
- Conversing with a designer: "Make it more playful"
- Polish the 90% solution into the 98% solution

---

## Quick Start

**From Design Director:**
```
Load agent: /design-forge
Run: *refine
```

**Prerequisites:**
- At least 1 existing prototype to refine
- Clear sense of what to improve

**Basic flow:**
1. Select prototype to refine
2. Choose mode (Conversational/Guided/Hybrid)
3. Set iteration limit (default: 3)
4. Provide feedback → AI translates to parameters
5. Review changes → Accept or continue
6. Repeat until satisfied

---

## Files in This Workflow

### workflow.yaml
Complete workflow specification with:
- 3 refinement modes (Conversational, Guided, Hybrid)
- Iterative feedback loop
- Quality validation
- Change tracking
- Iteration limiting

### instructions.md
Comprehensive 70+ page guide covering:
- Mode-by-mode walkthroughs
- Feedback translation examples
- Parameter adjustment guides
- Troubleshooting
- Advanced techniques

### Supporting Agents

**Feedback Analyzer** (`/agents/feedback-analyzer.agent.yaml`)
- Parses natural language feedback
- Maps feedback to design parameters
- Validates proposed changes
- Predicts quality impact
- Generates change specifications

---

## Three Refinement Modes

### 1. Conversational
**Input:** Natural language ("Make it more playful")
**Control:** Medium - AI interprets intent
**Speed:** Fast
**Best for:** Quick iterations, exploring direction

### 2. Guided
**Input:** Systematic parameter sliders/options
**Control:** High - direct parameter control
**Speed:** Moderate
**Best for:** Specific known changes, precision

### 3. Hybrid (Recommended)
**Input:** Natural language + guided fine-tuning
**Control:** High with AI assistance
**Speed:** Moderate
**Best for:** Best results, combines ease + precision

---

## How It Works

### Phase 1: Baseline Analysis
```
Feedback Analyzer parses prototype:
├── Extract current design parameters
├── Identify archetype influence
├── Score quality metrics
└── Establish "before" snapshot
```

### Phase 2: Feedback Collection
```
Based on chosen mode:

Conversational:
└── User: "Make it more playful"

Guided:
├── User selects: "Colors"
├── Adjusts: Saturation 35% → 55%
└── Sets: Warmth to "Warm"

Hybrid:
├── User: "More playful"
├── AI proposes: Saturation +20%, animations -25%
└── User fine-tunes: Actually 55% saturation, 225ms animations
```

### Phase 3: Interpretation
```
Feedback Analyzer translates to parameters:

"More playful" →
├── Saturation: 35% → 55%
├── Animation: 300ms → 225ms
├── Typography weight: 500 → 400
├── Button radius: 6px → 10px
└── Archetype: -20% Professional, +20% Bold Innovator
```

### Phase 4: Validation
```
Quality checks:
├── Accessibility (contrast, touch targets, font sizes)
├── Coherence (archetype mixing, visual harmony)
├── Technical (responsive, performance, valid CSS)
└── If issues: Provide alternatives
```

### Phase 5: Generation
```
Spawn designer agent:
├── Apply validated changes
├── Maintain quality standards
├── Generate refined HTML
└── Embed changelog documentation
```

### Phase 6: Iteration Loop
```
Present comparison:
├── Show before/after metrics
├── List all changes applied
├── Display quality impact
└── User decides: Satisfied or continue?

If continue and iterations < limit:
└── Return to Phase 2 (gather more feedback)

If satisfied or limit reached:
└── Finalize and save
```

---

## Output

**Generated files:**
```
{prototype_output_folder}/
├── original-prototype.html
├── original-prototype-refined-20251110-151200.html
└── .refinement-history.json
```

**Each refined HTML includes:**
- Updated design based on feedback
- Embedded changelog explaining changes
- Iteration history
- Quality metrics progression
- Before/after parameter comparison

**Metadata tracks:**
- All iterations and feedback
- Cumulative parameter changes
- Quality metric evolution
- User satisfaction per iteration

---

## Example Refinement Session

**Iteration 1:**
```
User: "Make it more playful and less corporate"

AI interprets:
- Saturation 35% → 55%
- Animation 300ms → 225ms
- Weight 500 → 400
- Archetype: -20% Professional, +20% Bold

Result: Coherence 91 → 84 (still strong)
User: "Close, but buttons need more prominence"
```

**Iteration 2:**
```
User: "Buttons don't pop enough"

AI interprets:
- Button shadow: none → subtle
- Button weight: 400 → 600
- Button saturation: 55% → 70% (buttons only)

Result: Coherence 84 → 83
User: "Perfect!"
```

**Final:** 2 iterations, 7 minutes, satisfied result

---

## Key Features

### Natural Language Processing
- "More playful" → +20% saturation, faster animations
- "Too cramped" → +30% spacing
- "Less corporate" → Reduce Professional archetype

### Intelligent Parameter Mapping
10 design parameters tracked:
1. Color scheme (saturation, warmth, contrast)
2. Typography (fonts, sizes, weights)
3. Spacing (density, rhythm, whitespace)
4. Layout (structure, alignment)
5. Animations (speed, intensity, easing)
6. Components (buttons, cards, forms)
7. Visual weight (prominence, balance)
8. Content arrangement (grouping, flow)
9. Visual style (overall aesthetic)
10. Archetype influence (personality shifts)

### Quality Validation
- WCAG 2.1 AA accessibility maintained
- Coherence score ≥80 enforced
- Responsive behavior preserved
- 60fps animation performance
- Valid production-ready code

### Iteration Management
- Default limit: 3 iterations
- Prevents endless tweaking
- Extendable if needed
- Tracks cumulative changes

---

## Use Cases

**Perfect for:**
- Prototype is 90% there, needs polish
- Stakeholder feedback to incorporate
- "I like this but more [adjective]"
- Fine-tuning specific aspects
- Bridging vision gap

**Typical workflow:**
```
Day 1: *generate → Get 5 prototypes
       Review → Pick favorite

Day 2: *refine → "More modern and spacious"
       Iteration 1 complete
       *refine → "Button prominence increase"
       Iteration 2 complete
       Satisfied!

Day 3: Extract to production
```

---

## Best Practices

**Do:**
- ✓ Start with best prototype
- ✓ Use Hybrid mode for balance
- ✓ Provide specific feedback
- ✓ Accept validation suggestions
- ✓ Stop at 2-3 iterations
- ✓ Review cumulative changes

**Don't:**
- ✗ Refine mediocre prototypes
- ✗ Change everything at once
- ✗ Ignore quality warnings
- ✗ Iterate endlessly (>5)
- ✗ Give vague feedback
- ✗ Contradict yourself

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

## Future Enhancements (v2.0+)

**Planned features:**
- Visual diff (side-by-side before/after)
- Undo specific changes (not just revert all)
- Refinement templates (reusable patterns)
- A/B testing suggestions
- Learning from patterns

---

## Version History

**v1.5.0** (2025-11-10)
- Initial implementation
- 3 refinement modes (Conversational, Guided, Hybrid)
- Feedback Analyzer agent with NLP
- Quality validation system
- Iteration management
- Comprehensive documentation

---

## Related Documentation

**Read next:**
- `instructions.md` - Complete step-by-step guide (70+ pages)
- `/agents/feedback-analyzer.agent.yaml` - Technical specs
- `workflow.yaml` - Full workflow specification

**Module docs:**
- `/bmad/design-forge/README.md` - Design Forge overview
- `/bmad/design-forge/TODO.md` - Development roadmap

---

**Refine Selection - Polish the 90% solution into the 98% solution.**

**Version:** 1.5.0
**Status:** Production Ready
**Maintained by:** Design Forge Module
