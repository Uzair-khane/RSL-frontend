<template>
  <div class="md:px-16 mt-14 px-3">
    <h2 class="font-semibold text-3xl font-outfit">Car type</h2>
    <div
      v-if="loading"
      class="mt-10 md:mx-20 mx-2 bg-[#f1f1f1] animate-plus h-80"
    ></div>
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
        <div class="flex justify-center px-2">
          <img class="w-2/5" :src="baseUrl + car.image_url" alt="" />
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
import { onMounted, ref, defineEmits } from "vue";
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
