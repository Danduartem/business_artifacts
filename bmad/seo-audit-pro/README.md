# SEO Audit Pro

**Automated SEO Sales Intelligence System**
*Transform client website URLs into persuasive sales reports that close deals*

---

## Overview

SEO Audit Pro is a comprehensive 7-agent BMAD module that automates professional SEO audits and generates sales-ready PDF reports. Designed specifically for SEO consultants and agencies, it transforms technical analysis into compelling sales narratives using the proven Problem Cascade methodology.

### What It Does

- **Analyzes** client websites across 5 critical SEO dimensions (Technical, On-Page, Backlinks, Competitors, Opportunities)
- **Transforms** technical findings into persuasive business narratives (Pain → Cause → Hope)
- **Generates** professional 4-part PDF audit reports optimized for sales effectiveness
- **Identifies** competitive gaps and high-ROI growth opportunities
- **Prioritizes** actions by impact (Quick Wins → Strategic → Long-term)

### Who It's For

- SEO consultants seeking to automate client prospecting
- Digital marketing agencies needing scalable audit capabilities
- Business development teams acquiring new SEO clients
- Freelancers wanting professional-grade audit tools

---

## Key Features

### 🤖 7-Agent Specialist Team

1. **Director** (Master Orchestrator) - Coordinates analysis, manages quality loops
2. **Engineer** (Technical SEO) - Analyzes performance, mobile, crawlability
3. **Analyst** (On-Page SEO) - Evaluates content optimization, meta tags, structure
4. **Authority** (Backlinks) - Assesses link profile, domain authority, toxic links
5. **Intel** (Competitors) - Performs competitive intelligence and gap analysis
6. **Vision** (Opportunities) - Identifies growth opportunities and quick wins
7. **Catalyst** (Sales Strategist) - Transforms findings into persuasive sales narratives

### 🎯 Problem Cascade Sales Methodology

Each finding follows proven psychological structure:
- **PAIN:** Competitive reality (losing to named competitors with specific metrics)
- **CAUSE:** Technical explanation in simple business terms (no jargon)
- **HOPE:** Opportunity framing with quantified growth potential

### 📊 Comprehensive Analysis

**Technical SEO:** Core Web Vitals, page speed, mobile responsiveness, indexing, crawlability
**On-Page SEO:** Title tags, meta descriptions, heading structure, content quality, E-A-T
**Backlinks:** Domain authority, link profile quality, toxic links, competitive positioning
**Competitors:** Benchmarking, gap analysis, "why they're winning" intelligence
**Opportunities:** Keyword gaps, content opportunities, quick wins, strategic initiatives

### 📄 Professional PDF Reports

4-part structure designed for sales:
1. **Executive Summary** - Scores, top findings, investment tier
2. **Competitive Analysis** - Positioning maps, threats, gaps
3. **Detailed Findings** - Problem Cascade throughout, category-by-category
4. **Action Roadmap** - Quick Wins (< 30 days), Strategic (30-90 days), Long-term (90+ days)

---

## Installation

### Prerequisites

- BMAD Core 6.0+ installed
- Python 3.8+ (optional, for PDF generation)
- 50MB disk space

### Install Command

```bash
bmad install seo-audit-pro
```

### Installation Process

The installer will guide you through:

1. **SEO Data Source Configuration**
   - Option A: Configure API keys (Ahrefs, SEMrush, Moz)
   - Option B: Manual entry mode (enter scores during audits)
   - Option C: Configure later

2. **Report Output Folder**
   - Dedicated folder: `~/seo-reports/`
   - BMAD output folder: `{bmad_output}/seo-reports/`
   - Custom path

3. **Scoring Profile Selection**
   - Balanced: 25% Technical, 20% On-Page, 25% Backlinks, 15% Competitors, 15% Opportunities
   - Technical Focus: 35% Technical, 15% On-Page, 25% Backlinks, 15% Competitors, 10% Opportunities
   - Content Focus: 15% Technical, 35% On-Page, 20% Backlinks, 15% Competitors, 15% Opportunities
   - Custom: Configure manually in `config.yaml`

