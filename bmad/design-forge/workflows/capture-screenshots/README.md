# Capture Screenshots Workflow

**Version:** 3.0.0
**Status:** ✅ Production Ready
**Category:** Visual Automation
**Complexity:** Medium
**Duration:** 1-3 minutes

## Overview

The **Capture Screenshots** workflow provides automated visual documentation of Design Forge prototypes using browser automation. It captures screenshots at multiple viewports (mobile, tablet, desktop) and organizes them for easy comparison and analysis.

## What It Does

**Automated visual documentation for prototypes:**

- **3 Capture Modes:** Single prototype, batch processing, or selective capture
- **Multi-Viewport:** Captures mobile (375px), tablet (768px), and desktop (1440px) views
- **Browser Automation:** Uses Playwright to render and capture actual browser screenshots
- **Organized Storage:** Saves screenshots in structured folders with metadata
- **Integration Ready:** Works seamlessly with analyze workflow for visual comparisons

## When to Use This

**Capture screenshots when:**
- You've generated new prototypes and want visual documentation
- You need to compare designs visually across viewports
- You're creating design documentation or presentations
- You want to track visual changes over time
- You're preparing for stakeholder reviews

**Use Single Mode when:**
- Testing screenshot capture for the first time
- You only need screenshots of one specific prototype
- Troubleshooting screenshot quality or settings

**Use Batch Mode when:**
- You've just generated 5 new prototypes
- You want complete visual documentation of all designs
- Creating a comprehensive design gallery

**Use Selective Mode when:**
- You only need screenshots of 2-3 specific prototypes
- Some prototypes already have screenshots
- Updating screenshots for modified prototypes only

## Quick Start

### Prerequisites

**Node.js Required:**
Screenshot capture requires Node.js and Playwright browser automation.

Check if Node.js is available:
```bash
node --version
```

If not installed, download from: https://nodejs.org/

**First-Time Setup:**
On first use, Playwright will automatically download Chromium (~100MB):
```bash
npx playwright install chromium
```

This only needs to happen once.

### Basic Usage

**From Design Director:**
```bash
/design-forge
*screenshot
```

**Or directly:**
```bash
/bmad:design-forge:workflows:capture-screenshots
```

### Example: Batch Capture All Prototypes

1. **Select mode:** Batch Capture - All prototypes
2. **Select viewports:** All (mobile, tablet, desktop)
3. **Force recapture:** No (skip existing screenshots)
4. **Wait for capture:** ~5-10 seconds per prototype
5. **Review results:** 15 screenshots created (5 prototypes × 3 viewports)

**Output:**
```
✓ Screenshot capture complete!

Prototypes captured: 5/5
Total screenshots: 15
Viewports: mobile, tablet, desktop

Results:
✓ minimalist-hero
  - Mobile (375px): 245 KB
  - Tablet (768px): 385 KB
  - Desktop (1440px): 520 KB

[... 4 more prototypes ...]

Total storage: 5.8 MB
Duration: 12.3 seconds

Screenshots saved to:
prototype/screenshots/
```

### Example: Single Prototype Capture

1. **Select mode:** Single Prototype
2. **Select prototype:** minimalist-hero.html
3. **Select viewports:** Desktop only
4. **Capture:** ~3 seconds
5. **Result:** 1 screenshot created

## Key Features

### Multi-Viewport Capture

**Three standard viewports:**
- **📱 Mobile (375px)** - iPhone-sized, portrait orientation
- **📱 Tablet (768px)** - iPad-sized, portrait orientation
- **🖥️ Desktop (1440px)** - Standard desktop monitor

Each viewport captures the full page (not just above-the-fold).

### Intelligent Skip Logic

**Saves time by skipping:**
- Prototypes that already have screenshots (unless force recapture)
- Screenshots less than 1 hour old
- Screenshots newer than the HTML file modification time

### Metadata Tracking

**Each capture creates metadata.json:**
```json
{
  "prototype_name": "minimalist-hero",
  "captured_at": "2025-11-10T14:35:22Z",
  "viewports": ["mobile", "tablet", "desktop"],
  "screenshots": {
    "mobile": {
      "path": "mobile-375.png",
      "width": 375,
      "height": 812,
      "fileSize": 245678
    },
    ...
  },
  "capture_duration": 3450,
  "total_size": 1151103
}
```

