# Materials Lab - Interactive Framework & Library Selection

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/stack-advisor/workflows/materials-lab/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the selection process</critical>
<critical>ALWAYS prioritize frameworks that meet {tech_currency_threshold} - recommendations must be current and stable, not outdated</critical>

<workflow>

<step n="1" goal="Load context and establish selection criteria">
<action>Welcome {user_name} to the Materials Lab - the framework and library selection workshop</action>

<action>Explain the purpose of this session:
"This is where we make specific technology selections. We'll research the viable options identified earlier, compare them systematically, and choose the best fit for your project. This is a collaborative decision-making process - my job is to provide current, unbiased research so you can make informed choices."
</action>

<action>Check for available context documents:
- Constraint filter results: {output_folder}/stack-advisor/constraint-filter-*.md
- Intake session results: {output_folder}/stack-advisor/intake-session-*.md
- Any previous research notes or session documentation
</action>

<action if="context found">Load and review context to understand:
- Viable technology options that passed constraint filtering
- Project requirements and constraints
- Scale expectations and SMB focus level ({smb_scale_level})
- Currency threshold ({tech_currency_threshold})
</action>

<action if="no context">Explain that this works best after constraint-filter workflow, but you can proceed with user providing the list of options to evaluate</action>

<action>Ask {user_name}:
- Do you have a list of viable options to evaluate?
- Which technology categories do you need to make selections for? (Frontend, Backend, Database, etc.)
- Are there any specific frameworks you're already leaning toward?
</action>
</step>

<step n="2" goal="Research current state of viable options">
<action>For each technology category that needs selection, systematically research the viable options</action>

<action>Use Scout's knowledge base at {scout_knowledge_base} and conduct fresh research to gather:

**For Each Framework/Library:**
- **Current Version**: What's the latest stable release?
- **Release Date**: When was it released? (Critical: check against {tech_currency_threshold})
- **Adoption**: How widely used is it? GitHub stars, npm downloads, community size
- **Maturity**: How long has it been around? Is it battle-tested in production?
- **Maintenance**: Is it actively maintained? Frequency of updates, security patches
- **Learning Curve**: How easy is it to learn and use?
- **SMB Fit**: Is it appropriate for {smb_scale_level} projects or is it over-engineered for enterprise?
- **Documentation**: Quality of docs, tutorials, community support
- **Ecosystem**: Availability of plugins, libraries, tools, integrations
- **Performance**: Known performance characteristics relevant to project scale
- **Team Fit**: How well does it align with team skills and constraints?

Critical: If a framework's latest stable release is older than {tech_currency_threshold}, flag it as potentially outdated and investigate:
- Is there a specific reason for slow releases? (mature/stable vs abandoned)
- Are there active alternatives that are more current?
- Should this be eliminated from consideration?
</action>

<action>As you research, share findings with {user_name} in real-time. This is collaborative research, not a solo investigation. Engage them with observations and questions.</action>

<action>Load Scout's framework database from {scout_knowledge_base}/framework-database.md to check for documented version information and release patterns</action>

<action>For critical technologies (Frontend, Backend, Database), prioritize web searches and real-time API checks (if available) to ensure data is current</action>
</step>

<step n="3" goal="Present comparison and facilitate selection by category" repeat="for-each-category">
<action>For each technology category requiring selection (Frontend, Backend, Database, Auth, Payment, etc.):</action>

<action>Create a comparison summary for all viable options in this category:

**Comparison Format:**

```
Category: [Frontend/Backend/Database/etc.]

Option 1: [Framework Name]
├─ Latest Version: [version] (Released: [date])
├─ Currency Status: [✅ Current / ⚠️ Check needed / ❌ Outdated]
├─ Adoption: [High/Medium/Low] - [concrete metrics]
├─ SMB Fit: [Excellent/Good/Questionable] for {smb_scale_level} scale
├─ Learning Curve: [Low/Medium/High]
├─ Strengths: [3-5 key strengths]
├─ Weaknesses: [3-5 key weaknesses]
└─ Best For: [specific use cases]

Option 2: [Framework Name]
├─ Latest Version: [version] (Released: [date])
... [same structure]

Option 3: [Framework Name]
... [same structure]
```
</action>

<action>Present the comparison to {user_name} in a clear, digestible format</action>

<action>Facilitate selection discussion:
- "Given your [specific requirement], which options stand out to you?"
- "Are there any surprises in this comparison?"
- "What matters most for this category - [trade-off 1] or [trade-off 2]?"
- "Any concerns about [specific option] that we should explore further?"

Adapt your facilitation based on their expertise level and confidence. If they're uncertain, provide guidance. If they're knowledgeable, validate their thinking and raise edge cases.
</action>

<action>For each category, collaboratively select:
- **Primary Choice**: The main framework/library to use
- **Rationale**: Why this choice over alternatives (2-3 key reasons)
- **Trade-offs Accepted**: What are we giving up with this choice?
- **Backup Option** (optional): Alternative if primary doesn't work out during validation

Document the selection clearly before moving to next category.
</action>

