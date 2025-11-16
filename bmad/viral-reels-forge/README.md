# Viral Reels Forge

Break through your Instagram growth plateau with data-driven viral content strategy.

## Overview

Viral Reels Forge is a multi-agent research and ideation system that analyzes Instagram-specific trends, competitors, algorithms, and user strengths to generate 25 ranked Instagram Reel ideas with the highest viral potential for breaking through growth plateaus.

This module provides:
- **Multi-Agent Intelligence:** 6 specialized agents for comprehensive research
- **Data-Driven Rankings:** Ideas scored by actual viral probability, not guesswork
- **Instagram-Laser-Focused:** Optimized specifically for Instagram Reels algorithm
- **Niche-Adaptive:** Works for any business vertical or content niche
- **Fresh Data Guaranteed:** Enforces strict data freshness rules (trends ≤7 days)

## Installation

```bash
bmad install viral-reels-forge
```

During installation, you'll configure:
- Number of ideas to generate (default: 25)
- Your Instagram handle (optional, for personal content audit)

## Components

### Agents (1)

**Forge Master** 🔥
- **Role:** Instagram Viral Research Coordinator
- **Type:** Module Agent
- **Purpose:** Orchestrates the entire multi-agent viral idea generation process
- **Commands:** 7 workflows for research and idea generation

### Workflows (6)

1. **full-viral-idea-generation** ⭐ (Main)
   - Generate 25 ranked Instagram Reel ideas with full multi-agent research
   - Orchestrates: Niche Analyst → Competitor Detective → Trend Hunter → Pattern Detective → Idea Architect → Viral Strategist
   - Output: Comprehensive report with ranked ideas

2. **quick-niche-analysis**
   - Fast Instagram niche landscape analysis
   - Output: Niche research report

3. **competitor-deep-dive**
   - Deep dive competitor intelligence report
   - Analyzes 3-5 competitor Instagram accounts
   - Output: Competitor analysis with content gaps

4. **trend-report**
   - Scan current viral Reels and trending content
   - Output: Trending audio, formats, effects report

5. **personal-content-audit**
   - Analyze your past Instagram Reel performance patterns
   - Output: What worked vs what didn't + recommendations

6. **idea-refresh**
   - Generate new ideas using previous research (fast refresh)
   - Output: 25 new ranked ideas without repeating full research

## Quick Start

### 1. Load the Forge Master Agent

After installation and compilation:

```
agent forge-master
```

### 2. View Available Commands

```
*help
```

### 3. Generate Viral Reel Ideas

```
*generate-viral-ideas
```

The workflow will guide you through:
- Describing your niche/business
- Providing optional Instagram handle for personal audit
- Providing optional competitor handles (or it will find them)

After 10-15 minutes of research and synthesis, you'll receive a comprehensive report with 25 ranked Reel ideas.

## Module Structure

```
viral-reels-forge/
├── agents/
│   └── forge-master.agent.yaml       # Instagram Viral Research Coordinator
├── workflows/
│   ├── full-viral-idea-generation/   # Main orchestrated workflow
│   ├── quick-niche-analysis/         # [TODO: To be created]
│   ├── competitor-deep-dive/         # [TODO: To be created]
│   ├── trend-report/                 # [TODO: To be created]
│   ├── personal-content-audit/       # [TODO: To be created]
│   └── idea-refresh/                 # [TODO: To be created]
├── templates/                        # Shared report templates
├── data/                             # Module data files
├── _module-installer/
│   └── install-config.yaml          # Installation configuration
├── config.yaml                       # Generated during installation
└── README.md                         # This file
```

## Configuration

The module can be configured in `bmad/viral-reels-forge/config.yaml`

### Key Settings:

**User-Configurable:**
- `idea_count`: Number of ideas to generate (default: 25)
- `instagram_handle`: Your Instagram handle for personal audits (optional)

