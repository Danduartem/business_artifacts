# PyPI Package Version Checker

Integration with PyPI (Python Package Index) API to query current package versions and metadata.

## Overview

PyPI provides a public JSON API to query package information without authentication. This allows Stack Advisor agents (primarily Scout) to fetch up-to-date version information for Python packages.

## API Endpoints

### Get Package Metadata
```
GET https://pypi.org/pypi/{package-name}/json
```

Returns complete package metadata including all versions, latest version, description, and more.

### Get Specific Version
```
GET https://pypi.org/pypi/{package-name}/{version}/json
```

Returns metadata for a specific version.

## Usage Examples

### Simple Version Check

To check the latest version of a package:

```bash
curl -s https://pypi.org/pypi/django/json | jq -r '.info.version'
# Output: "5.0.1"
```

### Full Package Info

```bash
curl -s https://pypi.org/pypi/fastapi/json | jq '{
  name: .info.name,
  version: .info.version,
  summary: .info.summary,
  homepage: .info.home_page,
  requires_python: .info.requires_python
}'
```

Output:
```json
{
  "name": "fastapi",
  "version": "0.109.0",
  "summary": "FastAPI framework, high performance, easy to learn, fast to code, ready for production",
  "homepage": "https://fastapi.tiangolo.com/",
  "requires_python": ">=3.8"
}
```

### Check Multiple Packages

```bash
# Check web frameworks
for pkg in django fastapi flask flask-restful; do
  version=$(curl -s https://pypi.org/pypi/$pkg/json | jq -r '.info.version')
  echo "$pkg: $version"
done
```

### Get Release Date

```bash
# Get latest version first
latest=$(curl -s https://pypi.org/pypi/django/json | jq -r '.info.version')
# Get release date for that version
curl -s https://pypi.org/pypi/django/json | jq -r ".releases[\"$latest\"][0].upload_time"
```

Or in one command:
```bash
curl -s https://pypi.org/pypi/django/json | jq -r '
  .info.version as $v |
  .releases[$v][0].upload_time
'
```

## For BMAD Agents

### Scout's Tech Research

When researching Python frameworks or libraries, Scout can query PyPI for:

1. **Latest version**:
   ```bash
   curl -s https://pypi.org/pypi/{package}/json | jq -r '.info.version'
   ```

2. **Release date**:
   ```bash
   curl -s https://pypi.org/pypi/{package}/json | jq -r '
     .info.version as $v | .releases[$v][0].upload_time
   '
   ```

3. **Python version requirement**:
   ```bash
   curl -s https://pypi.org/pypi/{package}/json | jq -r '.info.requires_python'
   ```

4. **Description and homepage**:
   ```bash
   curl -s https://pypi.org/pypi/{package}/json | jq '{
     summary: .info.summary,
     homepage: .info.home_page,
     docs: .info.docs_url
   }'
   ```

### Common Packages to Check

#### Web Frameworks
```bash
# Full frameworks
django
flask
fastapi
tornado
pyramid
bottle

# API frameworks
djangorestframework
flask-restful
flask-restx
```

#### ORMs and Database Clients
```bash
sqlalchemy
sqlmodel
django-orm  # Part of Django
peewee
pony
tortoise-orm
asyncpg
psycopg2
pymongo
motor  # Async MongoDB
redis
```

#### Async Frameworks
```bash
fastapi
aiohttp
starlette
quart
```

#### Data Science / ML (if relevant)
```bash
numpy
pandas
scikit-learn
tensorflow
pytorch
```

#### Testing
```bash
pytest
pytest-asyncio
pytest-django
unittest  # Built-in, not on PyPI
```

#### Package Management / Tools
```bash
poetry
pip
setuptools
wheel
```

## Response Format

The PyPI API returns JSON in this format:

```json
{
  "info": {
    "name": "package-name",
    "version": "1.2.3",
    "summary": "Package description",
    "description": "Longer description...",
    "home_page": "https://example.com",
    "docs_url": "https://docs.example.com",
    "package_url": "https://pypi.org/project/package-name/",
    "requires_python": ">=3.8",
    "license": "MIT",
    "author": "Author Name",
    "author_email": "author@example.com"
  },
  "releases": {
    "1.2.3": [
      {
        "filename": "package_name-1.2.3-py3-none-any.whl",
        "upload_time": "2025-01-14T12:00:00",
        "size": 12345,
        "python_version": "py3"
      }
    ]
  },
  "urls": [
    {
      "filename": "package_name-1.2.3-py3-none-any.whl",
      "url": "https://files.pythonhosted.org/...",
      "upload_time": "2025-01-14T12:00:00"
    }
  ]
}
```

## Useful jq Filters

### Latest Version and Release Date
```bash
curl -s https://pypi.org/pypi/django/json | jq '{
  name: .info.name,
  version: .info.version,
  released: (.info.version as $v | .releases[$v][0].upload_time),
  requires_python: .info.requires_python,
  summary: .info.summary
}'
```

### Check if Package is Maintained
```bash
# Get time since last release
curl -s https://pypi.org/pypi/django/json | jq -r '
  .info.version as $v | .releases[$v][0].upload_time
'
# Compare to current date to see if within tech_currency_threshold
```

### Get All Available Versions
```bash
curl -s https://pypi.org/pypi/django/json | jq -r '.releases | keys[]'
```

