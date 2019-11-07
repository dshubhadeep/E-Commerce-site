<template>
  <div>
    <product-detail :product="product" @buyProduct="handleBuyProduct" />
  </div>
</template>


<script>
import shop from "@/utils/shop";

import ProductDetail from "@/components/ProductDetail";

export default {
  components: {
    ProductDetail
  },
  data() {
    return {
      id: this.$route.params.id,
      product: {
        name: "",
        price: "0",
        imageHash: "",
        sellerAddress: "0x0000000000000000000000000000000000000000",
        sold: false
      }
    };
  },
  async mounted() {
    this.product = await shop.methods.productList(this.id).call();
    console.log(this.product);
  },
  methods: {
    async handleBuyProduct() {
      const dateSold = new Date().getTime();

      try {
        await shop.methods.buyProduct(this.id, dateSold).send({
          from: window.ethereum.selectedAddress,
          value: this.product.price,
          gas: "2000000"
        });
        this.product.sold = true;
        alert("Item bought");
      } catch (err) {
        console.log(err.message);
        alert("Something went wrong");
      }
    }
  }
};
</script>