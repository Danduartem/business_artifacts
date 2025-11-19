# Debugging Protocol: Investigate BOTH Sides

## Core Principle

**When code fails, NEVER assume. ALWAYS investigate BOTH sides of the interaction.**

It's stupid to only look at the script and not look at what the script is interacting with.

---

## The Protocol

### 1. RUN FIRST
- Don't overthink upfront
- Execute the code
- Let errors reveal themselves

### 2. WHEN ERROR OCCURS → INVESTIGATE BOTH SIDES

**SIDE 1: THE CODE**
- What is it trying to do?
- What does it expect to find?
- Read the actual source code

**SIDE 2: THE TARGET**
- What actually exists?
- Inspect with tools:
  - DOM: Use `browser/eval.js` to see actual HTML structure
  - Files: Use `Read` tool to see actual file contents
  - API: See actual response data
  - Page: Use `page/screenshot.js` to see visual reality

**COMPARE:**
- Code expects: X
- Reality has: Y
- Gap identified → This is the problem

**FIX:**
- Based on what you OBSERVED
- Not what you ASSUMED
- Not what you GUESSED

---

## Examples

### Example 1: Instagram Selector Failure

```
❌ WRONG APPROACH:
Error: "Failed to extract post metadata"
→ "Maybe the selector is wrong, let me change it..."
→ Assumption-based fixing

✅ RIGHT APPROACH:
Error: "Failed to extract post metadata"

INVESTIGATE CODE:
Read process-post-content.js
→ Line 104: document.querySelector('article')
→ CODE EXPECTS: <article> element

INVESTIGATE TARGET:
browser/eval.js --code "() => ({
  hasArticle: !!document.querySelector('article'),
  hasMain: !!document.querySelector('main')
})"
→ REALITY: { hasArticle: false, hasMain: true }

COMPARE:
Code expects <article> ≠ Reality has <main>

FIX:
Change querySelector('article') to querySelector('main')
✓ Based on observation
```

### Example 2: parseArgs Error

```
❌ WRONG APPROACH:
Error: "Unknown option '--post-data'"
→ "Let me check the documentation..."
→ Assumption-based fixing

✅ RIGHT APPROACH:
Error: "Unknown option '--post-data'"

INVESTIGATE CODE:
Read analyze-instagram-content.js
→ Line 25: const args = parseArgs();
→ CODE: No options object defined

INVESTIGATE TARGET:
Read Node.js parseArgs docs
→ REALITY: Requires options: { 'flag-name': { type: 'string' } }

COMPARE:
Code has parseArgs() ≠ Should have parseArgs({ options: {...} })

FIX:
Add options object to parseArgs
✓ Based on observation
```

### Example 3: File Not Found

```
❌ WRONG APPROACH:
Error: "File not found: data.json"
→ "Maybe the path is wrong..."
→ Assumption-based fixing

✅ RIGHT APPROACH:
Error: "File not found: data.json"

INVESTIGATE CODE:
Read script.js
→ const data = readFileSync('data.json')
→ CODE EXPECTS: File at ./data.json

INVESTIGATE TARGET:
ls -la
→ REALITY: No data.json in current directory
→ Files present: config.json, input.json

COMPARE:
Code expects data.json ≠ Reality has input.json

FIX:
Either create data.json or change path to input.json
✓ Based on observation
```

---

## Universal Application

This applies to ALL errors:

| Error Type | Code Side | Target Side |
|------------|-----------|-------------|
| DOM Scraping | Selectors in script | Actual DOM via `browser/eval.js` |
| File I/O | File paths in code | Actual files via `ls`, `Read` |
| API Calls | Request being sent | Actual response via logs |
| Data Processing | Expected format | Actual data via inspection |
| Function Calls | Parameters passed | Function signature via code read |

---

## Mandatory Steps for ANY Error

```
1. Read error message carefully
2. Locate the failing code
3. Understand what CODE expects
4. Use tools to see what TARGET actually has
5. Compare expectations vs reality
6. Fix based on OBSERVED gap
```

---

## Tools for Investigation

**See Code:**
- `Read` tool → View source files
- `Grep` tool → Search for patterns
- `Glob` tool → Find files

**See DOM:**
- `browser/eval.js` → Inspect actual HTML structure
- `page/screenshot.js` → See visual page state
- `browser/navigate.js` → Navigate to pages

**See Files:**
- `ls` via Bash → List directory contents
- `Read` tool → View file contents
- `cat` via Bash → Quick file view

**See Execution:**
- Error messages → What failed
- Logs → What happened
- Return values → What was produced

---

## Anti-Patterns to AVOID

❌ **Assuming based on error message alone**
- Error says "selector failed" → Don't assume which selector
- LOOK at the code to see which one

❌ **Guessing what the target looks like**
- "Instagram probably uses <article>"
- INSPECT the actual DOM to see

❌ **Fixing without comparing both sides**
- Changing code without seeing what it interacts with
- ALWAYS see both sides first

❌ **Making multiple assumptions**
- "It's probably this, or maybe that..."
- INVESTIGATE to know for certain

---

## Success Criteria

**You're doing it right when:**
- ✅ You use tools to inspect both sides before fixing
- ✅ You can say "The code expects X but the target has Y"
- ✅ Your fix addresses the observed gap
- ✅ You never say "probably" or "maybe" - you KNOW

**You're doing it wrong when:**
- ❌ You guess without looking
- ❌ You only read code without inspecting target
- ❌ You use words like "probably", "might be", "I think"
- ❌ You fix based on assumptions

---

## Remember

**The code and the target it interacts with are BOTH sources of truth.**

**See BOTH. Compare. Fix based on observation.**

**Never assume. Always investigate.**
