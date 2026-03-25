<template>
  <div
    class="mt-14 md:px-16 px-3 text-white service-banner md:px-16 py-10 md:py-24"
  >
    <div>
      <div class="flex gap-2 md:gap-4 justify-center items-center">
        <hr class="w-10 md:w-20 border border-white" />
        <h2 data-aos="fade-up" class="uppercase font-semibold text-xl">
          Our Services
        </h2>
        <hr class="w-10 md:w-20 border border-white" />
      </div>
      <p class="mt-2 text-center opacity-80">
        On-time, reliable, and stress-free limousine services
      </p>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-20 gap-10 md:gap-20"
    >
      <div
        v-for="(service, index) in services"
        :key="index"
        data-aos="fade-up"
        :data-aos-delay="index * 50"
        class="flex gap-3"
      >
        <div>
          <!-- Render the icon component dynamically -->
          <component
            :is="service.icon"
            :class="[
              service.type == 'icon-time'
                ? 'fill-none stroke-white'
                : 'stroke-white fill-white',
            ]"
            class="w-7 h-7"
          />
        </div>
        <div>
          <h1 class="uppercase font-outfit font-semibold text-lg">
            {{ service.title }}
          </h1>
          <p class="mt-2 opacity-60">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, resolveComponent } from "vue";

import IconParties from "@/components/icon/Parties.vue";
import IconFlexible from "@/components/icon/Flexible.vue";
import IconRides from "@/components/icon/Rides.vue";
import IconEvents from "@/components/icon/Events.vue";
import IconTime from "@/components/icon/Time.vue";
import IconAeroplane from "@/components/icon/Aeroplane.vue";

const services = [
  {
    icon: IconParties,
    title: "Night Parties",
    description:
      "Make your night out unforgettable with Real Smart Limousine's exclusive night party transportation services.",
  },
  {
    icon: IconFlexible,
    title: "Flexibility",
    description:
      "Make your next occasion unforgettable with Real Smart Limousine's elegant, flexible, and reliable transportation.",
  },
  {
    icon: IconRides,
    title: "Luxury Rides",
    description:
      "Indulge in the ultimate travel experience with Real Smart Limousine's luxury ride services.",
  },
  {
    icon: IconEvents,
    title: "Events",
    description:
      "Turn any event into a special occasion with Real Smart Limousine’s premier event transportation services.",
  },
  {
    icon: IconTime,
    title: "Hourly Hire",
    type: "icon-time",
    description:
      "Whatever your needs are, Royal Smart Limousine’s customer-directed hourly service puts a chauffeur at your disposal for as long as you require.",
  },
  {
    icon: IconAeroplane,
    title: "Airport Transfers",
    description:
      "RSL specializes in providing chauffeur-driven Luxury Airport Transportation in Dubai to all corporate & leisure travelers.",
  },
];
</script>

<style scoped>
.service-banner {
  background: url("/images/services.png") center no-repeat;
  background-size: cover;
}
</style>
