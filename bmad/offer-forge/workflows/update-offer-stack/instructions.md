# Update Offer Stack Workflow Instructions
# Module: offer-forge
# Version: 1.0.0 (V2)

## Mission

Refine and optimize existing offer stacks based on market feedback, conversion data, pricing tests, or competitive changes. This workflow intelligently routes updates to appropriate specialist agents and regenerates only affected deliverables.

---

## Critical Actions

Before beginning workflow execution:

1. **Load Configuration**
   - Load into memory: `{project-root}/bmad/offer-forge/config.yaml`
   - Set all configuration variables

2. **Set User Context**
   - Remember user's name: `{user_name}`
   - Communicate in: `{communication_language}`

3. **Verify Input Requirements**
   - Existing offer stack path must be provided
   - File must exist and be readable
   - File must be valid offer stack document (created by CREATE workflow)

---

## Phase 1: Load Existing Offer Stack

**Goal**: Parse and analyze current offer stack document.

**Interaction Level**: LOW (Autonomous loading)

**Process**:

1. **Load Document**
   - Read file from: `{existing_offer_stack_path}`
   - Parse all sections and variables
   - Store current state in memory

2. **Extract Key Information**
   - Business name
   - Current tier structure (2-tier or 3-tier)
   - Current pricing (Entry/Core/Premium)
   - Current messaging and USPs
   - Last validation score
   - Creation date

3. **Display Summary**
   > "Loaded offer stack for **{business_name}**
   > - Created: {creation_date}
   > - Last Quality Score: {final_quality_score}/10
   > - Structure: {stack_structure}
   > - Pricing: Entry ({entry_price_final}) | Core ({core_price_final}) | Premium ({premium_price_final})"

**After Loading**:
- Confirm document loaded successfully
- Transition to Phase 2

---

## Phase 2: Identify Update Scope

**Goal**: Determine what needs updating and why.

**Interaction Level**: HIGH (Interactive questioning)

**Process**:

Present update type options to user:

> "What would you like to update? Choose one or more:
>
> **1. Pricing** - Optimize prices based on market data or A/B test results
> **2. Messaging** - Refine value propositions, USPs, or objection handling
> **3. Structure** - Modify tier features, support levels, or value ladder
> **4. Validation** - Re-validate existing stack against current quality standards
> **5. Competitive** - Update positioning based on competitive changes
>
> Enter number(s) (e.g., '1' or '1,2' for multiple): "

**Store user selection as**: `update_type`

**Ask Follow-Up**:
> "Which tier(s) need updating?
> 1. All tiers
> 2. Entry only
> 3. Core only
> 4. Premium only
> 5. Entry + Core
> 6. Core + Premium"

**Store as**: `specific_tier`

**Conditional Logic**:
```
IF update_type == "validation":
  Skip Phase 3 (no context needed for pure validation)
  Proceed directly to Phase 5 (validate)
ELSE:
  Proceed to Phase 3 (gather context)
```

---

## Phase 3: Gather Update Context

**Goal**: Collect relevant data to inform updates.

**Interaction Level**: HIGH (Collaborative questioning)

**Process**:

Ask context questions based on `update_type`:

### If update_type includes "pricing":

**Questions**:
1. "What prompted this pricing update?"
   - [ ] A/B test results
   - [ ] Competitor price changes
   - [ ] Low conversion rates
   - [ ] High cart abandonment
   - [ ] Customer feedback
   - Store as: `pricing_update_reason`

2. "Do you have conversion data to share?"
   - "Entry tier conversion rate: ____%"
   - "Core tier conversion rate: ____%"
   - "Premium tier conversion rate: ____%"
   - Store as: `current_conversion_rates`

3. "What's your pricing goal?"
   - [ ] Increase conversions
   - [ ] Increase revenue per customer
   - [ ] Improve tier distribution
   - [ ] Match competitor pricing
   - Store as: `pricing_goal`

4. "Any pricing constraints?"
   - "Don't go below: $_____"
   - "Don't exceed: $_____"
   - Store as: `pricing_constraints`

---

### If update_type includes "messaging":

**Questions**:
1. "What's not working with current messaging?"
   - [ ] Doesn't resonate with audience
   - [ ] USPs aren't clear enough
   - [ ] Objections not being handled
   - [ ] Language feels off
   - [ ] Tone/voice issues
   - Store as: `messaging_issues`

2. "What customer feedback have you received?"
   - "Common questions: _____"
   - "Common objections: _____"
   - "What customers love: _____"
   - Store as: `customer_feedback`

