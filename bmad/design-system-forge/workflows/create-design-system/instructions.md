# Create Design System - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/design-system-forge/workflows/create-design-system/workflow.yaml</critical>
<critical>Communicate with {user_name} in {communication_language} throughout this workflow</critical>

## Purpose

This workflow orchestrates the complete creation of a design system from brand inputs. It coordinates 4 specialized agents to produce tokens, component specifications, accessibility audit, and comprehensive documentation.

**Pipeline Overview:**
1. Validate inputs → 2. Generate tokens → 3. Specify components → 4. Audit accessibility → 5. Generate documentation → 6. Export

<workflow>

<step n="1" goal="Greet user and explain the process">
  <action>Greet {user_name} in {communication_language}</action>

  <check if="{lightweight_mode} is true">
    <action>Explain the lightweight design system creation process:

"Welcome to the Design System Forge Pipeline! (Lightweight Mode)

I'll create a focused design system optimized for context efficiency.

**Lightweight Mode Benefits:**
- 10 essential components (not 34) - covers all core patterns
- Agents write files directly, return summaries only
- Quick accessibility check (not full audit)
- Minimal documentation

**What You'll Get:**
- Design tokens (JSON + CSS custom properties)
- 10 component specifications: {essential_components}
- Basic accessibility check
- Quick-start documentation

**Estimated Time:** 5-8 minutes

Let's verify your inputs and get started!"</action>
  </check>

  <check if="{lightweight_mode} is false or not set">
    <action>Explain the full design system creation process:

"Welcome to the Design System Forge Pipeline!

I'll guide you through creating a comprehensive design system from your brand assets. This process involves 4 specialized agents working together:

**The Team:**
1. **Token Architect** - Extracts and structures all design tokens
2. **Component Specifier** - Creates detailed component specifications
3. **Accessibility Auditor** - Validates WCAG 2.1 AA compliance
4. **Documentation Writer** - Produces comprehensive usage docs

**What You'll Get:**
- Design tokens (JSON + CSS custom properties)
- Component specifications (34 components)
- Accessibility audit report
- Complete documentation

**Estimated Time:** 10-15 minutes

⚠️ **Note:** Full mode may cause context overflow in long conversations.
Set `lightweight_mode: true` in config.yaml if you experience issues.

Let's verify your inputs and get started!"</action>
  </check>
</step>

<step n="2" goal="Validate required inputs">
  <action>Check for required input files:</action>

  <action>Display input status to {user_name}:

"## Input Verification

| Input | Path | Status |
|-------|------|--------|
| Brand Guide | {brand_guide_path} | [CHECK IF EXISTS] |
| Style Guide | {style_guide_path} | [CHECK IF EXISTS] |
| Color Palette | {color_palette_path} | [CHECK IF EXISTS] |
| References | {references_path} | [OPTIONAL] |
| Logo | {logo_path} | [OPTIONAL] |

**Required:** Brand Guide, Style Guide, Color Palette
**Optional:** References, Logo"</action>

  <check if="any required file is missing">
    <action>Inform {user_name} which files are missing</action>
    <ask>Would you like to:

1. **Provide file paths** - Tell me where your files are located
2. **Paste content directly** - I'll create the files for you
3. **Use templates** - Start with template content to customize

Enter 1, 2, or 3:</ask>

    <check if="user chooses 1">
      <ask>Please provide the paths to your files:

**Brand Guide:** (path or "skip")
**Style Guide:** (path or "skip")
**Color Palette:** (path or "skip")</ask>
      <action>Update config with new paths</action>
    </check>

    <check if="user chooses 2">
      <action>Guide user through pasting content for each required input</action>
      <action>Create files in {project-root}/bmad/design-system-forge/briefs/</action>
    </check>

    <check if="user chooses 3">
      <action>Create template files for user to customize</action>
      <action>Inform user to edit files and run workflow again</action>
    </check>
  </check>

  <check if="all required files exist">
    <action>Confirm: "All required inputs verified. Ready to proceed!"</action>
  </check>
</step>

<step n="3" goal="Load and analyze all inputs">
  <action>Load all input files:
  - Read {brand_guide_path} completely
  - Read {style_guide_path} completely
  - Read {color_palette_path} completely
  - Read {references_path} if exists
  </action>

  <action>Analyze and summarize inputs for {user_name}:

