#!/usr/bin/env node

import puppeteer from "puppeteer-core";

const jsonOutput = process.argv[2] === "--json";

const browser = await puppeteer.connect({
  browserURL: "http://localhost:9222",
  defaultViewport: null,
});

const page = (await browser.pages()).at(-1);

if (!page) {
  console.error("✗ No active tab found");
  process.exit(1);
}

const cookies = await page.cookies();

if (jsonOutput) {
  console.log(JSON.stringify(cookies, null, 2));
} else {
  for (const cookie of cookies) {
    console.log(`${cookie.name}=${cookie.value}`);
    console.log(`  Domain: ${cookie.domain}`);
    console.log(`  Path: ${cookie.path}`);
    console.log(`  HttpOnly: ${cookie.httpOnly}`);
    console.log(`  Secure: ${cookie.secure}`);
    console.log("");
  }
}

await browser.disconnect();
