<script setup lang="ts">
import { useId } from 'vue';
defineProps<{ kind: string }>();
const arrowId = `arrow-${useId().replace(/:/g, '')}`;
</script>

<template>
  <svg class="diagram" viewBox="0 0 560 350" role="img" :aria-label="{
    parts: '図形の内側はfill、輪郭の色はstroke、輪郭の太さはstrokeWeightで指定する',
    rgb: 'RGBは赤、緑、青の順に0から255の強さを指定する',
    alpha: 'アルファ値は0で透明、255で不透明。中間の値では下の色も見える'
  }[kind]">
    <defs><marker :id="arrowId" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#58656f" /></marker></defs>
    <template v-if="kind === 'parts'">
      <rect x="45" y="65" width="245" height="165" fill="rgb(255,210,80)" stroke="rgb(30,90,180)" stroke-width="12" />
      <text x="340" y="65">枠線の色</text><text x="340" y="96">stroke(...)</text>
      <path d="M333 84H315L285 80" fill="none" stroke="#58656f" stroke-width="2" :marker-end="`url(#${arrowId})`" />
      <text x="340" y="182">枠線の太さ</text><text x="340" y="214">strokeWeight(...)</text>
      <path d="M333 200H312L290 200" fill="none" stroke="#58656f" stroke-width="2" :marker-end="`url(#${arrowId})`" />
      <text x="70" y="296">内側の色：fill(...)</text>
      <path d="M175 266V150" fill="none" stroke="#58656f" stroke-width="2" :marker-end="`url(#${arrowId})`" />
    </template>
    <template v-if="kind === 'rgb'">
      <text x="28" y="65">R：赤</text><rect x="145" y="40" width="340" height="34" fill="#f2f4f5" stroke="#84949f" /><rect x="145" y="40" width="340" height="34" fill="#d33341" /><text x="492" y="66">255</text>
      <text x="28" y="151">G：緑</text><rect x="145" y="126" width="340" height="34" fill="#f2f4f5" stroke="#84949f" /><rect x="145" y="126" width="107" height="34" fill="#087653" /><text x="492" y="152">80</text>
      <text x="28" y="237">B：青</text><rect x="145" y="212" width="340" height="34" fill="#f2f4f5" stroke="#84949f" /><text x="492" y="238">0</text>
      <text x="143" y="298">0</text><text x="450" y="298">255</text>
      <text x="110" y="338">各バーの長さは、成分の強さを表します。</text>
    </template>
    <template v-if="kind === 'alpha'">
      <path d="M55 120H510" stroke="#58656f" stroke-width="3" :marker-end="`url(#${arrowId})`" />
      <path d="M60 106V134 M280 106V134 M500 106V134" stroke="#58656f" stroke-width="2" />
      <text x="50" y="85">0</text><text x="249" y="85">約128</text><text x="475" y="85">255</text>
      <text x="28" y="185">透明</text><text x="244" y="185">半透明</text><text x="460" y="185">不透明</text>
      <text x="32" y="230">下の色が</text><text x="32" y="263">そのまま見える</text>
      <text x="237" y="230">下の色も</text><text x="237" y="263">透けて見える</text>
      <text x="432" y="230">下の色を</text><text x="432" y="263">覆う</text>
    </template>
  </svg>
</template>
