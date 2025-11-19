#!/bin/bash
# Auto-cleanup script for Instagram workflow processes
# Prevents zombie processes and context bloat

echo "🧹 Cleaning up Instagram workflow processes..."

# Kill all running Instagram workflow processes
pkill -f "node.*instagram.*profiles-to-airtable" 2>/dev/null && echo "  ✓ Killed profiles-to-airtable processes"
pkill -f "node.*instagram.*extract-analyze" 2>/dev/null && echo "  ✓ Killed extract-analyze processes"
pkill -f "node.*instagram.*process-post-content" 2>/dev/null && echo "  ✓ Killed process-post-content processes"

# Clean up temp files older than 30 minutes
find /tmp -name "instagram-analysis-*" -mmin +30 -delete 2>/dev/null && echo "  ✓ Cleaned temp files"

echo "✅ Cleanup complete"
