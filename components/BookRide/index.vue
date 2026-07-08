<template>
  <div>
    <form @submit.prevent="confirmBookingPopup">
      <HeroSection title="BOOK A RIDE" imagePath="/images/book-ride.png" />

      <Type @getCarId="getCarId" />

      <CustomerInfo
        :name="booking.name"
        :email="booking.email"
        :contact="booking.contact_no"
        @update:name="booking.name = $event"
        @update:email="booking.email = $event"
        @update:contact="booking.contact_no = $event"
      />

      <div>
        <!-- Google Map -->
        <div class="md:px-16 px-3 mt-10">
          <div
            class="overflow-hidden rounded-xl border border-[#B3B3B3]/40 bg-white shadow-sm"
          >
            <GoogleMap
              api-key="AIzaSyCc0FXkMRujB1PIFO39Z1Bg-Xu1AHGSlwE"
              :center="mapCenter"
              :zoom="12"
              ref="googleMap"
              class="w-full h-80 md:h-96"
            >
              <Marker
                v-if="origin || mapCenter"
                :options="{ position: origin || mapCenter }"
              />

              <Marker v-if="destination" :options="{ position: destination }" />
            </GoogleMap>

            <div
              v-if="booking.distance"
              class="flex items-center justify-between border-t border-[#B3B3B3]/30 bg-[#fafafa] px-5 py-3"
            >
              <p class="text-sm text-gray-600">Total Distance</p>

              <p class="text-sm font-semibold text-[#404040]">
                {{ booking.distance }}
              </p>
            </div>
          </div>
        </div>

        <!-- Ride Type -->
        <div
          class="mt-8 md:max-w-[80%] md:flex-nowrap flex-wrap gap-5 md:gap-10 flex items-center md:px-24 px-3"
        >
          <label class="whitespace-nowrap text-xl font-semibold text-[#111]">
            Ride Type
          </label>

          <select
            class="md:w-60 h-11 rounded-md w-full placeholder-[#B3B3B3] border-[#B3B3B3] px-5 py-2 border outline-none focus:border-[#404040]"
            @change="selectRideType"
            v-model="booking.ride_type"
          >
            <option value="hourly">Hourly</option>
            <option value="per_km">Flat</option>
          </select>
        </div>

        <!-- Pickup & Drop Input Fields -->
        <div
          class="mt-8 md:max-w-[80%] md:flex-nowrap flex-wrap gap-2 md:gap-10 flex items-start space-y-5 md:px-24 px-3"
        >
          <label class="whitespace-nowrap text-xl font-semibold text-[#111]">
            Pickup & {{ booking.ride_type == "hourly" ? "Hours" : "Drop" }}
          </label>

          <div class="w-full flex-nowrap flex items-center gap-8">
            <img class="h-24" src="/images/location.png" alt="" />

            <div>
              <input
                id="pickupLocation"
                class="px-5 rounded-md w-full placeholder-[#B3B3B3] border-[#B3B3B3] md:w-96 py-2.5 border outline-none focus:border-[#404040]"
                type="text"
                v-model="booking.from_location"
                required
                placeholder="Pickup Location"
              />

              <input
                v-if="booking.ride_type != 'hourly'"
                class="md:w-96 rounded-md w-full block placeholder-[#B3B3B3] border-[#B3B3B3] px-5 mt-8 py-2.5 border outline-none focus:border-[#404040]"
                type="text"
                id="dropLocation"
                placeholder="Drop off"
                v-model="booking.to_location"
                required
              />

              <select
                v-else
                @change="selectHours"
                class="md:w-96 rounded-md h-11 w-full block placeholder-[#B3B3B3] border-[#B3B3B3] px-5 mt-8 py-2.5 border outline-none focus:border-[#404040]"
                v-model="booking.hours"
              >
                <option selected value="">Select hours</option>

                <option v-for="i in 10" :key="i" :value="i">
                  {{ i }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <DateTime
        :date="booking.pickup_date"
        :time="booking.pickup_time"
        @update:date="booking.pickup_date = $event"
        @update:time="booking.pickup_time = $event"
      />

      <!-- AI Smart Ride Recommendation -->
<div class="md:max-w-[88%] px-3 mt-10 mx-auto">
  <div
    class="rounded-2xl border border-[#d8dee8] bg-gradient-to-br from-[#f8fbff] via-white to-[#f3f7fb] p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)]"
  >
    <!-- Header -->
    <div
      class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <div
          class="inline-flex items-center gap-2 rounded-full border border-[#c7d7ee] bg-[#edf5ff] px-3 py-1 text-xs font-semibold text-[#2f5f98]"
        >
          <span class="h-2 w-2 rounded-full bg-[#5b8fd8]"></span>
          AI Assisted Feature
        </div>

        <h3 class="mt-3 text-2xl font-semibold text-[#1f2937]">
          Smart Ride Recommendation
        </h3>

        <p class="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
          Get a suggested vehicle based on customer booking history, ride type,
          pickup/drop location, and active vehicle pricing.
        </p>
      </div>

      <button
        type="button"
        @click="getSmartRecommendation"
        :disabled="aiLoading"
        class="h-12 rounded-lg bg-[#404040] h-12 hover:bg-slate-700 transition-all  px-6 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#3f5d7c] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ aiLoading ? "Checking..." : "Get Recommendation" }}
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-if="!aiRecommendation && !aiError"
      class="mt-5 rounded-xl border border-[#d8dee8] bg-white/80 px-5 py-4"
    >
      <p class="text-sm text-gray-600">
        Enter customer email, pickup location, and drop-off location. Then click
        <span class="font-semibold  text-[#4f6f92]">Get Recommendation</span>.
      </p>
    </div>

    <!-- Error Message -->
    <p
      v-if="aiError"
      class="mt-5 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-600"
    >
      {{ aiError }}
    </p>

    <!-- Recommendation Result -->
    <div
      v-if="aiRecommendation"
      class="mt-6 rounded-2xl border border-[#d8dee8] bg-white p-5 shadow-sm"
    >
      <!-- Top Result Row -->
      <div
        class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
      >
        <div>
          <div
            class="inline-flex items-center rounded-full bg-[#eaf7ef] px-3 py-1 text-xs font-semibold text-[#2f7d4f]"
          >
            Recommended Vehicle
          </div>

          <h4 class="mt-3 text-2xl font-semibold text-[#1f2937]">
            {{ aiRecommendation.recommended_car?.title }}
          </h4>

          <div class="mt-3 flex flex-wrap gap-2">
            <span
              class="rounded-full border border-[#d8dee8] bg-[#f8fbff] px-3 py-1 text-xs font-medium text-gray-600"
            >
              Vehicle Type:
              {{ aiRecommendation.recommended_car?.vehicle_type || "N/A" }}
            </span>

            <span
              class="rounded-full border border-[#d8dee8] bg-[#f8fbff] px-3 py-1 text-xs font-medium text-gray-600"
            >
              {{ aiRecommendation.recommendation_type }}
            </span>
          </div>
        </div>

        <div
          class="rounded-xl border border-[#cde8d4] bg-[#f2fbf5] px-6 py-4 text-center"
        >
          <p class="text-sm text-[#4c7a5a]">Confidence</p>

          <p class="mt-1 text-3xl font-semibold text-[#2f7d4f]">
            {{ aiRecommendation.confidence }}%
          </p>
        </div>
      </div>

      <!-- Price Cards -->
      <div class="mt-5 grid gap-4 md:grid-cols-3">
        <div
          class="rounded-xl border border-[#d8dee8] bg-[#f8fbff] p-4"
        >
          <p class="text-sm text-gray-500">Per KM Price</p>

          <p class="mt-1 text-xl font-semibold text-[#1f2937]">
            Rs {{ aiRecommendation.recommended_price?.km_price || "N/A" }}
          </p>
        </div>

        <div
          class="rounded-xl border border-[#d8dee8] bg-[#f8fbff] p-4"
        >
          <p class="text-sm text-gray-500">Hourly Price</p>

          <p class="mt-1 text-xl font-semibold text-[#1f2937]">
            Rs {{ aiRecommendation.recommended_price?.hourly_price || "N/A" }}
          </p>
        </div>

        <div
          class="rounded-xl border border-[#d8dee8] bg-[#f8fbff] p-4"
        >
          <p class="text-sm text-gray-500">Previous Bookings</p>

          <p class="mt-1 text-xl font-semibold text-[#1f2937]">
            {{ aiRecommendation.previous_bookings_count || 0 }}
          </p>
        </div>
      </div>

      <!-- Reasons -->
      <div
        v-if="aiRecommendation.reasons?.length"
        class="mt-5 rounded-xl border border-[#d8dee8] bg-[#fbfdff] p-4"
      >
        <p class="text-sm font-semibold text-[#1f2937]">
          Why this vehicle?
        </p>

        <ul class="mt-3 space-y-2 text-sm text-gray-600">
          <li
            v-for="reason in aiRecommendation.reasons"
            :key="reason"
            class="flex items-start gap-2"
          >
            <span class="mt-2 h-1.5 w-1.5 rounded-full bg-[#4f6f92]"></span>
            <span>{{ reason }}</span>
          </li>
        </ul>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <button
          type="button"
          @click="applyRecommendation"
          class="h-12 rounded-lg bg-[#404040] h-12 hover:bg-slate-700 transition-all  px-6 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#3f5d7c]"
        >
          Use Recommended Vehicle
        </button>

        <!-- <button
          type="button"
          @click="getSmartRecommendation"
          class="h-12 rounded-lg border border-[#4f6f92] bg-white px-6 text-sm font-medium text-[#4f6f92] transition-all hover:bg-[#eef5fc]"
        >
          Recheck Recommendation
        </button> -->

        <p
          v-if="aiAppliedMessage"
          class="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {{ aiAppliedMessage }}
        </p>
      </div>
    </div>
  </div>
</div>

      <div class="md:max-w-[70%] px-3 mx-auto">
        <button
          type="submit"
          :disabled="loader"
          class="bg-[#404040] h-12 hover:bg-slate-700 transition-all flex justify-center items-center mx-auto block w-full md:w-1/3 mt-10 px-12 py-2.5 rounded-md text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Book ride
        </button>
      </div>
    </form>

    <ModalBookingConfirmation
      v-if="isModal"
      :booking="booking"
      @toggle-modal="confirmBookingPopup"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import Type from "./type.vue";
import CustomerInfo from "./CustomerInfo";
import DateTime from "./DateTime.vue";

const route = useRoute();

const loader = ref(false);
const isModal = ref(false);
const origin = ref(null);
const destination = ref(null);

const aiLoading = ref(false);
const aiError = ref("");
const aiRecommendation = ref(null);
const aiAppliedMessage = ref("");

const initAutocomplete = useAutoComplete();

function selectHours() {
  getMinimumPrice(booking);
}

const googleMap = ref(null);
const mapCenter = ref({ lat: 34.0012, lng: 71.5249 });

onBeforeUnmount(() => {
  Object.keys(booking).forEach((key) => {
    booking[key] = "";
  });

  document.body.style.overflow = "auto";
});

const booking = reactive({
  car_id: "",
  name: "",
  email: "",
  contact_no: "",
  from_location: route.query.address || "",
  to_location: route.query.drop || "",
  pickup_time: route.query.time || "",
  pickup_date: route.query.date || "",
  ride_type: route.query.ride_type || "per_km",
  hours: route.query.hours || "",
  cost: "",
  distance: route.query.distance || "",
  price: "",
});

const getMinimumPrice = useMinimumPrice();
const getCalculateRoute = useCalculateRoute();

function getCarId(id) {
  booking.car_id = id;
  aiAppliedMessage.value = "";
  getMinimumPrice(booking);
}

async function getSmartRecommendation() {
  aiError.value = "";
  aiRecommendation.value = null;
  aiAppliedMessage.value = "";

  if (!booking.email) {
    aiError.value = "Please enter customer email first.";
    return;
  }

  if (!booking.from_location) {
    aiError.value = "Please enter pickup location first.";
    return;
  }

  if (booking.ride_type !== "hourly" && !booking.to_location) {
    aiError.value = "Please enter drop-off location first.";
    return;
  }

  aiLoading.value = true;

  try {
    const { $useCustomFetch } = useNuxtApp();

    const response = await $useCustomFetch("/api/site/v1/ai/recommend-ride", {
      method: "POST",
      body: {
        email: booking.email,
        ride_type: booking.ride_type,
        from_location: booking.from_location,
        to_location: booking.to_location,
      },
    });

    if (!response.success) {
      aiError.value = response.message || "Unable to generate recommendation.";
      return;
    }

    aiRecommendation.value = response.data;
  } catch (error) {
    aiError.value =
      error?.data?.message || error?.message || "Recommendation request failed.";
  } finally {
    aiLoading.value = false;
  }
}

async function applyRecommendation() {
  aiAppliedMessage.value = "";
  aiError.value = "";

  if (!aiRecommendation.value?.recommended_car?.id) {
    aiError.value = "No recommended vehicle found.";
    return;
  }

  const recommendedCar = aiRecommendation.value.recommended_car;
  const recommendedPrice = aiRecommendation.value.recommended_price;

  booking.car_id = recommendedCar.id;

  if (recommendedPrice) {
    booking.price = recommendedPrice;

    if (booking.ride_type === "per_km" && booking.distance) {
      const numericDistance = parseFloat(
        String(booking.distance).replace(/[^\d.]/g, "")
      );

      const kmPrice = Number(recommendedPrice.km_price || 0);

      if (numericDistance && kmPrice) {
        booking.cost = numericDistance * kmPrice;
      }
    }

    if (booking.ride_type === "hourly" && booking.hours) {
      const hours = Number(booking.hours || 0);
      const hourlyPrice = Number(recommendedPrice.hourly_price || 0);

      if (hours && hourlyPrice) {
        booking.cost = hours * hourlyPrice;
      }
    }
  }

  await getMinimumPrice(booking);

  aiAppliedMessage.value = `${recommendedCar.title} selected successfully. You can now continue booking.`;
}

async function selectRideType() {
  aiAppliedMessage.value = "";
  aiRecommendation.value = null;
  aiError.value = "";

  if (booking.ride_type == "hourly") {
    booking.to_location = "";
    destination.value = null;
    booking.distance = null;
    getCalculateRoute();

    const pickupCoords = await geocodePlaceplaceName(booking.from_location);
    mapCenter.value = pickupCoords;

    getMinimumPrice(booking);
  }
}

function confirmBookingPopup() {
  isModal.value = !isModal.value;

  if (isModal.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

async function geocodePlaceplaceName(placename) {
  try {
    const geocoder = new google.maps.Geocoder();

    const result = await geocoder.geocode({
      address: placename,
      componentRestrictions: { country: "PK" },
    });

    if (result.results.length) {
      const location = result.results[0].geometry.location;

      return {
        lat: location.lat(),
        lng: location.lng(),
      };
    }
  } catch (error) {
    console.error("Geocoding error:", error);
  }

  return null;
}

onMounted(async () => {
  initAutocomplete("pickupLocation", async (coords, name) => {
    booking.from_location = name;
    aiAppliedMessage.value = "";
    aiRecommendation.value = null;
    aiError.value = "";

    if (origin.value) {
      origin.value = null;
    }

    origin.value = coords;

    const distance = await getCalculateRoute(
      origin.value,
      destination.value,
      googleMap.value
    );

    booking.distance = distance;
    getMinimumPrice(booking);
    mapCenter.value = coords;
  });

  if (booking.from_location && !booking.to_location) {
    const pickupCoords = await geocodePlaceplaceName(booking.from_location);
    mapCenter.value = pickupCoords;
  }

  if (booking.from_location && booking.to_location) {
    const pickupCoords = await geocodePlaceplaceName(booking.from_location);
    const dropCoords = await geocodePlaceplaceName(booking.to_location);

    origin.value = pickupCoords;
    destination.value = dropCoords;

    const distance = await getCalculateRoute(
      origin.value,
      destination.value,
      googleMap.value
    );

    booking.distance = distance;
  }

  initAutocomplete("dropLocation", async (coords, name) => {
    booking.to_location = name;
    aiAppliedMessage.value = "";
    aiRecommendation.value = null;
    aiError.value = "";

    if (destination.value) {
      destination.value = null;
    }

    destination.value = coords;

    const distance = await getCalculateRoute(
      origin.value,
      destination.value,
      googleMap.value
    );

    booking.distance = distance;
    getMinimumPrice(booking);
  });
});
</script>

<style scoped>
.pickup-date {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.vdp__time {
  display: none;
}

.pickup-date::after,
.pickup-date::before {
  display: none !important;
  opacity: 0 !important;
}
</style>