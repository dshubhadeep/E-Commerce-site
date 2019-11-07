<template>
  <div>
    <heading text="Register" />
    <registration-form :regFee="regFee" @submit="handleSubmit" />
  </div>
</template>

<script>
import shop from "@/utils/shop";
import RegistrationForm from "@/components/RegistrationForm";
import Heading from "@/components/Heading";

export default {
  components: {
    Heading,
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
