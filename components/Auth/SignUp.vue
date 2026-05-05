<template>
  <div class="banner px-3 flex justify-center items-center min-h-screen py-8">

    <!-- REGISTER FORM -->
    <form v-if="step === 'register'"
      class="bg-white rounded-md shadow px-3 md:px-10 py-8 md:py-14 w-full md:w-[450px]"
      @submit.prevent="handleRegister"
    >
      <img src="/images/logo.svg" alt="" />
      <h2 class="font-semibold text-2xl mt-3">Create your account</h2>

      <div v-if="errorMsg" class="mt-3 bg-red-100 text-red-600 px-3 py-2 rounded-md text-sm">
        {{ errorMsg }}
      </div>

      <div class="mt-3">
        <label>Full Name</label>
        <input v-model="form.name" type="text" placeholder="Enter your full name"
          class="w-full rounded-md mt-2 py-2.5 px-3 border border-[#868686]" required />
      </div>
      <div class="mt-3">
        <label>Username</label>
        <input v-model="form.username" type="text" placeholder="Unique username"
          class="w-full rounded-md mt-2 py-2.5 px-3 border border-[#868686]" required />
      </div>
      <div class="mt-3">
        <label>Email</label>
        <input v-model="form.email" type="email" placeholder="example@gmail.com"
          class="w-full rounded-md mt-2 py-2.5 px-3 border border-[#868686]" required />
      </div>
      <div class="mt-3">
        <label>Phone Number</label>
        <input v-model="form.mobile_no" type="text" placeholder="03001234567"
          class="w-full rounded-md mt-2 py-2.5 px-3 border border-[#868686]" />
      </div>
      <div class="mt-3">
        <label>Password</label>
        <input v-model="form.password" type="password" placeholder="Enter your password"
          class="w-full rounded-md mt-2 py-2.5 px-3 border border-[#868686]" required />
      </div>

      <button type="submit" :disabled="loading"
        class="bg-[#0693E3] rounded-md text-white py-2.5 mt-4 w-full disabled:opacity-50">
        {{ loading ? 'Please wait...' : 'Create Account' }}
      </button>

      <p class="mt-4 text-[#868686]">
        Already have an account?
        <NuxtLink to="/login" class="text-[#0693E3]">Login</NuxtLink>
      </p>
    </form>

    <!-- OTP VERIFY FORM -->
    <form v-if="step === 'verify'"
      class="bg-white rounded-md shadow px-3 md:px-10 py-8 md:py-14 w-full md:w-[450px]"
      @submit.prevent="handleVerify"
    >
      <img src="/images/logo.svg" alt="" />
      <h2 class="font-semibold text-2xl mt-3">Verify your email</h2>
      <p class="text-[#868686] text-sm mt-2">
        We sent a 6-digit code to <strong>{{ form.email }}</strong>
      </p>

      <div v-if="errorMsg" class="mt-3 bg-red-100 text-red-600 px-3 py-2 rounded-md text-sm">
        {{ errorMsg }}
      </div>
      <div v-if="successMsg" class="mt-3 bg-green-100 text-green-600 px-3 py-2 rounded-md text-sm">
        {{ successMsg }}
      </div>

      <div class="mt-4">
        <label>Enter OTP Code</label>
        <input v-model="otp" type="text" placeholder="123456" maxlength="6"
          class="w-full rounded-md mt-2 py-2.5 px-3 border border-[#868686] text-center text-2xl tracking-widest"
          required />
      </div>

      <button type="submit" :disabled="loading"
        class="bg-[#0693E3] rounded-md text-white py-2.5 mt-4 w-full disabled:opacity-50">
        {{ loading ? 'Verifying...' : 'Verify OTP' }}
      </button>

      <button type="button" @click="handleResend" :disabled="resendLoading"
        class="mt-3 w-full text-[#0693E3] text-sm disabled:opacity-50">
        {{ resendLoading ? 'Sending...' : 'Resend OTP' }}
      </button>
    </form>

  </div>
</template>

<script setup>
const step = ref('register');
const form = ref({ name: '', username: '', email: '', mobile_no: '', password: '' });
const otp = ref('');
const loading = ref(false);
const resendLoading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');
const router = useRouter();

const handleRegister = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    const res = await $fetch('http://localhost:5000/api/site/v1/auth/register', {
      method: 'POST',
      body: form.value
    });
    if (res.success) {
      step.value = 'verify';
    } else {
      errorMsg.value = res.message;
    }
  } catch (err) {
    errorMsg.value = 'Server error. Please try again.';
  } finally {
    loading.value = false;
  }
};

const handleVerify = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    const res = await $fetch('http://localhost:5000/api/site/v1/auth/verify-otp', {
      method: 'POST',
      body: { email: form.value.email, otp: otp.value }
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

const handleResend = async () => {
  resendLoading.value = true;
  errorMsg.value = '';
  successMsg.value = '';
  try {
    const res = await $fetch('http://localhost:5000/api/site/v1/auth/resend-otp', {
      method: 'POST',
      body: { email: form.value.email }
    });
    if (res.success) {
      successMsg.value = 'New OTP sent! Check your email.';
    } else {
      errorMsg.value = res.message;
    }
  } catch (err) {
    errorMsg.value = 'Server error. Please try again.';
  } finally {
    resendLoading.value = false;
  }
};
</script>

<style scoped>
.banner {
  background: url("/images/auth.png") center no-repeat;
  background-size: cover;
}
</style>