# npm Package Version Checker

Integration with npm Registry API to query current package versions and metadata.

## Overview

The npm Registry provides a public API to query package information without authentication. This allows Stack Advisor agents (primarily Scout) to fetch up-to-date version information for JavaScript/TypeScript packages.

## API Endpoints

### Get Package Metadata
```
GET https://registry.npmjs.org/{package-name}
```

Returns complete package metadata including all versions, latest version, description, and more.

### Get Latest Version Only
```
GET https://registry.npmjs.org/{package-name}/latest
```

Returns only the latest published version metadata.

### Get Specific Version
```
GET https://registry.npmjs.org/{package-name}/{version}
```

Returns metadata for a specific version.

## Usage Examples

### Simple Version Check

To check the latest version of a package:

```bash
curl https://registry.npmjs.org/react/latest | jq '.version'
# Output: "18.2.0"
```

### Full Package Info

```bash
curl https://registry.npmjs.org/next | jq '{
  name: .name,
  latest: ."dist-tags".latest,
  description: .description,
  homepage: .homepage
}'
```

Output:
```json
{
  "name": "next",
  "latest": "14.1.0",
  "description": "The React Framework",
  "homepage": "https://nextjs.org"
}
```

### Check Multiple Packages

```bash
# Check frontend frameworks
for pkg in react vue svelte solid-js; do
  version=$(curl -s https://registry.npmjs.org/$pkg/latest | jq -r '.version')
  echo "$pkg: $version"
done
```

### Get Release Date

```bash
curl -s https://registry.npmjs.org/react/latest | jq -r '.time | to_entries[] | select(.key == .version) | .value'
```

## For BMAD Agents

### Scout's Tech Research

When researching frameworks or libraries, Scout can query npm for:

1. **Latest version**:
   ```bash
   curl -s https://registry.npmjs.org/{package}/latest | jq -r '.version'
   ```

2. **Release date**:
   ```bash
   curl -s https://registry.npmjs.org/{package}/latest | jq -r '.time[.version]'
   ```

3. **Description and homepage**:
   ```bash
   curl -s https://registry.npmjs.org/{package}/latest | jq -r '{description, homepage}'
   ```

4. **Repository URL**:
   ```bash
   curl -s https://registry.npmjs.org/{package}/latest | jq -r '.repository.url'
   ```

### Common Packages to Check

#### Frontend Frameworks
```bash
# React ecosystem
react
react-dom
next
remix
@remix-run/react

# Vue ecosystem
vue
nuxt
@nuxt/kit

# Svelte
svelte
@sveltejs/kit

# Solid
solid-js
solid-start

# Astro
astro
```

#### Backend Frameworks (Node.js)
```bash
express
fastify
@nestjs/core
hono
koa
```

#### ORMs and Database Clients
```bash
prisma
drizzle-orm
sequelize
typeorm
mongoose
pg
mysql2
ioredis
```

#### UI Libraries
```bash
@mui/material
@chakra-ui/react
antd
@headlessui/react
@radix-ui/react-dialog
```

#### Build Tools
```bash
vite
webpack
@vitejs/plugin-react
turbo
esbuild
```

#### Testing
```bash
vitest
jest
@testing-library/react
playwright
cypress
```

## Response Format

The npm API returns JSON in this format:

```json
{
  "name": "package-name",
  "version": "1.2.3",
  "description": "Package description",
  "dist-tags": {
    "latest": "1.2.3",
    "next": "2.0.0-beta.1"
  },
  "time": {
    "1.2.3": "2025-01-14T12:00:00.000Z"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/user/repo.git"
  },
  "homepage": "https://example.com",
  "license": "MIT",
  "dependencies": {
    "dep1": "^1.0.0"
  }
}
```

## Useful jq Filters

### Latest Version and Release Date
```bash
curl -s https://registry.npmjs.org/react/latest | jq '{
  name: .name,
  version: .version,
  released: .time[.version],
  description: .description
}'
```

