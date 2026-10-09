<script setup lang="ts">
import { useId } from 'vue';
defineProps<{ kind: string }>();
const arrowId = `arrow-${useId().replace(/:/g, '')}`;
</script>

<template>
  <svg class="diagram" viewBox="0 0 560 370" role="img" :aria-label="{
    coords: '左上が原点で右向きがx、下向きがyの座標図',
    line: '始点80,80と終点320,220を結ぶ線分',
    circle: '円の中心と直径を示す図',
    ellipse: '楕円の中心、幅、高さを示す図',
    rect: '長方形の左上、幅、高さを示す図',
    triangle: '3頂点を順につなぐ三角形',
    quad: '4頂点を周囲に沿ってつなぐ四角形',
    offscreen: '中心がキャンバス外にある円は見えないことを示す図'
  }[kind]">
    <defs>
      <marker :id="arrowId" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" fill="#0066a6" />
      </marker>
    </defs>
    <template v-if="kind === 'coords' || kind === 'line' || kind === 'offscreen'">
      <rect x="65" y="45" width="400" height="280" fill="#f5f9fb" stroke="#93b5c9" />
      <path d="M165 45V325 M265 45V325 M365 45V325 M65 138H465 M65 232H465" stroke="#d4e3ec" />
      <path d="M65 45H505" fill="none" stroke="#0066a6" stroke-width="2" :marker-end="`url(#${arrowId})`" />
      <path d="M65 45V350" fill="none" stroke="#0066a6" stroke-width="2" :marker-end="`url(#${arrowId})`" />
      <text x="12" y="30">(0, 0)</text><text x="500" y="35" class="label">x</text><text x="35" y="356" class="label">y</text>
      <text x="419" y="29">400</text><text x="12" y="325">300</text>
      <template v-if="kind === 'coords'">
        <path d="M265 45V185H65" stroke="#b53348" stroke-width="2" stroke-dasharray="6 5" fill="none" />
        <circle cx="265" cy="185" r="6" fill="#b53348" />
        <text x="278" y="177" class="accent">(200, 150)</text>
        <text x="205" y="82" class="label">右へ200</text><text x="80" y="220" class="label">下へ150</text>
      </template>
      <template v-if="kind === 'line'">
        <path d="M145 120L385 250" stroke="#202b33" stroke-width="3" />
        <circle cx="145" cy="120" r="6" fill="#0066a6" /><circle cx="385" cy="250" r="6" fill="#b53348" />
        <text x="80" y="100" class="label">始点 (80, 80)</text><text x="275" y="290" class="accent">終点 (320, 220)</text>
      </template>
      <template v-if="kind === 'offscreen'">
        <circle cx="520" cy="185" r="35" fill="#fff2f3" stroke="#b53348" stroke-dasharray="5 4" />
        <path d="M380 185H485" stroke="#0066a6" stroke-width="2" :marker-end="`url(#${arrowId})`" />
        <text x="150" y="175">ここには描かれない</text><text x="280" y="295" class="accent">中心のxが大きすぎる</text>
      </template>
    </template>
    <template v-if="kind === 'circle'">
      <circle cx="265" cy="190" r="110" fill="#f1f7fa" stroke="#202b33" stroke-width="3" />
      <path d="M155 190H375" stroke="#0066a6" stroke-width="2" :marker-start="`url(#${arrowId})`" :marker-end="`url(#${arrowId})`" />
      <circle cx="265" cy="190" r="5" fill="#b53348" /><path d="M265 190L360 65H430" fill="none" stroke="#b53348" />
      <text x="345" y="45" class="accent">中心 (x, y)</text><text x="203" y="165" class="label">直径 d</text>
      <text x="117" y="342">端から端までの長さ。半径ではない。</text>
    </template>
    <template v-if="kind === 'ellipse'">
      <ellipse cx="275" cy="200" rx="160" ry="120" fill="#f1f7fa" stroke="#202b33" stroke-width="3" />
      <path d="M115 80V45 M435 80V45 M115 50H435 M115 80H67 M115 320H67 M75 80V320" fill="none" stroke="#0066a6" stroke-width="2" />
      <text x="239" y="32" class="label">幅 w</text><text x="7" y="180" class="label">高さ</text><text x="23" y="211" class="label">h</text>
      <circle cx="275" cy="200" r="5" fill="#b53348" /><text x="292" y="191" class="accent">中心 (x, y)</text>
    </template>
    <template v-if="kind === 'rect'">
      <rect x="170" y="90" width="176" height="220" fill="#f1f7fa" stroke="#202b33" stroke-width="3" />
      <circle cx="170" cy="90" r="6" fill="#b53348" />
      <text x="90" y="45" class="accent">左上 (x, y)</text><path d="M170 55V81" stroke="#b53348" />
      <path d="M170 320V345 M346 320V345 M170 340H346 M360 90H395 M360 310H395 M390 90V310" fill="none" stroke="#0066a6" stroke-width="2" />
      <text x="228" y="365" class="label">幅 w</text><text x="410" y="190" class="label">高さ</text><text x="426" y="220" class="label">h</text>
    </template>
    <template v-if="kind === 'triangle'">
      <polygon points="155,280 255,100 355,280" fill="#f1f7fa" stroke="#202b33" stroke-width="3" />
      <g fill="#b53348"><circle cx="155" cy="280" r="6" /><circle cx="255" cy="100" r="6" /><circle cx="355" cy="280" r="6" /></g>
      <text x="185" y="67" class="accent">② (80, 30)</text><text x="63" y="320" class="accent">① (30, 120)</text><text x="315" y="320" class="accent">③ (130, 120)</text>
      <text x="170" y="365" class="label">① → ② → ③ → ①</text>
    </template>
    <template v-if="kind === 'quad'">
      <polygon points="180,85 323,124 284,293 141,254" fill="#f1f7fa" stroke="#202b33" stroke-width="3" />
      <g fill="#b53348"><circle cx="180" cy="85" r="6" /><circle cx="323" cy="124" r="6" /><circle cx="284" cy="293" r="6" /><circle cx="141" cy="254" r="6" /></g>
      <text x="100" y="55" class="accent">① (250, 80)</text><text x="330" y="110" class="accent">② (360, 110)</text>
      <text x="260" y="330" class="accent">③ (330, 240)</text><text x="5" y="280" class="accent">④ (220, 210)</text>
      <text x="145" y="365" class="label">周囲に沿って順番に指定</text>
    </template>
  </svg>
</template>
