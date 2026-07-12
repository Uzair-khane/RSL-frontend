<template>
  <div class="min-h-screen bg-gray-50">
    <!-- HEADER -->
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

    <!-- MAP -->
    <div class="relative">
      <GoogleMap
        :api-key="googleMapKey"
        :center="mapCenter"
        :zoom="15"
        class="w-full"
        style="height: 60vh;"
      >
        <!-- Red driver marker -->
        <Marker
          v-if="hasValidDriverLocation"
          :key="markerKey"
          :options="markerOptions"
        />

        <!-- Green pickup marker -->
        <Marker
          v-if="hasValidPickupLocation"
          :key="pickupMarkerKey"
          :options="pickupMarkerOptions"
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

    <!-- CONTENT -->
    <div class="bg-white rounded-t-3xl -mt-4 relative z-10 px-4 pt-6 pb-8 shadow-lg">
      <!-- OFFLINE ALERT -->
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

      <!-- DRIVER DETAILS CARD -->
      <div class="bg-gray-50 rounded-2xl p-4 mb-4">
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <div class="bg-[#0693E3] rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
            <img v-if="driverImage" :src="driverImage" class="w-full h-full object-cover" />
            <span v-else>{{ driverName ? driverName[0] : '?' }}</span>
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="font-bold text-xl">{{ driverName || 'Assigning Driver...' }}</p>
              <span
                v-if="driverVerified == 1"
                class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold"
              >
                Verified
              </span>
            </div>

            <p class="text-gray-500 text-sm">{{ driverContact || 'Please wait' }}</p>

            <div class="flex items-center gap-2 mt-1 text-xs text-gray-500 flex-wrap">
              <span>⭐ {{ driverRating || '5.0' }}</span>
              <span>•</span>
              <span>{{ driverTotalRides || 0 }} rides</span>
              <span>•</span>
              <span>{{ driverExperience || 0 }} yrs exp</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3 text-xs text-gray-600">
              <div>
                <span class="text-gray-400">Driver ID:</span>
                <span class="font-semibold ml-1">{{ driverId || 'N/A' }}</span>
              </div>

              <div>
                <span class="text-gray-400">Email:</span>
                <span class="font-semibold ml-1">{{ driverEmail || 'N/A' }}</span>
              </div>

              <div>
                <span class="text-gray-400">CNIC:</span>
                <span class="font-semibold ml-1">{{ driverCnic || 'N/A' }}</span>
              </div>

              <div>
                <span class="text-gray-400">Vehicle:</span>
                <span class="font-semibold ml-1">{{ vehicleTitle || 'N/A' }}</span>
              </div>

              <div>
                <span class="text-gray-400">Vehicle No:</span>
                <span class="font-semibold ml-1">{{ vehicleNumber || 'N/A' }}</span>
              </div>

              <div>
                <span class="text-gray-400">Driver Source:</span>
                <span class="font-semibold ml-1">{{ driverId ? 'Assigned' : 'Pending' }}</span>
              </div>
            </div>
          </div>

          <div v-if="driverContact" class="flex md:flex-col gap-2">
            <a
              :href="`tel:${driverContact}`"
              class="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold text-center"
            >
              Call
            </a>
            <a
              :href="`sms:${driverContact}`"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold text-center"
            >
              SMS
            </a>
          </div>
        </div>
      </div>

      <!-- AI DRIVER ARRIVAL ETA CARD -->
      <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-4 mb-4">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
          <div>
            <h3 class="font-bold text-gray-900">AI Driver Arrival ETA</h3>
            <p class="text-xs text-gray-500">
              Driver-to-pickup arrival estimate using Google Maps driving route.
            </p>
            <p class="text-[11px] text-blue-600 mt-1">
              This predicts when the driver will reach pickup point, not full pickup-to-drop trip duration.
            </p>

            <p v-if="pickupGeoLoading" class="text-[11px] text-blue-700 mt-1 font-semibold">
              Finding pickup coordinates from location name...
            </p>

            <p v-if="pickupCoordinateSource" class="text-[11px] text-green-700 mt-1 font-semibold">
              Pickup coordinates source: {{ formatSource(pickupCoordinateSource) }}
            </p>

            <p v-if="demoMode" class="text-[11px] text-green-700 mt-1 font-semibold">
              Demo mode active: driver marker is moving toward pickup location.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-2">
            <button
              @click="fetchAiEta"
              :disabled="etaLoading || !bookingId || !driverId"
              class="bg-[#0693E3] text-white px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ etaLoading ? 'Checking...' : 'Refresh ETA' }}
            </button>

            <button
              @click="startDemoMovement"
              :disabled="demoMoving || !bookingId"
              class="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ demoMoving ? 'Moving...' : 'Start Demo Movement' }}
            </button>

            <button
              v-if="demoMoving"
              @click="stopDemoMovement"
              class="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold"
            >
              Stop
            </button>
          </div>
        </div>

        <div
          v-if="etaError"
          class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm mb-3"
        >
          {{ etaError }}
        </div>

        <div
          v-if="!etaPrediction && !etaError && !etaLoading"
          class="bg-white/70 rounded-xl p-3 text-sm text-gray-600"
        >
          ETA will appear after driver location and booking details are available.
        </div>

        <div
          v-if="etaLoading && !etaPrediction"
          class="bg-white/70 rounded-xl p-3 text-sm text-gray-600"
        >
          Calculating AI ETA prediction...
        </div>

        <div v-if="etaPrediction" class="space-y-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="bg-white rounded-xl p-3 shadow-sm">
              <p class="text-xs text-gray-400">Estimated Arrival</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ etaPrediction.estimated_arrival_minutes }} min
              </p>
            </div>

            <div class="bg-white rounded-xl p-3 shadow-sm">
              <p class="text-xs text-gray-400">Driver to Pickup</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ etaPrediction.distance_km }} km
              </p>
            </div>

            <div class="bg-white rounded-xl p-3 shadow-sm">
              <p class="text-xs text-gray-400">Confidence</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ etaPrediction.confidence }}%
              </p>
            </div>

            <div class="bg-white rounded-xl p-3 shadow-sm">
              <p class="text-xs text-gray-400">Status</p>
              <span
                class="inline-flex mt-1 px-3 py-1 rounded-full text-xs font-bold capitalize"
                :class="etaStatusClass"
              >
                {{ etaPrediction.status }}
              </span>
            </div>
          </div>

          <div class="bg-white rounded-xl p-3 shadow-sm text-sm">
            <div class="flex flex-wrap items-center gap-2 text-gray-600">
              <span>
                ETA Range:
                <strong>
                  {{ etaPrediction.eta_range?.min_minutes }}–{{ etaPrediction.eta_range?.max_minutes }} min
                </strong>
              </span>

              <span class="hidden sm:inline">•</span>

              <span>
                Route Source:
                <strong>
                  {{ formatSource(etaPrediction.eta_source) }}
                </strong>
              </span>

              <span class="hidden sm:inline">•</span>

              <span>
                Location Source:
                <strong>
                  {{ formatSource(etaPrediction.location_source) }}
                </strong>
              </span>

              <span
                v-if="etaPrediction.straight_distance_km !== undefined"
                class="hidden sm:inline"
              >
                •
              </span>

              <span v-if="etaPrediction.straight_distance_km !== undefined">
                Straight Distance:
                <strong>
                  {{ etaPrediction.straight_distance_km }} km
                </strong>
              </span>

              <span
                v-if="etaPrediction.location_age_minutes !== null && etaPrediction.location_age_minutes !== undefined"
                class="hidden sm:inline"
              >
                •
              </span>

              <span v-if="etaPrediction.location_age_minutes !== null && etaPrediction.location_age_minutes !== undefined">
                Location Age:
                <strong>
                  {{ etaPrediction.location_age_minutes }} min
                </strong>
              </span>
            </div>

            <p v-if="etaLastUpdated" class="text-xs text-gray-400 mt-1">
              Last ETA update: {{ etaLastUpdated }}
            </p>
          </div>

          <div
            v-if="etaPrediction.reasons && etaPrediction.reasons.length"
            class="bg-white rounded-xl p-3 shadow-sm"
          >
            <p class="font-semibold text-sm text-gray-800 mb-2">AI Reasoning</p>
            <ul class="space-y-1 text-xs text-gray-600">
              <li
                v-for="(reason, index) in etaPrediction.reasons"
                :key="index"
                class="flex gap-2"
              >
                <span class="text-[#0693E3] font-bold">•</span>
                <span>{{ reason }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- RIDE DETAILS -->
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

          <div v-if="hasValidPickupLocation">
            <p class="text-gray-400 text-xs">Pickup Coordinates</p>
            <p class="font-semibold">
              Lat: {{ pickupLat.toFixed(6) }},
              Lng: {{ pickupLng.toFixed(6) }}
            </p>
          </div>

          <div v-else>
            <p class="text-gray-400 text-xs">Pickup Coordinates</p>
            <p class="font-semibold text-yellow-700">
              Missing. System will try to generate coordinates from pickup text.
            </p>
          </div>
        </div>
      </div>

      <!-- DRIVER CURRENT LOCATION -->
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

const pickupLat = ref(toNumberOrNull(route.query.pickup_lat));
const pickupLng = ref(toNumberOrNull(route.query.pickup_lng));

const pickupCoordinateSource = ref('');
const pickupGeoLoading = ref(false);

const driverId = ref('');
const driverName = ref('');
const driverContact = ref('');
const driverImage = ref('');
const driverRating = ref('');
const driverTotalRides = ref('');
const driverExperience = ref('');
const driverVerified = ref('');

const driverEmail = ref('');
const driverCnic = ref('');
const vehicleTitle = ref('');
const vehicleNumber = ref('');

const etaPrediction = ref(null);
const etaLoading = ref(false);
const etaError = ref('');
const etaLastUpdated = ref('');

const demoMode = ref(false);
const demoMoving = ref(false);
const demoStep = ref(0);

let demoInterval = null;

const googleMapKey = config.public.gmapKey;

const officeLocation = ref({
  lat: toNumberOrNull(route.query.office_lat) || 34.0012,
  lng: toNumberOrNull(route.query.office_lng) || 71.5249
});

const mapCenter = ref({
  lat: officeLocation.value.lat,
  lng: officeLocation.value.lng
});

const driverLocation = ref(null);
const lastUpdate = ref('');
const showShareModal = ref(false);

const isOnline = ref(true);
const offlineCount = ref(0);

let trackingInterval = null;
let etaInterval = null;
let offlineGpsInterval = null;

const OFFLINE_STORAGE_KEY = 'rsl_offline_locations';

const driverMarkerIcon = createMarkerIcon('#DC2626', 'D');
const pickupMarkerIcon = createMarkerIcon('#16A34A', 'P');

const hasValidDriverLocation = computed(() => {
  return (
    driverLocation.value &&
    typeof driverLocation.value.lat === 'number' &&
    typeof driverLocation.value.lng === 'number' &&
    !Number.isNaN(driverLocation.value.lat) &&
    !Number.isNaN(driverLocation.value.lng)
  );
});

const hasValidPickupLocation = computed(() => {
  return (
    typeof pickupLat.value === 'number' &&
    typeof pickupLng.value === 'number' &&
    !Number.isNaN(pickupLat.value) &&
    !Number.isNaN(pickupLng.value)
  );
});

const markerKey = computed(() => {
  if (!hasValidDriverLocation.value) return 'no-marker';
  return `driver-${driverLocation.value.lat}-${driverLocation.value.lng}`;
});

const pickupMarkerKey = computed(() => {
  if (!hasValidPickupLocation.value) return 'no-pickup-marker';
  return `pickup-${pickupLat.value}-${pickupLng.value}`;
});

const markerOptions = computed(() => {
  if (!hasValidDriverLocation.value) return {};

  return {
    position: {
      lat: driverLocation.value.lat,
      lng: driverLocation.value.lng
    },
    title: 'Driver Current Location',
    icon: driverMarkerIcon
  };
});

const pickupMarkerOptions = computed(() => {
  if (!hasValidPickupLocation.value) return {};

  return {
    position: {
      lat: pickupLat.value,
      lng: pickupLng.value
    },
    title: 'Pickup Location',
    icon: pickupMarkerIcon
  };
});

const etaStatusClass = computed(() => {
  const status = etaPrediction.value?.status;

  if (status === 'nearby') {
    return 'bg-green-100 text-green-700';
  }

  if (status === 'delayed') {
    return 'bg-red-100 text-red-700';
  }

  return 'bg-blue-100 text-blue-700';
});

const safetyUrl = computed(() => {
  return `/safety?booking_id=${bookingId.value}&customer_id=${customerId.value}&driver_id=${driverId.value}&driver_phone=${driverContact.value}`;
});

function createMarkerIcon(color, label) {
  const svg = `
    <svg width="48" height="58" viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 0C10.745 0 0 10.745 0 24C0 42 24 58 24 58C24 58 48 42 48 24C48 10.745 37.255 0 24 0Z" fill="${color}"/>
      <circle cx="24" cy="24" r="14" fill="white" fill-opacity="0.18"/>
      <text x="24" y="30" text-anchor="middle" font-size="18" font-family="Arial" font-weight="700" fill="white">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString();
}

function formatSource(source) {
  if (!source) return 'Unknown';

  return String(source)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function toNumberOrNull(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}

function getFirstValue(object, keys) {
  for (const key of keys) {
    if (
      object &&
      object[key] !== undefined &&
      object[key] !== null &&
      object[key] !== ''
    ) {
      return object[key];
    }
  }

  return null;
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

  driverLocation.value = { lat, lng };
  mapCenter.value = { lat, lng };
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
      await fetchAiEta();
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

    console.log('Booking Status Response:', res);

    if (res.success && res.data) {
      fromLocation.value =
        res.data.from_location ||
        res.data.pickup_location ||
        res.data.source_location ||
        '';

      toLocation.value =
        res.data.to_location ||
        res.data.drop_location ||
        res.data.destination_location ||
        '';

      customerId.value =
        res.data.customer_id ||
        res.data.user_id ||
        res.data.id ||
        '';

      const bookingPickupLat = toNumberOrNull(
        getFirstValue(res.data, [
          'pickup_lat',
          'pickupLat',
          'from_lat',
          'fromLat',
          'source_lat',
          'sourceLat',
          'latitude'
        ])
      );

      const bookingPickupLng = toNumberOrNull(
        getFirstValue(res.data, [
          'pickup_lng',
          'pickupLng',
          'from_lng',
          'fromLng',
          'source_lng',
          'sourceLng',
          'longitude'
        ])
      );

      if (bookingPickupLat !== null) {
        pickupLat.value = bookingPickupLat;
        pickupCoordinateSource.value = 'booking_record';
      }

      if (bookingPickupLng !== null) {
        pickupLng.value = bookingPickupLng;
        pickupCoordinateSource.value = 'booking_record';
      }

      if (!hasValidPickupLocation.value && fromLocation.value) {
        await geocodePickupFromText();
      }

      if (hasValidPickupLocation.value && !hasValidDriverLocation.value) {
        mapCenter.value = {
          lat: pickupLat.value,
          lng: pickupLng.value
        };
      }

      if (res.data.driver) {
        driverId.value = res.data.driver.id || driverId.value || '';

        driverName.value =
          res.data.driver.name ||
          res.data.driver.full_name ||
          '';

        driverContact.value =
          res.data.driver.contact ||
          res.data.driver.phone ||
          res.data.driver.mobile ||
          '';

        driverImage.value = res.data.driver.image || '';
        driverRating.value = res.data.driver.rating || '';
        driverTotalRides.value = res.data.driver.total_rides || '';
        driverExperience.value = res.data.driver.experience_years || '';
        driverVerified.value = res.data.driver.verified_status || '';

        driverEmail.value = res.data.driver.email || '';

        driverCnic.value =
          res.data.driver.cnic ||
          res.data.driver.cnic_number ||
          res.data.driver.nic ||
          '';

        vehicleTitle.value =
          res.data.driver.car?.title ||
          res.data.driver.vehicle?.title ||
          res.data.car?.title ||
          res.data.vehicle?.title ||
          res.data.car_type ||
          res.data.vehicle_name ||
          '';

        vehicleNumber.value =
          res.data.driver.car?.registration_number ||
          res.data.driver.vehicle?.registration_number ||
          res.data.car?.registration_number ||
          res.data.vehicle?.registration_number ||
          res.data.vehicle_number ||
          '';
      }

      if (!driverId.value) {
        driverId.value =
          res.data.driver_id ||
          res.data.driverId ||
          res.data.assigned_driver_id ||
          '';
      }
    }
  } catch (error) {
    console.log('Booking Status Error:', error);
  }
}

async function geocodePickupFromText() {
  if (!fromLocation.value || hasValidPickupLocation.value) {
    return;
  }

  if (!googleMapKey) {
    etaError.value = 'Google Map key missing. Cannot find pickup coordinates.';
    return;
  }

  try {
    pickupGeoLoading.value = true;

    const query = `${fromLocation.value}, Pakistan`;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${googleMapKey}`
    );

    const data = await response.json();

    if (data.status === 'OK' && data.results?.length) {
      const location = data.results[0].geometry.location;

      pickupLat.value = Number(location.lat);
      pickupLng.value = Number(location.lng);
      pickupCoordinateSource.value = 'google_geocoding';

      mapCenter.value = {
        lat: pickupLat.value,
        lng: pickupLng.value
      };

      console.log('Pickup geocoded:', {
        pickup_lat: pickupLat.value,
        pickup_lng: pickupLng.value,
        address: data.results[0].formatted_address
      });

      return;
    }

    console.log('Pickup geocoding failed:', data);
    etaError.value = 'Pickup location found as text, but coordinates could not be generated.';
  } catch (error) {
    console.log('Pickup Geocoding Error:', error);
    etaError.value = 'Failed to generate pickup coordinates from location text.';
  } finally {
    pickupGeoLoading.value = false;
  }
}

