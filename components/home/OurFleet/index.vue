<template>
  <div class="">
    <h2
      data-aos="fade-right"
      class="font-semibold text-center text-3xl font-semibold uppercase"
    >
      Our Fleet
    </h2>
    <Tabs />

    <div v-if="!loading && cars.length" class="mt-6 relative py-3">
      <!-- <div class="absolut h-[300px]"></div> -->
      <Swiper
        class="w-full mt-5"
        :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
      >
        {{ cars }}
        <SwiperSlide v-for="(car, index) in cars">
          <div class="flex justify-center px-2">
            <div>
              <h1
                class="font-semibold font-outfit uppercase tracking-widest text-center text-3xl"
              >
                {{ car.title }}
              </h1>
              <Capacity :passenger="car.passengers" :luggage="car.luggage" />
              <img
                class="w-full mt-3"
                :src="baseUrl + car.banner_image_url"
                alt=""
              />
            </div>
          </div>
          <FeaturesTabs />
          <div class="flex justify-center">
            <NuxtLink
              :to="{ path: '/book-ride', query: { car_id: car.id } }"
              class="btn-book-now block px-12 rounded-md mt-4 text-white py-2.5"
            >
              Book Now
            </NuxtLink>
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
    <div
      class="text-center mt-5 animate-pulse max-w-full md:mx-20 mx-3 bg-[#f1f1f1] h-80"
      v-else
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Capacity from "./Capacity";

import Tabs from "./Tabs";
import FeaturesTabs from "./FeaturesTabs";
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;
const cars = ref([]);
const loading = ref(false);
onMounted(async () => {
  cars.value = await useCars();
  loading.value = false;
});
</script>

<style scoped>
.btn-book-now {
  background: linear-gradient(to bottom, #0876c0, #34cbf5);
  display: inline-block;
}
.btn-book-now:hover {
  background: linear-gradient(to bottom, #34cbf5, #0876c0);
}
.swiper-button-prev::after,
.swiper-button-next::after {
  content: none;
}
.swiper-button-next {
  right: 0;
}

.swiper-button-prev {
  left: 0;
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
