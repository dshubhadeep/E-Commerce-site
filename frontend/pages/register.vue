<template>
  <div class="container">
    <div class="text-center my-6">
      <h2 class="text-3xl font-semibold text-gray-900">Register</h2>
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
        console.log("Response " + response);
      } catch (err) {
        alert(err.message);
      }
      this.$router.push("/");
    }
  }
};
</script>
