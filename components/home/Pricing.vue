<template>
  <div class="mt-14 pricing-banner text-white pb-10 md:pb-20">
    <div
      class="md:px-16 flex-wrap gap-4 bg-[#585858] px-3 flex justify-between"
    >
      <h3
        data-aos="fade-right"
        class="text-xl lg:pt-0 pt-4 font-semibold self-center uppercase"
      >
        What about pricing?
      </h3>
      <p class="self-center mx-auto opacity-80">
        Don’t worry. We provide very nice deals and the most competative price
        just for you!
      </p>
    npm  -->
    </div>
    <div
      class="mt-10 md:mt-20 px-3 justify-center flex flex-col items-center gap-3"
    >
      <h2
        data-aos="fade-up"
        class="text-2xl font-outfit md:text-3xl uppercase font-semibold"
      >
        OR ANYWHERE YOU NEED US TO TAKE
      </h2>
      <p class="opacity-70">
        Enjoy a smooth and luxurious ride with premium amenities.
      </p>
      <p class="opacity-70">
        Dedicated to your safety, satisfaction, and a first-class experience.
      </p>
      <div class="flex gap-4">
        <span class="uppercase text-lg">CALL NOW</span>
        <span>0119-23903829-49</span>
      </div>
      <div class="flex gap-2 items-center">
        <hr class="w-16 border border-white" />
        <span class="uppercase text-[#0693E3]">Or</span>
        <hr class="w-16 border border-white" />
      </div>
      <NuxtLink to="/book-ride" class="bg-[#0693E3] px-10 py-2.5"
        >Book Now</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
.pricing-banner {
  background: url("/images/pricing.png") center no-repeat;
  background-size: cover;
  width: 100;
}
</style>
