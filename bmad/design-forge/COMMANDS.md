# Design Forge - Command Reference

**Quick reference for all Design Forge commands and workflows.**

---

## Loading Design Forge

```bash
/design-forge
```

Loads the Design Director agent and displays the main menu.

---

## Core Commands

### `*generate` - Generate 5 Prototypes

**Purpose:** Create 5 archetype-based HTML prototypes

**Inputs:**
- Section type (hero, features, pricing, testimonials, cta, footer, navbar)
- Design vision (conversational description)
- Optional: Brand guidelines path, reference URLs

**Output:** 5 HTML files in `prototype/` folder

**Time:** ~30-45 seconds

**Example:**
```
*generate
Section: hero
Vision: "Modern SaaS hero, professional but approachable, blue brand"
Result: 5 HTML prototypes
```

**Best for:**
- Starting a new design project
- Exploring different design directions
- Getting visual options quickly

---

### `*refine` - Refine Single Prototype

**Purpose:** Iteratively polish a prototype with conversational feedback

**Version:** v1.5

**Inputs:**
- Select prototype to refine
- Refinement mode (Conversational, Guided, Hybrid)
- Feedback (natural language or parameter adjustments)

**Output:** Refined prototype HTML

**Time:** 5-10 minutes (2-3 iterations)

**Example:**
```
*refine
Prototype: modern-artisan-hero.html
Mode: Conversational
Feedback: "Make it more playful, increase color saturation"
Result: Polished prototype
```

**Best for:**
- Prototype is close but needs adjustments
- Want to fine-tune specific elements
- Iterative improvement

---

### `*remix` - Remix Multiple Prototypes

**Purpose:** Combine elements from 2-5 prototypes into new designs

**Version:** v2.0

**Inputs:**
- Select 2-5 prototypes to remix
- Remix strategy (Interactive, Best-of, Hybrid)
- Focus areas (which parameters to blend)

**Output:** 1-3 remix variations

**Time:** 10-15 minutes

**Example:**
```
*remix
Prototypes: minimalist.html, bold-innovator.html
Strategy: Interactive
Focus: Layout, Colors, Typography
Result: 2 hybrid prototypes
```

**Best for:**
- Love elements from multiple prototypes
- Want custom combinations
- Creating unique hybrid designs

---

### `*analyze` - Analyze Prototypes

**Purpose:** Get data-driven design metrics and visual comparisons

**Version:** v2.5

**Inputs:**
- Analysis mode (Compare, Metrics, Batch)
- Select prototypes
- Output format (Markdown, JSON, HTML)
- Include visual comparisons (v3.0)

**Output:** Analysis reports with metrics + visuals

**Time:** 2-5 minutes

**Example:**
```
*analyze
Mode: Compare
Prototypes: minimalist.html, modern-artisan.html
Include visuals: Yes
Output: HTML Dashboard
Result: Interactive comparison report
```

**Best for:**
- Torn between multiple options
- Need data to support decisions
- Want quantified design metrics
- Creating design documentation

---

### `*screenshot` - Capture Screenshots

**Purpose:** Automated screenshot capture at multiple viewports

**Version:** v3.0

**Inputs:**
- Capture mode (Single, Batch, Selective)
- Select prototypes
- Viewports (mobile, tablet, desktop)
- Force recapture (yes/no)

**Output:** PNG screenshots + metadata

**Time:** 3-5 seconds per prototype

**Example:**
```
*screenshot
Mode: Batch
Viewports: All (mobile, tablet, desktop)
Result: 15 screenshots (5 prototypes × 3 viewports)
```

**Best for:**
- Visual documentation
- Stakeholder presentations
- Visual comparison needs
- Design archives

---

### `*sections` - List Available Sections

**Purpose:** Show all supported section types

**Output:** List of 7 section types with descriptions

**Example:**
```
*sections

Available Sections:
1. hero - Hero sections (headline, CTA, visual)
2. features - Feature/benefit sections
3. pricing - Pricing tables
4. testimonials - Social proof sections
5. cta - Call-to-action sections
6. footer - Footer sections
7. navbar - Navigation bars
```

---

### `*help` - Show Menu

**Purpose:** Display the numbered command menu

**Output:** Full menu with all available commands

---

### `*exit` - Exit Design Director

**Purpose:** Exit the Design Director agent

**Confirmation:** Asks for confirmation before exiting

---

## Workflow Combinations

### Quick Start
```
*generate → *exit
Time: 5 minutes
Use: Just need prototypes fast
```

### Iterative Refinement
```
*generate → *refine → *refine → *exit
Time: 20 minutes
Use: Polish a favorite to perfection
```

### Creative Exploration
```
*generate → *remix → *refine → *exit
Time: 30 minutes
Use: Combine + polish custom design
```

### Data-Driven Decision
```
*generate → *screenshot → *analyze → *exit
Time: 15 minutes
Use: Visual + metrics comparison
```

### Complete Workflow
```
*generate → *screenshot → *analyze → *remix → *refine → *screenshot
Time: 40-50 minutes
Use: Full exploration + documentation
```

---

## Direct Workflow Access

**You can also call workflows directly without loading Design Director:**

```bash
# Generate prototypes
/bmad:design-forge:workflows:generate-prototypes

# Refine selection
/bmad:design-forge:workflows:refine-selection

# Remix prototypes
/bmad:design-forge:workflows:remix-prototypes

# Analyze prototypes
/bmad:design-forge:workflows:analyze-prototypes

# Capture screenshots
/bmad:design-forge:workflows:capture-screenshots
```