"## Input Analysis

**Brand Guide Summary:**
- Brand personality: {extracted traits}
- Voice/tone: {extracted voice}
- Key principles: {extracted principles}

**Style Guide Summary:**
- Typography: {font families, sizes found}
- Spacing: {spacing system found}
- Other rules: {any additional rules}

**Color Palette Summary:**
- Primary colors: {list}
- Secondary colors: {list}
- Neutral scale: {list}
- Status colors: {list}

**References:** {count} inspiration sources"</action>

  <ask>Does this summary look correct? Should I proceed with token generation?

Enter Y to continue or provide corrections:</ask>
</step>

<step n="4" goal="Create output directory structure">
  <action>Create output directories:
  ```bash
  mkdir -p {tokens_output}
  mkdir -p {components_output}
  mkdir -p {docs_output}
  ```</action>

  <action>Inform {user_name}: "Output directories created at {design_system_output}"</action>
</step>

<step n="5" goal="Generate design tokens (Token Architect)">
  <action>Display progress: "## Phase 1: Token Generation (Token Architect)"</action>

  <action>Spawn Token Architect agent using Task tool with `subagent_type: "general-purpose"`:

```
You are the **Token Architect**, creating design tokens for {design_system_name}.

**=== YOUR MISSION ===**

Extract and structure design tokens from the provided brand assets into a comprehensive 3-tier token system.

**=== INPUTS (ALREADY LOADED) ===**

**Brand Guide Content:**
{PASTE COMPLETE BRAND GUIDE CONTENT HERE}

**Style Guide Content:**
{PASTE COMPLETE STYLE GUIDE CONTENT HERE}

**Color Palette Content:**
{PASTE COMPLETE COLOR PALETTE CONTENT HERE}

**=== TOKEN ARCHITECTURE ===**

Create a 3-tier token system:

**Tier 1: Global/Reference Tokens**
Raw values with no semantic meaning.
Naming: `{category}-{subcategory}-{scale}`
Example: `color-blue-500`, `spacing-4`

**Tier 2: Semantic/Alias Tokens**
Purpose-based references to global tokens.
Naming: `{category}-{role}-{modifier}`
Example: `color-primary`, `color-text-secondary`

**Tier 3: Component Tokens**
Component-specific overrides.
Naming: `{component}-{property}-{state}`
Example: `button-background-hover`

**=== TOKEN CATEGORIES ===**

1. **Colors**
   - Palette: Full scales for each brand color (50-900)
   - Semantic: primary, secondary, background, text, border, status
   - States: hover, active, focus, disabled

2. **Typography**
   - Font families: primary, secondary, mono
   - Font sizes: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
   - Font weights: light(300), regular(400), medium(500), semibold(600), bold(700)
   - Line heights: tight(1.25), normal(1.5), relaxed(1.75)
   - Letter spacing: tight(-0.025em), normal(0), wide(0.025em)

3. **Spacing**
   - Scale: 0, 1(4px), 2(8px), 3(12px), 4(16px), 5(20px), 6(24px), 8(32px), 10(40px), 12(48px), 16(64px)
   - T-shirt: xs(4px), sm(8px), md(16px), lg(24px), xl(32px), 2xl(48px)

4. **Borders**
   - Radius: none, sm(2px), md(4px), lg(8px), xl(12px), 2xl(16px), full(9999px)
   - Width: thin(1px), medium(2px), thick(4px)

5. **Shadows**
   - Levels: none, sm, md, lg, xl, 2xl
   - Focus ring

6. **Motion**
   - Duration: instant(0), fast(150ms), normal(300ms), slow(500ms)
   - Easing: linear, ease-in, ease-out, ease-in-out

**=== OUTPUT FILES ===**

Create TWO files:

**File 1: {tokens_output}/tokens.json**
Complete JSON in Style Dictionary format with all 3 tiers.

**File 2: {tokens_output}/tokens.css**
CSS custom properties with organized sections and comments.

**=== QUALITY REQUIREMENTS ===**

- All values from inputs captured
- Semantic tokens reference global (not hardcoded)
- Consistent naming throughout
- Well-commented CSS
- Valid JSON structure
```</action>

  <action>Wait for Token Architect to complete</action>

  <action>Validate outputs:
  - tokens.json exists and is valid JSON
  - tokens.css exists and has all variables</action>

  <action>Report to {user_name}:
  "Token generation complete!
  - {tokens_output}/tokens.json
  - {tokens_output}/tokens.css"</action>
