const Light = artifacts.require("Light");

module.exports = function (deployer) {
  deployer.deploy(Light);
};
