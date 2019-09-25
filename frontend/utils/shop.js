import web3 from "./web3";

import Shop from "../../build/contracts/Shop.json";

import { address } from "./address.json";

const contract = new web3.eth.Contract(Shop.abi, address);

export default contract;
