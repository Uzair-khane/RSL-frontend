<template>
    <div>
        <HeroSection title="PAYMENT" imagePath="/images/book-ride.png" />

        <div class=" mx-auto px-4 py-10">
            <h2 class="text-3xl font-bold text-center mb-2">Complete Your Payment</h2>
            <p class="text-center text-gray-400 mb-8">Secure Bank Transfer Payment</p>

            <div class="flex flex-col gap-6">

                <!-- LEFT — Booking + Customer Details -->
                <div class="space-y-5">

                    <!-- Booking Summary -->
                    <div class="text-slate-800 bg-blue-50 rounded-xl p-5  shadow-lg">
                        <h3 class="font-semibold text-lg mb-4"> Ride Summary</h3>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="opacity-80">Booking ID:</span>
                                <span class="font-bold">#{{ bookingId }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="opacity-80">Ride Type:</span>
                                <span class="font-bold capitalize">{{ rideType }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="opacity-80">From:</span>
                                <span class="font-bold text-right max-w-36">{{ fromLocation }}</span>
                            </div>
                            <div v-if="toLocation" class="flex justify-between">
                                <span class="opacity-80">To:</span>
                                <span class="font-bold text-right max-w-36">{{ toLocation }}</span>
                            </div>
                            <div v-if="distance" class="flex justify-between">
                                <span class="opacity-80">Distance:</span>
                                <span class="font-bold">{{ distance }}</span>
                            </div>
                            <div v-if="hours" class="flex justify-between">
                                <span class="opacity-80">Hours:</span>
                                <span class="font-bold">{{ hours }} hrs</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="opacity-80">Date:</span>
                                <span class="font-bold">{{ pickupDate }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="opacity-80">Time:</span>
                                <span class="font-bold">{{ pickupTime }}</span>
                            </div>
                            <div class="border-t border-white/30 pt-2 mt-2 flex justify-between">
                                <span class="opacity-80">Total Amount:</span>
                                <span class="font-bold text-xl">PKR {{ amount }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Customer Info -->
                    <div class="bg-white shadow-lg rounded-2xl p-5 border border-gray-100">
                        <h3 class="font-semibold text-lg mb-4">👤 Customer Details</h3>
                        <div class="space-y-3 text-sm">
                            <div class="flex items-center gap-3">
                                <span class="bg-blue-50 p-2 rounded-lg">👤</span>
                                <div>
                                    <p class="text-gray-400 text-xs">Name</p>
                                    <p class="font-semibold">{{ customerName }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="bg-blue-50 p-2 rounded-lg">📧</span>
                                <div>
                                    <p class="text-gray-400 text-xs">Email</p>
                                    <p class="font-semibold">{{ customerEmail }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="bg-blue-50 p-2 rounded-lg">📱</span>
                                <div>
                                    <p class="text-gray-400 text-xs">Phone</p>
                                    <p class="font-semibold">{{ customerContact }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- RIGHT — Bank Transfer Form -->
                <div class="space-y-5">

                    <!-- Bank Details -->
                    <div class="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
                        <h3 class="font-semibold text-lg mb-4"> Bank Transfer Details</h3>
                        <p class="text-sm text-gray-500 mb-4">
                            Please transfer the amount to the following account and upload your payment screenshot.
                        </p>

                        <div class="bg-blue-50 rounded-xl p-4 space-y-3 text-sm mb-5">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-500">Bank Name:</span>
                                <span class="font-bold text-gray-800">Bank Alfalah</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-500">Account Title:</span>
                                <span class="font-bold text-gray-800">RSL Limousine</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-500">Account Number:</span>
                                <div class="flex items-center gap-2">
                                    <span class="font-bold text-[#0693E3]">55095002418458</span>
                                    <button @click="copyAccount"
                                        class="bg-[#0693E3] text-white text-xs px-2 py-1 rounded-md hover:bg-blue-600">
                                        {{ copied ? '✅ Copied' : 'Copy' }}
                                    </button>
                                </div>
                            </div>
                            <div class="flex justify-between items-center border-t border-blue-200 pt-3">
                                <span class="text-gray-500">Amount to Transfer:</span>
                                <span class="font-bold text-xl text-[#0693E3]">PKR {{ amount }}</span>
                            </div>
                        </div>

                        <!-- Transfer Reference -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-600 mb-1">
                                Transaction Reference / TID
                            </label>
                            <input v-model="transferReference" type="text"
                                placeholder="Enter transaction reference number"
                                class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0693E3] focus:ring-2 focus:ring-blue-100 transition-all" />
                        </div>

                        <!-- Screenshot Upload -->
                        <div class="mb-5">
                            <label class="block text-sm font-medium text-gray-600 mb-1">
                                Payment Screenshot
                            </label>
                            <div @click="triggerUpload" @dragover.prevent @drop.prevent="handleDrop"
                                class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#0693E3] transition-all"
                                :class="[screenshotPreview ? 'border-green-400' : '']">
                                <div v-if="!screenshotPreview">
                                    <p class="text-4xl mb-2">📸</p>
                                    <p class="text-gray-500 text-sm">Click or drag to upload screenshot</p>
                                    <p class="text-gray-400 text-xs mt-1">PNG, JPG, JPEG supported</p>
                                </div>
                                <div v-else>
                                    <img :src="screenshotPreview" class="max-h-40 mx-auto rounded-lg"
                                        alt="Screenshot" />
                                    <p class="text-green-600 text-sm mt-2"> Screenshot uploaded</p>
                                </div>
                            </div>
                            <input ref="fileInput" type="file" accept="image/*" class="hidden"
                                @change="handleFileChange" />
                        </div>

                        <!-- Submit Button -->
                        <button @click="processPayment" :disabled="loader"
                            class="w-full bg-[#0693E3] hover:bg-blue-600 transition-all text-white py-3.5 rounded-xl font-semibold flex justify-center items-center gap-2 shadow-md">
                            <span v-if="loader"
                                class="animate-spin rounded-full border-2 border-white w-5 h-5 border-t-transparent"></span>
                            <span v-else> Submit Payment</span>
                        </button>

                        <!-- Security Badge -->
                        <div class="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <span></span>
                            <span>Your payment is 100% secure</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <!-- Success Modal -->
        <div v-if="paymentSuccess"
            class="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex justify-center items-center px-4">
            <div class="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
                <div class="text-6xl mb-4"></div>
                <h3 class="text-2xl font-bold text-green-600 mb-2">Payment Submitted!</h3>
                <p class="text-gray-500 mb-2">Your payment is under review.</p>
                <p class="text-gray-400 text-sm mb-6">Receipt has been sent to your email.</p>
                <div class="bg-gray-50 rounded-xl p-4 mb-6 text-sm">
                    <div class="flex justify-between mb-2">
                        <span class="text-gray-500">Booking ID:</span>
                        <span class="font-bold">#{{ bookingId }}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="text-gray-500">Amount:</span>
                        <span class="font-bold text-[#0693E3]">PKR {{ amount }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Status:</span>
                        <span class="font-bold text-yellow-500">⏳ Pending Verification</span>
                    </div>
                </div>
                <NuxtLink to="/"
                    class="block w-full bg-[#0693E3] hover:bg-blue-600 transition-all text-white py-3 rounded-xl font-semibold">
                    Go to Home
                </NuxtLink>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const route = useRoute();
const bookingId = ref(route.query.booking_id || '');
const amount = ref(route.query.amount || '');
const customerName = ref(route.query.name || '');
const customerEmail = ref(route.query.email || '');
const customerContact = ref(route.query.contact || '');
const fromLocation = ref(route.query.from_location || '');
const toLocation = ref(route.query.to_location || '');
const pickupDate = ref(route.query.pickup_date || '');
const pickupTime = ref(route.query.pickup_time || '');
const rideType = ref(route.query.ride_type || '');
const distance = ref(route.query.distance || '');
const hours = ref(route.query.hours || '');

const loader = ref(false);
const paymentSuccess = ref(false);
const transferReference = ref('');
const screenshotFile = ref(null);
const screenshotPreview = ref('');
const fileInput = ref(null);
const copied = ref(false);

const { $useCustomFetch } = useNuxtApp();

function copyAccount() {
    navigator.clipboard.writeText('55095002418458');
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
}

function triggerUpload() {
    fileInput.value.click();
}

function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
        screenshotFile.value = file;
        screenshotPreview.value = URL.createObjectURL(file);
    }
}

function handleDrop(e) {
    const file = e.dataTransfer.files[0];
    if (file) {
        screenshotFile.value = file;
        screenshotPreview.value = URL.createObjectURL(file);
    }
}

async function processPayment() {
    if (!transferReference.value) {
        alert('Please enter transaction reference number!');
        return;
    }
    if (!screenshotFile.value) {
        alert('Please upload payment screenshot!');
        return;
    }

    loader.value = true;

    try {
        const formData = new FormData();
        formData.append('booking_id', bookingId.value);
        formData.append('amount', amount.value);
        formData.append('payment_type', 'bank_transfer');
        formData.append('transfer_reference', transferReference.value);
        formData.append('screenshot', screenshotFile.value);

        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.baseUrl}api/site/v1/payment/confirm`, {
            method: 'POST',
            body: formData
        });

        const confirmRes = await response.json();

        if (confirmRes.success) {
            paymentSuccess.value = true;
        } else {
            alert('Payment failed: ' + confirmRes.message);
        }

    } catch (error) {
        alert('Error: ' + error.message);
    }

    loader.value = false;
}
</script>