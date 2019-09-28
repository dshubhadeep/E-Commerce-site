const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

// Contracts
const { abi, bytecode } = require("../../build/contracts/Shop.json");

const GAS_VALUE = `2000000`;
const REG_FEE = `10000`;
let accounts, shop, owner;

before(async () => {
  accounts = await web3.eth.getAccounts();
  owner = accounts[0];

  // Deploy contract
  shop = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: [REG_FEE] })
    .send({ from: owner, gas: GAS_VALUE });
});

describe(`Shop`, () => {
  it(`deploys contract`, () => {
    assert.ok(shop.options.address);
  });

  it(`registers user`, async () => {
    const response = await shop.methods.registerUser().send({
      from: accounts[1],
      value: REG_FEE
    });

    const userCount = await shop.methods.getUserCount().call();

    assert(response);
    assert.strictEqual(Number(userCount), 1);
  });

  it(`doesn't allow user to register again`, async () => {
    let noErrFlag = false;

    try {
      await shop.methods
        .registerUser()
        .send({ from: accounts[1], value: REG_FEE });

      noErrFlag = true;
    } catch (err) {
      assert.ok(err);
    }

    assert.strictEqual(noErrFlag, false);
  });

  it(`it doesn't user to register with insufficient registration fee`, async () => {
    let noErrFlag = false;

    try {
      await shop.methods.registerUser().send({ from: accounts[2] });

      noErrFlag = true;
    } catch (err) {
      assert.ok(err);
    }

    assert.strictEqual(noErrFlag, false);
  });

  it(`allows registered user to add product`, async () => {
    const productName = web3.utils.fromAscii(`Product 1`);
    const imageHash = web3.utils.fromAscii(`Hash`);
    const price = web3.utils.toWei(`1`, `ether`);
    const dateAdded = new Date().getTime();

    const response = await shop.methods
      .addProduct(productName, price, imageHash, dateAdded)
      .send({
        from: accounts[1],
        gas: GAS_VALUE
      });

    const productCount = await shop.methods.productCount().call();

    assert(response);
    assert.strictEqual(Number(productCount), 1);
  });

  it(`doesn't allow unregistered user to add product`, async () => {
    const productName = web3.utils.fromAscii(`Product 2`);
    const imageHash = web3.utils.fromAscii(`Hash`);
    const price = web3.utils.toWei(`2.5`, `ether`);
    const dateAdded = new Date().getTime();

    let noErrFlag = false;

    try {
      await shop.methods
        .addProduct(productName, price, imageHash, dateAdded)
        .send({
          from: accounts[2],
          gas: GAS_VALUE
        });

      noErrFlag = true;
    } catch (err) {
      assert.ok(err);
    }

    assert.strictEqual(noErrFlag, false);
  });
});
