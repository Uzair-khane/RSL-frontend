<template>
  <div class="">
    <div class="booking-form w-full md:w-[400px]">
      <div class="grid grid-cols-2 w-full bg-[#2A2E31]">
        <button
          @click="toggleType('per_km')"
          :class="[
            type == 'per_km' ? 'text-[#0693E3] font-semibold ' : 'theme-color',
          ]"
          class="relative transition-all hover:text-[#0693E3] flate-rate py-4 border-t-2 border-[#0693E3] uppercase"
        >
          Flat rate
        </button>
        <button
          @click="toggleType('hourly')"
          :class="[
            type == 'hourly' ? 'text-[#0693E3] font-semibold ' : 'theme-color',
          ]"
          class="py-4 transition-all hover:text-[#0693E3] uppercase"
        >
          Hourly
        </button>
      </div>
      <form @submit.prevent="getFreeQuote" class="p-4 text-white space-y-3">
        <div>
          <label for="">From</label>
          <input
            required
            v-model="booking.from_location"
            id="pickupLocation"
            class="w-full focus:outline-none focus:border-[#0693E3] py-3 border rounded-md border-2 border-transparent mt-1 bg-[#2A2E31] px-3"
            type="text"
            placeholder="Enter full pickup address"
          />
        </div>
        <div v-if="type == 'per_km'">
          <label for="">To</label>
          <input
            required
            id="dropLocation"
            v-model="booking.drop_location"
            class="w-full focus:outline-none focus:border-[#0693E3] border rounded-md border-2 border-transparent mt-1 bg-[#2A2E31] py-3 px-2"
            type="text"
            placeholder="Enter drop location"
          />
        </div>
        <div v-else>
          <label for="">Hourly</label>
          <select
            required
            v-model="booking.hours"
            @change="selectHours"
            class="w-full focus:outline-none h-12 focus:border-[#0693E3] border rounded-md border-2 border-transparent mt-1 bg-[#2A2E31] py-3 px-2"
            name=""
            id=""
          >
            <option disabled selected value="">Hourly hire</option>
            <option v-for="(i, index) in 8" :value="i">{{ i }}</option>
          </select>
        </div>
        <div class="relative w-full">
          <label for="">Pickup Date</label>
          <input
            v-model="booking.pickup_date"
            placeholder="dd / mm / yyyy"
            type="date"
            required
            class="w-full mt-1 !text-left pickup-date h-12 border focus:outline-none focus:border-[#0693E3] rounded-md border-2 border-transparent bg-[#2A2E31] !py-3 !px-3"
          />
          <IconCalender
            class="fill-none pointer-events-none top-11 top-10 right-3 absolute stroke-[#0693E3] w-5 h-5"
          />
        </div>
        <div class="relative w-full">
          <label for="">Pickup Time</label>
          <input
            required
            v-model="booking.pickup_time"
            class="w-full mt-1 pickup-date !text-left h-12 border focus:outline-none focus:border-[#0693E3] rounded-md border-2 border-transparent bg-[#2A2E31] !py-3 !px-3"
            type="time"
          />
          <iconTime
            class="fill-none pointer-events-none top-11 top-10 right-3 absolute stroke-[#0693E3] w-6 h-5"
          />
        </div>
        <div class="w-full">
          <button type="submit" @click="toggleModal">
            <img class="w-full cursor-pointer" src="/images/btn.svg" alt="" />
          </button>
        </div>
        <div>
          <div
            v-if="isBookingModal"
            class="fixed bg-[rgba(0,0,0,0.7)] inset-0"
          ></div>
          <div
            :class="[
              isBookingModal
                ? 'top-20 md:top-10 opacity-100 pointer-events-auto'
                : '-top-full pointer-events-none	opacity-0',
            ]"
            class="w-full transition-all duration-500 rounded-md text-black left-0 md:left-[calc(50%-25%)] z-20 md:w-1/2 bg-white fixed px-3 py-8 md:p-8 md:aspect-video"
          >
            <GoogleMap
              api-key="AIzaSyCc0FXkMRujB1PIFO39Z1Bg-Xu1AHGSlwE"
              :center="mapCenter"
              :zoom="12"
              ref="googleMap"
              class="w-full h-40"
            >
              <!-- Marker is placed on the map using markerPosition -->
              <Marker :options="{ position: origin || mapCenter }" />
              <!-- <Marker v-if="destination" :options="{ position: destination }" /> -->
            </GoogleMap>
            <ModalBooking
              @toggleModal="getFreeQuote"
              :booking="booking"
              :origin="origin"
              :destination="destination"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

const mapCenter = ref({ lat: 25.2048, lng: 55.2708 });
const googleMap = ref(null);
const type = ref("per_km");
const isBookingModal = ref(false);
const origin = ref(null);
const destination = ref(null);

const booking = reactive({
  pickup_time: "",
  pickup_date: "",
  from_location: "",
  drop_location: "",
  hours: "",
  distance: "",
  ride_type: "",
  cost: "",
  price: "",
});
const initAutocomplete = useAutoComplete();
const getMinimumPrice = useMinimumPrice();
const getCalculateRoute = useCalculateRoute();

function selectHours() {
  getMinimumPrice(booking);
}

function toggleType(category) {
  type.value = category;
  booking.hours = 1;
  booking.drop_location = "";
  booking.ride_type = category;
  destination.value = null;
  getMinimumPrice(booking);
  getCalculateRoute(origin.value, destination.value, googleMap.value);
}

function getFreeQuote() {
  isBookingModal.value = !isBookingModal.value;
  if (isBookingModal.value) {
    setTimeout(() => {
      document.body.style.overflow = "hidden";
    }, 50);
  } else {
    document.body.style.overflow = "auto";
  }
}

onMounted(() => {
  booking.ride_type = type.value;
  initAutocomplete("pickupLocation", async (coords, name) => {
    booking.from_location = name;
    origin.value = coords;
    mapCenter.value = coords;
    booking.distance = await getCalculateRoute(
      origin.value,
      destination.value,
      googleMap.value
    );
    getMinimumPrice(booking);
  });
  initAutocomplete("dropLocation", async (coords, name) => {
    booking.drop_location = name;
    destination.value = coords;
    booking.distance = await getCalculateRoute(
      origin.value,
      destination.value,
      googleMap.value
    );
    getMinimumPrice(booking);
  });
});
</script>

<style scoped>
.booking-form {
  background-color: rgba(120, 126, 130, 0.8);
}

.vdp__time {
  display: none;
}
.pickup-date::after,
.pickup-date::before {
  display: none !important;
  opacity: 0 !important;
}
input,
select {
  font-size: 14px;
  color: rgb(120, 126, 130);
}
.flate-rate::after {
  content: "";
  position: absolute;
  right: 0;
  width: 1px;
  background-color: #ddd;
  border: 1px solid #ddd;
  height: 25px;
  top: 14px;
  opacity: 0.3;
}
input::placeholder,
.theme-color {
  color: rgb(120, 126, 130);
}
</style>
