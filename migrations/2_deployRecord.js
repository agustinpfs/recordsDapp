const RecordContract = artifacts.require("RecordContract");

module.exports = function (deployer) {
    deployer.deploy(RecordContract);
};
