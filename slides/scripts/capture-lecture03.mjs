import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-chromium';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const project = path.resolve(root, '../typescript-p5');
const { createServer } = await import(path.join(project, 'node_modules/vite/dist/node/index.js'));
const ts = (await import(path.join(project, 'node_modules/typescript/lib/typescript.js'))).default;
const output = path.join(root, 'lecture03/public/figures');
fs.mkdirSync(output, { recursive: true });

const { cases } = await import('../lecture03/capture-cases.mjs');

for (const item of cases) {
  if (item.file) {
    item.source = fs.readFileSync(path.join(project, `listings/chapter03/${item.file}.ts`), 'utf8');
    for (const [before, after] of item.replacements || []) {
      assert.ok(item.source.includes(before), `Source changed: ${item.name}: ${before}`);
      item.source = item.source.replace(before, after);
    }
  }
}

// Type-check the exact capture sources in memory; leave student files untouched.
const virtual = new Map(cases.map(item => [path.join(project, `__lecture03-${item.name}.ts`), item.source]));
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
    name: 'lecture03-capture',
    enforce: 'pre',
    resolveId(id) {
      if (id.startsWith('/__lecture03/') && id.endsWith('.ts')) return `\0${id}`;
    },
    load(id) {
      if (!id.startsWith('\0/__lecture03/')) return;
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
    const url = `${origin}/__lecture03-${item.name}.html`;
    await page.route(url, route => route.fulfill({ contentType: 'text/html', body:
      `<!doctype html><html><head><meta charset="UTF-8"><link rel="icon" href="data:,"></head><body><script type="module" src="/__lecture03/${item.name}.ts"></script></body></html>` }));
    await page.goto(url);
    await page.locator('canvas').waitFor().catch(error => {
      throw new Error(`${item.name}: ${errors.join('; ') || error.message}`);
    });
    await page.waitForTimeout(200);
    const pixels = await page.locator('canvas').evaluate(canvas => {
      const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
      let changed = 0;
      for (let i = 0; i < data.length; i += 4) {
        if ([0, 1, 2].some(channel => Math.abs(data[i + channel] - data[channel]) > 3)) changed++;
      }
      return { width: canvas.width, height: canvas.height, changed };
    });
    assert.ok(item.blank ? pixels.changed === 0 : pixels.changed > 5, `Unexpected canvas: ${item.name}`);
    for (const [x, y, expected] of item.probes || []) {
      const actual = await page.locator('canvas').evaluate((canvas, point) => {
        const ratio = canvas.width / canvas.getBoundingClientRect().width;
        return [...canvas.getContext('2d').getImageData(point[0] * ratio, point[1] * ratio, 1, 1).data].slice(0, 3);
      }, [x, y]);
      assert.ok(actual.every((value, i) => Math.abs(value - expected[i]) <= 2),
        `${item.name} at (${x},${y}): expected ${expected}, got ${actual}`);
    }
    await page.locator('canvas').screenshot({ path: path.join(output, `${item.name}.png`) });
    report.push({ name: item.name, ...pixels });
    console.log(`PASS ${item.name}: ${pixels.width}x${pixels.height}, ${pixels.changed} non-background pixels`);
  }
  assert.deepEqual(errors, []);
  assert.notDeepEqual(fs.readFileSync(path.join(output, 'transparent-colors.png')), fs.readFileSync(path.join(output, 'alpha-reversed.png')));
  fs.mkdirSync(path.join(root, 'qa/lecture03'), { recursive: true });
  fs.writeFileSync(path.join(root, 'qa/lecture03/captures.json'), JSON.stringify(report, null, 2));
  console.log(`PASS: ${cases.length} TypeScript examples and canvas captures; no source files modified`);
} finally {
  await browser?.close();
  await server.close();
}
