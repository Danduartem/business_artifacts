# Agent Tools Documentation Hub

**Version:** 3.0.0
**Last Updated:** 2025-11-19
**Architecture:** Two-layer (Primitives → Workflows)

---

## 📚 Quick Links

| Document | Purpose | Status | Location |
|----------|---------|--------|----------|
| [README.md](../README.md) | Project overview, quick start | ✅ Current | Root |
| [CONVENTIONS.md](CONVENTIONS.md) | Standards, quick reference | ✅ Current | docs/ |
| [ENVIRONMENT.md](ENVIRONMENT.md) | API keys, environment setup | ✅ Current | docs/ |
| [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) | Practical development guide | ✅ Current | docs/ |
| [PROGRESSIVE-DISCLOSURE.md](PROGRESSIVE-DISCLOSURE.md) | Discovery API reference | ✅ Current | docs/ |

---

## 🎯 Documentation by Purpose

### For New Users
1. **[README.md](../README.md)** - Start here for project overview and quick start
2. **[ENVIRONMENT.md](ENVIRONMENT.md)** - Setup API keys and environment variables

### For Tool Developers
1. **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - **PRIMARY REFERENCE** for creating tools
   - Complete templates for primitives and workflows
   - Best practices and common mistakes
   - Step-by-step examples
2. **[CONVENTIONS.md](CONVENTIONS.md)** - Standards and quick reference
   - Architecture overview
   - JSDoc format
   - Naming conventions
3. **[ENVIRONMENT.md](ENVIRONMENT.md)** - Environment configuration

### For AI Agents
1. **[PROGRESSIVE-DISCLOSURE.md](PROGRESSIVE-DISCLOSURE.md)** - Discovery API reference
   - Token-efficient tool discovery
   - Split registry structure
   - Semantic matching with @when
2. **[CONVENTIONS.md](CONVENTIONS.md)** - Tool structure and patterns

---

## 📋 Document Status

| Document | Version | Last Updated | Status | Notes |
|----------|---------|--------------|--------|-------|
| README.md | 3.0.0 | 2025-11-19 | ✅ Current | Complete rewrite for v3.0.0 |
| CONVENTIONS.md | 3.0.0 | 2025-11-19 | ✅ Current | All templates fixed, moved to docs/ |
| ENVIRONMENT.md | 3.0.0 | 2025-11-19 | ✅ Current | Moved to docs/, cross-refs updated |
| DEVELOPMENT_GUIDE.md | 3.0.0 | 2025-11-19 | ✅ Current | Moved to docs/, all aligned |
| PROGRESSIVE-DISCLOSURE.md | 3.0.0 | 2025-11-19 | ✅ Current | Updated for split registry |

---

## 🏗️ Architecture (v3.0.0)

### Two-Layer Architecture

```
Primitives (atomic operations)
    ↓
Workflows (simple & complex compositions)
    ↓
Your Applications
```

**Key Change from v2.0.0:** Removed jobs layer - workflows now handle all complexity levels (low/medium/high) via `@complexity` property.

### Progressive Disclosure

Tools use split registry for token efficiency:
- `core/registry/index.json` - Category overview (15 tokens)
- `core/registry/{category}/primitives.json` - Category primitives (80-250 tokens)
- `core/registry/{category}/workflows.json` - Category workflows (80-150 tokens)

**Token Savings:** 91% reduction (1,500 tokens → 135 tokens for typical discovery)

---

## 📖 Version History

### v3.0.0 (2025-11-19)
**Major Changes:**
- ✅ Removed jobs layer (merged into workflows with @complexity)
- ✅ Implemented split registry for progressive disclosure
- ✅ Updated all 39 tools to v3.0.0 JSDoc format
- ✅ Standardized parseArgs usage (primitives: core/utils, workflows: node:util)
- ✅ Added @when field to all tools for semantic matching
- ✅ Created DEVELOPMENT_GUIDE.md with best practices

**Documentation Updates:**
- ⏳ CONVENTIONS.md (in progress)
- ⏳ README.md (in progress)
- ⏳ PROGRESSIVE-DISCLOSURE.md (in progress)
- ✅ DEVELOPMENT_GUIDE.md (complete)
- ✅ ENVIRONMENT.md (already current)

### v2.0.0 (2025-11-18)
- Added jobs layer (later removed in v3.0.0)
- Added state management and checkpointing
- Created registry-lite.json (replaced by split registry in v3.0.0)

### v1.0.0 (2025-11-01)
- Initial release
- Primitives and workflows architecture
- Basic registry system

---

## 🔍 Finding Information

### "How do I create a new primitive?"
→ **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - See "Primitive Template" section

### "What are the JSDoc format requirements?"
→ **[CONVENTIONS.md](CONVENTIONS.md)** - See "Primitive Tool Standard" and "Workflow Tool Standard"
→ **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - See complete templates

### "How do I set up API keys?"
→ **[ENVIRONMENT.md](ENVIRONMENT.md)** - Complete setup guide

### "How does progressive disclosure work?"
→ **[PROGRESSIVE-DISCLOSURE.md](PROGRESSIVE-DISCLOSURE.md)** - Complete API reference

### "What's the difference between primitives and workflows?"
→ **[CONVENTIONS.md](CONVENTIONS.md)** - See "Architecture Overview"

### "How do I use parseArgs correctly?"
→ **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - See "Best Practices" section
- Primitives: Use `core/utils/index.js` with `args.flags.X`
- Workflows: Use `node:util` with `values.X`

