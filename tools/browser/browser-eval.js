#!/usr/bin/env node

import puppeteer from "puppeteer-core";

const code = process.argv.slice(2).join(" ");
if (!code) {
  console.log("Usage: browser-eval.js 'code'");
  console.log("\nExamples:");
  console.log('  browser-eval.js "document.title"');
  console.log('  browser-eval.js "document.querySelectorAll(\'a\').length"');
  console.log('  browser-eval.js "Array.from(document.querySelectorAll(\'h2\')).map(h => h.textContent)"');
  process.exit(1);
}

const browser = await puppeteer.connect({
  browserURL: "http://localhost:9222",
  defaultViewport: null,
});

const page = (await browser.pages()).at(-1);

if (!page) {
  console.error("✗ No active tab found");
  process.exit(1);
}

const result = await page.evaluate((c) => {
  const AsyncFunction = (async () => {}).constructor;
  return new AsyncFunction(`return (${c})`)();
}, code);

// Output as JSON for easy parsing
console.log(JSON.stringify(result, null, 2));

await browser.disconnect();
