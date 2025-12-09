# Browser Tools

Low-level browser automation tools using Puppeteer Core. These tools connect to Chrome running on `:9222` with remote debugging enabled.

## Start Chrome

```bash
browser-start.js              # Fresh profile
browser-start.js --profile    # Copy user's profile (cookies, logins)
```

Launch Chrome with remote debugging. Use `--profile` to preserve user's authentication state.

## Navigate

```bash
browser-nav.js https://example.com
browser-nav.js https://example.com --new
```

Navigate to URLs. Use `--new` flag to open in a new tab instead of reusing current tab.

## Evaluate JavaScript

```bash
browser-eval.js 'document.title'
browser-eval.js 'document.querySelectorAll("a").length'
browser-eval.js 'Array.from(document.querySelectorAll("h2")).map(h => h.textContent)'
```

Execute JavaScript in the active tab. Code runs in async context. Use this to extract data, inspect page state, or perform DOM operations programmatically.

## Screenshot

```bash
browser-screenshot.js
browser-screenshot.js --full    # Full page screenshot

```

Capture current viewport and return temporary file path. Use this to visually inspect page state or verify UI changes.

## Wait

```bash
browser-wait.js 'div.content'
browser-wait.js 'button[type="submit"]' --timeout=10000
```

Wait for selector to appear. Use this to ensure elements are loaded before interacting with them.

## Click

```bash
browser-click.js 'button.submit'
browser-click.js 'a[href="/login"]'
```

Click element by selector. Use this to interact with buttons, links, or other clickable elements.

## Cookies

```bash
browser-cookies.js
browser-cookies.js --json
```

Display all cookies for the current tab including domain, path, httpOnly, and secure flags. Use this to debug authentication issues or inspect session state.

### browser-cookies.js
Get all cookies for current domain.

```bash
./browser-cookies.js
./browser-cookies.js --json
```
