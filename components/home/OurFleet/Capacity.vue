<template>
  <div class="flex justify-center divide-x-2 divide-slate-500 mt-2">
    <span class="px-3">Passenger: {{ passenger }} Max</span>
    <span class="px-3">Luggage: {{ luggage }} Max</span>
  </div>
</template>

<script setup>
const props = defineProps({
  passenger: String,
  luggage: String,
});
</script>