### Screenshot Index

**Global index tracks all screenshots:**
- `.screenshot-index.json` in screenshots folder
- Lists all prototypes with screenshots
- Total counts and statistics
- Last updated timestamp

## Workflow Steps

### 1. Check Browser Tools
Validates that Playwright/Chromium is available. If not:
- Provides installation instructions
- Offers manual screenshot workflow alternative

### 2. Discover Prototypes
Based on selected mode, finds target prototypes:
- Scans prototype folder for HTML files
- Checks if screenshots already exist
- Builds capture list

### 3. Setup Storage
Creates folder structure:
```
prototype/
└── screenshots/
    ├── minimalist-hero/
    ├── bold-innovator/
    └── .screenshot-index.json
```

### 4. Generate Capture Script
Creates temporary Node.js script with Playwright automation:
- Launches headless Chromium
- Sets viewport sizes
- Loads HTML files
- Disables animations for consistency
- Captures full-page screenshots

### 5. Execute Captures
Runs Playwright script for each prototype:
- Shows progress: "Capturing 1/5: minimalist-hero..."
- Displays viewport completion: "✓ mobile (375px)"
- Handles errors gracefully

### 6. Save Metadata
Creates metadata.json for each prototype and updates global index.

### 7. Cleanup
Removes temporary script files, keeps all screenshots and metadata.

## Output Location

**Screenshots saved to:**
```
{prototype_output_folder}/screenshots/
```

**Folder structure:**
```
screenshots/
├── minimalist-hero-20251110/
│   ├── mobile-375.png
│   ├── tablet-768.png
│   ├── desktop-1440.png
│   └── metadata.json
├── bold-innovator-20251110/
│   └── ...
└── .screenshot-index.json
```

## Configuration

### Module Config Settings

**In `/bmad/design-forge/config.yaml`:**

```yaml
auto_capture_on_generate: true
viewports_to_capture: ["mobile", "tablet", "desktop"]
screenshot_quality: 90
auto_cleanup_old: false
max_storage_mb: 500
```

**Settings:**
- `auto_capture_on_generate`: Auto-capture after *generate command
- `viewports_to_capture`: Which viewports to capture by default
- `screenshot_quality`: PNG quality (60-100)
- `auto_cleanup_old`: Delete screenshots older than 30 days
- `max_storage_mb`: Warn when storage exceeds limit

## Integration with Other Workflows

### With *generate (Auto-Capture)

If `auto_capture_on_generate: true`:
```
*generate → 5 prototypes created
→ Auto-trigger screenshot capture
→ 15 screenshots ready immediately
```

### With *analyze (Visual Comparison)

Screenshots enhance analysis reports:
```
*analyze → Compare mode
→ Checks for screenshots
→ If missing: "Capture screenshots now? (Y/n)"
→ Includes visual comparisons in HTML report
```

### Standalone Usage

Can be used independently:
```
*screenshot → Batch mode
→ Document all existing prototypes
→ Create visual archive
```

## Error Handling

### Playwright Not Available

**Error:**
```
Browser automation tools not available.
```

**Solution:**
Install Playwright:
```bash
npx playwright install chromium
```

Or use manual screenshot workflow (instructions provided).

### Capture Timeout

**Error:**
```
Screenshot capture timed out for {prototype_name}.
```

**Causes:**
- Prototype has very large images
- Slow network resources
- Complex animations

**Solution:**
- Check HTML for large external resources
- Ensure all assets load within 30 seconds
- Force recapture with longer timeout

### Invalid HTML

**Error:**
```
Prototype {filename} has invalid HTML or rendering errors.
```

**Solution:**
- Validate HTML syntax
- Check for broken resources
- Test prototype in browser manually

### Storage Limit Exceeded

**Warning:**
```
Screenshot storage (550MB) exceeds limit (500MB).
```

**Solution:**
- Clean up old screenshots
- Increase `max_storage_mb` in config
- Use selective capture mode

## Tips & Best Practices

### For Best Screenshot Quality

**Do:**
- ✅ Capture after prototypes are finalized
- ✅ Use all 3 viewports for complete documentation
- ✅ Recapture if HTML changes significantly
- ✅ Check screenshots in image viewer to verify quality

