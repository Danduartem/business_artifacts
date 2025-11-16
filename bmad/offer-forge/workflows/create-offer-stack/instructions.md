# Create Offer Stack Workflow Instructions
# Module: offer-forge
# Version: 1.0.0

## Mission

Build a complete 3-tier offer stack (Entry, Core, Premium) with strategic positioning, compelling messaging, and psychologically optimized pricing through a structured 6-phase collaborative process that orchestrates four specialist agents.

This workflow transforms business context into a complete offer ecosystem with 4 core deliverables:
1. **Offer Stack Document**: Complete 3-tier architecture with all 12 foundational elements
2. **Offer Sheets**: Sales-ready one-pagers for each tier (3 sheets)
3. **Pricing Strategy Document**: Pricing psychology analysis and rationale
4. **Objection Handling Guide**: Pre-emptive objection responses for each tier

---

## Critical Actions

Before beginning workflow execution:

1. **Load Configuration**
   - Load into memory: `{project-root}/bmad/offer-forge/config.yaml`
   - Set all configuration variables for use throughout workflow

2. **Set User Context**
   - Remember user's name: `{user_name}`
   - Communicate in: `{communication_language}`

3. **Initialize Workflow Variables**
   - Set `creation_date` to today's date
   - Set `workflow_version` to "1.0.0"

4. **Prepare Agent Context**
   - All agent invocations receive full context from previous phases
   - Each agent builds upon the outputs of prior agents

---

## Phase 1: Context Gathering

**Goal**: Collect comprehensive business context to inform offer design.

**Interaction Level**: HIGH (Collaborative questioning)

**Process**:

Welcome the user and explain the workflow:
> "I'll guide you through creating a complete 3-tier offer stack. This process has 6 phases:
> 1. **Context Gathering** (5-10 minutes): I'll ask questions about your business
> 2. **Offer Architecture** (Agent 1): Designing your complete offer structure
> 3. **Value Propositions** (Agent 2): Crafting compelling messaging
> 4. **Pricing Strategy** (Agent 3): Optimizing price points psychologically
> 5. **Quality Validation** (Agent 4): Expert review and refinement
> 6. **Deliverable Generation**: Creating your final 4 documents
>
> Let's start with Phase 1. I'll ask you 8 questions to understand your business."

**Questions to Ask** (capture as variables):

1. **Business Name & Description**
   - "What's your business name?"
   - "In 2-3 sentences, describe what your business does."
   - Store as: `business_name`, `business_description`

2. **Industry Category**
   - "What industry or category are you in? (e.g., coaching, consulting, SaaS, education, agency)"
   - Store as: `industry_category`

3. **Target Audience**
   - "Who is your ideal customer? Be specific about their:
     - Current situation/pain points
     - Goals and aspirations
     - Experience level or stage"
   - Store as: `target_audience`

4. **Core Transformation**
   - "What's the primary transformation you provide? Complete this:
     - FROM: [current state]
     - TO: [desired state]"
   - Store as: `core_transformation`

5. **Current Pricing Model** (if applicable)
   - "Do you have existing offers? If yes, what do you currently charge?"
   - "If no existing offers, what's your target price range?"
   - Store as: `current_pricing_model`

6. **Competitive Landscape**
   - "Who are 2-3 competitors in your space?"
   - "What do they charge for similar solutions?"
   - "What makes you different from them?"
   - Store as: `competitive_landscape`

7. **Unique Advantages**
   - "What unique expertise, methodology, or resources do you have that competitors don't?"
   - Store as: `unique_advantages`

8. **Stack Preference** (Optional)
   - "Do you want a 3-tier stack (Entry/Core/Premium) or 2-tier stack (Core/Premium)?"
   - "Default: 3-tier for most businesses"
   - Store as: `stack_structure` (default: "3-tier")

**After Gathering Context**:
- Confirm all information with user
- Provide a brief summary of what was captured
- Transition: "Perfect! Now I'll hand this context to our Offer Architect agent to design your complete offer structure. This will take 2-3 minutes."

