<template>
  <div class="md:px-16 mt-14 px-3">
    <!-- Section Header -->
    <div class="mb-6">
      <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#0693E3]">
        Select Vehicle
      </p>

      <h2 class="mt-2 font-outfit text-3xl font-semibold text-[#111]">
        Choose Your Car Type
      </h2>

      <p class="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
        Select a luxury vehicle according to your ride type, passenger capacity,
        luggage space, and pricing preference.
      </p>
    </div>

    <!-- Loading Skeleton -->
    <div
      v-if="loading"
      class="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div
        class="mx-auto h-56 w-full max-w-3xl animate-pulse rounded-xl bg-[#f1f1f1]"
      ></div>

      <div class="mx-auto mt-6 h-5 w-52 animate-pulse rounded bg-[#f1f1f1]"></div>

      <div
        class="mx-auto mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-[#f1f1f1]"
      ></div>

      <div class="mt-6 flex justify-center gap-4">
        <div class="h-20 w-36 animate-pulse rounded-xl bg-[#f1f1f1]"></div>
        <div class="h-20 w-36 animate-pulse rounded-xl bg-[#f1f1f1]"></div>
      </div>
    </div>

    <!-- Car Slider -->
    <Swiper
      v-else
      class="car-type-swiper relative w-full rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-[#fbfdff] to-[#f5f9fc] px-4 py-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:px-10 md:py-8"
      @swiper="onSwiperReady"
      @slideChange="onSlideChange"
      :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
    >
      <SwiperSlide v-for="car in cars" :key="car.id">
        <div
          class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-2 pb-8 md:flex-row md:items-center md:justify-between md:px-10"
        >
          <!-- Left Content -->
          <div class="w-full text-center md:w-1/2 md:text-left">
            <div
              class="inline-flex my-5 items-center gap-2 rounded-full border border-[#d7eaf8] bg-[#eef8ff] px-4 py-1.5 text-xs font-semibold text-[#0693E3]"
            >
              <span class="h-2 w-2 rounded-full bg-[#0693E3]"></span>
              Luxury Fleet Option
            </div>

            <h3 class="mt-5 text-3xl font-bold leading-tight text-[#111] md:text-4xl">
              {{ car.title }}
            </h3>

            <p class="mt-4 text-sm leading-7 text-gray-500 md:max-w-xl">
              {{ car.description }}
            </p>

            <!-- Passengers & Luggage -->
            <div class="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
              <div
                class="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm"
              >
                <span class="text-base">👥</span>
                <span>{{ car.passengers }} Passengers</span>
              </div>

              <div
                class="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm"
              >
                <span class="text-base">🧳</span>
                <span>{{ car.luggage }} Luggage</span>
              </div>
            </div>

            <!-- Price Info -->
            <div class="mt-6">
              <div
                v-if="car.car_price && car.car_price.length > 0"
                class="grid gap-4 sm:grid-cols-2 md:max-w-md"
              >
                <div
                  class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Per KM Price
                  </p>

                  <p class="mt-2 text-2xl font-bold text-[#0693E3]">
                    PKR {{ car.car_price[0].km_price }}
                  </p>
                </div>

                <div
                  class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Per Hour Price
                  </p>

                  <p class="mt-2 text-2xl font-bold text-[#0693E3]">
                    PKR {{ car.car_price[0].hourly_price }}
                  </p>
                </div>
              </div>

              <div
                v-else
                class="inline-flex rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-400 shadow-sm"
              >
                Price not available
              </div>
            </div>

            <!-- Selected Indicator -->
            <div
              v-if="car.id == activeId"
              class="mt-6 inline-flex items-center gap-2 rounded-full bg-[#404040] px-5 py-2 text-sm font-medium text-white shadow-sm"
            >
              <span class="h-2 w-2 rounded-full bg-white"></span>
              Selected Vehicle
            </div>
          </div>

          <!-- Right Car Image -->
          <div class="relative flex w-full items-center justify-center md:w-1/2">
            <div
              class="absolute h-56 w-56 rounded-full bg-[#0693E3]/10 blur-2xl md:h-72 md:w-72"
            ></div>

            <div
              class="relative flex h-72 w-full max-w-xl items-center justify-center rounded-3xl border border-gray-200 bg-white/70 px-6 py-8 shadow-inner backdrop-blur-sm md:h-96"
              :class="car.id == activeId ? 'ring-2 ring-[#0693E3]/30' : ''"
            >
              <img
                class="max-h-full w-full object-contain drop-shadow-[0_22px_25px_rgba(0,0,0,0.18)]"
                :src="baseUrl + car.image_url"
                :alt="car.title"
              />
            </div>
          </div>
        </div>
      </SwiperSlide>

      <!-- Navigation -->
      <div class="swiper-button-prev">
        <iconArrow class="!h-5 !w-5 rotate-180 fill-white" />
      </div>

      <div class="swiper-button-next">
        <iconArrow class="!h-5 !w-5 fill-white" />
      </div>
    </Swiper>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";

const emit = defineEmits(["getCarId"]);

const route = useRoute();
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;

const activeId = ref(route.query.car_id || null);
const cars = ref([]);
const loading = ref(true);
const swiperInstance = ref(null);

function onSwiperReady(swiper) {
  swiperInstance.value = swiper;
}

onMounted(async () => {
  cars.value = await useCars();
  loading.value = false;

  await nextTick();

  if (!cars.value || cars.value.length === 0) {
    return;
  }

  if (activeId.value) {
    const activeIndex = cars.value.findIndex(
      (car) => car.id == activeId.value
    );

    if (activeIndex >= 0) {
      emit("getCarId", activeId.value);

      setTimeout(() => {
        if (swiperInstance.value) {
          swiperInstance.value.slideTo(activeIndex);
        }
      }, 100);
    } else {
      activeId.value = cars.value[0].id;
      emit("getCarId", activeId.value);
    }
  } else {
    activeId.value = cars.value[0].id;
    emit("getCarId", activeId.value);
  }
});

function onSlideChange(swiper) {
  const activeSliderIndex = Number(swiper.activeIndex);

  activeId.value = cars.value[activeSliderIndex]?.id;

  if (activeId.value) {
    emit("getCarId", activeId.value);
  }
}
</script>

<style scoped>
.swiper-button-prev::after,
.swiper-button-next::after {
  content: none;
}

.swiper-button-next,
.swiper-button-prev {
  width: 42px;
  height: 42px;
  top: 50%;
  z-index: 20;
  border-radius: 999px;
  background-color: rgba(64, 64, 64, 0.92);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.18);
  transition: all 0.2s ease;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: rgba(6, 147, 227, 1);
  transform: translateY(-50%) scale(1.05);
}

.swiper-button-prev {
  left: 12px;
}

.swiper-button-next {
  right: 12px;
}

.car-type-swiper {
  overflow: hidden;
}

@media (max-width: 768px) {
  .swiper-button-next,
  .swiper-button-prev {
    width: 36px;
    height: 36px;
    top: 92%;
  }

  .swiper-button-prev {
    left: 38%;
  }

  .swiper-button-next {
    right: 38%;
  }
}
</style>