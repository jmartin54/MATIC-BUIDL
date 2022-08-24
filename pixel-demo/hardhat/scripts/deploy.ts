// 1 - 0x854F5B53ce5960e1c9485BdEE2fa72062d2b06Ea
// 2 - 0x8dD43c5F141e1b87c278861B1ABcE811545C81a7
// 3 - 0x2292b508A7054a9818D80A7ED1bBDc15557022Fa
// 4 - 0x5041326D7B247EBA46049C97408685BD29d4CE0e
// 5 - 0xC0989157559D3d2F1487c27505cA0f2654927fF2
// 6 - 0xD6b5AED9bB88114c094CcdF0f7268Bf9d0E2EF11
// 7 - 0x4E5e256436B83cBc041871dD06C3DAF31438f4a2
/// New deploy
// 8 - 0xB84E2497e7Fcc82c4f6649Ee25f1EEef138A3436
/// Final version
// 9 - 

// import hre from "hardhat";
// const { ethers } = hre as any;

// const ethers = require("@nomiclabs/hardhat-ethers");

const { ethers } = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = ethers.utils.parseEther("1");

  // const Lock = await ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);

  ////////


  // const Light = await ethers.getContractFactory("Light");
  // const light = await Light.deploy();

  // await light.deployed();



  /// Sort of works?
  // const [deployer] = await ethers.getSigners();

  // console.log("Deploying contracts with the account:", deployer.address);

  // console.log("Account balance:", (await deployer.getBalance()).toString());

  // const Light = await ethers.getContractFactory("Light");
  // console.log(Light)
  // const light = await Light.deploy();

  // console.log("Token address:", light.address);


  // const info = await light.light.call(1, 0, 0, 0);
  // console.log(info)


  ////

  // const Light = await ethers.getContractFactory("Light");

  // // Start deployment, returning a promise that resolves to a contract object
  // const light = await Light.deploy();
  // console.log("Contract deployed to address:", light.address);

  const Light = await ethers.getContractFactory("Light");
  const light= await Light.deploy({
    nonce: 0,
  });

  await light.deployed();

  // This solves the bug in Mumbai network where the contract address is not the real one
  const txHash = light.deployTransaction.hash;
  console.log(`Tx hash: ${txHash}\nWaiting for transaction to be mined...`);
  const txReceipt = await ethers.provider.waitForTransaction(txHash);

  console.log("Contract address:", txReceipt.contractAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
