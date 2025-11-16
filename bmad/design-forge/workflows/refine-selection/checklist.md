# Refine Selection - Validation Checklist

## Pre-Execution Validation

- [ ] At least 1 prototype HTML file exists in {prototype_output_folder}
- [ ] Selected prototype is valid HTML file
- [ ] Output directory {prototype_output_folder} is writable
- [ ] State file directory is writable

## Execution Validation

### Step 1: Prototype Loading & State Management
- [ ] User greeted by name in configured language
- [ ] Prototypes scanned and listed correctly
- [ ] User selection captured
- [ ] Prototype HTML loaded and parsed successfully
- [ ] State file checked (exists or created new)
- [ ] If continuing session: Previous state loaded correctly
- [ ] If new session: Iteration limit set (1-5)

### Step 2: Baseline Analysis
- [ ] All 10 design parameter categories analyzed
- [ ] Quality scores calculated (0-100 range)
- [ ] Accessibility metrics assessed
- [ ] Coherence score calculated
- [ ] Baseline stored for comparison

### Step 3: Refinement Mode Selection
- [ ] User prompted for mode (conversational/guided/hybrid)
- [ ] Selection validated and stored

### Step 4: Feedback Gathering (Mode-Dependent)
**Conversational Mode:**
- [ ] Open-ended feedback prompt shown
- [ ] User feedback captured

**Guided Mode:**
- [ ] Design aspect categories listed
- [ ] User selection captured
- [ ] Specific adjustment options presented with current values
- [ ] Adjustments captured

**Hybrid Mode:**
- [ ] Natural language feedback gathered
- [ ] Intent interpreted correctly
- [ ] Precision controls offered
- [ ] Fine-tuned adjustments captured

### Step 5: Feedback Interpretation
- [ ] User feedback translated to specific parameter changes
- [ ] Change rationale documented
- [ ] Archetype shifts calculated (if applicable)
- [ ] Parameter change specification generated

### Step 6: Validation
- [ ] Accessibility checks performed (contrast, touch targets, font sizes)
- [ ] Coherence checks performed (no conflicts, reasonable shifts)
- [ ] Technical checks performed (responsive, performance, valid CSS)
- [ ] If issues detected: Warnings shown with alternatives
- [ ] User choice on warnings handled correctly
- [ ] Predicted coherence score calculated (target ≥80)

### Step 7: HTML Generation
- [ ] Refined HTML generated with all changes applied
- [ ] Responsive behavior maintained
- [ ] Accessibility preserved (WCAG AA minimum)
- [ ] Component consistency maintained
- [ ] Embedded changelog added with complete details
- [ ] File saved with correct naming pattern
- [ ] File path stored

### Step 8: State Update & Presentation
- [ ] Iteration counter incremented
- [ ] State file updated with:
  - [ ] Latest refined file path
  - [ ] Iteration added to history
  - [ ] Cumulative changes updated
- [ ] Changes clearly presented to user with:
  - [ ] Before/after values for each parameter
  - [ ] Archetype shift details
  - [ ] Quality metrics comparison
  - [ ] File paths (original and refined)

### Step 9: Satisfaction Check
- [ ] User prompted for satisfaction level (1-4 options)
- [ ] Response captured and validated
- [ ] Appropriate action taken:
  - [ ] If done: Proceed to finalize
  - [ ] If revert: Load previous version, update state
  - [ ] If continue: Check iteration limit
  - [ ] If at limit: Handle limit reached

### Step 10: Iteration Limit Handling (if reached)
- [ ] Limit reached message shown with recommendations
- [ ] User prompted for decision (finalize/extend/start fresh)
- [ ] If extend: Limit increased by 2, state updated
- [ ] If finalize or start fresh: Proceed accordingly

