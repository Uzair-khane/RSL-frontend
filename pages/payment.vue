<template>
  <div class="min-h-screen bg-[#F3F7FB] text-slate-950">
    <!-- HERO -->
    <section class="relative overflow-hidden bg-slate-950 text-white">
      <div class="absolute inset-0 bg-gradient-to-br from-[#0693E3] via-[#045A9C] to-slate-950"></div>
      <div class="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#0693E3]/25 blur-3xl"></div>

      <div class="pointer-events-none absolute inset-0 opacity-10">
        <div class="h-full w-full bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:26px_26px]"></div>
      </div>

      <div class="relative mx-auto max-w-7xl px-4 pb-28 pt-8">
        <div class="flex items-center justify-between gap-4">
          <NuxtLink
            :to="`/booking-details?id=${bookingId}`"
            class="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl font-bold backdrop-blur transition hover:bg-white/20"
          >
            <span class="transition group-hover:-translate-x-1">←</span>
          </NuxtLink>

          <div class="text-center">
            <p class="text-xs font-black uppercase tracking-[0.35em] text-white/60">
              Real Smart Limousine
            </p>
            <h1 class="mt-1 text-3xl font-black md:text-4xl">
              Secure Payment
            </h1>
          </div>

          <div class="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-black backdrop-blur">
            RSL
          </div>
        </div>

        <div class="mt-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <p class="text-sm font-semibold text-white/70">
              Booking Reference
            </p>

            <h2 class="mt-1 text-6xl font-black tracking-tight md:text-7xl">
              #{{ bookingId || 'N/A' }}
            </h2>

            <p class="mt-4 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              Complete your RSL limousine payment through secure bank transfer and upload your payment proof for verification.
            </p>
          </div>

          <div class="lg:col-span-5">
            <div class="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl">
              <div class="h-1.5 bg-gradient-to-r from-[#0693E3] via-cyan-300 to-green-400"></div>

              <div class="p-5">
                <p class="text-xs uppercase tracking-[0.25em] text-white/50">
                  Amount to Transfer
                </p>

                <p class="mt-2 text-4xl font-black text-white">
                  PKR {{ formattedAmount }}
                </p>

                <div class="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
                  <div class="rounded-2xl bg-white/10 p-3">
                    <p class="font-black text-green-300">Secure</p>
                    <p class="mt-1 text-white/50">Payment</p>
                  </div>

                  <div class="rounded-2xl bg-white/10 p-3">
                    <p class="font-black text-green-300">Manual</p>
                    <p class="mt-1 text-white/50">Review</p>
                  </div>

                  <div class="rounded-2xl bg-white/10 p-3">
                    <p class="font-black text-green-300">RSL</p>
                    <p class="mt-1 text-white/50">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN -->
    <main class="relative mx-auto max-w-7xl px-4 pb-12 -mt-20">
      <div class="grid gap-6 lg:grid-cols-12">
        <!-- LEFT COLUMN -->
        <section class="space-y-6 lg:col-span-5">
          <!-- RIDE SUMMARY -->
          <div class="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div class="h-1.5 bg-gradient-to-r from-[#0693E3] via-[#0878C9] to-[#045A9C]"></div>

            <div class="p-5 md:p-6">
              <div class="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p class="text-xs font-black uppercase tracking-[0.25em] text-[#0693E3]">
                    Ride Summary
                  </p>
                  <h3 class="mt-1 text-2xl font-black">
                    Booking Overview
                  </h3>
                </div>

                <span class="rounded-full bg-[#0693E3]/10 px-4 py-2 text-xs font-black text-[#0693E3]">
                  #{{ bookingId || 'N/A' }}
                </span>
              </div>

              <!-- ROUTE -->
              <div class="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <span class="mt-1 h-4 w-4 rounded-full bg-green-600"></span>
                    <span class="my-2 h-12 w-px bg-slate-300"></span>
                    <span class="h-4 w-4 rounded-full bg-red-600"></span>
                  </div>

                  <div class="flex-1 space-y-5">
                    <div>
                      <p class="text-xs text-slate-400">Pickup Location</p>
                      <p class="break-words font-black text-slate-950">
                        {{ fromLocation || 'N/A' }}
                      </p>
                    </div>

                    <div>
                      <p class="text-xs text-slate-400">Drop Location</p>
                      <p class="break-words font-black text-slate-950">
                        {{ toLocation || 'Hourly Ride / N/A' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- META -->
              <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div class="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <p class="text-xs text-slate-400">Ride Type</p>
                  <p class="mt-1 font-black capitalize">{{ rideType || 'N/A' }}</p>
                </div>

                <div class="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <p class="text-xs text-slate-400">Pickup Date</p>
                  <p class="mt-1 font-black">{{ pickupDate || 'N/A' }}</p>
                </div>

                <div class="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <p class="text-xs text-slate-400">Pickup Time</p>
                  <p class="mt-1 font-black">{{ pickupTime || 'N/A' }}</p>
                </div>

                <div class="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <p class="text-xs text-slate-400">Distance / Hours</p>
                  <p class="mt-1 font-black">
                    {{ distance || (hours ? `${hours} hrs` : 'N/A') }}
                  </p>
                </div>
              </div>

              <!-- AMOUNT -->
              <div class="mt-4 rounded-3xl bg-[#0693E3]/10 p-5 ring-1 ring-[#0693E3]/20">
                <p class="text-xs font-black uppercase tracking-[0.2em] text-[#0693E3]">
                  Total Payable Amount
                </p>

                <p class="mt-2 text-4xl font-black text-[#0693E3]">
                  PKR {{ formattedAmount }}
                </p>

                <p class="mt-2 text-xs text-slate-500">
                  Transfer this exact amount to the RSL account.
                </p>
              </div>
            </div>
          </div>

          <!-- PASSENGER -->
          <div class="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0693E3] via-[#0477BD] to-[#034f8c] p-5 text-white shadow-2xl">
            <div class="flex items-start justify-between gap-4">
              <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black">
                {{ passengerInitial }}
              </div>

              <span class="rounded-full bg-white/15 px-4 py-2 text-xs font-black backdrop-blur">
                Passenger
              </span>
            </div>

            <div class="mt-6">
              <p class="text-xs uppercase tracking-[0.25em] text-white/60">
                Passenger Details
              </p>

              <h3 class="mt-2 break-words text-2xl font-black">
                {{ customerName || 'N/A' }}
              </h3>
            </div>

            <div class="mt-5 grid gap-3 text-sm">
              <div class="rounded-2xl bg-white/10 p-3">
                <p class="text-white/60">Email</p>
                <p class="break-all font-bold">{{ customerEmail || 'N/A' }}</p>
              </div>

              <div class="rounded-2xl bg-white/10 p-3">
                <p class="text-white/60">Phone</p>
                <p class="font-bold">{{ customerContact || 'N/A' }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- RIGHT COLUMN -->
        <section class="lg:col-span-7">
          <div class="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div class="h-1.5 bg-gradient-to-r from-[#0693E3] via-cyan-400 to-green-400"></div>

            <div class="p-5 md:p-6">
              <div class="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p class="text-xs font-black uppercase tracking-[0.25em] text-[#0693E3]">
                    Bank Transfer
                  </p>
                  <h3 class="mt-1 text-2xl font-black">
                    Submit Payment Proof
                  </h3>
                </div>

                <span class="rounded-full bg-green-100 px-4 py-2 text-xs font-black text-green-700">
                  Secure Verification
                </span>
              </div>

              <!-- BANK DETAILS -->
              <div class="rounded-[1.7rem] bg-slate-950 p-5 text-white shadow-xl">
                <div class="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p class="text-xs uppercase tracking-[0.25em] text-white/45">
                      RSL Bank Account
                    </p>
                    <h4 class="mt-1 text-xl font-black">Bank Alfalah</h4>
                  </div>

                  <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0693E3]/20 text-xl font-black text-[#0693E3]">
                    RSL
                  </div>
                </div>

                <div class="space-y-3 text-sm">
                  <div class="flex items-center justify-between gap-4 rounded-2xl bg-white/10 p-3">
                    <span class="text-white/55">Account Title</span>
                    <span class="text-right font-black">RSL Limousine</span>
                  </div>

                  <div class="flex items-center justify-between gap-4 rounded-2xl bg-white/10 p-3">
                    <span class="text-white/55">Account Number</span>

                    <div class="flex items-center gap-2">
                      <span class="font-black text-cyan-300">55095002418458</span>
                      <button
                        type="button"
                        @click="copyAccount"
                        class="rounded-lg bg-[#0693E3] px-3 py-1 text-xs font-black text-white transition hover:bg-[#057FCC]"
                      >
                        {{ copied ? 'Copied' : 'Copy' }}
                      </button>
                    </div>
                  </div>

                  <div class="flex items-center justify-between gap-4 rounded-2xl bg-[#0693E3]/20 p-3 ring-1 ring-[#0693E3]/20">
                    <span class="text-white/65">Amount to Transfer</span>
                    <span class="text-xl font-black text-cyan-300">
                      PKR {{ formattedAmount }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- INSTRUCTIONS -->
              <div class="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p class="text-sm font-black text-blue-800">
                  Payment Instructions
                </p>

                <p class="mt-1 text-xs leading-5 text-blue-700">
                  Transfer the amount to the account above. Then enter your transaction reference and upload a screenshot.
                  RSL admin will verify the proof manually.
                </p>
              </div>

              <!-- REFERENCE -->
              <div class="mt-5">
                <label class="mb-2 block text-sm font-black text-slate-700">
                  Transaction Reference / TID
                </label>

                <input
                  v-model="transferReference"
                  type="text"
                  placeholder="Enter transaction reference number"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#0693E3] focus:bg-white focus:ring-4 focus:ring-[#0693E3]/10"
                />
              </div>

              <!-- SCREENSHOT UPLOAD -->
              <div class="mt-5">
                <label class="mb-2 block text-sm font-black text-slate-700">
                  Payment Screenshot
                </label>

                <div
                  @click="triggerUpload"
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                  class="group cursor-pointer rounded-[1.7rem] border-2 border-dashed bg-slate-50 p-6 text-center transition hover:border-[#0693E3] hover:bg-blue-50"
                  :class="screenshotPreview ? 'border-green-400 bg-green-50' : 'border-slate-300'"
                >
                  <div v-if="!screenshotPreview">
                    <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0693E3]/10 text-3xl text-[#0693E3]">
                      ↑
                    </div>

                    <p class="mt-4 text-sm font-black text-slate-700">
                      Click or drag to upload screenshot
                    </p>

                    <p class="mt-1 text-xs text-slate-400">
                      PNG, JPG, JPEG supported
                    </p>
                  </div>

                  <div v-else>
                    <img
                      :src="screenshotPreview"
                      class="mx-auto max-h-56 rounded-2xl shadow-lg"
                      alt="Payment Screenshot"
                    />

                    <p class="mt-3 text-sm font-black text-green-700">
                      Screenshot uploaded successfully
                    </p>

                    <p class="mt-1 text-xs text-slate-500">
                      Click again to change screenshot
                    </p>
                  </div>
                </div>

                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileChange"
                />
              </div>

              <!-- SUBMIT -->
              <button
                type="button"
                @click="processPayment"
                :disabled="loader"
                class="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0693E3] py-4 font-black text-white shadow-lg shadow-[#0693E3]/20 transition hover:-translate-y-0.5 hover:bg-[#057FCC] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span
                  v-if="loader"
                  class="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"
                ></span>

                <span v-else>Submit Payment Proof</span>
              </button>

              <div class="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
                <span>Your payment proof will be reviewed by RSL admin.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- SUCCESS MODAL -->
    <transition name="fade">
      <div
        v-if="paymentSuccess"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-4 backdrop-blur-sm"
      >
        <div class="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white text-center text-slate-950 shadow-2xl">
          <div class="h-1.5 bg-gradient-to-r from-green-500 via-[#0693E3] to-[#045A9C]"></div>

          <div class="p-7">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <div class="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white">
                <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <p class="text-xs font-black uppercase tracking-[0.25em] text-[#0693E3]">
              RSL Payment
            </p>

            <h3 class="mt-2 text-3xl font-black text-slate-950">
              Payment Submitted
            </h3>

            <p class="mt-2 text-sm leading-6 text-slate-500">
              Your payment proof has been submitted and is now under admin verification.
            </p>

            <div class="mt-5 rounded-2xl bg-slate-50 p-4 text-sm ring-1 ring-slate-100">
              <div class="mb-2 flex justify-between gap-4">
                <span class="text-slate-500">Booking ID</span>
                <span class="font-black">#{{ bookingId }}</span>
              </div>

              <div class="mb-2 flex justify-between gap-4">
                <span class="text-slate-500">Amount</span>
                <span class="font-black text-[#0693E3]">PKR {{ formattedAmount }}</span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-slate-500">Status</span>
                <span class="font-black text-orange-500">Pending Verification</span>
              </div>
            </div>

            <div class="mt-6 grid gap-3">
              <NuxtLink
                :to="`/tracking?booking_id=${bookingId}`"
                class="block w-full rounded-2xl bg-[#0693E3] py-4 font-black text-white shadow-lg shadow-[#0693E3]/20 transition hover:bg-[#057FCC]"
              >
                Track My Ride
              </NuxtLink>

              <NuxtLink
                :to="`/booking-details?id=${bookingId}`"
                class="block w-full rounded-2xl bg-slate-100 py-4 font-black text-slate-700 transition hover:bg-slate-200"
              >
                View Booking
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- TOAST -->
    <transition name="fade">
      <div
        v-if="toast.show"
        :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-700'"
        class="fixed bottom-6 left-4 right-4 z-[9999] mx-auto max-w-xl rounded-2xl py-4 text-center font-bold text-white shadow-2xl"
      >
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

const route = useRoute();
const config = useRuntimeConfig();
const { $useCustomFetch } = useNuxtApp();

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

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
});

const formattedAmount = computed(() => {
  return formatAmount(amount.value);
});

const passengerInitial = computed(() => {
  const name = customerName.value || 'P';
  return String(name).trim().charAt(0).toUpperCase() || 'P';
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

function showToast(message, type = 'success') {
  toast.message = message;
  toast.type = type;
  toast.show = true;

  setTimeout(() => {
    toast.show = false;
  }, 3500);
}

async function copyAccount() {
  try {
    await navigator.clipboard.writeText('55095002418458');
    copied.value = true;
    showToast('Account number copied.', 'success');

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    showToast('Could not copy account number.', 'error');
  }
}

function triggerUpload() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function setScreenshot(file) {
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showToast('Please upload an image file.', 'error');
    return;
  }

  screenshotFile.value = file;

  if (screenshotPreview.value) {
    URL.revokeObjectURL(screenshotPreview.value);
  }

  screenshotPreview.value = URL.createObjectURL(file);
}

function handleFileChange(e) {
  const file = e.target.files?.[0];
  setScreenshot(file);
}

function handleDrop(e) {
  const file = e.dataTransfer.files?.[0];
  setScreenshot(file);
}

async function fetchBookingIfOnlyId() {
  if (!bookingId.value) return;

  const hasFullQueryData =
    amount.value &&
    customerName.value &&
    fromLocation.value &&
    pickupDate.value;

  if (hasFullQueryData) return;

  try {
    const res = await $useCustomFetch(`/api/site/v1/booking/status/${bookingId.value}`);

    if (res.success && res.data) {
      amount.value = res.data.amount || amount.value;
      customerName.value = res.data.name || customerName.value;
      customerEmail.value = res.data.email || customerEmail.value;
      customerContact.value = res.data.contact_no || customerContact.value;
      fromLocation.value = res.data.from_location || fromLocation.value;
      toLocation.value = res.data.to_location || toLocation.value;
      pickupDate.value = res.data.pickup_date || pickupDate.value;
      pickupTime.value = res.data.pickup_time || pickupTime.value;
      rideType.value = res.data.ride_type || rideType.value;
      distance.value = res.data.distance || distance.value;
      hours.value = res.data.hours || hours.value;
    }
  } catch (error) {
    console.log('Fetch Booking Error:', error);
  }
}

function getPaymentApiUrl() {
  const baseUrl = config.public.baseUrl || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${cleanBase}api/site/v1/payment/confirm`;
}

async function processPayment() {
  if (!bookingId.value) {
    showToast('Booking ID missing.', 'error');
    return;
  }

  if (!transferReference.value.trim()) {
    showToast('Please enter transaction reference number.', 'error');
    return;
  }

  if (!screenshotFile.value) {
    showToast('Please upload payment screenshot.', 'error');
    return;
  }

  loader.value = true;

  try {
    const formData = new FormData();

    formData.append('booking_id', bookingId.value);
    formData.append('amount', amount.value);
    formData.append('payment_type', 'bank_transfer');
    formData.append('payment_method', 'bank_transfer');
    formData.append('transfer_reference', transferReference.value);
    formData.append('screenshot', screenshotFile.value);

    const response = await fetch(getPaymentApiUrl(), {
      method: 'POST',
      body: formData
    });

    const confirmRes = await response.json();

    if (confirmRes.success) {
      paymentSuccess.value = true;
    } else {
      showToast(confirmRes.message || 'Payment submission failed.', 'error');
    }
  } catch (error) {
    showToast(error.message || 'Payment submission error.', 'error');
  }

  loader.value = false;
}

onMounted(async () => {
  await fetchBookingIfOnlyId();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>