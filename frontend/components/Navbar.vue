<template>
  <div class="menu-wrapper">
    <div class="wrap cc-menu">
      <nuxt-link class="brand" to="/" exact>BlockShop.</nuxt-link>
      <nav class="nav-menu">
        <nuxt-link to="/add" class="menu-item-wrap">
          <div class="menu-item">Add</div>
        </nuxt-link>
        <nuxt-link to="/register" class="menu-item-wrap">
          <div class="menu-item">Register</div>
        </nuxt-link>
        <div class="menu-item-wrap">
          <div class="menu-item" :title="account">{{formattedAcc}}</div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      account: "account"
    };
  },
  mounted() {
    this.accountChange();
    this.account = window.ethereum.selectedAddress;
  },
  methods: {
    accountChange() {
      window.ethereum.on("accountsChanged", () => {
        this.account = window.ethereum.selectedAddress;
      });
    }
  },
  computed: {
    formattedAcc() {
      const { length } = this.account;
      const formatted = `${this.account.slice(0, 4)}...${this.account.slice(
        length - 4
      )}`;

      return formatted;
    }
  }
};
</script>

<style scoped>
.menu-wrapper {
  display: flex;
  line-height: 10px;
}

.menu {
  display: flex;
  padding-top: 25px;
  padding-bottom: 25px;
  align-items: center;
  margin: 0px auto;
}

.nav-menu {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}

.brand {
  font-size: 1.25em;
  font-weight: 700;
}

.menu-item {
  position: relative;
  margin-top: 2px;
  margin-bottom: 2px;
  color: #718096;
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}

.nuxt-link-active .menu-item {
  color: #1a202c;
}

.menu-item:hover {
  color: rgb(162, 95, 75);
}

.menu-item-wrap {
  position: relative;
  display: inline-block;
  overflow: hidden;
  margin-right: 32px;
  padding-top: 4px;
  padding-bottom: 4px;
  align-items: center;
  opacity: 0.6;
  transition: opacity 400ms ease;
  text-decoration: none;
  cursor: pointer;
}

.wrap {
  position: relative;
  display: block;
  width: 940px;
  margin-right: auto;
  margin-left: auto;
}

.wrap.cc-menu {
  z-index: 900;
  display: flex;
  padding-top: 25px;
  padding-bottom: 25px;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
}
</style>