### Check if Package is Maintained
```bash
# Get time since last release
curl -s https://registry.npmjs.org/react/latest | jq -r '.time[.version]'
# Compare to current date to see if within tech_currency_threshold
```

### Get All Available Versions
```bash
curl -s https://registry.npmjs.org/react | jq -r '.versions | keys[]'
```

### Get Download Stats (requires different API)
```bash
# npm download stats API
curl -s https://api.npmjs.org/downloads/point/last-month/react | jq '.downloads'
```

## Integration Workflow

For Scout when researching a framework:

1. **Query npm for latest version**:
   ```bash
   VERSION=$(curl -s https://registry.npmjs.org/{package}/latest | jq -r '.version')
   ```

2. **Get release date**:
   ```bash
   RELEASE_DATE=$(curl -s https://registry.npmjs.org/{package}/latest | jq -r '.time[.version]')
   ```

3. **Calculate age** (compare to tech_currency_threshold from project intake)

4. **Get additional metadata**:
   - Description
   - Homepage/docs URL
   - Repository URL
   - License

5. **Update framework-database.md** with current information

## Rate Limiting

The npm Registry API has generous rate limits:
- **Anonymous**: ~1000 requests per 5 minutes
- Generally sufficient for Stack Advisor usage
- No authentication required for public packages

## Error Handling

Common responses:

- **404**: Package doesn't exist
  ```json
  {"error": "Not found"}
  ```

- **Success**: Package found (200 OK)

- **Rate limited** (429): Wait and retry

## Best Practices

1. **Cache results** during a session (don't re-query same package)
2. **Batch queries** when checking multiple packages
3. **Handle 404s gracefully** (package might not exist)
4. **Respect rate limits** (don't hammer the API)
5. **Use `/latest` endpoint** for simple version checks (faster)

## Alternative: npms.io API

For more advanced metadata (quality score, popularity):

```bash
curl https://api.npms.io/v2/package/react
```

Returns:
- Quality score
- Popularity score
- Maintenance score
- GitHub stars
- Downloads

Useful for **Dana** when comparing packages.

## WebFetch Integration

For BMAD agents, you can use the WebFetch tool:

```typescript
// Example query in agent context
const packageInfo = await WebFetch({
  url: 'https://registry.npmjs.org/react/latest',
  prompt: 'Extract the version, release date, and description'
});
```

## Examples by Framework Category

### Frontend Meta-Frameworks
```bash
# Next.js
curl -s https://registry.npmjs.org/next/latest | jq '{version, released: .time[.version]}'

# Remix
curl -s https://registry.npmjs.org/@remix-run/react/latest | jq '{version, released: .time[.version]}'

# Nuxt
curl -s https://registry.npmjs.org/nuxt/latest | jq '{version, released: .time[.version]}'

# SvelteKit
curl -s https://registry.npmjs.org/@sveltejs/kit/latest | jq '{version, released: .time[.version]}'

# Astro
curl -s https://registry.npmjs.org/astro/latest | jq '{version, released: .time[.version]}'
```

### State Management
```bash
# Redux
curl -s https://registry.npmjs.org/redux/latest | jq '.version'

# Zustand
curl -s https://registry.npmjs.org/zustand/latest | jq '.version'

# Jotai
curl -s https://registry.npmjs.org/jotai/latest | jq '.version'

# Pinia (Vue)
curl -s https://registry.npmjs.org/pinia/latest | jq '.version'
```

## Troubleshooting

### Package Not Found
Some packages use scoped names (e.g., `@org/package`):
```bash
# Correct
curl https://registry.npmjs.org/@nestjs/core/latest

# Note: @ is URL-encoded as %40 automatically by curl
```

### Getting Old Cached Data
Add a cache-busting parameter:
```bash
curl "https://registry.npmjs.org/react/latest?$(date +%s)"
```

## Summary

The npm Registry API provides:
- ✅ Free, public access (no API key needed)
- ✅ Up-to-date version information
- ✅ Release dates for currency checking
- ✅ Metadata for research
- ✅ Fast responses
- ✅ Generous rate limits

Perfect for Stack Advisor's tech currency validation and framework research.