<action>Check for integration compatibility as selections are made:
- Does [selected frontend] work well with [selected backend]?
- Does [selected database] integrate smoothly with [selected backend framework]?
- Are there known issues with this combination?
</action>
</step>

<step n="4" goal="Address supporting technologies and libraries">
<action>Beyond the major framework selections, identify supporting libraries needed:

**Common Supporting Categories:**
- **State Management** (if frontend framework selected)
- **HTTP Client** / API communication
- **Form Handling & Validation**
- **Date/Time Libraries**
- **UI Component Libraries**
- **Testing Frameworks**
- **Build Tools / Bundlers**
- **Authentication Libraries**
- **Payment Integration Libraries**
- **Email Service Libraries**
- Others based on project requirements
</action>

<action>For supporting libraries, apply a lighter-weight selection process:
- What does the chosen main framework recommend or commonly use?
- Are there standard choices in the ecosystem?
- Any that are outdated and should be avoided?

Focus on mainstream, well-maintained options. Don't over-engineer with exotic choices.
</action>

<action>Collaborate with {user_name} to make supporting library selections, documenting rationale for any non-obvious choices</action>
</step>

<step n="5" goal="Validate stack compatibility and coherence">
<action>Review the complete selection of frameworks and libraries as a whole:</action>

<action>Check for compatibility issues:
- Version compatibility (e.g., React 18 with React Router 6)
- Known integration problems between selected technologies
- Build tool compatibility
- Deployment target compatibility
</action>

<action>Assess stack coherence:
- Does this feel like a coherent, modern stack?
- Are we mixing paradigms inappropriately? (e.g., REST + GraphQL without good reason)
- Is the complexity level appropriate for {smb_scale_level} business?
- Have we avoided enterprise over-engineering?
</action>

<action>Identify any gaps:
- Are there missing pieces in the stack?
- Do we need any additional infrastructure components?
- Any assumed libraries that weren't explicitly selected?
</action>

<action>Present validation findings to {user_name} and address any issues before finalizing</action>
</step>

<step n="6" goal="Document final technology selections">
<action>Create a comprehensive Technology Selection Summary documenting:

**Technology Stack Selections**

**Frontend:**
- Framework: [selection]
- Version: [version] (Released: [date])
- Rationale: [why chosen]
- Supporting Libraries:
  - [library 1]: [purpose]
  - [library 2]: [purpose]

**Backend:**
- Framework/Language: [selection]
- Version: [version] (Released: [date])
- Rationale: [why chosen]
- Supporting Libraries:
  - [library 1]: [purpose]
  - [library 2]: [purpose]

**Database:**
- Database: [selection]
- Version: [version]
- Rationale: [why chosen]

**Infrastructure & DevOps:**
- [Hosting/Deployment]: [selection + rationale]
- [CI/CD]: [selection + rationale]
- [Others as applicable]

**Supporting Technologies:**
- Authentication: [selection + rationale]
- Payment Processing: [selection + rationale]
- [Others as applicable]

**Currency & Freshness:**
- All selections meet {tech_currency_threshold} threshold: [Yes/No]
- Any exceptions and their justification: [if applicable]

**Integration Compatibility:**
- Known compatibility concerns: [none or list]
- Validated integration points: [list key integrations]

**SMB Appropriateness:**
- Stack complexity level: [appropriate for {smb_scale_level}]
- Avoids enterprise over-engineering: [Yes/No]
- Learning curve assessment: [reasonable/challenging]

**Trade-offs & Decisions:**
- [Key trade-off 1]: [decision made and why]
- [Key trade-off 2]: [decision made and why]

**Backup Options:**
- [Category]: [backup option] (if primary fails validation)

**Recommended Next Steps:**
1. Architecture design with Jordan (*blueprint)
2. Production-readiness validation with Sam (*validate)
3. Document generation with Casey (*generate)
</action>

<action>Save the Technology Selection Summary to {selection_summary}</action>

<action if="user wants detailed session notes">Save complete session notes with all research details to {session_notes_file}</action>

<action>Present the summary to {user_name} and confirm they're satisfied with the selections before proceeding</action>
</step>

<step n="7" goal="Plan next steps in Stack Advisor process">
<action>Discuss next steps with {user_name}:

With specific frameworks and libraries selected, the natural progression is:

1. **Architecture Design** - Work with Jordan to design system architecture using these selections (*blueprint via Jordan)

2. **Production Validation** - Have Sam validate these choices for production-readiness (*validate via Sam)

3. **Compare Alternatives** - If uncertain about any selections, Dana can create detailed comparison matrices (*compare via Dana)

4. **Migration Planning** - If migrating from existing tech, Riley can plan migration path (*migrate via Riley)

5. **Final Documentation** - Casey can compile everything into deliverable documents (*generate via Casey)
</action>

<action>Ask {user_name} what they'd like to do next:
- Proceed to architecture design
- Request validation of selections
- Review any specific selection more deeply
- Take a break and return to the process later
</action>

<action>Thank {user_name} for their collaboration and confirm they have clear selections with documented rationale</action>
</step>

</workflow>
