# Generate Institutional Architecture - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/institutional-architect/workflows/generate-institutional-architecture/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the architecture generation process</critical>

<workflow>

<step n="1" goal="Gather organizational context and inputs">
<action>Welcome {user_name} and explain the process:

This workflow will generate a research-backed institutional page architecture blueprint tailored to your organization using our 6-agent expert team:
- **Trust Director** 🎬 (orchestration and synthesis)
- **Trust Guardian** 🛡️ (credibility science validation)
- **Sector Cipher** 🔍 (sector intelligence)
- **The Audience Oracle** 👁️ (stakeholder psychology)
- **Narrative Architect** 📐 (trust journey design)
- **Content Compass** 🧭 (content strategy - for blog/article pages)

The process takes 25-50 minutes depending on complexity.

**Key Difference from Landing Pages:**
This is about building TRUST, not driving conversions. We use Stanford Credibility Guidelines and trust science, not urgency or sales tactics.
</action>

<action>Gather organizational context through guided conversation, adapting depth based on user responses:

**Essential Information Needed:**

1. **Organization Type**
   - B2B / B2C / Nonprofit / Government / Hybrid?
   - What industry/sector?
   - What do you do in simple terms?
   - Any unique positioning or approach?

2. **Maturity Stage**
   - Startup (new, building credibility from scratch)
   - Growth (established but scaling)
   - Established (recognized player, strong track record)
   - Enterprise (large, multiple stakeholders)
   - Heritage (legacy organization, long history)

3. **Target Page Type**
   - Homepage (hub + first impression)
   - About Us
   - Contact
   - Team/People
   - Mission/Values
   - Careers
   - FAQ
   - Client Logos/Partners
   - Blog/Article (content page)

4. **Primary Stakeholders**
   - Who are the key audiences for this page?
   - What do they need to believe/feel/understand?
   - Any conflicting stakeholder needs?

5. **Trust Requirements**
   - Low (general consumer, known brand)
   - Medium (considered purchases, unknown brand)
   - High (high-stakes decisions, complex offerings)
   - Regulated (compliance requirements, mandatory disclosures)

6. **Current Credibility Assets**
   - What proof do you have? (certifications, awards, testimonials)
   - What's your team like? (credentials, experience, photos)
   - What makes you credible in your sector?
   - Any credibility gaps you're aware of?

7. **Brand Positioning Style** (critical for tone and approach)
   - Established/Traditional (trusted, professional, institutional)
   - Challenger/Disruptor (irreverent, provocative, anti-establishment)
   - Innovator (cutting-edge, thought leader, forward-thinking)
   - Community/Purpose-driven (mission-focused, values-led)
   - If challenger: What are you challenging? Who/what is the "enemy"?

8. **Traffic & Device Context**
   - Primary traffic source? (organic, paid, referral, direct)
   - Mobile vs desktop split? (60%+ of B2B searches start on mobile)
   - Where do visitors come from before landing on this page?

9. **5-Second Clarity Test** (critical for homepage)
   - What ONE thing must visitors understand in 5 seconds?
   - If they leave after 5 seconds, what should they remember?
   - What's the single most important action you want them to take?

10. **Competitive Differentiation**
    - What makes you genuinely different from competitors?
    - What do competitors all say that you should AVOID saying?
    - Any claims you can make that competitors cannot?

**HOMEPAGE-SPECIFIC QUESTIONS** (if page type is homepage):
- What trust signals can appear ABOVE THE FOLD? (logos, numbers, badges)
- Do you have specific ROI/results numbers to feature prominently?
- What's your single primary CTA? (only one in hero section)
- Any secondary pathways needed for different stakeholder types?

Adapt your questioning style:
- Small organizations: More educational, help them think through credibility
- Large organizations: Focus on stakeholder complexity and governance
- Nonprofits: Emphasize impact metrics and transparency
- B2B: Focus on expertise and results proof
</action>

<template-output>organizational_context</template-output>
</step>

<step n="2" goal="Determine 3D Trust Matrix position">
<action>Analyze the organizational context to determine their position on the 3D Trust Matrix:

