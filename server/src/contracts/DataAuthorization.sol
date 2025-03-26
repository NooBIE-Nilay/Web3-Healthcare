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

    function requestData(address patient) external onlyDoctorOrAdmin {
        rolesStorage.setRequest(msg.sender, patient, true);
        emit DataRequested(msg.sender, patient);
    }

    function authorizeData(address requester) external onlyPatient {
        if (rolesStorage.getRequest(requester, msg.sender)) {
            rolesStorage.setRequest(requester, msg.sender, false);
        }
        rolesStorage.setAllowedRequest(requester, msg.sender, true);
        emit DataAuthorized(msg.sender, requester);
    }

    function isAuthorized(
        address requester,
        address patient
    ) external view returns (bool) {
        return rolesStorage.getAllowedRequest(requester, patient);
    }
}
