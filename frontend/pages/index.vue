<template>
  <div class="container">
    <div class="text-center my-6">
      <h2 class="text-3xl text-gray-900">Products</h2>
    </div>
    <product-list :products="products" />
  </div>
</template>

<script>
import shop from "@/utils/shop";

import ProductList from "@/components/ProductList";

export default {
  components: {
    ProductList
  },
  data() {
    return {
      products: [],
      account: "account"
    };
  },
  async mounted() {
    const productCount = await shop.methods.productCount().call();
    console.log(productCount);

    this.products = await Promise.all(
      Array(Number(productCount))
        .fill(undefined)
        .map(async (el, index) => {
          const product = await shop.methods.productList(index + 1).call();
          console.log(product);
          return product;
        })
    );
  }
};
</script>

<style>
.container {
  @apply mx-auto;
}
</style>
