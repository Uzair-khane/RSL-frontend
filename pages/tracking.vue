<template>
  <div class="min-h-screen bg-gray-50">

    <div class="bg-[#0693E3] text-white px-4 py-4 flex items-center justify-between">
      <div>
        <h1 class="font-bold text-lg">Live Ride Tracking</h1>
        <p class="text-xs opacity-80">Booking #{{ bookingId }}</p>
      </div>

      <div class="flex items-center gap-2">
        <div
          class="flex items-center gap-1 px-3 py-1 rounded-full"
          :class="isOnline ? 'bg-white/20' : 'bg-red-500'"
        >
          <span
            class="w-2 h-2 rounded-full"
            :class="isOnline ? 'bg-green-400 animate-ping' : 'bg-white'"
          ></span>
          <span class="text-xs font-semibold">
            {{ isOnline ? 'LIVE' : 'OFFLINE' }}
          </span>
        </div>

        <div
          v-if="offlineCount > 0"
          class="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full"
        >
          {{ offlineCount }} saved
        </div>
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
          :key="markerKey"
          :options="markerOptions"
        />
      </GoogleMap>

      <button
        @click="showShareModal = true"
        class="absolute top-4 right-4 bg-white shadow-lg rounded-full px-4 py-2 text-sm font-semibold text-gray-700"
      >
        Share
      </button>

      <button
        @click="saveTestOfflineLocation"
        class="absolute top-16 right-4 bg-orange-600 text-white shadow-lg rounded-full px-4 py-2 text-xs font-semibold"
      >
        Test Offline Save
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

      <div
        v-if="!isOnline"
        class="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 text-sm text-red-700"
      >
        Offline mode active. GPS locations will be saved on this device and synced when internet returns.
      </div>

      <div
        v-if="offlineCount > 0"
        class="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4 text-sm text-yellow-800"
      >
        {{ offlineCount }} offline GPS point(s) saved. They will auto-sync when internet returns.

        <button
          v-if="isOnline"
          @click="syncOfflineLocations"
          class="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-xl text-xs font-semibold"
        >
          Sync Now
        </button>
      </div>

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
const driverImage = ref('');
const driverRating = ref('');
const driverTotalRides = ref('');
const driverExperience = ref('');
const driverVerified = ref('');

const googleMapKey = config.public.gmapKey;

const mapCenter = ref({
  lat: 34.0012,
  lng: 71.5249
});

const driverLocation = ref(null);
const lastUpdate = ref('');
const showShareModal = ref(false);

const isOnline = ref(true);
const offlineCount = ref(0);

let trackingInterval = null;
let offlineGpsInterval = null;

const OFFLINE_STORAGE_KEY = 'rsl_offline_locations';

const hasValidDriverLocation = computed(() => {
  return (
    driverLocation.value &&
    typeof driverLocation.value.lat === 'number' &&
    typeof driverLocation.value.lng === 'number' &&
    !Number.isNaN(driverLocation.value.lat) &&
    !Number.isNaN(driverLocation.value.lng)
  );
});

const markerKey = computed(() => {
  if (!hasValidDriverLocation.value) return 'no-marker';
  return `${driverLocation.value.lat}-${driverLocation.value.lng}`;
});

const markerOptions = computed(() => {
  if (!hasValidDriverLocation.value) return {};

  return {
    position: {
      lat: driverLocation.value.lat,
      lng: driverLocation.value.lng
    },
    title: 'Driver Current Location'
  };
});

const safetyUrl = computed(() => {
  return `/safety?booking_id=${bookingId.value}&customer_id=${customerId.value}&driver_id=${driverId.value}&driver_phone=${driverContact.value}`;
});

function formatTime(date) {
  return new Date(date).toLocaleTimeString();
}