3. "Any new language patterns from customer conversations?"
   - "Words/phrases they use: _____"
   - Store as: `customer_language`

---

### If update_type includes "structure":

**Questions**:
1. "What structural changes are needed?"
   - [ ] Add/remove features from tiers
   - [ ] Change support levels
   - [ ] Modify access/intimacy
   - [ ] Adjust timelines
   - [ ] Add/remove entire tier
   - Store as: `structure_changes`

2. "Why make these changes?"
   - "Reason: _____"
   - Store as: `structure_rationale`

3. "Any new resources or capabilities to add?"
   - "New offerings: _____"
   - Store as: `new_capabilities`

---

### If update_type includes "competitive":

**Questions**:
1. "What's changed in the competitive landscape?"
   - "New competitors: _____"
   - "Competitor price changes: _____"
   - "New competitor features: _____"
   - Store as: `competitive_changes`

2. "How should we reposition?"
   - "New differentiation angle: _____"
   - Store as: `repositioning_strategy`

---

**After Gathering Context**:
- Summarize all captured information
- Confirm with user
- Transition: "I'll now route these updates to the appropriate specialist agents."

---

## Phase 4: Execute Specialist Updates

**Goal**: Route to appropriate agents based on update type.

**Interaction Level**: LOW (Autonomous agent execution)

**Routing Logic**:

### Route 1: Pricing Updates

**IF** `update_type` includes "pricing":

**Agent**: `pricing-strategist`

**Instructions to Agent**:
> "You are updating pricing for an existing offer stack. Current state:
> - Entry: {entry_price_final}
> - Core: {core_price_final}
> - Premium: {premium_price_final}
>
> **Update Context**:
> - Reason for update: {pricing_update_reason}
> - Current conversion rates: {current_conversion_rates}
> - Pricing goal: {pricing_goal}
> - Constraints: {pricing_constraints}
>
> **Your Mission**:
> Use your embedded prompts to:
> 1. Analyze current pricing effectiveness
> 2. Identify optimization opportunities
> 3. Propose new pricing structure
> 4. Ensure 3-5x value jumps maintained
> 5. Update payment options if needed
>
> **Required Outputs**:
> - New price points for affected tiers
> - Rationale for each change
> - Updated pricing psychology analysis
> - Impact projection (conversion, revenue)
> - Risk assessment"

**Store outputs as**:
- `updated_entry_price` (if applicable)
- `updated_core_price` (if applicable)
- `updated_premium_price` (if applicable)
- `pricing_update_rationale`
- `pricing_impact_projection`

---

### Route 2: Messaging Updates

**IF** `update_type` includes "messaging":

**Agent**: `value-proposition-specialist`

**Instructions to Agent**:
> "You are refining messaging for an existing offer stack. Current state:
> - Current USPs: {current_usps}
> - Current transformation narratives: {current_narratives}
> - Current objection handling: {current_objections}
>
> **Update Context**:
> - Issues identified: {messaging_issues}
> - Customer feedback: {customer_feedback}
> - Customer language patterns: {customer_language}
>
> **Your Mission**:
> Use your embedded prompts to:
> 1. Analyze current messaging gaps
> 2. Refine transformation narratives
> 3. Sharpen USPs and differentiation
> 4. Update objection handling based on real feedback
> 5. Adjust awareness-level messaging if needed
>
> **Required Outputs**:
> - Updated transformation narratives (for affected tiers)
> - Refined USPs
> - New objection responses
> - Improved awareness-level messaging
> - Language/tone adjustments"

**Store outputs as**:
- `updated_transformation_narratives`
- `updated_usps`
- `updated_objection_responses`
- `messaging_update_rationale`

---

### Route 3: Structure Updates

**IF** `update_type` includes "structure":

**Agent**: `offer-architect`

**Instructions to Agent**:
> "You are modifying the structure of an existing offer stack. Current state:
> - Stack structure: {stack_structure}
> - Current tier details: {tier_details}
>
> **Update Context**:
> - Changes needed: {structure_changes}
> - Rationale: {structure_rationale}
> - New capabilities: {new_capabilities}
>
> **Your Mission**:
> Use your embedded prompts to:
> 1. Modify affected elements (features, support, access, etc.)
> 2. Ensure value ladder integrity maintained
> 3. Update tier differentiation logic
> 4. Adjust progression paths if needed
> 5. Validate 3-5x jumps still valid
>
> **Required Outputs**:
> - Updated tier details (for affected tiers and elements)
> - Revised value ladder map
> - Updated differentiation logic
> - Impact on other tiers (if any)"