---

## Phase 2: Offer Architect Execution

**Goal**: Design complete offer stack with all 12 foundational elements.

**Interaction Level**: LOW (Autonomous agent execution)

**Agent**: `offer-architect` (value-proposition-specialist.agent.yaml)

**Invocation Method**: Intent-based agent prompt

**Instructions to Agent**:

> "You are the Offer Architect. Using the context gathered, design a complete {stack_structure} offer stack.
>
> **Context Provided**:
> - Business: {business_name} - {business_description}
> - Industry: {industry_category}
> - Target Audience: {target_audience}
> - Core Transformation: {core_transformation}
> - Current Pricing: {current_pricing_model}
> - Competition: {competitive_landscape}
> - Unique Advantages: {unique_advantages}
>
> **Your Mission**:
> Use your embedded prompt `architect-offer-stack` to create a complete offer stack with all 12 elements for each tier (Entry/Core/Premium).
>
> **Required Outputs** (store as template variables):
> 1. Stack structure confirmation (2-tier or 3-tier)
> 2. Complete tier details for each tier:
>    - Offer name & positioning
>    - Target transformation (before/after)
>    - Core features/components
>    - Deliverables/outcomes
>    - Support level (self-serve/done-with-you/done-for-you)
>    - Access/intimacy level
>    - Timeline/duration
>    - Initial pricing structure
>    - Tier differentiation logic
>    - Value ladder progression
>    - Qualification criteria
>    - Cross-sell/upsell paths
> 3. Value ladder progression map showing how tiers connect
> 4. Competitive positioning notes
>
> Present your output in structured format ready for the next agent."

**Agent Processing**:
- The agent will use its embedded prompts to architect the complete offer stack
- Allow agent to work autonomously
- Capture all outputs as template variables:
  - `stack_structure`
  - `entry_tier_details`
  - `core_tier_details`
  - `premium_tier_details` (if 3-tier)
  - `value_ladder_map`
  - `tier_differentiation`

**After Agent Completion**:
- Display a brief summary of what was created (tier names, price points)
- Transition: "Excellent architecture! Now I'll pass this to our Value Proposition Specialist to craft compelling messaging and transformation narratives."

---

## Phase 3: Value Proposition Specialist Execution

**Goal**: Craft transformation narratives, USPs, and emotionally resonant messaging.

**Interaction Level**: LOW (Autonomous agent execution)

**Agent**: `value-proposition-specialist` (value-proposition-specialist.agent.yaml)

**Invocation Method**: Intent-based agent prompt

**Instructions to Agent**:

> "You are the Value Proposition Specialist. Using the offer architecture from the Offer Architect, craft compelling messaging and transformation narratives.
>
> **Context Provided**:
> - All business context from Phase 1
> - Complete offer architecture from Phase 2
> - Tier details: {entry_tier_details}, {core_tier_details}, {premium_tier_details}
>
> **Your Mission**:
> Use your embedded prompts to create:
> 1. `craft-transformation-promises`: Before/after narratives for each tier
> 2. `develop-compelling-story`: Hero's journey narratives and benefit-driven copy
> 3. `create-usps`: Unique selling propositions for each tier
> 4. `build-objection-handling`: Pre-emptive objection responses
> 5. `map-awareness-messaging`: Messaging variants for Eugene Schwartz's 5 awareness levels
>
> **Required Outputs** (store as template variables):
> For each tier (Entry/Core/Premium):
> - Transformation narrative (before → bridge → after)
> - Identity shift statement
> - 3-5 emotional hooks
> - Hero's journey narrative
> - 5-7 benefit statements (feature → benefit → transformation)
> - Opening hook and call to transformation
> - Primary USP and 3-5 "Only we..." statements
> - 5-7 objection/response pairs
> - Awareness-level messaging variants (Levels 3-5)
>
> Present your output in structured format ready for the Pricing Strategist."

