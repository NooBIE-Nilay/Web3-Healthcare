// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RolesStorage {
    enum Role {
        Undefined,
        Doctor,
        Admin,
        Patient
    }

    mapping(address => Role) public roles;
    mapping(address => address[]) private requests;
    mapping(address => address[]) private allowedRequests;

    function setRole(address account, Role role) external {
        roles[account] = role;
    }

    function getRole(address account) external view returns (Role) {
        return roles[account];
    }

    function setRequest(address requester, address patient) external {
        require(patient != requester, "Cannot request self");
        requests[patient].push(requester);
    }

    function getRequest(
        address patient
    ) external view returns (address[] memory) {
        return requests[patient];
    }

    function setAllowedRequest(address requester, address patient) external {
        allowedRequests[requester].push(patient);
    }

    function getAllowedRequest(
        address requester
    ) external view returns (address[] memory) {
        return allowedRequests[requester];
    }
}
