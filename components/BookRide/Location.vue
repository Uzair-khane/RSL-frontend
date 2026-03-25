<template></template>

<script setup>
import { ref, defineEmits } from "vue";

const props = defineProps({
  pickup: String,
  drop: String,
});

const emit = defineEmits(["update:pickup", "update:drop"]);
</script>