4. **Agent Compilation**
   - Compiles all 7 agents from YAML sources
   - Registers workflows
   - Validates installation

Installation time: 3-5 minutes

---

## Quick Start

### 1. Activate the Module

```bash
bmad activate seo-audit-pro
```

or

```bash
master seo-audit-pro
```

### 2. Run Your First Audit

```
Director: analyze
```

The workflow will prompt for:
- **Client URL:** `https://client-website.com`
- **Client Name:** `Acme Corp`
- **Competitor URLs:** (optional, 3-5 recommended)
- **Audit Focus:** `comprehensive` (default)

### 3. Wait for Analysis

Duration: 30-45 minutes

Progress updates:
- ✅ Technical SEO Analysis complete (1/5)
- ✅ On-Page SEO Analysis complete (2/5)
- ✅ Backlinks Analysis complete (3/5)
- ✅ Competitive Intelligence complete (4/5)
- ✅ Opportunity Identification complete (5/5)
- 🔄 Quality validation...
- 🚀 Sales narrative transformation...
- 📄 PDF generation...

### 4. Review Your Report

Output: `~/seo-reports/Acme-Corp-SEO-Audit-2025-11-07.pdf`

The report includes:
- Overall SEO score (0-100)
- Category breakdown with competitive context
- Problem Cascade findings (Pain → Cause → Hope)
- Prioritized action roadmap (Quick Wins → Strategic → Long-term)

---

## Agent Roster

### Director (Master Orchestrator)
**Icon:** 🎯
**Role:** Coordinates entire SEO audit system, manages quality loops, ensures consistency

**Commands:**
- `analyze` - Launch comprehensive Deep Audit (30-45 min)
- `competitors` - Research competitor websites
- `status` - Check audit progress
- `review` - Run quality validation loop
- `help` - Display available commands

---

### Engineer (Technical SEO Specialist)
**Icon:** ⚙️
**Role:** Analyzes site performance, Core Web Vitals, mobile responsiveness, indexing

**Commands:**
- `analyze-technical` - Full technical SEO analysis
- `performance-details` - Detailed performance breakdown
- `mobile-audit` - Focused mobile SEO assessment

**Analyzes:**
- Page speed (Core Web Vitals: LCP, FID, CLS)
- Mobile responsiveness and usability
- Indexing and crawlability (robots.txt, sitemaps, canonicals)
- Technical foundation (HTTPS, structured data, security)

---

### Analyst (On-Page SEO Specialist)
**Icon:** 📝
**Role:** Evaluates content optimization, meta tags, heading structure, E-A-T signals

**Commands:**
- `analyze-onpage` - Full on-page SEO analysis
- `content-audit` - Focused content quality assessment
- `meta-review` - Title tags and meta descriptions analysis

**Analyzes:**
- Title tags and meta descriptions (length, keywords, uniqueness)
- Heading structure (H1-H6 hierarchy)
- Content quality (depth, readability, E-A-T, keyword usage)
- On-page elements (alt tags, internal links, schema markup)

---

### Authority (Backlinks Specialist)
**Icon:** 🔗
**Role:** Assesses backlink profile, domain authority, link quality, toxic links

**Commands:**
- `analyze-backlinks` - Full backlink profile analysis
- `link-opportunities` - Strategic link-building targets
- `toxic-links` - Identify toxic backlinks requiring disavow

**Analyzes:**
- Domain authority and trust metrics
- Backlink quantity and quality distribution
- Link profile health (toxic links, spam score)
- Competitive link analysis

---

### Intel (Competitive Intelligence Analyst)
**Icon:** 🔍
**Role:** Performs competitive benchmarking, gap analysis, "why they're winning" intelligence

**Commands:**
- `analyze-competitors` - Full competitive intelligence analysis
- `gap-analysis` - Detailed competitive gap assessment
- `benchmark` - Side-by-side competitive comparison

