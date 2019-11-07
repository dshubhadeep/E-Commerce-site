<template>
  <div>
    <heading text="Items Added" />
    <product-list :products="itemsAdded" />
    <heading text="Items Bought" />
    <product-list :products="itemsBought" />
  </div>
</template>


<script>
import shop from "@/utils/shop";

import Heading from "@/components/Heading";
import ProductList from "@/components/ProductList";

export default {
  components: {
    Heading,
    ProductList
  },
  data() {
    return {
      address: this.$route.params.address,
      itemsAdded: [],
      itemsBought: []
    };
  },
  async mounted() {
    const user = await shop.methods.getUser(this.address).call();
    console.log(user);
    const { _itemsAdded, _itemsBought } = user;

    this.itemsAdded = await Promise.all(
      _itemsAdded.map(async id => {
        const product = await shop.methods.productList(id).call();
        return product;
      })
    );

    this.itemsBought = await Promise.all(
      _itemsBought.map(async id => {
        const product = await shop.methods.productList(id).call();
        return product;
      })
    );
  },
  methods: {}
};
</script>