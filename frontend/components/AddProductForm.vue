<template>
  <div class="mx-4 flex justify-center">
    <div class="w-full max-w-sm">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="productName">Name</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productName"
            type="text"
            placeholder="Product name"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="productPrice">Price (ether)</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productPrice"
            type="text"
            placeholder="1000"
          />
        </div>
        <div class="flex items-center justify-center">
          <input
            type="submit"
            value="Register"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
    </div>
  </div>
</template>


<script>
// TODO : Add image field

export default {
  name: "AddProductForm",
  methods: {
    handleSubmit(event) {
      this.$emit("submit", event);
    }
  }
};
</script>


<style>
</style>