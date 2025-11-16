# Create Customer Personas - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/persona-forge/workflows/create-personas/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the persona creation process</critical>

<workflow>

<step n="1" goal="Setup and context gathering">
<action>Welcome {user_name} to the Persona Forge persona creation workflow</action>

<action>Explain the process:
This workflow will guide you through creating research-validated customer personas using a three-agent system:

1. **Persona Strategist** - Creates comprehensive initial persona drafts based on your business context
2. **Market Intelligence Analyst** - Validates with real market research and competitive intelligence
3. **Senior Persona Specialist** - Ensures quality standards and actionability

The process is collaborative and iterative. You'll review work at key checkpoints, and if the final quality check doesn't pass, we'll refine until it meets standards (max 3 correction cycles).
</action>

<ask>Are you ready to begin? [y/n]</ask>

<check if="user not ready">
  <action>Ask what questions they have and address concerns</action>
</check>

<action>Set workflow state: current_cycle = 0</action>
</step>

<step n="2" goal="Gather business context and customer insights">
<action>Explain: "I need to understand your business context and what you already know about your customers. This will help the Persona Strategist create grounded, realistic personas."</action>

<ask response="business_description">Tell me about your business - what do you offer, who do you serve, and what problem do you solve?</ask>

<ask response="target_market">Who is your target market? (Industries, demographics, company sizes, etc.)</ask>

<ask response="existing_customer_data">What do you already know about your customers? (Surveys, conversations, CRM data, analytics, observations)</ask>

<ask response="pain_points">What problems or frustrations do your customers face?</ask>

<ask response="goals_aspirations">What are they trying to achieve? What do they want?</ask>

<ask response="awareness_context">How do customers typically discover and evaluate solutions in your space? What's the typical journey?</ask>

<ask response="decision_factors">What influences their buying decisions? What makes them choose one solution over another?</ask>

<ask response="objections">What makes them hesitate or resist buying? What objections do you hear?</ask>

<action>Store all responses as context for Persona Strategist</action>

<template-output>business_context</template-output>
</step>

<step n="2b" goal="Determine persona count and differentiators">
<ask>How many distinct customer personas would you like to create? (1-3 recommended)

**Examples:**
- **1 Persona:** Single target market (e.g., mid-market SaaS companies)
- **2 Personas:** Two distinct segments (e.g., enterprise vs. SMB, or B2B vs. B2C)
- **3 Personas:** Multiple segments (e.g., different age groups, income levels, industries)

Enter number: [1/2/3]
</ask>

<action>Store persona_count</action>