function getOfflineLocations() {
  if (process.server) return [];

  try {
    return JSON.parse(localStorage.getItem(OFFLINE_STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveOfflineLocations(locations) {
  if (process.server) return;

  localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(locations));
  offlineCount.value = locations.length;
}

function clearOfflineLocations() {
  if (process.server) return;

  localStorage.removeItem(OFFLINE_STORAGE_KEY);
  offlineCount.value = 0;
}

function saveCurrentLocationOffline(position) {
  if (!bookingId.value) {
    console.log('Offline GPS not saved: booking_id missing');
    return;
  }

  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  const locations = getOfflineLocations();

  locations.push({
    driver_id: driverId.value || 1,
    booking_id: bookingId.value,
    latitude: lat,
    longitude: lng,
    accuracy: position.coords.accuracy || null,
    recorded_at: new Date().toISOString()
  });

  saveOfflineLocations(locations);

  driverLocation.value = { lat, lng };
  mapCenter.value = { lat, lng };
  lastUpdate.value = `${formatTime(new Date())} (offline saved)`;

  console.log('Offline location saved:', {
    booking_id: bookingId.value,
    driver_id: driverId.value || 1,
    latitude: lat,
    longitude: lng
  });
}

function saveTestOfflineLocation() {
  if (!bookingId.value) {
    alert('booking_id missing in URL');
    return;
  }

  const lat = driverLocation.value?.lat || mapCenter.value.lat;
  const lng = driverLocation.value?.lng || mapCenter.value.lng;

  const locations = getOfflineLocations();

  locations.push({
    driver_id: driverId.value || 1,
    booking_id: bookingId.value,
    latitude: lat,
    longitude: lng,
    accuracy: 10,
    recorded_at: new Date().toISOString()
  });

  saveOfflineLocations(locations);

  lastUpdate.value = `${formatTime(new Date())} (test offline saved)`;

  console.log('Test offline location saved');
}

function startOfflineGpsTracking() {
  if (offlineGpsInterval) return;

  if (!navigator.geolocation) {
    console.log('Geolocation not supported.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      saveCurrentLocationOffline(position);
    },
    (error) => {
      console.log('Initial Offline GPS Error:', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );

  offlineGpsInterval = setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        saveCurrentLocationOffline(position);
      },
      (error) => {
        console.log('Offline GPS Error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, 120000);
}

function stopOfflineGpsTracking() {
  if (offlineGpsInterval) {
    clearInterval(offlineGpsInterval);
    offlineGpsInterval = null;
  }
}

async function syncOfflineLocations() {
  const locations = getOfflineLocations();

  if (!locations.length) {
    console.log('No offline locations to sync');
    return;
  }

  try {
    const res = await $useCustomFetch('/api/site/v1/tracking/offline-sync', {
      method: 'POST',
      body: {
        locations
      }
    });

    if (res.success) {
      console.log('Offline locations synced:', res);
      clearOfflineLocations();
      await fetchLatestLocation();
    } else {
      console.log('Offline sync failed:', res.message);
    }
  } catch (error) {
    console.log('Offline Sync Error:', error);
  }
}

function handleOnline() {
  isOnline.value = true;
  stopOfflineGpsTracking();
  syncOfflineLocations();
}

function handleOffline() {
  isOnline.value = false;
  startOfflineGpsTracking();
}

async function fetchBookingStatus() {
  if (!bookingId.value) return;

  try {
    const res = await $useCustomFetch(`/api/site/v1/booking/status/${bookingId.value}`);

    if (res.success && res.data) {
      fromLocation.value = res.data.from_location || '';
      toLocation.value = res.data.to_location || '';
      customerId.value = res.data.id || '';

      if (res.data.driver) {
        driverId.value = res.data.driver.id || '';
        driverName.value = res.data.driver.name || '';
        driverContact.value = res.data.driver.contact || '';
        driverImage.value = res.data.driver.image || '';
        driverRating.value = res.data.driver.rating || '';
        driverTotalRides.value = res.data.driver.total_rides || '';
        driverExperience.value = res.data.driver.experience_years || '';
        driverVerified.value = res.data.driver.verified_status || '';
      }
    }
  } catch (error) {
    console.log('Booking Status Error:', error);
  }
}

async function fetchLatestLocation() {
  if (!bookingId.value) return;

  if (!navigator.onLine) {
    handleOffline();
    return;
  }

  try {
    const res = await $useCustomFetch(`/api/site/v1/tracking/location/${bookingId.value}`);

    console.log('Location API Response:', res);

    if (res.success && res.data) {
      const lat = parseFloat(res.data.latitude);
      const lng = parseFloat(res.data.longitude);

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
  isOnline.value = navigator.onLine;
  offlineCount.value = getOfflineLocations().length;

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  await fetchBookingStatus();

  if (navigator.onLine) {
    await syncOfflineLocations();
    await fetchLatestLocation();
  } else {
    handleOffline();
  }

  trackingInterval = setInterval(async () => {
    if (navigator.onLine) {
      await fetchLatestLocation();
      await fetchBookingStatus();
    } else {
      handleOffline();
    }
  }, 3000);
});

onBeforeUnmount(() => {
  if (trackingInterval) clearInterval(trackingInterval);
  stopOfflineGpsTracking();

  window.removeEventListener('online', handleOnline);
  window.removeEventListener('offline', handleOffline);
});
</script>