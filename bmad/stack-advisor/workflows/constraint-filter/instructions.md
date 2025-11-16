# Constraint Filter - Interactive Technology Filtering

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/stack-advisor/workflows/constraint-filter/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the filtering process</critical>

<workflow>

<step n="1" goal="Load context and understand constraints">
<action>Welcome {user_name} to the constraint filtering session</action>

<action>Explain the purpose of this workflow:
"This session helps eliminate technology options that won't work for your project based on hard constraints. By filtering early, we focus research on viable choices only. This is a collaborative discovery process - we'll explore your constraints together and systematically narrow the options."
</action>

<action>Check if intake session results are available at {session_notes_file} or {output_folder}/stack-advisor/intake-session-*.md</action>

<action if="intake results found">Load and review intake results to understand:
- Business requirements and goals
- Current tech stack (if applicable)
- Scale expectations
- Known constraints (team, budget, timeline, technical)
</action>

<action if="no intake results">Explain that this works best after smart-intake, but you can proceed with manual constraint gathering</action>

<action>Ask user if they want to:
1. Use intake results as starting point (if available)
2. Manually define constraints now
3. Skip context and proceed with filtering
</action>
</step>

<step n="2" goal="Identify and document hard constraints">
<action>Guide {user_name} to identify HARD constraints - things that absolutely cannot be changed or violated. These are different from preferences.</action>

<action>Explore each constraint category systematically:

**Team Constraints:**
- What programming languages does your team already know?
- Are there languages or frameworks they explicitly cannot or will not use?
- What's the team's experience level (junior, mid, senior)?
- How many developers will work on this?

**Existing Technology Constraints:**
- What systems must the new tech integrate with?
- Are there existing databases, APIs, or services that constrain choices?
- Any existing infrastructure that must be used?
- Legacy systems that need compatibility?

**Budget Constraints:**
- Are there licensing or commercial restrictions? (open-source only, etc.)
- Hosting cost limitations?
- Third-party service budget limits?

**Timeline Constraints:**
- How soon does this need to be production-ready?
- Are there deadlines that rule out learning curves?
- Maintenance and support timeline considerations?

**Technical Requirements:**
- Performance requirements that eliminate certain options?
- Security/compliance requirements (GDPR, HIPAA, etc.)?
- Deployment environment constraints (cloud provider, on-prem, etc.)?
- Browser/platform compatibility requirements?
- Scalability requirements?

Adapt your questioning based on {user_name}'s responses. If they're uncertain about a constraint, help them think through the implications with examples.
</action>

<action>For each identified constraint, document:
- The constraint itself (clear statement)
- Why it's a hard constraint (business reason, technical reason, etc.)
- What it eliminates (specific technologies or categories)
</action>

<action>Summarize all identified hard constraints and confirm with {user_name} before proceeding</action>
</step>

<step n="3" goal="Apply technology category filters">
<action>Based on the documented constraints, systematically filter technology categories:

Work through each major technology area relevant to the project:
1. **Frontend Frameworks** (if applicable)
2. **Backend Frameworks/Languages** (if applicable)
3. **Databases** (if applicable)
4. **Hosting/Deployment** (if applicable)
5. **Authentication/Auth** (if applicable)
6. **Payment Processing** (if applicable)
7. **Other Infrastructure** (as needed)

For each category:
- List the common options in that category
- Apply constraints to eliminate incompatible options
- Explain WHY each option is eliminated (reference specific constraint)
- Keep a running list of viable options that pass all constraints
</action>

<action>Be thorough but efficient. Focus on mainstream options relevant to {smb_scale_level} businesses. Don't waste time on enterprise-only or bleeding-edge options that don't fit the SMB context.</action>

<action>As you filter, engage {user_name} to validate eliminations:
- "Does this make sense given your [constraint]?"
- "Are there any options I'm eliminating that you want to reconsider?"
- "Any other constraints I'm missing?"
</action>
</step>

<step n="4" goal="Handle edge cases and gray areas">
<action>Identify technologies that are borderline - not clearly eliminated but potentially problematic given constraints</action>

<action>For each gray area technology, discuss trade-offs with {user_name}:
- What's the concern? (learning curve, compatibility risk, etc.)
- What's the upside if we keep it in consideration?
- How much risk are you comfortable with?
</action>

<action>Make collaborative decisions on whether to:
- Keep in consideration (mark as "needs deeper research")
- Eliminate as too risky
- Keep as a backup option if preferred choices fail validation
</action>

<action>Document rationale for all gray area decisions</action>
</step>

<step n="5" goal="Document filtering results">
<action>Create a comprehensive filtering summary that includes:

**Constraints Applied:**
- List all hard constraints with rationale
- Note any soft preferences that influenced decisions

**Eliminated Technologies by Category:**
- Frontend: [list eliminated options with brief reason]
- Backend: [list eliminated options with brief reason]
- Database: [list eliminated options with brief reason]
- Other categories: [as applicable]

**Viable Technologies Remaining:**
- Frontend: [list viable options]
- Backend: [list viable options]
- Database: [list viable options]
- Other categories: [as applicable]

**Gray Area / Needs Research:**
- [Technologies requiring deeper investigation before final decision]

**Recommended Next Steps:**
- Which viable options need detailed research by Scout?
- Any integration compatibility checks needed?
- Suggested order for evaluation?
</action>

<action if="user wants session notes">Save the filtering summary to {session_notes_file}</action>

<action>Present the filtering results clearly to {user_name}. Emphasize how many options were eliminated and what's left to research in depth.</action>
</step>

<step n="6" goal="Plan next steps with user">
<action>Discuss next steps in the Stack Advisor process:

Explain that with filtering complete, the natural next steps are:
1. **Detailed Research** - Scout can now research the remaining viable options in depth (*research command)
2. **Materials Selection** - Once research is done, use materials-lab workflow (*materials command) to select specific frameworks
3. **Architecture Design** - Work with Jordan to design system architecture (*blueprint command)
4. **Validation** - Have Sam validate choices (*validate command)
</action>

<action>Ask {user_name} if they want to:
- Proceed to research viable options now
- Take time to review the filtering results
- Adjust any constraints or filtering decisions
- Continue with another Stack Advisor workflow
</action>

<action>Thank {user_name} for their collaboration and confirm they have clarity on what's been filtered and why</action>
</step>

</workflow>
