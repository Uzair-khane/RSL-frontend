<template>
  <HeroSection
    title="BLACK LINCOLN SEDAN"
    imagePath="/images/fleet-detail/banner.png"
  />
  <div class="md:px-16 px-3">
    <div v-if="!loading && carDetail">
      <Gallery :carDetail="carDetail" />
      <Pricing :pricing="carDetail.car_price" />
      <Overview :description="carDetail.description" />
      <Services :carDetail="carDetail" />
    </div>
    <div v-else class="space-y-4 mt-10 animate-pulse">
      <!-- Car Image Skeleton -->
      <div class="flex md:flex-nowrap flex-wrap gap-10">
        <div class="w-full md:w-2/3">
          <div class="h-64 w-full bg-[#f1f1f1] rounded-md"></div>
          <div class="h-6 w-1/3 bg-[#f1f1f1] mt-3 rounded"></div>
          <div class="h-10 w-1/4 bg-[#f1f1f1] mt-3 rounded"></div>
        </div>
        <div class="h-64 w-full md:w-1/3 bg-[#f1f1f1] rounded-md"></div>
      </div>
      <!-- Text Skeleton -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Gallery from "./Gallery";
import Pricing from "./Pricing";
import Overview from "./Overview.vue";
import Services from "./Services.vue";
const config = useRuntimeConfig();
const carDetail = ref({});
const loading = ref(true);
const route = useRoute();

async function getCarDetail(params) {
  const carId = route.query.car_id;
  const data = await useCars();
  loading.value = false;
  carDetail.value = data.find((car) => car.id == carId);
}

onMounted(() => {
  getCarDetail();
});
</script>
