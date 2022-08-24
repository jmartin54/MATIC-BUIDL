const { ethers } = require("ethers");
const LightBuild = require("./contracts/build/Light.json");

module.exports = function eventSync() {
  (async () => {
    // get contract
    const contract = await LightContract();
    // get latest event
    const latest = await latestStoredEvent();
    // get block from latest event
    const latestBlock = await blockFrom(latest);
    // filter from latest block to current block
    const filter = await getFilter(contract, latestBlock);
    // fetch events
    const events = await getEvents(contract, filter);
    // store new events
    handleEvents(events);
  })();
};

async function LightContract() {
  const url = "http://localhost:7545";
  const provider = new ethers.providers.JsonRpcProvider(url);
  // Connect to contract
  const contract = new ethers.Contract(
    //LightBuild.networks["5777"].address,
    "0x2f61f1e6631d9a5752c4af2e3508375f93674342",
    LightBuild.abi,
    provider
  );
  return contract;
}

async function latestStoredEvent() {}

async function blockFrom(latest) {}

async function getFilter(contract, latestBlock) {
  let contractEnsName = "0x2f61f1e6631d9a5752c4af2e3508375f93674342";

  let topic = ethers.utils.id(
    "UpdatedColor(int x, int y, int z, uint color, address updater)"
  );

  let filter = {
    fromBlock: 0,
    toBlock: "latest",
    topics: [topic],
  };

  //   contract.getLogs(filter).then((result) => {
  //     console.log(result);
  //   });
  return filter;
  //   return contract.queryFilter(
  //     contract.filters.UpdatedColor(),
  //     "0x1cff27d728f1d7c81f6533992e87d48c323a371b93ee3ff5e0901f771bd2b1b3"
  //   );
}

async function getEvents(contract, filter) {
  const onEvent = (name, rest) => {
    console.log(name, rest);
  };
  //   contract.on("Minted", (...rest) => onEvent("Minted", rest));
  //   contract.on("UpdatedColor", (...rest) => onEvent("UpdatedColor", rest));
  contract.on(filter, (...rest) => onEvent("filter", rest));
}

async function handleEvents(events) {}
