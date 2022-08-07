// migrating the appropriate contracts
var SquareVerifier = artifacts.require("../contracts/SquareVerifier.sol")
var SolnSquareVerifier = artifacts.require("../contracts/SolnSquareVerifier.sol")

module.exports = function (deployer) {
  deployer.deploy(SquareVerifier)
  deployer.deploy(SolnSquareVerifier)
}
