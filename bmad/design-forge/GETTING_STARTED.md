# Getting Started with Design Forge

**Welcome to Design Forge v3.0!** 🎨

This quick start guide will have you generating beautiful prototypes in under 5 minutes.

---

## What is Design Forge?

Design Forge transforms your design vision into production-ready HTML prototypes. Instead of struggling to communicate what you want, you get 5 distinct, professional prototypes to compare, refine, and iterate on.

**Complete feature set:**
- **Generate** - 5 archetype-based prototypes instantly
- **Refine** - Polish prototypes with conversational feedback
- **Remix** - Combine elements from multiple prototypes
- **Analyze** - Get data-driven design metrics
- **Screenshot** - Automated visual documentation

---

## Prerequisites (5 minutes)

### 1. BMAD Installed
You should already have BMAD installed. If not:
```bash
# Install BMAD first
# See: https://github.com/your-bmad-repo
```

### 2. Node.js (for screenshots - optional)
Check if installed:
```bash
node --version
```

If not installed, download from: https://nodejs.org/

**Why needed:** Screenshot capture uses Playwright browser automation. If you skip this, you can still generate prototypes - just no automated screenshots.

### 3. Install Design Forge Module
```bash
bmad install design-forge
```

During installation, you'll be asked:
- **Where to save prototypes?** (default: `prototype/`)
- Press Enter to accept defaults

---

## Your First Prototype (3 minutes)

### Step 1: Load Design Director

```bash
/design-forge
```

You'll see the menu:
```
🎨 Design Forge v3.0

1. *generate - Generate 5 Design Prototypes
2. *refine - Refine Single Prototype (v1.5)
3. *remix - Remix Multiple Prototypes (v2.0)
4. *analyze - Analyze Prototypes (v2.5)
5. *screenshot - Capture Screenshots (v3.0)
6. *sections - List Available Sections
7. *help - Show numbered menu
8. *exit - Exit with confirmation
```

### Step 2: Generate Prototypes

Type:
```
*generate
```

**You'll be asked:**

**1. Section Type:**
```
Which section to generate?
- hero
- features
- pricing
- testimonials
- cta
- footer
- navbar

Your choice: hero
```

**2. Design Vision:**
```
Describe what you're envisioning:

Example: "Modern SaaS hero section, professional but approachable,
blue brand color, targets enterprise decision-makers"

Your vision: [Describe your vision here]
```

**3. Optional Inputs:**
```
Brand guidelines document path (optional): [Press Enter to skip]
Reference URLs (optional): [Press Enter to skip]
```

### Step 3: Wait for Generation

Design Forge will:
1. Analyze your vision
2. Select 5 appropriate archetypes
3. Spawn 5 parallel designer agents
4. Generate 5 complete HTML prototypes

**Time:** ~30-45 seconds

### Step 4: Review Results

```
✓ Design Forge Complete!

5 Prototypes Generated

Location: prototype/

Files Created:
1. minimalist-hero-20251110-143022.html
2. bold-innovator-hero-20251110-143025.html
3. professional-hero-20251110-143028.html
4. modern-artisan-hero-20251110-143031.html
5. elegant-curator-hero-20251110-143034.html
```

### Step 5: Open and Review

**Method 1: File Browser**
```
Navigate to: prototype/
Double-click any HTML file
Opens in your default browser
```

**Method 2: Terminal**
```bash
open prototype/minimalist-hero-20251110-143022.html
# or on Linux: xdg-open prototype/...
# or on Windows: start prototype\...
```

**What to look for:**
- Does one match your vision?
- Which archetype resonates?
- What elements do you like from each?

---

## Next Steps

### Option A: Perfect! Use One As-Is

