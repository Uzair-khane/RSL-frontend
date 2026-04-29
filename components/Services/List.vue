<template>
  <div class="md:px-16 py-10 md:py-20 px-3 text-slate-900 services md:px-16 py-10 md:py-16">
    <div class="space-y-5 services-hover">
      <div v-for="(service, index) in services" data-aos="fade-up" :key="index"
        class="flex gap-3 group py-6 px-4 rounded-md hover:text-white">
        <div>
          <!-- Render the icon component dynamically -->
          <component :is="service.icon" :class="[
            service.type == 'icon-time'
              ? 'fill-none stroke-slate-900 group-hover:stroke-white'
              : 'fill-slate-900  group-hover:fill-white group-hover:stroke-white stroke-slate-900',
          ]" class="w-7 h-7" />
        </div>
        <div>
          <h1 class="uppercase font-bold font-outfit text-lg">
            {{ service.title }}
          </h1>
          <p class="mt-2 leading-relaxed opacity-80">
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
    description: `Make your night out unforgettable with Real
     Smart Limousine's exclusive night party transportation services.
     Whether you're heading to a club, a concert, or a private event, our 
     luxury limousines ensure you arrive in style and comfort. With spacious interiors,
     premium amenities, and professional chauffeurs, you and your guests can focus on 
     enjoying the night while we handle the driving. Experience the ultimate in elegance,
     safety, and convenience for your next night party with RSL. `,
  },
  {
    icon: IconFlexible,
    title: "Flexibility",
    description: `Our customer directed hourly limousine service offers flexibility and convenience along with luxury and comfort. Simply reserve the vehicle of your choice and direct your chauffeur to where you would like to go. Make as many stops along the way. No advanced itinerary is necessary. Service covers all of United Arab Emirates .Our customer services will be available 24 /7 a week to get in touch to the customer with highest level of service and assistance.`,
  },
  {
    icon: IconRides,
    title: "Luxury Rides",
    description: `Indulge in the ultimate travel experience with Real Smart Limousine's luxury ride services. Whether it's a business meeting, a special occasion, or simply a desire to travel in style, our fleet of high-end limousines offers unmatched comfort, elegance, and sophistication. With plush interiors, top-of-the-line amenities, and a focus on exceptional service, every ride with RSL guarantees a first-class experience. `,
  },
  {
    icon: IconEvents,
    title: "Events",
    description: `Turn any event into a special occasion with Real Smart Limousine’s premier
     event transportation services. Whether it’s a wedding, corporate event, gala, or private 
     celebration, our luxurious limousines ensure you and your guests arrive in comfort and style.
     With experienced chauffeurs and a commitment to punctuality and professionalism, we
     provide a seamless and stress-free experience, allowing you to focus on enjoying your 
     event. Make your next occasion unforgettable with RSL’s elegant and reliable transportation.`,
  },
  {
    icon: IconTime,
    title: "Hourly Hire",
    type: "icon-time",
    description: `Enjoy the flexibility and convenience of Real Smart Limousine’s hourly rate services. Whether you need transportation for meetings, events, or a day of leisure, our hourly packages allow you to have a dedicated chauffeur and luxury vehicle at your disposal for as long as you need. With no fixed routes or schedules, you can customize your travel experience, making multiple stops or adjusting your plans on the go. Experience premium service, comfort, and reliability, all at a competitive hourly rate tailored to meet your needs.`,
  },
  {
    icon: IconAeroplane,
    title: "Airport Transfers",
    description: `Real Smart Limousine specialize in providing chauffeur driven Luxury Airport Transportation in pakistan to all corporate and leisure travelers. We provide reliable Airport Limo services for all your Airport transportation needs. We have been trusted for delivering Professional, Dependable and Discreet chauffeur driven airport transportation services. We always ensure that your journey from airport to your destination or vice versa, is always pleasurable and safe.`,
  },
];
</script>

<style scoped>
.services {
  background: url("/images/list-services.bg.png") center no-repeat;
  background-size: cover;
}

.services-hover>div:hover {
  cursor: default;
  background-image: url("/images/services-hover.png");
}
</style>
