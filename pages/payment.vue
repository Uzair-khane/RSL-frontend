<template>
    <div>
        <HeroSection title="PAYMENT" imagePath="/images/book-ride.png" />

        <div class=" mx-auto px-4 py-10">
            <h2 class="text-3xl font-bold text-center mb-2">Complete Your Payment</h2>
            <p class="text-center text-gray-400 mb-8">Secure payment powered by Stripe</p>

            <div class="grid grid-cols-1 gap-8">

                <div class="bg-white rounded-2xl p-6 text-slate-700 shadow-lg border border-gray-100">
                    <h3 class="font-semibold text-lg mb-4 flex items-center gap-2 border-b pb-2">
                        Ride Summary
                    </h3>
                    <div class="space-y-3 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-500">Booking ID:</span>
                            <span class="font-bold">#{{ bookingId }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Ride Type:</span>
                            <span class="font-bold capitalize">{{ rideType }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">From:</span>
                            <span class="font-bold text-right max-w-[200px]">{{ fromLocation }}</span>
                        </div>
                        <div v-if="toLocation" class="flex justify-between">
                            <span class="text-gray-500">To:</span>
                            <span class="font-bold text-right max-w-[200px]">{{ toLocation }}</span>
                        </div>
                        <div v-if="distance" class="flex justify-between">
                            <span class="text-gray-500">Distance:</span>
                            <span class="font-bold">{{ distance }}</span>
                        </div>
                        <div v-if="hours" class="flex justify-between">
                            <span class="text-gray-500">Hours:</span>
                            <span class="font-bold">{{ hours }} hrs</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Date & Time:</span>
                            <span class="font-bold">{{ pickupDate }} | {{ pickupTime }}</span>
                        </div>
                        <div class="border-t border-gray-100 pt-4 mt-2 flex justify-between items-center">
                            <span class="text-gray-600 font-medium">Total Amount:</span>
                            <span class="font-bold text-2xl text-[#0693E3]">PKR {{ amount }}</span>
                        </div>
                    </div>
                </div>

                <div class="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
                    <h3 class="font-semibold text-lg mb-4 border-b pb-2">
                        Customer Details
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p class="text-gray-400 text-xs">Name</p>
                            <p class="font-semibold">{{ customerName }}</p>
                        </div>
                        <div>
                            <p class="text-gray-400 text-xs">Email</p>
                            <p class="font-semibold truncate">{{ customerEmail }}</p>
                        </div>
                        <div>
                            <p class="text-gray-400 text-xs">Phone</p>
                            <p class="font-semibold">{{ customerContact }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
                    <h3 class="font-semibold text-xl mb-6 flex items-center gap-2">
                        Card Details
                    </h3>

                    <div class="space-y-5">
                        <div>
                            <label class="block text-sm font-medium text-gray-600 mb-1">Card Number</label>
                            <input v-model="card.number" type="text" maxlength="19" placeholder="1234 5678 9012 3456"
                                @input="formatCardNumber"
                                class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0693E3] focus:ring-2 focus:ring-blue-100 transition-all" />
                        </div>

                        <div class="flex gap-4">
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-600 mb-1">Expiry Date</label>
                                <input v-model="card.expiry" type="text" maxlength="5" placeholder="MM/YY"
                                    @input="formatExpiry"
                                    class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0693E3] focus:ring-2 focus:ring-blue-100 transition-all" />
                            </div>
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-600 mb-1">CVV</label>
                                <input v-model="card.cvv" type="password" maxlength="3" placeholder="•••"
                                    class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0693E3] focus:ring-2 focus:ring-blue-100 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-600 mb-1">Card Holder Name</label>
                            <input v-model="card.name" type="text" placeholder="John Doe"
                                class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0693E3] focus:ring-2 focus:ring-blue-100 transition-all" />
                        </div>

                        <button @click="processPayment" :disabled="loader"
                            class="w-full mt-4 bg-[#0693E3] hover:bg-blue-600 transition-all text-white py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2 shadow-md disabled:bg-gray-400">
                            <span v-if="loader"
                                class="animate-spin rounded-full border-2 border-white w-5 h-5 border-t-transparent"></span>
                            <span v-else> Pay PKR {{ amount }}</span>
                        </button>

                        <div class="flex flex-col items-center gap-2">
                            <div class="flex items-center gap-2 text-xs text-gray-400">
                                <span>🔒 256-bit SSL Encrypted | Secured by Stripe</span>
                            </div>
                            <div
                                class="w-full bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-700">
                                <p class="font-semibold mb-1 text-center">🧪 Sandbox Mode</p>
                                <div class="flex justify-around">
                                    <span>Card: 4242...4242</span>
                                    <span>Exp: 12/26</span>
                                    <span>CVV: 123</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="paymentSuccess"
            class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center px-4">
            <div class="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl scale-in-center">
                <div class="text-6xl mb-4 text-green-500">✅</div>
                <h3 class="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                <p class="text-gray-500 mb-6">Your booking has been confirmed. A receipt has been sent to your email.
                </p>

                <div class="bg-gray-50 rounded-xl p-4 mb-6 text-sm">
                    <div class="flex justify-between mb-2">
                        <span class="text-gray-500">Booking ID:</span>
                        <span class="font-bold">#{{ bookingId }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Amount Paid:</span>
                        <span class="font-bold text-[#0693E3]">PKR {{ amount }}</span>
                    </div>
                </div>

                <NuxtLink to="/"
                    class="block w-full bg-[#0693E3] hover:bg-blue-600 transition-all text-white py-3 rounded-xl font-semibold">
                    Back to Home
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

const { $useCustomFetch } = useNuxtApp();

const card = reactive({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
});

function formatCardNumber() {
    card.number = card.number.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry() {
    card.expiry = card.expiry.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
}

async function processPayment() {
    if (!card.number || !card.expiry || !card.cvv || !card.name) {
        alert('Please fill all card details!');
        return;
    }

    loader.value = true;

    try {
        const intentRes = await $useCustomFetch('/api/site/v1/payment/create-intent', {
            method: 'POST',
            body: {
                booking_id: bookingId.value,
                amount: amount.value
            }
        });

        if (!intentRes.success) {
            alert('Payment failed: ' + intentRes.message);
            loader.value = false;
            return;
        }

        const confirmRes = await $useCustomFetch('/api/site/v1/payment/confirm', {
            method: 'POST',
            body: {
                booking_id: bookingId.value,
                stripe_payment_id: intentRes.payment_intent_id,
                amount: amount.value
            }
        });

        if (confirmRes.success) {
            paymentSuccess.value = true;
        } else {
            alert('Payment not confirmed: ' + confirmRes.message);
        }

    } catch (error) {
        alert('Error: ' + error.message);
    }

    loader.value = false;
}
</script>

<style scoped>
.scale-in-center {
    animation: scale-in-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes scale-in-center {
    0% {
        transform: scale(0.7);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>