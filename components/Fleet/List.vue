<template>
  <section class="mt-20 px-4 font-outfit md:mt-32 md:px-16">
    <!-- Intro -->
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-xs font-black uppercase tracking-[0.32em] text-[#2CA3BF]">
        The RSL Fleet
      </p>
      <h2 class="mt-3 text-xl font-black leading-snug text-[#111827] md:text-3xl">
        At Real Smart Limousine, we redefine travel with a fleet designed for
        elegance, convenience, and a first-class experience.
      </h2>
    </div>

    <div class="relative mt-16">
      <!-- Ambient accent, matches the blur-glow used on the detail page -->
      <div
        class="pointer-events-none absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#2CA3BF]/5 blur-3xl"
      ></div>

      <div class="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <!--
          IMPORTANT FIX:
          v-if aur v-for kabhi bhi same element par nahi lagane chahiye —
          Vue 3 mein v-if ki priority v-for se zyada hoti hai, is wajah se
          "car" undefined ban jata tha. <template> wrapper is masle ko theek
          karta hai.
        -->
        <template v-if="!loading && cars.length">
          <article
            v-for="car in cars"
            :key="car.id"
            class="group flex flex-col overflow-hidden rounded-[28px] border border-[#E7EEF3] bg-white shadow-[0_6px_18px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(15,23,42,0.08)]"
          >
            <!-- Image -->
            <div
              class="relative aspect-[16/11] w-full overflow-hidden bg-gradient-to-br from-[#F8FBFD] to-[#F2FAFD]"
            >
              <span
                v-if="car.vehicle_type"
                class="absolute left-5 top-5 z-10 rounded-full bg-[#0B1220] px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white"
              >
                {{ car.vehicle_type }}
              </span>

              <img
                v-if="getImageUrl(car.image_url)"
                :src="getImageUrl(car.image_url)"
                :alt="car.title"
                class="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                @error="handleImageError"
              />
              <div
                v-else
                class="flex h-full w-full items-center justify-center"
              >
                <p class="text-sm font-semibold text-[#7A8493]">No image</p>
              </div>
            </div>

            <!-- Ticket-stub divider: a nod to the fare-receipt, matches the fleet/ride theme -->
            <div class="relative mx-7 border-t border-dashed border-[#DCE6EC]">
              <span
                class="absolute -left-[34px] -top-3 h-6 w-6 rounded-full bg-[#F5F9FB]"
              ></span>
              <span
                class="absolute -right-[34px] -top-3 h-6 w-6 rounded-full bg-[#F5F9FB]"
              ></span>
            </div>

            <!-- Content -->
            <div class="flex flex-1 flex-col p-7">
              <h3 class="text-lg font-black uppercase tracking-tight text-[#111827]">
                {{ car.title }}
              </h3>

              <ul class="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                <li class="flex items-center gap-2 text-sm font-semibold text-[#7A8493]">
                  <iconPassenger class="w-4 fill-[#2CA3BF]" />
                  {{ car.passengers }} Passengers
                </li>
                <li class="flex items-center gap-2 text-sm font-semibold text-[#7A8493]">
                  <iconLeatherInterior class="w-4 stroke-[#2CA3BF]" />
                  Leather Interior
                </li>
                <li
                  v-if="car?.car_price?.[0]"
                  class="flex items-center gap-2 text-sm font-semibold text-[#7A8493]"
                >
                  <iconTime class="w-4 stroke-[#2CA3BF] fill-white" />
                  Fuel Surcharge Included
                </li>
              </ul>

              <div class="mt-auto flex flex-wrap items-center justify-between gap-5 pt-8">
                <NuxtLink
                  :to="{ path: '/fleet/detail', query: { car_id: car.id } }"
                  class="rounded-2xl bg-[#2CA3BF] px-8 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#238CA5]"
                >
                  View Details
                </NuxtLink>

                <!-- FIX: field is `hourly_price`, not `amount` -->
                <div v-if="car?.car_price?.[0]?.hourly_price" class="text-right">
                  <p class="text-[10px] font-black uppercase tracking-[0.2em] text-[#2CA3BF]">
                    PKR
                  </p>
                  <p class="leading-none">
                    <span class="text-3xl font-black text-[#111827]">
                      {{ formatPrice(car.car_price[0].hourly_price) }}
                    </span>
                    <span class="ml-1 text-xs font-bold uppercase text-[#7A8493]">
                      / hour
                    </span>
                  </p>
                </div>
                <div v-else class="text-right">
                  <p class="text-xs font-bold uppercase tracking-[0.1em] text-[#7A8493]">
                    Contact for pricing
                  </p>
                </div>
              </div>
            </div>
          </article>
        </template>

        <!-- Loading skeleton -->
        <template v-else>
          <div
            v-for="i in 6"
            :key="i"
            class="overflow-hidden rounded-[28px] border border-[#E7EEF3] bg-white"
          >
            <div class="aspect-[16/11] w-full animate-pulse bg-[#F1F5F8]"></div>
            <div class="space-y-3 p-7">
              <div class="h-4 w-2/3 animate-pulse rounded bg-[#F1F5F8]"></div>
              <div class="h-3 w-1/2 animate-pulse rounded bg-[#F1F5F8]"></div>
              <div class="h-3 w-1/3 animate-pulse rounded bg-[#F1F5F8]"></div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

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

const handleImageError = (event) => {
  event.target.style.display = "none";
};

const formatPrice = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return num.toLocaleString("en-US");
};

onMounted(async () => {
  cars.value = await useCars();
  loading.value = false;
});
</script>