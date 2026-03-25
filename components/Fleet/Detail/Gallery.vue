<template>
  <div class="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
    <div class="col-span-2">
      <img
        v-if="carDetail?.car_images?.length"
        :src="
          selectedImage
            ? baseUrl + selectedImage
            : baseUrl + carDetail?.car_images[0].image
        "
        alt=""
        class="w-full aspect-video md:h-80 md:object-cover"
      />
      <div class="flex mt-5 md:flex-nowrap flex-wrap gap-3 md:gap-4">
        <div
          v-for="(image, idx) in carDetail?.car_images"
          :key="idx"
          :class="[idx !== currentIndex ? 'block' : 'hidden']"
          class="w-20 h-16"
        >
          <img
            class="h-full w-full object-cover cursor-pointer"
            :src="baseUrl + image.image"
            alt=""
            @click="showCurrentImage(image.image, idx)"
          />
        </div>
      </div>
    </div>
    <div class="col-span-1">
      <img :src="baseUrl + carDetail.image_url" alt="" />
      <h2 class="font-semibold mt-4 md:mt-14 uppercase text-xl font-outfit">
        {{ carDetail.title }}
      </h2>
      <NuxtLink
        :to="{ path: '/book-ride', query: { car_id: carDetail.id } }"
        class="bg-[#1CACEE] block text-center mt-4 md:mt-7 text-white py-2.5 w-full rounded-md"
      >
        Book now
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const config = useRuntimeConfig();
const currentIndex = ref(0);
const baseUrl = config.public.baseUrl;

const props = defineProps({
  carDetail: {
    type: Object,
    default: {},
  },
});
const selectedImage = ref("");

function showCurrentImage(image, index) {
  currentIndex.value = index;
  selectedImage.value = image;
}
</script>
