import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@slidev/parser';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'lecture02/slides.md'), 'utf8');
const { slides } = await parse(source);
assert.ok(slides.length >= 45 && slides.length <= 65, 'Expected a paced introductory lecture');
for (const slide of slides) {
  assert.ok(slide.title, `No title on slide ${slide.index + 1}`);
  assert.ok(slide.note?.trim(), `No teaching note on slide ${slide.index + 1}`);
}
const images = [...source.matchAll(/<img[^>]*src="(\/figures\/[^" ]+)"[^>]*alt="([^"]+)"/g)];
assert.ok(images.length >= 20, 'Execution examples expected');
assert.equal(images.length, [...source.matchAll(/<img\b/g)].length, 'Every image needs alt text');
for (const [, image] of images) assert.ok(fs.existsSync(path.join(root, 'lecture02/public', image)), `Missing ${image}`);
for (const name of ['points-and-lines', 'ellipses-and-rectangles', 'triangles-and-quads', 'drawing-order', 'simple-face']) {
  assert.ok(source.includes(`${name}.ts`), `Missing sample ${name}`);
  assert.ok(fs.existsSync(path.resolve(root, `../typescript-p5/listings/chapter02/${name}.ts`)));
}
for (const command of ['Get-Location', 'npm run dev', '/workspace/my-shapes.ts', 'Ctrl + S', 'import p5 from "p5"']) assert.ok(source.includes(command), `Missing ${command}`);
assert.ok(!/^git clone |^npm install|Set-ExecutionPolicy/m.test(source), 'Students are already set up');
for (const kind of ['coords', 'line', 'circle', 'ellipse', 'rect', 'triangle', 'quad']) assert.ok(source.includes(`kind="${kind}"`));
console.log(`PASS: ${slides.length} slides, ${images.length} execution-image references, notes, sample paths and diagrams`);
console.log(slides.map((slide, index) => `${index + 1}: ${slide.title}`).join('\n'));
