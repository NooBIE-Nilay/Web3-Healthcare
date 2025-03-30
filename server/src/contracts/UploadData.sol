// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./HealthRecordsStorage.sol";
import "./RolesStorage.sol";

contract UploadData {
    HealthRecordsStorage private healthRecordsStorage;
    RolesStorage private rolesStorage;

    event DataUploaded(
        address indexed patient,
        address indexed uploader,
        HealthRecordsStorage.DataType dataType,
        string dataHash
    );

    modifier onlyDoctorOrAdmin() {
        require(
            rolesStorage.getRole(msg.sender) == RolesStorage.Role.Doctor ||
                rolesStorage.getRole(msg.sender) == RolesStorage.Role.Admin,
            "Only doctors or admins can upload data"
        );
        _;
    }

    constructor(address _healthRecordsStorage, address _rolesStorage) {
        healthRecordsStorage = HealthRecordsStorage(_healthRecordsStorage);
        rolesStorage = RolesStorage(_rolesStorage);
    }

    function uploadPatientData(
        address patient,
        HealthRecordsStorage.DataType dataType,
        string memory dataHash
    ) external onlyDoctorOrAdmin {
        healthRecordsStorage.storeRecord(patient, dataType, dataHash);
        emit DataUploaded(patient, msg.sender, dataType, dataHash);
    }
}
