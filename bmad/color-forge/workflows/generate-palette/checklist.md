# Generate Palette Workflow Checklist

## Pre-Generation Checks

- [ ] User provided 2-4 valid primary colors (HEX format)
- [ ] Brand context gathered (industry, audience, personality)
- [ ] Reference data files loaded successfully
- [ ] Output folder exists and is writable

## Agent Spawn Checks

- [ ] All 5 agents spawned in SINGLE message (true parallelism)
- [ ] Each agent received correct primary colors
- [ ] Each agent received brand context
- [ ] Each agent received configuration settings
- [ ] Each agent has unique output file path

## Output Validation

### palette-psychology.json
- [ ] File exists
- [ ] Contains complete primary scale (50-900)
- [ ] Contains secondary and accent scales
- [ ] Contains neutral scale
- [ ] Contains semantic colors (success, warning, error, info)
- [ ] Contains psychology_notes section
- [ ] Contains distribution recommendations
- [ ] Contains accessibility information

### palette-harmony.json
- [ ] File exists
- [ ] Contains complete color scales
- [ ] Contains harmony_analysis section
- [ ] Detected harmony type documented
- [ ] Hue angles calculated
- [ ] Mathematical balance score included

### palette-accessible.json
- [ ] File exists
- [ ] Contains complete color scales
- [ ] All contrast pairs documented
- [ ] WCAG level compliance verified
- [ ] Colorblind tests included
- [ ] Light/dark mode variants included
- [ ] Any adjustments documented

### palette-trendy.json
- [ ] File exists
- [ ] Contains complete color scales
- [ ] Contains trend_analysis section
- [ ] Industry fit score included
- [ ] Trend alignment score included
- [ ] Longevity assessment included

### palette-synthesized.json
- [ ] File exists
- [ ] Contains complete color scales
- [ ] Contains application_guide section
- [ ] UI pattern recommendations included
- [ ] Mode switching guidance included
- [ ] Edge cases documented

## Post-Generation Checks

- [ ] User notified of successful generation
- [ ] File locations communicated
- [ ] Next steps provided
- [ ] Optional scoring offered

## Quality Standards

All palettes must meet:
- [ ] WCAG AA compliance minimum
- [ ] Consistent scale granularity
- [ ] Valid JSON format
- [ ] Complete required sections
- [ ] Proper HEX color format (#RRGGBB)
