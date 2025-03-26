// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RolesStorage.sol";

contract HealthRecordsStorage {
    enum DataType {
        Diagnosis,
        Prescription,
        TestResults,
        Other
    }

    struct HealthRecord {
        DataType dataType;
        string dataHash;
        address uploadedBy;
        uint256 timestamp;
    }

    RolesStorage private rolesStorage;

    mapping(address => HealthRecord[]) private patientRecords;

    event RecordUploaded(
        address indexed patient,
        address indexed uploader,
        DataType dataType,
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

    constructor(address _rolesStorage) {
        rolesStorage = RolesStorage(_rolesStorage);
    }

    function storeRecord(
        address patient,
        DataType dataType,
        string memory dataHash
    ) external onlyDoctorOrAdmin {
        patientRecords[patient].push(
            HealthRecord(dataType, dataHash, msg.sender, block.timestamp)
        );
        emit RecordUploaded(patient, msg.sender, dataType, dataHash);
    }

    function getRecords(
        address patient
    ) external view returns (HealthRecord[] memory) {
        return patientRecords[patient];
    }
}
