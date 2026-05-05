<template>
  <div class="banner px-3 flex justify-center items-center h-screen">
    <form
      class="bg-white rounded-md shadow px-3 md:px-10 py-8 md:py-14 w-full md:w-[450px]"
      @submit.prevent="handleLogin"
    >
      <img src="/images/logo.svg" alt="" />
      <h2 class="font-semibold text-2xl mt-3">Login To your account</h2>

      <div v-if="errorMsg" class="mt-3 bg-red-100 text-red-600 px-3 py-2 rounded-md text-sm">
        {{ errorMsg }}
      </div>

      <div class="mt-3">
        <label>Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="example@gmail.com"
          class="w-full rounded-md mt-2 py-2.5 px-3 border border-[#868686]"
          required
        />
      </div>

      <div class="mt-4">
        <label>Password</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="Enter your password"
          class="w-full rounded-md mt-2 py-2.5 px-3 border border-[#868686]"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="bg-[#0693E3] rounded-md text-white py-2.5 mt-4 w-full disabled:opacity-50"
      >
        {{ loading ? 'Please wait...' : 'Login now' }}
      </button>

      <p class="mt-4 text-[#868686]">
        Don't have an account?
        <NuxtLink to="/sign-up" class="text-[#0693E3]">Sign up</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup>
const form = ref({ email: '', password: '' });
const loading = ref(false);
const errorMsg = ref('');
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    const res = await $fetch('http://localhost:5000/api/site/v1/auth/login', {
      method: 'POST',
      body: form.value
    });

    if (res.success) {
      localStorage.setItem('rsl_token', res.token);
      localStorage.setItem('rsl_user', JSON.stringify(res.user));
      router.push('/book-ride');
    } else {
      errorMsg.value = res.message;
    }
  } catch (err) {
    errorMsg.value = 'Server error. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.banner {
  background: url("/images/auth.png") center no-repeat;
  background-size: cover;
}
</style>