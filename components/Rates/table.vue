<template>
  <div>
    <div class="flex gap-3">
      <button
        :class="[
          priceType == 'hourly'
            ? 'text-white bg-slate-800'
            : 'text-black bg-[#f1f1f1]',
        ]"
        @click="toggleType('hourly')"
        class="px-10 py-2.5 transition-all rounded-md"
      >
        Hourly
      </button>
      <button
        @click="toggleType('per_km')"
        :class="[
          priceType == 'per_km'
            ? 'text-white bg-slate-800'
            : 'text-black bg-[#f1f1f1]',
        ]"
        class="px-10 py-2.5 transition-all rounded-md"
      >
        Flate
      </button>
    </div>
    <table class="w-full mt-7 rounded-md shadow-sm">
      <thead>
        <tr class="bg-[#1CACEE] rounded-md text-white">
          <th class="text-left px-3 py-3.5">
            {{ priceType == "per_km" ? "Flate" : "Hourly services" }}
          </th>
          <th class="text-left px-3 py-3.5">Rates</th>
        </tr>
      </thead>
      <tbody v-if="priceType == 'hourly'">
        <tr>
          <td class="py-3.5 px-2.5">1 hr</td>
          <td class="py-3.5 px-2.5">{{ carPrice?.hourly_price }} AED</td>
        </tr>
        <tr class="bg-[#f1f1f1]">
          <td class="py-3.5 px-2.5">05 hrs HalfDay</td>
          <td class="py-3.5 px-2.5">
            {{ carPrice?.hourly_price * 5 }} ->
            {{ carPrice?.hourly_price * 5 + 100 }} AED
          </td>
        </tr>
        <tr>
          <td class="py-3.5 px-2.5">10 hrs FullDay</td>
          <td class="py-3.5 px-2.5">
            {{ carPrice?.hourly_price * 10 }} ->
            {{ carPrice?.hourly_price * 10 + 100 }} AED
          </td>
        </tr>
        <tr class="bg-[#f1f1f1]">
          <td class="py-3.5 px-2.5">Every Additional Hour</td>
          <td class="py-3.5 px-2.5">100 -> 120 P/H</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="py-3.5 px-2.5">1 km</td>
          <td class="py-3.5 px-2.5">{{ carPrice?.km_price }} AED</td>
        </tr>
        <tr class="bg-[#f1f1f1]">
          <td class="py-3.5 px-2.5">10 km</td>
          <td class="py-3.5 px-2.5">{{ carPrice?.km_price * 10 }} AED</td>
        </tr>
        <tr>
          <td class="py-3.5 px-2.5">50 km</td>
          <td class="py-3.5 px-2.5">{{ carPrice?.km_price * 50 }} AED</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, toRefs } from "vue";
let priceType = ref("hourly");
const props = defineProps({
  carPrice: {
    type: Object,
    default: {},
  },
});
const { carPrice } = toRefs(props);
function toggleType(type) {
  priceType.value = type;
}
</script>
