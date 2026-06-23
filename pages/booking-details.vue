<template>
  <div class="min-h-screen bg-slate-100">

    <!-- Header -->
    <div class="bg-gradient-to-br from-[#0693E3] to-[#034f8c] text-white px-5 pt-6 pb-20">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="h-11 w-11 rounded-full bg-white/15 flex items-center justify-center text-xl">
          ←
        </NuxtLink>

        <div class="text-center">
          <p class="text-xs uppercase tracking-[0.25em] opacity-80">RSL Booking</p>
          <h1 class="text-2xl font-black">Booking Details</h1>
        </div>

        <span class="h-11 w-11"></span>
      </div>

      <div class="mt-6">
        <p class="text-sm opacity-80">Booking ID</p>
        <h2 class="text-4xl font-black">#{{ booking?.id || bookingId }}</h2>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 -mt-14 pb-10">

      <!-- Loading -->
      <div v-if="loading" class="bg-white rounded-3xl shadow-xl p-10 text-center">
        Loading booking...
      </div>

      <!-- Content -->
      <div v-else-if="booking" class="space-y-5">

        <!-- Status Card -->
        <div class="bg-white rounded-3xl shadow-xl p-5">
          <div class="grid grid-cols-2 gap-3">

            <div class="rounded-2xl bg-slate-100 p-4">
              <p class="text-xs text-slate-400">Booking Status</p>
              <p class="font-black capitalize text-slate-900">
                {{ booking.booking_status || 'pending' }}
              </p>
            </div>

            <div class="rounded-2xl p-4" :class="paymentBoxClass">
              <p class="text-xs opacity-70">Payment Status</p>
              <p class="font-black capitalize">
                {{ paymentLabel }}
              </p>
            </div>

          </div>

          <div class="mt-5 flex items-end justify-between">
            <div>
              <p class="text-xs text-slate-400">Total Amount</p>
              <p class="text-3xl font-black text-[#0693E3]">
                PKR {{ booking.amount }}
              </p>
            </div>

            <p class="text-xs text-slate-400 text-right">
              {{ booking.pickup_date }}<br />
              {{ booking.pickup_time }}
            </p>
          </div>
        </div>

        <!-- Passenger -->
        <div class="bg-white rounded-3xl shadow-sm p-5">
          <h3 class="font-black text-lg mb-4">Passenger Details</h3>

          <div class="grid md:grid-cols-3 gap-3 text-sm">
            <div class="bg-slate-100 rounded-2xl p-3">
              <p class="text-xs text-slate-400">Name</p>
              <p class="font-bold">{{ booking.name || 'N/A' }}</p>
            </div>

            <div class="bg-slate-100 rounded-2xl p-3">
              <p class="text-xs text-slate-400">Phone</p>
              <p class="font-bold">{{ booking.contact_no || 'N/A' }}</p>
            </div>

            <div class="bg-slate-100 rounded-2xl p-3">
              <p class="text-xs text-slate-400">Email</p>
              <p class="font-bold break-all">{{ booking.email || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <!-- Ride Details -->
        <div class="bg-white rounded-3xl shadow-sm p-5">
          <h3 class="font-black text-lg mb-4">Ride Details</h3>

          <div class="space-y-4">
            <div class="flex gap-3">
              <div class="w-3 h-3 rounded-full bg-green-500 mt-1.5"></div>
              <div>
                <p class="text-xs text-slate-400">Pickup</p>
                <p class="font-bold text-slate-900">{{ booking.from_location || 'N/A' }}</p>
              </div>
            </div>

            <div class="ml-1.5 h-6 border-l-2 border-dashed border-slate-300"></div>

            <div class="flex gap-3">
              <div class="w-3 h-3 rounded-full bg-red-500 mt-1.5"></div>
              <div>
                <p class="text-xs text-slate-400">Drop</p>
                <p class="font-bold text-slate-900">{{ booking.to_location || 'Hourly Ride' }}</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 text-sm">
            <div class="bg-slate-100 rounded-2xl p-3">
              <p class="text-xs text-slate-400">Ride Type</p>
              <p class="font-bold capitalize">{{ booking.ride_type || 'N/A' }}</p>
            </div>

            <div class="bg-slate-100 rounded-2xl p-3">
              <p class="text-xs text-slate-400">Distance</p>
              <p class="font-bold">{{ booking.distance || 'N/A' }}</p>
            </div>

            <div class="bg-slate-100 rounded-2xl p-3">
              <p class="text-xs text-slate-400">Price</p>
              <p class="font-bold">PKR {{ booking.price || 'N/A' }}</p>
            </div>

            <div class="bg-slate-100 rounded-2xl p-3">
              <p class="text-xs text-slate-400">Hours</p>
              <p class="font-bold">{{ booking.hours || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <!-- Driver -->
        <div v-if="booking.driver" class="bg-white rounded-3xl shadow-sm p-5">
          <h3 class="font-black text-lg mb-4">Driver Information</h3>

          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-[#0693E3] text-white flex items-center justify-center text-2xl font-black overflow-hidden">
              <img v-if="booking.driver.image" :src="booking.driver.image" class="w-full h-full object-cover" />
              <span v-else>{{ booking.driver.name ? booking.driver.name[0] : '?' }}</span>
            </div>

            <div class="flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <p class="text-xl font-black">{{ booking.driver.name || 'Driver' }}</p>
                <span
                  v-if="booking.driver.verified_status == 1"
                  class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-black"
                >
                  Verified
                </span>
              </div>

              <p class="text-sm text-slate-500">{{ booking.driver.contact || 'N/A' }}</p>
              <p class="text-xs text-slate-400 mt-1">
                ⭐ {{ booking.driver.rating || '5.0' }} • {{ booking.driver.total_rides || 0 }} rides • {{ booking.driver.experience_years || 0 }} yrs exp
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 mt-5">
            <a
              :href="`tel:${booking.driver.contact}`"
              class="bg-green-600 text-white py-3 rounded-2xl text-center font-black"
            >
              Call Driver
            </a>

            <NuxtLink
              :to="safetyUrl"
              class="bg-red-600 text-white py-3 rounded-2xl text-center font-black"
            >
              Safety Center
            </NuxtLink>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-3xl shadow-xl p-5">
          <h3 class="font-black text-lg mb-4">What would you like to do?</h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">

            <NuxtLink
              v-if="booking.payment_status !== 'paid'"
              :to="paymentUrl"
              class="bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-2xl font-black"
            >
              Pay Now
            </NuxtLink>

            <NuxtLink
              :to="trackingUrl"
              class="bg-[#0693E3] hover:bg-blue-600 text-white text-center py-4 rounded-2xl font-black"
            >
              Track Ride
            </NuxtLink>

            <NuxtLink
              :to="safetyUrl"
              class="bg-slate-900 hover:bg-black text-white text-center py-4 rounded-2xl font-black"
            >
              Safety Center
            </NuxtLink>

          </div>
        </div>

      </div>

      <!-- Not Found -->
      <div v-else class="bg-white rounded-3xl shadow-xl p-10 text-center">
        <h2 class="text-2xl font-black text-red-600">Booking not found</h2>
        <NuxtLink to="/" class="mt-5 inline-block bg-[#0693E3] text-white px-6 py-3 rounded-2xl font-bold">
          Go Home
        </NuxtLink>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const route = useRoute();
const { $useCustomFetch } = useNuxtApp();

const booking = ref(null);
const loading = ref(true);

const bookingId = route.query.id;

const paymentLabel = computed(() => {
  if (!booking.value) return 'Pending';

  if (booking.value.payment_status === 'paid') return 'Paid';
  if (booking.value.payment_status === 'failed') return 'Failed';

  return 'Pending';
});

const paymentBoxClass = computed(() => {
  if (!booking.value) return 'bg-orange-100 text-orange-700';

  if (booking.value.payment_status === 'paid') {
    return 'bg-green-100 text-green-700';
  }

  if (booking.value.payment_status === 'failed') {
    return 'bg-red-100 text-red-700';
  }

  return 'bg-orange-100 text-orange-700';
});

const paymentUrl = computed(() => {
  if (!booking.value) return '/payment';

  return `/payment?booking_id=${booking.value.id}
&amount=${booking.value.amount || ''}
&name=${encodeURIComponent(booking.value.name || '')}
&email=${encodeURIComponent(booking.value.email || '')}
&contact=${encodeURIComponent(booking.value.contact_no || '')}
&from_location=${encodeURIComponent(booking.value.from_location || '')}
&to_location=${encodeURIComponent(booking.value.to_location || '')}
&pickup_date=${encodeURIComponent(booking.value.pickup_date || '')}
&pickup_time=${encodeURIComponent(booking.value.pickup_time || '')}
&ride_type=${encodeURIComponent(booking.value.ride_type || '')}
&distance=${encodeURIComponent(booking.value.distance || '')}
&hours=${encodeURIComponent(booking.value.hours || '')}`.replace(/\s+/g, '');
});

const trackingUrl = computed(() => {
  if (!booking.value) return '/tracking';

  return `/tracking?booking_id=${booking.value.id}`;
});

const safetyUrl = computed(() => {
  if (!booking.value) return '/safety';

  return `/safety?booking_id=${booking.value.id}
&customer_id=${booking.value.id}
&driver_id=${booking.value.driver?.id || ''}
&driver_phone=${booking.value.driver?.contact || ''}`.replace(/\s+/g, '');
});

async function fetchBooking() {
  try {
    const res = await $useCustomFetch(
      `/api/site/v1/booking/status/${bookingId}`
    );

    if (res.success) {
      booking.value = res.data;
    }

  } catch (err) {
    console.log('Booking Details Error:', err);
  }

  loading.value = false;
}

onMounted(() => {
  fetchBooking();
});
</script>