If one prototype matches your vision:
1. Use it directly
2. Customize if needed (it's just HTML/CSS)
3. Ship it! 🚀

### Option B: Close, But Needs Polish

If one is close but needs refinement:
```
*refine

Select prototype: modern-artisan-hero.html
Mode: Conversational
Feedback: "Make it more playful, increase saturation"

Result: Polished prototype in 2-3 iterations
```

### Option C: Love Elements from Multiple

If you like different parts from different prototypes:
```
*remix

Select prototypes: minimalist-hero.html, bold-innovator-hero.html
Strategy: Interactive (choose element-by-element)

Result: Custom hybrid combining best elements
```

### Option D: Need Data to Decide

If you're torn between options:
```
*screenshot
Mode: Batch
Viewports: All

Then:

*analyze
Mode: Compare
Include visuals: Yes
Select: 2-3 favorites

Result: Interactive HTML dashboard with metrics + visuals
```

---

## Understanding the 5 Archetypes

Each prototype represents a coherent design philosophy:

### 1. The Minimalist
- **Philosophy:** "Less is more. Every element must earn its place."
- **Look:** Clean, spacious, restrained color palette
- **Best for:** Premium products, professional services, tech platforms

### 2. The Bold Innovator
- **Philosophy:** "Design should make a statement. Break conventions."
- **Look:** Strong contrasts, bold typography, dynamic layouts
- **Best for:** Startups, creative agencies, disruptive brands

### 3. The Professional
- **Philosophy:** "Trust through polish. Credibility through consistency."
- **Look:** Structured grids, balanced composition, professional colors
- **Best for:** B2B, financial services, enterprise software

### 4. The Modern Artisan
- **Philosophy:** "Contemporary craft. Innovation meets refinement."
- **Look:** Modern techniques, balanced elements, refined details
- **Best for:** SaaS products, modern brands, tech-forward companies

### 5. The Elegant Curator
- **Philosophy:** "Luxury through restraint. Excellence in the details."
- **Look:** Sophisticated typography, subtle animations, premium feel
- **Best for:** Luxury brands, high-end services, boutique offerings

**Why 5?** Enough diversity to triangulate your vision without overwhelming you.

---

## Common Workflows

### Workflow 1: Generate Only (Fastest)
```
Time: 5 minutes
Steps: Generate → Pick favorite → Done

/design-forge
*generate
→ Review 5 prototypes
→ Use favorite
```

### Workflow 2: Generate + Analyze (Data-Driven)
```
Time: 10-15 minutes
Steps: Generate → Screenshot → Analyze → Decide

*generate → 5 prototypes
*screenshot → Batch capture
*analyze → Compare mode + visual comparisons
→ Data-driven decision
```

### Workflow 3: Generate + Refine (Most Common)
```
Time: 15-20 minutes
Steps: Generate → Pick → Refine → Perfect

*generate → 5 prototypes
*refine → Pick favorite, polish with feedback
→ 2-3 iterations → Perfect prototype
```

### Workflow 4: Complete Exploration
```
Time: 30-40 minutes
Steps: Generate → Screenshot → Analyze → Remix → Refine

*generate → 5 prototypes
*screenshot → Visual documentation
*analyze → Compare favorites
*remix → Combine best elements
*refine → Final polish
→ Perfect custom prototype
```

---

## Configuration (Optional)

Customize Design Forge behavior in `bmad/design-forge/config.yaml`:

**Key settings:**
```yaml
# Where prototypes are saved
prototype_output_folder: '{project-root}/prototype/'

# How diverse should prototypes be?
diversity_mode: 'balanced'  # conservative | balanced | wild

# Include design rationale comments in HTML?
include_design_rationale: true

# Auto-capture screenshots after generation?
auto_capture_on_generate: true

# Which viewports to capture?
viewports_to_capture:
  - mobile
  - tablet
  - desktop
```

---

## Troubleshooting

### "No prototypes generated"

**Check:**
1. Did you describe your vision clearly?
2. Is `prototype_output_folder` path valid?
3. Do you have write permissions to that folder?

**Solution:**
```bash
# Verify folder exists
ls prototype/

# Create if missing
mkdir prototype

# Try again
*generate
```

### "Screenshot capture failed"

**Cause:** Node.js or Playwright not installed

**Solution:**
```bash
# Install Playwright
npx playwright install chromium

# Or skip screenshots for now
# You can still use all other features
```

### "Config file not found"

**Cause:** Module not installed correctly

**Solution:**
```bash
# Reinstall module
bmad install design-forge

# Verify installation
ls bmad/design-forge/config.yaml
```

---

## Tips for Best Results

### Writing a Good Design Vision

**Good examples:**
```
"Modern SaaS hero, professional but approachable, blue brand,
targets enterprise decision-makers, needs clear CTA"

"Bold fintech startup landing page, vibrant colors, young
professionals, disruptive and energetic, gradient backgrounds"

"Elegant luxury hotel pricing section, 3 tiers, sophisticated
typography, premium feel, gold accents"
```

**What makes them good:**
- Clear target audience
- Specific mood/personality
- Mentions brand colors or preferences
- Describes desired feeling

**Avoid vague descriptions:**
```
"Make it nice" ❌
"Professional website" ❌
"Modern design" ❌
```

### Choosing the Right Section

**Start with:** `hero` (easiest to visualize)

**Then try:**
- `features` - Showcase product benefits
- `pricing` - Compare pricing tiers
- `testimonials` - Social proof
- `cta` - Conversion-focused sections

### Making the Most of Archetypes

**Don't just pick one immediately!**

1. Review all 5 prototypes
2. Identify what you like about each
3. Notice patterns in your preferences
4. Use remix to combine favorite elements

**This helps you:**
- Articulate what you actually want
- Discover preferences you didn't know you had
- Make more informed decisions

---

## What's Next?

### Learn More

**Read the docs:**
- `README.md` - Complete module overview
- `workflows/*/instructions.md` - Detailed workflow guides
- `COMMANDS.md` - Quick command reference

**Try advanced features:**
- Remix prototypes to create custom combinations
- Use analyze for data-driven insights
- Capture screenshots for visual documentation

### Customize

**Brand guidelines:**
1. Copy `context/design-principles.md.template` → `design-principles.md`
2. Copy `context/style-guide.md.template` → `style-guide.md`
3. Fill in your brand's values
4. Design Forge will follow your guidelines

### Get Help

**Common issues:**
- Check `TODO.md` for known limitations
- Review workflow `instructions.md` for detailed guides
- Check configuration in `config.yaml`

---

## Quick Command Reference

```bash
# Load Design Director
/design-forge

# Core commands
*generate     # Create 5 prototypes
*refine       # Polish a prototype
*remix        # Combine prototypes
*analyze      # Get insights
*screenshot   # Capture visuals

# Utility commands
*sections     # List available section types
*help         # Show menu
*exit         # Exit agent
```

---

## Summary

**You've learned:**
- ✅ How to install Design Forge
- ✅ How to generate your first prototypes
- ✅ What the 5 archetypes represent
- ✅ Common workflows for different needs
- ✅ How to troubleshoot issues

**Next:** Generate prototypes for your actual project!

---

**Design Forge v3.0** - Where design visions are forged into reality. 🎨✨

**Questions?** Check `README.md` for comprehensive documentation.
