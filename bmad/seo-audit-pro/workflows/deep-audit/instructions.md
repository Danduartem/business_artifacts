# Deep SEO Audit Workflow

## Overview

The Deep SEO Audit workflow is the comprehensive analysis engine of the SEO Audit Pro module. It orchestrates all 7 specialist agents to produce sales-ready PDF audit reports designed to close deals.

**Duration:** 30-45 minutes
**Agents Used:** All 7 (Director, Engineer, Analyst, Authority, Intel, Vision, Catalyst)
**Output:** Professional 4-part PDF audit report with Problem Cascade sales narrative

---

## Workflow Purpose

This workflow transforms a client website URL into a persuasive sales weapon:

1. **Analyzes** 5 critical SEO categories (Technical, On-Page, Backlinks, Competitors, Opportunities)
2. **Validates** findings through quality loops ensuring consistency
3. **Transforms** technical data into compelling business narratives using Problem Cascade methodology
4. **Generates** professional PDF reports optimized for sales effectiveness

---

## Prerequisites

Before running this workflow, ensure:

- [ ] SEO Audit Pro module is fully installed
- [ ] All 7 agents are compiled and available
- [ ] Module configuration (`config.yaml`) includes:
  - `seo_data_sources` (configured SEO API keys or data access)
  - `report_output_folder` (where PDFs will be saved)
  - `scoring_weights` (category weighting for overall score calculation)
- [ ] Client website URL is accessible
- [ ] (Optional) Competitor URLs identified (3-5 recommended)

---

## Execution Steps

### **Step 1: Information Gathering & Validation**

**Agent:** Director (Master Orchestrator)

**Purpose:** Validate inputs and confirm system readiness

**Actions:**
- Collect and validate client URL
- Verify competitor URLs (if provided)
- Test SEO data source connectivity
- Confirm all specialist agents are available
- Load scoring weights from configuration

**User Input Required:**
- Client website URL (required)
- Client business name (required)
- Competitor URLs (optional, 3-5 recommended)
- Audit focus (optional: comprehensive, technical, content, or competitors)

**Success Criteria:**
- All pre-flight checklist items pass
- URLs are accessible
- SEO data sources respond
- All agents available

**If Errors:**
- URL inaccessible → Verify URL is correct and site is online
- Data source error → Check API keys in module config
- Agent unavailable → Re-compile agents or verify installation

---

### **Step 2: Parallel Specialist Analysis**

**Agent:** Director (coordinating 5 specialists)

**Purpose:** Execute comprehensive SEO analysis across all categories

**Specialist Execution Order:**

**2.1 - Technical SEO (Engineer)**
- Analyzes: Page speed, Core Web Vitals, mobile responsiveness, indexing, crawlability
- Output: Technical score (0-100) + prioritized technical issues
- Duration: 5-8 minutes

**2.2 - On-Page SEO (Analyst)**
- Analyzes: Title tags, meta descriptions, heading structure, content quality
- Output: On-Page score (0-100) + optimization recommendations
- Duration: 5-8 minutes

**2.3 - Backlinks (Authority)**
- Analyzes: Domain authority, backlink profile, link quality, toxic links
- Output: Backlinks score (0-100) + link profile assessment
- Duration: 5-8 minutes

**2.4 - Competitive Intelligence (Intel)**
- Analyzes: Competitor positioning, benchmarking, gap analysis
- Output: Competitors score (0-100) + competitive positioning map
- Duration: 8-12 minutes (depends on number of competitors)

**2.5 - Growth Opportunities (Vision)**
- Analyzes: Keyword gaps, content opportunities, quick wins, strategic initiatives
- Output: Opportunities score (0-100) + prioritized action roadmap
- Duration: 5-8 minutes

**Aggregation:**
- Calculate overall SEO score using configured weights
- Example: `(Technical × 0.25) + (On-Page × 0.20) + (Backlinks × 0.25) + (Competitors × 0.15) + (Opportunities × 0.15) = Overall Score`

**Success Criteria:**
- All 5 specialists complete successfully
- All category scores generated (0-100)
- Sufficient detail captured for narrative transformation

---

### **Step 3: Quality Review & Consistency Validation**

**Agent:** Director (Master Orchestrator)

**Purpose:** Ensure findings are consistent, complete, and logically aligned

**Validation Phases:**

**3.1 - Consistency Review**
- Check: Do specialist findings align logically?
- Check: Are there contradictions across categories?
- Check: Are scoring calculations correct per configured weights?

