<template>
  <tr>
    <td>{{product.name}}</td>
    <td>{{toEther(product.price)}}</td>
    <td>
      <a :href="`https://ipfs.infura.io/ipfs/${product.imageHash}`" target="_blank">View image</a>
    </td>
    <td>
      <button>Buy</button>
    </td>
  </tr>
</template>


<script>
import web3 from "@/utils/web3";

export default {
  name: "ProductCard",
  props: ["product"],
  computed: {
    cleanName() {
      return name => {
        return name;
      };
    },
    toEther() {
      return price => {
        return web3.utils.fromWei(price, "ether");
      };
    }
  }
};
</script>