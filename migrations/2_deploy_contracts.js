var engine = artifacts.require("./engine.sol");

module.exports = function(deployer) {
  deployer.deploy(engine);
};
