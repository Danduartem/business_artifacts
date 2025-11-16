# Smart Intake Session - Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/stack-advisor/workflows/smart-intake/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the session</critical>

<workflow>

<step n="1" goal="Introduction and context setting">
<action>Welcome {user_name} to the Smart Intake Session</action>

<action>Explain the purpose and process:

This session will gather all the information needed to provide solid tech stack recommendations. We'll explore:
1. What you're building and why (business requirements)
2. What you have now (current tech stack)
3. Where you're headed (scale expectations)
4. What shapes your choices (constraints)

This is collaborative - ask questions, share context, and we'll figure it out together. There are no wrong answers, just clarity we're building toward.
</action>

<action>Set expectations:
- This will take 15-30 minutes depending on complexity
- Be as specific or general as feels right - we'll dig deeper where needed
- We can iterate and refine as we go
- Everything gathered here shapes the recommendations
</action>

<action>Ask if they have any questions before starting, then proceed when ready</action>
</step>

<step n="2" goal="Business requirements discovery">
<action>Guide {user_name} to articulate what they're building and why:

Use open-ended, collaborative questions to explore:

**The Vision:**
- What are you building? (Don't just say "a website" - what does it DO?)
- Who is this for? (Target users/customers)
- What problem does it solve for them?
- What makes this project important or exciting to you?

**Business Context:**
- Is this a new project or existing one?
- Solo project, agency client work, or internal business tool?
- What's the business model? (If applicable)
- Any specific business goals or metrics that matter?

**Success Criteria:**
- What does "done" look like?
- How will you know this is successful?
- What's the minimum to launch vs nice-to-have features?

Listen actively. When answers are vague, ask follow-ups:
- "Tell me more about..."
- "What specifically would that look like?"
- "Why is that important?"
- "Can you give me an example?"

The goal is clear understanding of WHAT and WHY, not just a feature list.
</action>

<action>Summarize back what you heard to confirm understanding</action>

<action>Store key insights:
- Project purpose and goals
- Target users/customers
- Key features or capabilities
- Success criteria
- Business context
</action>
</step>

<step n="3" goal="Current tech stack analysis">
<action>Understand the current technical landscape:

**If Starting Fresh:**
- Confirm they're starting from scratch
- Ask if they have any preferences or past experience influencing choices
- Note any technologies they specifically want or want to avoid

**If Existing Project:**
Explore what's already in place:

**Current Stack Inventory:**
- Frontend: What framework/library? (React, Vue, vanilla JS, etc.)
- Backend: What language and framework? (Node.js/Express, Python/Django, etc.)
- Database: What are you using? (PostgreSQL, MongoDB, etc.)
- Hosting/DevOps: Where does it run? (AWS, Vercel, Heroku, etc.)
- Any other significant technologies or services?

**Current State Assessment:**
- What's working well in the current stack?
- What's causing pain or problems?
- What's easy vs hard to work with?
- Any technical debt or legacy issues?
- What would you change if you could?

Be conversational and empathetic. If they're migrating from legacy tech, acknowledge the challenges.

Clarify:
- What must stay (hard constraints)
- What should stay (preferences)
- What could change (flexible)
- What must change (requirements)
</action>

<action>Summarize the current state clearly</action>

<action>Store current stack details:
- Existing technologies (or "greenfield")
- What's working / what's not
- Migration context if applicable
- Technical debt or pain points
</action>
</step>

<step n="4" goal="Scale expectations gathering">
<action>Understand realistic scale and growth expectations:

**Context Setting:**
Explain that SMB scale is different from enterprise, and over-engineering for imaginary scale is expensive. We want to be honest about realistic numbers.

**Explore Scale Through Questions:**

**Current Reality (if existing):**
- How many users/customers do you have now?
- What's your current traffic? (visits/day, requests/second, etc.)
- What's your data volume? (records, files, storage)

**Near-term Expectations (6-12 months):**
- How many users do you expect?
- What traffic levels are realistic?
- Any events that might spike load? (launch, campaign, press)

**Growth Vision (1-3 years):**
- Where do you hope to be?
- What would "success" look like in numbers?
- Any specific milestones or targets?

**Reality Check:**
If numbers seem unrealistic for SMB (e.g., "millions of users in 6 months"), gently probe:
- "That's ambitious! What's driving that expectation?"
- "Have you validated this with market research or similar examples?"
- "What if we plan for something more conservative and can scale up?"

Be collaborative, not judgmental. The goal is grounded expectations that match SMB reality.

**Geographic Scope:**
- Local, regional, national, international?
- Does location matter for performance (CDN needs)?

**Performance Requirements:**
- What's acceptable load time? (< 2 seconds? < 5 seconds?)
- Any real-time features needed?
- Uptime expectations (99%? 99.9%?)
</action>

<action>Summarize realistic scale expectations</action>

<action>Store scale details:
- Current scale (if existing)
- Near-term expectations (6-12 months)
- Growth vision (1-3 years)
- Geographic scope
- Performance requirements
- Any spike scenarios
</action>
</step>

<step n="5" goal="Constraints identification">
<action>Capture all constraints that will shape tech recommendations:

**Team Constraints:**
- Who's building this? (Solo, small team, agency, etc.)
- What's the team's technical skill level?
- What technologies are they comfortable with?
- What do they want to learn vs avoid?
- Will there be ongoing maintenance? By whom?

**Budget Constraints:**
- What's the hosting/infrastructure budget?
- Any preference for free/open-source vs paid tools?
- What about development time = money?

**Timeline Constraints:**
- When does this need to launch?
- What's driving the timeline? (Hard deadline? Flexible?)
- Are we optimizing for speed to market or long-term maintainability?

**Technical Constraints:**
- Must integrate with existing systems? (APIs, databases, services)
- Any compliance requirements? (GDPR, HIPAA, etc.)
- Platform requirements? (mobile app, desktop, web only)
- Browser/device support needs?

**Preferences and Deal-Breakers:**
- Technologies they WANT to use (personal preference)
- Technologies they want to AVOID (bad experience, don't want to learn)
- Any strong opinions on specific tools?
- Deal-breakers that would make a recommendation unusable?

Be thorough but conversational. These constraints are as important as requirements - they define the solution space.
</action>

<action>Identify must-haves vs nice-to-haves:
- What's absolutely required?
- What's preferred but flexible?
- What's just a "would be cool"?
</action>

<action>Summarize all constraints clearly</action>

<action>Store constraints:
- Team size, skills, preferences
- Budget and timeline
- Technical requirements
- Integration needs
- Deal-breakers and must-haves
</action>
</step>

<step n="6" goal="Summary and validation">
<action>Present a comprehensive summary of everything gathered:

**Summary Structure:**

**1. Project Overview**
- What: [Project purpose and key features]
- Who: [Target users]
- Why: [Problem being solved, business goals]

**2. Current State**
- [Current tech stack OR "Starting fresh"]
- [What's working / pain points]

**3. Scale Expectations**
- Near-term: [6-12 month expectations]
- Growth: [1-3 year vision]
- Performance: [Key requirements]

**4. Constraints**
- Team: [Skills, size, preferences]
- Budget: [Financial constraints]
- Timeline: [Launch deadline]
- Technical: [Integration needs, requirements]
- Deal-breakers: [Must-haves and must-avoids]

Present this as a clear, organized recap.
</action>

<action>Ask validation questions:
- "Does this capture everything accurately?"
- "Is anything missing or unclear?"
- "Any constraints we didn't cover?"
- "Anything you'd like to clarify or change?"
</action>

<action if="changes needed">
Go back to relevant sections and refine.
Iterate until {user_name} confirms completeness.
</action>

<action>Explain next steps:

With these requirements, the Stack Advisor team can now:
1. Scout will research current, stable tech options that fit your constraints
2. Jordan will design an architecture that matches your scale needs
3. Sam will validate choices are production-ready and SMB-appropriate
4. Dana will compare alternatives so you understand trade-offs
5. Casey will document everything clearly
6. Riley will plan migration if you're coming from existing tech

You can work with any of these agents individually, or run the full advisory workflow when ready.
</action>

<action>Thank {user_name} for their time and thorough answers</action>

<action if="session_notes_file configured">
Offer to save session notes to {session_notes_file} for reference.
Include all gathered information in structured markdown format.
</action>
</step>

</workflow>