**3.2 - Cross-Agent Validation**
- Check: Do technical issues align with opportunity recommendations?
- Check: Do competitive findings match specialist assessments?
- Check: Are opportunity priorities grounded in actual findings?

**3.3 - Completeness Check**
- Check: All required data points present?
- Check: All 5 scores generated?
- Check: Sufficient detail for sales transformation?

**Success Criteria:**
- No logical contradictions detected
- Scoring calculations verified
- All data points complete

**If Validation Fails:**
- Flag specific issues for manual review
- Option to re-run specific specialist analyses
- Option to proceed with warnings (not recommended)

---

### **Step 4: Sales Narrative Transformation**

**Agent:** Catalyst (Sales Strategist)

**Purpose:** Transform technical audit into persuasive sales narrative using Problem Cascade

**Process:**

**4.1 - Business Impact Translation**
- Convert technical scores → business outcomes
- Example: "Technical SEO 55/100" → "Your site loads 3.2 seconds slower than competitors, costing ~40% of mobile visitors"

**4.2 - Problem Cascade Construction**
For each major finding:
- **PAIN:** Show competitive reality (losing to named competitors with specific metrics)
- **CAUSE:** Explain why in simple business terms (no jargon)
- **HOPE:** Frame opportunity with quantified potential gains

**4.3 - Report Section Assembly**
Generate 4-part structure:
- Part 1: Executive Summary (scores, top findings, investment tier)
- Part 2: Competitive Analysis (positioning map, "why they're winning")
- Part 3: Detailed Findings (Problem Cascade throughout)
- Part 4: Action Roadmap (Quick Wins → Strategic → Long-term)

**Success Criteria:**
- All technical jargon translated to business language
- Problem Cascade structure applied throughout
- Competitive urgency framing integrated
- Quantification used wherever possible

---

### **Step 5: Sales Narrative Quality Validation**

**Agent:** Catalyst (Sales Strategist)

**Purpose:** Verify sales narrative meets quality and persuasiveness standards

**Validation Checks:**
- Problem Cascade compliance (all major findings follow structure)
- Business language audit (no remaining jargon)
- Competitive urgency assessment (FOMO without pressure)
- Quantification verification (numbers vs. vague adjectives)
- Professional tone check (credible but compelling)

**Success Criteria:**
- All validation checks pass
- Narrative ready for client presentation

**If Issues Found:**
- Flag specific sections needing revision
- Option to auto-revise or manual edit
- Re-validate after corrections

---

### **Step 6: PDF Report Generation**

**Agent:** Director (Master Orchestrator)

**Purpose:** Assemble final professional PDF report

**Report Structure:**
- Cover page (client name, date, overall score)
- Table of contents
- Part 1: Executive Summary
- Part 2: Competitive Analysis
- Part 3: Detailed Findings (by category)
- Part 4: Action Roadmap
- Appendix: Methodology notes

**Formatting:**
- Professional business template
- Charts and visualizations for scores
- Competitive positioning maps
- Color-coded priority indicators

**Output:**
- File location: `{report_output_folder}/{client_name}-SEO-Audit-{date}.pdf`
- Filename example: `Acme-Corp-SEO-Audit-2025-11-07.pdf`

**Success Criteria:**
- PDF generated successfully
- All sections included
- Charts and visualizations render correctly

---

### **Step 7: Delivery & Summary**

**Agent:** Director (Master Orchestrator)

**Purpose:** Present completion summary and next steps

**Deliverables:**
- PDF file path
- Overall SEO score
- Score breakdown by category
- Executive summary preview
- Next steps guidance

**Completion Message:**
```
✅ Deep SEO Audit Complete!

File: /path/to/Acme-Corp-SEO-Audit-2025-11-07.pdf
Overall SEO Score: 62/100
Date: 2025-11-07

Score Breakdown:
- Technical SEO: 55/100
- On-Page SEO: 68/100
- Backlinks: 42/100
- Competitive Position: 58/100
- Opportunities: 87/100

The report is ready for client presentation and designed to close deals.

Next Steps:
1. Review complete PDF report
2. Customize any sections for client presentation
3. Schedule client meeting
4. Use Problem Cascade to build urgency
5. Focus on Tier 1 Quick Wins for immediate value
```

---

## Output Format

### **PDF Report Structure**

**Part 1: Executive Summary** (1-2 pages)
- Overall SEO score with visual gauge
- Competitive positioning summary
- Top 3-5 critical findings (business impact framed)
- Investment recommendation tier (Quick Wins / Strategic / Comprehensive)

