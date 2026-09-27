import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@slidev/parser';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'lecture01/slides.md'), 'utf8');
const { slides } = await parse(source);
assert.ok(slides.length >= 50, 'Complete guided lecture expected');
for (const slide of slides) {
  assert.ok(slide.title, `Slide ${slide.index + 1} has no title`);
  assert.ok(slide.note?.trim(), `Slide ${slide.index + 1} has no teaching notes`);
}
const images = [...source.matchAll(/src="(\/figures\/[^" ]+)"/g)];
for (const [, image] of images) {
  assert.ok(fs.existsSync(path.join(root, 'lecture01/public', image)), `Missing image ${image}`);
}
const textbook = path.resolve(root, '..', 'typescript-p5');
for (const file of ['index.html', 'package.json', 'listings/chapter01/first-sketch.ts',
  'listings/chapter01/first-ballon-game.ts', 'images/ballon.png', 'workspace']) {
  assert.ok(fs.existsSync(path.join(textbook, file)), `Textbook path not found: ${file}`);
}
assert.ok(source.includes('git clone https://github.com/m-riho/typescript-p5js-programming-textbook.git'));
assert.ok(source.includes('npm run dev'));
assert.ok(source.includes('npm install'));
assert.ok(source.includes('npm.cmd'));
assert.ok(source.includes('初回・毎回・作業の節目'));
assert.ok(!source.includes('Set-ExecutionPolicy'), 'Do not relax Windows security settings');
assert.ok(!source.includes('<div class="path-tree">'), 'Folder diagrams need pre to preserve newlines');
assert.ok(!source.includes('<div class="output">'), 'Output examples need pre to preserve newlines');
const initial = fs.readFileSync(path.join(textbook, 'index.html'), 'utf8');
assert.ok(initial.includes('src="/listings/chapter01/first-sketch.ts"'));
console.log(`PASS: ${slides.length} slides, teaching notes, ${images.length} image references, textbook paths and commands`);
