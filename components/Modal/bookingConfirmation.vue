<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-3 py-3 text-black backdrop-blur-sm">
    <div class="relative w-full max-w-3xl overflow-hidden rounded-[1.6rem] bg-white shadow-2xl">
      <!-- TOP ACCENT -->
      <div class="h-1.5 w-full bg-gradient-to-r from-[#0693E3] via-[#0878C9] to-[#045A9C]"></div>

      <!-- DECOR -->
      <div class="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#0693E3]/10 blur-2xl"></div>
      <div class="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-200/30 blur-3xl"></div>

      <div class="relative p-4 md:p-5">
        <!-- CLOSE BUTTON -->
        <button
          type="button"
          @click="emit('toggle-modal')"
          class="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
        >
          ✕
        </button>

        <!-- AFTER BOOKING RESPONSE -->
        <div v-if="response.message">
          <!-- SUCCESS -->
          <div v-if="response.success">
            <!-- SUCCESS HEADER -->
            <div class="text-center">
              <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-md">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.6" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <p class="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0693E3]">
                Real Smart Limousine
              </p>

              <h3 class="mt-1 text-2xl font-extrabold text-gray-950">
                Booking Confirmed!
              </h3>

              <p class="mx-auto mt-1 max-w-lg text-xs leading-5 text-gray-500">
                Your luxury ride has been booked successfully. Choose your next step.
              </p>
            </div>

            <!-- SUCCESS SUMMARY -->
            <div class="mt-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm">
              <div class="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p class="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    Booking Reference
                  </p>
                  <p class="text-lg font-black text-gray-950">
                    #{{ response.booking_id }}
                  </p>
                </div>

                <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  Confirmed
                </span>
              </div>

              <div class="grid gap-3 md:grid-cols-2">
                <!-- ROUTE -->
                <div class="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100">
                  <p class="mb-3 text-xs font-bold text-gray-900">Ride Route</p>

                  <div class="flex gap-3">
                    <div class="flex flex-col items-center">
                      <span class="mt-1 h-3.5 w-3.5 rounded-full bg-green-600"></span>
                      <span class="my-1.5 h-9 w-px bg-gray-300"></span>
                      <span class="h-3.5 w-3.5 rounded-full bg-red-600"></span>
                    </div>

                    <div class="flex-1 space-y-3">
                      <div>
                        <p class="text-[11px] text-gray-400">Pickup Location</p>
                        <p class="text-sm font-bold text-gray-900">
                          {{ booking.from_location || 'N/A' }}
                        </p>
                      </div>

                      <div>
                        <p class="text-[11px] text-gray-400">Drop Location</p>
                        <p class="text-sm font-bold text-gray-900">
                          {{ booking.to_location || 'Hourly Ride / Not available' }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- SCHEDULE -->
                <div class="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100">
                  <p class="mb-3 text-xs font-bold text-gray-900">Schedule & Fare</p>

                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between gap-4">
                      <span class="text-gray-500">Pickup Date</span>
                      <span class="text-right font-bold text-gray-900">{{ booking.pickup_date || 'N/A' }}</span>
                    </div>

                    <div class="flex justify-between gap-4">
                      <span class="text-gray-500">Pickup Time</span>
                      <span class="text-right font-bold text-gray-900">{{ booking.pickup_time || 'N/A' }}</span>
                    </div>

                    <div v-if="booking.ride_type" class="flex justify-between gap-4">
                      <span class="text-gray-500">Ride Type</span>
                      <span class="text-right font-bold capitalize text-gray-900">{{ booking.ride_type }}</span>
                    </div>

                    <div v-if="booking.distance" class="flex justify-between gap-4">
                      <span class="text-gray-500">Distance</span>
                      <span class="text-right font-bold text-gray-900">{{ booking.distance }}</span>
                    </div>

                    <div class="border-t border-gray-100 pt-2">
                      <div class="flex justify-between gap-4">
                        <span class="text-gray-500">Total Amount</span>
                        <span class="text-lg font-black text-[#0693E3]">
                          PKR {{ formatAmount(booking.cost) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ACTION BUTTONS -->
            <div class="mt-4 grid gap-3 md:grid-cols-2">
              <NuxtLink
                :to="paymentUrl"
                class="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0693E3] px-5 py-3.5 text-center font-extrabold text-white shadow-lg shadow-[#0693E3]/20 transition-all hover:-translate-y-0.5 hover:bg-[#057FCC]"
              >
                <span>Pay Now</span>
                <span class="transition group-hover:translate-x-1">→</span>
              </NuxtLink>

              <NuxtLink
                :to="`/booking-details?id=${response.booking_id}`"
                class="flex w-full items-center justify-center rounded-2xl bg-gray-950 px-5 py-3.5 text-center font-extrabold text-white shadow-lg shadow-gray-900/20 transition-all hover:-translate-y-0.5 hover:bg-black"
              >
                Pay Later
              </NuxtLink>
            </div>

            <p class="mt-3 text-center text-[11px] leading-4 text-blue-700">
              Safety center, payment proof, and full booking details are available from the booking details page.
            </p>
          </div>

          <!-- ERROR -->
          <div v-else class="py-4 text-center">
            <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <span class="text-2xl font-black">!</span>
            </div>

            <h3 class="text-2xl font-extrabold text-red-600">
              Booking Failed
            </h3>

            <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {{ response.message || 'Something went wrong. Please try again.' }}
            </p>

            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                @click="response.message = ''"
                class="rounded-2xl border border-gray-200 bg-white px-8 py-3 text-center font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Try Again
              </button>

              <NuxtLink
                to="/"
                class="rounded-2xl bg-[#0693E3] px-8 py-3 text-center font-bold text-white transition hover:bg-[#057FCC]"
              >
                Go to Home
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- BEFORE CONFIRM BOOKING -->
        <div v-else>
          <!-- HEADER -->
          <div class="text-center">
            <p class="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0693E3]">
              Final Step
            </p>

            <h3 class="mt-1 text-2xl font-extrabold text-gray-950">
              Review Your Ride
            </h3>

            <p class="mx-auto mt-1 max-w-lg text-xs leading-5 text-gray-500">
              Please verify passenger, route, schedule, and fare details before confirming.
            </p>
          </div>

          <!-- MAIN CONTENT -->
          <div class="mt-4 grid gap-4 md:grid-cols-5">
            <!-- PASSENGER CARD -->
            <div class="rounded-[1.4rem] border border-gray-100 bg-gradient-to-br from-[#0693E3] to-[#045A9C] p-4 text-white shadow-lg md:col-span-2">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-xl font-black">
                {{ passengerInitial }}
              </div>

              <p class="mt-4 text-[10px] uppercase tracking-[0.22em] text-white/70">
                Passenger
              </p>

              <h4 class="mt-1 text-lg font-black">
                {{ booking.name || 'Guest Passenger' }}
              </h4>

              <div class="mt-4 space-y-2 text-sm">
                <div>
                  <p class="text-white/60">Phone</p>
                  <p class="font-bold">{{ booking.contact_no || 'N/A' }}</p>
                </div>

                <div v-if="booking.email">
                  <p class="text-white/60">Email</p>
                  <p class="break-all font-bold">{{ booking.email }}</p>
                </div>

                <div>
                  <p class="text-white/60">Ride Type</p>
                  <p class="font-bold capitalize">{{ booking.ride_type || 'N/A' }}</p>
                </div>
              </div>
            </div>

            <!-- RIDE DETAILS -->
            <div class="rounded-[1.4rem] border border-gray-100 bg-gray-50 p-4 shadow-sm md:col-span-3">
              <div class="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p class="text-[10px] uppercase tracking-[0.2em] text-gray-400">Ride Summary</p>
                  <h4 class="text-lg font-black text-gray-950">Luxury Booking Details</h4>
                </div>

                <div class="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0693E3] shadow-sm">
                  RSL
                </div>
              </div>

              <!-- ROUTE -->
              <div class="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100">
                <div class="flex gap-3">
                  <div class="flex flex-col items-center">
                    <span class="mt-1 h-3.5 w-3.5 rounded-full bg-green-600"></span>
                    <span class="my-1.5 h-9 w-px bg-gray-300"></span>
                    <span class="h-3.5 w-3.5 rounded-full bg-red-600"></span>
                  </div>

                  <div class="flex-1 space-y-3">
                    <div>
                      <p class="text-[11px] text-gray-400">From</p>
                      <p class="text-sm font-bold text-gray-900">
                        {{ booking.from_location || 'N/A' }}
                      </p>
                    </div>

                    <div>
                      <p class="text-[11px] text-gray-400">To</p>
                      <p class="text-sm font-bold text-gray-900">
                        {{ booking.to_location || 'Hourly Ride / Not available' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- DETAILS GRID -->
              <div class="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div class="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100">
                  <p class="text-[11px] text-gray-400">Pickup Date</p>
                  <p class="font-black text-gray-900">{{ booking.pickup_date || 'N/A' }}</p>
                </div>

                <div class="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100">
                  <p class="text-[11px] text-gray-400">Pickup Time</p>
                  <p class="font-black text-gray-900">{{ booking.pickup_time || 'N/A' }}</p>
                </div>

                <div v-if="booking.distance" class="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100">
                  <p class="text-[11px] text-gray-400">Distance</p>
                  <p class="font-black text-gray-900">{{ booking.distance }}</p>
                </div>

                <div v-if="booking.ride_type === 'hourly'" class="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100">
                  <p class="text-[11px] text-gray-400">Total Hours</p>
                  <p class="font-black text-gray-900">{{ booking.hours || 'N/A' }}</p>
                </div>
              </div>

              <!-- TOTAL -->
              <div class="mt-3 rounded-2xl border border-[#0693E3]/20 bg-[#0693E3]/10 p-3">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-[10px] uppercase tracking-[0.18em] text-[#0693E3]">
                      Total Cost
                    </p>
                    <p class="text-[11px] text-gray-500">Estimated booking fare</p>
                  </div>

                  <p class="text-2xl font-black text-[#0693E3]">
                    PKR {{ formatAmount(booking.cost) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- BUTTONS -->
          <div class="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="emit('toggle-modal')"
              class="rounded-2xl border border-gray-200 bg-white px-6 py-3.5 font-bold text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              @click="confirmBooking"
              :disabled="loader"
              class="flex items-center justify-center rounded-2xl bg-green-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span
                v-if="loader"
                class="block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
              ></span>
              <span v-else>Confirm Booking</span>
            </button>
          </div>

          <p class="mt-3 text-center text-[11px] text-gray-400">
            By confirming, the booking will be saved and payment options will be shown.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const emit = defineEmits(['toggle-modal']);

const props = defineProps({
  booking: {
    type: Object,
    default: () => ({})
  }
});

const { $useCustomFetch } = useNuxtApp();

const booking = computed(() => props.booking || {});
const loader = ref(false);

const response = reactive({
  message: '',
  success: false,
  booking_id: null,
  amount: null
});

const passengerInitial = computed(() => {
  const name = booking.value.name || 'G';
  return String(name).trim().charAt(0).toUpperCase() || 'G';
});

const paymentUrl = computed(() => {
  const params = new URLSearchParams({
    booking_id: response.booking_id || '',
    amount: response.amount || '',
    name: booking.value.name || '',
    email: booking.value.email || '',
    contact: booking.value.contact_no || '',
    from_location: booking.value.from_location || '',
    to_location: booking.value.to_location || '',
    pickup_date: booking.value.pickup_date || '',
    pickup_time: booking.value.pickup_time || '',
    ride_type: booking.value.ride_type || '',
    distance: booking.value.distance || '',
    hours: booking.value.hours || ''
  });

  return `/payment?${params.toString()}`;
});

function formatAmount(value) {
  const numberValue = Number(value || 0);

  if (Number.isNaN(numberValue)) {
    return value || '0';
  }

  return numberValue.toLocaleString('en-PK', {
    maximumFractionDigits: 0
  });
}

async function confirmBooking() {
  loader.value = true;

  const data = { ...booking.value };

  if (!data.to_location) delete data.to_location;
  if (data.ride_type !== 'hourly') delete data.hours;
  if (!data.distance) delete data.distance;

  try {
    const res = await $useCustomFetch('/api/site/v1/booking/add', {
      method: 'POST',
      body: { ...data }
    });

    if (res.success) {
      response.success = true;
      response.message = res.message || 'Booking confirmed successfully.';
      response.booking_id = res.booking_id;
      response.amount = booking.value.cost;
    } else {
      response.success = false;
      response.message = res.message || 'Something went wrong.';
    }
  } catch (error) {
    console.error('Booking Confirm Error:', error);
    response.success = false;
    response.message = 'Something went wrong. Please try again.';
  }

  loader.value = false;
}
</script>