**Don't:**
- ❌ Capture while actively editing prototypes
- ❌ Skip mobile viewport (mobile-first is critical)
- ❌ Delete metadata.json files (breaks index)

### For Performance

**Fast captures:**
- Use selective mode for specific prototypes
- Skip unchanged prototypes (default behavior)
- Capture viewports you actually need

**Storage management:**
- Enable `auto_cleanup_old` for long-term projects
- Use batch mode sparingly (captures everything)
- Monitor storage with `max_storage_mb` warnings

### For Documentation

**Best practices:**
- Capture screenshots before major presentations
- Use analyze workflow to create visual comparison reports
- Export HTML dashboards for stakeholder reviews
- Keep screenshots in version control (optional)

## Troubleshooting

### "node: command not found"

**Problem:** Node.js not installed

**Solution:** Install Node.js from https://nodejs.org/

### "Playwright not found"

**Problem:** First-time use, Chromium not downloaded

**Solution:**
```bash
npx playwright install chromium
```

### Screenshots Look Different Than Browser

**Problem:** Animations or dynamic content rendering differently

**Solution:**
- Workflow disables animations for consistency
- This is intentional for stable screenshots
- Screenshots show "final state" without motion

### File Sizes Too Large

**Problem:** Screenshots using too much storage

**Solution:**
- Reduce `screenshot_quality` in config (default: 90)
- Lower quality to 70-80 for smaller files
- Trade-off: quality vs. file size

### Missing Screenshots in Analyze

**Problem:** Analyze workflow can't find screenshots

**Solution:**
- Ensure screenshots folder exists
- Check folder naming matches prototype name
- Run *screenshot to capture missing ones
- Verify metadata.json exists

## Advanced Usage

### Custom Viewports

**Future enhancement (v4.0):**
Custom viewport configurations will allow:
- Brand-specific device sizes
- Ultrawide monitors (2560px+)
- Smartwatch viewports (320px)

Currently: Use the 3 standard viewports.

### Screenshot Comparison

**Combine with analyze:**
```
1. *generate → 5 prototypes
2. *screenshot → Batch capture
3. *analyze → Compare mode with visual comparisons
4. Review: Interactive HTML dashboard
```

### Tracking Changes Over Time

**Manual workflow:**
1. Capture screenshots: `*screenshot`
2. Make changes to prototypes
3. Force recapture: `*screenshot` (force: yes)
4. Compare old vs. new manually
5. Future: Automated diff detection (v4.0)

## Related Workflows

- **[Generate Prototypes](/bmad/design-forge/agents/design-director.md)** - Create prototypes to screenshot
- **[Analyze Prototypes](/bmad/design-forge/workflows/analyze-prototypes/)** - Use screenshots for visual comparison
- **[Refine Selection](/bmad/design-forge/workflows/refine-selection/)** - Refine, then recapture screenshots

## Future Enhancements

**Planned for v4.0+:**
- Pixel-diff highlighting (show exact changed regions)
- Video recording of page load and interactions
- Animated GIF generation for demonstrations
- Custom viewport configurations
- Cloud storage integration (S3, Cloudinary)
- Screenshot comparison across git branches
- Scheduled captures (cron-style automation)

## Technical Details

**Agent Used:** Screenshot Manager
**Execution Type:** Sequential with browser automation
**Average Duration:** 3-5 seconds per prototype (3 viewports)
**File Operations:** Write PNG, Write JSON, Create directories

**Dependencies:**
- Node.js (v14+)
- Playwright (auto-installed via npx)
- Chromium browser (auto-downloaded by Playwright)
- Write access to prototype folder

**Browser Details:**
- Headless: Yes (no visible window)
- Engine: Chromium (latest stable)
- Timeout: 30 seconds per screenshot
- Full page: Yes (captures entire scrollable content)

## Support

**For detailed usage instructions:**
See `/bmad/design-forge/workflows/capture-screenshots/instructions.md`

**For troubleshooting:**
- Check browser console for HTML errors
- Verify Playwright installation: `npx playwright --version`
- Test prototype renders in browser manually
- Review metadata.json for capture errors

**For feedback:**
Contact module maintainer or submit issue to Design Forge repository.

---

**Design Forge v3.0** - Visual documentation made automatic.
