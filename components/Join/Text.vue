<template>
  <p v-if="partner" class="mt-14 md:px-14 font-semibold px-3 text-center">
    Partner with Real Smart Limousine as a corporate collaborator or investor
    and be a part of our growing success. Whether you're looking to enhance your
    business offerings or invest in the luxury transportation industry, we offer
    exciting opportunities for strategic partnerships and investment. Fill out
    the form below to start your journey with RSL, and let’s create value
    together!
  </p>
  <p v-else class="mt-14 md:px-14 font-semibold px-3 text-center">
    Join the Real Smart Limousine family as a driver, partner, or investor!
    Whether you're looking to provide exceptional chauffeur services,
    collaborate with us, or invest in luxury transportation, we welcome you to
    explore exciting opportunities with us. Fill out the form below to get
    started, and let’s drive towards success together with RSL!
  </p>
</template>

<script setup>
const props = defineProps({
  partner: {
    default: false,
    type: Boolean,
  },
});
const { partner } = props;
</script>
