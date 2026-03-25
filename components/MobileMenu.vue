<template>
  <div
    class="lg:hidden fixed transition-all top-0 z-20 block shadow-lg bg-white w-full h-screen transition-all duration-200 ease-in-out"
  >
    <div class="flex px-6 justify-between items-center">
      <span @click="$emit('menutoggle')" class="link mt-4 cursor-pointer">
        <img src="/images/logo.svg" alt="" />
      </span>
      <IconClose class="w-5 h-5" @click="$emit('menutoggle')" />
    </div>
    <ul class="py-5">
      <NuxtLink
        to="/"
        @click.native="$emit('menutoggle')"
        class="text-lg capitalize block cursor-pointer cursor-pointer border-b border-x-black py-5 px-6"
      >
        Home
      </NuxtLink>

      <NuxtLink
        @click.native="$emit('menutoggle')"
        to="/fleet"
        class="text-lg capitalize block cursor-pointer cursor-pointer border-b border-x-black py-5 px-6"
      >
        Our fleet
      </NuxtLink>
      <NuxtLink
        @click.native="$emit('menutoggle')"
        to="/services"
        class="text-lg capitalize block cursor-pointer cursor-pointer border-b border-x-black py-5 px-6"
      >
        our services
      </NuxtLink>
      <NuxtLink
        @click.native="$emit('menutoggle')"
        to="/about-us"
        class="text-lg capitalize block cursor-pointer cursor-pointer border-b border-x-black py-5 px-6"
      >
        who we are
      </NuxtLink>
      <NuxtLink
        @click.native="$emit('menutoggle')"
        to="/events"
        class="text-lg block capitalize cursor-pointer cursor-pointer border-b border-x-black py-5 px-6"
      >
        news and events
      </NuxtLink>
      <NuxtLink
        @click.native="$emit('menutoggle')"
        to="/contact-us"
        class="text-lg capitalize block cursor-pointer cursor-pointer border-b border-x-black py-5 px-6"
      >
        contact us
      </NuxtLink>
    </ul>
  </div>
</template>

<script setup>
const emit = defineEmits(["menutoggle"]);
</script>