**Part 2: Competitive Analysis** (2-3 pages)
- Competitive positioning map (visual)
- Category-by-category competitor comparison table
- "Why they're winning" analysis
- Biggest competitive threats and gaps

**Part 3: Detailed Findings** (8-12 pages)
- Technical SEO findings (Problem Cascade structure)
- On-Page SEO findings (Problem Cascade structure)
- Backlinks findings (Problem Cascade structure)
- Each finding includes: Pain (competitive reality) → Cause (technical explanation) → Hope (opportunity framing)

**Part 4: Action Roadmap** (2-4 pages)
- Tier 1 Quick Wins (immediate, high-ROI, < 30 days)
- Tier 2 Strategic Priorities (30-90 days, medium effort)
- Tier 3 Long-term Investments (90+ days, strategic authority building)
- Each action includes: effort estimate, impact score, expected ROI, timeline

**Appendix** (1-2 pages)
- Methodology notes
- Data sources
- Scoring calculation explanation

---

## Error Handling

### **Common Issues & Solutions**

**Issue: URL Inaccessible**
- **Symptom:** Step 1 pre-flight fails with URL validation error
- **Solution:** Verify client URL is correct, site is online, and not blocking crawlers

**Issue: SEO Data Source Error**
- **Symptom:** Step 2 specialists cannot access SEO metrics
- **Solution:** Check API keys in module config, verify data source connectivity

**Issue: Agent Unavailable**
- **Symptom:** Workflow cannot find required specialist agent
- **Solution:** Re-compile agents, verify module installation, check agent file paths

**Issue: Validation Failure**
- **Symptom:** Step 3 quality validation detects contradictions
- **Solution:** Review flagged issues, re-run specific analyses, or proceed with warnings (not recommended)

**Issue: Narrative Quality Issues**
- **Symptom:** Step 5 validation flags jargon or weak Problem Cascade
- **Solution:** Auto-revise flagged sections or manually edit narrative

**Issue: PDF Generation Failure**
- **Symptom:** Step 6 cannot create PDF file
- **Solution:** Verify output folder permissions, check template file exists

---

## Configuration Requirements

### **Module Config (`config.yaml`)**

```yaml
seo_data_sources:
  primary_api: 'your-seo-api-key'  # e.g., Ahrefs, SEMrush, Moz
  backup_api: 'backup-key'
  manual_entry: true  # Allow manual score entry if APIs unavailable

report_output_folder: '/path/to/seo-reports/'

scoring_weights:
  technical: 0.25
  onpage: 0.20
  backlinks: 0.25
  competitors: 0.15
  opportunities: 0.15
  # Total must equal 1.0

problem_cascade:
  enabled: true
  competitive_urgency: 'high'  # low, medium, high
  quantification_required: true
```

---

## Best Practices

### **For Best Results:**

1. **Competitor Selection:** Provide 3-5 true competitors (not just top domains, but actual business competitors)
2. **Data Quality:** Ensure SEO data sources have fresh data (< 30 days old)
3. **Review Before Delivery:** Always review the PDF before sending to clients
4. **Customize:** Add client-specific context or customize sections as needed
5. **Follow Up:** Use Tier 1 Quick Wins as immediate action items to demonstrate value

### **Sales Effectiveness:**

- **Problem Cascade works:** The Pain → Cause → Hope structure creates psychological momentum
- **Competitive urgency drives action:** Showing clients losing to named competitors is powerful
- **Quantification builds credibility:** Use specific numbers (rankings, traffic, revenue estimates)
- **Tier 1 Quick Wins close deals:** Immediate wins prove value and build trust

---

## Workflow Execution Command

To run this workflow from Director (Master Orchestrator):

```
analyze
```

This triggers the full Deep SEO Audit workflow with all 7 agents.

---

## Related Workflows

- **Competitor Research Workflow:** Discover competitor URLs before running Deep Audit
- **Quick Scan Workflow** (Phase 2): 5-minute lightweight audit for initial qualification
- **Progress Report Workflow** (Phase 2): Re-audit to track improvements over time
- **Score Calibration Workflow** (Phase 2): Adjust scoring weights based on industry benchmarks

---

## Version History

**v1.0.0** (2025-11-07)
- Initial Deep Audit workflow
- 7-agent orchestration
- Problem Cascade sales narrative
- 4-part PDF report generation

---

## Support

For issues or questions about this workflow:
- Review module documentation: `README.md`
- Check agent definitions: `agents/*.agent.yaml`
- Verify configuration: `config.yaml`
- Consult component roadmap: `docs/roadmap.md`