**Data Freshness Rules (Static):**
- `trend_data_max_age_days`: 7 (trends must be from last week)
- `competitor_data_max_age_days`: 30 (competitor data from last month)
- `niche_data_max_age_days`: 90 (niche insights from last 3 months)
- `user_data_max_age_days`: 180 (user's performance history up to 6 months)

These freshness rules ensure you're always working with current Instagram trends, not outdated information.

## Use Cases

### Use Case 1: First-Time Viral Idea Generation
**Scenario:** Fitness coach stuck at 5K followers for 6 months
- Run: `*generate-viral-ideas`
- Input: "fitness coaching for busy professionals", IG handle, 3 competitors
- Output: 25 ranked Reel ideas specifically for fitness coaching niche
- Result: Data-driven content plan for next 2 months

### Use Case 2: Monthly Trend Refresh
**Scenario:** Stay on top of changing Instagram trends
- Run: `*scan-trends` monthly
- Input: Your niche
- Output: Current trending audio, formats, and viral patterns
- Result: Adapt content to ride trending waves

### Use Case 3: Competitor Intelligence
**Scenario:** Understand what's working for competitors
- Run: `*analyze-competitors`
- Input: 5 competitor IG handles
- Output: What's working for them + content gaps you can exploit
- Result: Strategic positioning insights

### Use Case 4: Personal Performance Audit
**Scenario:** Figure out why some Reels perform better than others
- Run: `*audit-content`
- Input: Your Instagram handle
- Output: Pattern analysis of successful vs unsuccessful Reels
- Result: Understand your strengths and double down

### Use Case 5: Quick Idea Refresh
**Scenario:** Already did research, need more ideas fast
- Run: `*refresh-ideas`
- Input: Minimal (uses cached research)
- Output: 25 NEW ranked ideas without repeating research
- Result: Fast turnaround for ongoing content needs

## How It Works: The Multi-Agent System

### Research Phase (4 Agents)

**1. Instagram Niche Analyst**
- Researches how your specific niche performs on Instagram
- Identifies niche-specific viral mechanics and psychological triggers
- Maps audience behavior patterns
- Finds content saturation and fresh angles

**2. Instagram Competitor Detective**
- Analyzes competitor Instagram Reels (last 30 days)
- Identifies successful formats, hooks, and patterns
- Finds content gaps and opportunities
- Determines what's saturated vs underutilized

**3. Instagram Trend Hunter**
- Scans viral Reels from last 7 days (most current data)
- Tracks trending audio, effects, templates
- Identifies breakout content early
- Monitors Instagram features driving reach

**4. Instagram Pattern Detective** (Optional)
- Analyzes your past Reel performance
- Identifies what worked vs what didn't
- Determines your unique strengths and authentic voice
- Ensures ideas align with your brand

### Synthesis Phase (2 Agents)

**5. Reel Idea Architect**
- Synthesizes all research into 25 concrete Reel ideas
- Each idea includes: hook, concept, format, trending element, viral factors
- Ensures variety: educational, entertaining, relatable, transformational
- Optimizes for Instagram algorithm (watch time, saves, shares)

**6. Instagram Viral Strategist (Forge Master)**
- Ranks all ideas by viral probability (1-100 score)
- Applies weighted criteria: algorithm favorability, trend alignment, niche fit, execution feasibility, differentiation
- Provides strategic rationale for each ranking
- Delivers final ranked list (#1 = highest viral potential)

## Examples

### Example Output Structure

```markdown
## Idea #1: [Title] - Viral Probability Score: 92/100

**Hook:** "Stop doing [common mistake]! Here's what actually works..."

**Core Concept:** Educational Reel addressing the #1 pain point in your niche
with a contrarian take that challenges conventional wisdom.

**Format:** Direct-to-camera with text overlay bullets

**Trending Element:** Uses trending audio "XYZ" (500K+ Reels this week)

**Viral Potential Factors:**
- High save rate (actionable value)
- Strong hook triggers pattern interrupt
- Controversy drives comments
- Shareability to friends facing same issue

**Instagram Optimization:**
- 15-second length (optimal watch time completion)
- Text overlay for sound-off viewing
- Clear CTA to follow for more tips (retention)

**Strategic Rationale:** This idea ranks #1 because it combines proven
viral mechanics (contrarian angle), current trending audio, and addresses
the most common pain point identified in niche research. Execution is
straightforward, and format is proven to drive saves and shares.
```

## Development Roadmap

### Phase 1: Core Module (Current - MVP) ✅
- ✅ Module structure and installer
- ✅ Forge Master agent (coordinator)
- ✅ Full Viral Idea Generation workflow
- ⏳ 5 standalone workflows (placeholders created)

### Phase 2: Complete Workflow Portfolio
- [ ] Quick Niche Analysis workflow
- [ ] Competitor Deep Dive workflow
- [ ] Trend Report workflow
- [ ] Personal Content Audit workflow
- [ ] Idea Refresh workflow

### Phase 3: Additional Agents (Future)
- [ ] Instagram Niche Analyst (standalone agent)
- [ ] Instagram Competitor Detective (standalone agent)
- [ ] Instagram Trend Hunter (standalone agent)
- [ ] Instagram Pattern Detective (standalone agent)
- [ ] Reel Idea Architect (standalone agent)

### Phase 4: Enhanced Features
- [ ] Instagram API integration (if available)
- [ ] Performance tracking workflow
- [ ] Machine learning feedback loop (track which ideas actually went viral)
- [ ] Content calendar generation
- [ ] Script generation module integration (Phase 2 separate module)

## Success Metrics

After using this module, track these indicators:

### Content Performance:
- **Views:** Aim for 3-5x your average
- **Engagement Rate:** Higher than baseline
- **Save Rate:** Strong indicator of valuable content
- **Share Rate:** Viral content gets shared extensively
- **Comments:** Higher engagement signals algorithm boost

### Business Impact:
- **Follower Growth:** Track spikes after implementing ideas
- **Profile Visits:** Increased discovery
- **Link Clicks:** Better conversion if applicable
- **DM Volume:** More audience connection

### Strategic Insights:
- **Idea Hit Rate:** What % of top-ranked ideas performed well?
- **Niche Accuracy:** Did niche analysis match reality?
- **Trend Timing:** Were trends still hot when you posted?
- **Personal Fit:** Did personalized ideas work better?

## Best Practices

### For Optimal Results:

1. **Run Monthly:** Instagram trends change rapidly - refresh your intelligence regularly
2. **Execute Authentically:** High viral probability requires authentic execution in your voice
3. **Test Top 10:** Focus on highest-ranked ideas first
4. **Track Performance:** Monitor which ideas actually perform to refine future generations
5. **Stay Current:** Viral mechanics evolve - don't rely on old research
6. **Quality Matters:** Great idea + poor execution = poor results
7. **Be Consistent:** Post regularly to capitalize on viral momentum

### Data Freshness:

This module enforces strict data freshness to ensure viral relevance:
- Trends change weekly - refresh often
- Algorithm updates affect what works
- Competitor strategies evolve
- Your audience behavior shifts

Run the full research workflow at least monthly to stay ahead.

## Troubleshooting

### "Ideas don't feel right for my brand"
- Run personal content audit (*audit-content) to align with your strengths
- Select ideas ranked high that also match your authentic voice
- Execution in your style matters more than perfect idea adherence

### "Trends seem outdated"
- Check data collection dates in report
- Re-run workflow if data is >7 days old for trends
- Instagram trends move fast - this is normal

### "Too many ideas, overwhelmed"
- Focus on top 10 highest-ranked only
- Select 3-5 you can execute this month
- Ignore lower-ranked ideas until you've tested top performers

### "Not enough competitor data"
- Provide more competitor handles (up to 5)
- Let workflow find competitors if you don't know any
- Run dedicated competitor deep-dive workflow

### "Ideas are too similar"
- Idea Architect ensures variety - check if you're only looking at one content type
- Try filtering for different viral factors (educational vs entertaining)
- Run idea-refresh for alternate approaches

## Contributing

To extend this module:

### Add New Workflows:
```
workflow create-workflow
```
Choose module: `viral-reels-forge`

### Add New Agents:
```
workflow create-agent
```
Choose module: `viral-reels-forge`

### Improve Existing Components:
- Edit agent YAML files in `agents/`
- Update workflow instructions in `workflows/*/instructions.md`
- Enhance templates in `workflows/*/template.md`

## Technical Details

### Requirements:
- BMAD Method v6.0+
- Web search capability (for trend and competitor research)
- Internet connection (for fresh data gathering)

### Data Sources:
- Web search for Instagram trends and viral content
- Competitor account analysis (public Instagram data)
- User's public Instagram profile (if provided)
- Instagram algorithm research and best practices

### Privacy:
- Only analyzes public Instagram data
- No login required to Instagram
- User handle is optional
- No data stored between sessions

## Author

Created by Daniel on 2025-11-12

## License

Part of BMAD Method ecosystem

---

## Quick Commands Reference

| Command | Purpose |
|---------|---------|
| `*generate-viral-ideas` | Full research + 25 ranked ideas (main feature) |
| `*analyze-niche` | Quick niche landscape analysis |
| `*analyze-competitors` | Deep competitor intelligence |
| `*scan-trends` | Current trending content report |
| `*audit-content` | Personal Reel performance analysis |
| `*refresh-ideas` | Fast idea generation using cached research |
| `*view-config` | View module settings |
| `*help` | Show all commands |
| `*exit` | Exit agent |

---

**Viral Reels Forge** - Break through growth plateaus with data-driven viral content strategy for Instagram Reels.
