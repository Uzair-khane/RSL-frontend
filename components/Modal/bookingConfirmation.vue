<template>
  <div class="fixed inset-0 z-20 flex items-center justify-center bg-black/40 px-3 text-black">
    <div class="relative w-full max-w-2xl rounded-2xl bg-white p-5 shadow-2xl md:p-8">

      <!-- After Booking Response -->
      <div v-if="response.message">

        <!-- Success -->
        <div v-if="response.success">

          <!-- Success Header -->
          <div class="text-center">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg class="h-9 w-9 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 class="text-2xl font-bold text-gray-900">
              Booking Confirmed!
            </h3>

            <p class="mt-2 text-sm text-gray-500">
              Your ride has been booked successfully. Choose how you want to continue.
            </p>
          </div>

          <!-- Booking Summary -->
          <div class="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm">
            <div class="space-y-3">

              <div class="flex justify-between gap-4">
                <span class="text-gray-500">Booking ID</span>
                <span class="font-bold text-gray-900">#{{ response.booking_id }}</span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-gray-500">From</span>
                <span class="text-right font-semibold text-gray-900">{{ booking.from_location }}</span>
              </div>

              <div v-if="booking.to_location" class="flex justify-between gap-4">
                <span class="text-gray-500">To</span>
                <span class="text-right font-semibold text-gray-900">{{ booking.to_location }}</span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-gray-500">Pickup Date</span>
                <span class="font-semibold text-gray-900">{{ booking.pickup_date }}</span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-gray-500">Pickup Time</span>
                <span class="font-semibold text-gray-900">{{ booking.pickup_time }}</span>
              </div>

              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between gap-4">
                  <span class="text-gray-500">Total Amount</span>
                  <span class="text-lg font-bold text-[#0693E3]">PKR {{ booking.cost }}</span>
                </div>
              </div>

            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-6 space-y-3">

            <!-- Pay Now -->
            <NuxtLink :to="paymentUrl"
              class="flex w-full items-center justify-center rounded-xl bg-[#0693E3] px-5 py-4 text-center font-bold text-white shadow-md transition-all hover:bg-blue-600">
              Pay Now
            </NuxtLink>

            <!-- Pay Later -->
            <NuxtLink :to="`/booking-details?id=${response.booking_id}`"
              class="flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-4 text-center font-bold text-white shadow-md transition-all hover:bg-green-700">
              Pay Later
            </NuxtLink>

            <!-- Track Ride -->
            <NuxtLink :to="trackingUrl"
              class="flex w-full items-center justify-center rounded-xl bg-gray-900 px-5 py-4 text-center font-bold text-white shadow-md transition-all hover:bg-black">
              Track My Ride
            </NuxtLink>

          </div>

          <p class="mt-4 text-center text-xs text-gray-400">
            Safety features are available inside the live tracking page.
          </p>

        </div>

        <!-- Error -->
        <div v-else>
          <div class="text-center">
            <h3 class="text-2xl font-bold text-red-600">Oops!</h3>
            <p class="mt-4 text-gray-500">
              {{ response.message || 'Something went wrong. Please try again.' }}
            </p>

            <NuxtLink to="/"
              class="mt-6 block rounded-xl bg-[#0693E3] px-8 py-3 text-center font-semibold text-white hover:bg-blue-600">
              Go to Home
            </NuxtLink>
          </div>
        </div>

      </div>

      <!-- Before Confirm Booking -->
      <div v-else>

        <h3 class="text-center text-2xl font-bold text-gray-900">
          Your Ride Details
        </h3>

        <p class="mt-2 text-center text-sm text-gray-500">
          Please review your ride details before confirming.
        </p>

        <div class="mt-6 space-y-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">

          <div class="flex justify-between gap-4">
            <span class="text-gray-500">Name</span>
            <span class="text-right font-semibold">{{ booking.name }}</span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="text-gray-500">Phone</span>
            <span class="text-right font-semibold">{{ booking.contact_no }}</span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="text-gray-500">From</span>
            <span class="text-right font-semibold">{{ booking.from_location }}</span>
          </div>

          <div v-if="booking.to_location" class="flex justify-between gap-4">
            <span class="text-gray-500">To</span>
            <span class="text-right font-semibold">{{ booking.to_location }}</span>
          </div>

          <div v-if="booking.distance" class="flex justify-between gap-4">
            <span class="text-gray-500">Distance</span>
            <span class="text-right font-semibold">{{ booking.distance }}</span>
          </div>

          <div v-if="booking.ride_type === 'hourly'" class="flex justify-between gap-4">
            <span class="text-gray-500">Total Hours</span>
            <span class="text-right font-semibold">{{ booking.hours }}</span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="text-gray-500">Pickup Date</span>
            <span class="text-right font-semibold">{{ booking.pickup_date }}</span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="text-gray-500">Pickup Time</span>
            <span class="text-right font-semibold">{{ booking.pickup_time }}</span>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <div class="flex justify-between gap-4">
              <span class="text-gray-500">Total Cost</span>
              <span class="text-lg font-bold text-[#0693E3]">PKR {{ booking.cost }}</span>
            </div>
          </div>

        </div>

        <!-- Buttons -->
        <div class="mt-6 flex gap-3">
          <button @click="emit('toggle-modal')"
            class="w-1/2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-600 hover:bg-gray-50">
            Cancel
          </button>

          <button @click="confirmBooking" :disabled="loader"
            class="flex w-1/2 items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-70">
            <span v-if="loader"
              class="block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            <span v-else>Confirm Booking</span>
          </button>
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

const booking = props.booking;
const loader = ref(false);

const response = reactive({
  message: '',
  success: false,
  booking_id: null,
  amount: null
});

const paymentUrl = computed(() => {
  return `/payment?booking_id=${response.booking_id}
&amount=${response.amount}
&name=${encodeURIComponent(booking.name || '')}
&email=${encodeURIComponent(booking.email || '')}
&contact=${encodeURIComponent(booking.contact_no || '')}
&from_location=${encodeURIComponent(booking.from_location || '')}
&to_location=${encodeURIComponent(booking.to_location || '')}
&pickup_date=${encodeURIComponent(booking.pickup_date || '')}
&pickup_time=${encodeURIComponent(booking.pickup_time || '')}
&ride_type=${encodeURIComponent(booking.ride_type || '')}
&distance=${encodeURIComponent(booking.distance || '')}
&hours=${encodeURIComponent(booking.hours || '')}`.replace(/\s+/g, '');
});

const trackingUrl = computed(() => {
  return `/tracking?booking_id=${response.booking_id}
&from_location=${encodeURIComponent(booking.from_location || '')}
&to_location=${encodeURIComponent(booking.to_location || '')}
&customer_id=${encodeURIComponent(booking.customer_id || '')}
&driver_id=${encodeURIComponent(booking.driver_id || '')}
&driver_phone=${encodeURIComponent(booking.driver_phone || '')}`.replace(/\s+/g, '');
});

async function confirmBooking() {
  loader.value = true;

  const data = { ...booking };

  if (!booking.to_location) delete data.to_location;
  if (booking.ride_type !== 'hourly') delete data.hours;
  if (!booking.distance) delete data.distance;

  try {
    const res = await $useCustomFetch('/api/site/v1/booking/add', {
      method: 'POST',
      body: { ...data }
    });

    if (res.success) {
      response.success = true;
      response.message = res.message || 'Booking confirmed successfully.';
      response.booking_id = res.booking_id;
      response.amount = booking.cost;
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