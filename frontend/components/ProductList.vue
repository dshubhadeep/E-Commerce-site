<template>
  <div>
    <h1 class="mb-3">Found {{products.length}} products</h1>
    <div class="product_list_grid">
      <table id="products">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (Ether)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <product-card v-for="product in products" :key="product.productId" :product="product" />
        </tbody>
      </table>
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
  props: ["products"]
};
</script>


<style>
#products {
  border-collapse: collapse;
  width: 50%;
}

#products td,
#products th {
  border: 1px solid #ddd;
  padding: 8px;
}

#products tr:nth-child(even) {
  background-color: #f2f2f2;
}

#products tr:hover {
  background-color: #ddd;
}

#products th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #2d3748;
  color: white;
}
</style>