<template>
  <section class="mt-14 font-outfit">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <!-- Left Gallery -->
      <div class="lg:col-span-2">
        <div
          class="group/slider relative overflow-hidden rounded-[26px] border border-[#E7EEF3] bg-gradient-to-br from-white via-[#F8FBFD] to-[#F2FAFD] shadow-[0_6px_18px_rgba(15,23,42,0.04)]"
        >
          <!-- Badge -->
          <div
            class="absolute left-5 top-5 z-20 rounded-full bg-[#0B1220] px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-white"
          >
            RSL Fleet
          </div>

          <!-- Image counter -->
          <div
            v-if="visibleGalleryImages.length > 1"
            class="absolute right-5 top-5 z-20 rounded-full bg-black/50 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm"
          >
            {{ currentImageIndex + 1 }} / {{ visibleGalleryImages.length }}
          </div>

          <!-- Main Image (fully fills the card, edge to edge) -->
          <div class="relative aspect-video w-full overflow-hidden md:h-[420px]">
            <img
              v-if="mainImage"
              :src="getImageUrl(mainImage)"
              :alt="carDetail?.title || 'Car image'"
              class="h-full w-full object-cover transition-all duration-300"
              @error="handleImageError(mainImage)"
            />

            <div
              v-else
              class="flex h-full w-full items-center justify-center rounded-3xl border border-dashed border-[#CBD5E1] bg-white/70"
            >
              <p class="text-sm font-semibold text-[#64748B]">
                No car image available
              </p>
            </div>

            <!-- Prev / Next slider buttons -->
            <template v-if="visibleGalleryImages.length > 1">
              <button
                type="button"
                aria-label="Previous image"
                class="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0B1220] shadow-md transition-all duration-300 hover:scale-105 hover:bg-white"
                @click="showPreviousImage"
              >
                <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Next image"
                class="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0B1220] shadow-md transition-all duration-300 hover:scale-105 hover:bg-white"
                @click="showNextImage"
              >
                <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </template>

            <!-- Dot indicators -->
            <div
              v-if="visibleGalleryImages.length > 1"
              class="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5"
            >
              <button
                v-for="(image, idx) in visibleGalleryImages"
                :key="`dot-${image}-${idx}`"
                type="button"
                :aria-label="`Go to image ${idx + 1}`"
                class="h-1.5 rounded-full transition-all duration-300"
                :class="
                  idx === currentImageIndex
                    ? 'w-6 bg-white'
                    : 'w-1.5 bg-white/60 hover:bg-white/80'
                "
                @click="selectImage(image)"
              />
            </div>
          </div>
        </div>

        <!-- Thumbnail Gallery -->
        <!-- No fixed count: jitni bhi images hongi (admin ne jitni upload ki hain), grid unhi ke hisab se wrap hoga -->
        <div
          v-if="visibleGalleryImages.length"
          class="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        >
          <button
            v-for="(image, idx) in visibleGalleryImages"
            :key="`${image}-${idx}`"
            type="button"
            class="group h-20 overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-0.5"
            :class="
              image === mainImage
                ? 'border-[#2CA3BF] ring-2 ring-[#2CA3BF]/20'
                : 'border-[#E7EEF3] hover:border-[#2CA3BF]/60'
            "
            @click="selectImage(image)"
          >
            <img
              :src="getImageUrl(image)"
              :alt="`${carDetail?.title || 'Car'} thumbnail ${idx + 1}`"
              class="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
              @error="handleImageError(image)"
            />
          </button>
        </div>
      </div>

      <!-- Right Info Card -->
      <aside class="lg:col-span-1">
        <div
          class="rounded-[26px] border border-[#E7EEF3] bg-white p-6 shadow-[0_6px_18px_rgba(15,23,42,0.04)]"
        >
          <!-- Display Image -->
          <div
            class="relative overflow-hidden rounded-[24px] border border-[#EEF4F7] bg-gradient-to-br from-[#F8FBFD] to-white"
          >
            <div
              class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#2CA3BF]/10 blur-3xl"
            ></div>

            <img
              v-if="displayImage"
              :src="getImageUrl(displayImage)"
              :alt="carDetail?.title || 'Car image'"
              class="relative z-10 h-48 w-full object-cover"
              @error="handleImageError(displayImage)"
            />

            <div
              v-else
              class="flex h-48 items-center justify-center rounded-2xl border border-dashed border-[#CBD5E1]"
            >
              <p class="text-sm font-semibold text-[#64748B]">
                No image
              </p>
            </div>
          </div>

          <!-- Text -->
          <div class="mt-7">
            <p class="text-xs font-black uppercase tracking-[0.28em] text-[#2CA3BF]">
              Premium Vehicle
            </p>

            <h2 class="mt-2 text-2xl font-black uppercase leading-tight tracking-tight text-[#111827]">
              {{ carDetail?.title || "Vehicle Detail" }}
            </h2>
          </div>

          <!-- Specs -->
          <div class="mt-6 grid grid-cols-2 gap-3">
            <div class="rounded-2xl border border-[#E7EEF3] bg-[#F8FBFD] p-4">
              <p class="text-[11px] font-black uppercase tracking-[0.16em] text-[#7A8493]">
                Passengers
              </p>
              <p class="mt-2 text-2xl font-black text-[#111827]">
                {{ passengersText }}
              </p>
            </div>

            <div class="rounded-2xl border border-[#E7EEF3] bg-[#F8FBFD] p-4">
              <p class="text-[11px] font-black uppercase tracking-[0.16em] text-[#7A8493]">
                Luggage
              </p>
              <p class="mt-2 text-2xl font-black text-[#111827]">
                {{ luggageText }}
              </p>
            </div>
          </div>

          <!-- Vehicle Type -->
          <div
            v-if="vehicleType"
            class="mt-4 rounded-2xl border border-[#E7EEF3] bg-[#0B1220] p-4"
          >
            <p class="text-[11px] font-black uppercase tracking-[0.18em] text-white/50">
              Vehicle Type
            </p>
            <p class="mt-1 text-lg font-black uppercase text-white">
              {{ vehicleType }}
            </p>
          </div>

          <!-- Book Button -->
          <NuxtLink
            :to="{ path: '/book-ride', query: { car_id: carDetail?.id } }"
            class="mt-7 flex w-full items-center justify-center rounded-2xl bg-[#2CA3BF] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#238CA5]"
          >
            Book Now
          </NuxtLink>

          <p class="mt-4 text-center text-xs font-semibold leading-5 text-[#7A8493]">
            Reliable private ride service with professional booking support.
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const config = useRuntimeConfig();

