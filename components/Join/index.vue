<template>
  <HeroSection
    :title="title"
    :imagePath="
      partner ? '/images/invester-banner.png' : '/images/be-driver-banner.png'
    "
  />
  <Text :partner="partner" />
  <Form :partner="partner" />
</template>

<script setup>
import Form from "./Form";
import Text from "./Text";

import { computed } from "vue";
const props = defineProps({
  partner: {
    default: false,
    type: Boolean,
  },
});
const { partner } = props;
const title = computed(() => {
  if (partner) {
    return "Be OUR CORPORATE PARTNER";
  }
  return "Be OUR DRIVER/INVESTOR";
});
</script>
