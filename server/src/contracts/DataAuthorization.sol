// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RolesStorage.sol";

contract DataAuthorization {
    RolesStorage private rolesStorage;

    event DataRequested(address indexed requester, address indexed patient);
    event DataAuthorized(address indexed patient, address indexed requester);

    modifier onlyDoctorOrAdmin() {
        require(
            rolesStorage.getRole(msg.sender) == RolesStorage.Role.Doctor ||
                rolesStorage.getRole(msg.sender) == RolesStorage.Role.Admin,
            "Only doctors or admins can request data"
        );
        _;
    }

    modifier onlyPatient() {
        require(
            rolesStorage.getRole(msg.sender) == RolesStorage.Role.Patient,
            "Only patients can authorize data"
        );
        _;
    }

    constructor(address _rolesStorage) {
        rolesStorage = RolesStorage(_rolesStorage);
    }

    function requestData(
        address requester,
        address patient
    ) external onlyDoctorOrAdmin {
        address[] memory arr = rolesStorage.getRequest(patient);
        bool exists = false;

        for (uint i = 0; i < arr.length; i++) {
            if (arr[i] == requester) {
                exists = true;
                break;
            }
        }

        if (!exists) rolesStorage.setRequest(requester, patient);
        emit DataRequested(requester, patient);
    }

    function checkRequests(
        address patient
    ) external view returns (address[] memory) {
        return rolesStorage.getRequest(patient);
    }

    function authorizeData(
        address requester,
        address patient
    ) external onlyPatient {
        rolesStorage.removeRequest(requester, patient);

        rolesStorage.setAllowedRequest(requester, patient);
        emit DataAuthorized(patient, requester);
    }

    function checkAuthorized(
        address requester
    ) external view returns (address[] memory) {
        return rolesStorage.getAllowedRequest(requester);
    }

    //TODO: Another function to remove allowed request once viewed
    //Update: Call removeAllowedRequest in that function when accessed
}
