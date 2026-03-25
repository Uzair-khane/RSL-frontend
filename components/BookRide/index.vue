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
          <GoogleMap
            api-key="AIzaSyCc0FXkMRujB1PIFO39Z1Bg-Xu1AHGSlwE"
            :center="mapCenter"
            :zoom="12"
            ref="googleMap"
            class="w-full h-80 md:h-96"
          >
            <!-- Marker is placed on the map using markerPosition -->
            <Marker
              v-if="origin || mapCenter"
              :options="{ position: origin || mapCenter }"
            />
            <Marker v-if="destination" :options="{ position: destination }" />
          </GoogleMap>
          <p class="mt-1" v-if="booking.distance">
            Total Distance: {{ booking.distance }}
          </p>
        </div>

        <!-- Pickup & Drop Input Fields -->
        <div
          class="mt-4 md:mt-9 md:max-w-[80%] md:flex-nowrap flex-wrap gap-5 md:gap-10 flex items-center md:px-24 px-3"
        >
          <label class="whitespace-nowrap text-xl font-semibold" for=""
            >Ride Type</label
          >
          <select
            class="md:w-60 h-11 rounded-md w-full placeholder-[#B3B3B3] border-[#B3B3B3] px-5 py-2 border"
            name=""
            @change="selectRideType"
            v-model="booking.ride_type"
            id=""
          >
            <option value="hourly">Hourly</option>
            <option value="per_km">Flat</option>
          </select>
        </div>
        <div
          class="mt-8 md:max-w-[80%] md:flex-nowrap flex-wrap gap-2 md:gap-10 flex items-center space-y-5 md:px-24 px-3"
        >
          <label class="whitespace-nowrap text-xl font-semibold" for=""
            >Pickup &
            {{ booking.ride_type == "hourly" ? "Hours" : "Drop" }}</label
          >
          <div class="w-full flex-nowrap flex items-center gap-8 items-center">
            <img class="h-24" src="/images/location.png" alt="" />
            <div class="">
              <input
                id="pickupLocation"
                class="px-5 rounded-md w-full placeholder-[#B3B3B3] border-[#B3B3B3] md:w-96 py-2.5 border"
                type="text"
                v-model="booking.from_location"
                required
                placeholder="Pickup Location"
              />
              <input
                v-if="booking.ride_type != 'hourly'"
                class="md:w-96 rounded-md w-full block placeholder-[#B3B3B3] border-[#B3B3B3] px-5 mt-8 py-2.5 border"
                type="text"
                id="dropLocation"
                placeholder="Drop off"
                v-model="booking.to_location"
                required
              />
              <select
                v-else
                @change="selectHours"
                class="md:w-96 rounded-md h-11 w-full block placeholder-[#B3B3B3] border-[#B3B3B3] px-5 mt-8 py-2.5 border"
                name=""
                v-model="booking.hours"
                id=""
              >
                <option selected value="">Select hours</option>
                <option v-for="(i, index) in 10" :value="i">{{ i }}</option>
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

      <div class="md:max-w-[70%] px-3">
        <button
          type="submit"
          :disabled="loader"
          class="bg-[#404040] h-12 hover:bg-slate-700 transition-all flex justify-center items-center mx-auto block w-full md:w-1/3 mt-10 px-12 py-2.5 rounded-md text-white"
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

const initAutocomplete = useAutoComplete();

function selectHours() {
  getMinimumPrice(booking);
}

const googleMap = ref(null);
const mapCenter = ref({ lat: 25.2048, lng: 55.2708 });
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
  getMinimumPrice(booking);
}
async function selectRideType() {
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
      componentRestrictions: { country: "AE" },
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
    mapCenter.value = coords; // Update map center to pickup location
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
    // Update map center to pickup location
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
