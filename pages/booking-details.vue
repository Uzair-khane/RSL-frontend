<template>
  <div class="min-h-screen bg-[#F3F7FB] text-slate-950">
    <!-- PREMIUM HERO -->
    <section class="relative overflow-hidden bg-slate-950 text-white">
      <!-- BLUE GLOW BACKGROUND -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#0693E3] via-[#045A9C] to-slate-950"></div>
      <div class="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>
      <div class="absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-[#0693E3]/25 blur-3xl"></div>
      <div class="absolute inset-0 opacity-10">
        <div class="h-full w-full bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:26px_26px]"></div>
      </div>

      <div class="relative mx-auto max-w-7xl px-4 pb-28 pt-8">
        <!-- TOP ROW -->
        <div class="flex items-center justify-between gap-4">
          <NuxtLink
            to="/"
            class="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl font-bold text-white backdrop-blur transition hover:bg-white/20"
          >
            <span class="transition group-hover:-translate-x-1">←</span>
          </NuxtLink>

          <div class="text-center">
            <p class="text-xs font-black uppercase tracking-[0.35em] text-white/60">
              Real Smart Limousine
            </p>
            <h1 class="mt-1 text-2xl font-black md:text-4xl">
              Booking Details
            </h1>
          </div>

          <div class="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-black backdrop-blur">
            RSL
          </div>
        </div>

        <!-- HERO CONTENT -->
        <div class="mt-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <p class="text-sm font-semibold text-white/70">
              Booking Reference
            </p>

            <h2 class="mt-2 text-6xl font-black tracking-tight md:text-7xl">
              #{{ booking?.id || bookingId }}
            </h2>

            <p class="mt-4 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              Manage your limousine booking, payment status, passenger information, route plan,
              driver details, tracking, and safety actions from one premium dashboard.
            </p>
          </div>

          <div class="lg:col-span-5">
            <div class="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-white/50">
                    Ride Status
                  </p>
                  <p class="mt-1 text-2xl font-black capitalize">
                    {{ booking?.booking_status || 'pending' }}
                  </p>
                </div>

                
              </div>

              <div class="mt-5 grid grid-cols-2 gap-3">
                <div class="rounded-2xl bg-white/10 p-3">
                  <p class="text-xs text-white/50">Booking</p>
                  <span
                    class="mt-2 inline-flex rounded-full px-3 py-1 text-xs font-black capitalize"
                    :class="heroBookingBadgeClass"
                  >
                    {{ booking?.booking_status || 'pending' }}
                  </span>
                </div>

                <div class="rounded-2xl bg-white/10 p-3">
                  <p class="text-xs text-white/50">Payment</p>
                  <span
                    class="mt-2 inline-flex rounded-full px-3 py-1 text-xs font-black capitalize"
                    :class="paymentBadgeClass"
                  >
                    {{ paymentLabel }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="relative mx-auto max-w-7xl px-4 pb-12 -mt-20">
      <!-- LOADING -->
      <div
        v-if="loading"
        class="rounded-[2rem] border border-white bg-white/90 p-10 text-center shadow-2xl backdrop-blur"
      >
        <div class="mx-auto mb-4 h-14 w-14 animate-spin rounded-full border-4 border-[#0693E3]/20 border-t-[#0693E3]"></div>
        <p class="font-black text-slate-700">Loading booking details...</p>
      </div>

      <!-- CONTENT -->
      <div v-else-if="booking" class="space-y-6">
        <!-- FLOATING SUMMARY -->
        <section class="overflow-hidden rounded-[2rem] border border-white bg-white shadow-2xl">
          <div class="h-1.5 bg-gradient-to-r from-[#0693E3] via-[#0878C9] to-[#045A9C]"></div>

          <div class="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
            <div class="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-100">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-xs text-slate-400">Booking Status</p>
                  <p class="mt-1 text-lg font-black capitalize text-slate-950">
                    {{ booking.booking_status || 'pending' }}
                  </p>
                </div>
                <span
                  class="h-3 w-3 rounded-full"
                  :class="statusDotClass"
                ></span>
              </div>
            </div>

            <div class="rounded-3xl p-4 ring-1 ring-slate-100" :class="paymentBoxClass">
              <p class="text-xs opacity-70">Payment Status</p>
              <p class="mt-1 text-lg font-black capitalize">
                {{ paymentLabel }}
              </p>
            </div>

            <div class="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-100">
              <p class="text-xs text-slate-400">Pickup Schedule</p>
              <p class="mt-1 text-lg font-black text-slate-950">
                {{ booking.pickup_date || 'N/A' }}
              </p>
              <p class="text-xs font-bold text-slate-500">
                {{ booking.pickup_time || 'N/A' }}
              </p>
            </div>

            <div class="rounded-3xl bg-[#0693E3]/10 p-4 ring-1 ring-[#0693E3]/20">
              <p class="text-xs uppercase tracking-[0.18em] text-[#0693E3]">
                Total Amount
              </p>
              <p class="mt-1 text-3xl font-black text-[#0693E3]">
                PKR {{ formatAmount(booking.amount) }}
              </p>
            </div>
          </div>
        </section>

        <!-- MAIN GRID -->
        <section class="grid gap-6 lg:grid-cols-12">
          <!-- LEFT COLUMN -->
          <div class="space-y-6 lg:col-span-4">
            <!-- PASSENGER CARD -->
            <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0693E3] via-[#0477BD] to-[#034f8c] p-6 text-white shadow-xl">
              <div class="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl"></div>

              <div class="relative">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black shadow-inner">
                    {{ passengerInitial }}
                  </div>

                  <span class="rounded-full bg-white/15 px-3 py-1 text-xs font-black backdrop-blur">
                    Passenger
                  </span>
                </div>

                <div class="mt-6">
                  <p class="text-xs uppercase tracking-[0.25em] text-white/60">
                    Passenger Details
                  </p>

                  <h3 class="mt-2 break-words text-2xl font-black">
                    {{ booking.name || 'N/A' }}
                  </h3>
                </div>

                <div class="mt-6 space-y-4 text-sm">
                  <div class="rounded-2xl bg-white/10 p-3">
                    <p class="text-white/60">Phone</p>
                    <p class="font-bold">{{ booking.contact_no || 'N/A' }}</p>
                  </div>

                  <div class="rounded-2xl bg-white/10 p-3">
                    <p class="text-white/60">Email</p>
                    <p class="break-all font-bold">{{ booking.email || 'N/A' }}</p>
                  </div>

                  <div class="rounded-2xl bg-white/10 p-3">
                    <p class="text-white/60">Ride Type</p>
                    <p class="font-bold capitalize">{{ booking.ride_type || 'N/A' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- DRIVER CARD -->
            <div
              v-if="booking.driver"
              class="rounded-[2rem] bg-white p-5 shadow-xl"
            >
              <div class="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-[#0693E3]">
                    Chauffeur
                  </p>
                  <h3 class="mt-1 text-xl font-black">Driver Information</h3>
                </div>

                <span
                  v-if="booking.driver.verified_status == 1"
                  class="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700"
                >
                  Verified
                </span>
              </div>

              <div class="flex items-center gap-4">
                <div class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#0693E3] to-[#034f8c] text-3xl font-black text-white shadow-lg">
                  <img
                    v-if="booking.driver.image"
                    :src="booking.driver.image"
                    class="h-full w-full object-cover"
                  />
                  <span v-else>{{ booking.driver.name ? booking.driver.name[0] : '?' }}</span>
                </div>

                <div class="min-w-0 flex-1">
                  <p class="break-words text-xl font-black">
                    {{ booking.driver.name || 'Driver' }}
                  </p>

                  <p class="mt-1 text-sm text-slate-500">
                    {{ booking.driver.contact || 'N/A' }}
                  </p>

                  <p class="mt-2 text-xs font-semibold text-slate-400">
                    ⭐ {{ booking.driver.rating || '5.0' }}
                    • {{ booking.driver.total_rides || 0 }} rides
                    • {{ booking.driver.experience_years || 0 }} yrs exp
                  </p>
                </div>
              </div>

              <div class="mt-5 grid grid-cols-2 gap-3">
                <a
                  :href="`tel:${booking.driver.contact}`"
                  class="rounded-2xl bg-green-600 py-3 text-center font-black text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
                >
                  Call
                </a>

                <NuxtLink
                  :to="safetyUrl"
                  class="rounded-2xl bg-red-600 py-3 text-center font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
                >
                  SOS
                </NuxtLink>
              </div>
            </div>

            <!-- DRIVER NOT ASSIGNED -->
            <div
              v-else
              class="rounded-[2rem] border border-dashed border-[#0693E3]/30 bg-white p-5 text-center shadow-xl"
            >
              <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0693E3]/10 text-2xl">
              
              </div>

              <h3 class="mt-3 text-lg font-black">Driver Assignment Pending</h3>
              <p class="mt-2 text-sm text-slate-500">
                A chauffeur will be assigned by the RSL team before the pickup time.
              </p>
            </div>
          </div>

          <!-- RIGHT COLUMN -->
          <div class="space-y-6 lg:col-span-8">
            <!-- ROUTE PLAN -->
            <div class="rounded-[2rem] bg-white p-6 shadow-xl">
              <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-[#0693E3]">
                    Route Plan
                  </p>

                  <h3 class="mt-1 text-2xl font-black">
                    Ride Journey
                  </h3>
                </div>

                <span class="rounded-full bg-[#0693E3]/10 px-4 py-2 text-xs font-black text-[#0693E3]">
                  Luxury Ride
                </span>
              </div>

              <!-- ROUTE TIMELINE CARD -->
              <div class="relative overflow-hidden rounded-[2rem] bg-slate-50 p-5 ring-1 ring-slate-100">
                <div class="absolute right-6 top-6 rounded-full bg-white px-3 py-1 text-xs font-black text-[#0693E3] shadow-sm">
                  RSL Route
                </div>

                <div class="flex gap-4 pr-20">
                  <div class="flex flex-col items-center">
                    <span class="mt-1 h-5 w-5 rounded-full border-4 border-green-100 bg-green-600 shadow-sm"></span>
                    <span class="my-2 h-20 w-px bg-gradient-to-b from-green-500 via-slate-300 to-red-500"></span>
                    <span class="h-5 w-5 rounded-full border-4 border-red-100 bg-red-600 shadow-sm"></span>
                  </div>

                  <div class="flex-1 space-y-8">
                    <div>
                      <p class="text-xs text-slate-400">Pickup Location</p>
                      <p class="mt-1 break-words text-lg font-black text-slate-950">
                        {{ booking.from_location || 'N/A' }}
                      </p>
                    </div>

                    <div>
                      <p class="text-xs text-slate-400">Drop Location</p>
                      <p class="mt-1 break-words text-lg font-black text-slate-950">
                        {{ booking.to_location || 'Hourly Ride' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- META GRID -->
              <div class="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p class="text-xs text-slate-400">Ride Type</p>
                  <p class="mt-1 font-black capitalize">{{ booking.ride_type || 'N/A' }}</p>
                </div>

                <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p class="text-xs text-slate-400">Distance</p>
                  <p class="mt-1 font-black">{{ booking.distance || 'N/A' }}</p>
                </div>

                <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p class="text-xs text-slate-400">Price</p>
                  <p class="mt-1 font-black">PKR {{ formatAmount(booking.price) }}</p>
                </div>

                <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p class="text-xs text-slate-400">Hours</p>
                  <p class="mt-1 font-black">{{ booking.hours || 'N/A' }}</p>
                </div>
              </div>
            </div>

            <!-- PAYMENT + ACTIONS -->
            <div class="grid gap-6 xl:grid-cols-5">
              <!-- PAYMENT PANEL -->
              <div class="rounded-[2rem] bg-white p-6 shadow-xl xl:col-span-2">
                <p class="text-xs uppercase tracking-[0.25em] text-[#0693E3]">
                  Payment
                </p>

                <h3 class="mt-1 text-2xl font-black">
                  Fare Summary
                </h3>

                <div class="mt-5 rounded-[1.5rem] bg-[#0693E3]/10 p-5 ring-1 ring-[#0693E3]/20">
                  <p class="text-xs uppercase tracking-[0.18em] text-[#0693E3]">
                    Total Amount
                  </p>

                  <p class="mt-2 text-4xl font-black text-[#0693E3]">
                    PKR {{ formatAmount(booking.amount) }}
                  </p>

                  <p class="mt-2 text-xs text-slate-500">
                    Final payable booking amount.
                  </p>
                </div>

                <div class="mt-4 rounded-2xl p-4" :class="paymentBoxClass">
                  <p class="text-xs opacity-70">Payment Status</p>
                  <p class="text-lg font-black capitalize">
                    {{ paymentLabel }}
                  </p>
                </div>
              </div>

              <!-- ACTION PANEL -->
              <div class="rounded-[2rem] bg-white p-4 shadow-xl xl:col-span-3">
                <div class="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p class="text-xs uppercase tracking-[0.25em] text-[#0693E3]">
                      Next Step
                    </p>

                    <h3 class="mt-1 text-2xl font-black">
                      Manage Your Ride
                    </h3>
                  </div>

                  <p class="max-w-sm text-sm text-slate-500">
                    Continue with payment, live tracking, or safety support.
                  </p>
                </div>

                <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
                  <NuxtLink
                    v-if="booking.payment_status !== 'paid'"
                    :to="paymentUrl"
                    class="group rounded-2xl bg-green-600 px-4 py-4 text-center font-black text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700"
                  >
                    Pay Now
                    <span class="inline-block transition group-hover:translate-x-1">→</span>
                  </NuxtLink>

                  <NuxtLink
                    :to="trackingUrl"
                    class="rounded-2xl bg-[#0693E3] px-4 py-4 text-center font-black text-white shadow-lg shadow-[#0693E3]/20 transition hover:-translate-y-0.5 hover:bg-[#057FCC]"
                  >
                    Track Ride
                  </NuxtLink>

                  <NuxtLink
                    :to="safetyUrl"
                    class="rounded-2xl bg-slate-950 px-4 py-4 text-center font-black text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-black"
                  >
                    Safety Center
                  </NuxtLink>
                </div>

                <div class="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <p class="text-sm font-bold text-blue-800">
                    RSL Safety Notice
                  </p>

                  <p class="mt-1 text-xs leading-5 text-blue-700">
                    Use Safety Center for complaints, emergency alerts, or driver-related safety support during the ride.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- NOT FOUND -->
      <div
        v-else
        class="rounded-[2rem] bg-white p-10 text-center shadow-2xl"
      >
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl font-black text-red-600">
          !
        </div>

        <h2 class="text-2xl font-black text-red-600">
          Booking not found
        </h2>

        <p class="mx-auto mt-2 max-w-md text-sm text-slate-500">
          We could not find this booking. Please check the booking ID and try again.
        </p>

        <NuxtLink
          to="/"
          class="mt-5 inline-block rounded-2xl bg-[#0693E3] px-6 py-3 font-bold text-white transition hover:bg-[#057FCC]"
        >
          Go Home
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const route = useRoute();
const { $useCustomFetch } = useNuxtApp();

const booking = ref(null);
const loading = ref(true);

const bookingId = route.query.id;

const passengerInitial = computed(() => {
  const name = booking.value?.name || 'P';
  return String(name).trim().charAt(0).toUpperCase() || 'P';
});

const paymentLabel = computed(() => {
  if (!booking.value) return 'Pending';

  const status = String(booking.value.payment_status || '').toLowerCase();

  if (status === 'paid') return 'Paid';
  if (status === 'failed') return 'Failed';

  return 'Pending';
});

const paymentBoxClass = computed(() => {
  if (!booking.value) return 'bg-orange-50 text-orange-700';

  const status = String(booking.value.payment_status || '').toLowerCase();

  if (status === 'paid') {
    return 'bg-green-50 text-green-700';
  }

  if (status === 'failed') {
    return 'bg-red-50 text-red-700';
  }

  return 'bg-orange-50 text-orange-700';
});

const paymentBadgeClass = computed(() => {
  if (!booking.value) return 'bg-orange-100 text-orange-700';

  const status = String(booking.value.payment_status || '').toLowerCase();

  if (status === 'paid') {
    return 'bg-green-100 text-green-700';
  }

  if (status === 'failed') {
    return 'bg-red-100 text-red-700';
  }

  return 'bg-orange-100 text-orange-700';
});

const heroBookingBadgeClass = computed(() => {
  const status = String(booking.value?.booking_status || '').toLowerCase();

  if (status === 'confirmed' || status === 'completed') {
    return 'bg-green-100 text-green-700';
  }

  if (status === 'cancelled' || status === 'failed') {
    return 'bg-red-100 text-red-700';
  }

  return 'bg-white/20 text-white';
});

const statusDotClass = computed(() => {
  const status = String(booking.value?.booking_status || '').toLowerCase();

  if (status === 'confirmed' || status === 'completed') {
    return 'bg-green-500';
  }

  if (status === 'cancelled' || status === 'failed') {
    return 'bg-red-500';
  }

  return 'bg-orange-400';
});

const paymentUrl = computed(() => {
  if (!booking.value) return '/payment';

  const params = new URLSearchParams({
    booking_id: booking.value.id || '',
    amount: booking.value.amount || '',
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

const trackingUrl = computed(() => {
  if (!booking.value) return '/tracking';

  return `/tracking?booking_id=${booking.value.id}`;
});

const safetyUrl = computed(() => {
  if (!booking.value) return '/safety';

  const params = new URLSearchParams({
    booking_id: booking.value.id || '',
    customer_id: booking.value.id || '',
    driver_id: booking.value.driver?.id || '',
    driver_phone: booking.value.driver?.contact || ''
  });

  return `/safety?${params.toString()}`;
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