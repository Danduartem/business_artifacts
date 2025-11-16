# Stack Advisor Tools

API integrations and utility scripts for querying package versions and maintaining up-to-date technology information.

## Overview

These tools enable Stack Advisor agents (primarily Scout) to query current package versions from public package registries, ensuring recommendations are based on the latest stable releases.

## Available Tools

### 1. npm Version Checker
**File:** `npm-version-checker.md`

Query npm Registry API for JavaScript/TypeScript package information.

**Capabilities:**
- Get latest package version
- Get release dates
- Check package metadata (description, homepage, repository)
- Validate tech currency (time since last release)
- Query multiple packages in batch

**Common Use Cases:**
- Check Next.js, React, Vue, Svelte versions
- Verify Express, Fastify, NestJS releases
- Get Prisma, Drizzle ORM versions
- Research UI library versions

**API:** `https://registry.npmjs.org/{package}/latest`

**No authentication required** ✅

---

### 2. PyPI Version Checker
**File:** `pypi-version-checker.md`

Query PyPI (Python Package Index) API for Python package information.

**Capabilities:**
- Get latest package version
- Get release dates
- Check Python version requirements
- Get package metadata (summary, homepage, docs)
- Validate tech currency

**Common Use Cases:**
- Check Django, FastAPI, Flask versions
- Verify SQLAlchemy, SQLModel releases
- Get database driver versions (asyncpg, psycopg2)
- Research async framework versions

**API:** `https://pypi.org/pypi/{package}/json`

**No authentication required** ✅

---

## How Agents Use These Tools

### Scout (Tech Research Specialist)

**During framework research workflow:**

1. User mentions a technology (e.g., "Next.js")
2. Scout queries npm API for latest version:
   ```bash
   curl -s https://registry.npmjs.org/next/latest | jq -r '.version'
   ```
3. Scout gets release date:
   ```bash
   curl -s https://registry.npmjs.org/next/latest | jq -r '.time[.version]'
   ```
4. Scout calculates age and compares to `tech_currency_threshold`
5. Scout updates research findings with current data

**During materials selection:**

1. Scout compiles list of frameworks to research
2. Scout queries each package's current version
3. Scout flags any packages with releases older than threshold
4. Scout presents current version info to user

### Dana (Comparison Specialist)

**During comparison matrix creation:**

1. Gets latest versions for all options being compared
2. Includes "Last Updated" column in comparison matrix
3. Notes any packages with old releases as potential risk

### Integration with framework-database.md

These tools help keep the framework database current:

**Weekly maintenance workflow:**

```bash
# Check major frameworks
for pkg in next react vue svelte fastapi django; do
  if [[ "$pkg" == "fastapi" ]] || [[ "$pkg" == "django" ]]; then
    # Python package
    version=$(curl -s https://pypi.org/pypi/$pkg/json | jq -r '.info.version')
    released=$(curl -s https://pypi.org/pypi/$pkg/json | jq -r '.info.version as $v | .releases[$v][0].upload_time')
  else
    # npm package
    version=$(curl -s https://registry.npmjs.org/$pkg/latest | jq -r '.version')
    released=$(curl -s https://registry.npmjs.org/$pkg/latest | jq -r '.time[.version]')
  fi
  echo "$pkg: v$version (released: $released)"
done
```

## Quick Start

### Check npm Package
```bash
# Simple version check
curl -s https://registry.npmjs.org/next/latest | jq -r '.version'

# Full info
curl -s https://registry.npmjs.org/next/latest | jq '{
  version: .version,
  released: .time[.version],
  description: .description
}'
```

### Check PyPI Package
```bash
# Simple version check
curl -s https://pypi.org/pypi/fastapi/json | jq -r '.info.version'

# Full info
curl -s https://pypi.org/pypi/fastapi/json | jq '{
  version: .info.version,
  released: (.info.version as $v | .releases[$v][0].upload_time),
  requires_python: .info.requires_python,
  summary: .info.summary
}'
```

## Common Queries

### Frontend Frameworks (npm)
```bash
# Check all major frontend frameworks
for pkg in react vue svelte solid-js; do
  echo -n "$pkg: "
  curl -s https://registry.npmjs.org/$pkg/latest | jq -r '.version'
done
```

### Meta-Frameworks (npm)
```bash
# Check meta-frameworks
for pkg in next nuxt @sveltejs/kit astro remix; do
  echo -n "$pkg: "
  curl -s https://registry.npmjs.org/$pkg/latest | jq -r '.version'
done
```

### Backend Frameworks (npm)
```bash
# Check Node.js backend frameworks
for pkg in express fastify @nestjs/core hono; do
  echo -n "$pkg: "
  curl -s https://registry.npmjs.org/$pkg/latest | jq -r '.version'
done
```

