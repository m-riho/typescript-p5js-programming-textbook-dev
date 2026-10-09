// Teacher-side capture definitions. These do not modify the student examples.
export const originals = ['rgb-colors', 'grayscale-colors', 'fill-and-stroke', 'no-fill-and-no-stroke', 'color-state', 'transparent-colors', 'transparent-color-wrapped', 'colored-face'];
export const cases = originals.map(name => ({ name, file: name }));
cases.push({ name: 'face-monochrome', file: '../chapter02/simple-face' });
const change = (name, file, replacements) => cases.push({ name, file, replacements });
const demo = (name, commands, probes = [], blank = false, width = 420, height = 240) => cases.push({ name, probes, blank, source: `import p5 from "p5";
const sketch = (p: p5): void => {
  p.setup = (): void => {
    p.createCanvas(${width}, ${height});
    p.background(255);
    ${commands}
  };
};
new p5(sketch);
` });

change('rgb-yellow', 'rgb-colors', [['p.fill(255, 0, 0)', 'p.fill(255, 255, 0)']]);
change('stroke-thick', 'fill-and-stroke', [['p.strokeWeight(6)', 'p.strokeWeight(18)']]);
change('gray-background', 'grayscale-colors', [['p.background(255)', 'p.background(80)']]);
change('state-all-blue', 'color-state', [['p.fill(255, 120, 80)', 'p.fill(80, 150, 255)']]);
for (const alpha of [0, 80, 220, 255]) {
  change(`alpha-${alpha}`, 'transparent-colors', [
    ['p.fill(255, 0, 0, 150)', `p.fill(255, 0, 0, ${alpha})`],
    ['p.fill(0, 100, 255, 150)', `p.fill(0, 100, 255, ${alpha})`],
  ]);
}
cases.find(item => item.name === 'alpha-0').blank = true;
demo('alpha-reversed', 'p.noStroke(); p.fill(0, 100, 255, 150); p.circle(250, 120, 150); p.fill(255, 0, 0, 150); p.circle(170, 120, 150);');
demo('fill-before', 'p.fill(255, 0, 0); p.circle(210, 120, 120);', [[210, 120, [255, 0, 0]]]);
demo('fill-after', 'p.circle(210, 120, 120); p.fill(255, 0, 0);', [[210, 120, [255, 255, 255]]]);
demo('white-fill', 'p.background(120, 180, 220); p.strokeWeight(4); p.fill(255); p.circle(210, 120, 150);', [[210, 120, [255, 255, 255]]]);
demo('no-fill', 'p.background(120, 180, 220); p.strokeWeight(4); p.noFill(); p.circle(210, 120, 150);', [[210, 120, [120, 180, 220]]]);
demo('both-off', 'p.noFill(); p.noStroke(); p.circle(210, 120, 150);', [[210, 120, [255, 255, 255]]], true);
demo('restore-stroke', 'p.noFill(); p.noStroke(); p.stroke(30, 90, 180); p.strokeWeight(6); p.circle(210, 120, 150);');
demo('fill-only', 'p.noStroke(); p.fill(255, 210, 80); p.circle(210, 120, 150);');
demo('state-one', 'p.background(240); p.fill(255, 120, 80); p.circle(120, 110, 100);', [], false, 460, 220);
demo('state-two', 'p.background(240); p.fill(255, 120, 80); p.circle(120, 110, 100); p.rect(200, 60, 100, 100);', [], false, 460, 220);
demo('line-color', 'p.stroke(180, 40, 70); p.strokeWeight(6); p.line(60, 120, 360, 120);');
change('face-cool', 'colored-face', [
  ['p.background(230, 240, 255)', 'p.background(35, 45, 70)'],
  ['p.fill(255, 220, 140)', 'p.fill(150, 210, 240)'],
  ['p.fill(255, 160, 120)', 'p.fill(200, 170, 240)'],
]);
cases.push({ name: 'face-outline', file: 'colored-face', replacements: [[
  '        p.fill(40);',
  '        return;\n        p.fill(40);',
]] });
// Exact center-color checks verify settings and compositing, not just nonblank canvases.
cases.find(item => item.name === 'rgb-colors').probes = [[100, 90, [255, 0, 0]], [210, 90, [0, 180, 0]], [320, 90, [0, 80, 255]]];
cases.find(item => item.name === 'color-state').probes = [[120, 110, [255, 120, 80]], [250, 110, [255, 120, 80]], [340, 110, [80, 150, 255]]];
const blend = (top, bottom) => top.map((value, index) => Math.round(value * 150 / 255 + bottom[index] * 105 / 255));
cases.find(item => item.name === 'transparent-colors').probes = [[210, 120, blend([0, 100, 255], blend([255, 0, 0], [255, 255, 255]))]];
cases.find(item => item.name === 'alpha-reversed').probes = [[210, 120, blend([255, 0, 0], blend([0, 100, 255], [255, 255, 255]))]];