### Get Download Stats (requires different approach)
PyPI doesn't provide download stats in the API, but you can use:
- [pypistats.org](https://pypistats.org/) API
- Google BigQuery (public dataset)

## Integration Workflow

For Scout when researching a Python framework:

1. **Query PyPI for latest version**:
   ```bash
   VERSION=$(curl -s https://pypi.org/pypi/{package}/json | jq -r '.info.version')
   ```

2. **Get release date**:
   ```bash
   RELEASE_DATE=$(curl -s https://pypi.org/pypi/{package}/json | jq -r '
     .info.version as $v | .releases[$v][0].upload_time
   ')
   ```

3. **Get Python version requirement**:
   ```bash
   PY_VERSION=$(curl -s https://pypi.org/pypi/{package}/json | jq -r '.info.requires_python')
   ```

4. **Calculate age** (compare to tech_currency_threshold)

5. **Get additional metadata**:
   - Summary/description
   - Homepage/docs URL
   - License
   - Author

6. **Update framework-database.md** with current information

## Rate Limiting

PyPI API:
- No published rate limits for JSON API
- Be respectful (don't hammer the API)
- Generally sufficient for Stack Advisor usage
- No authentication required

## Error Handling

Common responses:

- **404**: Package doesn't exist
  ```json
  {"message": "Not Found"}
  ```

- **Success**: Package found (200 OK)

## Best Practices

1. **Cache results** during a session
2. **Batch queries** when checking multiple packages
3. **Handle 404s gracefully** (package might not exist)
4. **Don't spam requests** (respect the service)
5. **Check `requires_python`** for compatibility

## Examples by Framework Category

### Web Frameworks
```bash
# Django
curl -s https://pypi.org/pypi/django/json | jq '{
  version: .info.version,
  released: (.info.version as $v | .releases[$v][0].upload_time),
  requires_python: .info.requires_python
}'

# FastAPI
curl -s https://pypi.org/pypi/fastapi/json | jq '{
  version: .info.version,
  released: (.info.version as $v | .releases[$v][0].upload_time),
  requires_python: .info.requires_python
}'

# Flask
curl -s https://pypi.org/pypi/flask/json | jq '{
  version: .info.version,
  released: (.info.version as $v | .releases[$v][0].upload_time),
  requires_python: .info.requires_python
}'
```

### ORMs
```bash
# SQLAlchemy
curl -s https://pypi.org/pypi/sqlalchemy/json | jq '.info.version'

# SQLModel
curl -s https://pypi.org/pypi/sqlmodel/json | jq '.info.version'

# Tortoise ORM
curl -s https://pypi.org/pypi/tortoise-orm/json | jq '.info.version'
```

### Database Drivers
```bash
# PostgreSQL (async)
curl -s https://pypi.org/pypi/asyncpg/json | jq '.info.version'

# PostgreSQL (sync)
curl -s https://pypi.org/pypi/psycopg2/json | jq '.info.version'

# MongoDB (async)
curl -s https://pypi.org/pypi/motor/json | jq '.info.version'

# Redis
curl -s https://pypi.org/pypi/redis/json | jq '.info.version'
```

## WebFetch Integration

For BMAD agents, you can use the WebFetch tool:

```typescript
// Example query in agent context
const packageInfo = await WebFetch({
  url: 'https://pypi.org/pypi/fastapi/json',
  prompt: 'Extract the version, release date, Python requirement, and summary'
});
```

## Checking Python Version Compatibility

PyPI packages specify Python version requirements:

```bash
# Get Python version requirement
curl -s https://pypi.org/pypi/django/json | jq -r '.info.requires_python'
# Output: ">=3.10"

# Get classifiers (includes Python versions)
curl -s https://pypi.org/pypi/django/json | jq -r '.info.classifiers[] | select(startswith("Programming Language :: Python"))'
```

Output:
```
Programming Language :: Python :: 3
Programming Language :: Python :: 3.10
Programming Language :: Python :: 3.11
Programming Language :: Python :: 3.12
```

## Alternative: Libraries.io API

For more advanced metadata and cross-ecosystem data:

```bash
# Requires API key
curl https://libraries.io/api/pypi/django?api_key=YOUR_KEY
```

Returns:
- Dependent repositories
- Dependencies
- Repository info
- SourceRank (quality score)

## Comparing npm vs PyPI APIs

| Feature | npm | PyPI |
|---------|-----|------|
| Latest version | ✅ `/latest` endpoint | ✅ `.info.version` |
| Release date | ✅ `.time[version]` | ✅ `.releases[version][0].upload_time` |
| Homepage | ✅ `.homepage` | ✅ `.info.home_page` |
| Runtime req | ❌ N/A | ✅ `.info.requires_python` |
| Download stats | ✅ Separate API | ❌ Not in main API |
| Rate limits | ~1000/5min | Unspecified but generous |

## Summary

The PyPI API provides:
- ✅ Free, public access (no API key needed)
- ✅ Up-to-date version information
- ✅ Release dates for currency checking
- ✅ Python version requirements
- ✅ Metadata for research
- ✅ Fast responses
- ✅ No authentication required

Perfect for Stack Advisor's tech currency validation and Python framework research.

## Quick Reference Commands

### One-Liner: Version + Release Date
```bash
curl -s https://pypi.org/pypi/fastapi/json | jq '{
  version: .info.version,
  released: (.info.version as $v | .releases[$v][0].upload_time)
}'
```

### One-Liner: Check Multiple Packages
```bash
for pkg in django fastapi flask sqlalchemy; do
  data=$(curl -s https://pypi.org/pypi/$pkg/json)
  version=$(echo $data | jq -r '.info.version')
  released=$(echo $data | jq -r '.info.version as $v | .releases[$v][0].upload_time')
  echo "$pkg: v$version (released: $released)"
done
```

### One-Liner: Currency Check (Days Since Release)
```bash
pkg="django"
released=$(curl -s https://pypi.org/pypi/$pkg/json | jq -r '.info.version as $v | .releases[$v][0].upload_time')
days=$(( ($(date +%s) - $(date -d "$released" +%s)) / 86400 ))
echo "$pkg released $days days ago"
```
