<template>
  <div class="md:px-16 mt-14 px-3">
    <h2 class="font-semibold text-3xl font-outfit">Car type</h2>
    <div v-if="loading" class="mt-10 md:mx-20 mx-2 bg-[#f1f1f1] animate-pulse h-80"></div>
    <Swiper
      class="w-full mt-5"
      @slideChange="onSlideChange"
      :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
    >
      <SwiperSlide v-for="(car, index) in cars" :key="car.id">
        <div class="flex flex-col items-center px-2 pb-6">
          
          <!-- Car Image -->
          <img class="w-2/5" :src="baseUrl + car.image_url" alt="" />
          
          <!-- Car Title -->
          <h3 class="text-xl font-bold mt-3 text-center">{{ car.title }}</h3>
          
          <!-- Car Description -->
          <p class="text-gray-500 text-sm mt-2 text-center md:w-2/3 px-2">
            {{ car.description }}
          </p>

          <!-- Price Info -->
          <div class="flex gap-6 mt-4 justify-center flex-wrap">
            <div v-if="car.car_price && car.car_price.length > 0" 
                 class="flex gap-6">
              <div class="text-center bg-gray-100 px-5 py-2 rounded-md">
                <p class="text-xs text-gray-500">Per KM</p>
                <p class="font-bold text-lg text-[#0693E3]">
                  PKR {{ car.car_price[0].km_price }}
                </p>
              </div>
              <div class="text-center bg-gray-100 px-5 py-2 rounded-md">
                <p class="text-xs text-gray-500">Per Hour</p>
                <p class="font-bold text-lg text-[#0693E3]">
                  PKR {{ car.car_price[0].hourly_price }}
                </p>
              </div>
            </div>
            <div v-else class="text-gray-400 text-sm">
              Price not available
            </div>
          </div>

          <!-- Passengers & Luggage -->
          <div class="flex gap-4 mt-3 text-sm text-gray-600">
            <span>👥 {{ car.passengers }} Passengers</span>
            <span>🧳 {{ car.luggage }} Luggage</span>
          </div>

        </div>
      </SwiperSlide>

      <div class="swiper-button-prev">
        <iconArrow class="fill-white rotate-180 !w-6 !h-6" />
      </div>
      <div class="swiper-button-next">
        <iconArrow class="fill-white !w-6 !h-6" />
      </div>
    </Swiper>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const emit = defineEmits(["getCarId"]);
const route = useRoute();
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;
const activeId = ref(route.query.car_id || null);
const cars = ref([]);
const loading = ref(true);

onMounted(async () => {
  const swiper = document.querySelector(".swiper").swiper;
  cars.value = await useCars();
  loading.value = false;
  if (activeId.value) {
    const activeIndex = cars?.value?.findIndex(
      (car) => car.id == activeId.value
    );
    swiper.slideTo(activeIndex);
    emit("getCarId", activeId.value);
  } else {
    emit("getCarId", cars?.value[0].id);
  }
});

function onSlideChange(swiper) {
  const activeSliderIndex = Number(swiper.activeIndex);
  activeId.value = cars.value[activeSliderIndex]?.id;
  emit("getCarId", activeId.value);
}
</script>

<style scoped>
.swiper-button-prev::after,
.swiper-button-next::after {
  content: none;
}
.swiper-button-next,
.swiper-button-prev {
  width: 30px;
  top: 75%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.8);
  transition: 0.1s all ease;
}
.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: rgba(0, 0, 0, 1);
}
</style>