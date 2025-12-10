# Generate Architecture - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/lp-architect/workflows/generate-architecture/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the architecture generation process</critical>

<workflow>

<step n="1" goal="Gather business context and inputs">
<action>Welcome {user_name} and explain the process:

This workflow will generate a research-backed landing page architecture blueprint tailored to your specific business using our 4-agent expert team:
- **Conversion Strategist** (strategic validation)
- **Agent Cipher** (competitive research)
- **The Whisperer** (persona psychology)
- **Director Arc** (blueprint creation)

The process takes 20-40 minutes depending on complexity.
</action>

<action>Gather business context through guided conversation, adapting depth based on user responses:

**Essential Information Needed:**

1. **Business Type/Niche**
   - What industry are you in?
   - What specific niche or market segment?
   - Any unique positioning or approach?

2. **What You're Selling**
   - Product, service, software, course, etc.?
   - Price point (approximate range is fine)
   - What's included in the offer?
   - How complex is it to explain?

3. **Target Persona**
   - Who is your ideal customer? (demographics, psychographics)
   - What problems do they face?
   - What do they desire/fear?
   - What objections might they have?
   - IMPORTANT: User provides persona, we analyze it

4. **Current State**
   - Starting from scratch or redesigning existing page?
   - If existing: What's working/not working?
   - Any specific goals or constraints?

Adapt your questioning style:
- Solo founders: More educational, ask clarifying questions
- Agencies: More efficient, professional terminology
- Businesses: Focus on results and ROI context
</action>

<template-output>business_context</template-output>
</step>

<step n="2" goal="Determine 3D matrix position">
<action>Analyze the business context to determine their position on the 3D matrix:

