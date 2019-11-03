<template>
  <div class="container">
    <div class="text-center my-6 flex justify-center items-center">
      <div class="w-20 bg-gray-300 m-4 opacity-75" style="height:2px;"></div>
      <h2 class="text-3xl font-semibold text-gray-800">Register</h2>
      <div class="w-20 bg-gray-300 m-4 opacity-75" style="height:2px;"></div>
    </div>
    <registration-form :regFee="regFee" @submit="handleSubmit" />
  </div>
</template>

<script>
import shop from "@/utils/shop";
import RegistrationForm from "@/components/RegistrationForm";

export default {
  components: {
    RegistrationForm
  },
  data() {
    return {
      regFee: 0
    };
  },
  async mounted() {
    const fee = await shop.methods.regFee().call();
    this.regFee = Number(fee);
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await shop.methods.registerUser().send({
          from: window.ethereum.selectedAddress,
          value: this.regFee
        });

        alert("Registered");
      } catch (err) {
        alert(err.message);
      }
      this.$router.push("/");
    }
  }
};
</script>
