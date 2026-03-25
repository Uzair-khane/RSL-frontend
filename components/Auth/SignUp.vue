<template>
  <div class="banner px-3 flex justify-center items-center h-screen">
    <form
      class="bg-white rounded-md shadow px-3 md:px-10 py-6 md:py-10 w-full md:w-[450px]"
      action=""
    >
      <img src="/images/logo.svg" alt="" />
      <h2 class="font-semibold text-2xl mt-3">Login To your account</h2>
      <div class="mt-3">
        <label for="">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          class="w-full rounded-md mt-2 py-2.5 px-3 border border-[#868686]"
        />
      </div>
      <div class="mt-3">
        <label for="">Email</label>
        <input
          type="text"
          placeholder="fskhandev@gmail.com"
          class="w-full rounded-md mt-2 py-2.5 px-3 border border-[#868686]"
        />
      </div>
      <div class="mt-4">
        <label for="">password</label>
        <input
          type="text"
          placeholder="Enter your password"
          class="w-full rounded-md mt-2 py-2.5 px-3 border border-[#868686]"
        />
      </div>
      <button class="bg-[#0693E3] rounded-md text-white py-2.5 mt-4 w-full">
        Sign Up
      </button>
      <p class="mt-4 text-[#868686]">
        Already have an account?
        <NuxtLink to="/login" class="text-[#0693E3]">Log in</NuxtLink>
      </p>
    </form>
  </div>
</template>

<style scoped>
.banner {
  background: url("/images/auth.png") center no-repeat;
  background-size: cover;
}
</style>
