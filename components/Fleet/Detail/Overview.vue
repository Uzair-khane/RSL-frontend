<template>
  <div class="mt-14">
    <h2 class="uppercase text-[#191919] font-bold text-xl">Car Overview</h2>
    <p class="mt-5">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  description: String,
});
</script>
