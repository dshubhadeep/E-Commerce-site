<template>
  <div class="mx-4 flex justify-center">
    <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="regFee"
          >Registration Fee (wei)</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="regFee"
            type="text"
            :value="regFee"
            disabled
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="$emit('register')"
          >Register</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  name: "RegistrationForm",
  props: {
    regFee: Number
  }
};
</script>


<style>
</style>