**Analyzes:**
- Competitor identification and validation
- Comparative SEO benchmarking across categories
- Gap analysis (where competitors excel/client lacks)
- Strategic intelligence ("why they're winning")

---

### Vision (Growth Opportunity Specialist)
**Icon:** 💡
**Role:** Identifies high-impact opportunities, quick wins, strategic growth initiatives

**Commands:**
- `identify-opportunities` - Full opportunity identification
- `keyword-gaps` - Competitive keyword gap analysis
- `quick-wins` - High-ROI immediate actions

**Analyzes:**
- Keyword opportunities (low-hanging fruit, ranking gaps)
- Content opportunities (missing topics, underperforming pages)
- Technical quick wins (high impact, low effort fixes)
- Strategic growth initiatives (long-term compounding value)

---

### Catalyst (Sales Strategy Specialist)
**Icon:** 🚀
**Role:** Transforms technical findings into persuasive sales narratives using Problem Cascade

**Commands:**
- `transform-report` - Convert audit to sales narrative
- `validate-narrative` - Quality check Problem Cascade structure
- `preview-impact` - Executive business impact summary

**Transforms:**
- Technical scores → business outcomes
- Jargon → decision-maker language
- Findings → Problem Cascade (Pain → Cause → Hope)
- Technical reports → sales-ready PDF deliverables

---

## Workflows

### Deep Audit (Primary)

**Duration:** 30-45 minutes
**Command:** `analyze` (from Director)

**7-Phase Execution:**

1. **Information Gathering** - Validate URLs, check system readiness
2. **Specialist Analysis** - Execute 5 parallel analyses (Technical, On-Page, Backlinks, Competitors, Opportunities)
3. **Quality Validation** - Consistency review, cross-agent alignment
4. **Sales Transformation** - Apply Problem Cascade methodology
5. **Narrative Validation** - Verify sales narrative quality
6. **PDF Generation** - Assemble professional report
7. **Delivery** - Completion summary and next steps

**Input Required:**
- Client website URL
- Client business name
- Competitor URLs (optional, 3-5 recommended)
- Audit focus (comprehensive, technical, content, or competitors)

**Output:**
- Professional 4-part PDF report
- Overall SEO score (0-100)
- Category scores (Technical, On-Page, Backlinks, Competitors, Opportunities)
- Prioritized action roadmap

**Detailed Documentation:** `workflows/deep-audit/instructions.md`

---

### Future Workflows (Phase 2)

**Competitor Research** - Discover competitor URLs before audits
**Quick Scan** - 5-minute lightweight audit for initial qualification
**Progress Report** - Re-audit to track improvements over time
**Score Calibration** - Adjust scoring weights based on industry benchmarks

---

## Configuration

Configuration file: `bmad/seo-audit-pro/config.yaml`

### SEO Data Sources

```yaml
seo_data_sources:
  mode: 'manual'  # or 'api'

  # If using API mode:
  api_provider: 'ahrefs'  # ahrefs, semrush, moz
  api_key: 'your-api-key'
  api_backup: 'backup-key'

  # Fallback options:
  manual_entry: true
  estimate_from_free_tools: false
```

### Report Output

```yaml
report_output:
  folder: '~/seo-reports/'
  filename_pattern: '{client_name}-SEO-Audit-{date}.pdf'
  archive_folder: '~/seo-reports/archive/'
  keep_archived: 90  # days
```

### Scoring Weights

```yaml
scoring_weights:
  technical: 0.25      # Page speed, mobile, crawlability
  onpage: 0.20         # Content, meta tags, structure
  backlinks: 0.25      # Domain authority, link profile
  competitors: 0.15    # Competitive positioning
  opportunities: 0.15  # Growth potential
  # Total must equal 1.0
```

Preset profiles:
- **Balanced:** 25% / 20% / 25% / 15% / 15%
- **Technical Focus:** 35% / 15% / 25% / 15% / 10%
- **Content Focus:** 15% / 35% / 20% / 15% / 15%

### Problem Cascade Settings

