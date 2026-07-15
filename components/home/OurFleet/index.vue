<template>
  <div class="font-outfit">
    <p
      data-aos="fade-right"
      class="text-center text-xs font-black uppercase tracking-[0.32em] text-[#2CA3BF]"
    >
      Take Your Pick
    </p>
    <h2
      data-aos="fade-right"
      data-aos-delay="100"
      class="mt-2 text-center text-3xl font-black uppercase text-[#111827]"
    >
      Our Fleet
    </h2>

    <Tabs />

    <div v-if="!loading && cars.length" class="relative mt-6 py-3">
      <Swiper
        class="mt-5 w-full"
        :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
      >
        <SwiperSlide v-for="car in cars" :key="car.id">
          <div class="flex justify-center px-2">
            <div class="w-full max-w-4xl rounded-[28px] border border-[#E7EEF3] bg-white p-6 shadow-[0_6px_18px_rgba(15,23,42,0.04)] md:p-8">
              <h1 class="text-center font-outfit text-3xl font-black uppercase tracking-widest text-[#111827]">
                {{ car.title }}
              </h1>

              <Capacity :passenger="car.passengers" :luggage="car.luggage" />

              <div class="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-[#F8FBFD] to-[#F2FAFD]">
                <img
                  v-if="getImageUrl(car.banner_image_url)"
                  class="aspect-video w-full object-contain p-4"
                  :src="getImageUrl(car.banner_image_url)"
                  :alt="car.title"
                />
                <div v-else class="flex aspect-video w-full items-center justify-center">
                  <p class="text-sm font-semibold text-[#7A8493]">No image</p>
                </div>
              </div>
            </div>
          </div>

          <FeaturesTabs />

          <div class="flex justify-center">
            <NuxtLink
              :to="{ path: '/book-ride', query: { car_id: car.id } }"
              class="mt-4 block rounded-2xl bg-[#2CA3BF] px-12 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#238CA5]"
            >
              Book Now
            </NuxtLink>
          </div>
        </SwiperSlide>

        <div class="swiper-button-prev">
          <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="swiper-button-next">
          <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </Swiper>
    </div>

    <div
      v-else
      class="mx-3 mt-5 h-80 max-w-full animate-pulse rounded-[28px] bg-[#F1F5F8] text-center md:mx-20"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Capacity from "./Capacity";

import Tabs from "./Tabs";
import FeaturesTabs from "./FeaturesTabs";

const config = useRuntimeConfig();
const cars = ref([]);
const loading = ref(true);

const rawBaseUrl = computed(() => {
  return (
    config.public?.baseUrl ||
    config.public?.apiBaseUrl ||
    config.public?.API_BASE_URL ||
    "http://localhost:5000"
  );
});

/*
  Agar baseUrl = http://localhost:5000/api/site/v1 hai,
  images ke liye hume sirf http://localhost:5000 chahiye.
*/
const mediaBaseUrl = computed(() => {
  return rawBaseUrl.value.replace(/\/+$/, "").replace(/\/api\/.*$/, "");
});

/*
  Backend kabhi kabhi path ko stray quotes ke sath save kar deta hai,
  e.g. "\"uploads/admin/cars/123.webp\"". Yeh function unhe hata deta hai.
*/
const stripStrayQuotes = (value) => {
  if (typeof value !== "string") return value;

  let cleaned = value.trim();

  while (
    cleaned.length >= 2 &&
    (cleaned.startsWith('"') || cleaned.startsWith("'")) &&
    (cleaned.endsWith('"') || cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  return cleaned;
};

const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return "";

  const cleanImagePath = stripStrayQuotes(imagePath);
  if (!cleanImagePath) return "";

  if (
    cleanImagePath.startsWith("http") ||
    cleanImagePath.startsWith("data:") ||
    cleanImagePath.startsWith("blob:")
  ) {
    return cleanImagePath;
  }

  const cleanBaseUrl = mediaBaseUrl.value.replace(/\/+$/, "");
  const finalImagePath = cleanImagePath.replace(/^\/+/, "");

  return `${cleanBaseUrl}/${finalImagePath}`;
};

onMounted(async () => {
  cars.value = await useCars();
  loading.value = false;
});
</script>

<style scoped>
.swiper-button-prev::after,
.swiper-button-next::after {
  content: none;
}

.swiper-button-next,
.swiper-button-prev {
  width: 40px;
  height: 40px;
  top: 45%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #0b1220;
  border-radius: 9999px;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.12);
  transition: all 0.2s ease;
}

.swiper-button-next {
  right: 4px;
}

.swiper-button-prev {
  left: 4px;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: #ffffff;
  transform: scale(1.05);
}
</style>