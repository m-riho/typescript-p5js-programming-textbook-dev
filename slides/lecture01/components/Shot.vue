<script setup>
import { computed } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  size: { type: String, required: true },
  region: { type: String, required: true },
  maxHeight: { type: Number, default: 390 },
});
const bounds = computed(() => props.region.split(' ').map(Number));
const imageStyle = computed(() => {
  const [x, y, width] = bounds.value;
  const [originalWidth] = props.size.split(' ').map(Number);
  return {
    width: `${originalWidth / width * 100}%`,
    left: `${-x / width * 100}%`,
    top: `${-y / bounds.value[3] * 100}%`,
  };
});
</script>

<template>
  <div class="shot-region" :style="{
    aspectRatio: `${bounds[2]} / ${bounds[3]}`,
    maxWidth: `${maxHeight * bounds[2] / bounds[3]}px`,
  }">
    <img :src="src" :alt="alt" :style="imageStyle" />
  </div>
</template>
