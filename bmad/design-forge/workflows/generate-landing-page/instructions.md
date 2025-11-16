# Generate Landing Page - Multi-Section Coordination Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/design-forge/workflows/generate-landing-page/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the workflow</critical>

<workflow>

<step n="1" goal="Initialize and spawn Multi-Section Coordinator">
<critical>This workflow acts as a launcher for the Multi-Section Coordinator agent</critical>

<action>Load the Multi-Section Coordinator agent configuration</action>
<action>Read: {project-root}/bmad/design-forge/agents/multi-section-coordinator.agent.yaml</action>

<action>Spawn Multi-Section Coordinator agent using Task tool</action>

```
Task tool with:
- subagent_type: "general-purpose"
- description: "Generate multi-section landing page"
- prompt: |
    You are executing the Multi-Section Coordinator agent from Design Forge v4.0.

    Load and execute the agent's coordinate_landing_page prompt (id: coordinate_landing_page).

    Context variables to use:
    - user_name: {user_name}
    - communication_language: {communication_language}
    - prototype_output_folder: {prototype_output_folder}
    - design_principles_path: {design_principles_path}
    - style_guide_path: {style_guide_path}
    - project_root: {project-root}

    Execute the complete multi-section landing page generation workflow as defined
    in the agent's coordinate_landing_page prompt.

    This includes:
    1. Section selection and planning
    2. Design system establishment (extract or archetype-first)
    3. Parallel section generation with design system constraints
    4. Section assembly into full-page HTML
    5. Validation and quality assurance
    6. Results presentation with post-generation options

    Communicate with the user in {communication_language} throughout.
```

<action>Wait for Multi-Section Coordinator to complete all phases</action>

<template-output>coordinator_execution</template-output>
</step>

<step n="2" goal="Workflow completion and next steps">
<action>Confirm with user that landing page generation is complete</action>

<ask>Landing page generation complete! Would you like to:
1. Return to Design Director menu
2. Generate another landing page
3. Exit workflow

Choice?</ask>

<check if="choice 1">
  <action>Return control to Design Director</action>
  <action>User can access other menu commands (*analyze, *screenshot, *refine, etc.)</action>
</check>

<check if="choice 2">
  <goto step="1">Restart workflow</goto>
</check>

<check if="choice 3">
  <action>Thank user and exit workflow</action>
</check>

<template-output>workflow_complete</template-output>
</step>

</workflow>
