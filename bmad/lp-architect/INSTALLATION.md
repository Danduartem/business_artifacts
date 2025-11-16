# Landing Page Architect - Installation Guide

**Module Version:** 1.0.0
**Last Updated:** 2025-11-05

---

## Prerequisites

Before installing Landing Page Architect, ensure you have:

1. **BMAD Core Module Installed**
   - The Landing Page Architect requires BMAD Core (bmad-core) to be installed first
   - Install from: `bmad/core/`

2. **Node.js Environment**
   - Required for running the BMAD installer
   - Verify: `node --version`

3. **BMAD Project Initialized**
   - Your project should have `.claude/` directory with BMAD structure
   - If not initialized, run BMAD setup first

---

## Installation Steps

### Method 1: Via BMAD Installer (Recommended)

1. **Run the BMAD installer in your project:**
   ```bash
   npm run install-bmad
   ```

2. **Select Landing Page Architect:**
   - From the module list, find and select "Landing Page Architect"
   - Module code: `lp-architect`

3. **Configure during installation:**

   The installer will ask you to configure:

   **Blueprint Output Location:**
   - Where should architecture blueprints be saved?
   - Default: `{output_folder}/lp-architect-blueprints`
   - Recommendation: Use default or specify custom path

   **Detail Level:**
   - How detailed should blueprints be?
   - Options:
     - `standard` - Balanced detail with strategic rationale (Recommended)
     - `detailed` - Comprehensive with extended research and examples
     - `concise` - Core recommendations only

   **Research Depth:**
   - How deep should competitive research go?
   - Options:
     - `quick` - Top 3-5 competitors, 15-20 minutes
     - `standard` - Top 10 competitors, 30-40 minutes (Recommended)
     - `comprehensive` - Top 20 competitors, 60+ minutes

4. **Installer will automatically:**
   - Copy module files to `bmad/lp-architect/`
   - Compile 4 agents from YAML to XML .md format:
     - `conversion-strategist.md`
     - `agent-cipher.md`
     - `the-whisperer.md`
     - `director-arc.md`
   - Register workflows with BMAD
   - Create `config.yaml` with your settings
   - Create blueprint output folder

---

## Verification

After installation, verify everything is working:

### 1. Check Agent Compilation

```bash
ls bmad/lp-architect/agents/*.md
```

**Expected output:**
```
bmad/lp-architect/agents/conversion-strategist.md
bmad/lp-architect/agents/agent-cipher.md
bmad/lp-architect/agents/the-whisperer.md
bmad/lp-architect/agents/director-arc.md
```

### 2. Verify Workflow is Available

Try invoking the main workflow:
```
/generate-architecture
```

You should see the workflow start with context gathering.

### 3. Check Configuration File

```bash
cat bmad/lp-architect/config.yaml
```

**Expected content:**
```yaml
# Inherited from installer
user_name: [Your Name]
communication_language: [Your Language]
document_output_language: [Your Language]
output_folder: [Your Output Folder]

# Module-specific
blueprint_output_folder: [Your Blueprint Folder]
detail_level: [standard|detailed|concise]
research_depth: [quick|standard|comprehensive]
module_version: 1.0.0
```

### 4. Test Standalone Agent Access

Try invoking an agent directly:
```
@bmad/lp-architect/agents/conversion-strategist.md
```

You should see the agent load with its menu of commands.

---

## Directory Structure After Installation

```
bmad/lp-architect/
├── agents/
│   ├── conversion-strategist.agent.yaml (source)
│   ├── conversion-strategist.md          (compiled)
│   ├── agent-cipher.agent.yaml
│   ├── agent-cipher.md
│   ├── the-whisperer.agent.yaml
│   ├── the-whisperer.md
│   ├── director-arc.agent.yaml
│   └── director-arc.md
├── workflows/
│   └── generate-architecture/
│       ├── workflow.yaml
│       ├── instructions.md
│       ├── template.md
│       ├── checklist.md
│       └── README.md
├── tasks/
│   ├── matrix-calculator.xml
│   ├── validation-framework.xml
│   └── niche-research-protocol.xml
├── _module-installer/
│   └── install-config.yaml
├── config.yaml                    (generated at install)
├── README.md
└── INSTALLATION.md               (this file)
```

---

## Quick Start After Installation

Once installed, you can immediately start using Landing Page Architect:

### Generate Your First Architecture Blueprint

