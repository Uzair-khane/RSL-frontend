<template>
  <div
    class="flex relative px-2 justify-center text-white items-center fleet-banner"
  >
    <div class="text-center space-y-2 mb-20">
      <h1 class="uppercase text-3xl text-center font-outfit font-semibold">
        Our Fleet
      </h1>
      <div class="flex gap-3 justify-center items-center">
        <hr class="w-20 border-b border-2 border-white" />
        <iconFleet class="w-6 fill-white" />

        <hr class="w-20 border-b border-2 border-white" />
      </div>
      <h2 class="text-xl font-outfit">
        We offer you a super VIP experience in Dubai UAE
      </h2>
    </div>
    <img
      src="/images/cars.png"
      class="absolute -bottom-10 md:-bottom-20"
      alt=""
    />
  </div>
</template>

<style scoped>
.fleet-banner {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/images/fleet-banner.png") center no-repeat;
  background-size: cover;
  width: 100%;
  height: calc(100vh - 50px);
}
@media (max-width: 1024px) {
  .fleet-banner {
    height: 60vh;
  }
}
</style>
