<template>
  <section class="relative mt-16 overflow-hidden rounded-[28px] border border-[#E7EEF3] bg-white p-6 font-outfit shadow-xl sm:p-8 lg:p-10">
    <!-- Background Decoration -->
    <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2CA3BF]/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#0B1220]/5 blur-3xl"></div>

    <!-- Header -->
    <div class="relative z-10 mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div class="mb-3 inline-flex items-center gap-2 rounded-full bg-[#EAF8FC] px-4 py-2">
          <span class="h-2 w-2 rounded-full bg-[#2CA3BF]"></span>
          <span class="text-xs font-black uppercase tracking-[0.24em] text-[#2CA3BF]">
            RSL Vehicle Features
          </span>
        </div>

        <h2 class="text-2xl font-black uppercase tracking-tight text-[#111827] sm:text-3xl">
          Services Offered in This Car
        </h2>

        <p class="mt-3 max-w-2xl text-sm leading-7 text-[#6F7684]">
          A comfortable, clean, and professional ride experience designed for city travel,
          airport transfers, business rides, and private bookings.
        </p>
      </div>

      <div class="rounded-2xl border border-[#E7EEF3] bg-[#F8FBFD] px-5 py-4">
        <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#7A8493]">
          Vehicle Type
        </p>
        <p class="mt-1 text-xl font-black uppercase text-[#111827]">
          {{ vehicleType }}
        </p>
      </div>
    </div>

    <!-- Services Grid -->
    <div class="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <!-- Passengers -->
      <div class="group rounded-2xl border border-[#E7EEF3] bg-[#F8FBFD] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2CA3BF]/50 hover:bg-white hover:shadow-xl">
        <div class="mb-5 flex items-center justify-between">
          <div class="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#EAF8FC] p-3">
            <IconPassenger class="h-7 w-7 stroke-[#2CA3BF] fill-[#2CA3BF]" />
          </div>

          <span class="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#2CA3BF] shadow-sm">
            Capacity
          </span>
        </div>

        <h3 class="text-lg font-black text-[#111827]">
          {{ passengerText }}
        </h3>

        <p class="mt-2 text-sm leading-6 text-[#6F7684]">
          Comfortable seating capacity for a smooth private ride.
        </p>
      </div>

      <!-- Luggage -->
      <div class="group rounded-2xl border border-[#E7EEF3] bg-[#F8FBFD] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2CA3BF]/50 hover:bg-white hover:shadow-xl">
        <div class="mb-5 flex items-center justify-between">
          <div class="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#EAF8FC] p-3">
            <svg
              class="h-7 w-7 stroke-[#2CA3BF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 7V6a3 3 0 0 1 6 0v1m-9 4h12M6 7h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
              />
            </svg>
          </div>

          <span class="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#2CA3BF] shadow-sm">
            Luggage
          </span>
        </div>

        <h3 class="text-lg font-black text-[#111827]">
          {{ luggageText }}
        </h3>

        <p class="mt-2 text-sm leading-6 text-[#6F7684]">
          Suitable luggage space for airport and short-distance travel.
        </p>
      </div>

      <!-- Interior -->
      <div class="group rounded-2xl border border-[#E7EEF3] bg-[#F8FBFD] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2CA3BF]/50 hover:bg-white hover:shadow-xl">
        <div class="mb-5 flex items-center justify-between">
          <div class="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#EAF8FC] p-3">
            <IconLeatherInterior class="h-7 w-7 stroke-[#2CA3BF]" />
          </div>

          <span class="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#2CA3BF] shadow-sm">
            Comfort
          </span>
        </div>

        <h3 class="text-lg font-black text-[#111827]">
          Leather Interior
        </h3>

        <p class="mt-2 text-sm leading-6 text-[#6F7684]">
          Premium interior feel for a cleaner and more comfortable ride.
        </p>
      </div>

      <!-- Hourly Booking -->
      <div class="group rounded-2xl border border-[#E7EEF3] bg-[#F8FBFD] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2CA3BF]/50 hover:bg-white hover:shadow-xl">
        <div class="mb-5 flex items-center justify-between">
          <div class="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#EAF8FC] p-3">
            <iconTime class="h-7 w-7 stroke-[#2CA3BF] fill-none" />
          </div>

          <span class="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#2CA3BF] shadow-sm">
            Hourly
          </span>
        </div>

        <h3 class="text-lg font-black text-[#111827]">
          PKR Per Hour
        </h3>

        <p class="mt-2 text-sm leading-6 text-[#6F7684]">
          Flexible hourly booking option for meetings, city travel, and waiting time.
        </p>
      </div>

      <!-- Wi-Fi -->
      <div class="group rounded-2xl border border-[#E7EEF3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2CA3BF]/50 hover:shadow-xl">
        <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF8FC] p-3">
          <iconWifi class="h-7 w-7 stroke-[#2CA3BF]" />
        </div>

        <h3 class="text-lg font-black text-[#111827]">
          On Board Wi-Fi
        </h3>

        <p class="mt-2 text-sm leading-6 text-[#6F7684]">
          Stay connected during your ride where vehicle service supports Wi-Fi.
        </p>
      </div>

      <!-- Airport Transfer -->
      <div class="group rounded-2xl border border-[#E7EEF3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2CA3BF]/50 hover:shadow-xl">
        <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF8FC] p-3">
          <svg
            class="h-7 w-7 stroke-[#2CA3BF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 21 12 13.5 3 8.25V6l10.5 3L18 3h2.25l-3 8.25L21 13.5V15l-6-1.5-2.25 7.5H10.5Z"
            />
          </svg>
        </div>

        <h3 class="text-lg font-black text-[#111827]">
          Airport Transfer
        </h3>

        <p class="mt-2 text-sm leading-6 text-[#6F7684]">
          Reliable airport pickup and drop-off service with luggage support.
        </p>
      </div>

      <!-- Professional Ride -->
      <div class="group rounded-2xl border border-[#E7EEF3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2CA3BF]/50 hover:shadow-xl">
        <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF8FC] p-3">
          <svg
            class="h-7 w-7 stroke-[#2CA3BF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0"
            />
          </svg>
        </div>

        <h3 class="text-lg font-black text-[#111827]">
          Professional Service
        </h3>

        <p class="mt-2 text-sm leading-6 text-[#6F7684]">
          Designed for business rides, family bookings, and premium travel needs.
        </p>
      </div>

      <!-- Clean Ride -->
      <div class="group rounded-2xl border border-[#E7EEF3] bg-[#0B1220] p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 p-3">
          <svg
            class="h-7 w-7 stroke-[#8CE8FF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m5 13 4 4L19 7"
            />
          </svg>
        </div>

        <h3 class="text-lg font-black text-white">
          Clean & Comfortable
        </h3>

        <p class="mt-2 text-sm leading-6 text-white/65">
          A neat, comfortable, and reliable ride experience for every booking.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  carDetail: {
    type: Object,
    default: () => ({}),
  },
});

const vehicleType = computed(() => {
  return (
    props.carDetail?.vehicle_type ||
    props.carDetail?.type ||
    props.carDetail?.category ||
    "Private Car"
  );
});

const passengers = computed(() => {
  return (
    props.carDetail?.passengers ||
    props.carDetail?.passenger ||
    props.carDetail?.passengers_max ||
    props.carDetail?.max_passengers ||
    props.carDetail?.passenger_max ||
    ""
  );
});

const luggage = computed(() => {
  return (
    props.carDetail?.luggage ||
    props.carDetail?.luggage_max ||
    props.carDetail?.max_luggage ||
    props.carDetail?.luggage_capacity ||
    ""
  );
});

const passengerText = computed(() => {
  if (!passengers.value) {
    return "Passenger Capacity";
  }

  return `${passengers.value} Passengers`;
});

const luggageText = computed(() => {
  if (!luggage.value) {
    return "Luggage Support";
  }

  return `${luggage.value} Luggage`;
});
</script>