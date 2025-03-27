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
        //TODO: check if request from same address exists, if not add
        rolesStorage.setRequest(requester, patient);
        emit DataRequested(requester, patient);
    }

    function authorizeData(
        address requester,
        address patient
    ) external onlyPatient {
        // if (rolesStorage.getRequest(requester, patient)) {
        //     rolesStorage.setRequest(requester, patient, false);
        // }

        //TODO: Search in requests array, bring to last and pop

        rolesStorage.setAllowedRequest(requester, patient);
        emit DataAuthorized(patient, requester);
    }

    function checkRequests(
        address patient
    ) external view returns (address[] memory) {
        return rolesStorage.getRequest(patient);
    }

    function checkAuthorized(
        address requester
    ) external view returns (address[] memory) {
        return rolesStorage.getAllowedRequest(requester);
    }
}
