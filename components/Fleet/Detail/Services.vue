<template>
  <div class="mt-14">
    <h2 class="uppercase text-[#191919] font-bold text-xl">
      Services Offered in this Car
    </h2>
    <div class="mt-6 gap-6 grid grid-cols-2 md:grid-cols-4">
      <div class="flex items-center gap-2">
        <IconPassenger class="stroke-[#0693E3] fill-[#0693E3] w-5" />
        <span class="font-semibold">
          {{ carDetail?.passengers }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <IconLeatherInterior class="stroke-[#0693E3] w-5" />
        <span class="font-semibold">Leather Interior </span>
      </div>
      <div class="flex items-center gap-2">
        <iconTime class="stroke-[#0693E3] fill-none w-5" />
        <span>AED per Hour Fuel Surcharge</span>
      </div>
      <div class="flex items-center gap-2">
        <iconWifi class="stroke-[#0693E3] w-5" />
        <span class="font-semibold">On Board Wi-Fi </span>
      </div>
      <div class="flex items-center gap-2">
        <iconWifi class="stroke-[#0693E3] w-5" />
        <span class="font-semibold">On Board Wi-Fi </span>
      </div>
      <div class="flex items-center gap-2">
        <iconWifi class="stroke-[#0693E3] w-5" />
        <span class="font-semibold">On Board Wi-Fi </span>
      </div>
      <div class="flex items-center gap-2">
        <iconWifi class="stroke-[#0693E3] w-5" />
        <span class="font-semibold">On Board Wi-Fi </span>
      </div>
      <div class="flex items-center gap-2">
        <iconWifi class="stroke-[#0693E3] w-5" />
        <span class="font-semibold">On Board Wi-Fi </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  carDetail: {
    type: Object,
    default: {},
  },
});
</script>
