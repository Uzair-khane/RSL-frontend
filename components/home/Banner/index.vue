<template>
  <div
    class="md:px-10 relative px-2 lg:pb-0 pb-10 lg:h-[calc(100vh-50px)] px-3 banner flex gap-3 flex-wrap lg:flex-nowrap lg:justify-between"
  >
    <div class="absolute inset-0 overlay"></div>
    <video
      class="w-full object-cover playsinline"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      id="myVideo"
    >
      <source src="/images/output.mp4" />
      Your browser does not support HTML5 video.
    </video>
    <BookingForm />
    <Content />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

import BookingForm from "./BookingForm";
import Content from "./Content";

onMounted(() => {
  const video = document.getElementById("myVideo");
  if (video) {
    video.play();
  }
});

onUnmounted(() => {
  const video = document.getElementById("myVideo");
  if (video) {
    video.pause();
    video.currentTime = 0; // Reset the video to the beginning
  }
});
</script>

<style scoped>
.overlay {
  z-index: -1;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 70%
  );
}
.banner video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the video covers the entire area */
  transform: translate(-50%, -50%);
  z-index: -2;
}
</style>
