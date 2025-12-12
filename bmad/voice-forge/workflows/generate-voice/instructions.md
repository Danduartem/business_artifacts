# Generate Voice Documentation - Workflow Instructions

## Overview

This workflow creates comprehensive brand voice documentation by analyzing reference URLs you provide and generating detailed guidelines through parallel specialist agents.

## Prerequisites

- At least 3 reference URLs (websites, social media, or brands with voice styles you admire)
- Basic brand context (name, industry, target audience)
- Desired personality traits (3-5 adjectives)

## Workflow Steps

### Step 1: Provide Reference URLs

When prompted, share 3-8 URLs of content with voice styles you want to emulate or analyze:

**Good reference types:**
- Company about pages (e.g., `https://mailchimp.com/about`)
- Social media profiles (e.g., `https://twitter.com/stripe`)
- Blog posts that exemplify desired tone
- Competitor websites
- Brands you admire

**Tips:**
- More URLs = better voice DNA analysis
- Mix different content types for comprehensive analysis
- Include both direct competitors and aspirational brands

### Step 2: Provide Brand Context

Answer these questions:

1. **Brand Name:** Your brand's name (for documentation headers)
2. **Industry/Sector:** What industry you operate in
3. **Target Audience:** Who you're primarily speaking to
4. **Brand Personality:** 3-5 adjectives (e.g., "friendly, knowledgeable, approachable")
5. **What to AVOID:** Voice styles that don't fit (e.g., "corporate, stuffy, overly salesy")

### Step 3: Reference Analysis (Automatic)

The system uses WebFetch to analyze each URL and extract:
- Tone indicators (formal/casual, serious/funny, etc.)
- Vocabulary patterns (commonly used words and phrases)
- Sentence structure (length, complexity)
- Personality evidence (traits expressed in writing)
- Notable phrases (distinctive language patterns)

**Output:** `voice-dna.json` - consolidated voice analysis

### Step 4: Parallel Agent Generation (Automatic)

Five specialist agents work simultaneously:

| Agent | Focus | Output |
|-------|-------|--------|
| Voice Identity Architect | Archetype, personality, dimensions | voice-identity.json |
| Tone Strategist | Situational tone matrix | tone-matrix.json |
| Lexicon Curator | Vocabulary, grammar, style rules | lexicon.json |
| Channel Specialist | Platform-specific playbooks | channel-playbooks.json |
| Content Exemplar | Real examples and transformations | content-examples.json |

### Step 5: Quality Scoring (Automatic)

Voice Scorer evaluates all sections across 5 dimensions:

| Dimension | Weight | What It Measures |
|-----------|--------|------------------|
| Clarity | 20% | Clear, unambiguous guidelines |
| Completeness | 25% | All required elements present |
| Consistency | 20% | No internal contradictions |
| Actionability | 20% | Practical with examples |
| Brand Alignment | 15% | Matches your references and context |

**Threshold:** 90% minimum on ALL dimensions

### Step 6: Quality Gate (Automatic)

- **All Pass (90+):** Proceeds to final compilation
- **Any Fail (<90):** Triggers Quality Reviewer

### Step 7: Regeneration (If Needed)

Quality Reviewer handles failures:

| Score | Severity | Action |
|-------|----------|--------|
| 90-100 | PASSED | No action |
| 85-89 | MINOR | Specific fixes |
| 70-84 | MODERATE | Regenerate section |
| <70 | CRITICAL | Ask for your guidance |

Maximum 2 regeneration attempts per section.

### Step 8: Final Output

Upon successful completion, you receive:

1. **voice-documentation.md** - Complete voice guide (main deliverable)
2. **voice-quick-reference.md** - One-page summary for quick reference
3. **voice-data.json** - Structured data for AI training
4. **voice-scores.json** - Quality assessment report

## Commands

| Command | Description |
|---------|-------------|
| `*generate` | Start full voice documentation flow |
| `*analyze` | Analyze reference URLs only (no full generation) |
| `*score` | Score existing documentation |
| `*export` | Export in different formats |
| `*help` | Show available commands |
| `*exit` | Exit with confirmation |

## Troubleshooting

### "URL analysis failed"

- Check URL is accessible
- Ensure it's not behind a login wall
- Try alternative URL from same source

### "Section failed quality gate"

- Review the specific dimension failures in voice-scores.json
- System will attempt regeneration automatically (up to 2 times)
- If escalated, consider providing more reference URLs or clearer brand context

### "Regeneration attempts exhausted"

- Review diagnostic in quality-review.json
- Consider adding more/different reference URLs
- Clarify brand personality or avoid list
- Manual editing of generated content may be needed

## Best Practices

1. **Quality References:** Better input URLs = better output
2. **Clear Context:** Be specific about personality and what to avoid
3. **Review Scores:** Check voice-scores.json even for passing sections
4. **Iterate:** Use the documentation as a starting point, refine as needed

## Time Estimate

- Reference analysis: 1-2 minutes per URL
- Agent generation: 2-5 minutes (parallel)
- Scoring: 1 minute
- Regeneration (if needed): 2-3 minutes per section

**Total:** Typically 10-15 minutes for complete documentation
