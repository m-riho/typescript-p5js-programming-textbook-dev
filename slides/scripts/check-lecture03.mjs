import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@slidev/parser';
import { originals, cases } from '../lecture03/capture-cases.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'lecture03/slides.md'), 'utf8');
const { slides } = await parse(source);
assert.ok(slides.length >= 45 && slides.length <= 70);
for (const slide of slides) {
  assert.ok(slide.title, `Missing title: ${slide.index + 1}`);
  assert.ok(slide.note?.trim(), `Missing teaching note: ${slide.index + 1}`);
}
const images = [...source.matchAll(/<img[^>]*src="(\/figures\/[^" ]+)"[^>]*alt="([^"]+)"/g)];
assert.ok(images.length >= 25);
assert.equal(images.length, [...source.matchAll(/<img\b/g)].length, 'Every image needs alt text');
for (const [, image] of images) {
  assert.ok(fs.existsSync(path.join(root, 'lecture03/public', image)), `Missing ${image}`);
  assert.ok(cases.some(item => `${item.name}.png` === path.basename(image)), `Unknown capture: ${image}`);
}
for (const name of originals) {
  assert.ok(source.includes(`${name}.ts`), `Missing sample: ${name}`);
  assert.ok(fs.existsSync(path.resolve(root, `../typescript-p5/listings/chapter03/${name}.ts`)));
}
const appendix = slides.findIndex(slide => slide.title.startsWith('補足：'));
assert.ok(appendix >= 40);
assert.ok(!slides.slice(0, appendix).some(slide => /git clone https:/.test(slide.content)), 'Clone belongs in the appendix');
assert.ok(source.includes('git clone https://github.com/m-riho/typescript-p5js-programming-textbook.git'));
for (const term of ['npm install', 'npm run dev', 'Get-Location', '/workspace/my-colors.ts', 'import p5 from "p5"', 'p.noFill()', 'p.noStroke()', 'アルファ']) assert.ok(source.includes(term), `Missing ${term}`);
assert.ok(!source.includes('Set-ExecutionPolicy'));
assert.ok(!/^<img[^\n]+<p/m.test(source), 'Separate image and caption blocks to avoid nested paragraphs');
console.log(`PASS: ${slides.length} slides (${appendix} main + ${slides.length - appendix} appendix), ${images.length} image references, 8 samples, notes and commands`);
console.log(slides.map((slide, index) => `${index + 1}: ${slide.title}`).join('\n'));
