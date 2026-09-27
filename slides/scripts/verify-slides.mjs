import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-chromium';
import { parse } from '@slidev/parser';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = process.argv[2] || 'http://localhost:3031';
const output = path.join(root, 'qa');
fs.mkdirSync(output, { recursive: true });
const { slides } = await parse(fs.readFileSync(path.join(root, 'lecture01/slides.md'), 'utf8'));
const browser = await chromium.launch({ headless: true });
const errors = new Set();
const warnings = new Set();
const report = [];
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  // Headless Chromium cannot acquire the screen wake lock used during live talks.
  await page.addInitScript(() => localStorage.setItem('slidev-wake-lock', 'false'));
  page.on('pageerror', error => errors.add(error.message));
  page.on('console', message => {
    if (message.type() === 'error') warnings.add(message.text());
  });
  page.on('response', response => {
    if (response.status() >= 400) errors.add(`${response.status()} ${response.url()}`);
  });
  for (let i = 1; i <= slides.length; i++) {
    await page.goto(`${origin}/${i}`, { waitUntil: 'networkidle' });
    const current = page.locator(`.slidev-page-${i} .slidev-layout`);
    await current.waitFor({ state: 'visible' });
    await page.evaluate(() => document.fonts.ready);
    const issues = await current.evaluate(element => {
      const results = [];
      const bounds = element.getBoundingClientRect();
      for (const item of element.querySelectorAll('h1,h2,p,pre,table,.path-tree,.output,.prompt,.flow,.steps,.photo,.shot-region')) {
        const box = item.getBoundingClientRect();
        if (!box.width || !box.height) continue;
        if (box.bottom > bounds.top + 662 || box.right > bounds.right - 30 || box.left < bounds.left + 25) {
          results.push({ kind: 'bounds', tag: item.tagName, text: item.textContent.slice(0, 65), x: box.x, y: box.y, width: box.width, bottom: box.bottom });
        }
        if (item.scrollWidth > item.clientWidth + 3 && !item.classList.contains('shot-region')) {
          results.push({ kind: 'horizontal-overflow', text: item.textContent.slice(0, 65), width: item.clientWidth, scrollWidth: item.scrollWidth });
        }
      }
      for (const image of element.querySelectorAll('img')) {
        if (!image.complete || !image.naturalWidth) results.push({ kind: 'missing-image', src: image.src });
      }
      return results;
    });
    const name = String(i).padStart(3, '0');
    await page.screenshot({ path: path.join(output, `slide-${name}.png`) });
    report.push({ slide: i, title: slides[i - 1].title, issues });
    console.log(`${issues.length ? 'CHECK' : 'PASS'} ${i}: ${slides[i - 1].title}`);
  }
  fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify({ report, errors: [...errors], warnings: [...warnings] }, null, 2));
  console.log(JSON.stringify({ slides: slides.length, slidesWithIssues: report.filter(row => row.issues.length), errors: [...errors], warnings: [...warnings] }, null, 2));
  assert.equal(report.filter(row => row.issues.length).length, 0, 'Slide layout needs adjustment');
  assert.equal(errors.size, 0, 'Browser errors');
} finally {
  await browser.close();
}
