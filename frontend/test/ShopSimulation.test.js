/**
 * Simulate the whole shop process,
 * and ensures it behaves correctly
 */

const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

// Contracts
const { abi, bytecode } = require("../../build/contracts/Shop.json");

const GAS_VALUE = `2000000`;
const REG_FEE = `10000`;
let accounts, shop, owner, customer1, customer2;

before(async () => {
  accounts = await web3.eth.getAccounts();
  owner = accounts[0];
  customer1 = accounts[1];
  customer2 = accounts[2];

  // Deploy contract
  shop = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: [REG_FEE] })
    .send({ from: owner, gas: GAS_VALUE });
});

describe("Shop simulation", () => {
  it(`registers customer 1`, async () => {
    await shop.methods.registerUser().send({
      from: customer1,
      value: REG_FEE,
      gas: GAS_VALUE
    });

    const userCount = await shop.methods.getUserCount().call();
    assert.strictEqual(Number(userCount), 1);
  });

  it(`registers customer 2`, async () => {
    await shop.methods.registerUser().send({
      from: customer2,
      value: REG_FEE,
      gas: GAS_VALUE
    });

    const userCount = await shop.methods.getUserCount().call();
    assert.strictEqual(Number(userCount), 2);
  });

  it(`customer 1 adds product`, async () => {
    const productName = web3.utils.fromAscii(`Product 1`);
    const imageHash = web3.utils.fromAscii(`Hash`);
    const price = web3.utils.toWei(`1`, `ether`);
    const dateAdded = new Date().getTime();

    await shop.methods
      .addProduct(productName, price, imageHash, dateAdded)
      .send({
        from: customer1,
        gas: GAS_VALUE
      });

    const productCount = await shop.methods.productCount().call();

    assert.strictEqual(Number(productCount), 1);
  });

  it(`customer 2 adds product`, async () => {
    const productName = web3.utils.fromAscii(`Product 2`);
    const imageHash = web3.utils.fromAscii(`Hash`);
    const price = web3.utils.toWei(`2`, `ether`);
    const dateAdded = new Date().getTime();

    await shop.methods
      .addProduct(productName, price, imageHash, dateAdded)
      .send({
        from: customer2,
        gas: GAS_VALUE
      });

    const productCount = await shop.methods.productCount().call();

    assert.strictEqual(Number(productCount), 2);
  });

  it(`customer 1 buys product from customer 2`, async () => {
    const price = web3.utils.toWei(`2`, `ether`);
    const dateSold = new Date().getTime();

    // Buy product
    await shop.methods.buyProduct(2, dateSold).send({
      from: customer1,
      gas: GAS_VALUE,
      value: price
    });

    const product = await shop.methods.productList(2).call();

    assert(product["sold"]);
    assert.strictEqual(product["buyerAddress"], customer1);
    assert.strictEqual(Number(product["dateSold"]), dateSold);
  });

  it(`customer 2 buys product from customer 1`, async () => {
    const price = web3.utils.toWei(`1`, `ether`);
    const dateSold = new Date().getTime();

    // Buy product
    await shop.methods.buyProduct(1, dateSold).send({
      from: customer2,
      gas: GAS_VALUE,
      value: price
    });

    const product = await shop.methods.productList(1).call();

    assert(product["sold"]);
    assert.strictEqual(product["buyerAddress"], customer2);
    assert.strictEqual(Number(product["dateSold"]), dateSold);
  });

  it(`verify customer 1 records`, async () => {
    const user = await shop.methods.getUser(customer1).call();

    assert.strictEqual(Number(user["_userId"]), 1);
    assert.strictEqual(Number(user["_itemsAdded"][0]), 1);
    assert.strictEqual(Number(user["_itemsBought"][0]), 2);
  });

  it(`verify customer 2 records`, async () => {
    const user = await shop.methods.getUser(customer2).call();

    assert.strictEqual(Number(user["_userId"]), 2);
    assert.strictEqual(Number(user["_itemsAdded"][0]), 2);
    assert.strictEqual(Number(user["_itemsBought"][0]), 1);
  });
});