**Agent Processing**:
- The agent will use its embedded prompts to craft all messaging elements
- Allow agent to work autonomously
- Capture all outputs as template variables:
  - `entry_transformation_narrative`
  - `core_transformation_narrative`
  - `premium_transformation_narrative`
  - `entry_usps`
  - `core_usps`
  - `premium_usps`
  - `objection_responses`
  - `awareness_level_messaging`

**After Agent Completion**:
- Display sample messaging (e.g., one USP from each tier)
- Transition: "Powerful messaging created! Now I'll hand this to our Pricing Strategist to optimize price points using pricing psychology."

---

## Phase 4: Pricing Strategist Execution

**Goal**: Apply pricing psychology and optimize price points for maximum conversion.

**Interaction Level**: LOW (Autonomous agent execution)

**Agent**: `pricing-strategist` (pricing-strategist.agent.yaml)

**Invocation Method**: Intent-based agent prompt

**Instructions to Agent**:

> "You are the Pricing Strategist. Using the complete offer stack and messaging, optimize pricing using pricing psychology principles.
>
> **Context Provided**:
> - All business context from Phase 1
> - Complete offer architecture from Phase 2
> - All messaging and value propositions from Phase 3
> - Initial pricing structure: {entry_tier_details.price}, {core_tier_details.price}, {premium_tier_details.price}
>
> **Your Mission**:
> Use your embedded prompts to:
> 1. `analyze-pricing-psychology`: Apply all 5 pricing psychology techniques
> 2. `optimize-tier-pricing`: Ensure 3-5x value jumps between tiers
> 3. `design-payment-options`: Create payment plans and options
> 4. `anchor-value`: Design value anchoring and comparison strategies
> 5. `calculate-pricing-ranges`: Provide pricing sensitivity analysis
>
> **Required Outputs** (store as template variables):
> - Optimized price points for each tier
> - Pricing psychology rationale (which techniques applied and why)
> - Payment options for each tier
> - Value anchoring strategy
> - Competitive positioning on price
> - Price sensitivity analysis
> - Recommended price testing strategy
>
> Present your output with clear rationale for all pricing decisions."

**Agent Processing**:
- The agent will use its embedded prompts to optimize pricing
- Allow agent to work autonomously
- Capture all outputs as template variables:
  - `entry_price_final`
  - `core_price_final`
  - `premium_price_final`
  - `pricing_psychology_rationale`
  - `payment_options`
  - `value_anchoring_strategy`

**After Agent Completion**:
- Display final price points with brief rationale
- Transition: "Pricing optimized! Now I'll send everything to our Senior Offer Specialist for quality validation and final review."

---

## Phase 5: Senior Offer Specialist Validation

**Goal**: Validate complete offer stack against 8 quality criteria and run correction loops if needed.

**Interaction Level**: LOW (Autonomous validation with conditional correction)

**Agent**: `senior-offer-specialist` (senior-offer-specialist.agent.yaml)

**Invocation Method**: Intent-based agent prompt with conditional correction logic

**Instructions to Agent**:

> "You are the Senior Offer Specialist. Validate the complete offer stack against all 8 quality criteria.
>
> **Context Provided**:
> - Complete offer architecture (Phase 2)
> - All messaging and value propositions (Phase 3)
> - Final pricing strategy (Phase 4)
>
> **Your Mission**:
> Use your embedded prompt `validate-complete-offer` to assess the offer stack across 8 criteria:
> 1. Value Ladder Integrity (natural progression, 3-5x jumps)
> 2. Tier Differentiation Clarity (no confusion or overlap)
> 3. Transformation Promise Strength (compelling before/after)
> 4. Messaging Alignment (consistent voice, authentic language)
> 5. Pricing Psychology Application (5 techniques properly applied)
> 6. Objection Handling Coverage (all major objections addressed)
> 7. Support Scaling Logic (self-serve → done-with-you → done-for-you)
> 8. Competitive Differentiation (clear USPs, strategic positioning)
>
> **Validation Process**:
> 1. Score each criterion: Strong (10), Good (7-9), Needs Work (4-6), Weak (1-3)
> 2. Calculate overall quality score
> 3. Determine severity level:
>    - STRONG (8.0-10.0): Approve → Proceed to Phase 6
>    - GOOD (7.0-7.9): Minor issues → 1 correction cycle
>    - MODERATE (5.0-6.9): Moderate issues → 2 correction cycles
>    - WEAK (<5.0): Major issues → 3 correction cycles
> 4. If correction needed, provide specific feedback to relevant agent(s)
>
> **Required Outputs**:
> - Validation status: "Approved" or "Corrections Needed"
> - Quality score (0-10 average)
> - Detailed feedback for each criterion
> - Correction instructions (if applicable)"

