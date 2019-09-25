/**
 * This script creates a json file which contains
 * address of the deployed factory contract
 */

const fs = require("fs");
const Shop = artifacts.require("Shop");

module.exports = async deployer => {
  const shop = await Shop.deployed();

  fs.writeFileSync(
    "./frontend/utils/address.json",
    JSON.stringify({ address: shop.address })
  );

  console.log(`Contract deployed at ${shop.address}`);
};
