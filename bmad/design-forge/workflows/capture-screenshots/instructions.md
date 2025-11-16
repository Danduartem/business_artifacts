# Capture Screenshots - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/design-forge/workflows/capture-screenshots/workflow.yaml</critical>
<critical>Communicate with {user_name} in {communication_language} throughout this workflow</critical>

<workflow>

<step n="1" goal="Check for browser automation tools and explain approach">
  <action>Greet {user_name} in {communication_language}</action>
  <action>Explain that this workflow captures screenshots of prototypes at multiple viewports (mobile, tablet, desktop) for visual documentation and comparison</action>

  <action>Check if browser automation tools are available by running:
```bash
npx playwright --version
```</action>

  <check if="playwright available">
    <action>Inform {user_name}: "✓ Browser automation tools detected (Playwright). Screenshot capture is available."</action>
    <goto step="2">Proceed with capture</goto>
  </check>

  <check if="playwright not available">
    <action>Display to {user_name}:

⚠ Browser automation tools not detected.

**To enable automated screenshot capture:**

1. Install Playwright (one-time setup):
   ```bash
   npx playwright install chromium
   ```
   This downloads Chromium browser (~100MB) to your system cache.

2. Once installed, re-run this workflow for automated capture.

**Alternative: Manual Screenshot Workflow**

If you prefer not to install browser automation tools, you can capture screenshots manually:

1. Open each prototype HTML file in your browser
2. Use browser DevTools device emulation (F12 → Device toolbar)
3. Set viewport to standard sizes:
   - Mobile: 375px width
   - Tablet: 768px width
   - Desktop: 1440px width
4. Capture screenshots (browser screenshot feature or OS tool)
5. Save to: {prototype_output_folder}/screenshots/{prototype-name}/
   - mobile-375.png
   - tablet-768.png
   - desktop-1440.png

**Manual workflow is perfectly valid** - automated capture is a convenience, not a requirement.</action>

    <ask>Would you like to:
1. Install Playwright now (recommended)
2. Use manual screenshot workflow
3. Skip screenshot capture

Enter 1-3:</ask>

    <check if="response == 1">
      <action>Display installation instructions:

Run this command in your terminal:
```bash
npx playwright install chromium
```

After installation completes, re-run this workflow.</action>
      <action>Exit workflow</action>
    </check>

    <check if="response == 2">
      <action>Provide manual workflow guidance (see above)</action>
      <action>Exit workflow</action>
    </check>

    <check if="response == 3">
      <action>Inform {user_name}: "Screenshot capture skipped. You can run this workflow anytime to capture screenshots later."</action>
      <action>Exit workflow</action>
    </check>
  </check>
</step>

<step n="2" goal="Gather capture requirements">
  <action>Scan {prototype_output_folder} for *.html files</action>

  <check if="no prototypes found">
    <action>Display error: "No prototypes found to capture. Please run Design Director's *generate command first."</action>
    <action>Exit workflow</action>
  </check>

  <action>Display available prototypes</action>

  <ask>What would you like to capture, {user_name}?

1. **Single Prototype** - Capture one prototype
2. **Batch Capture** - All prototypes in folder
3. **Selective** - Choose specific prototypes

Enter 1-3:</ask>

  <action>Store response as {capture_mode}</action>

  <check if="capture_mode == single OR capture_mode == selective">
    <action>Display numbered list of prototypes</action>
    <ask if="capture_mode == single">Enter prototype number:</ask>
    <ask if="capture_mode == selective">Enter prototype numbers (comma-separated):</ask>
    <action>Store selections as {target_prototypes}</action>
  </check>

  <check if="capture_mode == batch">
    <action>Store all prototype paths as {target_prototypes}</action>
  </check>

  <ask>Which viewports to capture?

1. Mobile only (375px)
2. Desktop only (1440px)
3. Mobile + Desktop
4. All viewports (Mobile, Tablet, Desktop)

Enter 1-4 (default: 4):</ask>

  <action>Store response as {viewports}:
- 1 → [mobile]
- 2 → [desktop]
- 3 → [mobile, desktop]
- 4 → [mobile, tablet, desktop]</action>

  <ask>Force recapture even if screenshots exist? (y/n, default: n):</ask>

  <action>Store response as {force_recapture}</action>
</step>

<step n="3" goal="Check existing screenshots and filter capture list">
  <action>For each prototype in {target_prototypes}:
- Check if {prototype_output_folder}/screenshots/{prototype-name}/ exists
- Check if viewport screenshots exist (based on {viewports} selection)
- Check if screenshots are recent (captured after HTML modification)
- Mark as "needs_capture" or "skip"</action>

  <check if="force_recapture == false">
    <action>Filter {target_prototypes} to only those needing capture</action>
    <action>Display to {user_name}:

Found existing screenshots for some prototypes:
{list_prototypes_with_existing_screenshots}