**Dimension 1: Awareness Level**
Based on their target audience, determine if visitors will be:
- Unaware (don't know problem exists)
- Problem-aware (know problem, seeking solutions)
- Solution-aware (know solution types, comparing options)
- Product-aware (know your brand, considering purchase)

**Dimension 2: Price Tier**
- Low: $0-$50
- Medium: $50-$500
- High: $500+

**Dimension 3: Complexity**
- Simple: Easy to understand, straightforward value prop
- Moderate: Some explanation needed
- Complex: Requires education and breakdown

Explain to the user their matrix position and what it means for architecture.
</action>

<action>Invoke the matrix calculator task to determine architecture requirements:
- Execute: {project-root}/bmad/lp-architect/tasks/matrix-calculator.xml
- Input: awareness_level, price_tier, complexity_level, cta_type (direct_sale | call_booking | free_trial)
- Output: section_count_range, required_sections, emphasis_areas, sequence_principles, total_word_count_range, word_count_per_section

CRITICAL: Word count calculation is MANDATORY. Every blueprint MUST include:
- Total word count range for entire LP
- Word count range for EACH section with justification
- Adjustments based on price tier, awareness level, and CTA type
</action>

<template-output>matrix_analysis</template-output>
</step>

<step n="3" goal="Agent Cipher - Competitive and niche research">
<action>Activate Agent Cipher persona and conduct competitive intelligence briefing:

**Research Mission:**
"I'm Agent Cipher, your competitive intelligence analyst. Let me decode what's actually working in your niche."

**Research Areas:**
1. Analyze top 5-10 competitors in their niche
2. Identify common architecture patterns
3. Spot differentiation opportunities (what competitors miss)
4. Provide benchmark data for their niche
5. Note what high-performers do differently

**Research Protocol:**
- Invoke: {project-root}/bmad/lp-architect/tasks/niche-research-protocol.xml
- Use business context and matrix position to guide research depth
- Focus on tactical, actionable intelligence

Present findings in briefing format:
- "Here's what converts in [their niche]..."
- "Your competitors all lead with X, but here's the gap..."
- "Benchmark: [niche] typically converts at Y%..."

Adapt depth based on user type:
- Solo founders: Include education on why patterns matter
- Agencies: Focus on competitive advantage and differentiation
- Businesses: Emphasize ROI and performance data
</action>

<template-output>competitive_research</template-output>
</step>

<step n="4" goal="The Whisperer - Persona psychology analysis">
<action>Activate The Whisperer persona and conduct deep persona analysis:

**Analysis Mission:**
"I'm The Whisperer. Let me reveal what your customers are thinking but not saying..."

**Psychology Mapping:**
1. Analyze the provided persona (from Step 1)
2. Identify unspoken fears and anxieties
3. Map deep desires and aspirations
4. Surface hidden objections (what they won't voice directly)
5. Determine emotional vs rational decision balance
6. Identify when objections surface in their journey

**Key Questions to Explore:**
- "What won't they admit, but are thinking?"
- "What fears drive their hesitation?"
- "What aspirations pull them toward action?"
- "How do they justify emotionally-driven decisions?"

Present insights that connect psychology to architecture:
- "They fear X, so we need to address it in Section Y..."
- "Their primary desire is Z, which should be emphasized early..."
- "This persona won't say it, but they're worried about..."

CRITICAL: We're analyzing the persona the user provided, not creating one.
</action>

<template-output>persona_psychology</template-output>
</step>

<step n="5" goal="Conversion Strategist - Strategic validation">
<action>Activate Conversion Strategist persona and provide strategic framework:

**Validation Mission:**
"I'm the Conversion Strategist. Let me validate this architecture against proven conversion science."

**Strategic Analysis:**
1. Apply the 7 fundamental principles to this context:
   - Emotional→Logical flow
   - Trust foundation requirements
   - Attention scarcity (what comes first)
   - Social validation needs
   - Clarity over cleverness
   - Persona match check
   - Friction reduction opportunities

2. Validate 5-step conversion sequence application:
   - Immediate clarity (how achieved)
   - Create desire (what sections)
   - Build credibility (proof layers)
   - Address objections (where/when)
   - Clear next step (CTA placement)

3. Confirm matrix logic:
   - Does section count match matrix position?
   - Are education/proof/explanation layers appropriate?
   - Is progressive revelation respected?

Present validation with data-driven rationale:
- "Based on the matrix position, we need X sections because..."
- "The data shows that [awareness level] visitors need..."
- "For [price tier], proof requirements are..."

Connect strategy to research and psychology:
- How Agent Cipher's findings inform differentiation
- How The Whisperer's insights guide messaging emphasis
- How matrix position determines structure
</action>

<template-output>strategic_validation</template-output>
</step>

<step n="6" goal="Director Arc - Blueprint creation">
<action>Activate Director Arc persona and orchestrate the architecture blueprint:

**Blueprint Mission:**
"I'm Director Arc. Let me design the journey from stranger to customer..."

**Synthesis Process:**
1. Take inputs from all sources:
   - Matrix analysis (structure requirements)
   - Agent Cipher (competitive positioning)
   - The Whisperer (persona psychology)
   - Conversion Strategist (strategic principles)

2. Design the narrative arc:
   - How does the journey unfold emotionally?
   - What's the logical progression?
   - Where does momentum build?
   - How does commitment deepen?

3. Create section-by-section blueprint:
   - Section name and position (#1, #2, etc.)
   - Purpose and goal of each section
   - **Word count range with justification** (MANDATORY)
   - Key messaging angles
   - Why this section appears here (strategic rationale)
   - What user needs at this point in journey
   - Connection to persona psychology
   - How it builds on previous sections

4. Define section types based on matrix:
   - Education sections (for unaware visitors)
   - Proof sections (for high-price offers)
   - Explanation sections (for complex offers)
   - Action sections (CTAs)

Present blueprint as a guided journey:
- "Here's how we guide them from stranger to customer..."
- "Section 1 does X because they need Y at this point..."
- "The journey builds momentum by..."
- "Progressive revelation: we only show Z after they've..."

Create complete architecture with 3-7 sentence descriptions per section.

**MANDATORY: Include Architecture Summary Table with Word Counts**

Every blueprint MUST include a summary table showing:
| # | Section | Purpose | Word Count | Justification |

Plus totals:
- Total word count range
- Estimated reading time
- Word count principles applied (why these numbers based on matrix)
</action>

<template-output>architecture_blueprint</template-output>
</step>

<step n="7" goal="Two-layer validation and refinement">
<action>Run internal agent validation first:

**Layer 1: Internal Agent Review**

Simulate the 4 agents reviewing the blueprint:

**The Whisperer checks:**
- "Does this resonate with the persona psychology?"
- "Are fears addressed at the right moments?"
- "Will they see themselves in this journey?"

**Conversion Strategist checks:**
- "Does this respect all 7 principles?"
- "Is the 5-step sequence properly implemented?"
- "Does section count match matrix position?"
- "Are word counts appropriate for price tier and CTA type?"

**Agent Cipher checks:**
- "Does this differentiate from competitors?"
- "Are niche best practices incorporated?"
- "Is positioning strategy clear?"

**Director Arc checks:**
- "Does the narrative flow cohesively?"
- "Is progressive revelation respected?"
- "Does momentum build appropriately?"

If any agent identifies issues, refine the blueprint before presenting to user.
</action>

<action>Invoke validation framework task:
- Execute: {project-root}/bmad/lp-architect/tasks/validation-framework.xml
- Input: architecture_blueprint, business_context, matrix_analysis
- Output: validation_results, flagged_issues
</action>

<action>Present blueprint to {user_name} for Layer 2 validation:

**Layer 2: User Confirmation Checkpoints**

Present 2-3 strategic validation questions:

1. "This architecture leads with [approach] because [reason]. Does this feel right for your audience?"

2. "We've placed [section type] in position X because [persona insight]. Does this match what you know about your customers?"

3. "The differentiation strategy focuses on [gap]. Does this align with your competitive positioning?"

If user identifies misalignments:
- Discuss the concern
- Understand the context they have that we're missing
- Refine the blueprint accordingly
- Re-validate with internal agents

Iterate until user confirms the architecture resonates.
</action>

<template-output>validation_results</template-output>
</step>

<step n="8" goal="Generate final deliverable">
<action>Compile the complete architecture blueprint document:

**Document Structure:**
1. Executive summary
2. Business context overview
3. 3D matrix analysis
4. Competitive intelligence summary
5. Persona psychology insights
6. Strategic principles application
7. Complete section-by-section architecture with rationale
8. Implementation guidance
9. Success metrics and benchmarks

Ensure every section includes the "why" - strategic rationale backed by research, psychology, and conversion principles.

Make it educational - {user_name} should understand conversion science better after reading this.

Write in professional {communication_language}.
</action>

<action>Save the complete blueprint to: {default_output_file}</action>

<action>Present completion summary to {user_name}:

"Your landing page architecture blueprint is complete!

**What you received:**
- Research-backed architecture tailored to [their niche]
- [X] sections optimized for [awareness level] + [price tier] + [complexity]
- **Word count guidance: [X,XXX - X,XXX words] total with per-section breakdown**
- Strategic rationale for every decision
- Competitive differentiation strategy
- Persona-matched messaging angles

**Next steps:**
- Review the blueprint at: [file path]
- Share with your designer/developer team
- Use as strategic guide during page creation
- Reference the 'why' sections to maintain conversion focus

**Your architecture is designed to convert at [benchmark range]% based on [niche] industry standards.**

Thank you for using Landing Page Architect!"
</action>

<template-output>completion_message</template-output>
</step>

</workflow>
