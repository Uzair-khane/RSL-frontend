<template>
  <div>
    <HeroSection title="our rates" imagePath="/images/contact-us.png" />

    <div
      class="grid grid-cols-1 md:grid-cols-2 md:px-16 px-3 mt-16 gap-2 md:gap-20"
    >
      <CarList @getPrice="getPrice" />
      <priceTable :carPrice="price" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const price = ref({});
import CarList from "./CarList.vue";
import priceTable from "./table.vue";

function getPrice(rate) {
  price.value = rate;
}
</script>