**Store outputs as**:
- `updated_tier_details`
- `updated_value_ladder_map`
- `structure_update_rationale`

**THEN** cascade to other agents:
- If features changed significantly → Route to Value Prop Specialist (update messaging)
- If support/access changed → Route to Pricing Strategist (validate pricing)

---

### Route 4: Competitive Updates

**IF** `update_type` includes "competitive":

**Agents**: `offer-architect` (positioning) + `value-proposition-specialist` (messaging)

**Instructions to Offer Architect**:
> "Update competitive positioning based on market changes.
>
> **Update Context**:
> - Competitive changes: {competitive_changes}
> - Repositioning strategy: {repositioning_strategy}
>
> **Your Mission**:
> 1. Analyze new competitive landscape
> 2. Identify differentiation opportunities
> 3. Update positioning strategy
> 4. Recommend structural adjustments if needed"

**Instructions to Value Prop Specialist**:
> "Refine messaging to reflect new competitive positioning.
>
> **Update Context**:
> - New positioning: {updated_positioning}
> - Competitive changes: {competitive_changes}
>
> **Your Mission**:
> 1. Update USPs to highlight new differentiation
> 2. Refine competitive objection handling
> 3. Sharpen 'only we...' statements
> 4. Update awareness-level messaging for competitive context"

**Store outputs as**:
- `updated_competitive_positioning`
- `updated_competitive_messaging`

---

**After Agent Execution**:
- Display summary of all updates made
- Transition: "Updates complete. Now validating updated offer stack."

---

## Phase 5: Validate Updated Stack

**Goal**: Ensure updates maintain or improve quality standards.

**Interaction Level**: LOW (Autonomous validation)

**Agent**: `senior-offer-specialist`

**Invocation Method**: Intent-based validation

**Instructions to Agent**:
> "Validate the updated offer stack against all 8 quality criteria.
>
> **Context**:
> - Original quality score: {original_quality_score}
> - Update type: {update_type}
> - Tiers affected: {specific_tier}
> - Changes made: {summary_of_changes}
>
> **Your Mission**:
> Use your embedded prompt `validate-complete-offer` to assess the updated stack.
>
> **Focus Areas** (based on update type):
> - If pricing updated: Validate pricing psychology, value jumps
> - If messaging updated: Validate transformation strength, messaging alignment
> - If structure updated: Validate value ladder integrity, tier differentiation
> - If competitive updated: Validate competitive differentiation
>
> **Validation Process**:
> 1. Score all 8 criteria (same as CREATE workflow)
> 2. Calculate new quality score
> 3. Compare to original score
> 4. Determine if corrections needed (using same severity thresholds)
>
> **Required Outputs**:
> - New quality score
> - Score comparison (improved/maintained/declined)
> - Validation feedback
> - Correction needs (if any)"

**Correction Loop Logic** (same as CREATE workflow):
```
IF validation_status == "Corrections Needed":
  Run correction cycles based on severity
  Max cycles: Minor (1), Moderate (2), Major (3)
ELSE:
  Proceed to Phase 6
```

**Store outputs as**:
- `updated_quality_score`
- `quality_score_delta`
- `validation_status`
- `validation_feedback`

**Display to User**:
> "Validation complete!
> - Original Score: {original_quality_score}/10
> - Updated Score: {updated_quality_score}/10
> - Change: {quality_score_delta} ({improved/maintained/declined})"

---

## Phase 6: Regenerate Affected Deliverables

**Goal**: Update all documents impacted by changes.

**Interaction Level**: LOW (Autonomous regeneration)

**Process**:

### Step 1: Backup Original Files

Create backup copies before overwriting:
```
{business_name}-offer-stack.md → {business_name}-offer-stack-backup-{date}.md
[Repeat for all affected deliverables]
```

**Display**:
> "Backing up original files to:
> - {backup_file_paths}"

---

### Step 2: Determine Affected Deliverables

Based on `update_type`:

**IF** update_type == "pricing":
- Regenerate: Offer stack document, Pricing strategy document, All 3 offer sheets

**IF** update_type == "messaging":
- Regenerate: Offer stack document, Objection handling guide, All 3 offer sheets

**IF** update_type == "structure":
- Regenerate: All deliverables (complete refresh)

**IF** update_type == "validation":
- Regenerate: Offer stack document only (validation section update)

**IF** update_type == "competitive":
- Regenerate: Offer stack document, All 3 offer sheets

---

### Step 3: Regenerate Documents

For each affected deliverable:

