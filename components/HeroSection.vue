<template>
  <div
    :style="backgroundStyle"
    class="h-[30vh] md:h-[50vh] flex justify-center items-center"
  >
    <h2
      :class="[
        checkBanner == 'invester-banner.png' ||
        checkBanner == 'services-banner.png'
          ? 'mt-14 mr-10'
          : '',
      ]"
      class="uppercase font-semibold font-outfit text-3xl text-white"
    >
      {{ title }}
    </h2>
  </div>
</template>
<script setup>
const props = defineProps({
  imagePath: {
    type: String,
    default: "",
  },
  title: {
    default: "Title",
    type: String,
  },
});

const { imagePath } = props;
const checkBanner = imagePath.split("/").pop();

const backgroundStyle = computed(() => {
  return {
    backgroundImage: `url(${props.imagePath})`,
    backgroundSize: "cover", // Adjusts the size of the background
    backgroundPosition: "center", // Centers the background image
  };
});
</script>
