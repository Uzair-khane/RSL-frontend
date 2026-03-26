<template>
  <div class="space-y-4">
    <!-- Contact Info -->
    <div class="flex gap-4">
      <iconLocation class="w-5 h-5 fill-white" />
      <span>Office 605, Westburry Tower, Business Bay Dubai, UAE</span>
    </div>
    <div class="flex gap-4 items-center">
      <iconPhone class="w-5 h-5 fill-white" />
      <span>(+971) 4-552-0932</span>
    </div>
    <div class="flex gap-4 items-center">
      <iconMobile class="w-5 h-5 fill-white" />
      <span>(+971) 4-552-0932</span>
    </div>
    <div class="flex gap-4 items-center">
      <iconMail class="w-5 h-5 fill-white" />
      <span>info@realsmartlimousine.com</span>
    </div>

    <!-- Google Map -->
    <div v-if="isClient">
      <GoogleMap
        :api-key="gmapKey"
        :center="mapCenter"
        :zoom="14"
        ref="googleMap"
        class="w-full h-48"
      >
        <Marker v-if="mapCenter" :options="{ position: mapCenter }" />
      </GoogleMap>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRuntimeConfig } from "#app"; // Nuxt 3 runtime config
import { GoogleMap, Marker } from "vue3-google-map";

const config = useRuntimeConfig();
const gmapKey = config.public.gmapKey; // secure API key from .env

const mapCenter = ref({ lat: 25.186130390255663, lng: 55.27471956869392 });

// SSR Safe Check
const isClient = ref(false);
onMounted(() => {
  isClient.value = true;
});
</script>

<style scoped>
/* Optional: Make map full width and responsive */
</style>