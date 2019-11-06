<template>
  <div>
    <div class="mx-4 my-12 flex justify-center">
      <div id="product-list-grid" class="w-full max-w-6xl">
        <product-card v-for="product in products" :key="product.productId" :product="product" />
      </div>
    </div>
  </div>
</template>


<script>
import ProductCard from "./ProductCard";

export default {
  name: "ProductList",
  components: {
    ProductCard
  },
  props: { products: Array }
};
</script>


<style>
#product-list-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2.5em;
}
</style>