<template>
  <div class="space-y-4">
    <div class="flex gap-4">
      <iconLocation class="w-5 h-5 fill-white" />
      <span>Office 605, Westburry Tower, Business Bay Dubai, UAE</span>
    </div>
    <div class="flex gap-4 items-center">
      <iconPhone class="w-5 h-5 fill-white" />
      <span>(+971) 4- 552-0932</span>
    </div>
    <div class="flex gap-4 items-center">
      <iconMobile class="w-5 h-5 fill-white" />
      <span>(+971) 4- 552-0932</span>
    </div>
    <div class="flex gap-4 items-center">
      <iconMail class="w-5 h-5 fill-white" />
      <span>info@realsmartlimousine.com</span>
    </div>
    <GoogleMap
      api-key="AIzaSyCc0FXkMRujB1PIFO39Z1Bg-Xu1AHGSlwE"
      :center="mapCenter"
      :zoom="14"
      ref="googleMap"
      class="w-full h-48"
    >
      <!-- Marker is placed on the map using markerPosition -->
      <Marker
        v-if="origin || mapCenter"
        :options="{ position: origin || mapCenter }"
      />
    </GoogleMap>
  </div>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
const mapCenter = ref({ lat: 25.186130390255663, lng: 55.27471956869392 });

</script>
