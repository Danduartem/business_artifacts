## /todo - Plan Approval & Execution

**Purpose:** Approve Claude's suggested plan and create TodoWrite entries for tracking.

**Usage:** `/todo [optional modifications]`

**Flow:**
1. Parse my previous message to extract the numbered plan/steps I suggested
2. Apply any user modifications from the input:
   - "remove step 3" or "skip item 4 and 7"
   - "add [new task] at the end"
   - "change step 2 to [different description]"
3. Create TodoWrite with all tasks in pending status
4. Mark first task as in_progress
5. Begin execution

**Examples:**
- `/todo` - Approve plan as-is
- `/todo yes but remove step 3` - Skip step 3
- `/todo ok but add testing at the end` - Add extra step
- `/todo yes, change step 2 to use PostgreSQL instead` - Modify a step

**Important:**
- Extract plan from my LAST 3 messages only (don't search old messages)
- If no clear numbered plan exists, ask user to clarify what to track
- Use clear task descriptions in both forms (content + activeForm)
- Set all tasks to pending except first one (in_progress)
