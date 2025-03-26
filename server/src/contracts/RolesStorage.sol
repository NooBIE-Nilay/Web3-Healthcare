// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RolesStorage {
    enum Role {
        Undefined,
        Doctor,
        Admin,
        Patient
    }
    enum DataType {
        Diagnosis,
        Prescription,
        LabResults
    }

    mapping(address => Role) public roles;
    mapping(address => mapping(address => bool)) private requests;
    mapping(address => mapping(address => bool)) private allowedRequests;
    mapping(address => DataType[]) private patientData;

    function setRole(address account, Role role) external {
        roles[account] = role;
    }

    function getRole(address account) external view returns (Role) {
        return roles[account];
    }

    function setRequest(
        address requester,
        address patient,
        bool status
    ) external {
        requests[requester][patient] = status;
    }

    function getRequest(
        address requester,
        address patient
    ) external view returns (bool) {
        return requests[requester][patient];
    }

    function setAllowedRequest(
        address requester,
        address patient,
        bool status
    ) external {
        allowedRequests[requester][patient] = status;
    }

    function getAllowedRequest(
        address requester,
        address patient
    ) external view returns (bool) {
        return allowedRequests[requester][patient];
    }

    function addPatientData(address patient, DataType dataType) external {
        patientData[patient].push(dataType);
    }

    function getPatientData(
        address patient
    ) external view returns (DataType[] memory) {
        return patientData[patient];
    }
}
