// Renders resume/resume.html to public/cv.pdf (A4, selectable text, single column so ATS parsers read it cleanly).
// Needs Playwright with Chrome available:  npm i -D playwright  &&  node scripts/build-resume.mjs
import { chromium } from "playwright";
import { pathToFileURL, fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
await page.goto(pathToFileURL(resolve(root, "resume/resume.html")).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: resolve(root, "public/cv.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log("wrote public/cv.pdf");
