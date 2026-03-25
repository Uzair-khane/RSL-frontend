<template>
  <div class="md:px-16 px-3 mt-14">
    <div
      class="mx-auto space-y-5 md:w-3/5 shadow-xl px-3 md:px-16 py-5 md:py-12"
    >
      <input
        type="text"
        placeholder="Name"
        class="w-full border border-[#D9D9D9] rounded-md px-5 py-2.5"
      />
      <input
        type="text"
        placeholder="Email (optional)"
        class="w-full border border-[#D9D9D9] rounded-md px-5 py-2.5"
      />
      <div class="flex gap-3">
        <input
          placeholder="971"
          type="text"
          class="w-28 border px-5 border-[#D9D9D9] rounded-md py-2.5"
        />
        <input
          placeholder="Mobile number"
          type="text"
          class="w-full border px-5 border-[#D9D9D9] rounded-md py-2.5"
        />
      </div>
      <div v-if="partner">
        <label for="" class="font-bold">Select Vehicle</label>
        <input
          class="w-full mt-2 border border-[#D9D9D9] px-5 rounded-md py-2.5"
          type="text"
          placeholder="Select vehicle"
        />
      </div>
      <div>
        <label for="" class="font-bold">Passport (or) Visa copy*</label>
        <input
          class="w-full mt-2 border border-[#D9D9D9] px-5 rounded-md py-2.5"
          type="file"
        />
      </div>
      <div>
        <label for="" class="font-bold">Driver License*</label>
        <input
          class="w-full mt-2 border border-[#D9D9D9] px-5 rounded-md py-2.5"
          type="file"
        />
      </div>
      <button class="mt-5 bg-[#0693E3] py-2.5 w-full rounded-md text-white">
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  partner: {
    default: false,
    type: Boolean,
  },
});
const { partner } = props;
</script>
