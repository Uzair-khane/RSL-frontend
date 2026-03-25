<template>
  <div class="mt-14 text-white md:px-20 px-3 py-20 banner">
    <h3 class="font-semibold text-center text-2xl font-outfit">Get in Touch</h3>

    <div class="mt-4 md:max-w-[80%] mx-auto">
      <h3 class="mt-6 font-outfit text-xl font-semibold">Leave us a message</h3>
      <div class="mt-4 flex gap-10 lg:flex-nowrap flex-wrap">
        <Form class="md:flex-1" />
        <Address class="flex-1" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Form from "./Form";
import Address from "./Address";
</script>

<style scoped>
.banner {
  background: url("/images/get-in-touch.png") center no-repeat;
  background-size: cover;
  width: 100%;
}
</style>
