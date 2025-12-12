# Voice Forge

Multi-agent brand voice documentation system that creates comprehensive, production-ready voice guidelines from user-provided reference materials.

## Overview

Voice Forge analyzes reference URLs (competitor websites, social media, brands you admire) using browser-based analysis and generates complete voice documentation through 5 parallel specialist agents. Built-in quality scoring ensures 90% threshold on all dimensions with automatic regeneration for failures.

## Features

- **Browser-Based Analysis:** Uses WebFetch to analyze reference URLs and extract voice characteristics
- **5 Specialist Agents:** Parallel generation for speed and depth
- **90% Quality Threshold:** Automatic scoring and regeneration
- **Complete Documentation:** Full voice guide + one-page summary + AI-ready JSON
- **Platform Playbooks:** Channel-specific guidelines for website, social, email, and more

## Installation

```bash
# From the bmad directory
cd bmad
./install.sh voice-forge
```

## Quick Start

1. Start the workflow:
   ```
   /bmad:voice-forge:workflows:generate-voice
   ```

2. Provide 3-8 reference URLs:
   ```
   https://mailchimp.com/about
   https://slack.com
   https://twitter.com/stripe
   ```

3. Answer brand context questions:
   - Brand name
   - Industry/sector
   - Target audience
   - Personality traits (3-5 adjectives)
   - What to avoid

4. Wait for generation (typically 10-15 minutes)

5. Review output files:
   - `voice-documentation.md` - Complete guide
   - `voice-quick-reference.md` - One-page summary
   - `voice-data.json` - AI training format
   - `voice-scores.json` - Quality report

## Module Structure

```
voice-forge/
├── _module-installer/
│   └── install-config.yaml
├── agents/
│   ├── voice-director.agent.yaml         # Orchestrator
│   ├── voice-identity-architect.agent.yaml
│   ├── tone-strategist.agent.yaml
│   ├── lexicon-curator.agent.yaml
│   ├── channel-specialist.agent.yaml
│   ├── content-exemplar.agent.yaml
│   ├── voice-scorer.agent.yaml           # Quality gate
│   └── quality-reviewer.agent.yaml       # Regeneration
├── workflows/
│   └── generate-voice/
│       ├── workflow.yaml
│       └── instructions.md
├── data/
│   ├── voice-dimensions.md
│   ├── brand-archetypes.md
│   ├── channel-conventions.md
│   └── tone-situations.md
├── templates/
│   ├── voice-document.md
│   └── one-page-summary.md
├── config.yaml
└── README.md
```

## Agents

### Voice Director (Orchestrator)
Master orchestrator that gathers input, analyzes references via WebFetch, spawns specialist agents, and manages quality gates.

**Commands:**
- `*generate` - Start full voice documentation flow
- `*analyze` - Analyze reference URLs only
- `*score` - Score existing documentation
- `*export` - Export in different formats
- `*help` - Show available commands

### Specialist Agents (5)

| Agent | Focus | Philosophy |
|-------|-------|------------|
| Voice Identity Architect | Archetype, personality, dimensions | "Voice is who you are" |
| Tone Strategist | Situational tone matrix | "Tone flexes to fit the moment" |
| Lexicon Curator | Vocabulary, grammar, style | "Words are the atoms of voice" |
| Channel Specialist | Platform-specific playbooks | "Same voice, different venue" |
| Content Exemplar | Real examples, transformations | "Show, don't just tell" |

### Quality Agents (2)

| Agent | Role |
|-------|------|
| Voice Scorer | Scores sections across 5 dimensions (90% threshold) |
| Quality Reviewer | Diagnoses failures, triggers regeneration |

## Quality System

### Scoring Dimensions

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Clarity | 20% | Clear, unambiguous guidelines |
| Completeness | 25% | All required elements present |
| Consistency | 20% | No internal contradictions |
| Actionability | 20% | Practical with examples |
| Brand Alignment | 15% | Matches references and context |

### Quality Gate

- **Threshold:** 90% on ALL dimensions
- **Any failure:** Triggers Quality Reviewer
- **Severity levels:**
  - 90-100: PASSED
  - 85-89: MINOR (specific fixes)
  - 70-84: MODERATE (regenerate)
  - <70: CRITICAL (escalate to user)
- **Max attempts:** 2 regenerations per section

## Reference Data

### Voice Dimensions (NN/g Framework)
Four dimensions for positioning brand voice:
- Formal ↔ Casual
- Serious ↔ Funny
- Respectful ↔ Irreverent
- Matter-of-fact ↔ Enthusiastic

### Brand Archetypes (12 Jungian)
- Innocent, Explorer, Sage, Hero, Outlaw, Magician
- Regular Guy, Lover, Jester, Caregiver, Creator, Ruler

### Channel Conventions
Platform-specific norms for:
- Website, Blog, Instagram, LinkedIn, Twitter, TikTok
- Email marketing, Customer support

### Tone Situations
Guidance for common scenarios:
- Celebrating, Delivering bad news, Educating, Selling
- Apologizing, Onboarding, Crisis, Re-engaging

## Output Files

### voice-documentation.md
Complete voice guide with:
- Executive summary
- Voice identity (archetype, traits, dimensions)
- Tone matrix (situational, audience states, crisis)
- Language guidelines (vocabulary, grammar, inclusive)
- Channel playbooks
- Content examples
- AI content guidelines

### voice-quick-reference.md
One-page summary for daily use with:
- Voice at a glance
- Four dimensions
- Do/Don't quick list
- Core words
- Say this, not that

### voice-data.json
Structured data for:
- AI content generation
- Automated content review
- Integration with other tools

## Configuration

Edit `config.yaml` to customize:

```yaml
voice_output_folder: "/path/to/output"
quality_threshold: 90
max_regeneration_attempts: 2
channels:
  - website
  - blog
  - instagram
  - linkedin
  - twitter
  - email_marketing
  - customer_support
```

## Tips for Best Results

1. **Quality References:** Provide URLs with clear, distinctive voice styles
2. **Mix Sources:** Include different content types (about pages, social, blog)
3. **Be Specific:** Clear personality adjectives help guide generation
4. **Define Avoids:** What you don't want is as important as what you want
5. **Review & Refine:** Use generated docs as starting point, customize as needed

## Troubleshooting

### URL Analysis Fails
- Check URL is publicly accessible
- Try alternative URL from same source
- Ensure site isn't blocking automated access

### Quality Gate Failures
- Review specific dimension failures in voice-scores.json
- System auto-regenerates up to 2 times
- If escalated, add more/clearer references

### Inconsistent Output
- Provide more consistent reference URLs
- Clarify brand personality traits
- Be specific about what to avoid

## Version History

- **1.0.0** - Initial release with full agent suite and quality system

## License

Part of the BMAD module ecosystem.
