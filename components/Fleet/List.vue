<template>
  <div class="md:px-16 px-3 mt-20 md:mt-32">
    <h2 class="text-center font-outfit text-xl md:text-2xl">
      At Real Smart Limousine, we redefine travel with a fleet designed for
      elegance, convenience, and a first-class experience.
    </h2>
    <div
      class="grid grid-cols-1 place-items-center md:grid-cols-2 mt-14 gap-16 md:gap-32"
    >
      <div v-if="!loading && cars.length" v-for="(car, index) in cars">
        <img :src="baseUrl + car.image_url" alt="" />
        <h2 class="uppercase font-outfit text-xl mt-12 font-semibold">
          {{ car.title }}
        </h2>
        <ul class="mt-4 space-y-5">
          <li class="flex gap-3">
            <iconPassenger class="w-5 fill-[#ABABAB]" />
            <span class="text-[#ABABAB]">{{ car.passengers }} passengers</span>
          </li>
          <li class="flex gap-3">
            <iconLeatherInterior class="w-5 stroke-[#ABABAB]" />
            <span class="text-[#ABABAB]">Leather Interior</span>
          </li>
          <li class="flex gap-3">
            <iconTime class="w-5 stroke-[#ABABAB] fill-white" />
            <span class="text-[#ABABAB]"
              >AED {{ car?.car_price[0]?.amount }} per Hour Fuel Surcharge</span
            >
          </li>
        </ul>
        <div
          class="flex gap-3 lg:gap-20 md:justfiy-start flex-wrap mt-10 items-center"
        >
          <NuxtLink
            :to="{ path: 'fleet/detail', query: { car_id: car.id } }"
            class="bg-slate-900 px-10 uppercase py-3 md:py-4 rounded-md text-white"
          >
            View details
          </NuxtLink>
          <div class="text-[#0693E3]">
            <span class="uppercase font-bold text-[#0693E3]">Aed</span>
            <span class=""
              ><span class="text-4xl mx-1 font-bold">
                {{ car?.car_price[0]?.amount }}
              </span>
              <span class="text-slate-800 uppercase">/ Hour</span></span
            >
          </div>
        </div>
      </div>
      <div v-else v-for="(i, index) in 6" :key="index" class="space-y-4 w-full">
        <div class="h-48 w-full bg-[#f1f1f1] rounded"></div>
        <div class="h-4 bg-[#f1f1f1] rounded w-3/4"></div>
        <div class="h-4 bg-[#f1f1f1] rounded w-1/2"></div>
        <div class="h-4 bg-[#f1f1f1] rounded w-1/4"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const config = useRuntimeConfig();
const cars = ref([]);
const loading = ref(true);
const baseUrl = config.public.baseUrl;
onMounted(async () => {
  cars.value = await useCars();
  loading.value = false;
});
</script>
