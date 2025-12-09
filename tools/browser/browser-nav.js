#!/usr/bin/env node

import puppeteer from "puppeteer-core";

const args = process.argv.slice(2);
const newTab = args.includes("--new");
const url = args.find((arg) => !arg.startsWith("--"));

if (!url) {
  console.log("Usage: browser-nav.js <url> [--new]");
  console.log("\nOptions:");
  console.log("  --new  Open in new tab instead of reusing current tab");
  console.log("\nExamples:");
  console.log("  browser-nav.js https://example.com");
  console.log("  browser-nav.js https://example.com --new");
  process.exit(1);
}

const browser = await puppeteer.connect({
  browserURL: "http://localhost:9222",
  defaultViewport: null,
});

let page;
if (newTab) {
  page = await browser.newPage();
} else {
  const pages = await browser.pages();
  page = pages.at(-1) || (await browser.newPage());
}

await page.goto(url, { waitUntil: "networkidle2" });
console.log(`✓ Navigated to ${url}`);

await browser.disconnect();
