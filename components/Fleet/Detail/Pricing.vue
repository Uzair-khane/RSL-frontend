<template>
  <div class="mt-14">
    <h2 class="uppercase text-[#191919] font-bold text-xl">Pricing</h2>
    <div class="grid gap-10 font-outfit grid-cols-2 mt-5 md:grid-cols-3">
      <div class="flex gap-4">
        <iconTime class="stroke-[#808080] fill-none w-6" />
        <div>
          <p class="uppercase text-[#808080] font-semibold">Per hour rate</p>
          <span class="font-semibold">
            <span class="text-[#2CA3BF] text-xl font-semibold">
              AED {{ pricing[0]?.amount }}
            </span>
            <span class="text-[#808080]"> /Hour </span>
          </span>
        </div>
      </div>
      <div class="flex gap-4">
        <iconTime class="stroke-[#808080] fill-none w-6" />
        <div>
          <p class="uppercase text-[#808080] font-semibold">Per Day rate</p>
          <span class="font-semibold">
            <span class="text-[#2CA3BF] text-xl font-semibold"> AED 594 </span>
            <span class="text-[#808080]"> /Day </span>
          </span>
        </div>
      </div>
      <div class="flex gap-4">
        <iconAeroplane class="stroke-[#808080] fill-[#808080] w-6" />
        <div>
          <p class="uppercase text-[#808080] font-semibold">Airport Transfer</p>
          <span class="font-semibold">
            <span class="text-[#2CA3BF] text-xl font-semibold">
              AED 89-105
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pricing: {
    type: Array,
    default: [],
  },
});
</script>
