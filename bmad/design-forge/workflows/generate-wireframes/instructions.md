# Generate Wireframes - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/design-forge/workflows/generate-wireframes/workflow.yaml</critical>
<critical>Communicate with {user_name} in {communication_language} throughout this workflow</critical>

## Purpose

This workflow generates 5 low-fidelity wireframe variations for a section BEFORE applying visual styling. This separates structural decisions from aesthetic decisions, resulting in better final designs.

**Why Wireframes First?**
- Evaluate STRUCTURE independently from STYLE
- Fewer variables = easier decision-making
- Prevents wasted effort on beautiful designs with bad structure
- Selected wireframe becomes constraint for styled prototypes

<workflow>

<step n="1" goal="Gather section requirements">
  <action>Greet {user_name} in {communication_language}</action>

  <action>Explain the wireframe-first approach:

"Before we style anything, let's nail the structure. I'll generate 5 different layout approaches for you to choose from. Each focuses purely on:

- **Layout** (where things go)
- **Hierarchy** (what's most important)
- **Proportions** (relative sizes)
- **Flow** (reading pattern)

No colors. No fonts. No visual polish. Just structure.

Once you pick a wireframe, we'll use it as the foundation for 5 beautifully styled prototypes."</action>

  <ask>Which section would you like to wireframe, {user_name}?

**Conversion-Focused:**
1. `hero` - Hero section (headline, CTA, visual)
2. `about-me` - About/Story section
3. `problem` - Problem awareness section
4. `vision` - Aspirational future-self
5. `solution` - Methodology/pillars section
6. `offer` - Conversion/purchase section
7. `testimonials` - Social proof section
8. `faq` - Frequently asked questions
9. `cta` - Call-to-action section
10. `form` - Lead capture/form section

**Structural:**
11. `navbar` - Navigation bar
12. `footer` - Footer section

Enter number or section name:</ask>

  <action>Store selection as {section_type}</action>
</step>

<step n="2" goal="Load section design brief for structural requirements">
  <action>Load section design brief from: {project-root}/bmad/design-forge/briefs/{section_type}.brief.md</action>

  <check if="brief file doesn't exist">
    <action>Inform {user_name}: "No design brief found for '{section_type}'. Proceeding with generic structural patterns."</action>
    <action>Use generic section requirements based on section_type</action>
  </check>

  <action>Extract STRUCTURAL requirements from brief:
  - Must-have elements (headline, subheadline, CTA, visual, etc.)
  - Layout priority order
  - Content hierarchy
  - Required vs optional elements
  - Anti-patterns to avoid</action>

  <action>Store as {structural_requirements}</action>
</step>

<step n="3" goal="Gather content context (optional but recommended)">
  <ask>Do you have copy/content ready for this section?

1. **Yes** - I'll provide the actual content
2. **No** - Use placeholder content

(Having real content helps create more accurate wireframes)

Enter 1 or 2:</ask>

  <check if="user provides content">
    <ask>Please paste your content (headline, subheadline, CTA text, etc.):</ask>
    <action>Store as {actual_content}</action>
    <action>Analyze content length and structure for wireframe sizing</action>
  </check>

  <check if="placeholder content">
    <action>Use generic placeholder text sized appropriately for section type</action>
  </check>
</step>

<step n="4" goal="Define 5 layout archetypes for this section type">
  <action>Based on {section_type} and {structural_requirements}, define 5 distinct layout approaches:

**LAYOUT ARCHETYPE SYSTEM:**

Each archetype represents a fundamentally different structural approach:

---

**ARCHETYPE A: CENTERED FOCUS**
- Single-column, centered layout
- Strong vertical hierarchy
- Content stacked: Visual → Headline → Subheadline → CTA
- Best for: Simple, direct messages
- Pattern: I-shaped reading flow

---

**ARCHETYPE B: SPLIT SCREEN**
- Two-column layout (50/50 or 60/40)
- Content left, visual right (or vice versa)
- Horizontal balance
- Best for: Content + visual pairing
- Pattern: Z-shaped reading flow

---

**ARCHETYPE C: ASYMMETRIC DYNAMIC**
- Off-center focal point
- Overlapping or offset elements
- Visual tension and energy
- Best for: Bold, modern brands
- Pattern: Dynamic diagonal flow

---

**ARCHETYPE D: LAYERED DEPTH**
- Foreground/background separation
- Content overlay on visual
- Creates depth and immersion
- Best for: Visual-heavy sections
- Pattern: Focused center with peripheral context

---

**ARCHETYPE E: MODULAR GRID**
- Multiple content blocks
- Card-based or grid structure
- Flexible arrangement
- Best for: Multiple proof points, features
- Pattern: Scannable, non-linear

---

**ADAPTATION RULES:**
- Adapt archetypes to section-specific requirements
- For Hero: All 5 archetypes work
- For Testimonials: Emphasize Modular Grid and variations
- For CTA: Emphasize Centered Focus and Split Screen
- For FAQ: Emphasize single-column with expandable structure</action>

  <action>For {section_type}, select the 5 most appropriate layout variations and customize them</action>

  <action>Store as {layout_archetypes} with descriptions</action>
</step>

<step n="5" goal="Ensure wireframe output folder exists">
  <action>Create wireframe output folder if needed:
  ```bash
  mkdir -p {wireframe_output_folder}
  ```</action>
</step>

<step n="6" goal="Spawn 5 parallel wireframe agents">
  <action>Launch 5 isolated agents in PARALLEL using the Task tool in a SINGLE message.

For each of the 5 layout archetypes, create a Task with `subagent_type: "general-purpose"` and this prompt structure:

```
You are a **Wireframe Architect** specializing in low-fidelity structural design.

**=== YOUR MISSION ===**

Create a LOW-FIDELITY WIREFRAME that focuses ONLY on structure. This is NOT a styled design.

**=== LAYOUT ARCHETYPE: {ARCHETYPE_NAME} ===**

{ARCHETYPE_DESCRIPTION}

**Layout Characteristics:**
- {layout_details}
- {content_arrangement}
- {reading_pattern}

**=== SECTION REQUIREMENTS ===**

**Section Type:** {section_type}

**Structural Requirements from Brief:**
{structural_requirements}

**Must-Have Elements:**
{list_of_required_elements}

**Content to Use:**
{actual_content OR placeholder_content}

**=== WIREFRAME RULES (CRITICAL) ===**

**DO:**
- Use ONLY grayscale (#FFFFFF, #F5F5F5, #E0E0E0, #9E9E9E, #424242, #212121)
- Use simple rectangles for images/visuals (with X through them)
- Use actual text sizing to show hierarchy (large for headlines, medium for body)
- Show relative proportions accurately
- Include all required elements from brief
- Use system font stack only (no custom fonts)
- Show responsive behavior (mobile-first, then desktop)
- Add subtle 1px borders to define element boundaries
- Include element labels (small gray text identifying what each box is)

**DON'T:**
- NO colors (except grayscale)
- NO gradients
- NO shadows (except subtle box definition)
- NO rounded corners (keep everything rectangular or with 2px radius max)
- NO animations
- NO icons (use labeled squares instead)
- NO images (use placeholder boxes with X)
- NO brand fonts
- NO decorative elements

**=== TECHNICAL REQUIREMENTS ===**

- Single self-contained HTML file
- Embed CSS in <style> tags
- Mobile-first responsive (375px, 768px, 1024px breakpoints)
- Height: 70-90vh for hero-type sections
- Include viewport meta tag
- System font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- Add HTML comment at top with wireframe metadata:

```html
<!--
WIREFRAME: {section_type}
LAYOUT: {archetype_name}
DESCRIPTION: {brief_description}
GENERATED: {date}

STRUCTURAL ELEMENTS:
- {element_1}: {position/size}
- {element_2}: {position/size}
...

READING PATTERN: {pattern_description}
HIERARCHY: {hierarchy_description}
-->
```

**=== FILE OUTPUT ===**

Save to: {wireframe_output_folder}/wireframe-{section_type}-{archetype_letter}.html

**IMPORTANT:** This is about STRUCTURE, not beauty. Make it clear, functional, and easy to evaluate for layout decisions.
```</action>

  <action>Store agent IDs for tracking</action>
</step>

<step n="7" goal="Wait for completion and validate outputs">
  <action>Wait for all 5 wireframe agents to complete</action>

  <action>Validate each wireframe:
  - File exists and is valid HTML
  - Contains only grayscale colors
  - Includes all required structural elements
  - Has proper metadata comment
  - Is responsive</action>

  <action>Store validation results</action>
</step>

<step n="8" goal="Present wireframes for selection">
  <action>Display to {user_name}:

---

## 5 Wireframe Layouts Generated

**Location:** {wireframe_output_folder}/

**Files Created:**

| # | File | Layout | Description |
|---|------|--------|-------------|
| A | wireframe-{section_type}-a.html | Centered Focus | {description_a} |
| B | wireframe-{section_type}-b.html | Split Screen | {description_b} |
| C | wireframe-{section_type}-c.html | Asymmetric Dynamic | {description_c} |
| D | wireframe-{section_type}-d.html | Layered Depth | {description_d} |
| E | wireframe-{section_type}-e.html | Modular Grid | {description_e} |

---

### How to Evaluate

Open each wireframe in your browser. Ask yourself:

1. **Does the layout support the message?**
   - Where does the eye go first?
   - Is the hierarchy clear?

2. **Does it work for the content length?**
   - Is there enough space for the actual copy?
   - Does the visual have appropriate prominence?

3. **Does it feel right for the brand?**
   - Bold and dynamic? Or calm and structured?
   - Modern or classic?

**Remember:** Ignore how it "looks" (it's intentionally ugly). Focus on how it's STRUCTURED.

---</action>

  <ask>Which wireframe layout works best for your section, {user_name}?

Enter A, B, C, D, or E:</ask>

  <action>Store selection as {selected_wireframe}</action>
</step>

<step n="9" goal="Save selection and provide next steps">
  <action>Create selection file at {selected_wireframe_file}:

```json
{
  "section_type": "{section_type}",
  "selected_layout": "{selected_wireframe}",
  "layout_archetype": "{archetype_name}",
  "wireframe_file": "{wireframe_output_folder}/wireframe-{section_type}-{selected_wireframe}.html",
  "structural_requirements": {structural_requirements},
  "content": {actual_content_or_null},
  "selected_at": "{date}",
  "ready_for_styling": true
}
```</action>

  <action>Display to {user_name}:

---

## Wireframe Selected: Layout {selected_wireframe} ({archetype_name})

**Your selection has been saved.**

**Selected wireframe:** {wireframe_file}
**Selection stored:** {selected_wireframe_file}

---

### What Happens Next

When you run `*generate`, Design Forge will:

1. Load your selected wireframe structure
2. Apply 5 different visual styles (archetypes) to THIS structure
3. Generate 5 prototypes that all share the same layout

This means you'll be comparing STYLES, not structures. Much easier to decide!

---

### Next Steps

| Option | Action |
|--------|--------|
| **Generate styled prototypes** | Use `*generate` (will auto-detect your wireframe) |
| **Choose different wireframe** | Run `*wireframe` again |
| **View wireframe** | Open {wireframe_file} in browser |

---

Ready to style? Just run `*generate`!</action>
</step>

</workflow>
