<template>
  <div class="min-h-screen bg-slate-950 text-white">

    <!-- Full Screen Hero -->
    <div class="relative min-h-screen overflow-hidden px-4 pb-28">

      <!-- Background Glow -->
      <div class="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#0693E3]/30 blur-3xl"></div>
      <div class="absolute top-40 -left-32 h-80 w-80 rounded-full bg-red-600/20 blur-3xl"></div>

      <!-- Header -->
      <div class="relative z-10 pt-5">
        <div class="flex items-center justify-between">
          <NuxtLink
            :to="`/tracking?booking_id=${bookingId}`"
            class="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center text-xl"
          >
            ←
          </NuxtLink>

          <div class="text-center">
            <p class="text-xs uppercase tracking-[0.25em] text-blue-200">RSL Protection</p>
            <h1 class="text-2xl font-black">Safety Center</h1>
          </div>

          <button
            @click="shareTrackingLink"
            class="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold"
          >
            ↗
          </button>
        </div>

        <div class="mt-5 rounded-[2rem] bg-white/10 border border-white/10 p-5 backdrop-blur-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-slate-300">Booking ID</p>
              <p class="text-2xl font-black">#{{ bookingId || 'N/A' }}</p>
            </div>

            <div class="rounded-full bg-green-500/20 px-4 py-2 text-green-300 text-xs font-black">
              Live Protected
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3 mt-5 text-center text-xs">
            <div class="rounded-2xl bg-white/10 p-3">
              <p class="font-black text-green-300">Active</p>
              <p class="text-slate-400 mt-1">GPS</p>
            </div>

            <div class="rounded-2xl bg-white/10 p-3">
              <p class="font-black text-green-300">Online</p>
              <p class="text-slate-400 mt-1">Admin</p>
            </div>

            <div class="rounded-2xl bg-white/10 p-3">
              <p class="font-black text-green-300">Yes</p>
              <p class="text-slate-400 mt-1">Car Location</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Driver Detail Card -->
      <div class="relative z-10 mt-5 rounded-[2rem] bg-white text-slate-900 p-5 shadow-2xl">
        <div class="flex items-start gap-4">
          <div class="h-16 w-16 rounded-2xl bg-[#0693E3] text-white flex items-center justify-center text-2xl font-black overflow-hidden">
            <img v-if="driverImage" :src="driverImage" class="h-full w-full object-cover" />
            <span v-else>{{ driverName ? driverName[0] : '?' }}</span>
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-xl font-black">{{ driverName || 'Driver Details Loading...' }}</h2>
              <span
                v-if="driverVerified == 1"
                class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-black"
              >
                Verified
              </span>
            </div>

            <p class="text-sm text-slate-500 mt-1">{{ driverContact || driverPhone || 'Contact not available' }}</p>

            <div class="flex items-center gap-2 text-xs text-slate-500 mt-2">
              <span>⭐ {{ driverRating || '5.0' }}</span>
              <span>•</span>
              <span>{{ driverTotalRides || 0 }} rides</span>
              <span>•</span>
              <span>{{ driverExperience || 0 }} yrs exp</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-5">
          <a
            :href="`tel:${driverContact || driverPhone}`"
            class="bg-green-600 text-white py-3 rounded-2xl text-center font-black"
          >
            Call Driver
          </a>

          <a
            :href="`https://wa.me/${driverContact || driverPhone}`"
            target="_blank"
            class="bg-slate-900 text-white py-3 rounded-2xl text-center font-black"
          >
            WhatsApp
          </a>
        </div>

        <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div class="bg-slate-100 rounded-2xl p-3">
            <p class="text-slate-400 text-xs">Email</p>
            <p class="font-bold break-all">{{ driverEmail || 'N/A' }}</p>
          </div>

          <div class="bg-slate-100 rounded-2xl p-3">
            <p class="text-slate-400 text-xs">License No</p>
            <p class="font-bold">{{ driverLicense || 'N/A' }}</p>
          </div>

          <div class="bg-slate-100 rounded-2xl p-3">
            <p class="text-slate-400 text-xs">CNIC</p>
            <p class="font-bold">{{ driverCnic || 'N/A' }}</p>
          </div>

          <div class="bg-slate-100 rounded-2xl p-3">
            <p class="text-slate-400 text-xs">Emergency Contact</p>
            <p class="font-bold">{{ driverEmergencyContact || 'N/A' }}</p>
          </div>

          <div class="bg-slate-100 rounded-2xl p-3 md:col-span-2">
            <p class="text-slate-400 text-xs">Address</p>
            <p class="font-bold">{{ driverAddress || driverCurrentAddress || 'N/A' }}</p>
          </div>
        </div>
      </div>

      <!-- SOS Big Center -->
      <div class="relative z-10 mt-7 rounded-[2.5rem] bg-white/10 border border-white/10 backdrop-blur-xl p-7 text-center">
        <div class="relative mx-auto h-56 w-56 flex items-center justify-center">
          <div class="absolute inset-0 rounded-full bg-red-500/20 animate-ping"></div>
          <div class="absolute inset-8 rounded-full bg-red-500/20"></div>

          <button
            @click="triggerSOS"
            :disabled="sosLoader"
            class="relative h-40 w-40 rounded-full bg-gradient-to-br from-red-500 to-red-800 border-[10px] border-red-300/30 shadow-2xl flex flex-col items-center justify-center active:scale-95 transition-all disabled:opacity-70"
          >
            <span v-if="!sosLoader" class="text-5xl font-black">SOS</span>
            <span
              v-else
              class="animate-spin border-4 border-white border-t-transparent rounded-full w-11 h-11"
            ></span>
            <span v-if="!sosLoader" class="text-xs font-black mt-1">Emergency</span>
          </button>
        </div>

        <h3 class="text-2xl font-black mt-3">Emergency Help</h3>
        <p class="text-sm text-slate-300 mt-2">
          Admin will receive passenger location, latest car location, driver details, and booking ID.
        </p>
      </div>

      <!-- Action Cards -->
      <div class="relative z-10 mt-5 grid grid-cols-2 gap-3">
        <button
          @click="showMisbehaviourModal = true"
          class="rounded-[1.5rem] bg-purple-600 p-5 text-left shadow-xl"
        >
          <p class="text-xs text-purple-100">Passenger Safety</p>
          <h3 class="font-black text-lg mt-1">Misbehaviour</h3>
          <p class="text-xs text-purple-100 mt-2">Report driver issue</p>
        </button>

        <button
          @click="reportBreakdown"
          :disabled="breakdownLoader"
          class="rounded-[1.5rem] bg-amber-500 p-5 text-left shadow-xl disabled:opacity-70"
        >
          <p class="text-xs text-amber-100">Vehicle Issue</p>
          <h3 class="font-black text-lg mt-1">
            <span v-if="!breakdownLoader">Breakdown</span>
            <span
              v-else
              class="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6 inline-block"
            ></span>
          </h3>
          <p class="text-xs text-amber-100 mt-2">Send alert to admin</p>
        </button>

        <button
          @click="startFakeCall"
          class="rounded-[1.5rem] bg-white/10 border border-white/10 p-5 text-left"
        >
          <p class="text-xs text-slate-400">Safety Trick</p>
          <h3 class="font-black text-lg mt-1">Fake Call</h3>
          <p class="text-xs text-slate-400 mt-2">Exit unsafe situation</p>
        </button>

        <a
          href="tel:+923001234567"
          class="rounded-[1.5rem] bg-white/10 border border-white/10 p-5 text-left"
        >
          <p class="text-xs text-slate-400">Support</p>
          <h3 class="font-black text-lg mt-1">Call Office</h3>
          <p class="text-xs text-slate-400 mt-2">24/7 available</p>
        </a>
      </div>

      <!-- Ride Info -->
      <div class="relative z-10 mt-5 rounded-[2rem] bg-white/10 border border-white/10 p-5">
        <h3 class="font-black text-lg mb-4">Ride Safety Info</h3>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between gap-4">
            <span class="text-slate-400">Pickup</span>
            <span class="font-bold text-right">{{ fromLocation || 'Loading...' }}</span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="text-slate-400">Drop</span>
            <span class="font-bold text-right">{{ toLocation || 'N/A' }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-slate-400">Booking Status</span>
            <span class="font-bold">{{ bookingStatus || 'N/A' }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-slate-400">Payment Status</span>
            <span class="font-bold">{{ paymentStatus || 'N/A' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky Bottom -->
    <div class="fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4">
      <div class="max-w-2xl mx-auto grid grid-cols-2 gap-3">
        <NuxtLink
          :to="`/tracking?booking_id=${bookingId}`"
          class="bg-[#0693E3] text-white text-center py-4 rounded-2xl font-black"
        >
          Track Ride
        </NuxtLink>

        <button
          @click="shareTrackingLink"
          class="bg-white text-slate-900 text-center py-4 rounded-2xl font-black"
        >
          Share Link
        </button>
      </div>
    </div>

    <!-- Center Misbehaviour Modal -->
    <transition name="fade">
      <div
        v-if="showMisbehaviourModal"
        class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
      >
        <div class="relative bg-white text-slate-900 rounded-[2rem] w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">

          <button
            @click="closeMisbehaviourModal"
            class="absolute top-4 right-4 h-10 w-10 rounded-full bg-slate-100 text-slate-700 font-black"
          >
            ✕
          </button>

          <div class="pr-10">
            <p class="text-xs uppercase tracking-[0.25em] text-purple-600 font-black">
              Urgent Safety Report
            </p>

            <h3 class="text-2xl font-black mt-2">
              Report Driver Misbehaviour
            </h3>

            <p class="text-sm text-slate-500 mt-2">
              Select a reason. Admin will receive passenger location, latest car location, booking ID, and driver details.
            </p>
          </div>

          <div class="mt-6 space-y-3">
            <button
              v-for="reason in misbehaviourReasons"
              :key="reason"
              @click="selectedReason = reason"
              class="w-full rounded-2xl border p-4 text-left font-bold transition-all"
              :class="selectedReason === reason ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-700'"
            >
              {{ reason }}
            </button>

            <textarea
              v-model="customReason"
              placeholder="Write additional details for admin..."
              class="w-full border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-purple-600"
              rows="4"
            ></textarea>
          </div>

          <div class="mt-5 rounded-2xl bg-slate-100 p-4 text-sm">
            <p class="font-black">Driver attached to report:</p>
            <p class="text-slate-600 mt-1">
              {{ driverName || 'Driver' }} — {{ driverContact || driverPhone || 'No contact' }}
            </p>
          </div>

          <button
            @click="reportMisbehaviour"
            :disabled="misbehaviourLoader || !selectedReason"
            class="w-full bg-purple-600 text-white py-4 rounded-2xl font-black mt-5 disabled:opacity-50"
          >
            <span v-if="!misbehaviourLoader">Submit Urgent Report</span>
            <span
              v-else
              class="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6 inline-block"
            ></span>
          </button>
        </div>
      </div>
    </transition>

    <!-- Fake Call Screen -->
    <transition name="fade">
      <div
        v-if="fakeCallActive"
        class="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center text-white"
      >
        <div class="w-28 h-28 rounded-full bg-[#0693E3] flex items-center justify-center text-4xl font-black mb-6 animate-pulse">
          RSL
        </div>

        <p class="text-3xl font-black">Incoming Call...</p>
        <p class="text-slate-400 mt-2">RSL Safety Support</p>

        <div class="flex gap-10 mt-16">
          <button
            @click="fakeCallActive = false"
            class="bg-red-600 rounded-full w-20 h-20 text-3xl"
          >
            ✕
          </button>

          <button
            @click="fakeCallActive = false"
            class="bg-green-600 rounded-full w-20 h-20 text-3xl"
          >
            ✓
          </button>
        </div>
      </div>
    </transition>

    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="toast.show"
        :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-700'"
        class="fixed bottom-24 left-4 right-4 max-w-xl mx-auto text-white text-center py-4 rounded-2xl shadow-2xl z-50 font-bold"
      >
        {{ toast.message }}
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

const route = useRoute();
const { $useCustomFetch } = useNuxtApp();

const bookingId = route.query.booking_id || null;
const customerId = route.query.customer_id || null;

const driverId = ref(route.query.driver_id || '');
const driverPhone = ref(route.query.driver_phone || '');

const driverName = ref('');
const driverContact = ref('');
const driverEmail = ref('');
const driverImage = ref('');
const driverLicense = ref('');
const driverCnic = ref('');
const driverAddress = ref('');
const driverRating = ref('');
const driverTotalRides = ref('');
const driverExperience = ref('');
const driverEmergencyContact = ref('');
const driverVerified = ref('');
const driverCurrentAddress = ref('');

const fromLocation = ref('');
const toLocation = ref('');
const bookingStatus = ref('');
const paymentStatus = ref('');

const sosLoader = ref(false);
const breakdownLoader = ref(false);
const misbehaviourLoader = ref(false);
const fakeCallActive = ref(false);
const showMisbehaviourModal = ref(false);

const selectedReason = ref('');
const customReason = ref('');

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
});

const misbehaviourReasons = [
  'Driver rude behavior',
  'Harassment or inappropriate behavior',
  'Unsafe driving',
  'Wrong route / suspicious route',
  'Passenger feels unsafe',
  'Other'
];

const trackingUrl = computed(() => {
  if (!process.client) return '';
  return `${window.location.origin}/tracking?booking_id=${bookingId}`;
});

function showToast(message, type = 'success') {
  toast.message = message;
  toast.type = type;
  toast.show = true;

  setTimeout(() => {
    toast.show = false;
  }, 4000);
}

function closeMisbehaviourModal() {
  showMisbehaviourModal.value = false;
  selectedReason.value = '';
  customReason.value = '';
}

function getLocation() {
  return new Promise((resolve) => {
    if (!process.client || !navigator.geolocation) {
      resolve({ lat: null, lng: null });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => {
        resolve({ lat: null, lng: null });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

async function fetchBookingDetails() {
  if (!bookingId) return;

  try {
    const res = await $useCustomFetch(`/api/site/v1/booking/status/${bookingId}`);

    if (res.success && res.data) {
      fromLocation.value = res.data.from_location || '';
      toLocation.value = res.data.to_location || '';
      bookingStatus.value = res.data.booking_status || '';
      paymentStatus.value = res.data.payment_status || '';

      if (res.data.driver) {
        driverId.value = res.data.driver.id || driverId.value;
        driverName.value = res.data.driver.name || '';
        driverContact.value = res.data.driver.contact || driverPhone.value;
        driverPhone.value = res.data.driver.contact || driverPhone.value;
        driverEmail.value = res.data.driver.email || '';
        driverImage.value = res.data.driver.image || '';
        driverLicense.value = res.data.driver.license_no || '';
        driverCnic.value = res.data.driver.id_card_no || '';
        driverAddress.value = res.data.driver.address || '';
        driverRating.value = res.data.driver.rating || '';
        driverTotalRides.value = res.data.driver.total_rides || '';
        driverExperience.value = res.data.driver.experience_years || '';
        driverEmergencyContact.value = res.data.driver.emergency_contact || '';
        driverVerified.value = res.data.driver.verified_status || '';
        driverCurrentAddress.value = res.data.driver.current_address || '';
      }
    }
  } catch (error) {
    console.log('Safety booking fetch error:', error);
  }
}

async function triggerSOS() {
  sosLoader.value = true;
  const { lat, lng } = await getLocation();

  try {
    const res = await $useCustomFetch('/api/site/v1/safety/sos', {
      method: 'POST',
      body: {
        booking_id: bookingId,
        customer_id: customerId || bookingId,
        driver_id: driverId.value,
        driver_phone: driverPhone.value,
        latitude: lat,
        longitude: lng
      }
    });

    if (res.success) {
      showToast('SOS sent. Admin received your location and car location.', 'success');
    } else {
      showToast('Failed to send SOS.', 'error');
    }
  } catch {
    showToast('Error. Call office directly.', 'error');
  }

  sosLoader.value = false;
}

async function reportBreakdown() {
  breakdownLoader.value = true;
  const { lat, lng } = await getLocation();

  try {
    const res = await $useCustomFetch('/api/site/v1/safety/breakdown', {
      method: 'POST',
      body: {
        booking_id: bookingId,
        customer_id: customerId || bookingId,
        driver_id: driverId.value,
        driver_phone: driverPhone.value,
        latitude: lat,
        longitude: lng
      }
    });

    if (res.success) {
      showToast('Breakdown reported to admin.', 'success');
    } else {
      showToast('Failed to report breakdown.', 'error');
    }
  } catch {
    showToast('Error. Call office directly.', 'error');
  }

  breakdownLoader.value = false;
}

async function reportMisbehaviour() {
  if (!selectedReason.value) {
    showToast('Please select a reason.', 'error');
    return;
  }

  misbehaviourLoader.value = true;
  const { lat, lng } = await getLocation();

  const finalReason = customReason.value
    ? `${selectedReason.value} — ${customReason.value}`
    : selectedReason.value;

  try {
    const res = await $useCustomFetch('/api/site/v1/safety/misbehaviour', {
      method: 'POST',
      body: {
        booking_id: bookingId,
        customer_id: customerId || bookingId,
        driver_id: driverId.value,
        driver_phone: driverPhone.value,
        latitude: lat,
        longitude: lng,
        reason: finalReason
      }
    });

    if (res.success) {
      closeMisbehaviourModal();
      showToast('Urgent safety report sent to admin.', 'success');
    } else {
      showToast(res.message || 'Failed to send report.', 'error');
    }
  } catch {
    showToast('Error. Call RSL office immediately.', 'error');
  }

  misbehaviourLoader.value = false;
}

function startFakeCall() {
  fakeCallActive.value = true;

  setTimeout(() => {
    fakeCallActive.value = false;
  }, 30000);
}

async function shareTrackingLink() {
  const text = `Track my RSL ride live: ${trackingUrl.value}`;

  if (navigator.share) {
    await navigator.share({
      title: 'Track My RSL Ride',
      text,
      url: trackingUrl.value
    });
  } else {
    await navigator.clipboard.writeText(trackingUrl.value);
    showToast('Tracking link copied.', 'success');
  }
}

onMounted(() => {
  fetchBookingDetails();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>