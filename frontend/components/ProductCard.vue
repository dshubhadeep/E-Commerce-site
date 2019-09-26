<template>
  <tr>
    <td>{{cleanName(product.name)}}</td>
    <td>{{toEther(product.price)}}</td>
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
        const s = web3.utils.toAscii(name);
        const idx = s.indexOf(s[31]);
        return s.slice(0, idx);
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


<style>
</style>