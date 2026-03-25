<template>
  <div class="md:px-16 px-3 mt-14">
    <h2 class="text-2xl uppercase font-semibold">
      What people think about us?!
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6">
      <div data-aos="fade-up" class="shadow card p-6 bg-[#f1f1f1]">
        <div class="flex gap-1">
          <iconLikeBlack class="w-5" />
          <small class="font-semibold">Testimonial</small>
        </div>
        <div class="flex items-center justify-center mt-4 gap-3 flex-col">
          <div class="flex gap-1 items-center">
            <img class="w-14" src="/images/review/user-1.png" alt="" />
            <div>
              <h2 class="font-semibold leading-3">Stacey Prosacco</h2>
              <small>Tourist</small>
            </div>
          </div>
          <p class="text-sm text-center">
            The best limousine experience I've ever had! From the moment we
            booked to the end of the ride, everything was seamless. The driver
            was professional, the car was immaculate, and the service was
            top-notch. Highly recommend Real Smart Limousine
          </p>
          <div class="flex gap-1">
            <iconStar v-for="i in 5" class="w-4" />
          </div>
        </div>
      </div>
      <div data-aos="fade-up" class="shadow card p-6 bg-[#f1f1f1]">
        <div class="flex gap-1">
          <iconLikeBlack class="w-5" />
          <small class="font-semibold">Testimonial</small>
        </div>
        <div class="flex items-center justify-center mt-4 gap-3 flex-col">
          <div class="flex gap-1 items-center">
            <img class="w-14" src="/images/review/user-2.png" alt="" />
            <div>
              <h2 class="font-semibold leading-3">Tarrun Singh</h2>
              <small>Tourist</small>
            </div>
          </div>
          <p class="text-sm text-center">
            RSL made our wedding day truly special. The limo arrived on time,
            and the driver was courteous and attentive. The luxurious interior
            made the ride even more memorable. Thank you, Real Smart Limousine,
            for excellent service.!
          </p>
          <div class="flex gap-1">
            <iconStar v-for="i in 5" class="w-4" />
          </div>
        </div>
      </div>
      <div data-aos="fade-up" class="shadow card p-6 bg-[#f1f1f1]">
        <div class="flex gap-1">
          <iconLikeBlack class="w-5" />
          <small class="font-semibold">Testimonial</small>
        </div>
        <div class="flex items-center justify-center mt-4 gap-3 flex-col">
          <div class="flex gap-1 items-center">
            <img class="w-14" src="/images/review/user-3.png" alt="" />
            <div>
              <h2 class="font-semibold leading-3">Bin Malik</h2>
              <small>Tourist</small>
            </div>
          </div>
          <p class="text-sm text-center">
            I've used Real Smart Limousine for both business trips and special
            occasions, and they never disappoint. Their fleet is modern, and the
            chauffeurs are always professional and reliable. It’s my go-to for
            luxury transportation!
          </p>
          <div class="flex gap-1">
            <iconStar v-for="i in 5" class="w-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: url("/images/review/testimonial1.png") center no-repeat;
  background-size: cover;
}
</style>
