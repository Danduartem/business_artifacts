# Safe Push Workflow

## Instructions

1. **Analyze branch state**: Run in parallel:
   - `git status` - Check current branch and state
   - `git log origin/$(git branch --show-current)..HEAD --oneline` - Show unpushed commits
   - `git rev-parse --abbrev-ref --symbolic-full-name @{u}` - Check remote tracking

2. **Validate safety**:
   - Warn if force push to main/master
   - Check if branch has remote tracking configured
   - Show which commits will be pushed

3. **Present plan**: Display:
   - Current branch name
   - Number of commits to push
   - List of commit messages (with SHAs)
   - Remote destination

4. **Get confirmation**: Use **AskUserQuestion** tool to ask user to approve/cancel

5. **Execute push**:
   - If no tracking branch: `git push -u origin <branch>`
   - If tracking exists: `git push`
   - If force needed: Explicitly warn and require confirmation

6. **Confirm**: Show success message with remote URL if available

## Rules
- NEVER force push to main/master without explicit user confirmation
- Always show what will be pushed before pushing
- Set up tracking (`-u`) for new branches automatically
- Fail safely if remote is ahead (suggest pull/rebase)

## Safety Checks
- Detect force push scenarios and warn prominently
- Check for unpulled changes on remote
- Verify remote repository is accessible
