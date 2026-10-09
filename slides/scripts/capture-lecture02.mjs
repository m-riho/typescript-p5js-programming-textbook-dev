import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-chromium';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const project = path.resolve(root, '../typescript-p5');
const { createServer } = await import(path.join(project, 'node_modules/vite/dist/node/index.js'));
const ts = (await import(path.join(project, 'node_modules/typescript/lib/typescript.js'))).default;
const output = path.join(root, 'lecture02/public/figures');
fs.mkdirSync(output, { recursive: true });

const originals = ['points-and-lines', 'ellipses-and-rectangles', 'triangles-and-quads', 'drawing-order', 'simple-face'];
const cases = originals.map(name => ({ name, file: name }));
const change = (name, file, replacements) => cases.push({ name, file, replacements });
change('circle-larger', 'ellipses-and-rectangles', [['p.circle(300, 120, 100)', 'p.circle(300, 120, 160)']]);
change('ellipse-tall', 'ellipses-and-rectangles', [['p.ellipse(120, 120, 160, 120)', 'p.ellipse(120, 120, 120, 160)']]);
change('shapes-exercise', 'ellipses-and-rectangles', [
  ['p.ellipse(120, 120, 160, 120)', 'p.ellipse(120, 120, 120, 120)'],
  ['p.circle(300, 120, 100)', 'p.circle(300, 100, 100)'],
  ['p.rect(360, 70, 80, 100)', 'p.rect(360, 70, 60, 100)'],
]);
change('triangle-lower', 'triangles-and-quads', [['p.triangle(30, 120, 80, 30, 130, 120)', 'p.triangle(30, 120, 80, 70, 130, 120)']]);
change('order-reversed', 'drawing-order', [[
  'p.rect(80, 70, 180, 80);  // 先に長方形を描く\n        p.circle(220, 130, 130);  // 後から円を描くので、円が手前に表示される',
  'p.circle(220, 130, 130);\n        p.rect(80, 70, 180, 80);',
]]);

const demo = (name, width, height, commands) => cases.push({ name, source: `import p5 from "p5";
const sketch = (p: p5): void => {
  p.setup = (): void => {
    p.createCanvas(${width}, ${height});
    p.background(250);
    ${commands}
  };
};
new p5(sketch);
` });
demo('point-right', 400, 240, 'p.strokeWeight(8); p.point(80, 80); p.point(180, 80);');
demo('weight-points', 400, 240, 'p.strokeWeight(2); p.point(80, 120); p.strokeWeight(8); p.point(200, 120); p.strokeWeight(16); p.point(320, 120);');
demo('cross-lines', 400, 300, 'p.strokeWeight(4); p.line(80, 80, 320, 80); p.line(200, 40, 200, 240);');
demo('anchor-circle', 400, 300, 'p.circle(200, 150, 100);');
demo('anchor-rect', 400, 300, 'p.rect(200, 150, 100, 100);');
demo('background-first', 400, 240, 'p.circle(200, 120, 100);');
demo('background-last', 400, 240, 'p.circle(200, 120, 100); p.background(250);');
demo('face-outline', 400, 400, 'p.circle(200, 190, 220);');
demo('face-eyes', 400, 400, 'p.circle(200, 190, 220); p.circle(155, 160, 35); p.circle(245, 160, 35);');
demo('face-outline-last', 400, 400, 'p.circle(155, 160, 35); p.circle(245, 160, 35); p.triangle(200, 185, 180, 225, 220, 225); p.line(155, 270, 245, 270); p.circle(200, 190, 220);');
demo('house-example', 400, 300, 'p.rect(100, 130, 200, 140); p.triangle(70, 130, 200, 35, 330, 130); p.rect(130, 160, 45, 45); p.rect(220, 185, 50, 85);');

