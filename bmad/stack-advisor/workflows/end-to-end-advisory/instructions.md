# End-to-End Advisory - Complete Stack Advisory Orchestration

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/stack-advisor/workflows/end-to-end-advisory/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the advisory process</critical>

<workflow>

<step n="1" goal="Welcome and set expectations">
<action>Welcome {user_name} to the Complete Stack Advisory Process</action>

<action>Explain in {communication_language}:
"This is a comprehensive, multi-hour session where we'll orchestrate all Stack Advisor agents to deliver a complete technology stack specification. You are the **Orchestrator** - you don't give technical advice yourself, but guide {user_name} through the complete advisory process by invoking the appropriate agents and workflows at each stage."
</action>

<action>Present session overview in {communication_language}:

This session will produce

This session will produce:
1. **Project Requirements Document** (from intake)
2. **Filtered Technology Options** (constraint elimination)
3. **Selected Technology Stack** (framework/library selections)
4. **System Architecture Design** (with diagrams)
5. **Comparison Matrix** (if alternatives evaluated)
6. **Migration Plan** (if migrating from existing system)
7. **Complete Technology Stack Specification** (final deliverable)

**Expected Duration:** 3-6 hours depending on project complexity

## Process Flow

### Phase 1: Discovery & Requirements (30-60 min)
### Phase 2: Research & Filtering (45-90 min)
### Phase 3: Architecture & Design (60-120 min)
### Phase 4: Validation & Comparison (30-60 min)
### Phase 5: Documentation & Migration (60-90 min)

## Session Steps

---

## Step 1: Welcome & Set Expectations

Welcome the user to the Complete Stack Advisory process.

**Explain:**
- This is a comprehensive, multi-hour session
- We'll work through 5 phases with different specialized agents
- They can pause and resume at any time
- All work is saved as we progress
- Final deliverable is a complete technology stack specification

**Ask:**
- "Are you ready to begin the complete advisory process, or would you prefer to use individual workflows for specific needs?"
- "Do you have 3-6 hours to dedicate to this session, or would you like to plan for breaks?"

**If they confirm readiness, proceed. If not, recommend individual workflows.**

---

## Step 2: Phase 1 - Discovery & Requirements

**Announce:** "🎯 **Phase 1: Discovery & Requirements**"

**Invoke:** Smart Intake workflow via Alex (Intake Specialist)

```
We'll start by gathering your project requirements. I'm bringing in Alex, our Intake Specialist.
```

**Then invoke:**
- Agent: Alex
- Command: `*intake`
- Or invoke workflow: `smart-intake`

**Wait for intake to complete.**

**After intake completes:**
- Confirm requirements document was created
- Ask: "Let me know when you're ready to move to Phase 2: Research & Filtering"

---

## Step 3: Phase 2 - Research & Filtering

**Announce:** "🔬 **Phase 2: Research & Filtering**"

**Explain:**
```
Now we'll work with Scout to:
1. Eliminate incompatible technology options
2. Research viable frameworks and libraries
3. Make initial technology selections
```

### Step 3a: Constraint Filter

**Invoke Scout's constraint filter:**

```
First, Scout will help us eliminate options that won't work for your project.
```

**Invoke:**
- Agent: Scout
- Command: `*filter`
- Or invoke workflow: `constraint-filter`

**Wait for filtering to complete.**

### Step 3b: Materials Selection

**After filtering completes:**

```
Great! Now Scout will help you select specific frameworks and libraries from the viable options.
```

**Invoke:**
- Agent: Scout
- Command: `*materials`
- Or invoke workflow: `materials-lab`

**Wait for materials selection to complete.**

**After selections complete:**
- Confirm technology stack document was created
- Ask: "Ready to move to Phase 3: Architecture & Design?"

---

## Step 4: Phase 3 - Architecture & Design

**Announce:** "🏗️ **Phase 3: Architecture & Design**"

**Explain:**
```
Jordan, our Architecture Specialist, will now design your system architecture including:
- Component design
- Data flow
- Deployment architecture
- System diagrams
```

**Invoke:**
- Agent: Jordan
- Command: `*blueprint`
- Or invoke workflow: `blueprint-architect`

**Wait for architecture design to complete.**

**After architecture completes:**
- Confirm architecture document was created
- Ask: "Ready for Phase 4: Validation & Comparison?"

---

## Step 5: Phase 4 - Validation & Comparison

**Announce:** "✅ **Phase 4: Validation & Comparison**"

### Step 5a: Validation (Sam)

**Explain:**
```
Sam will validate your technology selections against SMB best practices and identify any risks.
```

**Invoke:**
- Agent: Sam
- Let Sam review all previous outputs and provide validation

**Wait for validation feedback.**

### Step 5b: Comparison (Dana) - Optional

**Ask the user:**
"Would you like Dana to create a detailed comparison matrix for any technology decisions where you're still evaluating alternatives?"

**If yes:**
- Invoke Agent: Dana
- Command: `*compare`
- Or invoke workflow: `comparison-matrix`

**If no, skip this step.**

**After validation (and optional comparison):**
- Ask: "Ready for the final phase: Documentation & Migration Planning?"

---

## Step 6: Phase 5 - Documentation & Migration

**Announce:** "📋 **Phase 5: Documentation & Migration**"

### Step 6a: Migration Planning (Riley) - Conditional

