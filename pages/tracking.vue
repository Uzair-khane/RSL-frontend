<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <div class="bg-[#0693E3] text-white px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <NuxtLink to="/" class="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </NuxtLink>
                <div>
                    <h1 class="font-bold text-lg">Live Ride Tracking</h1>
                    <p class="text-xs opacity-80">Booking #{{ bookingId }}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <!-- Live indicator -->
                <div class="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                    <span class="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                    <span class="text-xs font-semibold">LIVE</span>
                </div>
            </div>
        </div>

        <!-- Map — Full Screen -->
        <div class="relative">
            <GoogleMap :api-key="googleMapKey" :center="mapCenter" :zoom="14" ref="googleMap" class="w-full"
                style="height: 60vh;">
                <!-- Driver Marker -->
                <Marker v-if="driverLocation" :options="{
                    position: driverLocation,
                    title: 'Your Driver',
                }" />

            </GoogleMap>

            <!-- Share Button on Map -->
            <button @click="showShareModal = true"
                class="absolute top-4 right-4 bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#0693E3]" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
            </button>
            <!-- Floating SOS — Map pe -->
            <NuxtLink :to="`/safety?booking_id=${bookingId}&customer_id=${customerId}&driver_phone=${driverContact}`"
                class="absolute bottom-16 right-4 bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white rounded-full w-14 h-14 flex flex-col items-center justify-center shadow-2xl border-4 border-red-300 z-10">
                <span class="text-xl">🆘</span>
                <span class="text-xs font-bold">SOS</span>
            </NuxtLink>
            <!-- Location Update Badge -->
            <div v-if="lastUpdate"
                class="absolute bottom-4 left-4 bg-white shadow-lg rounded-full px-3 py-1 text-xs text-gray-500">
                Updated: {{ lastUpdate }}
            </div>
        </div>

        <!-- Bottom Card -->
        <div class="bg-white rounded-t-3xl -mt-4 relative z-10 px-4 pt-6 pb-8 shadow-lg">

            <!-- Status Timeline -->
            <div class="flex items-center justify-between mb-6">
                <div class="flex flex-col items-center">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        :class="['bg-green-500']">✓</div>
                    <p class="text-xs mt-1 text-gray-500 text-center">Booked</p>
                </div>
                <div class="flex-1 h-1 mx-1"
                    :class="[rideStatus == 'process' || rideStatus == 'completed' ? 'bg-green-500' : 'bg-gray-200']">
                </div>
                <div class="flex flex-col items-center">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        :class="[rideStatus == 'process' || rideStatus == 'completed' ? 'bg-green-500' : 'bg-gray-300']">
                        {{ rideStatus == 'process' || rideStatus == 'completed' ? '✓' : '2' }}
                    </div>
                    <p class="text-xs mt-1 text-gray-500 text-center">On Way</p>
                </div>
                <div class="flex-1 h-1 mx-1" :class="[rideStatus == 'completed' ? 'bg-green-500' : 'bg-gray-200']">
                </div>
                <div class="flex flex-col items-center">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        :class="[rideStatus == 'completed' ? 'bg-green-500' : 'bg-gray-300']">
                        {{ rideStatus == 'completed' ? '✓' : '3' }}
                    </div>
                    <p class="text-xs mt-1 text-gray-500 text-center">Arrived</p>
                </div>
                <div class="flex-1 h-1 mx-1" :class="[rideStatus == 'completed' ? 'bg-green-500' : 'bg-gray-200']">
                </div>
                <div class="flex flex-col items-center">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        :class="[rideStatus == 'completed' ? 'bg-green-500' : 'bg-gray-300']">
                        {{ rideStatus == 'completed' ? '✓' : '4' }}
                    </div>
                    <p class="text-xs mt-1 text-gray-500 text-center">Done</p>
                </div>
            </div>

            <!-- Driver Info Card -->
            <div class="bg-gray-50 rounded-2xl p-4 mb-4">
                <div class="flex items-center gap-4">
                    <div
                        class="bg-[#0693E3] rounded-full w-14 h-14 flex items-center justify-center text-white text-2xl font-bold">
                        {{ driverName ? driverName[0] : '?' }}
                    </div>
                    <div class="flex-1">
                        <p class="font-bold text-lg">{{ driverName || 'Assigning Driver...' }}</p>
                        <p class="text-gray-500 text-sm">{{ driverContact || 'Please wait' }}</p>
                        <div class="flex items-center gap-1 mt-1">
                            <span class="text-yellow-400 text-sm">★★★★★</span>
                            <span class="text-xs text-gray-400">Professional Driver</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2" v-if="driverContact">
                        <a :href="`tel:${driverContact}`"
                            class="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold text-center">
                            Call
                        </a>
                        <a :href="`sms:${driverContact}`"
                            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold text-center">
                            SMS
                        </a>
                    </div>
                </div>
            </div>

            <!-- Ride Details -->
            <div class="bg-gray-50 rounded-2xl p-4 mb-4">
                <h3 class="font-bold mb-3">Ride Details</h3>
                <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-3">
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                            <p class="text-gray-400 text-xs">Pickup</p>
                            <p class="font-semibold">{{ fromLocation }}</p>
                        </div>
                    </div>
                    <div class="ml-1.5 border-l-2 border-dashed border-gray-300 h-4"></div>
                    <div class="flex items-center gap-3">
                        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div>
                            <p class="text-gray-400 text-xs">Drop</p>
                            <p class="font-semibold">{{ toLocation || 'Hourly Ride' }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Driver Location Info -->
            <div v-if="driverLocation" class="bg-blue-50 rounded-2xl p-4 mb-4 text-sm">
                <p class="font-semibold text-[#0693E3] mb-1"> Driver Current Location</p>
                <p class="text-gray-600">Lat: {{ driverLocation.lat.toFixed(6) }}, Lng: {{ driverLocation.lng.toFixed(6)
                }}</p>
            </div>
            <div v-else class="bg-yellow-50 rounded-2xl p-4 mb-4 text-sm text-yellow-700">
                ⏳ Waiting for driver to start sharing location...
            </div>
            <!-- Safety Buttons -->
            <div class="grid grid-cols-2 gap-3 mt-2">

                <!-- SOS Button -->
                <NuxtLink
                    :to="`/safety?booking_id=${bookingId}&customer_id=${customerId}&driver_phone=${driverContact}`"
                    class="flex flex-col items-center justify-center gap-1 bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white py-4 rounded-2xl shadow-lg">
                    <span class="text-3xl">🆘</span>
                    <span class="font-bold text-sm">SOS Emergency</span>
                    <span class="text-xs opacity-80">Press for help</span>
                </NuxtLink>

                <!-- Safety Center Button -->
                <NuxtLink
                    :to="`/safety?booking_id=${bookingId}&customer_id=${customerId}&driver_phone=${driverContact}`"
                    class="flex flex-col items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white py-4 rounded-2xl shadow-lg">
                    <span class="text-3xl">🛡️</span>
                    <span class="font-bold text-sm">Safety Center</span>
                    <span class="text-xs opacity-80">Breakdown & more</span>
                </NuxtLink>

            </div>
        </div>

        <!-- Share Modal -->
        <div v-if="showShareModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-t-3xl w-full max-w-lg p-6">
                <h3 class="font-bold text-xl mb-2">Share Live Location</h3>
                <p class="text-gray-500 text-sm mb-4">Share this link with family or friends to track your ride</p>

                <!-- Share Link -->
                <div class="bg-gray-100 rounded-xl p-3 flex items-center gap-2 mb-4">
                    <p class="text-sm text-gray-600 flex-1 truncate">{{ shareUrl }}</p>
                    <button @click="copyLink"
                        class="bg-[#0693E3] text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                        {{ copied ? '✅ Copied' : 'Copy' }}
                    </button>
                </div>

                <!-- Share Options -->
                <div class="grid grid-cols-3 gap-3 mb-4">
                    <a :href="`https://wa.me/?text=${encodeURIComponent('Track my ride: ' `<br>` + shareUrl)}`"
                        target="_blank"
                        class="flex flex-col items-center gap-2 bg-green-50 rounded-xl p-3 hover:bg-green-100">
                        <span class="text-2xl">📱</span>
                        <span class="text-xs font-semibold text-green-700">WhatsApp</span>
                    </a>
                    <a :href="`sms:?body=${encodeURIComponent('Track my ride: ' + shareUrl)}`"
                        class="flex flex-col items-center gap-2 bg-blue-50 rounded-xl p-3 hover:bg-blue-100">
                        <span class="text-2xl">💬</span>
                        <span class="text-xs font-semibold text-blue-700">SMS</span>
                    </a>
                    <a :href="`mailto:?subject=Track My Ride&body=${encodeURIComponent('Track my ride: ' + shareUrl)}`"
                        class="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-3 hover:bg-gray-100">
                        <span class="text-2xl">📧</span>
                        <span class="text-xs font-semibold text-gray-700">Email</span>
                    </a>
                </div>

                <button @click="showShareModal = false"
                    class="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold">
                    Close
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import { io } from 'socket.io-client';

const route = useRoute();
const config = useRuntimeConfig();

const bookingId = ref(route.query.booking_id || '');
const fromLocation = ref(route.query.from_location || '');
const toLocation = ref(route.query.to_location || '');
const customerId = ref(route.query.customer_id || '');
const googleMapKey = config.public.gmapKey;

const mapCenter = ref({ lat: 34.0012, lng: 71.5249 });
const driverLocation = ref(null);
const pickupLocation = ref({ lat: 34.0012, lng: 71.5249 });
const driverName = ref('');
const driverContact = ref('');
const rideStatus = ref('pending');
const lastUpdate = ref('');
const showShareModal = ref(false);
const copied = ref(false);
const googleMap = ref(null);

let socket = null;
let statusInterval = null;

const { $useCustomFetch } = useNuxtApp();

// Share URL
const shareUrl = computed(() => {
    if (process.client) {
        return `${window.location.origin}/tracking?booking_id=${bookingId.value}&from_location=${encodeURIComponent(fromLocation.value)}&to_location=${encodeURIComponent(toLocation.value)}&customer_id=${customerId.value}`;
    }
    return '';
});

// Copy link
function copyLink() {
    navigator.clipboard.writeText(shareUrl.value);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
}

// Fetch booking + driver info
async function fetchBookingStatus() {
    try {
        const res = await $useCustomFetch(`/api/site/v1/booking/status/${bookingId.value}`);
        if (res.success) {
            rideStatus.value = res.data.booking_status;
        }
    } catch (error) {
        console.log('Status error:', error);
    }
}

// Format time
function formatTime(date) {
    return new Date(date).toLocaleTimeString();
}

onMounted(async () => {
    // Pehle location fetch karo
    await fetchLatestLocation();

    // Har 3 second mein update karo
    statusInterval = setInterval(async () => {
        await fetchLatestLocation();
        await fetchBookingStatus();
    }, 3000);
});

// Latest location fetch karo
async function fetchLatestLocation() {
    try {
        const res = await $useCustomFetch(`/api/site/v1/tracking/location/${bookingId.value}`);
        if (res.success && res.data) {
            driverLocation.value = {
                lat: parseFloat(res.data.latitude),
                lng: parseFloat(res.data.longitude)
            };
            mapCenter.value = driverLocation.value;
            lastUpdate.value = formatTime(new Date());
        }
    } catch (error) {
        console.log('Location error:', error);
    }
}

onBeforeUnmount(() => {
    if (socket) socket.disconnect();
    if (statusInterval) clearInterval(statusInterval);
});
</script>