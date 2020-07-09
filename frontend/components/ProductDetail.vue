<template>
  <div class="product-detail-wrapper">
    <div class="mx-4 my-12 flex justify-center">
      <div id="product-detail-grid" class="w-full max-w-4xl">
        <div
          class="product-image"
          :style="{backgroundImage: `url(https://ipfs.infura.io/ipfs/${product.imageHash})`}"
        ></div>
        <div class="product-details">
          <h1 class="text-3xl text-gray-900 mb-2 tracking-wide">{{product.name}}</h1>
          <h3 class="text-xl text-gray-700 mb-2">{{toEther(product.price)}} ETH</h3>
          <h4 :title="product.sellerAddress" class="text-xl text-gray-600 mb-6">
            Seller :
            <span
              class="text-gray-700 font-bold uppercase"
            >{{formattedAcc(product.sellerAddress)}}</span>
          </h4>
          <button class="dark-button" @click="buyProduct" v-show="!product.sold">Buy</button>
          <p class="py-3 px-4 bg-gray-300 text-gray-900 uppercase" v-show="product.sold">Sold</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import web3 from "@/utils/web3";

export default {
  name: "ProductDetail",
  props: ["product"],
  computed: {
    toEther() {
      return price => web3.utils.fromWei(price, "ether");
    },
    formattedAcc() {
      return acc => {
        const { length } = acc;
        const formatted = `${acc.slice(0, 7)}...${acc.slice(length - 7)}`;

        return formatted;
      };
    }
  },
  methods: {
    buyProduct() {
      this.$emit("buyProduct");
    }
  }
};
</script>


<style>
#product-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3.2em;
}

.product-image {
  position: relative;
  padding: 1rem;
  width: 460px;
  height: 460px;
  background-image: url("/images/default.jpg");
  background-position: 50% 50%;
  background-size: cover;
}

.product-details {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

.dark-button {
  position: relative;
  z-index: 50;
  display: inline-block;
  padding: 18px 24px;
  justify-content: center;
  border-radius: 0px;
  background-color: #1d1f2e;
  box-shadow: none;
  transition: background-color 400ms ease, opacity 400ms ease,
    box-shadow 400ms ease;
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
}

.dark-button:hover {
  background-color: #2f3247;
  box-shadow: 0 3px 8px 0 rgba(29, 31, 46, 0.15);
  opacity: 0.96;
  color: #fff;
}
</style>