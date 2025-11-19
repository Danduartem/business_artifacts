# Project Instructions for Claude Code

## Debugging Mindset: CRITICAL

**When ANY error occurs, follow the protocol in `.claude/DEBUGGING_PROTOCOL.md`**

### Core Rule: Investigate BOTH Sides

**It's stupid to only look at the script and not look at what the script is interacting with.**

When debugging:
1. **CODE SIDE:** Read the source - what does it expect?
2. **TARGET SIDE:** Inspect with tools - what actually exists?
3. **COMPARE:** Code expects X, Reality has Y
4. **FIX:** Based on observation, not assumption

### Mandatory Investigation Tools

**For DOM/Web Scraping Errors:**
- Use `browser/eval.js` to inspect actual DOM structure
- Use `page/screenshot.js` to see visual reality
- Compare with selectors in code

**For File/Data Errors:**
- Use `Read` tool to see actual file contents
- Use `ls` via Bash to see what files exist
- Compare with paths in code

**For API/Network Errors:**
- Inspect actual request/response
- Compare with expected format in code

### Anti-Patterns (AVOID)

❌ Saying "probably", "maybe", "I think"
❌ Fixing code without inspecting target
❌ Assuming based on error message alone
❌ Guessing what the DOM/file/API looks like

### Success Pattern

✅ "The code expects `<article>` but the page has `<main>`" ← Observation-based
✅ "Let me inspect the actual DOM structure..." ← Investigation
✅ "I can see that X exists and Y doesn't" ← Facts

---

## Project Structure

- `agent-tools/` - Automation tools and workflows
- `agent-tools/capabilities/primitives/` - Low-level operations (browser, media, http)
- `agent-tools/capabilities/workflows/` - High-level compositions
- `agent-tools/core/` - Discovery API and execution helpers

## Quick Commands

- `/debug` - Show debugging protocol reminder
- `/tools` - Show available agent-tools (always run before executing workflows)

---

**Remember: Never assume. Always investigate. See both sides.**
