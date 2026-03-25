<template>
  <div
    class="flex md:h-[80vh] h-[60vh] relative justify-center mb-24 md:mb-44 mt-14 items-center banner"
  >
    <div class="md:flex grid grid-cols-2 flex-wrap justify-center gap-4">
      <div data-aos="fade-right" class="text-center resource w-40 h-32">
        <IconDriver class="w-8 h-8" />
        <h3 class="font-semibold text-2xl mt-2">500+</h3>
        <p>Drivers</p>
      </div>
      <div
        data-aos="fade-right"
        data-aos-delay="100"
        class="text-center resource w-40 h-32"
      >
        <IconEmploye class="w-8 h-8" />
        <h3 class="font-semibold mt-2 text-2xl">400+</h3>
        <p>Employes</p>
      </div>
      <div
        data-aos="fade-right"
        data-aos-delay="200"
        class="text-center resource w-40 h-32"
      >
        <IconCars class="w-8 h-8" />
        <h3 class="font-semibold text-2xl mt-2">300+</h3>
        <p>Luxury cars</p>
      </div>
      <div
        data-aos="fade-right"
        data-aos-delay="300"
        class="text-center resource w-40 h-32"
      >
        <IconLocation class="w-8 h-8" />
        <h3 class="font-semibold text-2xl mt-2">3k+</h3>
        <p>Locations</p>
      </div>
    </div>
    <img
      class="absolute -bottom-10 lg:-bottom-1/4 mx-auto"
      src="/images/cars.png"
      alt=""
    />
  </div>
</template>

<style scoped>
.banner {
  background-image: url("/images/fleet-banner.png");
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.resource {
  background-color: rgba(86, 137, 182, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