**Correction Loop Logic**:

```
IF validation_status == "Corrections Needed":
  1. Determine severity from quality_score:
     - Minor (7.0-7.9): max_cycles = 1
     - Moderate (5.0-6.9): max_cycles = 2
     - Major (<5.0): max_cycles = 3

  2. For each correction cycle (up to max_cycles):
     a. Route feedback to appropriate specialist agent(s):
        - Architecture issues → Offer Architect (Phase 2)
        - Messaging issues → Value Proposition Specialist (Phase 3)
        - Pricing issues → Pricing Strategist (Phase 4)

     b. Provide specific correction instructions:
        "The Senior Offer Specialist identified these issues:
         [specific feedback]

         Please address these corrections and resubmit."

     c. Re-run validation after corrections

     d. IF validation_status == "Approved":
          Break loop → Proceed to Phase 6
        ELSE IF cycle == max_cycles:
          Present to user with explanation:
          "After {max_cycles} correction cycles, the offer stack scores {quality_score}/10.
           Would you like to:
           1. Proceed to deliverable generation with current version
           2. Manually review and provide guidance
           3. Run additional correction cycles"

          Handle user choice
        ELSE:
          Continue to next cycle

ELSE (validation_status == "Approved"):
  Proceed directly to Phase 6
```

**Agent Processing**:
- Run full validation assessment
- If corrections needed, execute appropriate correction cycles
- Display validation results to user with quality score
- Store final outputs:
  - `validation_status`
  - `validation_feedback`
  - `final_quality_score`

**After Validation Complete**:
- Display final quality score and status
- Transition: "Validation complete! Quality score: {final_quality_score}/10. Now generating your 4 final deliverables."

---

## Phase 6: Generate Final Deliverables

**Goal**: Create all 4 core deliverable documents with complete formatting.

**Interaction Level**: LOW (Autonomous document generation)

**Process**:

Generate all deliverables by populating templates with captured variables:

### Deliverable 1: Complete Offer Stack Document

**Template**: `{installed_path}/template.md`

**Process**:
1. Use workflow.xml's template-output mechanism
2. Replace all {{variable_name}} placeholders with captured values
3. Include all 12 elements for each tier
4. Add value ladder progression map
5. Include validation results and quality score

**Output File**: `{output_folder}/{business_name}-offer-stack.md`

**Template Output Tag**:
```xml
<template-output path="{output_folder}/{business_name}-offer-stack.md">
[Complete offer stack document with all variables populated]
</template-output>
```

---

### Deliverable 2: Offer Sheets (3 sheets)

**Templates**:
- `{installed_path}/templates/offer-sheet-entry.md`
- `{installed_path}/templates/offer-sheet-core.md`
- `{installed_path}/templates/offer-sheet-premium.md`

**Process**:
For EACH tier:
1. Create sales-ready one-pager
2. Include: Offer name, transformation promise, key features, pricing, USPs, CTA
3. Format for customer-facing use

**Output Files**:
- `{output_folder}/{business_name}-entry-offer-sheet.md`
- `{output_folder}/{business_name}-core-offer-sheet.md`
- `{output_folder}/{business_name}-premium-offer-sheet.md`