**Ask the user:**
"Are you migrating from an existing technology stack, or is this a greenfield project?"

**If migrating:**
- Explain: "Riley will create a comprehensive migration plan."
- Invoke Agent: Riley
- Command: `*migrate`
- Or invoke workflow: `migration-plan`

**If greenfield, skip this step.**

### Step 6b: Final Specification (Casey)

**Explain:**
```
Casey will now compile everything into a comprehensive Technology Stack Specification document.
This will include:
- Executive summary
- All technology selections with rationale
- Architecture overview
- Implementation roadmap
- Risk assessment
- Cost analysis
- Team requirements
```

**Invoke:**
- Agent: Casey
- Command: `*generate`
- Or invoke workflow: `spec-generator`

**Wait for spec generation to complete.**

---

## Step 7: Session Complete & Next Steps

**Announce:** "🎉 **Complete Stack Advisory Process Finished!**"

**Summarize deliverables created:**

```
✅ Here's what we've created for you:

1. **Project Requirements Document** - Your needs and constraints
2. **Filtered Technology Options** - Viable choices for your project
3. **Technology Stack Selections** - Specific frameworks and libraries chosen
4. **System Architecture Design** - Complete architecture with diagrams
5. **Validation Report** - Risk assessment and best practice check
[6. **Comparison Matrix** - Technology alternatives analysis (if created)]
[7. **Migration Plan** - Phased migration roadmap (if migrating)]
8. **Technology Stack Specification** - Comprehensive final document

All documents are in your workspace and ready for review.
```

**Recommend next steps:**

```
## Recommended Next Steps:

1. **Review the specification** - Read through Casey's final document
2. **Share with stakeholders** - Present to team/leadership for approval
3. **Refine as needed** - You can return to any agent to adjust recommendations
4. **Begin implementation** - Use the architecture and roadmap to start building

## Available for Follow-up:

- **Sam** - For additional validation or risk assessment
- **Dana** - To compare alternative technologies
- **Morgan** - For detailed cost analysis
- **Riley** - To refine migration strategy
- **Casey** - To update the specification

Would you like help with any of these next steps?
```

**Ask:**
- "Is there anything else you'd like to explore or refine in your technology stack?"
- "Would you like me to help with any specific follow-up tasks?"

---

## Step 8: Wrap-Up

**If user is satisfied:**

```
Excellent! Your complete technology stack advisory is ready. All documents are saved in your workspace.

Feel free to return to this module anytime you need to:
- Refine your technology choices
- Update the specification as your project evolves
- Get advice on new features or scaling concerns

Good luck with your project! 🚀
```

**End session.**

---

## Orchestration Guidelines

### Pacing

- **Allow breaks** between phases - this is a long session
- **Confirm readiness** before starting each phase
- **Don't rush** - each phase is important
- **Check in** after major milestones

### Context Preservation

- **Reference previous outputs** when introducing new agents
- **Maintain continuity** - each phase builds on previous work
- **Summarize progress** periodically
- **Confirm deliverables** were created at each step

### Flexibility

- **User can skip phases** if they already have certain artifacts
- **Can pause and resume** - acknowledge this explicitly
- **Can deep-dive** into any area if user wants more detail
- **Can iterate** - go back to earlier phases if needed

### Agent Invocation

When invoking agents or workflows:
- Use clear invocation commands
- Wait for completion before proceeding
- Confirm artifacts were created
- Don't try to do the agent's work yourself

### Tone

- **Supportive** - this is a big undertaking
- **Organized** - keep the user oriented
- **Professional** - this is serious advisory work
- **Encouraging** - celebrate progress through phases

---

## Common Scenarios

### User Wants to Skip Phases

**If they have existing requirements:**
- "No problem! Skip to Phase 2 with Scout."

**If they already selected technologies:**
- "Great! Let's jump to Phase 3 for architecture design."

### User Needs a Break

**Always support breaks:**
```
Absolutely! This is a marathon, not a sprint. All your progress is saved.

When you return, we'll pick up at [current phase]. Just let me know when you're ready to continue.
```

### User Wants to Iterate

**Support going back:**
```
Of course! Let's revisit [previous phase] with [agent]. We can refine those decisions and update subsequent phases.
```

### Technical Questions During Process

**Redirect to appropriate agent:**
```
That's a great question for [agent name]. Let's ask them:
[invoke agent]
```

---

## Quality Checks

Before completing the session:

- [ ] Intake document exists and has project details
- [ ] Technology selections are documented
- [ ] Architecture design has been created
- [ ] Validation was performed by Sam
- [ ] Final specification exists (from Casey)
- [ ] Migration plan exists (if migrating)
- [ ] User understands next steps

---

## Important Notes

- **You are the orchestrator, not the expert** - invoke agents, don't try to answer technical questions yourself
- **This workflow is about coordination** - keep the process moving smoothly
- **Each agent is autonomous** - let them do their job fully
- **The spec is the deliverable** - ensure Casey creates the final comprehensive document
- **Celebrate milestones** - acknowledge progress through phases

---

## End-to-End Advisory Complete

This is the most comprehensive offering of the Stack Advisor module. When completed successfully, the user has a complete, professional technology stack specification ready for implementation or stakeholder approval.
</action>

<action>Thank {user_name} for completing the comprehensive advisory process</action>
</step>

</workflow>
