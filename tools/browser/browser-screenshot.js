#!/usr/bin/env node

import puppeteer from "puppeteer-core";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const fullPage = process.argv[2] === "--full";

const browser = await puppeteer.connect({
  browserURL: "http://localhost:9222",
  defaultViewport: null,
});

const page = (await browser.pages()).at(-1);

if (!page) {
  console.error("✗ No active tab found");
  process.exit(1);
}

// Create temp file
const tmpDir = mkdtempSync(join(tmpdir(), "screenshot-"));
const filePath = join(tmpDir, "screenshot.png");

// Take screenshot
await page.screenshot({
  path: filePath,
  fullPage: fullPage,
});

// Output file path
console.log(filePath);

await browser.disconnect();