</step>

<step n="6" goal="Generate component specifications (Component Specifier)">
  <action>Display progress: "## Phase 2: Component Specifications (Component Specifier)"</action>

  <check if="{lightweight_mode} is true">
    <action>Use essential components list for lightweight mode:

**Essential Components (10):** {essential_components}

These 10 components cover all major UI patterns. Additional components can be generated later.</action>

    <action>Spawn a SINGLE Component Specifier agent (not parallel) with summary-only output:

Create ONE Task with `subagent_type: "general-purpose"`:

```
You are the **Component Specifier**, creating component specs for {design_system_name}.

**=== CRITICAL: SUMMARY-ONLY MODE ===**

Write files directly to disk. Return ONLY a brief summary like:
"✅ Created 10 component specs:
- button.md (423 lines)
- input.md (512 lines)
..."

DO NOT return full file contents. This prevents context overflow.

**=== YOUR MISSION ===**

Create specifications for these 10 essential components: {essential_components}

**=== DESIGN TOKENS ===**

Load tokens from: {tokens_output}/tokens.json
Use ONLY token references. Never hardcode values.

**=== OUTPUT ===**

Save each component to: {components_output}/{component-name}.md

**=== RESPONSE FORMAT ===**

After writing all files, respond with ONLY:
1. Count of components created
2. List of filenames with line counts
3. Any issues encountered

DO NOT include file contents in your response.
```</action>
  </check>

  <check if="{lightweight_mode} is false or not set">
    <action>Based on {component_scope} = "comprehensive", define component list:

**Foundation (3):** Typography, Icon, Divider
**Actions (3):** Button, IconButton, Link
**Forms (8):** Input, Textarea, Select, Checkbox, Radio, Switch, Slider, FormField
**Data Display (6):** Badge, Tag, Avatar, Card, Table, List
**Feedback (5):** Alert, Toast, Progress, Skeleton, Tooltip
**Navigation (5):** Tabs, Breadcrumb, Pagination, Navbar, Sidebar
**Overlay (4):** Modal, Dropdown, Popover, Drawer

**Total: 34 components**

⚠️ **Warning:** Full component generation may cause context overflow.</action>

    <action>Spawn multiple Component Specifier agents in PARALLEL (batch by category):

For each category, create a Task with `subagent_type: "general-purpose"`:

```
You are the **Component Specifier**, creating component specs for {design_system_name}.

**=== YOUR MISSION ===**

Create comprehensive specifications for these {category} components: {component_list}

**=== DESIGN TOKENS (LOAD FIRST) ===**

Load tokens from: {tokens_output}/tokens.json

Use ONLY token references in specifications. Never hardcode values.

**=== SPECIFICATION TEMPLATE (FOR EACH COMPONENT) ===**

# {ComponentName}

## Overview
[What it is, when to use it]

## Anatomy
[ASCII diagram of parts]

## Variants
| Variant | Use Case | Visual Difference |
|---------|----------|-------------------|

## Sizes
| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| sm | var(--spacing-lg) | var(--spacing-sm) var(--spacing-md) | var(--font-size-sm) |
| md | var(--spacing-xl) | var(--spacing-md) var(--spacing-lg) | var(--font-size-md) |
| lg | var(--spacing-2xl) | var(--spacing-md) var(--spacing-xl) | var(--font-size-lg) |

## States
| State | Background | Border | Text | Cursor |
|-------|------------|--------|------|--------|
| default | | | | |
| hover | | | | |
| active | | | | |
| focus | | | | |
| disabled | | | | |

## Props/API
| Prop | Type | Default | Description |
|------|------|---------|-------------|

## Accessibility
### Keyboard
| Key | Action |
|-----|--------|

### ARIA
- Role:
- Attributes:

### Screen Reader
- Announces:

## Usage Guidelines
### Do
-

### Don't
-

## Code Example
```html
```

```css
```

**=== OUTPUT ===**

Save each component to: {components_output}/{component-name}.md
```</action>

  <action>Wait for all Component Specifier agents to complete</action>

  <action>Create component index file at {components_output}/README.md</action>

  <action>Report to {user_name}:
  "Component specifications complete!
  - {count} component specs generated
  - Location: {components_output}/"</action>
