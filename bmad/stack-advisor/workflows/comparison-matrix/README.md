# Comparison Matrix

Detailed technology alternative analysis workflow for Stack Advisor module.

## Purpose

Creates data-driven comparison matrices for technology alternatives. Provides objective analysis with weighted scoring, trade-off exploration, and clear recommendations to support informed decision-making. Helps users choose between competing options with confidence.

## How to Invoke

**Direct invocation:**
```
/comparison-matrix
```
or
```
workflow comparison-matrix
```

**Via Dana (Comparison Analyst):**
```
agent dana
*compare
```

## Session Flow

1. **Initialize & Understand Comparison Need** - Identify what's being compared and why
2. **Define Criteria & Weighting** - Establish evaluation framework
3. **Research Each Option** - Gather comprehensive data
4. **Create Comparison Matrix Table** - Build structured 5-star rating table
5. **Analyze Each Criterion** - Deep dive on each evaluation factor
6. **Analyze Key Trade-Offs** - Explore primary tensions and compromises
7. **Calculate Weighted Scores** - Transparent scoring methodology
8. **Formulate Recommendation** - Clear recommendation with rationale
9. **Explore Alternative Scenarios** - How recommendation changes under different constraints
10. **Assess Risks by Option** - Risk profile for each alternative
11. **Create Decision Tree Diagram** - Visual decision logic
12. **Document Supporting Data** - Adoption, performance, community metrics
13. **Create Executive Summary** - Concise overview
14. **Add References** - Cite all sources
15. **Review & Finalize** - Final review and next steps

## Evaluation Criteria

**Common Criteria Categories:**
- Maturity & Stability
- Community & Ecosystem
- Documentation Quality
- Learning Curve
- Performance
- Maintenance & Updates
- SMB Fit
- Team Fit
- Cost
- Migration Effort

**Weighting System:**
- **Critical (3x)**: Deal-breaker criteria
- **High (2x)**: Very important
- **Medium (1x)**: Moderately important
- **Low (0.5x)**: Nice to have

## Comparison Format

**5-Star Rating System:**
- ⭐⭐⭐⭐⭐ (5/5): Excellent
- ⭐⭐⭐⭐ (4/5): Very Good
- ⭐⭐⭐ (3/5): Good/Acceptable
- ⭐⭐ (2/5): Concerns/Weak
- ⭐ (1/5): Significant issues

Each rating includes brief explanation.

## Expected Duration

60-90 minutes depending on:
- Number of options (2-5 typical)
- Number of criteria (5-10 typical)
- Depth of research required
- Availability of data

## Output

**Technology Comparison Matrix Document** (`comparison-matrix-[date].md`):
- Executive summary with recommendation
- Detailed comparison matrix table with star ratings
- Weighted scoring with transparent calculations
- In-depth criteria analysis
- Trade-off exploration (Performance/DX, Stability/Innovation, Cost/Features, Learning/Power)
- Ranking and recommendation with rationale
- Alternative scenario analysis
- Risk assessment by option
- Decision tree diagram (Mermaid)
- Supporting data (adoption, performance, community)
- References and sources

## Interaction Style

- **Intent-based**: Collaborative criteria definition and analysis
- **High interactivity**: Guided research and scoring process
- **Data-driven**: Objective analysis backed by metrics
- **Analytical**: Structured comparison framework
- **Transparent**: Clear methodology and calculations

## Key Features

**Objective Analysis:**
- Data-driven ratings
- Transparent scoring methodology
- Multiple information sources
- Honest acknowledgment of trade-offs

**Comprehensive Coverage:**
- Multiple evaluation criteria
- Weighted scoring system
- Trade-off analysis
- Alternative scenarios
- Risk assessment

**Decision Support:**
- Clear recommendation
- Rationale with evidence
- Conditions for reconsidering
- Decision tree guidance
- Alternative scenario planning

**Visual Communication:**
- Comparison matrix table
- Weighted score breakdown
- Decision tree diagram
- Star rating system

## Trade-Off Analysis

**Core Trade-Offs Explored:**
1. **Performance vs Developer Experience** - Speed vs ease of use
2. **Stability vs Innovation** - Proven vs cutting-edge
3. **Cost vs Features** - Budget vs capabilities
4. **Learning Curve vs Power** - Easy vs powerful

Each trade-off is analyzed in context of the specific comparison.

## Alternative Scenarios

Explores how recommendation changes under different constraints:
- **Budget Constrained** - Minimal cost option
- **Time Constrained** - Fastest to implement
- **Skill Limited** - Easiest to learn
- **Scale Changed** - Growth-optimized option

Provides decision flexibility for changing circumstances.

## Best Practices

- **Objective criteria**: Define evaluation framework collaboratively
- **Weighted importance**: Not all criteria matter equally
- **Data-backed ratings**: Use metrics and evidence
- **Transparent scoring**: Show all calculations
- **Honest trade-offs**: Acknowledge compromises
- **Multiple scenarios**: Plan for constraint changes
- **Risk-aware**: Assess risks for each option
- **SMB-appropriate**: Evaluate fit for scale level

## Use Cases

**When to Use Comparison Matrix:**
- Choosing between 2-5 similar technology options
- Need objective, data-driven decision support
- Multiple stakeholders need to align on choice
- Want to document decision rationale
- Exploring trade-offs between alternatives
- Validating a preliminary choice
- Planning for different scenarios

**Example Comparisons:**
- Frontend: React vs Vue vs Svelte
- Backend: Node/Express vs Python/Django vs Ruby/Rails
- Database: PostgreSQL vs MySQL vs MongoDB
- Hosting: AWS vs Azure vs DigitalOcean
- Auth: Auth0 vs Firebase Auth vs Custom

## Next Steps

After comparison analysis, typical next workflows:
- **Materials Selection** (`*materials` via Scout) - Make final selection with refined criteria
- **Architecture Design** (`*blueprint` via Jordan) - Design architecture with selected technology
- **Production Validation** (`*validate` via Sam) - Validate recommended option for production
- **Deep Research** (`*research` via Scout) - Research recommended option in more detail
- **Final Documentation** (`*generate` via Casey) - Incorporate comparison into deliverables

## Notes

- Integrates with Scout's knowledge base for technology data
- Emphasizes objective, data-driven analysis
- Includes validation checklist for quality assurance
- Suitable for both pre-selection comparison and validation of existing choices
- Designed for 2-5 options (not exhaustive surveys)
- Focuses on practical decision-making for SMB context
- Creates documentation for stakeholder alignment
- Useful for both technical and non-technical audiences
