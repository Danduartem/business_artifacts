# Design Forge Section Briefs

This folder contains professional design briefs for each landing page section type. These briefs ensure that Design Forge generates purpose-driven designs that solve communication problems, not just aesthetic exercises.

## What's in a Design Brief?

Each brief contains:

### 1. **Purpose & Psychological Goal**
- The section's job (what it must accomplish)
- Desired psychological outcome (how visitor should feel)
- User journey moment (where this fits in the conversion path)

### 2. **Structural Requirements**
- Must-have elements (headline, CTA, photo, etc.)
- Layout priority (visual hierarchy: first → second → third)
- Optional elements (what can be added if needed)

### 3. **Content Strategy**
- Message framework (how to structure the message)
- Copy principles (what makes copy effective)
- Tone and voice guidelines

### 4. **Visual Guidelines**
- Layout options (patterns that work for this section)
- Typography & color strategy
- Imagery treatment (how to use photos/illustrations)
- Composition principles

### 5. **Accessibility & Performance**
- Non-negotiable accessibility requirements
- Performance targets
- Mobile optimization guidelines

### 6. **Anti-Patterns**
- What NOT to do (common mistakes to avoid)
- Why these patterns fail

### 7. **Success Criteria**
- Validation checklist (how to know if the design works)
- Quick QA tests (5-second test, squint test, etc.)

---

## Available Briefs

### Conversion-Focused Sections

#### **hero.brief.md**
First impression section. Job: In 3 seconds, communicate what it is, who it's for, and what to do next.

#### **about-me.brief.md**
Trust-building section. Job: Build credibility through vulnerability + authority balance, create personal connection.

#### **problem.brief.md**
Problem amplification. Job: Make visitor feel deeply understood, create desire for solution.

#### **vision.brief.md**
Aspirational future-self. Job: Replace fear with possibility, activate dream state, create desire through vision.

#### **solution.brief.md**
Methodology presentation. Job: Present unique solution (5-pillar framework), build confidence in approach.

#### **offer.brief.md**
Conversion section. Job: Present offer with crystal clarity, remove all friction for purchase decision.

#### **testimonials.brief.md**
Social proof. Job: Build credibility through authentic customer results, reduce purchase risk.

#### **faq.brief.md**
Objection handling. Job: Remove last objections right before conversion, build confidence.

#### **cta.brief.md**
Call-to-action. Job: Create final conversion moment with maximum clarity, minimum friction.

#### **form.brief.md**
Form experience. Job: Capture right information with minimum friction, maximum clarity, security feeling. Supports simple lead forms, applications, checkout, and conversational one-question-at-a-time flows.

### Structural Sections

#### **navbar.brief.md**
Navigation bar. Job: Provide clear navigation and reinforce brand without disrupting flow.

#### **footer.brief.md**
Footer. Job: Site navigation, legal compliance, contact info, final conversion opportunity.

---

## How Design Forge Uses These Briefs

When you select a section type to generate:

1. **Design Director loads the appropriate brief** from this folder
2. **Extracts all requirements** (purpose, structure, content strategy)
3. **Combines with user input** (brand, audience, actual copy)
4. **Synthesizes design direction** that fulfills psychological purpose
5. **Spawns 5 designer agents** who use the brief as their FOUNDATION
6. **Each archetype applies aesthetic philosophy** ON TOP of the brief's requirements

### The Result:
Designs that:
- ✅ Fulfill psychological purpose (not just pretty)
- ✅ Follow proven conversion principles
- ✅ Avoid common mistakes (anti-patterns documented)
- ✅ Pass success criteria (built-in quality checks)
- ✅ Look beautiful (5 distinct aesthetic variations)

---

## Brief Source

These briefs were adapted from professional best practices guides:
- `1_hero_section_guide.md`
- `2_problem_section_guide.md`
- `2_vision_section_guide.md`
- `3_solution_section_guide.md`
- `4_aboutme_section_guide.md`
- `6_offer_section_guide.md`
- `7_faq_section_guide.md`

Additional briefs (testimonials, CTA, navbar, footer) were created following the same comprehensive framework.

---

## Extending the System

To add a new section type:

1. **Create a new brief file**: `[section-name].brief.md`
2. **Follow the standard structure**:
   - Purpose & Psychological Goal
   - Structural Requirements
   - Content Strategy
   - Visual Guidelines
   - Accessibility & Performance
   - Anti-Patterns
   - Success Criteria
3. **Update design-director.md**: Add section to the menu
4. **Test generation**: Run `*generate` and select your new section

---

## Why This Works

### Before (v1.0 - Aesthetic-Only):
```
User: "Generate a hero section, modern and professional"
Agent: Interprets through aesthetic lens only
Result: 5 beautiful designs with no clear PURPOSE
```

### After (v2.0 - Brief-Driven):
```
User: "Generate a hero section"
Agent: Loads hero.brief.md (3-second clarity, WHO + WHAT + ACTION)
Agent: Combines brief + user's brand + actual copy
Result: 5 beautiful designs that SOLVE THE COMMUNICATION PROBLEM
```

The difference: **Purpose drives aesthetics, not the other way around.**

---

## Design Philosophy

> "Good design isn't about making it pretty — it's about solving communication problems with visual clarity."

These briefs embody this philosophy by:
1. **Starting with purpose** (not aesthetics)
2. **Defining success criteria** (not subjective opinions)
3. **Documenting anti-patterns** (learning from failures)
4. **Providing structure** (constraints unlock creativity)

---

## Version History

- **v2.1** (2025-11-14): Form brief added
  - Comprehensive form experience design brief
  - Covers simple forms, applications, checkout, and conversational flows
  - 30 sections covering all form design aspects

- **v2.0** (2025-11-10): Full brief system implemented
  - 11 comprehensive section briefs
  - Integration with Design Director agent
  - Purpose-driven design approach

- **v1.0** (2024): Original archetype-only system
  - Aesthetic-focused generation
  - No structured briefs
  - Inconsistent quality

---

## Questions?

If you're unsure which section type to use:
- Run `*sections` to see all available sections with descriptions
- Read the relevant brief to understand the section's purpose
- Choose based on PSYCHOLOGICAL GOAL, not just visual style