1. Load appropriate template
2. Replace variables with updated values
3. Preserve unchanged sections where possible
4. Write updated file to `{output_folder}`

**Deliverable 1: Offer Stack Document** (if affected)
- Template: `{project-root}/bmad/offer-forge/workflows/create-offer-stack/template.md`
- Update affected tier sections
- Update pricing strategy section (if pricing changed)
- Update validation results section
- Update "Last Updated" metadata

**Deliverable 2-4: Offer Sheets** (if affected)
- Templates: `{project-root}/bmad/offer-forge/workflows/create-offer-stack/templates/offer-sheet-*.md`
- Regenerate affected tier sheets
- Update pricing and messaging as needed

**Deliverable 5: Pricing Strategy Document** (if affected)
- Template: `{project-root}/bmad/offer-forge/workflows/create-offer-stack/templates/pricing-strategy-document.md`
- Update pricing analysis sections
- Add "Update History" section showing changes

**Deliverable 6: Objection Handling Guide** (if affected)
- Template: `{project-root}/bmad/offer-forge/workflows/create-offer-stack/templates/objection-handling-guide.md`
- Update objection responses based on new feedback
- Add new objections discovered from customer conversations

---

### Step 4: Create Update Log

Generate summary document: `{business_name}-update-log-{date}.md`

**Contents**:
```markdown
# Offer Stack Update Log
**Date**: {current_date}
**Update Type**: {update_type}
**Tiers Affected**: {specific_tier}

## Changes Made

### Pricing Changes
- Entry: {old_price} → {new_price} ({reason})
- Core: {old_price} → {new_price} ({reason})
- Premium: {old_price} → {new_price} ({reason})

### Messaging Changes
- {list of messaging updates}

### Structure Changes
- {list of structural updates}

## Quality Score Impact
- Original Score: {original_quality_score}/10
- Updated Score: {updated_quality_score}/10
- Delta: {quality_score_delta}

## Validation Feedback
{validation_feedback}

## Files Updated
- {list of regenerated files}

## Backup Files
- {list of backup file paths}

## Next Steps
{recommendations from Senior Offer Specialist}
```

---

## Workflow Completion

After all deliverables are regenerated:

1. **Confirm Updates**:
   > "**Update Complete!**
   >
   > **Changes Made**:
   > - Update Type: {update_type}
   > - Tiers Affected: {specific_tier}
   > - Quality Score: {original_quality_score}/10 → {updated_quality_score}/10
   >
   > **Files Updated**:
   > {list of regenerated files}
   >
   > **Backup Files**:
   > {list of backup files}
   >
   > **Update Log**: {update_log_path}"

2. **Provide Recommendations**:
   > "**Recommended Next Steps**:
   > 1. Review updated offer stack document
   > 2. Test new pricing/messaging with small audience segment
   > 3. Monitor conversion rates and gather feedback
   > 4. Run periodic validation checks (use `/offer-forge` → `*validate`)
   >
   > **If Issues Arise**:
   > - Revert using backup files in {backup_folder}
   > - Run UPDATE workflow again with refined context
   > - Consider A/B testing old vs new versions"

3. **Workflow Complete**:
   - Mark workflow as completed
   - Return control to hub agent or user

---

## Error Handling

### If Existing File Not Found
- Display error: "Offer stack file not found at: {path}"
- Ask user to provide correct path
- Offer to run CREATE workflow if no existing stack

### If File Invalid Format
- Display error: "File doesn't appear to be a valid offer stack document"
- Check for required sections
- Ask user if they want to:
  1. Try different file
  2. Run CREATE workflow to build from scratch

### If No Changes Identified
- Ask user: "No changes were specified. Would you like to run a validation-only check?"
- If yes: Skip to Phase 5 (validation)
- If no: Exit workflow gracefully

### If Quality Score Declines
- Alert user: "Updated quality score ({updated_quality_score}) is lower than original ({original_quality_score})"
- Present options:
  1. Accept changes anyway
  2. Revert to original (restore from backup)
  3. Run additional correction cycles
  4. Manually review and adjust

### If Agent Fails
- Retry agent invocation once
- If second failure: notify user and allow manual intervention
- Offer to save partial progress

---

## Workflow Metadata

- **Version**: 1.0.0 (V2)
- **Author**: Daniel
- **Module**: offer-forge
- **Type**: Action Workflow
- **Estimated Duration**: 10-20 minutes (depending on update scope and correction cycles)
- **Dependencies**: 4 specialist agents (subset used based on update type)
- **Output**: Updated offer stack + affected deliverables + update log + backups
