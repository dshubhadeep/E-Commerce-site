<template>
  <div class="mx-4 flex justify-center">
    <div class="w-full max-w-md">
      <form class="bg-white px-8 pt-6 pb-8 mb-4 border-2" @submit.prevent="handleSubmit">
        <custom-input label="Name" name="productName" placeholder="Product Name" />
        <custom-input label="Price (ether)" name="productPrice" placeholder="1.5" />
        <uploader />
        <div class="flex items-center justify-center">
          <input type="submit" value="Add product" class="gold-button" />
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import CustomInput from "./CustomInput";
import Uploader from "./Uploader";

export default {
  name: "AddProductForm",
  components: {
    CustomInput,
    Uploader
  },
  methods: {
    handleSubmit(event) {
      this.$emit("submit", event);
    }
  }
};
</script>


<style scoped>
.gold-button {
  position: relative;
  z-index: 50;
  display: inline-block;
  padding: 16px 20px;
  margin-top: 12px;
  justify-content: center;
  border-radius: 0px;
  background-color: #baa082;
  box-shadow: none;
  transition: background-color 400ms ease, opacity 400ms ease,
    box-shadow 400ms ease;
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
}

.gold-button:hover {
  background-color: #dbbd9a;
  opacity: 0.96;
  color: #fff;
  cursor: pointer;
}
</style>