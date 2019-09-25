const Shop = artifacts.require("Shop");

module.exports = deployer => {
  // Change registration fee here
  const regFee = 10000;

  deployer.deploy(Shop, regFee);
};
