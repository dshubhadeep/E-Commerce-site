<template>
  <div class="mx-4 flex justify-center">
    <div class="w-full max-w-sm">
      <form class="bg-white px-8 pt-6 pb-8 mb-4 border-2" @submit.prevent="handleSubmit">
        <custom-input
          label="Registration Fee (wei)"
          name="regFee"
          :placeholder="regFee.toString()"
          disabled
        />
        <div class="flex items-center justify-center">
          <input type="submit" value="Register" class="gold-button" />
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import CustomInput from "./CustomInput";

export default {
  name: "RegistrationForm",
  components: { CustomInput },
  props: {
    regFee: Number
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