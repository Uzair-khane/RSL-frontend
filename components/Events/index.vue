<template>
  <HeroSection title="News & Events" imagePath="/images/event/banner.png" />
  <div class="bg-[#F9F9F9] md:px-16 px-3 py-16">
    <Upcoming />
    <PersonalBlogs />
  </div>
</template>

<script setup>
import Upcoming from "./Upcoming";
import PersonalBlogs from "./PersonalBlogs";
</script>
