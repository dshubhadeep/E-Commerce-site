<template>
  <div>
    <heading text="Add" />
    <add-product-form @submit="handleSubmit" />
  </div>
</template>

<script>
import shop from "@/utils/shop";
import web3 from "@/utils/web3";
import ipfs from "@/utils/ipfs";

import AddProductForm from "@/components/AddProductForm";
import Heading from "@/components/Heading";

export default {
  components: {
    Heading,
    AddProductForm
  },
  methods: {
    async handleSubmit(e) {
      const obj = [];
      const currentAcc = window.ethereum.selectedAddress;
      const currentTime = new Date().getTime();

      Array.from(e.target.elements, element => {
        if (element.type === "text") obj[element.id] = element.value;
        if (element.type === "file") obj[element.id] = element.files[0];
      });

      console.log(obj);

      const name = obj["productName"];
      const weiPrice = web3.utils.toWei(obj["productPrice"], "ether");
      let hash;

      try {
        alert("UPLOADING IMAGE...");
        const res = await ipfs.add(obj["productImage"]);
        console.log("IPFS result hash", res[0].hash);
        hash = res[0].hash;
      } catch (err) {
        console.log(err.message);
      }

      try {
        await shop.methods.addProduct(name, weiPrice, hash, currentTime).send({
          from: currentAcc,
          gas: "2000000"
        });

        alert("Product added ");
        this.$router.push("/");
      } catch (err) {
        console.log(err.message);
        alert("Something went wrong");
      }
    }
  }
};
</script>

<style>
.container {
  @apply mx-auto;
}
</style>
