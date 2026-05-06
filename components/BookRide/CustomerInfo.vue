<template>
  <div class="mt-14 md:max-w-[80%] space-y-5 md:px-24 px-3">
    <div class="flex w-full md:flex-nowrap flex-wrap gap-2 items-center">
      <label class="md:min-w-40 font-bold" for="">Name</label>
      <input class="px-5 w-full rounded-md md:w-96 py-2.5 border placeholder-[#B3B3B3] border-[#B3B3B3]" type="text"
        placeholder="Enter name" required :value="name" @input="$emit('update:name', $event.target.value)" />
    </div>
    <div class="flex w-full md:flex-nowrap flex-wrap gap-2 items-center">
      <label class="md:min-w-40 font-bold" for="">Email</label>
      <input class="md:w-96 rounded-md w-full placeholder-[#B3B3B3] border-[#B3B3B3] px-5 py-2.5 border" type="text"
        required placeholder="Enter email" :value="email" @input="$emit('update:email', $event.target.value)" />
    </div>
    <div class="flex md:flex-nowrap flex-wrap w-full gap-2 items-center">
      <label for="" class="whitespace-nowrap font-bold md:min-w-40">Mobile Number</label>
      <div class="flex w-full gap-2">
        <input placeholder="+92" readonly
          class="w-14 rounded-md placeholder-slate-900 font-semibold border-[#B3B3B3] py-2.5 px-2 border" type="text"
          required />
        <input class="md:w-80 rounded-md w-full placeholder-[#B3B3B3] border-[#B3B3B3] px-5 py-2.5 w-full border"
          Type="text" placeholder="" :value="contact" @input="$emit('update:contact', $event.target.value)" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits } from "vue";

// Accept props from parent
const props = defineProps({
  name: String,
  email: String,
  contact: String,
});

// Emit updates to parent
const emit = defineEmits(["update:name", "update:email", "update:contact"]);
</script>
