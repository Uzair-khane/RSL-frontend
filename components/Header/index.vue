<template>
  <div>
    <TopBar />
    <header class="lg:px-10 px-4 bg-[#000000] flex justify-between shadow">
      <NuxtLink class="py-2" to="/">
        <img class="" src="/images/logo.svg" alt="" />
      </NuxtLink>
      <ul class="hidden text-xs lg:!flex uppercase gap-2">
        <NuxtLink
          exactActiveClass="active"
          to="/"
          class="cursor-pointer nav-link flex items-center px-2"
        >
          Home
        </NuxtLink>
        <NuxtLink
          exactActiveClass="active"
          to="/fleet"
          class="cursor-pointer nav-link flex items-center px-2"
        >
          Our fleet
        </NuxtLink>
        <NuxtLink
          exactActiveClass="active"
          to="/services"
          class="cursor-pointer nav-link flex items-center px-2"
        >
          our services
        </NuxtLink>
        <NuxtLink
          exactActiveClass="active"
          to="/about-us"
          class="cursor-pointer nav-link flex items-center px-2"
        >
          who we are
        </NuxtLink>
        <NuxtLink
          exactActiveClass="active"
          to="/events"
          class="cursor-pointer nav-link flex items-center px-2"
        >
          news and events
        </NuxtLink>
        <NuxtLink
          exactActiveClass="active"
          to="/contact-us"
          class="cursor-pointer nav-link flex items-center px-2"
        >
          contact us
        </NuxtLink>
        <NuxtLink to="/login" class="nav-link flex items-center px-2">
          <!-- <iconProfile class="w-6" /> -->
          Login
        </NuxtLink>
      </ul>

      <IconHumberger
        @click="menutoggle"
        class="w-6 fill-white self-center cursor-pointer stroke-white h-6 lg:hidden block"
      />

      <MobileMenu
        @menutoggle="menutoggle"
        :class="[
          isMenu ? 'left-0' : '-left-full',
          isMenu ? 'right-0' : '-right-full',
        ]"
      />
    </header>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TopBar from "./Topbar.vue";
const isMenu = ref(false);

function menutoggle() {
  isMenu.value = !isMenu.value;
}
</script>

<style>
.nav-link {
  transition: 0.2s all ease;
  border-bottom: 2px solid transparent;
  color: white;
  border-top: 2px solid transparent;
  letter-spacing: 0.5px;
  opacity: 0.8;
}
.nav-link:hover {
  opacity: 1;
}
.active {
  border-bottom: 2px solid white;
  opacity: 1;
  font-weight: 600;
}
</style>
