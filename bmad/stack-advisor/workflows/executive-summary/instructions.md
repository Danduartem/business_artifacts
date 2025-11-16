# Executive Summary - Stakeholder-Friendly Technology Overview

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/stack-advisor/workflows/executive-summary/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the summary generation process</critical>

<workflow>

<step n="1" goal="Initialize document and load source documentation">
<action>Write the template to {default_output_file} with all placeholders</action>

<action>Welcome {user_name} to the Executive Summary workflow</action>

<action>Explain the purpose in {communication_language}:
"I'll help you create an executive summary. This workflow creates a high-level, stakeholder-friendly summary of technology stack decisions from existing technical documentation."
</action>

<action>Present target audience in {communication_language}:

Target Audience

- **Executives** (CEO, CFO, COO) who need high-level understanding
- **Board members** requiring strategic overview
- **Investors** evaluating technical decisions
- **Business stakeholders** without technical background
- **Project sponsors** needing approval basis

**NOT** for technical team members (they should read full spec).

## Session Flow

Duration: 20-40 minutes

---

## Step 1: Load Source Documentation

**Ask the user:**

"I'll help you create an executive summary. What source documents do you have?

Options:
1. Technology Stack Specification (from Casey's *generate)
2. Architecture Blueprint (from Jordan's *blueprint)
3. Comparison Matrix (from Dana's *compare)
4. Intake/Requirements Document
5. Other technical documentation

You can provide:
- File paths to load
- Paste content directly
- Or I can guide you to create summary from conversation"

**Load any provided documents.**

---

## Step 2: Understand Stakeholder Audience

**Ask:**

"Who is the primary audience for this executive summary?

- C-suite executives (CEO, CFO, CTO)
- Board of directors
- Investors
- Business unit leaders
- Project sponsors
- Other: [specify]

This helps me tailor the tone and level of detail."

**Note their answer to customize language.**

---

## Step 3: Extract Project Overview

From the source documentation, identify:

- **Project name** and purpose
- **Business objectives** (not technical goals)
- **Scale and scope** (users, timeline, budget range)
- **Critical success factors**

**Draft a 2-3 sentence overview paragraph.**

**Present to user:**

```
<template-output id="overview_paragraph">
[Your drafted overview]
</template-output>

Does this accurately capture the project at a high level?
```

**Refine based on feedback.**

---

## Step 4: Summarize Technology Stack

Create **one-line summaries** for each layer:

**Frontend:** "Technology + key benefit"
Example: "Next.js 14 - Modern React framework optimized for performance and SEO"

**Backend:** "Technology + key benefit"
Example: "FastAPI with Python - High-performance API framework with automatic documentation"

**Database:** "Technology + key benefit"
Example: "PostgreSQL - Enterprise-grade relational database with excellent scaling"

**Hosting:** "Platform + key benefit"
Example: "Vercel - Optimized deployment with automatic scaling and global CDN"

**Present summaries:**

```
<template-output id="frontend_summary">
[Frontend summary]
</template-output>

<template-output id="backend_summary">
[Backend summary]
</template-output>

<template-output id="database_summary">
[Database summary]
</template-output>

<template-output id="hosting_summary">
[Hosting summary]
</template-output>

<template-output id="additional_services">
[Auth, payments, email, etc.]
</template-output>

Are these summaries clear for non-technical readers?
```

---

## Step 5: Articulate Strategic Rationale

**Explain WHY this stack was chosen in business terms:**

Focus on:
- **Business value** (not technical features)
- **Risk mitigation**
- **Cost effectiveness**
- **Time to market**
- **Competitive advantage**
- **Future flexibility**

**Avoid:**
- Technical jargon
- Implementation details
- Framework version numbers
- Code structure

**Draft 2-3 paragraphs.**

**Present:**

```
<template-output id="strategic_rationale">
[Your rationale in business terms]
</template-output>

Does this clearly explain why we chose this approach?
```

---

## Step 6: Highlight Key Benefits

Identify the **top 3 benefits** from a business perspective.

**Format each as:**
- **Title** (5-7 words, benefit-focused)
- **Description** (2-3 sentences, business impact)

**Examples:**
- "Faster Time to Market" - "Modern framework with extensive tooling allows development team to build features quickly. Pre-built components and automatic optimization mean less time on infrastructure, more on business logic. Estimated 30% faster development compared to alternatives."

- "Lower Long-term Costs" - "Open-source technologies eliminate licensing fees. Generous free tiers for hosting and services keep initial costs low. Pay-per-use scaling means costs grow proportionally with revenue."

**Present benefits:**

```
<template-output id="benefit_1_title">
[Benefit 1 title]
</template-output>

<template-output id="benefit_1_description">
[Benefit 1 description]
</template-output>

[Repeat for benefits 2 and 3]

Are these the most compelling benefits for stakeholders?
```

---

## Step 7: Summarize Investment

From source docs or by asking user, document:

### Development Costs

**Ask if not in docs:**
"What's the estimated initial development cost?
- Team size and timeline
- Internal vs external developers
- Rough budget range"

**Present:**

```
<template-output id="initial_dev_cost">
$[amount] - [description]
</template-output>

<template-output id="initial_dev_notes">
[Team composition and timeline]
</template-output>
```

### Infrastructure Costs

**Extract from docs or ask:**
"What are the estimated infrastructure costs for Year 1?"

**Present:**

```
<template-output id="infrastructure_cost_year1">
$[amount]/year
</template-output>

<template-output id="infrastructure_notes">
[Breakdown: hosting, databases, services]
</template-output>
```

### Ongoing Maintenance

**Ask:**
"Estimated annual maintenance costs? (Support, updates, minor enhancements)"

**Present:**

```
<template-output id="maintenance_cost_annual">
$[amount]/year
</template-output>

<template-output id="total_first_year">
$[total] (Initial + Infrastructure + Partial maintenance)
</template-output>
```

---

## Step 8: Timeline Overview

Extract or create high-level timeline:

**Ask if not in docs:**
"What's the expected timeline?
- Setup/infrastructure
- MVP development
- Production launch"

**Present:**

```
<template-output id="setup_timeline">
[e.g., "2-3 weeks"]
</template-output>

<template-output id="mvp_timeline">
[e.g., "3-4 months"]
</template-output>

<template-output id="launch_timeline">
[e.g., "6 months from kickoff"]
</template-output>
```

---

## Step 9: Risk Assessment (Executive Level)

Identify **top 3-4 risks** that executives care about:

**Focus on:**
- Business risks (not technical risks)
- Budget risks
- Timeline risks
- Team/hiring risks
- Vendor dependency risks

**Avoid:**
- Technical implementation risks (unless business-critical)
- Minor operational details

**For each risk:**
- Risk title (short, clear)
- Risk level (Low/Medium/High)
- Description (business impact)
- Mitigation (how we'll address it)

**Example:**
```
Risk: "Specialized Skill Requirements"
Level: Medium
Description: "Framework requires developers with React and TypeScript experience, which may limit hiring pool."
Mitigation: "Training plan for existing team members, partnership with recruitment agency specializing in JavaScript developers, framework is industry-standard making hiring feasible."
```

**Present risks:**

```
<template-output id="risks">
[Risk 1 details]
[Risk 2 details]
[Risk 3 details]
</template-output>
```

---

## Step 10: Team Requirements

**Summarize:**

### Required Skills
List key skills needed (business-friendly language):
- "Modern JavaScript development"
- "Database administration"
- "Cloud platform management"

### Team Structure
Suggested team composition:
- "2 frontend developers"
- "1 backend developer"
- "1 DevOps engineer (part-time initially)"

### Hiring Needs
New hires needed or skills to acquire:
- "1 senior React developer (new hire)"
- "Upskill existing developer in TypeScript (training)"

**Present:**

```
<template-output id="required_skills_list">
[Skills list]
</template-output>

<template-output id="team_structure">
[Team composition]
</template-output>

<template-output id="hiring_needs">
[Hiring or training needs]
</template-output>
```

---

## Step 11: Implementation Approach

Break down into **3 high-level phases**:

**Each phase should:**
- Have clear business objective (not technical tasks)
- Show duration
- Highlight deliverables/milestones

**Example:**

Phase 1: Foundation (Weeks 1-4)
"Establish development environment and core infrastructure. Complete: Project setup, database design, authentication system. Team can begin feature development at end of phase."

**Present phases:**

```
<template-output id="phase1_name">
[Phase name]
</template-output>

<template-output id="phase1_duration">
[Duration]
</template-output>

<template-output id="phase1_summary">
[Business-focused summary]
</template-output>

[Repeat for phases 2 and 3]
```

---

## Step 12: Alternatives Considered

**Show due diligence** - What alternatives were evaluated and why rejected?

Pick **2-3 significant alternatives** (not every option):

**For each:**
- Alternative name/approach
- Why it wasn't chosen (business reason)

**Example:**
```
Alternative: "WordPress with plugins"
Why not chosen: "While lower initial cost, would require extensive customization limiting future flexibility. Scaling costs and performance constraints would emerge as business grows. Modern approach chosen for long-term sustainability."
```

**Present:**

```
<template-output id="alternatives">
[Alternative 1]
[Alternative 2]
[Alternative 3]
</template-output>
```

---

## Step 13: Success Criteria

**Define measurable success metrics** (business-focused):

Examples:
- "System handles 10,000 concurrent users without degradation"
- "Page load times under 2 seconds for 95% of requests"
- "Development team ships new features weekly"
- "Infrastructure costs remain under $500/month for first 5000 users"

**Present 4 criteria:**

```
<template-output id="success_criterion_1">
[Criterion 1]
</template-output>

[Repeat for 2, 3, 4]
```

---

## Step 14: Decision & Approval Request

**Clarify what decision is needed:**

**Ask user:**
"What approval or decision are you seeking from stakeholders?

- Approval to proceed with recommended stack?
- Budget approval?
- Team hiring approval?
- Timeline commitment?
- All of the above?"

**Draft decision request and approval checklist:**

```
<template-output id="decision_request">
[Clear statement of what decision is needed]
</template-output>

<template-output id="approval_item_1">
[Specific approval item]
</template-output>

[Repeat for items 2, 3]
```

---

## Step 15: Next Steps

**Define concrete next steps** in three timeframes:

### Immediate (Next 2 Weeks)
Specific, actionable items:
- "Obtain stakeholder approval"
- "Finalize team composition"

### Short-term (Next Month)
Follow-up actions:
- "Begin developer hiring process"
- "Set up development infrastructure"

### Medium-term (Next Quarter)
Longer-range milestones:
- "Complete MVP development"
- "Begin user testing"

**Present:**

```
<template-output id="next_step_1">
[Immediate step 1]
</template-output>

<template-output id="next_step_2">
[Immediate step 2]
</template-output>

[Continue for short-term and medium-term]
```

---

## Step 16: Appendix Links

**Reference full documentation:**

**Ask:**
"Where are the detailed technical documents stored? I'll link them in the appendix."

**Capture links:**

```
<template-output id="link_to_full_spec">
[Path or location]
</template-output>

<template-output id="link_to_architecture">
[Path or location]
</template-output>

<template-output id="link_to_cost_analysis">
[Path or location]
</template-output>

<template-output id="link_to_migration">
[Path or location if applicable]
</template-output>
```

---

## Step 17: Finalize Metadata

**Capture remaining template variables:**

**Ask:**
"A few final details:
- Project name: [user provides]
- Primary stakeholder audience: [from Step 2]
- Contact for questions: [email/name]"

**Fill:**

```
<template-output id="project_name">
[Name]
</template-output>

<template-output id="stakeholder_audience">
[Audience]
</template-output>

<template-output id="date">
[Today's date]
</template-output>

<template-output id="contact_info">
[Contact details]
</template-output>
```

---

## Step 18: Generate & Review

**Announce:**

"I've completed the executive summary! Let me generate the final document."

**Generate document using template with all collected outputs.**

**Present to user:**

"Here's your executive summary. It's designed to be:
- Clear for non-technical readers
- Focused on business value and decisions
- Concise (4-6 pages typical)
- Ready for stakeholder presentation

Please review and let me know if you'd like to adjust any section."

**Offer refinements:**
- "Would you like me to simplify any sections?"
- "Should any risks be emphasized more/less?"
- "Are the cost estimates appropriate level of detail?"

---

## Step 19: Finalize

**After user approval:**

"Executive summary is complete!

**Next steps:**
1. Share with stakeholders
2. Prepare to answer questions (I can help)
3. Once approved, reference full technical spec for implementation

Would you like me to help with anything else, such as:
- Creating a presentation deck from this summary?
- Preparing talking points for stakeholder meeting?
- Generating FAQ for common questions?"

---

## Content Guidelines

### Language

- **Business-focused** - value, ROI, risk, timeline
- **Clear and concise** - executives are busy
- **Jargon-free** - explain technical terms
- **Confident but honest** - don't oversell or hide risks

### Tone

- **Professional** - this is a business document
- **Objective** - present facts and reasoning
- **Practical** - actionable insights
- **Balanced** - show benefits AND considerations

### Length

- **Target: 4-6 pages** printed
- **Max: 8 pages** for very complex projects
- **Each section: 1 paragraph to 1 page** max

### Focus

**DO emphasize:**
- Business value and ROI
- Risk mitigation
- Strategic alignment
- Competitive advantages
- Clear costs and timeline

**DON'T include:**
- Code examples
- Detailed API specifications
- Technical implementation details
- Framework version minutiae
- Internal technical debates

---

## Quality Checklist

Before finalizing, verify:

- [ ] Non-technical stakeholder could understand it
- [ ] All costs and timelines are clear
- [ ] Risks are honestly addressed
- [ ] Benefits are business-focused
- [ ] Decision needed is explicit
- [ ] Next steps are actionable
- [ ] No unnecessary jargon
- [ ] Professional presentation quality

---

## Important Notes

- **This is a distillation** - full details are in appendix documents
- **Focus on decisions** - why we made these choices
- **Business impact** - not technical superiority
- **Stakeholder needs** - what do they care about?
- **Approval-oriented** - make it easy to say yes

The executive summary should give stakeholders confidence in the technology decisions without requiring them to understand technical details.
</action>

<action>Thank {user_name} for collaborating on the executive summary</action>
</step>

</workflow>