<check if="persona_count > 1">
  <ask>What differentiates these {{persona_count}} personas from each other?

  Think about:
  - **Demographics:** Different age groups, income levels, industries, company sizes?
  - **Psychographics:** Different values, lifestyles, priorities?
  - **Use Cases:** Different problems they're solving or goals they're pursuing?
  - **Buying Patterns:** Different decision processes or objections?

  Describe the key differences:
  </ask>

  <action>Store persona_differentiators</action>

  <ask>For each persona, give me a working name or label (we'll develop full names later):

  Persona 1: [e.g., "Enterprise Decision Maker" or "Budget-Conscious Startup"]
  <check if="persona_count >= 2">Persona 2: [label]</check>
  <check if="persona_count >= 3">Persona 3: [label]</check>
  </ask>

  <action>Store persona_labels</action>
</check>

<check if="persona_count == 1">
  <action>Note: Creating single comprehensive persona</action>
</check>

<template-output>persona_count, persona_differentiators, persona_labels</template-output>
</step>

<step n="3" goal="Persona Strategist creates initial draft(s)">
<action>Transition to Persona Strategist</action>

<check if="persona_count == 1">
  <action>Explain: "Now I'm invoking the Persona Strategist to create your initial persona draft. This will take 15-25 minutes as they work through all sections systematically."</action>
</check>

<check if="persona_count > 1">
  <action>Explain: "Now I'm invoking the Persona Strategist to create {{persona_count}} distinct persona drafts. This will take 25-40 minutes as they develop each persona with all its unique characteristics."</action>
</check>

<action>Load Persona Strategist agent context: {persona_strategist}</action>

<action>Pass all gathered context to Persona Strategist:
- Business description
- Target market
- Existing customer data
- Pain points
- Goals and aspirations
- Awareness context
- Decision factors
- Objections
- Persona count
- Persona differentiators (if multiple)
- Persona labels (if multiple)
</action>

<check if="persona_count == 1">
  <action>Persona Strategist executes:
  1. Conducts guided strategic interview (may ask clarifying questions)
  2. Synthesizes inputs into comprehensive persona
  3. Applies hybrid evolution model across 5 awareness levels
  4. Populates Quick Reference, Core Profile, Awareness Journey, Basic Practical Tools
  5. Self-validates completeness
  6. Explains rationale for key decisions
  </action>

  <action>Persona Strategist generates initial draft persona document using {persona_template}</action>
</check>

<check if="persona_count > 1">
  <action>Persona Strategist executes for EACH persona:
  1. Develops distinct characteristics based on differentiators provided
  2. Conducts guided strategic interview (may ask clarifying questions per persona)
  3. Synthesizes inputs into {{persona_count}} comprehensive personas
  4. Applies hybrid evolution model across 5 awareness levels for each
  5. Ensures personas are distinct yet consistent with business context
  6. Populates all sections for each persona
  7. Self-validates completeness of all personas
  8. Explains rationale for how personas differ
  </action>

  <action>Persona Strategist generates {{persona_count}} initial draft persona documents using {persona_template}</action>
</check>

<template-output>strategist_draft_persona(s)</template-output>
</step>

<step n="4" goal="User reviews Persona Strategist's draft">

<check if="persona_count == 1">
  <action>Present the draft persona to {user_name}</action>

  <action>Show:
  - Quick Reference section
  - Key highlights from Core Profile
  - Overview of Awareness Journey structure
  - Strategist's rationale for key decisions
  </action>

  <ask>The Persona Strategist has created an initial draft. Would you like to:
  1. **Review the full draft** [review]
  2. **Provide feedback or corrections** [feedback]
  3. **Proceed to research validation** [continue]
  </ask>
</check>

<check if="persona_count > 1">
  <action>Present all draft personas to {user_name}</action>

  <action>For each persona, show:
  - Persona label/working name
  - Quick Reference section
  - Key highlights from Core Profile
  - How this persona differs from others
  </action>

  <action>Display Strategist's rationale for how personas differ and key decisions made</action>

  <ask>The Persona Strategist has created {{persona_count}} initial drafts. Would you like to:
  1. **Review all drafts in detail** [review-all]
  2. **Review specific persona(s)** [review-specific]
  3. **Provide feedback or corrections** [feedback]
  4. **Proceed to research validation** [continue]
  </ask>

  <check if="review-specific">
    <ask>Which persona(s) would you like to review? [provide persona labels]</ask>
    <action>Display requested persona(s) in full</action>
  </check>
</check>

<check if="review or review-all">
  <action>Display full draft persona document(s)</action>
  <ask>Any feedback or changes needed? [provide feedback or say "continue"]</ask>
</check>

<check if="feedback">
  <action>Collect user feedback (specify which persona if multiple)</action>
  <action>Persona Strategist incorporates feedback into draft(s)</action>
  <action>Show updated sections</action>
  <ask>Ready to proceed to research validation? [y/n]</ask>
</check>

<check if="continue">
  <action>Proceed to next step</action>
</check>

<template-output>user_feedback_on_draft</template-output>
</step>

<step n="5" goal="Market Intelligence Analyst validates and enhances">
<action>Transition to Market Intelligence Analyst</action>

<check if="persona_count == 1">
  <action>Explain: "Now the Market Intelligence Analyst will conduct online research to validate assumptions and enhance the persona with real market data. This takes 10-15 minutes."</action>
</check>

<check if="persona_count > 1">
  <action>Explain: "Now the Market Intelligence Analyst will conduct online research to validate assumptions and enhance all {{persona_count}} personas with real market data. This takes 15-30 minutes depending on research depth needed."</action>
</check>

<action>Load Market Intelligence Analyst agent context: {market_intelligence_analyst}</action>

<check if="persona_count == 1">
  <action>Pass draft persona to Analyst</action>

  <action>Market Intelligence Analyst executes:
  1. Identifies research priorities from draft
  2. Conducts targeted online market research
  3. Validates demographics, psychographics, pain points, behaviors
  4. Finds real customer language patterns and quotes
  5. Directly flags contradictions between draft and research
  6. Integrates findings seamlessly into persona document
  7. Cites sources for key claims
  8. Notes confidence levels
  9. Provides competitive intelligence insights
  </action>

  <action>Analyst generates research-enhanced persona document</action>

  <action>Analyst summarizes findings:
  - What was validated
  - What was enhanced
  - Any contradictions found
  - Confidence levels by section
  - Competitive intelligence insights
  </action>
</check>

<check if="persona_count > 1">
  <action>Pass all draft personas to Analyst</action>

  <action>Market Intelligence Analyst executes for EACH persona:
  1. Identifies research priorities from each draft
  2. Conducts targeted online market research for each persona's market segment
  3. Validates demographics, psychographics, pain points, behaviors for each
  4. Finds real customer language patterns and quotes specific to each segment
  5. Directly flags contradictions between drafts and research
  6. Ensures persona differentiation is validated by market data
  7. Integrates findings seamlessly into each persona document
  8. Cites sources for key claims
  9. Notes confidence levels for each persona
  10. Provides competitive intelligence insights across all segments
  </action>

  <action>Analyst generates {{persona_count}} research-enhanced persona documents</action>

  <action>Analyst summarizes findings for each persona:
  - Persona label and target segment
  - What was validated
  - What was enhanced
  - Any contradictions found
  - Confidence levels by section
  - How personas remain distinct after research validation
  - Competitive intelligence insights per segment
  </action>
</check>

<template-output>analyst_enhanced_persona(s)</template-output>
</step>

<step n="6" goal="User reviews research-enhanced persona">

<check if="persona_count == 1">
  <action>Present the research-enhanced persona to {user_name}</action>

  <action>Show:
  - Summary of research findings
  - Contradictions flagged (if any)
  - Enhanced sections
  - Confidence levels
  - Sources cited
  </action>

  <ask>The Market Intelligence Analyst has validated and enhanced the persona with research. Would you like to:
  1. **Review the enhanced version** [review]
  2. **Ask about specific findings** [questions]
  3. **Proceed to quality validation** [continue]
  </ask>
</check>

<check if="persona_count > 1">
  <action>Present all research-enhanced personas to {user_name}</action>

  <action>For each persona, show summary:
  - Persona label and target segment
  - Key research findings
  - Contradictions flagged (if any)
  - Major enhancements made
  - Confidence levels
  - Top sources cited
  </action>

  <action>Show cross-persona insights:
  - How research confirmed or adjusted persona differentiation
  - Market validation of segment distinctions
  - Competitive positioning across segments
  </action>

  <ask>The Market Intelligence Analyst has validated and enhanced all {{persona_count}} personas with research. Would you like to:
  1. **Review all enhanced versions** [review-all]
  2. **Review specific persona(s)** [review-specific]
  3. **Ask about specific findings** [questions]
  4. **Proceed to quality validation** [continue]
  </ask>

  <check if="review-specific">
    <ask>Which persona(s) would you like to review? [provide persona labels]</ask>
  </check>
</check>

<check if="review or review-all or review-specific">
  <action>Display full research-enhanced persona document(s)</action>
  <action>Highlight sections that were significantly changed by research</action>
  <ask>Any concerns or questions? [provide feedback or say "continue"]</ask>
</check>

<check if="questions">
  <action>Answer user questions about research findings (specify which persona if multiple)</action>
  <ask>Ready to proceed to quality validation? [y/n]</ask>
</check>

<check if="continue">
  <action>Proceed to next step</action>
</check>

<template-output>user_review_of_research</template-output>
</step>

<step n="7" goal="Senior Persona Specialist validates quality">
<action>Transition to Senior Persona Specialist</action>

<check if="persona_count == 1">
  <action>Explain: "Now the Senior Persona Specialist will conduct final quality validation. They ensure the persona meets industry standards, is actionable for your go-to-market team, and has all critical information properly integrated. This takes 5-10 minutes."</action>
</check>

<check if="persona_count > 1">
  <action>Explain: "Now the Senior Persona Specialist will conduct final quality validation on all {{persona_count}} personas. They ensure each persona meets industry standards, is actionable for your go-to-market team, has all critical information properly integrated, and the set provides clear differentiation. This takes 10-20 minutes."</action>
</check>

<action>Load Senior Persona Specialist agent context: {senior_persona_specialist}</action>

<check if="persona_count == 1">
  <action>Pass research-enhanced persona to Specialist</action>

  <action>Senior Persona Specialist executes:
  1. Runs comprehensive quality validation checklist
  2. Assesses actionability for go-to-market teams
  3. Checks industry best practices compliance
  4. Verifies research integration quality
  5. Identifies gaps, weaknesses, or unresolved contradictions
  6. Makes DECISION: Approve OR Reject with specific feedback
  </action>
</check>

<check if="persona_count > 1">
  <action>Pass all research-enhanced personas to Specialist</action>

  <action>Senior Persona Specialist executes:
  1. Runs comprehensive quality validation checklist on EACH persona
  2. Assesses actionability for go-to-market teams for each
  3. Checks industry best practices compliance for each
  4. Verifies research integration quality for each
  5. Validates persona set coherence (do they work together as a system?)
  6. Ensures clear differentiation between personas
  7. Checks that qualification questions can effectively distinguish between them
  8. Identifies gaps, weaknesses, or unresolved contradictions in any persona
  9. Makes DECISION for each persona: Approve OR Reject with specific feedback
  10. Makes OVERALL DECISION: All Approved OR Some/All Need Corrections
  </action>

  <action>Specialist provides detailed feedback:
  - Status for each persona (approved/rejected)
  - Strengths of the persona set as a whole
  - Issues requiring correction (persona-specific)
  - Cross-persona concerns (overlap, unclear differentiation, etc.)
  </action>
</check>

<action>Increment current_cycle by 1</action>

<template-output>specialist_decision</template-output>
</step>

<step n="8" goal="Handle Specialist decision - Approval or Rejection">

<check if="persona_count == 1">
  <check if="specialist_decision == 'APPROVED'">
    <action>Celebrate approval</action>
    <action>Display Specialist's approval message with strengths identified</action>
    <action>Proceed to Step 9 (Generate final documents)</action>
  </check>

  <check if="specialist_decision == 'REJECTED'">
    <action>Display rejection feedback with specific issues and required actions</action>

    <action>Check current_cycle count:</action>

    <check if="current_cycle <= max_correction_cycles">
      <action>Explain: "The Specialist has identified specific issues that need correction. We'll route this back to the appropriate agent to address the feedback."</action>

      <action>Determine routing based on rejection reason:
      - Missing critical info or content gaps → Route to Persona Strategist (Step 3)
      - Research contradictions not resolved → Route to Market Intelligence Analyst (Step 5)
      - Multiple issues → Route to primary issue agent first
      </action>

      <ask>The Specialist provided specific feedback. Ready to proceed with corrections? [y/n]</ask>

      <check if="yes">
        <action>Route back to appropriate step based on routing logic</action>
        <goto step="{{routed_step_number}}">Apply corrections</goto>
      </check>

      <check if="no">
        <ask>Would you like to:
        1. Review the feedback more carefully [review]
        2. Discuss concerns with me [discuss]
        3. Proceed with corrections anyway [proceed]
        4. Stop and save progress [stop]
        </ask>

        <check if="stop">
          <action>Save current persona state</action>
          <action>Provide instructions for resuming later</action>
          <action>End workflow</action>
        </check>
      </check>
    </check>

    <check if="current_cycle > max_correction_cycles">
      <action>Escalate to user</action>
      <action>Explain: "We've reached the maximum correction cycles (3). At this point, we need your input on how to proceed."</action>

      <ask>What would you like to do?
      1. **Accept current version** despite not meeting all standards [accept]
      2. **Have a detailed discussion** about the remaining issues [discuss]
      3. **Start fresh** with new inputs [restart]
      4. **Save and revisit later** [save]
      </ask>

      <check if="accept">
        <action>Warn about accepting below-standard persona</action>
        <ask>Are you sure? This persona may not serve your team as effectively as it could. [confirm/cancel]</ask>
        <check if="confirm">
          <action>Proceed to Step 9 with current version (mark as "Accepted with caveats")</action>
        </check>
      </check>

      <check if="discuss">
        <action>Facilitate discussion between user and Specialist about standards</action>
        <action>Explore which issues are negotiable vs. non-negotiable</action>
        <action>Potentially adjust expectations or make targeted fixes</action>
      </check>

      <check if="restart">
        <action>Reset workflow state</action>
        <goto step="1">Start fresh persona creation</goto>
      </check>

      <check if="save">
        <action>Save current persona state with notes about remaining issues</action>
        <action>Provide instructions for resuming</action>
        <action>End workflow</action>
      </check>
    </check>
  </check>
</check>

<check if="persona_count > 1">
  <check if="specialist_decision == 'ALL_APPROVED'">
    <action>Celebrate approval of all personas</action>
    <action>Display Specialist's approval message with strengths of the persona set identified</action>
    <action>Proceed to Step 9 (Generate final documents for all personas)</action>
  </check>

  <check if="specialist_decision == 'SOME_REJECTED' or specialist_decision == 'ALL_REJECTED'">
    <action>Display detailed feedback:
    - Which personas were approved (if any)
    - Which personas were rejected and why
    - Cross-persona issues (overlap, poor differentiation, etc.)
    - Specific issues and required actions for each rejected persona
    </action>

    <action>Check current_cycle count:</action>

    <check if="current_cycle <= max_correction_cycles">
      <action>Explain: "The Specialist has identified specific issues with some personas that need correction. We'll route the problematic personas back to the appropriate agent."</action>

      <action>For each rejected persona, determine routing based on rejection reason:
      - Missing critical info or content gaps → Route to Persona Strategist (Step 3)
      - Research contradictions not resolved → Route to Market Intelligence Analyst (Step 5)
      - Poor differentiation from other personas → Route to Persona Strategist (Step 3)
      - Multiple issues → Route to primary issue agent first
      </action>

      <action>Present correction plan:
      - Approved personas: {{approved_list}} (ready for final generation)
      - Rejected personas: {{rejected_list}} (need corrections)
      - Routing: {{routing_plan}}
      </action>

      <ask>The Specialist provided specific feedback for {{rejected_count}} persona(s). Ready to proceed with corrections? [y/n]</ask>

      <check if="yes">
        <action>Route rejected personas back to appropriate step based on routing logic</action>
        <action>Approved personas wait for final generation after corrections complete</action>
        <goto step="{{routed_step_number}}">Apply corrections to rejected personas</goto>
      </check>

      <check if="no">
        <ask>Would you like to:
        1. Review the feedback more carefully [review]
        2. Discuss concerns with me [discuss]
        3. Proceed with corrections anyway [proceed]
        4. Accept approved personas and drop rejected ones [accept-partial]
        5. Stop and save progress [stop]
        </ask>

        <check if="accept-partial">
          <action>Warn about proceeding with partial persona set</action>
          <ask>This means you'll only have {{approved_count}} persona(s) instead of {{persona_count}}. Are you sure? [confirm/cancel]</ask>
          <check if="confirm">
            <action>Proceed to Step 9 with only approved personas</action>
          </check>
        </check>

        <check if="stop">
          <action>Save current persona states (both approved and in-progress)</action>
          <action>Provide instructions for resuming later</action>
          <action>End workflow</action>
        </check>
      </check>
    </check>

    <check if="current_cycle > max_correction_cycles">
      <action>Escalate to user</action>
      <action>Explain: "We've reached the maximum correction cycles (3). At this point, we need your input on how to proceed."</action>

      <ask>What would you like to do?
      1. **Accept approved personas only** (drop rejected ones) [accept-partial]
      2. **Accept all personas** despite some not meeting standards [accept-all]
      3. **Have a detailed discussion** about the remaining issues [discuss]
      4. **Start fresh** with new inputs [restart]
      5. **Save and revisit later** [save]
      </ask>

      <check if="accept-partial">
        <action>Confirm proceeding with {{approved_count}} persona(s) only</action>
        <action>Proceed to Step 9 with approved personas</action>
      </check>

      <check if="accept-all">
        <action>Warn about accepting below-standard personas</action>
        <ask>Are you sure? Some personas may not serve your team as effectively as they could. [confirm/cancel]</ask>
        <check if="confirm">
          <action>Proceed to Step 9 with all personas (mark rejected ones as "Accepted with caveats")</action>
        </check>
      </check>

      <check if="discuss">
        <action>Facilitate discussion between user and Specialist about standards</action>
        <action>Explore which issues are negotiable vs. non-negotiable</action>
        <action>Consider adjusting persona count or focus</action>
        <action>Potentially make targeted fixes</action>
      </check>

      <check if="restart">
        <action>Reset workflow state</action>
        <goto step="1">Start fresh persona creation</goto>
      </check>

      <check if="save">
        <action>Save all current persona states with notes about remaining issues</action>
        <action>Provide instructions for resuming</action>
        <action>End workflow</action>
      </check>
    </check>
  </check>
</check>

<template-output>correction_handling</template-output>
</step>

<step n="9" goal="Generate final documents">

<check if="persona_count == 1">
  <action>Congratulate {user_name} on completing the persona creation process</action>

  <action>Explain: "I'm now generating your final deliverables: the complete persona document and a separate qualification questions set."</action>

  <action>Generate final persona document:
  - Apply final formatting and styling
  - Ensure temperature gradient color coding (🔵→🟢→🟡→🟠→🔴)
  - Format customer quote boxes
  - Complete Quick Reference summary
  - Add metadata (version, dates, approval)
  </action>

  <action>Save persona document to: {default_output_file}</action>

  <action>Generate qualification questions document from persona:
  - Extract key differentiators and indicators
  - Structure as scored list optimized for live calls
  - Include persona identification guidance
  - Include awareness level identification guidance
  - Add usage tips and calibration notes
  </action>

  <action>Save qualification questions to: {qualification_output_file}</action>

  <action>Present deliverables to {user_name}:
  - Persona document location
  - Qualification questions location
  - Quick usage guide
  </action>
</check>

<check if="persona_count > 1">
  <action>Congratulate {user_name} on completing the persona creation process for {{persona_count}} personas</action>

  <action>Explain: "I'm now generating your final deliverables: {{persona_count}} complete persona documents and a unified qualification questions guide."</action>

  <action>For EACH persona, generate final persona document:
  - Apply final formatting and styling
  - Ensure temperature gradient color coding (🔵→🟢→🟡→🟠→🔴)
  - Format customer quote boxes
  - Complete Quick Reference summary
  - Add metadata (version, dates, approval)
  - Include note about related personas in set
  </action>

  <action>Save each persona document to: {persona_output_folder}/{persona_name}.md</action>

  <action>Generate unified qualification questions document from all personas:
  - **Phase 1: Persona Identification** - Questions to determine WHICH persona the lead matches
  - Extract key differentiators between personas
  - Create decision tree or scoring matrix
  - **Phase 2: Awareness Level Detection** - Questions to determine awareness level within matched persona
  - Structure as scored list optimized for live calls
  - Include multi-persona identification guidance
  - Include awareness level identification guidance per persona
  - Add usage tips for managing multiple personas in calls
  - Add calibration notes
  </action>

  <action>Save unified qualification questions to: {qualification_output_file}</action>

  <action>Generate persona set summary document:
  - Overview of all {{persona_count}} personas
  - Quick comparison table (key differentiators)
  - When to use each persona
  - Cross-persona insights
  - Team deployment recommendations
  </action>

  <action>Save persona set summary to: {persona_output_folder}/persona-set-summary.md</action>

  <action>Present deliverables to {user_name}:
  - All persona document locations
  - Persona set summary location
  - Unified qualification questions location
  - Quick usage guide for multi-persona deployment
  </action>
</check>

<template-output>final_deliverables</template-output>
</step>

<step n="10" goal="Provide usage guidance and next steps">

<check if="persona_count == 1">
  <action>Congratulate {user_name} on their completed persona intelligence</action>

  <action>Provide Quick Start guide:

  **How to Use Your New Persona:**

  1. **For Team Onboarding:**
     - Share the Quick Reference (page 1) for instant context
     - Have team members read the full persona for deep understanding
     - Use in strategy meetings as shared language

  2. **For Sales Qualification:**
     - Use the qualification questions during initial calls
     - Score responses to identify persona + awareness level
     - Adjust your approach in real-time based on results

  3. **For Marketing Campaigns:**
     - Reference awareness-specific messaging examples
     - Match channel recommendations to your tactics
     - Use emotional triggers and pain points in copy

  4. **For Content Creation:**
     - Reference "In Their Own Words" quotes for authentic language
     - Create content for each awareness level
     - Use red flags to avoid misapplication

  5. **For Ongoing Refinement:**
     - Track qualification accuracy (which leads match this persona?)
     - Feed conversion data back for future updates
     - Review quarterly and update with new market insights
  </action>
</check>

<check if="persona_count > 1">
  <action>Congratulate {user_name} on their completed persona intelligence system</action>

  <action>Provide Quick Start guide for Multi-Persona Deployment:

  **How to Use Your {{persona_count}} Personas:**

  1. **For Team Onboarding:**
     - Start with the Persona Set Summary for overview and comparison
     - Share all Quick References (page 1 of each) for instant context
     - Have team members read full personas for their primary target segments
     - Conduct training session using the unified qualification guide
     - Use in strategy meetings as shared language

  2. **For Sales Qualification:**
     - Use Phase 1 questions to identify WHICH persona the lead matches
     - Once identified, use Phase 2 questions to determine awareness level
     - Adjust your approach based on both persona type AND awareness level
     - Track which personas convert best for targeting optimization

  3. **For Marketing Campaigns:**
     - Segment campaigns by persona type first, then awareness level
     - Create persona-specific landing pages and messaging
     - Use channel recommendations specific to each persona
     - Test messaging variations across personas to refine differentiation

  4. **For Content Creation:**
     - Develop content libraries organized by persona + awareness level
     - Use each persona's "In Their Own Words" quotes for authentic language
     - Create comparison content addressing multiple personas
     - Ensure clear differentiation in messaging between personas

  5. **For Team Specialization (Optional):**
     - Consider assigning team members to specialize in specific personas
     - Develop persona-specific playbooks
     - Share learnings across persona specialists

  6. **For Ongoing Refinement:**
     - Track qualification accuracy for each persona
     - Monitor which personas are most/least common in your pipeline
     - Feed conversion data back monthly for updates
     - Review quarterly and update personas with market insights
     - Consider adjusting persona focus based on performance data
  </action>
</check>

<ask>Would you like to:
1. **Review the final documents** [review]
2. **Get more detailed usage training** [training]
3. **Complete and exit** [exit]
</ask>

<check if="review">
  <check if="persona_count == 1">
    <action>Display final persona document</action>
    <action>Walk through key sections</action>
  </check>
  <check if="persona_count > 1">
    <action>Display persona set summary</action>
    <action>Offer to walk through specific personas</action>
    <ask>Which persona would you like to review in detail? [provide label or "all"]</ask>
  </check>
</check>

<check if="training">
  <action>Provide deeper guidance on specific use cases {user_name} requests</action>
  <check if="persona_count > 1">
    <action>Include multi-persona specific guidance (cross-selling, persona migration, segment analysis)</action>
  </check>
</check>

<check if="exit">
  <action>Final encouragement</action>
  <action>Remind them where documents are saved</action>
  <check if="persona_count == 1">
    <action>Encourage them to share feedback on persona accuracy as they use it</action>
    <action>Remind them they can create additional personas anytime using the create workflow</action>
  </check>
  <check if="persona_count > 1">
    <action>Encourage them to track which personas perform best</action>
    <action>Remind them they can update personas with qualification data using the update workflow</action>
  </check>
</check>

<template-output>completion_message</template-output>
</step>

</workflow>

## Workflow State Management

**Correction Loop Variables:**
- `current_cycle`: Tracks how many rejection/correction iterations have occurred
- `max_correction_cycles`: Set to 3 (from workflow.yaml)
- `routing_target`: Which agent to route corrections to

**Routing Logic:**
- Missing content → Persona Strategist
- Research issues → Market Intelligence Analyst
- Best practices violations → Depends on specific issue

**Escalation:**
- After 3 rejection cycles, escalate to user for decision
- Options: Accept as-is, discuss standards, restart, or save for later

## Agent Invocation Pattern

Each specialist agent is invoked at the appropriate step:
1. Load agent context from file path
2. Pass relevant inputs/data
3. Agent executes capabilities
4. Agent produces output
5. Output becomes input for next agent or user review

## Error Handling

- If agent fails to complete → Retry once, then escalate to user
- If research timeout → Continue with partial results, note low confidence
- If user abandons mid-workflow → Save state for resume
- If correction loop doesn't converge → Escalate after 3 cycles

