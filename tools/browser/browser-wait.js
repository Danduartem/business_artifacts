#!/usr/bin/env node

import puppeteer from "puppeteer-core";

const args = process.argv.slice(2);
const selector = args.find((arg) => !arg.startsWith("--"));
const timeoutArg = args.find((arg) => arg.startsWith("--timeout"));
const timeout = timeoutArg ? parseInt(timeoutArg.split("=")[1]) : 30000;

if (!selector) {
  console.log("Usage: browser-wait.js <selector> [--timeout=ms]");
  console.log("\nExamples:");
  console.log('  browser-wait.js "div.content"');
  console.log('  browser-wait.js "button[type=submit]" --timeout=10000');
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
  await page.waitForSelector(selector, { timeout });
  console.log(`✓ Found ${selector}`);
} catch (error) {
  console.error(`✗ Timeout waiting for ${selector}`);
  process.exit(1);
}

await browser.disconnect();
