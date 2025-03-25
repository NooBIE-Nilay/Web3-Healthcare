const DataAuthorization = artifacts.require("DataAuthorization");
const HealthRecordsStorage = artifacts.require("HealthRecordsStorage");
const RoleAssignment = artifacts.require("RoleAssignment");
const RolesStorage = artifacts.require("RolesStorage");
const UploadData = artifacts.require("UploadData");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(RolesStorage);
    const rolesStorage = await RolesStorage.deployed();

    await deployer.deploy(RoleAssignment, rolesStorage.address);
    const roleAssignment = await RoleAssignment.deployed();

    await deployer.deploy(HealthRecordsStorage, rolesStorage.address);
    const healthRecordsStorage = await HealthRecordsStorage.deployed();

    await deployer.deploy(DataAuthorization, rolesStorage.address);
    const dataAuthorization = await DataAuthorization.deployed();

    await deployer.deploy(UploadData, healthRecordsStorage.address, rolesStorage.address);
};
