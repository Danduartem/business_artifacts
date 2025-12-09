#!/usr/bin/env node

import puppeteer from "puppeteer-core";

const selector = process.argv[2];

if (!selector) {
  console.log("Usage: browser-click.js <selector>");
  console.log("\nExamples:");
  console.log('  browser-click.js "button.submit"');
  console.log('  browser-click.js "a[href=\\"/login\\"]"');
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

try {
  await page.waitForSelector(selector, { timeout: 5000 });
  await page.click(selector);
  console.log(`✓ Clicked ${selector}`);
} catch (error) {
  console.error(`✗ Failed to click ${selector}: ${error.message}`);
  process.exit(1);
}

await browser.disconnect();
