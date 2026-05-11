<template>
    <div class="min-h-screen bg-gray-50">

        <!-- Header -->
        <div class="bg-red-600 text-white text-center py-5 px-4 shadow-lg">
            <NuxtLink to="/" class="absolute left-4 top-5 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </NuxtLink>
            <h1 class="text-2xl font-bold">🛡️ Safety Center</h1>
            <p class="text-sm opacity-80 mt-1">Emergency help — 24/7 available</p>
        </div>

        <div class="max-w-md mx-auto p-4 space-y-4 mt-4">

            <!-- SOS Button -->
            <div class="text-center py-4">
                <button @click="triggerSOS" :disabled="sosLoader"
                    class="w-[400px] p-8 rounded-sm bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white shadow-2xl flex flex-col items-center justify-center mx-auto border-4 border-red-300">
                    <span class="text-6xl"></span>
                    <span v-if="!sosLoader" class="font-bold text-xl mt-1">SOS</span>
                    <span v-else
                        class="animate-spin border-4 border-white border-t-transparent rounded-full w-8 h-8 mt-1 block"></span>
                </button>
                <p class="text-gray-500 text-sm mt-3">Press for emergency — Admin instantly notified</p>
            </div>

            <!-- Breakdown Button -->
            <button @click="reportBreakdown" :disabled="breakdownLoader"
                class="w-full bg-yellow-500 hover:bg-yellow-600 active:scale-95 transition-all text-white py-4 px-6 rounded-2xl flex items-center gap-4 shadow-md">
                <span class="text-4xl"></span>
                <div class="text-left flex-1">
                    <p class="font-bold text-lg">Vehicle Breakdown</p>
                    <p class="text-sm opacity-80">Report breakdown to admin</p>
                </div>
                <span v-if="breakdownLoader"
                    class="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6 block"></span>
            </button>

            <!-- Call Driver -->

            <a :href="`tel:${driverPhone}`" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-2xl flex items-center gap-4
            shadow-md block">
                <span class="text-4xl"></span>
                <div class="text-left">
                    <p class="font-bold text-lg">Call Driver</p>
                    <p class="text-sm opacity-80">{{ driverPhone || 'Not assigned yet' }}</p>
                </div>
            </a>

            <!-- Call RSL Office -->

            <a href="tel:+923001234567" class="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-2xl flex items-center gap-4
            shadow-md block">
                <span class="text-4xl"></span>
                <div class="text-left">
                    <p class="font-bold text-lg">Call RSL Office</p>
                    <p class="text-sm opacity-80">+92 300 1234567</p>
                </div>
            </a>



        </div>

        <!-- Toast -->
        <transition name="fade">
            <div v-if="toast.show" :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-700'"
                class="fixed bottom-6 left-4 right-4 text-white text-center py-4 rounded-2xl shadow-2xl z-50 font-semibold">
                {{ toast.message }}
            </div>
        </transition>

        <!-- Fake Call Modal -->
        <transition name="fade">
            <div v-if="fakeCallActive"
                class="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center text-white">
                <div class="text-8xl mb-6 animate-bounce"></div>
                <p class="text-3xl font-bold">Incoming Call...</p>
                <p class="text-gray-400 mt-2 text-lg">RSL Support</p>
                <div class="flex gap-8 mt-16">
                    <button @click="fakeCallActive = false"
                        class="bg-red-600 rounded-full w-20 h-20 text-3xl shadow-xl flex items-center justify-center">❌</button>
                    <button @click="fakeCallActive = false"
                        class="bg-green-600 rounded-full w-20 h-20 text-3xl shadow-xl flex items-center justify-center">✅</button>
                </div>
            </div>
        </transition>

    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const route = useRoute();
const { $useCustomFetch } = useNuxtApp();

const booking_id = route.query.booking_id || null;
const customer_id = route.query.customer_id || null;
const driver_id = route.query.driver_id || null;
const driverPhone = ref(route.query.driver_phone || '');

const sosLoader = ref(false);
const breakdownLoader = ref(false);
const fakeCallActive = ref(false);

const toast = reactive({ show: false, message: '', type: 'success' });

function showToast(message, type = 'success') {
    toast.message = message;
    toast.type = type;
    toast.show = true;
    setTimeout(() => toast.show = false, 4000);
}

function getLocation() {
    return new Promise((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                () => resolve({ lat: null, lng: null })
            );
        } else {
            resolve({ lat: null, lng: null });
        }
    });
}

async function triggerSOS() {
    sosLoader.value = true;
    const { lat, lng } = await getLocation();
    try {
        const res = await $useCustomFetch('/api/site/v1/safety/sos', {
            method: 'POST',
            body: { booking_id, customer_id, driver_id, latitude: lat, longitude: lng }
        });
        if (res.success) showToast(' SOS sent! Admin notified immediately!', 'success');
        else showToast('Failed to send SOS. Call office directly.', 'error');
    } catch {
        showToast(' Error. Call office: +92 300 1234567', 'error');
    }
    sosLoader.value = false;
}

async function reportBreakdown() {
    breakdownLoader.value = true;
    const { lat, lng } = await getLocation();
    try {
        const res = await $useCustomFetch('/api/site/v1/safety/breakdown', {
            method: 'POST',
            body: { booking_id, customer_id, driver_id, latitude: lat, longitude: lng }
        });
        if (res.success) showToast('🔧 Breakdown reported! Help is on the way.', 'success');
        else showToast('❌ Failed to report. Call office directly.', 'error');
    } catch {
        showToast('❌ Error. Call office: +92 300 1234567', 'error');
    }
    breakdownLoader.value = false;
}

function startFakeCall() {
    fakeCallActive.value = true;
    setTimeout(() => fakeCallActive.value = false, 30000);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>