**Dimension 1: Organization Type**
Based on their organization, determine category:
- B2B (expertise + capability + results focus)
- B2C (relatability + values + accessibility focus)
- Nonprofit (impact + transparency + mission focus)
- Government (compliance + service + accountability focus)
- Hybrid (segmented trust signals for multiple audiences)

**Dimension 2: Maturity Stage**
- Startup (focus on vision, founder, early wins)
- Growth (focus on traction, team expansion, customer success)
- Established (focus on track record, innovation, market position)
- Enterprise (focus on governance, stability, scale)
- Heritage (focus on legacy, evolution, modern relevance)

**Dimension 3: Trust Requirements**
- Low: Known brand, simple decision
- Medium: Considered decision, need for proof
- High: High-stakes decision, extensive verification needed
- Regulated: Mandatory disclosures, compliance requirements

Explain to the user their matrix position and what it means for architecture.
</action>

<action>Invoke the trust matrix calculator task to determine architecture requirements:
- Execute: {project-root}/bmad/institutional-architect/tasks/trust-matrix-calculator.xml
- Input: organization_type, maturity_stage, trust_requirements, page_type
- Output: page_tier, section_count_range, required_sections, trust_signal_emphasis, sequence_principles, stanford_priorities

CRITICAL: Section type determination is MANDATORY. Every blueprint MUST include:
- Required section types for this matrix position
- Trust signal emphasis areas
- Stanford guideline priorities
</action>

<template-output>matrix_analysis</template-output>
</step>

<step n="3" goal="PARALLEL SPECIALIST EXECUTION - 5 agents analyze simultaneously">
<action>This step spawns 5 specialist agents IN PARALLEL using a single message with multiple Task calls:

CRITICAL: All 5 specialists MUST be spawned in ONE message to achieve true parallelism.

Each specialist receives the same context (organizational_context + matrix_analysis) but produces different specialized outputs.

**Parallel Spawn Configuration:**

```
Task 1: Trust Guardian
- Role: Credibility science analysis
- Mission: Validate approach against Stanford guidelines, recommend trust signal strategy
- Output: stanford_validation, trust_signal_recommendations

Task 2: Sector Cipher
- Role: Sector intelligence briefing
- Mission: Research sector credibility patterns, identify differentiation opportunities
- Protocol: {project-root}/bmad/institutional-architect/tasks/sector-research-protocol.xml
- Output: sector_patterns, differentiation_opportunities, benchmarks

Task 3: The Audience Oracle
- Role: Stakeholder psychology mapping
- Mission: Map stakeholder needs, identify conflicts, prioritize trust signals by audience
- Output: stakeholder_map, conflict_resolution, audience_priorities

Task 4: Narrative Architect
- Role: Trust journey design
- Mission: Design the credibility arc, determine section sequence, plan progressive revelation
- Output: trust_journey, section_sequence, narrative_flow

Task 5: Content Compass (if page_type is blog/article)
- Role: Content strategy
- Mission: Blog/article architecture, SEO structure, content hierarchy
- Output: content_structure, seo_strategy, ecosystem_connection
```

Wait for all specialists to complete before proceeding.
</action>

<template-output>specialist_outputs</template-output>
</step>

<step n="4" goal="Trust Director - Synthesize specialist outputs">
<action>Activate Trust Director persona and synthesize all specialist findings:

**Synthesis Mission:**
"I'm the Trust Director. Let me orchestrate these insights into a unified credibility blueprint..."

**Integration Process:**
1. Review all specialist outputs for alignment and conflicts
2. Identify where specialists agree (high confidence areas)
3. Resolve any conflicting recommendations
4. Prioritize insights based on matrix position
5. Map Stanford guidelines to specific sections
6. Create synthesis summary

**Cross-Check Questions:**
- Does Trust Guardian's credibility science align with Sector Cipher's patterns?
- Does The Audience Oracle's stakeholder map match Narrative Architect's journey?
- Are differentiation opportunities reflected in the trust signal strategy?
- If blog page: Does Content Compass's strategy support overall credibility goals?

