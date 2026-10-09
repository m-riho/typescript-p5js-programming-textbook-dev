import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-chromium';
import { parse } from '@slidev/parser';

const origin = process.argv[2] || 'http://localhost:3034';
const { slides } = await parse(fs.readFileSync(new URL('../lecture03/slides.md', import.meta.url), 'utf8'));
const browser = await chromium.launch({ headless: true });
const errors = [];
const output = new URL('../qa/lecture03/', import.meta.url);
fs.mkdirSync(output, { recursive: true });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.addInitScript(() => localStorage.setItem('slidev-wake-lock', 'false'));
  page.on('pageerror', error => errors.push(error.message));
  for (const mode of ['rgb', 'alpha']) {
    const index = slides.findIndex(slide => slide.content.includes(`<ColorDemo mode="${mode}"`));
    assert.ok(index >= 0, `${mode} interactive demo is present`);
    await page.goto(`${origin}/${index + 1}`, { waitUntil: 'networkidle' });
    const demo = page.locator(`.slidev-page-${index + 1} [data-demo="${mode}"]`);
    await demo.waitFor();
    const code = demo.locator('pre');
    // Read the rendered preview, so a broken color/alpha binding fails too.
    const pixel = () => demo.locator('svg').evaluate(async svg => {
      const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' }));
      try {
        const image = new Image();
        image.src = url;
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 300;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, 500, 300);
        return [...context.getImageData(250, 150, 1, 1).data].slice(0, 3);
      } finally { URL.revokeObjectURL(url); }
    });
    if (mode === 'rgb') {
      assert.match(await code.textContent(), /p.fill\(255, 80, 0\)/);
      for (const [label, value] of [['R：赤', '12'], ['G：緑', '123'], ['B：青', '234']]) {
        await demo.getByRole('slider', { name: label, exact: true }).fill(value);
      }
      assert.match(await code.textContent(), /p.fill\(12, 123, 234\)/);
      assert.deepEqual(await pixel(), [12, 123, 234]);
      for (const [name, expected] of [['黄', [255, 255, 0]], ['白', [255, 255, 255]], ['黒', [0, 0, 0]]]) {
        await demo.getByRole('button', { name, exact: true }).click();
        assert.deepEqual(await pixel(), expected);
        assert.ok((await code.textContent()).includes(`p.fill(${expected.join(', ')})`));
      }
      await demo.getByRole('slider', { name: 'R：赤', exact: true }).focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await demo.getByRole('slider', { name: 'R：赤', exact: true }).inputValue(), '1');
      assert.ok(page.url().endsWith(`/${index + 1}`), 'Slider arrows must not change slides');
      await demo.getByRole('button', { name: '黄', exact: true }).click();
    } else {
      assert.match(await code.textContent(), /p.fill\(255, 0, 0, 128\)/);
      for (const [name, alpha, expected] of [['0：透明', 0, [0, 100, 220]], ['255：不透明', 255, [255, 0, 0]], ['128：半透明', 128, [128, 50, 110]]]) {
        await demo.getByRole('button', { name, exact: true }).click();
        assert.ok((await code.textContent()).includes(`p.fill(255, 0, 0, ${alpha})`));
        const actual = await pixel();
        assert.ok(actual.every((value, i) => Math.abs(value - expected[i]) <= 1), `${name}: ${actual}`);
      }
      await demo.getByRole('slider', { name: 'アルファ値', exact: true }).fill('64');
      assert.match(await code.textContent(), /p.fill\(255, 0, 0, 64\)/);
      const actual = await pixel();
      assert.ok(actual.every((v, i) => Math.abs(v - [64, 75, 165][i]) <= 1));
      await demo.getByRole('button', { name: '128：半透明', exact: true }).click();
    }
    for (const viewport of [{ width: 1280, height: 720 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(viewport);
      await page.screenshot({ path: fileURLToPath(new URL(`demo-${mode}-${viewport.width}.png`, output)) });
      const issues = await demo.evaluate(element => {
        const slide = element.closest('.slidev-layout').getBoundingClientRect();
        return [...element.querySelectorAll('input,button,svg,pre,label,output')].filter(item => {
          const box = item.getBoundingClientRect();
          return box.left < slide.left || box.right > slide.right || box.bottom > slide.top + slide.height * 0.92;
        }).map(item => item.tagName);
      });
      assert.deepEqual(issues, [], `${mode} fits viewport ${viewport.width}`);
    }
    await page.setViewportSize({ width: 1280, height: 720 });
    console.log(`PASS: ${mode} controls, code, rendered color and desktop/mobile bounds`);
  }
  assert.deepEqual(errors, []);
} finally { await browser.close(); }
