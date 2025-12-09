---
description: "Load browser tools context"
allowed-tools: ["Read", "Bash"]
model: "haiku"
---

# Prime Browser Tools

Understand how to use the browser tools scripts for browser control.

## Variables
TOOLS_DIR: `tools/browser`
README: `tools/browser/README.md`

## Instructions
- **IMPORTANT**: DO NOT read the JavaScript source files (because README has all usage examples)
- **IMPORTANT**: The README.md is the primary reference (because it contains all examples)
- **IMPORTANT**: If debugging needed, invoke tool-fixer skill (because main session stays clean)
- Always start Chrome before using other tools (`browser-start.js`)
- Use `--profile` flag to preserve authentication state (cookies, logins)
- All tools connect to Chrome on port 9222 (remote debugging)
- Execute tools directly: `tools/browser/<tool>.js <args>`

## Context Boundaries

<never_read>
- JavaScript source code in `tools/browser/*.js`
</never_read>

<use_instead>
- README.md for usage examples
- Run tools without arguments for help
- tool-fixer skill for debugging
</use_instead>

## Workflow

### 1. Load Context

READ ONLY @tools/browser/README.md

### 2. Report

Report your understanding of the browser tools available and when you'll use each tool. Clearly state that you understand you will not read the JavaScript source files.
