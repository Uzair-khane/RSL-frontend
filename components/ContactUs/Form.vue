<template>
  <div class="space-y-6">
    <input
      class="w-full px-4 py-2.5 rounded-md border border-white text-white placeholder-white"
      type="text"
      placeholder="Full Name"
    />
    <input
      class="w-full px-4 py-2.5 rounded-md border border-white text-white placeholder-white"
      type="text"
      placeholder="Email Address"
    />
    <textarea
      rows="5"
      class="w-full px-4 rounded-md py-2.5 border border-white text-white placeholder-white"
      type="text"
      placeholder="Your Message"
    />
    <button class="bg-[#0693E3] w-full text-white py-2.5">Send</button>
  </div>
</template>

<style scoped>
input,
textarea {
  background-color: rgba(120, 126, 130, 0.7);
}
</style>
