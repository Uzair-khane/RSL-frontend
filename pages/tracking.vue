<template>
  <div class="min-h-screen bg-gray-50">

    <div class="bg-[#0693E3] text-white px-4 py-4 flex items-center justify-between">
      <div>
        <h1 class="font-bold text-lg">Live Ride Tracking</h1>
        <p class="text-xs opacity-80">Booking #{{ bookingId }}</p>
      </div>

      <div class="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
        <span class="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
        <span class="text-xs font-semibold">LIVE</span>
      </div>
    </div>

    <div class="relative">
      <GoogleMap
        :api-key="googleMapKey"
        :center="mapCenter"
        :zoom="15"
        class="w-full"
        style="height: 60vh;"
      >
        <Marker
          v-if="hasValidDriverLocation"
          :key="`${driverLocation.lat}-${driverLocation.lng}`"
          :options="{
            position: driverLocation,
            title: 'Driver Current Location'
          }"
        />
      </GoogleMap>

      <button
        @click="showShareModal = true"
        class="absolute top-4 right-4 bg-white shadow-lg rounded-full px-4 py-2 text-sm font-semibold text-gray-700"
      >
        Share
      </button>

      <NuxtLink
        :to="safetyUrl"
        class="absolute bottom-16 right-4 bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl border-4 border-red-300 z-10 font-bold"
      >
        SOS
      </NuxtLink>

      <div
        v-if="lastUpdate"
        class="absolute bottom-4 left-4 bg-white shadow-lg rounded-full px-3 py-1 text-xs text-gray-500"
      >
        Updated: {{ lastUpdate }}
      </div>
    </div>

    <div class="bg-white rounded-t-3xl -mt-4 relative z-10 px-4 pt-6 pb-8 shadow-lg">

      <!-- Driver Main Card -->
      <div class="bg-gray-50 rounded-2xl p-4 mb-4">
        <div class="flex items-center gap-4">
          <div class="bg-[#0693E3] rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
            <img v-if="driverImage" :src="driverImage" class="w-full h-full object-cover" />
            <span v-else>{{ driverName ? driverName[0] : '?' }}</span>
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2">
              <p class="font-bold text-xl">{{ driverName || 'Assigning Driver...' }}</p>
              <span
                v-if="driverVerified == 1"
                class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold"
              >
                Verified
              </span>
            </div>

            <p class="text-gray-500 text-sm">{{ driverContact || 'Please wait' }}</p>

            <div class="flex items-center gap-2 mt-1 text-xs text-gray-500">
              <span>⭐ {{ driverRating || '5.0' }}</span>
              <span>•</span>
              <span>{{ driverTotalRides || 0 }} rides</span>
              <span>•</span>
              <span>{{ driverExperience || 0 }} yrs exp</span>
            </div>
          </div>

          <div v-if="driverContact" class="flex flex-col gap-2">
            <a :href="`tel:${driverContact}`" class="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold text-center">
              Call
            </a>
            <a :href="`sms:${driverContact}`" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold text-center">
              SMS
            </a>
          </div>
        </div>
      </div>

      <!-- Driver Full Details -->
      <div v-if="driverName" class="bg-white border border-gray-200 rounded-2xl p-4 mb-4 text-sm">
        <h3 class="font-bold text-lg mb-3 text-gray-800">Driver Full Details</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-gray-400 text-xs">Name</p>
            <p class="font-semibold">{{ driverName }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-gray-400 text-xs">Contact</p>
            <p class="font-semibold">{{ driverContact || 'N/A' }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-gray-400 text-xs">Email</p>
            <p class="font-semibold break-all">{{ driverEmail || 'N/A' }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-gray-400 text-xs">Rating</p>
            <p class="font-semibold">⭐ {{ driverRating || '5.0' }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-gray-400 text-xs">Total Rides</p>
            <p class="font-semibold">{{ driverTotalRides || 0 }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-gray-400 text-xs">Experience</p>
            <p class="font-semibold">{{ driverExperience || 0 }} years</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-gray-400 text-xs">License No</p>
            <p class="font-semibold">{{ driverLicense || 'N/A' }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-gray-400 text-xs">CNIC</p>
            <p class="font-semibold">{{ driverCnic || 'N/A' }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-gray-400 text-xs">Passport No</p>
            <p class="font-semibold">{{ driverPassport || 'N/A' }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-gray-400 text-xs">Emergency Contact</p>
            <p class="font-semibold">{{ driverEmergencyContact || 'N/A' }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-gray-400 text-xs">Driver Status</p>
            <p class="font-semibold">{{ driverStatus == 1 ? 'Active' : 'Inactive' }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-gray-400 text-xs">Verification</p>
            <p class="font-semibold">{{ driverVerified == 1 ? 'Verified' : 'Not Verified' }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3 md:col-span-2">
            <p class="text-gray-400 text-xs">Address</p>
            <p class="font-semibold">{{ driverAddress || 'N/A' }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3 md:col-span-2">
            <p class="text-gray-400 text-xs">Current Address</p>
            <p class="font-semibold">{{ driverCurrentAddress || 'N/A' }}</p>
          </div>
        </div>
      </div>

      <!-- Ride Details -->
      <div class="bg-gray-50 rounded-2xl p-4 mb-4">
        <h3 class="font-bold mb-3">Ride Details</h3>

        <div class="space-y-3 text-sm">
          <div>
            <p class="text-gray-400 text-xs">Pickup</p>
            <p class="font-semibold">{{ fromLocation || 'Loading pickup...' }}</p>
          </div>

          <div>
            <p class="text-gray-400 text-xs">Drop</p>
            <p class="font-semibold">{{ toLocation || 'Hourly Ride / Not available' }}</p>
          </div>
        </div>
      </div>

      <!-- Location Info -->
      <div v-if="hasValidDriverLocation" class="bg-blue-50 rounded-2xl p-4 mb-4 text-sm">
        <p class="font-semibold text-[#0693E3] mb-1">Driver Current Location</p>
        <p class="text-gray-600">
          Lat: {{ driverLocation.lat.toFixed(6) }},
          Lng: {{ driverLocation.lng.toFixed(6) }}
        </p>
      </div>

      <div v-else class="bg-yellow-50 rounded-2xl p-4 mb-4 text-sm text-yellow-700">
        Waiting for driver to start sharing location...
      </div>

      <!-- Safety Buttons -->
      <div class="grid grid-cols-2 gap-3 mt-2">
        <NuxtLink
          :to="safetyUrl"
          class="flex flex-col items-center justify-center gap-1 bg-red-600 text-white py-4 rounded-2xl shadow-lg"
        >
          <span class="font-bold text-sm">SOS Emergency</span>
          <span class="text-xs opacity-80">Press for help</span>
        </NuxtLink>

        <NuxtLink
          :to="safetyUrl"
          class="flex flex-col items-center justify-center gap-1 bg-orange-500 text-white py-4 rounded-2xl shadow-lg"
        >
          <span class="font-bold text-sm">Safety Center</span>
          <span class="text-xs opacity-80">Breakdown & more</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Share Modal -->
    <div v-if="showShareModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div class="bg-white rounded-3xl w-full max-w-lg p-6">
        <h3 class="font-bold text-xl mb-2">Share Live Location</h3>
        <p class="text-gray-500 text-sm mb-4">
          Share this link with family or friends to track the ride live.
        </p>

        <div class="bg-gray-100 rounded-xl p-3 flex items-center gap-2 mb-4">
          <p class="text-sm text-gray-600 flex-1 truncate">{{ shareUrl }}</p>
          <button @click="copyLink" class="bg-[#0693E3] text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
            {{ copied ? 'Copied' : 'Copy' }}
          </button>
        </div>

        <div class="grid grid-cols-3 gap-3 mb-4">
          <a :href="whatsappShareUrl" target="_blank" class="bg-green-50 rounded-xl p-3 text-center text-xs font-semibold text-green-700">
            WhatsApp
          </a>

          <a :href="smsShareUrl" class="bg-blue-50 rounded-xl p-3 text-center text-xs font-semibold text-blue-700">
            SMS
          </a>

          <a :href="emailShareUrl" class="bg-gray-50 rounded-xl p-3 text-center text-xs font-semibold text-gray-700">
            Email
          </a>
        </div>

        <button @click="showShareModal = false" class="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold">
          Close
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';

const route = useRoute();
const config = useRuntimeConfig();
const { $useCustomFetch } = useNuxtApp();

const bookingId = ref(route.query.booking_id || '');

const fromLocation = ref('');
const toLocation = ref('');
const customerId = ref('');

const driverId = ref('');
const driverName = ref('');
const driverContact = ref('');
const driverEmail = ref('');
const driverImage = ref('');
const driverLicense = ref('');
const driverCnic = ref('');
const driverPassport = ref('');
const driverAddress = ref('');
const driverStatus = ref('');
const driverRating = ref('');
const driverTotalRides = ref('');
const driverExperience = ref('');
const driverEmergencyContact = ref('');
const driverVerified = ref('');
const driverCurrentAddress = ref('');

const googleMapKey = config.public.gmapKey;

const mapCenter = ref({
  lat: 34.0012,
  lng: 71.5249
});

const driverLocation = ref(null);
const lastUpdate = ref('');
const showShareModal = ref(false);
const copied = ref(false);

let trackingInterval = null;

const hasValidDriverLocation = computed(() => {
  return (
    driverLocation.value &&
    typeof driverLocation.value.lat === 'number' &&
    typeof driverLocation.value.lng === 'number' &&
    !Number.isNaN(driverLocation.value.lat) &&
    !Number.isNaN(driverLocation.value.lng)
  );
});

const shareUrl = computed(() => {
  if (!process.client) return '';
  return `${window.location.origin}/tracking?booking_id=${bookingId.value}`;
});

const safetyUrl = computed(() => {
  return `/safety?booking_id=${bookingId.value}&customer_id=${customerId.value}&driver_id=${driverId.value}&driver_phone=${driverContact.value}`;
});

const whatsappShareUrl = computed(() => {
  return `https://wa.me/?text=${encodeURIComponent('Track my RSL ride live: ' + shareUrl.value)}`;
});

const smsShareUrl = computed(() => {
  return `sms:?body=${encodeURIComponent('Track my RSL ride live: ' + shareUrl.value)}`;
});

const emailShareUrl = computed(() => {
  return `mailto:?subject=Track My RSL Ride&body=${encodeURIComponent('Track my RSL ride live: ' + shareUrl.value)}`;
});

function formatTime(date) {
  return new Date(date).toLocaleTimeString();
}

function copyLink() {
  navigator.clipboard.writeText(shareUrl.value);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

async function fetchBookingStatus() {
  if (!bookingId.value) return;

  try {
    const res = await $useCustomFetch(`/api/site/v1/booking/status/${bookingId.value}`);

    console.log('Booking Status Response:', res);

    if (res.success && res.data) {
      fromLocation.value = res.data.from_location || '';
      toLocation.value = res.data.to_location || '';
      customerId.value = res.data.id || '';

      if (res.data.driver) {
        driverId.value = res.data.driver.id || '';
        driverName.value = res.data.driver.name || '';
        driverContact.value = res.data.driver.contact || '';
        driverEmail.value = res.data.driver.email || '';
        driverImage.value = res.data.driver.image || '';
        driverLicense.value = res.data.driver.license_no || '';
        driverCnic.value = res.data.driver.id_card_no || '';
        driverPassport.value = res.data.driver.passport_no || '';
        driverAddress.value = res.data.driver.address || '';
        driverStatus.value = res.data.driver.driver_status || '';
        driverRating.value = res.data.driver.rating || '';
        driverTotalRides.value = res.data.driver.total_rides || '';
        driverExperience.value = res.data.driver.experience_years || '';
        driverEmergencyContact.value = res.data.driver.emergency_contact || '';
        driverVerified.value = res.data.driver.verified_status || '';
        driverCurrentAddress.value = res.data.driver.current_address || '';
      }
    }
  } catch (error) {
    console.log('Booking Status Error:', error);
  }
}

async function fetchLatestLocation() {
  if (!bookingId.value) return;

  try {
    const res = await $useCustomFetch(`/api/site/v1/tracking/location/${bookingId.value}`);

    console.log('Location API Response:', res);

    if (res.success && res.data) {
      const lat = Number(res.data.latitude);
      const lng = Number(res.data.longitude);

      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        driverLocation.value = { lat, lng };
        mapCenter.value = { lat, lng };
        lastUpdate.value = formatTime(new Date());
      }
    }
  } catch (error) {
    console.log('Location Error:', error);
  }
}

onMounted(async () => {
  await fetchBookingStatus();
  await fetchLatestLocation();

  trackingInterval = setInterval(async () => {
    await fetchLatestLocation();
    await fetchBookingStatus();
  }, 3000);
});

onBeforeUnmount(() => {
  if (trackingInterval) clearInterval(trackingInterval);
});
</script>