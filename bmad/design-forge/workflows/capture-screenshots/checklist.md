# Capture Screenshots - Validation Checklist

## Pre-Execution Validation

- [ ] At least 1 prototype HTML file exists in {prototype_output_folder}
- [ ] Output directory {prototype_output_folder} is writable
- [ ] Screenshot directory can be created/written to

## Execution Validation

### Step 1: Browser Automation Check
- [ ] Playwright availability check executed
- [ ] If available: User informed, proceed to capture
- [ ] If not available: Clear options presented (install/manual/skip)
- [ ] User choice handled appropriately

### Step 2: Requirements Gathering
- [ ] Prototypes scanned and listed
- [ ] User selected capture mode (single/batch/selective)
- [ ] Target prototypes determined
- [ ] Viewports selection captured (mobile/tablet/desktop/combinations)
- [ ] Force recapture option captured

### Step 3: Existing Screenshots Check
- [ ] Existing screenshot folders scanned
- [ ] Screenshot freshness checked (vs. HTML modification time)
- [ ] Capture list filtered appropriately (unless force recapture)
- [ ] User informed of existing/new captures

### Step 4: Folder Setup
- [ ] Screenshot directory structure created
- [ ] Individual prototype folders created
- [ ] .screenshot-index.json initialized/updated
- [ ] Write permissions verified

### Step 5: Script Generation
- [ ] Temporary Playwright script generated
- [ ] Script includes all viewport configurations
- [ ] Script path stored for execution
- [ ] Error handling included in script

### Step 6: Screenshot Capture
- [ ] Progress displayed for each prototype
- [ ] Playwright script executed successfully
- [ ] JSON output parsed correctly
- [ ] Screenshots captured for all requested viewports
- [ ] Errors logged but don't abort batch
- [ ] Success/failure counts tracked

### Step 7: Metadata Saving
- [ ] metadata.json created for each prototype
- [ ] All required fields present (paths, sizes, timestamps)
- [ ] .screenshot-index.json updated with new entries
- [ ] Total counts incremented correctly

### Step 8: Cleanup
- [ ] Temporary Playwright script deleted
- [ ] No orphaned temporary files
- [ ] All screenshot files preserved
- [ ] All metadata files preserved

### Step 9: Results Presentation
- [ ] User informed in configured language
- [ ] Capture summary shown (mode, counts, viewports)
- [ ] Individual prototype results listed
- [ ] File sizes and paths provided
- [ ] Failures listed if any
- [ ] Next steps guidance provided

## Output Validation

### Screenshot Files
- [ ] Files exist at reported paths
- [ ] File names follow pattern: {viewport}-{width}.png
- [ ] Valid PNG format
- [ ] Appropriate file sizes (not 0 bytes, not corrupted)
- [ ] Screenshots show correct viewport dimensions

### Metadata Files
- [ ] metadata.json exists for each captured prototype
- [ ] Valid JSON syntax
- [ ] All required fields present
- [ ] Paths are absolute and accurate
- [ ] Timestamps in ISO format
- [ ] File sizes match actual files

### Screenshot Index
- [ ] .screenshot-index.json exists
- [ ] Valid JSON syntax
- [ ] Version number correct (3.0.0)
- [ ] Total counts accurate
- [ ] All captured prototypes listed

## Quality Validation

- [ ] Screenshots show correct viewport sizes
- [ ] Full page captured (not cropped)
- [ ] Animations disabled (consistent appearance)
- [ ] No browser chrome/UI visible
- [ ] Text and images rendered correctly
- [ ] Responsive behavior captured accurately

## Error Handling

- [ ] Playwright not available → Options shown, graceful exit
- [ ] No prototypes found → Clear error, exit
- [ ] All screenshots exist (no force) → Informed, exit option
- [ ] Capture timeout → Logged, continue with others
- [ ] Invalid HTML → Logged, skip prototype
- [ ] File write errors → User notified

## User Experience

- [ ] User greeted by name in configured language
- [ ] Tool availability check is non-intrusive
- [ ] Manual workflow option always available
- [ ] Progress indicated during capture
- [ ] Clear feedback for each screenshot
- [ ] Failures explained helpfully
- [ ] File paths provided for easy access

## Success Criteria

**Workflow is successful if:**
1. Browser automation availability checked
2. If not available: Alternatives explained clearly
3. If available: Target prototypes selected
4. Screenshots captured for requested viewports
5. Metadata saved correctly
6. Screenshot index updated
7. User informed of results with paths

**Workflow quality is excellent if additionally:**
8. All captures complete without errors
9. Screenshots are pixel-perfect
10. Metadata is complete and accurate
11. User understands how to use screenshots
12. Integration with analyze workflow explained

## Post-Execution

- [ ] All screenshot PNG files exist and are valid
- [ ] All metadata files exist and are parseable
- [ ] Screenshot index is up-to-date
- [ ] No temporary files left behind
- [ ] User can locate and view screenshots easily
- [ ] Screenshots integrate with analyze workflow

## Special Considerations

### External Dependency (Playwright)
- [ ] Workflow gracefully handles absence of Playwright
- [ ] Installation instructions are clear
- [ ] Manual workflow is fully documented as alternative
- [ ] User never feels "blocked" by tool requirement

### Performance
- [ ] Batch capture doesn't timeout
- [ ] Browser automation efficient (headless)
- [ ] Animations disabled to speed capture
- [ ] Parallel capture not needed (sequential is fine for typical use)

### File Management
- [ ] Screenshots organized logically (by prototype)
- [ ] Metadata co-located with screenshots
- [ ] Index provides global view
- [ ] No duplicate captures (unless forced)
