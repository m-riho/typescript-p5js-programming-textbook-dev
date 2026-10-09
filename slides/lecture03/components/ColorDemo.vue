<script setup lang="ts">
import { computed, ref, useId } from 'vue';

const props = defineProps<{ mode: 'rgb' | 'alpha' }>();
const id = useId();
// RGBの各成分と、手前の円の不透明度。
const red = ref<number>(255);
const green = ref<number>(80);
const blue = ref<number>(0);
const alpha = ref<number>(128);
const fillColor = computed(() => props.mode === 'rgb'
  ? `rgb(${red.value}, ${green.value}, ${blue.value})` : 'rgb(255, 0, 0)');
const code = computed(() => props.mode === 'rgb'
  ? `p.noStroke();\np.fill(${red.value}, ${green.value}, ${blue.value});\np.circle(250, 150, 210);`
  : `p.noStroke();\np.fill(0, 100, 220);\np.rect(60, 90, 380, 120);\np.fill(255, 0, 0, ${alpha.value});\np.circle(250, 150, 210);`);

const swatches = [
  { name: '赤', red: 255, green: 0, blue: 0 },
  { name: '緑', red: 0, green: 255, blue: 0 },
  { name: '青', red: 0, green: 0, blue: 255 },
  { name: '黄', red: 255, green: 255, blue: 0 },
  { name: 'シアン', red: 0, green: 255, blue: 255 },
  { name: 'マゼンタ', red: 255, green: 0, blue: 255 },
  { name: '白', red: 255, green: 255, blue: 255 },
  { name: '黒', red: 0, green: 0, blue: 0 },
];

function setColor(r: number, g: number, b: number): void {
  red.value = r;
  green.value = g;
  blue.value = b;
}
</script>

<template>
  <div class="color-demo" :data-demo="mode" @keydown.stop @pointerdown.stop @click.stop>
    <div class="demo-controls">
      <template v-if="mode === 'rgb'">
        <div class="channel red-channel">
          <label :for="`${id}-red`">R：赤</label>
          <input :id="`${id}-red`" v-model.number="red" type="range" min="0" max="255" step="1" />
          <output :for="`${id}-red`">{{ red }}</output>
        </div>
        <div class="channel green-channel">
          <label :for="`${id}-green`">G：緑</label>
          <input :id="`${id}-green`" v-model.number="green" type="range" min="0" max="255" step="1" />
          <output :for="`${id}-green`">{{ green }}</output>
        </div>
        <div class="channel blue-channel">
          <label :for="`${id}-blue`">B：青</label>
          <input :id="`${id}-blue`" v-model.number="blue" type="range" min="0" max="255" step="1" />
          <output :for="`${id}-blue`">{{ blue }}</output>
        </div>
        <div class="range-labels"><span>0</span><span>255</span></div>
        <div class="demo-swatches" role="group" aria-label="色見本">
          <button v-for="swatch in swatches" :key="swatch.name" type="button"
            :aria-label="swatch.name" :title="`${swatch.name} (${swatch.red}, ${swatch.green}, ${swatch.blue})`"
            :aria-pressed="red === swatch.red && green === swatch.green && blue === swatch.blue"
            @click="setColor(swatch.red, swatch.green, swatch.blue)">
            <span class="color-chip" :style="{ backgroundColor: `rgb(${swatch.red}, ${swatch.green}, ${swatch.blue})` }"></span>
            <span>{{ swatch.name }}</span>
          </button>
        </div>
      </template>
      <template v-else>
        <label class="alpha-label" :for="`${id}-alpha`">アルファ値</label>
        <div class="alpha-control">
          <input :id="`${id}-alpha`" v-model.number="alpha" type="range" min="0" max="255" step="1" />
          <output :for="`${id}-alpha`">{{ alpha }}</output>
        </div>
        <div class="alpha-ends"><span>0：透明</span><span>255：不透明</span></div>
        <div class="alpha-presets" role="group" aria-label="不透明度の比較">
          <button type="button" :aria-pressed="alpha === 0" @click="alpha = 0">0：透明</button>
          <button type="button" :aria-pressed="alpha === 128" @click="alpha = 128">128：半透明</button>
          <button type="button" :aria-pressed="alpha === 255" @click="alpha = 255">255：不透明</button>
        </div>
        <p class="demo-explanation">変わるのは、手前の赤い円の不透明度です。</p>
        <p class="demo-explanation">青い長方形は不透明のままです。</p>
      </template>
    </div>
    <div class="demo-preview">
      <svg width="500" height="300" viewBox="0 0 500 300" role="img"
        :aria-label="mode === 'rgb' ? `RGB ${red}, ${green}, ${blue} の円` : `青い長方形に重なる、アルファ値${alpha}の赤い円`">
        <rect width="500" height="300" fill="white" />
        <rect v-if="mode === 'alpha'" x="60" y="90" width="380" height="120" fill="rgb(0, 100, 220)" />
        <circle cx="250" cy="150" r="105" :fill="fillColor" :fill-opacity="mode === 'alpha' ? alpha / 255 : 1" />
      </svg>
      <pre class="demo-code"><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.color-demo { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 40px; margin-top: 28px; }
.demo-controls { padding-top: 18px; min-width: 0; }
.channel { display: grid; grid-template-columns: 92px minmax(0, 1fr) 58px; gap: 14px; align-items: center; margin-bottom: 24px; }
label, output { font-size: 27px; font-weight: 700; }
output { text-align: right; font-variant-numeric: tabular-nums; }
input[type=range] { width: 100%; min-width: 0; height: 36px; cursor: pointer; accent-color: #0066a6; }
.red-channel input { accent-color: #bd2941; }
.green-channel input { accent-color: #087653; }
.blue-channel input { accent-color: #0066a6; }
.range-labels { display: flex; justify-content: space-between; margin: -16px 72px 20px 106px; font-size: 19px; color: #58656f; }
.demo-swatches { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px 10px; }
button { cursor: pointer; font-family: inherit; }
.demo-swatches button { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 3px; font-size: 19px; background: transparent; border: 2px solid transparent; border-radius: 4px; }
.color-chip { width: 58px; height: 32px; border: 1px solid #65717a; }
button[aria-pressed=true] { border-color: #0066a6; background: #eaf5fb; }
button:hover { background: #edf3f7; }
button:focus-visible, input:focus-visible { outline: 3px solid #0066a6; outline-offset: 4px; }
.demo-preview { min-width: 0; }
.demo-preview svg { display: block; width: 100%; height: 260px; border: 1px solid #c8dbe6; background: white; }
.slidev-layout pre.demo-code { margin: 12px 0 0 !important; padding: 10px 14px !important; font-size: 21px; line-height: 1.45; }
.slidev-layout pre.demo-code code { font-size: 21px !important; line-height: 1.45 !important; white-space: pre; }
.alpha-label { display: block; margin-bottom: 12px; }
.alpha-control { display: grid; grid-template-columns: minmax(0, 1fr) 64px; gap: 20px; align-items: center; }
.alpha-ends { display: flex; justify-content: space-between; margin: 0 84px 26px 0; font-size: 21px; }
.alpha-presets { display: flex; margin: 0 0 32px; }
.alpha-presets button { flex: 1; border: 1px solid #84949f; padding: 10px 4px; font-size: 21px; }
.alpha-presets button + button { border-left: 0; }
.alpha-presets button[aria-pressed=true] { background: #dceff9; box-shadow: inset 0 -3px #0066a6; }
.slidev-layout .demo-explanation { font-size: 24px; line-height: 1.65; margin: 14px 0; }
</style>
