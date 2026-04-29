<template>
  <div class="space-y-4">
    <div class="flex gap-4">
      <iconLocation class="w-5 h-5 fill-white" />
      <span>Office 604, City Tower, Main University Road, Peshawar, Pakistan</span>
    </div>

    <div class="flex gap-4 items-center">
      <iconPhone class="w-5 h-5 fill-white" />
      <span>(+92) 91-XXXXXXX</span>
    </div>

    <!-- <div class="flex gap-4 items-center">
      <iconMobile class="w-5 h-5 fill-white" />
      <span>0314-9535884</span>
    </div> -->

    <div class="flex gap-4 items-center">
      <iconMail class="w-5 h-5 fill-white" />
      <span>info@realsmartlimousine.com</span>
    </div>

    <div v-if="isClient">
      <GoogleMap :api-key="gmapKey" :center="mapCenter" :zoom="15" ref="googleMap"
        class="w-full h-48 rounded-lg overflow-hidden border border-gray-700">
        <Marker v-if="mapCenter" :options="{ position: mapCenter }" />
      </GoogleMap>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRuntimeConfig } from "#app";
import { GoogleMap, Marker } from "vue3-google-map";

const config = useRuntimeConfig();
const gmapKey = config.public.gmapKey;

// Coordinates for City Tower, University Road, Peshawar
const mapCenter = ref({ lat: 33.9996, lng: 71.5126 });

const isClient = ref(false);
onMounted(() => {
  isClient.value = true;
});
</script>