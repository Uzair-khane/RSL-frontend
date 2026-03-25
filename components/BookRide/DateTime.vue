<template>
  <div
    class="mt-4 relative md:mt-14 md:max-w-[80%] md:flex-nowrap flex-wrap gap-2 md:gap-10 flex items-center md:px-24 px-3"
  >
    <label class="whitespace-nowrap text-xl font-semibold" for=""
      >Pickup time</label
    >
    <div
      class="w-full flex-wrap md:flex-nowrap md:w-[400px] flex items-center gap-5 md:gap-8 items-center"
    >
      <div class="flex gap-1 items-center">
        <input type="radio" />
        <span> Schedule </span>
      </div>
      <div class="flex md:flex-nowrap w-full flex-wrap">
        <div class="relative w-full">
          <label for="" class="mb-3 block md:hidden">Date</label>
          <input
            class="rounded-l-md pickup-date !w-full !text-left h-11 placeholder-[#B3B3B3] border-[#B3B3B3] px-6 py-2.5 md:border-l md:border-t border md:border-b"
            type="date"
            :value="date"
            required
            @input="$emit('update:date', $event.target.value)"
          />
          <iconCalender
            class="fill-none md:hidden block pointer-events-none top-12 right-3 absolute stroke-[#0693E3] w-5 h-5"
          />
        </div>
        <div class="relative w-full">
          <label for="" class="mb-3 block md:hidden md:mt-0 mt-4">Time</label>
          <input
            class="rounded-r-md pickup-date h-11 !text-left border !w-full placeholder-[#B3B3B3] border-[#B3B3B3] px-6 py-2.5"
            type="time"
            required
            :value="time"
            @input="$emit('update:time', $event.target.value)"
          />
          <iconTime
            class="fill-none pointer-events-none top-16 md:hidden block right-3 absolute stroke-[#0693E3] w-5 h-5"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

// Accept props from parent
const props = defineProps({
  date: String,
  time: String,
});

// Emit updates to parent
const emit = defineEmits(["update:date", "update:time"]);
</script>
<style scoped>
.pickup-date {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  direction: ltr;
}
.vdp__time {
  display: none;
}
.pickup-date::after,
.pickup-date::before {
  display: none !important;
  opacity: 0 !important;
}
</style>
