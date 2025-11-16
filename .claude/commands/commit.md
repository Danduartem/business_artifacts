# Atomic Commit Workflow

## Instructions

1. **Analyze changes**: Run `git status`, `git diff --stat`, and `git log -5 --oneline` in parallel

2. **Group logically**: Break changes into atomic commits by feature, change type, or module. Each commit must be complete, independent, and testable.

3. **Present plan**: Show proposed commit groupings with files, use **AskUserQuestion** tool to approve/adjust

4. **Process sequentially**: For each commit:
   - Clear staging: `git reset`
   - Stage files for this commit only
   - Generate conventional commit message (≤50 char subject)
   - Commit with heredoc format
   - Confirm success

5. **Finish**: Show `git log` summary

## Rules
- Never commit secrets (.env, credentials, etc.)
- Never skip hooks or force push to main without confirmation