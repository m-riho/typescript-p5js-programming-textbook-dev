import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-chromium';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const project = path.resolve(root, '../typescript-p5');
const { createServer } = await import(path.join(project, 'node_modules/vite/dist/node/index.js'));
const server = await createServer({ root: project, server: { host: '127.0.0.1', port: 0 } });
let browser;
try {
  await server.listen();
  const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1100, height: 950 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  const originalHtml = fs.readFileSync(path.join(project, 'index.html'), 'utf8');
  await page.goto(origin);
  await page.locator('canvas').waitFor();
  await page.waitForTimeout(500);
  await page.locator('canvas').screenshot({ path: path.join(root, 'lecture01/public/figures/first-sketch-canvas.png') });
  await page.route(`${origin}/__lecture.html`, route => route.fulfill({
    contentType: 'text/html',
    body: originalHtml.replace('/listings/chapter01/first-sketch.ts', '/listings/chapter01/first-ballon-game.ts'),
  }));
  await page.goto(`${origin}/__lecture.html`);
  await page.locator('canvas').waitFor();
  await page.mouse.move(300, 320);
  await page.waitForFunction(() => {
    const canvas = document.querySelector('canvas');
    const pixels = canvas.getContext('2d').getImageData(0, 0, 800, 650).data;
    let red = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i] > 180 && pixels[i + 1] < 130 && pixels[i + 2] < 150) red++;
    }
    return red > 1500;
  }, null, { timeout: 60000 });
  await page.waitForTimeout(8000);
  await page.locator('canvas').screenshot({ path: path.join(root, 'lecture01/public/figures/ballon-game.png') });
  assert.deepEqual(errors, [], 'No browser or asset errors');
  console.log('PASS: first-sketch and ballon game run; canvas screenshots saved');
} finally {
  await browser?.close();
  await server.close();
}