Will only capture new/modified prototypes:
{list_prototypes_to_capture}</action>
  </check>

  <check if="all prototypes have recent screenshots AND force_recapture == false">
    <action>Inform {user_name}: "All selected prototypes already have recent screenshots. Use force recapture if you want to regenerate them."</action>
    <action>Exit workflow</action>
  </check>
</step>

<step n="4" goal="Setup screenshot folders">
  <action>Create directory structure:
```
{prototype_output_folder}/
└── screenshots/
    ├── {prototype-name-1}/
    ├── {prototype-name-2}/
    └── .screenshot-index.json
```</action>

  <action>For each prototype in {prototypes_to_capture}:
- Create folder: screenshots/{prototype-name}/
- Ensure write permissions</action>

  <action>Initialize or update .screenshot-index.json:
```json
{
  "version": "3.0.0",
  "created_at": "{date}",
  "total_prototypes": {count},
  "total_screenshots": {count},
  "prototypes": []
}
```</action>
</step>

<step n="5" goal="Generate Playwright capture script">
  <action>Create temporary Node.js script at: /tmp/design-forge-screenshot-{date}.js

This script will:
1. Launch headless Chromium browser
2. For each viewport, set size and capture screenshot
3. Save screenshots as PNG files
4. Return metadata (file paths, sizes, durations)

The script handles:
- Loading HTML files (file:// URLs)
- Waiting for page load and animations to settle
- Disabling animations for consistent screenshots
- Full-page capture
- Error handling and timeouts</action>

  <action>Store script path for execution</action>
</step>

<step n="6" goal="Capture screenshots using Playwright">
  <action>For each prototype in {prototypes_to_capture}:

1. Display progress: "Capturing {index}/{total}: {prototype-name}..."

2. Execute Playwright script:
   ```bash
   node /tmp/design-forge-screenshot-{date}.js \
     "{prototype_html_path}" \
     "{screenshot_output_folder}/{prototype_name}" \
     "{viewports_comma_separated}"
   ```

3. Parse JSON output from script with screenshot metadata

4. For each viewport captured:
   - Display: "  ✓ {viewport} ({width}px) - {filesize}"

5. If capture fails:
   - Log error
   - Display warning: "⚠ Failed to capture {prototype-name}: {error}"
   - Continue with next prototype (don't abort batch)

6. Store successful capture results</action>

  <action>Track:
- successful_count
- failed_count
- total_screenshots
- total_duration</action>
</step>

<step n="7" goal="Save metadata for captured screenshots">
  <action>For each successfully captured prototype:

Create metadata.json in screenshots/{prototype-name}/:
```json
{
  "prototype_name": "{prototype-name}",
  "prototype_path": "{absolute_path}",
  "captured_at": "{date}",
  "viewports": ["{list}"],
  "screenshots": {
    "mobile": {
      "path": "mobile-375.png",
      "width": 375,
      "height": 812,
      "fileSize": {bytes},
      "url": "file://mobile-375.png"
    },
    ...
  },
  "capture_duration": {milliseconds},
  "total_size": {bytes}
}
```</action>

  <action>Update .screenshot-index.json:
- Add/update prototype entry
- Increment total counts
- Update last_updated timestamp</action>
</step>

<step n="8" goal="Cleanup temporary files">
  <action>Delete temporary Playwright script: /tmp/design-forge-screenshot-{date}.js</action>
  <action>Keep all screenshot PNG files and metadata JSON files</action>
</step>

<step n="9" goal="Present capture results">
  <action>Display to {user_name} in {communication_language}:

✓ Screenshot capture complete!

**Mode:** {capture_mode}
**Prototypes captured:** {successful_count}/{total_count}
**Total screenshots:** {total_screenshots}
**Viewports:** {viewports_list}

**Results:**
{for each prototype}
✓ {prototype_name}
  - Mobile (375px): {file_size}
  - Tablet (768px): {file_size} (if captured)
  - Desktop (1440px): {file_size}
{end for}

**Total storage:** {total_storage_mb} MB
**Duration:** {total_duration} seconds

**Screenshots saved to:**
{screenshot_base_path}

**To view screenshots:**
- Open screenshots/{prototype-name}/ folder
- View PNG files in any image viewer
- Run *analyze workflow for visual comparisons

{if failed_count > 0}
⚠ {failed_count} prototype(s) failed to capture:
{list_failed_prototypes}

Check that HTML files are valid and not corrupted.
{endif}</action>

  <ask>Would you like to:
1. Capture more screenshots
2. Analyze prototypes with visual comparisons
3. Exit

Enter 1-3:</ask>

  <check if="response == 1">
    <goto step="2">Gather capture requirements</goto>
  </check>

  <check if="response == 2">
    <action>Inform {user_name}: "Run the analyze-prototypes workflow and enable visual comparison mode to see your screenshots integrated into analysis reports."</action>
  </check>
</step>

</workflow>