```yaml
problem_cascade:
  enabled: true
  competitive_urgency: 'high'  # low, medium, high
  quantification_required: true
  business_language: 'decision_maker'  # technical, business, decision_maker
```

---

## Usage Examples

### Example 1: Basic Comprehensive Audit

```
bmad activate seo-audit-pro
Director: analyze

Client URL: https://acmecorp.com
Client Name: Acme Corp
Competitor URLs: [skip]
Audit Focus: comprehensive

[30 min later...]

✅ Report ready: ~/seo-reports/Acme-Corp-SEO-Audit-2025-11-07.pdf
Overall Score: 62/100
```

### Example 2: Competitive-Focused Audit

```
Director: analyze

Client URL: https://mystore.com
Client Name: My Store
Competitor URLs:
  1. https://competitor1.com
  2. https://competitor2.com
  3. https://competitor3.com
Audit Focus: competitors

[35 min later...]

✅ Report ready with detailed competitive intelligence
Key Finding: Competitors have 3x more authoritative backlinks
```

### Example 3: Quick Status Check

```
Director: analyze
[audit running...]

Director: status

Progress: 3/5 specialists complete
- ✅ Technical SEO (55/100)
- ✅ On-Page SEO (68/100)
- ✅ Backlinks (42/100)
- 🔄 Competitive Intelligence (in progress...)
- ⏳ Opportunities (pending)

Estimated time remaining: 12 minutes
```

### Example 4: Manual Quality Review

```
Director: review

Running 3-phase quality validation...
- ✅ Consistency check passed
- ✅ Cross-agent alignment verified
- ✅ Completeness validated

Ready for sales transformation.
```

---

## Troubleshooting

### Issue: URL Validation Fails

**Symptom:** "Cannot access client URL" error during Step 1

