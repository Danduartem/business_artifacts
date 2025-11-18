## /todo - Unified Task Management

**Modes:**

### 1. Approval Mode: `/todo yes, but [modifications]`
**Trigger:** Input contains "yes" or "do"
**Actions:**
1. Parse my previous message for numbered steps/plan
2. Apply user modifications (e.g., "remove item 4 and 8", "add X at the end")
3. Write tasks to `.todo.md` Active section (source of truth)
4. Sync to TodoWrite with status: pending, priority: high
5. Start executing the plan

**Format for .todo.md:**
```
- [ ] Task description (id: N, priority: high)
```

### 2. Restore Mode: `/todo -restore`
**Trigger:** Input contains "-restore"
**Actions:**
1. Read `.todo.md` Active section
2. Parse unchecked tasks
3. Populate TodoWrite with these tasks
4. Show what was restored

### 3. Status/Verification Mode: `/todo` (no args or "status")
**Trigger:** Empty input or "status"
**Actions:**
1. Read `.todo.md` as source of truth
2. Compare with TodoWrite
3. If .todo.md has unchecked items not in TodoWrite:
   - Sync them to TodoWrite
   - Show missing items
4. Show status: Active count, what's incomplete
5. If user is asking "are we done?": verify .todo.md is fully checked

**CRITICAL RULE:**
- `.todo.md` is the source of truth
- NEVER say "done" unless ALL items in .todo.md Active section are checked
- If mismatch between .todo.md and TodoWrite: .todo.md wins, update TodoWrite

**Completion Flow:**
When marking tasks complete:
1. Check item in .todo.md: `- [ ]` → `- [x]`
2. Update TodoWrite status: pending/in_progress → completed
3. When ALL active tasks checked: move to Done section (keep last 10)
4. Update header: `Active: N | Done: M`
