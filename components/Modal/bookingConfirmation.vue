<template>
  <div class="fixed bg-[rgba(0,0,0,0.4)] -top-3 px-3 z-20 text-black flex justify-center items-center inset-0">
    <div class="w-full md:w-1/2 bg-white relative px-3 rounded-md py-5 md:p-8">

      <!-- After Booking Response -->
      <div v-if="response.message">

        <!-- Success -->
        <div v-if="response.success">
          <div class="text-center">
            <div class="text-5xl mb-3">🎉</div>
            <h3 class="text-2xl font-bold text-green-600">Booking Confirmed!</h3>
            <p class="text-gray-500 mt-2 text-sm">
              Your ride has been booked successfully. Please choose your payment option.
            </p>
          </div>

          <!-- Booking Summary -->
          <div class="bg-gray-50 rounded-xl p-4 mt-5 text-sm space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-500">Booking ID:</span>
              <span class="font-bold">#{{ response.booking_id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">From:</span>
              <span class="font-semibold">{{ booking.from_location }}</span>
            </div>
            <div class="flex justify-between" v-if="booking.to_location">
              <span class="text-gray-500">To:</span>
              <span class="font-semibold">{{ booking.to_location }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Date:</span>
              <span class="font-semibold">{{ booking.pickup_date }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Time:</span>
              <span class="font-semibold">{{ booking.pickup_time }}</span>
            </div>
            <div class="flex justify-between border-t pt-2 mt-2">
              <span class="text-gray-500">Total Amount:</span>
              <span class="font-bold text-[#0693E3] text-lg">PKR {{ booking.cost }}</span>
            </div>
          </div>

          <!-- Options -->
          <div class="mt-6 space-y-3">
            <p class="text-center text-sm font-semibold text-gray-600 mb-2">
              Choose an option:
            </p>

            <!-- Pay Now -->
            <NuxtLink :to="paymentUrl"
              class="flex items-center justify-center gap-3 w-full text-center bg-[#0693E3] hover:bg-blue-600 transition-all text-white py-3.5 rounded-xl font-semibold shadow-md">
              <span>💳</span>
              <div class="text-left">
                <p class="font-bold">Pay Now (Online Transfer)</p>
                <p class="text-xs opacity-80">Bank Alfalah transfer + screenshot</p>
              </div>
            </NuxtLink>

            <!-- Pay Later -->
            <NuxtLink :to="trackingUrl"
              class="flex items-center justify-center gap-3 w-full text-center bg-green-600 hover:bg-green-700 transition-all text-white py-3.5 rounded-xl font-semibold shadow-md">
              <span>🚗</span>
              <div class="text-left">
                <p class="font-bold">Pay Later (Cash with Driver)</p>
                <p class="text-xs opacity-80">Pay when driver arrives</p>
              </div>
            </NuxtLink>

            <!-- Track Ride -->
            <NuxtLink :to="trackingUrl"
              class="flex items-center justify-center gap-3 w-full text-center bg-purple-600 hover:bg-purple-700 transition-all text-white py-3.5 rounded-xl font-semibold shadow-md">
              <span>📍</span>
              <div class="text-left">
                <p class="font-bold">Track My Ride</p>
                <p class="text-xs opacity-80">See live driver location</p>
              </div>
            </NuxtLink>
            <!-- SOS Emergency Button -->
            <button @click="showSosModal = true"
              class="flex items-center justify-center gap-3 w-full text-center bg-red-600 hover:bg-red-700 transition-all text-white py-3.5 rounded-xl font-semibold shadow-md">
              <span>🆘</span>
              <div class="text-left">
                <p class="font-bold">SOS Emergency</p>
                <p class="text-xs opacity-80">Press for immediate help</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Error -->
        <div v-else>
          <h3 class="text-center text-2xl text-slate-700 font-semibold">Oops!</h3>
          <p class="text-center mt-5 text-xl text-gray-500">
            Something went wrong. Please try again after a while.
          </p>
          <NuxtLink to="/"
            class="mt-5 block hover:bg-blue-600 transition-all text-center px-10 py-2.5 rounded-md text-white bg-blue-500">
            Go to home</NuxtLink>
        </div>

      </div>

      <!-- Booking Details — Before Confirm -->
      <div v-else>
        <h3 class="text-center font-semibold text-2xl">Your Ride Details</h3>
        <div class="mt-5 space-y-4">
          <div class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for="">
              <IconProfile class="w-4 stroke-black h-4 fill-black" />
              <span>Name:</span>
            </label>
            <p class="font-semibold">{{ booking.name }}</p>
          </div>

          <div class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for="">
              <IconMobile class="w-4 h-4 fill-black" />
              <span>Phone:</span>
            </label>
            <p class="font-semibold">{{ booking.contact_no }}</p>
          </div>

          <div class="flex gap-2 flex-nowrap">
            <label for="">
              <IconFromLocation class="w-4 mt-1 h-4 fill-black" />
            </label>
            <div class="flex flex-wrap">
              <span class="md:min-w-32 whitespace-nowrap">From location:</span>
              <p class="font-semibold">{{ booking.from_location }}</p>
            </div>
          </div>

          <div v-if="booking.to_location" class="flex gap-2 flex-nowrap">
            <label for="">
              <IconToLocation class="w-4 mt-1 h-3 fill-black" />
            </label>
            <div class="flex flex-wrap">
              <span class="md:min-w-32 whitespace-nowrap">To location:</span>
              <p class="font-semibold">{{ booking.to_location }}</p>
            </div>
          </div>

          <div v-if="booking.distance" class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for="">
              <IconFromLocation class="w-4 h-4 fill-black" />
              <span>Distance:</span>
            </label>
            <p class="font-semibold">{{ booking.distance }}</p>
          </div>

          <div v-if="booking.ride_type == 'hourly'" class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for="">
              <IconTime class="w-4 h-4 fill-none stroke-black" />
              <span>Total hours:</span>
            </label>
            <p class="font-semibold">{{ booking.hours }}</p>
          </div>

          <div class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for="">
              <IconCost class="w-4 h-3 fill-black" />
              <span>Total cost:</span>
            </label>
            <p class="font-semibold text-[#0693E3] font-bold">PKR {{ booking.cost }}</p>
          </div>

          <div class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for="">
              <IconCalender class="w-4 h-4 stroke-black" />
              <span>Pickup date:</span>
            </label>
            <p class="font-semibold">{{ booking.pickup_date }}</p>
          </div>

          <div class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for="">
              <IconTime class="w-4 h-4 fill-none stroke-black" />
              <span>Pickup time:</span>
            </label>
            <p class="font-semibold">{{ booking.pickup_time }}</p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3 justify-end mt-6">
          <button @click="emit('toggle-modal')" class="bg-[#0693E3] rounded-md text-center text-white block px-8 py-2">
            Cancel
          </button>
          <button @click="confirmBooking" :disabled="loader"
            class="bg-green-600 w-36 h-10 flex justify-center items-center rounded-md text-center text-white block">
            <span v-if="loader"
              class="animate-spin rounded-full border-2 border-white w-5 block h-5 border-t-blue-500"></span>
            <span v-else>Confirm Booking</span>
          </button>
        </div>
      </div>

    </div>
  </div>
  <!-- SOS Modal -->
  <div v-if="showSosModal" class="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
    <div class="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-10">

      <!-- Header -->
      <div class="text-center mb-5">
        <div class="text-6xl mb-2">🆘</div>
        <h3 class="text-2xl font-bold text-red-600">Emergency Help</h3>
        <p class="text-gray-500 text-sm mt-1">Booking #{{ response.booking_id }}</p>
      </div>

      <!-- SOS Send Button -->
      <button @click="triggerSOS" :disabled="sosLoader"
        class="w-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white py-4 rounded-2xl font-bold text-lg mb-3 flex items-center justify-center gap-2">
        <span v-if="!sosLoader">🚨 Send SOS Alert to Admin</span>
        <span v-else class="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6 block"></span>
      </button>

      <!-- Breakdown Button -->
      <button @click="reportBreakdown" :disabled="breakdownLoader"
        class="w-full bg-yellow-500 hover:bg-yellow-600 active:scale-95 transition-all text-white py-4 rounded-2xl font-bold text-lg mb-3 flex items-center justify-center gap-2">
        <span v-if="!breakdownLoader">🔧 Report Breakdown</span>
        <span v-else class="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6 block"></span>
      </button>

      <!-- Call Office -->

      <a href="tel:+923001234567" class="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg mb-3 flex items-center
      justify-center gap-2 block text-center">
        Call RSL Office
      </a>

      <!-- Fake Call -->
      <button @click="startFakeCall"
        class="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold text-lg mb-3">
        Fake Call (Safety Trick)
      </button>

      <!-- Close -->
      <button @click="showSosModal = false" class="w-full bg-gray-100 text-gray-600 py-3 rounded-2xl font-semibold">
        Close
      </button>

    </div>
  </div>

  <!-- Fake Call Screen -->
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

  <!-- Toast -->
  <transition name="fade">
    <div v-if="toast.show" :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-700'"
      class="fixed bottom-6 left-4 right-4 text-white text-center py-4 rounded-2xl shadow-2xl z-50 font-semibold">
      {{ toast.message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const loader = ref(false);
const emit = defineEmits(['toggle-modal']);
const showSosModal = ref(false);
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
      body: {
        booking_id: response.booking_id,
        customer_id: booking.email,
        latitude: lat,
        longitude: lng
      }
    });
    if (res.success) {
      showToast('🆘 SOS sent! Admin notified immediately!', 'success');
      showSosModal.value = false;
    } else {
      showToast('❌ Failed. Call office: +92 300 1234567', 'error');
    }
  } catch {
    showToast('❌ Error. Call office: +92 300 1234567', 'error');
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
        booking_id: response.booking_id,
        customer_id: booking.email,
        latitude: lat,
        longitude: lng
      }
    });
    if (res.success) {
      showToast('🔧 Breakdown reported! Help coming.', 'success');
      showSosModal.value = false;
    } else {
      showToast('❌ Failed. Call office directly.', 'error');
    }
  } catch {
    showToast('❌ Error. Call office: +92 300 1234567', 'error');
  }
  breakdownLoader.value = false;
}

