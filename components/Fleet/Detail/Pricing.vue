<template>
  <section class="relative mt-16 overflow-hidden rounded-[28px] bg-[#0B1220] px-5 py-8 font-outfit shadow-2xl sm:px-8 lg:px-10">
    <!-- Background Decoration -->
    <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2CA3BF]/25 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

    <!-- Header -->
    <div class="relative z-10 mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
          <span class="h-2 w-2 rounded-full bg-[#2CA3BF]"></span>
          <span class="text-xs font-bold uppercase tracking-[0.25em] text-[#8CE8FF]">
            RSL Pricing
          </span>
        </div>

        <h2 class="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
          Premium Ride Pricing
        </h2>

        <p class="mt-3 max-w-2xl text-sm leading-7 text-white/65">
          Clear, reliable, and professional pricing for private rides, hourly bookings,
          business travel, and airport transfers.
        </p>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          Currency
        </p>
        <p class="mt-1 text-2xl font-black text-white">PKR</p>
      </div>
    </div>

    <!-- Cards -->
    <div class="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <!-- Per Hour -->
      <article
        class="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        <div class="absolute right-0 top-0 h-28 w-28 rounded-bl-[80px] bg-[#2CA3BF]/10 transition duration-300 group-hover:bg-[#2CA3BF]/20"></div>

        <div class="relative z-10">
          <div class="mb-6 flex items-start justify-between gap-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF8FC] shadow-sm">
              <iconTime class="h-7 w-7 stroke-[#2CA3BF] fill-none" />
            </div>

            <span class="rounded-full bg-[#F2F7FA] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#2CA3BF]">
              Flexible
            </span>
          </div>

          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-[#7A8493]">
            Per Hour Rate
          </p>

          <div class="mt-4 flex items-end gap-2">
            <span class="text-4xl font-black tracking-tight text-[#111827]">
              PKR {{ formatPrice(hourlyRate) }}
            </span>
            <span class="pb-2 text-sm font-bold text-[#7A8493]">
              / Hour
            </span>
          </div>

          <p class="mt-4 text-sm leading-7 text-[#687383]">
            Ideal for city rides, meetings, shopping trips, and flexible private travel.
          </p>

          <div class="mt-6 space-y-3">
            <div class="flex items-center gap-3 text-sm font-semibold text-[#364152]">
              <span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#2CA3BF]/10 text-[#2CA3BF]">✓</span>
              Private vehicle service
            </div>
            <div class="flex items-center gap-3 text-sm font-semibold text-[#364152]">
              <span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#2CA3BF]/10 text-[#2CA3BF]">✓</span>
              Best for short bookings
            </div>
          </div>
        </div>
      </article>

      <!-- Per Day Highlighted -->
      <article
        class="group relative overflow-hidden rounded-[24px] border border-[#2CA3BF]/40 bg-[#111827] p-6 shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2CA3BF] via-[#8CE8FF] to-[#2CA3BF]"></div>
        <div class="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#2CA3BF]/25 blur-2xl"></div>
        <div class="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

        <div class="relative z-10">
          <div class="mb-6 flex items-start justify-between gap-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 shadow-sm">
              <iconTime class="h-7 w-7 stroke-[#8CE8FF] fill-none" />
            </div>

            <span class="rounded-full bg-[#2CA3BF] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
              Popular
            </span>
          </div>

          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-white/55">
            Per Day Rate
          </p>

          <div class="mt-4 flex items-end gap-2">
            <span class="text-4xl font-black tracking-tight text-white">
              PKR {{ formatPrice(dayRate) }}
            </span>
            <span class="pb-2 text-sm font-bold text-white/55">
              / Day
            </span>
          </div>

          <p class="mt-4 text-sm leading-7 text-white/65">
            Best for events, full-day business travel, family trips, and premium bookings.
          </p>

          <div class="mt-6 space-y-3">
            <div class="flex items-center gap-3 text-sm font-semibold text-white/80">
              <span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#2CA3BF] text-white">✓</span>
              Full-day convenience
            </div>
            <div class="flex items-center gap-3 text-sm font-semibold text-white/80">
              <span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#2CA3BF] text-white">✓</span>
              Suitable for premium rides
            </div>
          </div>
        </div>
      </article>

      <!-- Airport Transfer -->
      <article
        class="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl md:col-span-2 xl:col-span-1"
      >
        <div class="absolute right-0 top-0 h-28 w-28 rounded-bl-[80px] bg-[#2CA3BF]/10 transition duration-300 group-hover:bg-[#2CA3BF]/20"></div>

        <div class="relative z-10">
          <div class="mb-6 flex items-start justify-between gap-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF8FC] shadow-sm">
              <iconAeroplane class="h-7 w-7 stroke-[#2CA3BF] fill-[#2CA3BF]" />
            </div>

            <span class="rounded-full bg-[#F2F7FA] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#2CA3BF]">
              Airport
            </span>
          </div>

          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-[#7A8493]">
            Airport Transfer
          </p>

          <div class="mt-4">
            <span class="text-4xl font-black tracking-tight text-[#111827]">
              PKR {{ airportTransferRange }}
            </span>
          </div>

          <p class="mt-4 text-sm leading-7 text-[#687383]">
            Reliable airport pickup and drop-off service with luggage support and smooth travel.
          </p>

          <div class="mt-6 space-y-3">
            <div class="flex items-center gap-3 text-sm font-semibold text-[#364152]">
              <span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#2CA3BF]/10 text-[#2CA3BF]">✓</span>
              Pickup and drop-off
            </div>
            <div class="flex items-center gap-3 text-sm font-semibold text-[#364152]">
              <span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#2CA3BF]/10 text-[#2CA3BF]">✓</span>
              Luggage-friendly ride
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Bottom Strip -->
    <div class="relative z-10 mt-8 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.2em] text-[#8CE8FF]">
            Need a custom ride?
          </p>
          <p class="mt-1 text-sm leading-6 text-white/65">
            Final price may vary based on route, distance, waiting time, and booking type.
          </p>
        </div>

        <NuxtLink
          to="/book-ride"
          class="inline-flex items-center justify-center rounded-full bg-[#2CA3BF] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#238CA5]"
        >
          Book Your Ride
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  pricing: {
    type: Array,
    default: () => [],
  },
});

const hourlyRate = computed(() => {
  return Number(props.pricing?.[0]?.amount || 0);
});

const dayRate = computed(() => {
  if (!hourlyRate.value) {
    return 0;
  }

  return hourlyRate.value * 10;
});

const airportTransferRange = computed(() => {
  if (!hourlyRate.value) {
    return "On Request";
  }

  const min = hourlyRate.value * 2;
  const max = hourlyRate.value * 3;

  return `${formatPrice(min)} - ${formatPrice(max)}`;
});

const formatPrice = (value) => {
  if (!value || value === "On Request") {
    return value || "On Request";
  }

  return Number(value).toLocaleString("en-PK");
};
</script>