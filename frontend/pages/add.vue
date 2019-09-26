<template>
  <div class="container">
    <div class="text-center my-6">
      <h2 class="text-3xl font-semibold text-gray-900">Add</h2>
    </div>
    <add-product-form @submit="handleSubmit" />
  </div>
</template>

<script>
import shop from "@/utils/shop";
import web3 from "@/utils/web3";
import AddProductForm from "@/components/AddProductForm";

export default {
  components: {
    AddProductForm
  },
  methods: {
    async handleSubmit(e) {
      const obj = [];
      const currentAcc = window.ethereum.selectedAddress;
      const currentTime = new Date().getTime();

      Array.from(e.target.elements, element => {
        if (element.type === "text") obj[element.id] = element.value;
      });

      console.log(obj);

      const name = web3.utils.fromAscii(obj["productName"]);
      const hash = web3.utils.fromAscii("hash");
      const weiPrice = web3.utils.toWei(obj["productPrice"], "ether");

      try {
        await shop.methods.addProduct(name, weiPrice, hash, currentTime).send({
          from: currentAcc,
          gas: "2000000"
        });

        alert("Product added ");
      } catch (err) {
        alert(err.message);
      }
      this.$router.push("/");
    }
  }
};
</script>

<style>
.container {
  @apply mx-auto;
}
</style>
