const { ethers } = require("ethers");

module.exports = function syncEvent() {
  console.log("Syncing solidity events with log");
  // Once a Ganache node is running, it behaves very similar to a
  // JSON-RPC API node.

  const url = "http://localhost:8545";

  // Or if you are running the UI version, use this instead:
  // const url = "http://localhost:7545"

  const provider = new ethers.providers.JsonRpcProvider(url);

  // Getting the accounts
  const signer0 = provider.getSigner(0);
  const signer1 = provider.getSigner(1);
  console.log("signers: ", signer0, signer1);

  // Connect to contract
  const LightContract = new ethers.Contract(addr, abi, provider);
};
