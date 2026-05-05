<template>
  <div
    class="fixed bg-[rgba(0,0,0,0.4)] -top-3 px-3 z-20 text-black flex justify-center items-center inset-0"
  >
    <div
      :class="[!response.message ? 'md:aspect-video' : '']"
      class="w-full md:w-1/2 bg-white relative px-3 rounded-md py-5 md:p-8"
    >
      <div v-if="response.message">
        <h3 class="text-center text-2xl text-slate-700 font-semibold">
          {{ response.success ? "Done!" : "Oops" }}
        </h3>
        <p class="text-center mt-5 text-xl">
          {{
            response.success
              ? response.message
              : "Something went wrong please try again after a while"
          }}
        </p>
        <NuxtLink
          to="/"
          class="mt-5 block hover:bg-blue-600 transition-all text-center px-10 py-2.5 rounded-md text-white bg-blue-500"
          >Go to home</NuxtLink
        >
      </div>
      <div v-else>
        <h3 class="text-center font-semibold text-2xl">Your Ride Details</h3>
        <div class="mt-5 space-y-4">
          <div class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for=""
              ><IconProfile class="w-4 stroke-black h-4 fill-black" />
              <span> Name: </span></label
            >
            <p class="font-semibold">
              {{ booking.name }}
            </p>
          </div>
          <div class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for=""
              ><IconMobile class="w-4 h-4 fill-black" />
              <span> Phone no: </span></label
            >
            <p class="font-semibold">
              {{ booking.contact_no }}
            </p>
          </div>
          <div class="flex gap-2 flex-nowrap">
            <label for=""
              ><IconFromLocation class="w-4 mt-1 h-4 fill-black" />
            </label>
            <div class="flex flex-wrap">
              <span class="md:min-w-32 whitespace-nowrap">
                From location:
              </span>
              <p class="font-semibold">
                {{ booking.from_location }}
              </p>
            </div>
          </div>

          <div v-if="booking.to_location" class="flex gap-2 flex-nowrap">
            <label for=""
              ><IconToLocation class="w-4 mt-1 h-3 fill-black" />
            </label>
            <div class="flex flex-wrap">
              <span class="md:min-w-32 whitespace-nowrap"> To location:: </span>
              <p class="font-semibold">
                {{ booking.to_location }}
              </p>
            </div>
          </div>

          <div v-if="booking.distance" class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for=""
              ><IconFromLocation class="w-4 h-4 fill-black" />
              <span> Distance: </span></label
            >
            <p class="font-semibold">{{ booking.distance }}</p>
          </div>
          <div
            v-if="booking.ride_type == 'hourly'"
            class="flex gap-2 flex-wrap"
          >
            <label class="md:min-w-36 flex items-center gap-2" for=""
              ><IconTime class="w-4 h-4 fill-none stroke-black" />
              <span> Total hours: </span></label
            >
            <p class="font-semibold">{{ booking.hours }}</p>
          </div>
          <div class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for=""
              ><IconCost class="w-4 h-3 fill-black" />
              <span> Total cost: </span></label
            >
            <p class="font-semibold">{{ booking.cost }} PKR</p>
          </div>
          <div class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for=""
              ><IconCalender class="w-4 h-4 stroke-black" />
              <span> Pickup date: </span></label
            >
            <p class="font-semibold">{{ booking.pickup_date }}</p>
          </div>
          <div class="flex gap-2 flex-wrap">
            <label class="md:min-w-36 flex items-center gap-2" for=""
              ><IconTime class="w-4 h-4 fill-none stroke-black" />
              <span> Pickup time: </span></label
            >
            <p class="font-semibold">{{ booking.pickup_time }}</p>
          </div>
        </div>

        <div class="flex gap-3 justify-end">
          <button
            @click="emit('toggle-modal')"
            class="bg-[#0693E3] rounded-md text-center text-white block mt-10 px-8 py-2"
          >
            Cancel
          </button>
          <button
            @click="confirmBooking"
            :disabled="loader"
            class="bg-green-600 w-36 h-10 flex justify-center items-center rounded-md text-center text-white block mt-10"
          >
            <span
              v-if="loader"
              class="animate-spin rounded-full border-2 border-white w-5 block h-5 border-t-blue-500"
            ></span>
            <span v-else>Confirm</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const loader = ref(false);
const emit = defineEmits(['toggle-modal']);
const response = reactive({
  message: "",
  success: false,
});
const props = defineProps({
  booking: {
    type: Object,
    default: {},
  },
});
const { booking } = props;

const { $useCustomFetch } = useNuxtApp();
async function confirmBooking() {
  loader.value = true;
  const data = { ...booking };
  if (!booking.to_location) {
    delete data.to_location;
  }
  if (booking.ride_type != "hourly") {
    delete data.hours;
  }
  if (!booking.distance) {
    delete data.distance;
  }
  try {
    const res = await $useCustomFetch("/api/site/v1/booking/add", {
      method: "POST",
      body: {
        ...data,
      },
    });
    response.success = res.success;
    response.message = res.message;
  } catch (err) {
    console.log(err);
  }
  loader.value = false;
}
</script>
