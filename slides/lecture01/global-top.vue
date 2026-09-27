<template>
  <footer class="lecture-footer">
    <span>情報メディアワーク基礎（火曜日3現） / 第1章</span>
    <span v-if="$slidev.nav.currentPage < 12">はじめに</span>
    <span v-else-if="$slidev.nav.currentPage < 50">準備 / 原則初回</span>
    <span v-else-if="$slidev.nav.currentPage < 62">実行 / 毎回</span>
    <span v-else>補足 / 必要なとき</span>
    <span>{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
  </footer>
</template>
