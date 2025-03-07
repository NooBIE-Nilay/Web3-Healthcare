const hello = artifacts.require("hello");

module.exports = function (deployer) {
    deployer.deploy(hello);
};