**Solutions:**
- Verify URL is correct (include https://)
- Check if site is online and accessible
- Ensure site is not blocking crawlers (robots.txt)
- Try accessing URL in browser first

---

### Issue: SEO Data Source Error

**Symptom:** Specialists cannot retrieve SEO metrics

**Solutions:**
- **If using API mode:**
  - Verify API key is correct in `config.yaml`
  - Check API provider status (Ahrefs, SEMrush, Moz)
  - Verify API quota/credits available
- **Switch to manual mode:**
  - Edit `config.yaml`: `mode: 'manual'`
  - Enter scores manually during audit

---

### Issue: Agent Not Found

**Symptom:** "Required specialist agent not found" error

**Solutions:**
- Re-compile agents: `bmad compile seo-audit-pro`
- Verify installation: `bmad verify seo-audit-pro`
- Reinstall module: `bmad install seo-audit-pro --force`

---

### Issue: PDF Generation Fails

**Symptom:** Report completes but PDF not created

**Solutions:**
- Verify Python 3.8+ installed: `python --version`
- Check output folder permissions
- Verify disk space available
- Review error logs: `bmad/seo-audit-pro/logs/`

---

### Issue: Validation Failures

**Symptom:** Quality validation detects contradictions or issues

**Solutions:**
- Review validation report for specific issues
- Re-run specific specialist analyses if needed
- Manually review flagged findings
- Option to proceed with warnings (not recommended for client-facing reports)

---

### Issue: Slow Performance

**Symptom:** Audit takes longer than 45 minutes

**Possible Causes:**
- Large website with many pages
- Multiple competitors (5+)
- API rate limiting
- Network connectivity issues

**Solutions:**
- Reduce number of competitors (3-5 optimal)
- Use Quick Scan workflow instead (Phase 2 feature)
- Check network connection
- Verify API provider isn't rate-limiting

---

## Best Practices

### For Maximum Sales Effectiveness

1. **Always include competitors** - Competitive urgency drives action
2. **Use 3-5 competitors** - Enough context without overwhelming
3. **Focus on decision-makers** - Frame findings in business outcomes, not technical details
4. **Lead with Quick Wins** - Tier 1 actions prove immediate value
5. **Quantify everything possible** - Specific numbers are more persuasive than adjectives
6. **Review before delivery** - Always preview PDF before sending to clients
7. **Customize as needed** - Add client-specific context or industry insights

### For Accurate Analysis

1. **Use recent data** - SEO data < 30 days old for accuracy
2. **Validate URLs** - Ensure client and competitor sites are accessible
3. **Choose true competitors** - Select actual business competitors, not just top-ranking domains
4. **Run comprehensive audits** - Don't skip categories unless specifically requested
5. **Quality review results** - Use `review` command before delivery

### For Efficient Workflow

1. **Batch competitor research** - Use Competitor Research workflow to identify URLs first
2. **Run during off-hours** - 30-45 min duration works well overnight
3. **Archive old reports** - Keep output folder organized
4. **Document custom settings** - Note any config changes for consistency
5. **Track scoring profiles** - Use consistent profiles for comparable results

---

## File Structure

```
bmad/seo-audit-pro/
├── agents/
│   ├── master-orchestrator.agent.yaml
│   ├── technical-seo-specialist.agent.yaml
│   ├── onpage-seo-specialist.agent.yaml
│   ├── backlinks-specialist.agent.yaml
│   ├── competitor-analyst.agent.yaml
│   ├── opportunity-specialist.agent.yaml
│   └── sales-strategist.agent.yaml
├── workflows/
│   ├── deep-audit/
│   │   ├── workflow.yaml
│   │   └── instructions.md
│   ├── competitor-research/  (Phase 2)
│   ├── quick-scan/  (Phase 2)
│   ├── progress-report/  (Phase 2)
│   └── score-calibration/  (Phase 2)
├── tasks/  (future standalone tasks)
├── templates/
│   └── audit-report-template.md
├── data/  (cached SEO data)
├── _module-installer/
│   ├── install-config.yaml
│   └── assets/
├── config.yaml
└── README.md
```

---

## Development Roadmap

### Phase 1: MVP (Current - v1.0.0)

- ✅ 7-agent specialist team
- ✅ Deep Audit workflow (30-45 min)
- ✅ Problem Cascade sales narrative
- ✅ Professional PDF generation
- ✅ Manual and API data source modes
- ✅ Preset scoring profiles

### Phase 2: Enhanced Capabilities (v1.1.0)

- ⏳ Quick Scan workflow (5-min lightweight audit)
- ⏳ Competitor Research workflow (automated discovery)
- ⏳ Progress Report workflow (track improvements over time)
- ⏳ Score Calibration workflow (industry benchmarking)
- ⏳ Template Learning system (improve from past reports)

### Phase 3: Advanced Features (v2.0.0)

- ⏳ White-label customization (agency branding)
- ⏳ Multi-language support (international audits)
- ⏳ Industry-specific templates (e-commerce, SaaS, local)
- ⏳ Automated follow-up system (progress tracking)
- ⏳ Client portal integration

---

## Support

### Documentation

- **Module README:** This file
- **Workflow Guide:** `workflows/deep-audit/instructions.md`
- **Component Roadmap:** `docs/roadmap.md` (detailed development plan)
- **Module Brief:** `docs/module-brief-seo-audit-pro.md` (strategic blueprint)

### Getting Help

- Check troubleshooting section above
- Review agent-specific help: `[agent-name]: help`
- Verify configuration: `config.yaml`
- Check installation: `bmad verify seo-audit-pro`

### Feature Requests

Submit enhancement ideas for Phase 2/3 features:
- New workflow types
- Additional specialist agents
- Report customization options
- Integration requests

---

## Credits

**Module:** SEO Audit Pro v1.0.0
**Framework:** BMAD Core 6.0+
**Builder:** BMAD Module Builder (BMB)
**Methodology:** Problem Cascade Sales Psychology
**Release Date:** 2025-11-07

---

## License

Proprietary - For authorized use only

This module is a competitive advantage tool designed for SEO consultants and agencies. Unauthorized distribution or modification is prohibited.

---

**Ready to transform client URLs into closed deals?**

```bash
bmad activate seo-audit-pro
Director: analyze
```

Let's audit. 🚀