### Python Web Frameworks (PyPI)
```bash
# Check Python web frameworks
for pkg in django fastapi flask starlette; do
  echo -n "$pkg: "
  curl -s https://pypi.org/pypi/$pkg/json | jq -r '.info.version'
done
```

### ORMs (Mixed)
```bash
# npm ORMs
for pkg in prisma drizzle-orm sequelize typeorm; do
  echo -n "$pkg (npm): "
  curl -s https://registry.npmjs.org/$pkg/latest | jq -r '.version'
done

# PyPI ORMs
for pkg in sqlalchemy sqlmodel tortoise-orm; do
  echo -n "$pkg (pypi): "
  curl -s https://pypi.org/pypi/$pkg/json | jq -r '.info.version'
done
```

## Currency Checking

### Calculate Days Since Release (npm)
```bash
package="next"
released=$(curl -s https://registry.npmjs.org/$package/latest | jq -r '.time[.version]')
released_seconds=$(date -d "$released" +%s)
now_seconds=$(date +%s)
days=$(( ($now_seconds - $released_seconds) / 86400 ))
echo "$package was released $days days ago"
```

### Calculate Days Since Release (PyPI)
```bash
package="fastapi"
released=$(curl -s https://pypi.org/pypi/$package/json | jq -r '.info.version as $v | .releases[$v][0].upload_time')
released_seconds=$(date -d "$released" +%s)
now_seconds=$(date +%s)
days=$(( ($now_seconds - $released_seconds) / 86400 ))
echo "$package was released $days days ago"
```

### Compare to Threshold
```bash
threshold_days=30  # From project intake (tech_currency_threshold)

# Check if package is current
if [ $days -le $threshold_days ]; then
  echo "✅ $package is current (released $days days ago)"
else
  echo "⚠️  $package may be outdated (released $days days ago)"
fi
```

## WebFetch Integration

For agents that prefer using WebFetch tool:

### npm Package Query
```
WebFetch:
  url: "https://registry.npmjs.org/next/latest"
  prompt: "Extract version number, release date, and description"
```

### PyPI Package Query
```
WebFetch:
  url: "https://pypi.org/pypi/fastapi/json"
  prompt: "Extract version, release date, Python version requirement, and summary"
```

## Rate Limits

### npm Registry
- **Anonymous requests**: ~1000 requests per 5 minutes
- **Sufficient for**: Stack Advisor usage (researching 10-50 packages per session)
- **No authentication needed**

### PyPI
- **No published limits**: Be respectful, don't spam
- **Sufficient for**: Stack Advisor usage
- **No authentication needed**

## Best Practices

1. **Cache during session**: Don't re-query same package multiple times
2. **Batch queries**: When checking multiple packages, loop efficiently
3. **Handle errors**: Check for 404 (package not found)
4. **Document findings**: Update framework-database.md with current data
5. **Respect APIs**: Don't hammer with requests

## Maintenance Schedule

### Daily (for active projects)
- Check packages mentioned by users during sessions

### Weekly
- Update major framework versions in framework-database.md
- Check popular packages: Next.js, React, Vue, Django, FastAPI

### Monthly
- Comprehensive update of all 100+ packages in framework database
- Review for any packages with stale releases

### As Needed
- When user asks about specific package
- When generating comparison matrices
- When validating stack selections

## Future Enhancements

Potential additions to tools directory:

1. **go-packages-checker.md**: Query Go package versions
2. **ruby-gems-checker.md**: Query RubyGems versions
3. **github-stars-checker.md**: Query GitHub stats for popularity
4. **version-comparison-script.sh**: Automated batch checking
5. **currency-validator.js**: Script to validate all packages in framework-database.md

## Integration with Data Files

These tools support maintenance of:
- `/data/framework-database.md`: Version and release date updates
- `/data/validation-rules.yaml`: Currency validation
- `/data/compatibility-matrix.yaml`: Version compatibility checking
- `/data/stack-patterns.yaml`: Keeping stack versions current

## Troubleshooting

### jq not installed
```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt-get install jq

# Or use without jq (grep/sed)
curl -s https://registry.npmjs.org/react/latest | grep '"version"'
```

### URL encoding issues
Some packages use scopes (e.g., `@nestjs/core`):
```bash
# Curl handles @ automatically
curl https://registry.npmjs.org/@nestjs/core/latest

# Manual encoding if needed: @ = %40
```

### SSL/Certificate errors
```bash
# If you get SSL errors, try:
curl -k https://registry.npmjs.org/...

# Or fix your certificates (better solution)
```

## Resources

- [npm Registry API docs](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md)
- [PyPI JSON API docs](https://warehouse.pypa.io/api-reference/json.html)
- [jq manual](https://stedolan.github.io/jq/manual/)

---

Last Updated: 2025-01-14
Version: 1.0
