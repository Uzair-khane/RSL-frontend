<template>
  <div class="md:px-16 px-3 mt-14">
    <div
      class="mx-auto space-y-5 md:w-3/5 shadow-xl px-3 md:px-16 py-5 md:py-12"
    >
      <input
        v-model="form.name"
        type="text"
        placeholder="Name"
        class="w-full border border-[#D9D9D9] rounded-md px-5 py-2.5"
      />
      <input
        v-model="form.email"
        type="text"
        placeholder="Email (optional)"
        class="w-full border border-[#D9D9D9] rounded-md px-5 py-2.5"
      />
      <div class="flex gap-3">
        <input
          v-model="form.countryCode"
          placeholder="+92"
          type="text"
          class="w-28 border px-5 border-[#D9D9D9] rounded-md py-2.5"
        />
        <input
          v-model="form.mobile"
          placeholder="Mobile number"
          type="text"
          class="w-full border px-5 border-[#D9D9D9] rounded-md py-2.5"
        />
        <input
          v-model="form.cnic"
          placeholder="CNIC"
          type="text"
          class="w-full border px-5 border-[#D9D9D9] rounded-md py-2.5"
        />
      </div>
      <div v-if="partner">
        <label class="font-bold">Select Vehicle</label>
        <input
          v-model="form.vehicle"
          class="w-full mt-2 border border-[#D9D9D9] px-5 rounded-md py-2.5"
          type="text"
          placeholder="Select vehicle"
        />
      </div>
      <div>
        <label class="font-bold">Passport (or) Visa copy*</label>
        <input
          @change="onFileChange($event, 'passport')"
          class="w-full mt-2 border border-[#D9D9D9] px-5 rounded-md py-2.5"
          type="file"
        />
      </div>
      <div>
        <label class="font-bold">Driver License*</label>
        <input
          @change="onFileChange($event, 'license')"
          class="w-full mt-2 border border-[#D9D9D9] px-5 rounded-md py-2.5"
          type="file"
        />
      </div>

      <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-green-600 text-sm">{{ successMsg }}</p>

      <button
        @click="handleSubmit"
        :disabled="loading"
        class="mt-5 bg-[#0693E3] py-2.5 w-full rounded-md text-white disabled:opacity-60"
      >
        {{ loading ? "Submitting..." : "Submit" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const props = defineProps({
  partner: {
    default: false,
    type: Boolean,
  },
});
const { partner } = props;

const config = useRuntimeConfig();

const form = reactive({
  name: "",
  email: "",
  countryCode: "+92",
  mobile: "",
  cnic: "",
  vehicle: "",
});

const files = reactive({
  passport: null,
  license: null,
});

const loading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");

function onFileChange(e, key) {
  const file = e.target.files[0];
  if (file) files[key] = file;
}

function validateForm() {
  if (!form.name.trim()) return "Name is required";
  if (!form.mobile.trim()) return "Mobile number is required";
  if (!form.cnic.trim()) return "CNIC is required";
  if (partner && !form.vehicle.trim()) return "Vehicle is required for partners";
  if (!files.passport) return "Passport/Visa copy is required";
  if (!files.license) return "Driver license is required";
  return null;
}

async function handleSubmit() {
  errorMsg.value = "";
  successMsg.value = "";

  const validationError = validateForm();
  if (validationError) {
    errorMsg.value = validationError;
    return;
  }

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("email", form.email);
  formData.append("mobile_no", `${form.countryCode}${form.mobile}`);
  formData.append("cnic", form.cnic);
  formData.append("application_type", partner ? "partner" : "rider");
  if (partner) formData.append("vehicle", form.vehicle);
  formData.append("passport", files.passport);
  formData.append("license", files.license);

  loading.value = true;
  try {
    const res = await $fetch(`${config.public.baseUrl}api/site/v1/driver-application/apply`, {
      method: "POST",
      body: formData,
    });

    if (res.success) {
      successMsg.value = res.message || "Application submitted successfully";
      Object.assign(form, {
        name: "",
        email: "",
        countryCode: "+92",
        mobile: "",
        cnic: "",
        vehicle: "",
      });
      files.passport = null;
      files.license = null;
    } else {
      errorMsg.value = res.message || "Something went wrong";
    }
  } catch (err) {
    errorMsg.value =
      err?.data?.message || err?.message || "Failed to submit application";
  } finally {
    loading.value = false;
  }
}
</script>