1. **Prepare your inputs:**
   - Target persona document (demographics, psychographics, behaviors)
   - Offer details (what you're selling, price point)
   - Business/niche information
   - 2-3 main competitors (optional)

2. **Invoke the workflow:**
   ```
   /generate-architecture
   ```

3. **Follow the guided process:**
   - Answer context questions
   - Review research findings from Agent Cipher
   - Validate persona insights from The Whisperer
   - Confirm strategic decisions from Conversion Strategist
   - Approve architecture blueprint from Director Arc

4. **Receive your deliverable:**
   - Location: `{blueprint_output_folder}/lp-architecture-blueprint-{date}.md`
   - Contains: Complete section-by-section architecture with strategic rationale

**Expected Duration:** 20-40 minutes depending on research depth

---

## Standalone Agent Consultation

You can also consult individual agents directly:

### Conversion Strategist 📊
```
@bmad/lp-architect/agents/conversion-strategist.md
```
**Commands:**
- `*explain-principles` - Learn the 7 conversion principles
- `*validate-concept` - Validate a landing page concept
- `*matrix-guide` - Navigate the 3D matrix framework
- `*conversion-research` - Research conversion best practices

### Agent Cipher 🔍
```
@bmad/lp-architect/agents/agent-cipher.md
```
**Commands:**
- `*analyze-competitors` - Deep competitive analysis
- `*niche-patterns` - Niche-specific conversion patterns
- `*benchmark-data` - Performance benchmarks
- `*differentiation-strategy` - Competitive positioning

### The Whisperer 💭
```
@bmad/lp-architect/agents/the-whisperer.md
```
**Commands:**
- `*analyze-persona` - Deep persona psychology analysis
- `*map-objections` - Map customer objections
- `*emotional-triggers` - Identify emotional triggers
- `*persona-resonance-check` - Validate persona alignment

### Director Arc 🎬
```
@bmad/lp-architect/agents/director-arc.md
```
**Commands:**
- `*explain-journey` - Understand customer journey design
- `*section-sequencing` - Section ordering strategy
- `*review-architecture` - Review existing architecture
- `*quick-blueprint` - Fast architecture draft

---

## Troubleshooting

### Issue: Agents not found after installation

**Solution:**
1. Check if YAML files were compiled:
   ```bash
   ls bmad/lp-architect/agents/*.md
   ```
2. If .md files are missing, re-run installer
3. Verify Node.js is installed: `node --version`

### Issue: Workflow doesn't start

**Solution:**
1. Verify workflow is registered:
   ```bash
   cat bmad/lp-architect/workflows/generate-architecture/workflow.yaml
   ```
2. Check config.yaml exists:
   ```bash
   cat bmad/lp-architect/config.yaml
   ```
3. Try absolute path:
   ```
   /bmad/lp-architect/workflows/generate-architecture
   ```

### Issue: "Config source not found" error

**Solution:**
1. Verify config.yaml was generated during installation
2. If missing, create manually from template in install-config.yaml
3. Ensure all required fields are present

### Issue: Blueprint output folder not created

**Solution:**
1. Check config.yaml for correct path
2. Manually create folder:
   ```bash
   mkdir -p [blueprint_output_folder_path]
   ```
3. Verify folder permissions

---

## Reconfiguration

To change module configuration after installation:

1. **Edit config file:**
   ```bash
   nano bmad/lp-architect/config.yaml
   ```

2. **Modify settings:**
   - `blueprint_output_folder` - Change output location
   - `detail_level` - Change blueprint detail (standard/detailed/concise)
   - `research_depth` - Change research depth (quick/standard/comprehensive)

3. **Save and test:**
   ```
   /generate-architecture
   ```

Configuration changes take effect immediately.

---

## Uninstallation

To remove Landing Page Architect:

1. **Delete module directory:**
   ```bash
   rm -rf bmad/lp-architect
   ```

2. **Remove from BMAD registry** (if applicable)

3. **Clean up output folder** (optional):
   ```bash
   rm -rf [blueprint_output_folder]
   ```

---

## Support

**Issues:** Report at github.com/anthropics/claude-code/issues
**Documentation:** docs.claude.com/claude-code
**Module Version:** 1.0.0

---

**Landing Page Architect** - Intelligence over Templates, Strategy over Guesswork

*Powered by 4-agent collaboration, 3D matrix intelligence, and conversion science*