**Synthesis Output:**
- Unified trust signal strategy
- Resolved stakeholder priorities
- Agreed section types and sequence
- Stanford guideline integration plan
- Key differentiation approach
</action>

<template-output>synthesis_summary</template-output>
</step>

<step n="5" goal="Trust Director + Narrative Architect - Build unified blueprint">
<action>With Narrative Architect's guidance, create the complete architecture blueprint:

**Blueprint Mission:**
"Let me design the trust journey that transforms strangers into believers..."

**Design Process:**
1. Take synthesized inputs from all sources:
   - Matrix analysis (structure requirements)
   - Trust Guardian (credibility science)
   - Sector Cipher (sector intelligence)
   - The Audience Oracle (stakeholder psychology)
   - Narrative Architect (trust journey)
   - Content Compass (content strategy, if applicable)

2. Design the trust journey arc:
   - How does credibility build progressively?
   - What's the logical revelation sequence?
   - Where does trust momentum build?
   - How do different stakeholders find their paths?

3. Create section-by-section blueprint:
   - Section name and position (#1, #2, etc.)
   - Purpose and goal of each section
   - Trust signals to include
   - Stanford guidelines this section addresses
   - Stakeholder(s) this section primarily serves
   - Why this section appears here (credibility rationale)
   - Connection to previous and next sections
   - Key content elements and messaging approach

4. Define section types based on matrix:
   - Identity sections (who we are)
   - Mission sections (why we exist)
   - Proof sections (evidence and validation)
   - Team sections (people and expertise)
   - Transparency sections (openness and accessibility)
   - Action sections (contact, engagement)

Present blueprint as a guided trust journey:
- "Here's how we build credibility from first impression to deep trust..."
- "Section 1 establishes X because visitors need Y at this point..."
- "Progressive revelation: we only show Z after they understand..."

Create complete architecture with 3-7 sentence descriptions per section.

**MANDATORY: Include Architecture Summary Table**

Every blueprint MUST include a summary table showing:
| # | Section | Purpose | Primary Stakeholder | Trust Signals | Stanford Guidelines |

Plus summary:
- Total section count with rationale
- Trust signal density assessment
- Stakeholder pathway clarity
</action>

<template-output>architecture_blueprint</template-output>
</step>

<step n="6" goal="Two-layer validation using credibility framework">
<action>Invoke the credibility validation framework:
- Execute: {project-root}/bmad/institutional-architect/tasks/credibility-validation-framework.xml
- Input: architecture_blueprint, organizational_context, matrix_analysis, stakeholder_analysis, sector_research
- Output: validation_results, layer_1_feedback, layer_2_confirmations, flagged_issues, recommendations, final_status

**HOMEPAGE ONLY: 5-Second Test Protocol**

If page_type is Homepage, run the 7-exercise validation protocol BEFORE Layer 1:

1. **Competitor Test**: "Could ANY competitor say this headline?" → Must be NO
2. **Word Count**: Headline 6-10 words → Pass/Fail
3. **Outcome Focus**: Headline about THEIR outcome, not what you do → Pass/Fail
4. **Trust Signal Inventory**: 3-4 signals visible above fold → Count and validate
5. **CTA Clarity**: Only 1 CTA in hero → Pass/Fail
6. **Stranger Test**: 5-second test with unfamiliar person → Clear response required
7. **Mobile Check**: Headline, CTA, trust signals visible on 375px viewport → All must pass

**Minimum score to proceed: 6/7**
If score below 6/7, revise above-fold before continuing to Layer 1.

**Layer 1: Internal Agent Review**

Simulate each specialist reviewing the blueprint:

**The Audience Oracle checks:**
- "Does this architecture serve all primary stakeholders?"
- "Are stakeholder conflicts appropriately resolved?"
- "Will each key audience find what they need?"

**Trust Guardian checks:**
- "Are Stanford guidelines appropriately addressed?"
- "Is trust signal density appropriate for trust level?"
- "Is credibility built progressively?"

**Sector Cipher checks:**
- "Does this match sector credibility expectations?"
- "Are differentiation opportunities leveraged?"
- "Will this stand out on credibility in the sector?"

**Narrative Architect checks:**
- "Does the narrative flow create cohesive trust journey?"
- "Is progressive revelation respected?"
- "Does each section build on previous sections?"

**Content Compass checks (if blog/article):**
- "Does content hierarchy serve both users and SEO?"
- "Is page connected to broader content ecosystem?"

If any agent identifies critical issues, refine the blueprint before presenting to user.
</action>

<action>If Layer 1 passes, proceed to Layer 2 - User Confirmation:

**Layer 2: User Confirmation Checkpoints**

Present 3 strategic validation questions to {user_name}:

**Checkpoint 1 - Strategic Approach:**
"This architecture leads with [APPROACH] because [STRATEGIC REASON based on matrix/stakeholders/research].

Does this feel right for how you want your organization perceived?"

Listen for:
- Green: Enthusiastic agreement
- Yellow: Hesitation ("maybe...")
- Red: Strong disagreement

**Checkpoint 2 - Stakeholder Priority:**
"We've prioritized [PRIMARY STAKEHOLDER] for this page because [RATIONALE].

Does this match your audience priority for this page?"

Listen for alignment or misalignment signals.

**Checkpoint 3 - Trust Signal Strategy:**
"The trust-building strategy emphasizes [SIGNALS] because [SECTOR RESEARCH and MATRIX POSITION].

Does this align with your credibility assets and positioning goals?"

Listen for confirmation or concerns.

If user identifies misalignments:
- Discuss the concern
- Understand context they have that we're missing
- Refine the blueprint accordingly
- Re-run Layer 1 validation on changes
- Iterate until user confirms
</action>

<template-output>validation_results</template-output>
</step>

<step n="7" goal="Finalize and confirm with user">
<action>Present the validated blueprint to {user_name} for final confirmation:

**Blueprint Summary:**
- [X] sections designed for [organization type] + [maturity stage] + [trust level]
- Primary stakeholder focus: [stakeholder]
- Lead trust signals: [signals]
- Stanford guidelines addressed: [list]
- Key differentiator: [what makes this stand out]

**Ask for final confirmation:**
"Does this institutional page architecture feel right for [organization name]? Any final adjustments before I compile the complete blueprint?"

Address any final tweaks requested.
</action>

<template-output>final_confirmation</template-output>
</step>

<step n="8" goal="Generate final deliverable">
<action>Compile the complete institutional architecture blueprint document:

**Document Structure:**
1. Executive summary
2. Organizational context overview
3. 3D Trust Matrix analysis
4. Stakeholder mapping summary
5. Sector credibility intelligence
6. Stanford guidelines application
7. Trust journey narrative
8. Complete section-by-section architecture with rationale
9. Implementation guidance
10. Credibility success metrics

Ensure every section includes the "why" - credibility rationale backed by research, stakeholder psychology, and trust science.

Make it educational - {user_name} should understand credibility science better after reading this.

Write in professional {communication_language}.
</action>

<action>Save the complete blueprint to: {default_output_file}</action>

<action>Present completion summary to {user_name}:

"Your institutional page architecture blueprint is complete!

**What you received:**
- Research-backed architecture tailored to [their organization type]
- [X] sections optimized for [trust level] credibility requirements
- Stanford Web Credibility Guidelines integration
- Stakeholder-focused design for [primary audiences]
- Sector-differentiated trust signal strategy

**Key credibility elements:**
- Lead section: [what you lead with and why]
- Trust signals: [key signals emphasized]
- Stakeholder pathways: [how different audiences are served]
- Differentiator: [what sets this apart from sector norms]

**Next steps:**
- Review the blueprint at: [file path]
- Share with your design/content team
- Use as strategic guide during page creation
- Reference the 'why' sections to maintain credibility focus

**Your architecture is designed to build trust effectively based on [sector] best practices and Stanford credibility science.**

Thank you for using Institutional Page Architect!"
</action>

<template-output>completion_message</template-output>
</step>

</workflow>