const props = defineProps({
  carDetail: {
    type: Object,
    default: () => ({}),
  },
});

const selectedImage = ref("");
const failedImages = ref([]);

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
  return rawBaseUrl.value
    .replace(/\/+$/, "")
    .replace(/\/api\/.*$/, "");
});

/*
  ============================================================
  NORMALIZATION - Yeh sabse important part hai.
  Admin dashboard se images kai tarah aa sakti hain:
    1. Simple string:            "cars/123.jpg"
    2. Object with different keys:
         { image: "..." }
         { image_url: "..." }
         { url: "..." }
         { path: "..." }
         { file: "..." }
         { file_path: "..." }
         { photo: "..." }
    3. Nested inside { image: { url: "..." } }
    4. With a status/is_active flag that tells us
       whether the image should be shown or not.
  Is function ko itna flexible rakha hai ke chahe
  kitni bhi images ho (koi fixed range/count nahi),
  sab automatically pick ho jayengi.
  ============================================================
*/
const extractStatus = (image) => {
  // Agar object mein status/is_active/active field ho to usko check karo.
  // Agar field hi maujood nahi to hum assume karte hain image active hai.
  if (image && typeof image === "object") {
    const statusVal =
      image.status ??
      image.is_active ??
      image.active ??
      image.is_show ??
      image.show ??
      null;

    if (statusVal === null || statusVal === undefined) return true;

    // Handles: 1, "1", true, "true", "active", "yes" as active
    // Handles: 0, "0", false, "false", "inactive", "no" as inactive
    const normalized = String(statusVal).toLowerCase();
    return !["0", "false", "inactive", "no"].includes(normalized);
  }
  return true;
};

/*
  Backend bug fix:
  Kabhi kabhi image path DB me is tarah save ho jati hai:
    "\"uploads/admin/cars/123.webp\""
  Yani actual string ke shuru aur akhir me literal " (quote)
  character bhi shamil hota hai. Yeh function un stray quotes
  (aur kabhi kabhi extra whitespace) ko hata deta hai taake
  URL sahi bane.
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

const normalizeImage = (image) => {
  if (!image) return "";

  if (typeof image === "string") {
    return stripStrayQuotes(image);
  }

  if (typeof image === "object") {
    // Direct string fields (most common cases)
    const direct =
      image.image ||
      image.image_url ||
      image.imageUrl ||
      image.url ||
      image.path ||
      image.file ||
      image.file_path ||
      image.filePath ||
      image.photo ||
      image.src ||
      "";

    if (typeof direct === "string" && direct) return stripStrayQuotes(direct);

    // Nested object e.g. { image: { url: "..." } }
    if (direct && typeof direct === "object") {
      return stripStrayQuotes(
        direct.url ||
        direct.path ||
        direct.file ||
        direct.image ||
        ""
      );
    }
  }

  return "";
};

const isValidImagePath = (image) => {
  if (!image || typeof image !== "string") return false;

  const cleanImage = image.trim();

  if (!cleanImage) return false;
  if (cleanImage === "null") return false;
  if (cleanImage === "undefined") return false;

  return true;
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";

  const cleanImagePath = stripStrayQuotes(imagePath);

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

/*
  Admin side se jo multiple angle images add hoti hain,
  woh alag alag key names ke sath aa sakti hain depending
  on backend/API. Hum sab possible keys check karte hain
  aur jo pehli array mile (jisme kam se kam 1 item ho)
  wahi use karte hain — taake do alag sources ka data
  mix na ho.
*/
const rawGalleryImages = computed(() => {
  const candidates = [
    props.carDetail?.car_images,
    props.carDetail?.car_image,
    props.carDetail?.gallery_images,
    props.carDetail?.images,
    props.carDetail?.image_gallery,
    props.carDetail?.car_gallery,
    props.carDetail?.additional_images,
    props.carDetail?.photos,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length) {
      return candidate;
    }
  }

  return [];
});