**Template Output Tags**:
```xml
<template-output path="{output_folder}/{business_name}-entry-offer-sheet.md">
[Entry tier offer sheet]
</template-output>

<template-output path="{output_folder}/{business_name}-core-offer-sheet.md">
[Core tier offer sheet]
</template-output>

<template-output path="{output_folder}/{business_name}-premium-offer-sheet.md">
[Premium tier offer sheet]
</template-output>
```

---

### Deliverable 3: Pricing Strategy Document

**Template**: `{installed_path}/templates/pricing-strategy-document.md`

**Process**:
1. Document complete pricing rationale
2. Include pricing psychology analysis
3. Show value anchoring strategy
4. List payment options
5. Include competitive pricing positioning
6. Add price testing recommendations

**Output File**: `{output_folder}/{business_name}-pricing-strategy.md`

**Template Output Tag**:
```xml
<template-output path="{output_folder}/{business_name}-pricing-strategy.md">
[Complete pricing strategy document]
</template-output>
```

---

### Deliverable 4: Objection Handling Guide

**Template**: `{installed_path}/templates/objection-handling-guide.md`

**Process**:
1. List all objections by category (price, time, trust, fit, timing)
2. Provide tier-specific objection responses
3. Include trust-building elements
4. Add social proof integration points
5. Format for sales team reference

**Output File**: `{output_folder}/{business_name}-objection-handling.md`

**Template Output Tag**:
```xml
<template-output path="{output_folder}/{business_name}-objection-handling.md">
[Complete objection handling guide]
</template-output>
```

---

## Workflow Completion

After all deliverables are generated:

1. **Confirm File Locations**:
   > "All deliverables have been created and saved to: {output_folder}"
   >
   > **Files Generated**:
   > 1. `{business_name}-offer-stack.md` (Complete offer architecture)
   > 2. `{business_name}-entry-offer-sheet.md` (Entry tier sales sheet)
   > 3. `{business_name}-core-offer-sheet.md` (Core tier sales sheet)
   > 4. `{business_name}-premium-offer-sheet.md` (Premium tier sales sheet)
   > 5. `{business_name}-pricing-strategy.md` (Pricing strategy and rationale)
   > 6. `{business_name}-objection-handling.md` (Objection responses)
   >
   > **Quality Score**: {final_quality_score}/10

2. **Provide Next Steps**:
   > "**Recommended Next Steps**:
   > 1. Review the complete offer stack document for overall strategy
   > 2. Use the offer sheets for customer-facing sales conversations
   > 3. Reference the pricing strategy when setting up payment systems
   > 4. Train your sales team using the objection handling guide
   >
   > **Future Enhancements** (use `/offer-forge` → `*update`):
   > - Refine messaging based on customer feedback
   > - Adjust pricing after market testing
   > - Add new tiers or modify existing ones
   > - Update objection responses based on actual objections heard
   >
   > **Validation** (use `/offer-forge` → `*validate`):
   > - Run periodic quality checks on your offer stack
   > - Ensure value ladder still aligns with market
   > - Validate pricing against competitive changes"

3. **Workflow Complete**:
   - Mark workflow as completed
   - Return control to hub agent or user

---

## Error Handling

### If Agent Fails to Respond
- Retry agent invocation once
- If second failure, notify user and ask for manual intervention

### If User Abandons During Phase 1
- Offer to save partial context
- Allow resumption from where they left off

### If Validation Never Approves (Exceeds Max Cycles)
- Present options to user (see Phase 5 correction loop logic)
- Allow manual override with user acknowledgment

### If Template Variables Missing
- Identify missing variables
- Re-run specific phase to capture missing data
- Do not proceed to deliverable generation until all variables populated

---

## Workflow Metadata

- **Version**: 1.0.0
- **Author**: Daniel
- **Module**: offer-forge
- **Type**: Document Workflow
- **Estimated Duration**: 15-25 minutes (varies based on correction cycles)
- **Dependencies**: 4 specialist agents
- **Output**: 6 files (1 main stack + 3 offer sheets + 2 supporting documents)