**When to use direct access:**
- Automating workflows
- Scripting design processes
- Integration with other tools

---

## Command Parameters

### *generate Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Section type | Select | Yes | hero, features, pricing, etc. |
| Design vision | Text | Yes | Conversational description |
| Brand guidelines | Path | No | Path to guidelines document |
| Reference URLs | URLs | No | Inspiration links |

### *refine Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Prototype | Select | Yes | Which prototype to refine |
| Mode | Select | Yes | Conversational, Guided, Hybrid |
| Feedback | Text | Yes | Natural language feedback |
| Max iterations | Number | No | Default: 3, Max: 5 |

### *remix Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Prototypes | Multi-select | Yes | 2-5 prototypes to remix |
| Strategy | Select | Yes | Interactive, Best-of, Hybrid |
| Focus areas | Multi-select | No | Parameters to blend |
| Output count | Number | No | How many variations (1-3) |

### *analyze Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Mode | Select | Yes | Compare, Metrics, Batch |
| Prototypes | Multi-select | Yes* | *Not needed for Batch mode |
| Output format | Select | Yes | Markdown, JSON, HTML, All |
| Include visuals | Boolean | No | Add screenshot comparisons (v3.0) |

### *screenshot Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Mode | Select | Yes | Single, Batch, Selective |
| Prototypes | Multi-select | Yes* | *Not needed for Batch mode |
| Viewports | Multi-select | Yes | mobile, tablet, desktop |
| Force recapture | Boolean | No | Recapture existing screenshots |

---

## Output Locations

### Generated Prototypes
```
{prototype_output_folder}/
├── minimalist-hero-20251110.html
├── bold-innovator-hero-20251110.html
├── professional-hero-20251110.html
├── modern-artisan-hero-20251110.html
└── elegant-curator-hero-20251110.html
```

### Screenshots
```
{prototype_output_folder}/screenshots/
├── minimalist-hero/
│   ├── mobile-375.png
│   ├── tablet-768.png
│   ├── desktop-1440.png
│   └── metadata.json
└── .screenshot-index.json
```

### Analysis Reports
```
{prototype_output_folder}/analysis/
├── analysis-compare-20251110-143022.html
├── analysis-metrics-20251110-143045.json
├── analysis-batch-20251110-143100.md
└── .analysis-history.json
```

---

## Configuration

**Edit:** `bmad/design-forge/config.yaml`

### Key Settings

```yaml
# Core settings
prototype_output_folder: '{project-root}/prototype/'
diversity_mode: 'balanced'  # conservative | balanced | wild
include_design_rationale: true

# Screenshot settings (v3.0)
auto_capture_on_generate: true
viewports_to_capture: [mobile, tablet, desktop]
screenshot_quality: 90
max_storage_mb: 500
```

---

## Keyboard Shortcuts

**In Design Director menu:**
- Type command: `*generate`, `*refine`, etc.
- Type number: `1`, `2`, `3`, etc.
- Type `*help`: Show menu again
- Type `*exit`: Exit agent

---

## Tips & Tricks

### Fastest Prototype Generation
```
*generate
→ Accept defaults where possible
→ Time: < 1 minute
```

### Best Quality Results
```
*generate
→ Provide detailed vision
→ Include brand guidelines
→ *analyze for validation
→ *refine for polish
→ Time: 20-30 minutes
```

### Batch Processing
```
*generate (multiple times for different sections)
*screenshot (batch mode)
→ Complete visual documentation
```

### Presentation Mode
```
*generate
*screenshot
*analyze (HTML output with visuals)
→ Interactive dashboard for stakeholders
```

---

## Common Questions

**Q: Can I generate multiple sections at once?**
A: No, generate one section at a time. But you can run *generate multiple times consecutively.

**Q: How do I revert a refinement?**
A: Currently, keep original prototype files. Future: Undo system (v4.0).

**Q: Can I customize the archetypes?**
A: Yes, edit archetype templates in `/templates/` folder.

**Q: Do screenshots require Playwright?**
A: Yes. Install with: `npx playwright install chromium`

**Q: Can I use my own fonts/colors?**
A: Yes, specify in `context/style-guide.md` and mention in design vision.

---

## Error Messages

### "No prototypes found"
**Solution:** Run `*generate` first to create prototypes.

### "Playwright not installed"
**Solution:** `npx playwright install chromium`

### "Config file not found"
**Solution:** Reinstall module: `bmad install design-forge`

### "Invalid HTML"
**Solution:** Check prototype HTML for errors, validate at validator.w3.org

---

## Version Information

**Current Version:** v3.0

**Feature Availability:**
- v1.0: *generate
- v1.5: *refine
- v2.0: *remix
- v2.5: *analyze
- v3.0: *screenshot (with visual comparisons)

---

## Quick Decision Tree

```
Need prototypes?
└─ YES → *generate
   └─ Perfect? → DONE
   └─ Close? → *refine
   └─ Like multiple? → *remix
   └─ Can't decide? → *analyze

Need visuals?
└─ YES → *screenshot
   └─ Compare visually? → *analyze (include visuals)

Need metrics?
└─ YES → *analyze
   └─ Compare 2-3? → Compare mode
   └─ Deep dive 1? → Metrics mode
   └─ Overview all? → Batch mode
```

---

**For detailed documentation, see:**
- `README.md` - Complete module overview
- `GETTING_STARTED.md` - Quick start guide
- `workflows/*/instructions.md` - Detailed workflow guides

**Design Forge v3.0** - Quick command reference.