---

## ⚙️ Registry System

### Current (v3.0.0): Split Registry

**Location:** `core/registry/`

**Structure:**
```
core/registry/
├── index.json                     # 15 tokens - category overview
├── browser/
│   └── primitives.json           # 5 tools
├── instagram/
│   ├── primitives.json           # 1 tool
│   └── workflows.json            # 6 workflows
└── ... (10 categories total)
```

**Build Command:** `npm run register`

**Discovery API:** See [PROGRESSIVE-DISCLOSURE.md](./PROGRESSIVE-DISCLOSURE.md)

### Legacy (v2.0.0): Removed
- ❌ `registry-lite.json` - Replaced by split registry
- ❌ `prime-prompts/` - Removed (redundant with @when fields)
- ❌ Jobs layer - Merged into workflows

---

## 🛠️ Maintenance

### When Creating New Documentation
1. Add entry to this index
2. Update status table
3. Add to appropriate "Documentation by Purpose" section
4. Update cross-references in related docs

### When Updating Documentation
1. Update "Last Updated" date in status table
2. Increment version if major changes
3. Update version history
4. Verify all cross-references still valid

### When Removing Documentation
1. Move to `old/` folder with README explaining why
2. Remove from this index
3. Add redirect note in original location
4. Update cross-references in all docs

---

## 🔗 Cross-Reference Map

### CONVENTIONS.md References (in docs/)
- ✅ ENVIRONMENT.md - Environment configuration
- ✅ DEVELOPMENT_GUIDE.md - Technical details
- ✅ PROGRESSIVE-DISCLOSURE.md - Discovery API

### README.md References (in root)
- ✅ docs/ENVIRONMENT.md - Environment setup
- ✅ docs/DEVELOPMENT_GUIDE.md - Development guide
- ✅ docs/CONVENTIONS.md - Standards
- ✅ docs/PROGRESSIVE-DISCLOSURE.md - Discovery API
- ✅ docs/index.md - Documentation hub

### DEVELOPMENT_GUIDE.md References (in docs/)
- ✅ CONVENTIONS.md - Architecture and standards
- ✅ PROGRESSIVE-DISCLOSURE.md - Token-efficient discovery
- ✅ ENVIRONMENT.md - Environment setup

### PROGRESSIVE-DISCLOSURE.md References (in docs/)
- ✅ CONVENTIONS.md - Tool development standards
- ✅ ENVIRONMENT.md - Configuration
- ✅ DEVELOPMENT_GUIDE.md - Development guide

### ENVIRONMENT.md References (in docs/)
- ✅ CONVENTIONS.md - Standards and architecture
- ✅ DEVELOPMENT_GUIDE.md - Development guide
- ✅ ../README.md - Project overview
- ✅ ../.env.example - Template file

---

## 📝 Document Relationships

```
README.md (entry point at root)
    └─→ docs/ (all documentation)
        ├─→ ENVIRONMENT.md (setup)
        ├─→ CONVENTIONS.md (standards)
        ├─→ DEVELOPMENT_GUIDE.md (detailed guide)
        ├─→ PROGRESSIVE-DISCLOSURE.md (discovery API)
        └─→ index.md (this file - documentation hub)

For Tool Developers:
    docs/DEVELOPMENT_GUIDE.md (primary)
        ├─→ CONVENTIONS.md (reference)
        ├─→ PROGRESSIVE-DISCLOSURE.md (discovery)
        └─→ ENVIRONMENT.md (setup)

For AI Agents:
    docs/PROGRESSIVE-DISCLOSURE.md (primary)
        ├─→ CONVENTIONS.md (structure)
        ├─→ DEVELOPMENT_GUIDE.md (templates)
        └─→ ENVIRONMENT.MD (config)
```

---

## ✅ Validation Checklist

Use this when updating docs to ensure alignment:

### Architecture
- [ ] All docs show two-layer architecture (Primitives → Workflows)
- [ ] No references to removed jobs layer
- [ ] Complexity explained as workflow property, not separate layer

### Registry
- [ ] No references to registry-lite.json
- [ ] All examples use split registry (core/registry/)
- [ ] Discovery API matches actual discovery.js implementation

### Code Templates
- [ ] Primitives use `parseArgs` from `core/utils/index.js`
- [ ] Primitives use `args.flags.X` pattern
- [ ] Workflows use `parseArgs` from `node:util`
- [ ] Workflows use `values.X` pattern
- [ ] No async/await with executePrimitive (it's synchronous)

### Cross-References
- [ ] No references to files in old/ folder
- [ ] All relative paths are correct
- [ ] Cross-references use actual file names

### Version Consistency
- [ ] Version numbers match across docs
- [ ] "Last Updated" dates are accurate
- [ ] Version history is consistent

---

## 🚀 Current Focus (2025-11-19)

**Goal:** Align all documentation to v3.0.0 standards

**In Progress:**
1. ⏳ Fixing CONVENTIONS.md templates
2. ⏳ Updating README.md architecture
3. ⏳ Updating PROGRESSIVE-DISCLOSURE.md for split registry

**Next:**
- Verify all cross-references
- Run final alignment check
- Update this index with completion status

---

**Last Updated:** 2025-11-19
**Maintained By:** Documentation team
**Questions?** See [CONVENTIONS.md](CONVENTIONS.md) or [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)
