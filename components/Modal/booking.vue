<template>
  <div class="text-black">
    <IconClose @click="emit('toggleModal')" class="w-5 cursor-pointer h-5 absolute right-2 top-1" />

    <h3 class="text-center font-semibold mt-2 text-2xl">Booking Details</h3>
    <div class="mt-3 space-y-4 text-sm">
      <div class="flex gap-2 flex-wrap">
        <label class="min-w-28 flex items-center gap-2" for="">
          <IconFromLocation class="w-4 h-4 fill-black" />
          <span> From location: </span>
        </label>
        <p class="font-semibold">
          {{ booking.from_location }}
        </p>
      </div>
      <div v-if="booking.drop_location" class="flex gap-2 flex-wrap">
        <label class="min-w-28 flex items-center gap-2" for="">
          <IconToLocation class="w-4 h-3 fill-black" />
          <span> To location: </span>
        </label>
        <p class="font-semibold">
          {{ booking.drop_location }}
        </p>
      </div>
      <div v-if="booking.distance" class="flex gap-2 flex-wrap">
        <label class="min-w-28 flex items-center gap-2" for="">
          <IconFromLocation class="w-4 h-4 fill-black" />
          <span> Distance: </span>
        </label>
        <p class="font-semibold">{{ booking.distance }}</p>
      </div>
      <div class="flex gap-2 flex-wrap">
        <!-- <label class="min-w-28 flex items-center gap-2" for="">
          <IconCost class="w-4 h-3 fill-black" />
          <span> Total cost: </span>
        </label> -->
        <!-- <p class="font-semibold">PKR {{ booking.cost }}</p> -->
      </div>
      <div class="flex gap-2 flex-wrap">
        <label class="min-w-28 flex items-center gap-2" for="">
          <IconCalender class="w-4 h-4 stroke-black" />
          <span> Pickup date: </span>
        </label>
        <p class="font-semibold">{{ booking.pickup_date }}</p>
      </div>
      <div class="flex gap-2 flex-wrap">
        <label class="min-w-28 flex items-center gap-2" for="">
          <IconTime class="w-4 h-4 fill-none stroke-black" />
          <span> Pickup time: </span>
        </label>
        <p class="font-semibold">{{ booking.pickup_time }}</p>
      </div>
      <div v-if="booking.hours" class="flex gap-2 flex-wrap">
        <label class="min-w-28 flex items-center gap-2" for="">
          <IconTime class="w-4 h-4 fill-none stroke-black" />
          <span> Total hours: </span>
        </label>
        <p class="font-semibold">{{ booking.hours }}</p>
      </div>
    </div>
    <button @click="bookNow"
      class="bg-slate-600 rounded-md transition-all hover:bg-slate-800 w-full text-center text-white block mt-10 px-10 py-2.5">
      Book ride now
    </button>
  </div>
</template>

<script setup>
const router = useRouter();
import { ref, toRefs, onMounted } from "vue";
const emit = defineEmits(["toggleModal"]);
const props = defineProps({
  booking: {
    type: Object,
    default: {},
  },
});

const { booking } = props;

function bookNow() {
  const queryData = {
    address: booking.from_location,
    date: booking.pickup_date,
    time: booking.pickup_time,
    ride_type: booking.ride_type,
  };
  if (booking.drop_location) {
    queryData.drop = booking.drop_location;
  }
  if (booking.hours) {
    queryData.hours = booking.hours;
  }

  if (booking.distance) {
    queryData.distance = booking.distance;
  }

  router.push({
    path: "/book-ride",
    query: { ...queryData },
  });
}
</script>
