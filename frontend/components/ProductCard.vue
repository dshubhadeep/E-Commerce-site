<template>
  <div class="product-wrapper">
    <div class="product-image-wrapper">
      <div class="product-overlay">
        <n-link :to="`/product/${product.productId}`" class="white-button">View product</n-link>
      </div>
      <img
        src="https://source.unsplash.com/collection/172974"
        class="object-cover h-64 w-full rounded shadow-md"
      />
    </div>

    <div class="text-center my-4">
      <div class="flex justify-center items-center">
        <h2 class="product-name mr-2">{{product.name}}</h2>
        <p
          v-show="product.sold"
          class="mt-2 bg-gray-400 text-gray-900 px-3 text-sm py-2 rounded-full tracking-wide"
        >SOLD</p>
      </div>

      <h3 class="product-price">{{toEther(product.price)}} ETH</h3>
    </div>
  </div>
</template>


<script>
import web3 from "@/utils/web3";

// `https://ipfs.infura.io/ipfs/${product.imageHash}`

export default {
  name: "ProductCard",
  props: { product: Object },
  computed: {
    toEther() {
      return price => {
        return web3.utils.fromWei(price, "ether");
      };
    }
  }
};
</script>

<style scoped>
.product-image-wrapper {
  position: relative;
}

.product-image-wrapper:hover .product-overlay {
  opacity: 1;
}

.product-overlay {
  transition: 0.5s ease;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    180deg,
    rgba(29, 31, 46, 0.1),
    rgba(29, 31, 46, 0.1)
  );
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.white-button {
  width: 86%;
  z-index: 50;
  display: flex;
  padding: 18px 24px;
  margin: 10px;
  justify-content: center;
  border-bottom-style: none;
  border-radius: 0px;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(29, 31, 46, 0.1);
  transition: background-color 400ms ease, opacity 400ms ease,
    box-shadow 400ms ease;
  color: #1d1f2e;
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.white-button:hover {
  background-color: #fafafa;
  box-shadow: 0 3px 8px 0 rgba(29, 31, 46, 0.15);
  color: #161724;
}

.product-name {
  margin-top: 12px;
  margin-bottom: 4px;
  color: #2d3748;
  font-size: 1.45rem;
}

.product-price {
  text-transform: uppercase;
  font-size: 1.1rem;
  color: #718096;
  line-height: 24px;
}
</style>