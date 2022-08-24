const { ethers } = require("ethers");
const LightBuild = require("./contracts/build/Light.json");

module.exports = function syncEvent() {
  console.log("Syncing solidity events with log");
  // Once a Ganache node is running, it behaves very similar to a
  // JSON-RPC API node.

  // const url = "http://localhost:8545";

  // Or if you are running the UI version, use this instead:
  const url = "http://localhost:7545";

  const provider = new ethers.providers.JsonRpcProvider(url);

  // Getting the accounts
  const signer0 = provider.getSigner(0);
  const signer1 = provider.getSigner(1);

  // Connect to contract
  const LightContract = new ethers.Contract(
    //LightBuild.networks["5777"].address,
    "0x2f61f1e6631d9a5752c4af2e3508375f93674342",
    LightBuild.abi,
    provider
  );

  // (async () => {
  //   try {
  //     // get last block
  //     // filter query lastblock -> now
  //     // add listener
  //     // update database

  //     const light = await LightContract.light.call(0, 0, 0, 0);
  //     LightContract.on("Minted", function (x, y, z, color, minter, block) {
  //       console.log("-->", x, y, z, color, minter, block);
  //       // store in db
  //     });
  //     LightContract.on("UpdatedColor", function (x, y, z, color, updater) {
  //       console.log(">--", x, y, z, color, updater);
  //       // store in db
  //     });

  //     console.log(light);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // })();

  (async () => {
    const events = await LightContract.queryFilter("UpdatedColor", 0);
    console.log(events[0]);
    console.log(
      ":)",
      events.map((e) => `${e.args.join(" ")} ${e.blockNumber}`)
    );
  })();
};