for (const item of cases) {
  if (item.file) {
    item.source = fs.readFileSync(path.join(project, `listings/chapter02/${item.file}.ts`), 'utf8');
    for (const [before, after] of item.replacements || []) {
      assert.ok(item.source.includes(before), `Source changed: ${item.name}: ${before}`);
      item.source = item.source.replace(before, after);
    }
  }
}

// Type-check the exact capture sources in memory; leave student files untouched.
const virtual = new Map(cases.map(item => [path.join(project, `__lecture02-${item.name}.ts`), item.source]));
const options = { noEmit: true, strict: true, skipLibCheck: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler };
const host = ts.createCompilerHost(options);
const readFile = host.readFile.bind(host);
const fileExists = host.fileExists.bind(host);
host.readFile = name => virtual.get(name) ?? readFile(name);
host.fileExists = name => virtual.has(name) || fileExists(name);
host.getSourceFile = (name, languageVersion) => {
  const source = host.readFile(name);
  return source === undefined ? undefined : ts.createSourceFile(name, source, languageVersion);
};
const program = ts.createProgram([...virtual.keys()], options, host);
const diagnostics = ts.getPreEmitDiagnostics(program);
assert.equal(diagnostics.length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, {
  getCurrentDirectory: () => project, getCanonicalFileName: name => name, getNewLine: () => '\n',
}));

const server = await createServer({
  root: project,
  server: { host: '127.0.0.1', port: 0 },
  plugins: [{
    name: 'lecture02-capture',
    enforce: 'pre',
    resolveId(id) {
      if (id.startsWith('/__lecture02/') && id.endsWith('.ts')) return `\0${id}`;
    },
    load(id) {
      if (!id.startsWith('\0/__lecture02/')) return;
      const name = path.basename(id, '.ts');
      const source = cases.find(item => item.name === name)?.source;
      // Vite skips TypeScript stripping for null-prefixed virtual modules.
      return source && ts.transpileModule(source, { compilerOptions: options }).outputText;
    },
  }],
});
let browser;
try {
  await server.listen();
  const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 900, height: 700 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', error => { errors.push(error.message); console.error(error.message); });
  page.on('response', response => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  const report = [];
  for (const item of cases) {
    const url = `${origin}/__lecture02-${item.name}.html`;
    await page.route(url, route => route.fulfill({ contentType: 'text/html', body:
      `<!doctype html><html><head><meta charset="UTF-8"><link rel="icon" href="data:,"></head><body><script type="module" src="/__lecture02/${item.name}.ts"></script></body></html>` }));
    await page.goto(url);
    await page.locator('canvas').waitFor().catch(error => {
      throw new Error(`${item.name}: ${errors.join('; ') || error.message}`);
    });
    await page.waitForTimeout(200);
    const pixels = await page.locator('canvas').evaluate(canvas => {
      const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
      let dark = 0;
      for (let i = 0; i < data.length; i += 4) if (data[i] < 100 && data[i + 1] < 100 && data[i + 2] < 100) dark++;
      return { width: canvas.width, height: canvas.height, dark };
    });
    assert.ok(item.name === 'background-last' ? pixels.dark === 0 : pixels.dark > 5, `Unexpected canvas: ${item.name}`);
    await page.locator('canvas').screenshot({ path: path.join(output, `${item.name}.png`) });
    report.push({ name: item.name, ...pixels });
    console.log(`PASS ${item.name}: ${pixels.width}x${pixels.height}, ${pixels.dark} dark pixels`);
  }
  assert.deepEqual(errors, []);
  assert.notDeepEqual(fs.readFileSync(path.join(output, 'drawing-order.png')), fs.readFileSync(path.join(output, 'order-reversed.png')));
  fs.mkdirSync(path.join(root, 'qa/lecture02'), { recursive: true });
  fs.writeFileSync(path.join(root, 'qa/lecture02/captures.json'), JSON.stringify(report, null, 2));
  console.log(`PASS: ${cases.length} TypeScript examples and canvas captures; no source files modified`);
} finally {
  await browser?.close();
  await server.close();
}
