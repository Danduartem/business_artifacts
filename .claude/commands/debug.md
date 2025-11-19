# Debug Command

When debugging errors, follow the protocol in `.claude/DEBUGGING_PROTOCOL.md`:

## Core Rule: Investigate BOTH Sides

**NEVER assume. ALWAYS investigate:**

1. **SIDE 1 (CODE):** What is it trying to do?
   - Read the actual source code
   - Understand what it expects

2. **SIDE 2 (TARGET):** What actually exists?
   - Use `browser/eval.js` for DOM inspection
   - Use `Read` tool for files
   - Use `screenshot` for visual verification

3. **COMPARE:** Code expects X, Reality has Y → Fix the gap

**It's stupid to only look at the script and not look at what the script is interacting with.**

## Tools for Investigation

- **DOM:** `browser/eval.js`, `page/screenshot.js`
- **Files:** `Read`, `ls`, `Glob`
- **Code:** `Read`, `Grep`

## When You See an Error:

1. Read error message
2. Locate failing code → See what it EXPECTS
3. Inspect target → See what ACTUALLY EXISTS
4. Compare both sides
5. Fix based on OBSERVATION (not assumption)

**Success = You can say "Code expects X but target has Y"**
**Failure = You say "probably", "maybe", "I think"**
