<template>
  <div class="text-center my-6 flex justify-center items-center">
    <div class="w-20 bg-gray-300 m-4 opacity-75" style="height:2px;"></div>
    <h2 class="text-3xl text-gray-800">{{ text }}</h2>
    <div class="w-20 bg-gray-300 m-4 opacity-75" style="height:2px;"></div>
  </div>
</template>


<script>
export default {
  name: "Heading",
  props: {
    text: String
  }
};
</script>