const adminGalleryImages = computed(() => {
  return rawGalleryImages.value
    .filter((img) => extractStatus(img)) // sirf active/enabled images
    .map(normalizeImage)
    .filter(isValidImagePath);
});

/*
  Fallback images:
  Yeh display image/right side image ke liye hain,
  aur agar gallery empty ho to main image ke liye bhi kaam aati hain.
*/
const fallbackImages = computed(() => {
  return [
    props.carDetail?.image_url,
    props.carDetail?.display_image,
    props.carDetail?.image,
    props.carDetail?.display_banner_image,
    props.carDetail?.banner_image,
  ].filter(isValidImagePath);
});

/*
  Gallery me pehle admin wali angle images show hongi (jitni bhi hon,
  koi fixed limit nahi). Phir display image fallback me add hogi
  taake duplicate na ho.
*/
const galleryImages = computed(() => {
  const allImages = [
    ...adminGalleryImages.value,
    ...fallbackImages.value,
  ];

  return [...new Set(allImages)];
});

const visibleGalleryImages = computed(() => {
  return galleryImages.value.filter(
    (image) => !failedImages.value.includes(image)
  );
});

const mainImage = computed(() => {
  if (selectedImage.value && !failedImages.value.includes(selectedImage.value)) {
    return selectedImage.value;
  }

  return visibleGalleryImages.value[0] || "";
});

const displayImage = computed(() => {
  return (
    props.carDetail?.image_url ||
    props.carDetail?.display_image ||
    props.carDetail?.image ||
    mainImage.value ||
    ""
  );
});

const passengersText = computed(() => {
  return (
    props.carDetail?.passengers ||
    props.carDetail?.passengers_max ||
    props.carDetail?.max_passengers ||
    props.carDetail?.passenger_max ||
    "-"
  );
});

const luggageText = computed(() => {
  return (
    props.carDetail?.luggage ||
    props.carDetail?.luggage_max ||
    props.carDetail?.max_luggage ||
    props.carDetail?.luggage_capacity ||
    "-"
  );
});

const vehicleType = computed(() => {
  return (
    props.carDetail?.vehicle_type ||
    props.carDetail?.type ||
    props.carDetail?.category ||
    ""
  );
});

const selectImage = (image) => {
  selectedImage.value = image;
};

/*
  Slider navigation:
  currentImageIndex batata hai ke visibleGalleryImages array
  mein mainImage kis position par hai (counter aur dots ke liye).
  showNextImage / showPreviousImage is index ke hisab se
  agli/pichli image select karte hain, aur end/start par
  wraparound (loop) kar dete hain.
*/
const currentImageIndex = computed(() => {
  const idx = visibleGalleryImages.value.indexOf(mainImage.value);
  return idx === -1 ? 0 : idx;
});

const showNextImage = () => {
  const total = visibleGalleryImages.value.length;
  if (total < 2) return;

  const nextIndex = (currentImageIndex.value + 1) % total;
  selectedImage.value = visibleGalleryImages.value[nextIndex];
};

const showPreviousImage = () => {
  const total = visibleGalleryImages.value.length;
  if (total < 2) return;

  const prevIndex = (currentImageIndex.value - 1 + total) % total;
  selectedImage.value = visibleGalleryImages.value[prevIndex];
};

const handleImageError = (image) => {
  if (!image) return;

  if (!failedImages.value.includes(image)) {
    failedImages.value = [...failedImages.value, image];
  }

  if (selectedImage.value === image) {
    selectedImage.value = "";
  }
};

/*
  DEBUG HELPER (dev only):
  Jab bhi carDetail change ho, console mein dekh lo ke
  raw gallery array aur normalized URLs kya bann rahe hain.
  Isko production mein hata dena ya comment out kar dena.
*/
if (process.dev) {
  watch(
    () => props.carDetail,
    (val) => {
      console.log("[CarDetail] raw carDetail:", val);
      console.log("[CarDetail] rawGalleryImages:", rawGalleryImages.value);
      console.log("[CarDetail] adminGalleryImages (normalized):", adminGalleryImages.value);
      console.log("[CarDetail] final galleryImages:", galleryImages.value);
    },
    { immediate: true, deep: true }
  );
}
</script>