async function fetchLatestLocation() {
  if (!bookingId.value) return;

  if (demoMoving.value) {
    return;
  }

  if (!navigator.onLine) {
    handleOffline();
    return;
  }

  try {
    const res = await $useCustomFetch(`/api/site/v1/tracking/location/${bookingId.value}`);

    console.log('Location API Response:', res);

    if (res.success && res.data) {
      const lat = parseFloat(
        res.data.latitude ||
        res.data.lat ||
        res.data.driver_lat
      );

      const lng = parseFloat(
        res.data.longitude ||
        res.data.lng ||
        res.data.driver_lng
      );

      if (!driverId.value) {
        driverId.value =
          res.data.driver_id ||
          res.data.driverId ||
          res.data.driver?.id ||
          '';
      }

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

async function fetchAiEta() {
  etaError.value = '';

  if (!bookingId.value) {
    etaError.value = 'Booking ID is missing.';
    return;
  }

  if (!driverId.value) {
    etaError.value = 'Driver is not assigned yet.';
    return;
  }

  if (!navigator.onLine) {
    etaError.value = 'ETA prediction is not available in offline mode.';
    return;
  }

  if (!hasValidPickupLocation.value) {
    await geocodePickupFromText();
  }

  if (!hasValidPickupLocation.value) {
    etaError.value = 'Pickup coordinates are missing. ETA needs pickup latitude and longitude.';
    return;
  }

  try {
    etaLoading.value = true;

    const body = {
      booking_id: Number(bookingId.value) || bookingId.value,
      driver_id: Number(driverId.value) || driverId.value,
      pickup_lat: pickupLat.value,
      pickup_lng: pickupLng.value
    };

    if (hasValidDriverLocation.value) {
      body.driver_lat = driverLocation.value.lat;
      body.driver_lng = driverLocation.value.lng;
    }

    console.log('AI ETA Request Body:', body);

    const res = await $useCustomFetch('/api/site/v1/ai/predict-eta', {
      method: 'POST',
      body
    });

    console.log('AI ETA Response:', res);

    if (res.success) {
      etaPrediction.value = res;
      etaLastUpdated.value = formatTime(new Date());

      if (res.driver_location && !demoMoving.value) {
        const lat = Number(res.driver_location.latitude);
        const lng = Number(res.driver_location.longitude);

        if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
          driverLocation.value = { lat, lng };
          mapCenter.value = { lat, lng };
        }
      }
    } else {
      etaError.value = res.message || 'Unable to generate ETA prediction.';
    }
  } catch (error) {
    console.log('AI ETA Error:', error);
    etaError.value = error?.data?.message || error?.message || 'AI ETA prediction failed.';
  } finally {
    etaLoading.value = false;
  }
}

async function startDemoMovement() {
  etaError.value = '';

  if (!bookingId.value) {
    etaError.value = 'Booking ID is missing. Demo movement cannot start.';
    return;
  }

  if (!driverId.value) {
    etaError.value = 'Driver is not assigned yet. Demo movement cannot start.';
    return;
  }

  if (!hasValidPickupLocation.value) {
    await geocodePickupFromText();
  }

  if (!hasValidPickupLocation.value) {
    etaError.value = 'Pickup coordinates are missing. Demo movement cannot start.';
    return;
  }

  demoMode.value = true;
  demoMoving.value = true;
  demoStep.value = 0;

  const startLat = hasValidDriverLocation.value
    ? driverLocation.value.lat
    : officeLocation.value.lat;

  const startLng = hasValidDriverLocation.value
    ? driverLocation.value.lng
    : officeLocation.value.lng;

  driverLocation.value = {
    lat: startLat,
    lng: startLng
  };

  mapCenter.value = {
    lat: startLat,
    lng: startLng
  };

  if (demoInterval) {
    clearInterval(demoInterval);
  }

  await moveDriverOneStep(startLat, startLng);

  demoInterval = setInterval(() => {
    moveDriverOneStep(startLat, startLng);
  }, 10000);
}

async function moveDriverOneStep(startLat, startLng) {
  if (!hasValidPickupLocation.value) return;

  demoStep.value += 1;

  const totalSteps = 12;
  const progress = Math.min(demoStep.value / totalSteps, 1);

  const nextLat = startLat + (pickupLat.value - startLat) * progress;
  const nextLng = startLng + (pickupLng.value - startLng) * progress;

  driverLocation.value = {
    lat: Number(nextLat.toFixed(6)),
    lng: Number(nextLng.toFixed(6))
  };

  mapCenter.value = {
    lat: driverLocation.value.lat,
    lng: driverLocation.value.lng
  };

  lastUpdate.value = `${formatTime(new Date())} (demo movement)`;

  await fetchAiEta();

  if (progress >= 1) {
    stopDemoMovement();
    lastUpdate.value = `${formatTime(new Date())} (driver reached pickup)`;
  }
}

function stopDemoMovement() {
  demoMoving.value = false;

  if (demoInterval) {
    clearInterval(demoInterval);
    demoInterval = null;
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
    await fetchAiEta();
  } else {
    handleOffline();
  }

  trackingInterval = setInterval(async () => {
    if (navigator.onLine) {
      await fetchBookingStatus();

      if (!demoMoving.value) {
        await fetchLatestLocation();
        await fetchAiEta();
      }
    } else {
      handleOffline();
    }
  }, 10000);

  etaInterval = setInterval(async () => {
    if (navigator.onLine && !demoMoving.value) {
      await fetchAiEta();
    }
  }, 30000);
});

onBeforeUnmount(() => {
  if (trackingInterval) clearInterval(trackingInterval);
  if (etaInterval) clearInterval(etaInterval);
  if (demoInterval) clearInterval(demoInterval);

  stopOfflineGpsTracking();

  window.removeEventListener('online', handleOnline);
  window.removeEventListener('offline', handleOffline);
});
</script>