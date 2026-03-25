<template>
  <div>
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
        <h3 class="mb-12 text-xl font-semibold text-center">{{ car.title }}</h3>
        <div class="flex justify-center px-2">
          <img class="w-1/2" :src="baseUrl + car.image_url" alt="" />
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
import { ref, onMounted } from "vue";
const emit = defineEmits(["getPrice"]);
let cars = ref([]);
const activeId = ref(null);
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;

function getActiveCarPrice(id) {
  const activeCar = cars.value.find((car) => car.id == id);
  const price = activeCar.car_price[0];
  emit("getPrice", price);
}

function onSlideChange(swiper) {
  let activeSliderIndex = Number(swiper.activeIndex);
  activeId.value = cars.value[activeSliderIndex]?.id;
  getActiveCarPrice(activeId.value);
}

onMounted(async () => {
  cars.value = await useCars();
  activeId.value = cars.value[0].id;
  getActiveCarPrice(activeId.value);
});
</script>

<style scoped>
.swiper-button-prev::after,
.swiper-button-next::after {
  content: none;
}
.swiper-button-next,
.swiper-button-prev {
  width: 30px;
  top: 50%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.8);
  transition: 0.1s all ease;
}
.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: rgba(0, 0, 0, 1);
}
</style>
