<template>
  <footer class="footer-bg">
    <div class="text-white px-3 md:px-16 py-5 mt-20">
      <div
        class="flex justify-between mt-10 flex-wrap md:flex-nowrap md:gap-0 gap-10"
      >
        <div class="max-w-60">
          <img src="/images/logo.svg" alt="" />
          <p class="mt-3 opacity-80">
            With a fleet of premium vehicles and a team of experienced
            chauffeurs, we ensure a first-class travel experience for every
            client.
          </p>
        </div>
        <div>
          <h2 class="text-lg font-semibold">Contact</h2>
          <p class="mt-3 opacity-80">
            Address: Office 604, Westburry <br />
            Tower Business Bay
          </p>
          <ul class="space-y-4 mt-4 opacity-80">
            <li class="flex gap-4 items-center">
              <iconPhone />
              <span>(+971) 4- 552-0932</span>
            </li>
            <li class="flex gap-4 items-center">
              <iconMobile class="w-5 h-5 fill-slate-900 stroke-white" />
              <span>(+971) 50- 187-6887</span>
            </li>
            <li class="flex gap-4 items-center">
              <iconMail class="w-5 stroke-white" />
              <span>info@realsmartlimousine.com</span>
            </li>
          </ul>
        </div>
        <div class="w-full md:w-1/4">
          <h2 class="text-lg font-semibold">Explore More</h2>
          <ul class="space-y-4 mt-4 opacity-80">
            <NuxtLink
              to="/about-us"
              class="flex gap-2 items-center pb-1 border-b"
            >
              <iconArrow class="w-5 -ml-2 fill-white" />
              <span>About Us</span>
            </NuxtLink>
            <NuxtLink
              to="/services"
              class="flex gap-2 items-center pb-1 border-b"
            >
              <iconArrow class="w-5 -ml-2 fill-white" />
              <span>Our Services</span>
            </NuxtLink>
            <NuxtLink to="/fleet" class="flex gap-2 items-center pb-1 border-b">
              <iconArrow class="w-5 -ml-2 fill-white" />
              <span>Our Fleet</span>
            </NuxtLink>
            <NuxtLink
              to="/join/partner"
              class="flex gap-2 items-center pb-1 border-b"
            >
              <iconArrow class="w-5 -ml-2 fill-white" />
              <span>Be Our Partner</span>
            </NuxtLink>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="bottom bg-slate-800 flex-wrap gap-8 md:px-16 px-3 flex justify-between py-5 text-white mt-14"
    >
      <p class="opacity-80">
        Copyright 2024 | <NuxtLink to="/terms"> Terms & Conditions </NuxtLink> | <NuxtLink to="/privacy"> Privacy Policy  </NuxtLink>®. All rights
        reserved.
      </p>
      <ul class="flex gap-6 items-center">
        <li><iconFb class="fill-white w-6 h-6" /></li>
        <li><IconInstagram class="fill-white w-6 h-6" /></li>
        <li><IconTelegram class="fill-white w-6 h-6" /></li>
        <li><IconLinkdin class="stroke-white w-6 h-6" /></li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer-bg {
  background: url("/images/footer.png");
  background-size: cover;
}
</style>