</step>

<step n="7" goal="Audit accessibility (Accessibility Auditor)">
  <action>Display progress: "## Phase 3: Accessibility Audit (Accessibility Auditor)"</action>

  <check if="{lightweight_mode} is true">
    <action>Perform quick accessibility check (no agent spawn):

Instead of spawning an agent, directly check:
1. Load {tokens_output}/tokens.json
2. Verify text colors have 4.5:1+ contrast with backgrounds
3. Verify focus ring is defined
4. Verify minimum touch target size (44px) in spacing scale

Create a brief report at {design_system_output}/accessibility-quick-check.md:

```markdown
# Accessibility Quick Check

**Date:** {date}
**Status:** PASS/FAIL

## Color Contrast
- Primary text on white: [ratio] ✅/❌
- Secondary text on white: [ratio] ✅/❌
- Primary text on brand bg: [ratio] ✅/❌

## Focus States
- Focus ring defined: ✅/❌

## Touch Targets
- 44px minimum available in spacing: ✅/❌

## Notes
[Any issues found]
```

Return summary only.</action>
  </check>

  <check if="{lightweight_mode} is false or not set">
    <action>Spawn Accessibility Auditor agent:

```
You are the **Accessibility Auditor**, auditing {design_system_name} for WCAG 2.1 AA compliance.

**=== YOUR MISSION ===**

Audit all design tokens and component specifications for accessibility compliance.

**=== INPUTS ===**

**Tokens:** {tokens_output}/tokens.json
**Components:** {components_output}/*.md

**=== AUDIT CHECKLIST ===**

**1. Color Contrast (WCAG 1.4.3, 1.4.11)**
Calculate contrast ratios for all color combinations:
- Text on backgrounds: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

**2. Focus Indicators (WCAG 2.4.7)**
- All interactive elements have visible focus
- Focus indicator has 3:1 contrast
- Focus order is logical

**3. Typography (WCAG 1.4.4, 1.4.12)**
- Base font size >= 16px
- Line height >= 1.5 for body
- Text resizable to 200%

**4. Touch Targets (WCAG 2.5.5)**
- Minimum 44x44px on touch devices

**5. Component ARIA**
- Proper roles defined
- Keyboard interactions documented
- Screen reader announcements specified

**=== OUTPUT ===**

Create: {design_system_output}/accessibility-audit.md

Include:
- Executive summary with pass/fail counts
- Color contrast matrix with all ratios
- Failed items with severity and fixes
- Warnings with recommendations
- Component accessibility checklist
```</action>

  <action>Wait for Accessibility Auditor to complete</action>

  <action>Report to {user_name}:
  "Accessibility audit complete!
  - Status: {PASS/FAIL}
  - Pass: {count}
  - Fail: {count}
  - Warnings: {count}
  - Report: {design_system_output}/accessibility-audit.md"</action>

    <check if="audit has failures">
      <ask>The audit found {count} accessibility failures. Would you like to:

1. **See details** - Review failures and recommended fixes
2. **Continue anyway** - Proceed with documentation (not recommended)
3. **Fix and re-audit** - I'll help you fix issues first

Enter 1, 2, or 3:</ask>
    </check>
  </check>
</step>

<step n="8" goal="Generate documentation (Documentation Writer)">
  <action>Display progress: "## Phase 4: Documentation (Documentation Writer)"</action>

  <check if="{lightweight_mode} is true">
    <action>Create minimal documentation directly (no agent spawn):

Create a single {design_system_output}/README.md with:

```markdown
# {design_system_name}

**Generated:** {date}

## Quick Start

1. Include the tokens:
\`\`\`html
<link rel="stylesheet" href="tokens/tokens.css">
\`\`\`

2. Use in your CSS:
\`\`\`css
.element {
  color: var(--color-text-primary);
  padding: var(--spacing-md);
}
\`\`\`

## Files

| Folder | Contents |
|--------|----------|
| `/tokens` | Design tokens (JSON + CSS) |
| `/components` | Component specifications |

## Components

[List all .md files in components folder]

## Tokens Reference

[Brief list of token categories from tokens.json]

## Need More?

Run the workflow again with `lightweight_mode: false` for full documentation.
```

Return summary only.</action>
  </check>

  <check if="{lightweight_mode} is false or not set">
    <action>Spawn Documentation Writer agent:

```
You are the **Documentation Writer**, creating docs for {design_system_name}.

**=== YOUR MISSION ===**

Create comprehensive documentation that enables teams to adopt the design system.

**=== INPUTS ===**

- Tokens: {tokens_output}/
- Components: {components_output}/
- Accessibility: {design_system_output}/accessibility-audit.md
- Brand Guide: {brand_guide_path}

**=== DOCUMENTATION TO CREATE ===**

**1. {docs_output}/README.md** (Getting Started)
- What is this design system
- Quick start guide
- File structure overview
- How to use tokens
- How to use components

**2. {docs_output}/installation.md**
- CSS-only setup
- npm installation (if applicable)
- CDN links
- Framework integration guides

**3. {docs_output}/tokens.md**
- Token architecture explanation
- All token categories with examples
- How to customize/extend
- Theming guide

**4. {docs_output}/components.md**
- Component library overview
- Categories and organization
- How to read specs
- Common patterns

**5. {docs_output}/accessibility.md**
- Standards followed (WCAG 2.1 AA)
- How to maintain accessibility
- Testing checklist
- Common mistakes

**6. {docs_output}/contributing.md**
- How to propose changes
- Naming conventions
- Adding new components
- Review process

**7. {design_system_output}/README.md** (Root)
- Design system overview
- Directory structure
- Quick links

**=== WRITING GUIDELINES ===**

- Clear and concise
- Code examples for everything
- Progressive disclosure
- Link between related docs
```</action>

    <action>Wait for Documentation Writer to complete</action>

    <action>Report to {user_name}:
    "Documentation complete!
    - {count} documentation pages generated
    - Location: {docs_output}/"</action>
  </check>
</step>

<step n="9" goal="Final summary and export options">
  <action>Display final summary to {user_name}:

"## Design System Complete!

**{design_system_name}** has been successfully created.

### What Was Generated

| Category | Count | Location |
|----------|-------|----------|
| Design Tokens | 2 files | {tokens_output}/ |
| Component Specs | {count} | {components_output}/ |
| Documentation | {count} pages | {docs_output}/ |
| Accessibility | 1 report | {design_system_output}/ |

### Files Created

```
{design_system_output}/
├── README.md
├── accessibility-audit.md
├── tokens/
│   ├── tokens.json
│   └── tokens.css
├── components/
│   ├── README.md
│   ├── button.md
│   ├── input.md
│   └── ... ({count} more)
└── docs/
    ├── README.md
    ├── installation.md
    ├── tokens.md
    ├── components.md
    ├── accessibility.md
    └── contributing.md
```

### Quick Start

**1. Add tokens to your project:**
```html
<link rel=\"stylesheet\" href=\"path/to/{design_system_name}/tokens/tokens.css\">
```

**2. Use tokens in your CSS:**
```css
.my-component {
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
}
```

### Next Steps

1. **Review** - Open the docs and explore your new design system
2. **Customize** - Adjust token values to match your brand perfectly
3. **Implement** - Start building components using the specifications
4. **Extend** - Add new components following the established patterns

### Need Changes?

- Run `*tokens` to regenerate tokens
- Run `*components` to regenerate component specs
- Run `*audit` to re-run accessibility audit
- Run `*docs` to regenerate documentation"</action>

  <ask>Would you like to:

1. **Export as ZIP** - Package everything for distribution
2. **View a specific file** - I'll show you the contents
3. **Make adjustments** - Modify tokens or components
4. **Return to menu** - Go back to Design System Forge menu

Enter 1, 2, 3, or 4:</ask>
</step>

</workflow>