### Step 11: Finalization
- [ ] Comprehensive refinement summary generated with:
  - [ ] Original and final file paths
  - [ ] Total iterations
  - [ ] Cumulative changes summarized
  - [ ] Quality progression shown
  - [ ] Iteration history detailed
  - [ ] Design rationale synthesized
- [ ] Summary saved to markdown file
- [ ] State file marked as completed
- [ ] User informed of completion with next steps

## State File Validation

### New Session
- [ ] State file created with correct structure
- [ ] All required fields present (original_file, current_iteration, iteration_limit, refinement_history, etc.)
- [ ] Iteration limit set within valid range (1-5)

### Continuing Session
- [ ] Existing state file loaded successfully
- [ ] All fields present and valid
- [ ] Latest refined file exists and is valid
- [ ] Iteration history intact

### Updates
- [ ] State file updated after each iteration
- [ ] Refinement history appended correctly
- [ ] Current iteration incremented
- [ ] Latest refined file path updated
- [ ] Cumulative changes tracked

### Completion
- [ ] completed flag set to true
- [ ] completed_at timestamp added
- [ ] Final state persisted

## Output Validation

### Refined HTML Files
- [ ] Files exist at reported paths
- [ ] File names follow pattern: {name}-refined-v{iteration}-{date}.html
- [ ] Valid HTML5 structure
- [ ] CSS changes applied correctly
- [ ] Embedded changelog complete and accurate
- [ ] Responsive across breakpoints
- [ ] Accessible (WCAG AA minimum)

### Refinement Summary
- [ ] Summary markdown file created
- [ ] All sections complete (original, final, iterations, quality, rationale)
- [ ] Iteration history accurate
- [ ] Quality metrics progression shown
- [ ] Design rationale synthesized meaningfully

### State Files
- [ ] State JSON files valid and parseable
- [ ] All required fields present
- [ ] History array properly structured
- [ ] Timestamps in ISO format

## Quality Validation

- [ ] All refinements maintain coherence score ≥80
- [ ] No accessibility regressions (WCAG AA maintained)
- [ ] Responsive behavior preserved across all breakpoints
- [ ] Animation performance maintained (60fps)
- [ ] Parameter changes are internally consistent
- [ ] Archetype shifts are reasonable (<40% per iteration)
- [ ] Visual hierarchy maintained

## Error Handling

- [ ] No prototypes found → Clear error, exit gracefully
- [ ] Invalid HTML → Error shown with details
- [ ] State file corrupt → Recovery attempt or fresh start offered
- [ ] Validation failures → User warned, alternatives offered
- [ ] File write errors → User notified with troubleshooting
- [ ] Iteration limit reached → User given options

## User Experience

- [ ] User greeted by name in configured language
- [ ] All prompts clear and contextual
- [ ] Progress indicated throughout
- [ ] Changes explained in understandable terms
- [ ] Quality metrics meaningful and accurate
- [ ] File paths provided for easy access
- [ ] Next steps guidance clear
- [ ] Iteration loop feels natural (continue/stop/revert)

## Success Criteria

**Workflow is successful if:**
1. Prototype successfully loaded and analyzed
2. User feedback captured (any mode)
3. Feedback interpreted into parameter changes
4. Changes validated (accessibility, coherence, technical)
5. Refined HTML generated successfully
6. State persisted correctly
7. User satisfied or iteration limit handled gracefully
8. Summary generated on completion

**Workflow quality is excellent if additionally:**
9. All refinements maintain coherence ≥85
10. Zero accessibility issues introduced
11. User feedback interpretation is accurate and meaningful
12. State management is seamless (sessions resume correctly)
13. Iteration loop feels productive (not tedious)
14. Final result matches user's vision
15. Summary provides valuable design rationale

## Post-Execution

- [ ] All generated files exist at reported paths
- [ ] Refined prototypes are production-ready
- [ ] State files allow session resumption
- [ ] Summary reports are complete and accurate
- [ ] No orphaned files or incomplete iterations
- [ ] User can immediately preview and use refined prototypes