function startFakeCall() {
  showSosModal.value = false;
  fakeCallActive.value = true;
  setTimeout(() => fakeCallActive.value = false, 30000);
}
const response = reactive({
  message: "",
  success: false,
  booking_id: null,
  amount: null,
});

const props = defineProps({
  booking: {
    type: Object,
    default: {},
  },
});

const { booking } = props;
const { $useCustomFetch } = useNuxtApp();

// Payment URL
const paymentUrl = computed(() => {
  return `/payment?booking_id=${response.booking_id}&amount=${response.amount}&name=${encodeURIComponent(booking.name)}&email=${encodeURIComponent(booking.email)}&contact=${encodeURIComponent(booking.contact_no)}&from_location=${encodeURIComponent(booking.from_location)}&to_location=${encodeURIComponent(booking.to_location || '')}&pickup_date=${encodeURIComponent(booking.pickup_date)}&pickup_time=${encodeURIComponent(booking.pickup_time)}&ride_type=${encodeURIComponent(booking.ride_type)}&distance=${encodeURIComponent(booking.distance || '')}&hours=${encodeURIComponent(booking.hours || '')}`;
});

// Tracking URL
const trackingUrl = computed(() => {
  return `/tracking?booking_id=${response.booking_id}&from_location=${encodeURIComponent(booking.from_location)}&to_location=${encodeURIComponent(booking.to_location || '')}&customer_id=${encodeURIComponent(booking.email)}`;
});

async function confirmBooking() {
  loader.value = true;
  const data = { ...booking };

  if (!booking.to_location) delete data.to_location;
  if (booking.ride_type != "hourly") delete data.hours;
  if (!booking.distance) delete data.distance;

  try {
    const res = await $useCustomFetch("/api/site/v1/booking/add", {
      method: "POST",
      body: { ...data },
    });

    if (res.success) {
      response.success = true;
      response.message = res.message;
      response.booking_id = res.booking_id;
      response.amount = booking.cost;
    } else {
      response.success = false;
      response.message = res.message || "Something went wrong.";
    }

  } catch (err) {
    response.success = false;
    response.message = "Something went wrong.";
    console.log(err);
  }

  loader.value = false;
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