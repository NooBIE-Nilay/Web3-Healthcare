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
        require(patient != requester, "Cannot request self");
        allowedRequests[requester].push(patient);
    }

    function getAllowedRequest(
        address requester
    ) external view returns (address[] memory) {
        return allowedRequests[requester];
    }

    function removeRequest(address requester, address patient) external {
        if (requests[patient].length == 0) return;

        for (uint i = 0; i < requests[patient].length; i++) {
            if (requests[patient][i] == requester) {
                requests[patient][i] = requests[patient][
                    requests[patient].length - 1
                ];
                requests[patient].pop();
                break;
            }
        }
    }

    function removeAllowedRequest(address requester, address patient) external {
        if (allowedRequests[requester].length == 0) return;

        for (uint i = 0; i < allowedRequests[requester].length; i++) {
            if (allowedRequests[requester][i] == patient) {
                allowedRequests[requester][i] = allowedRequests[requester][
                    allowedRequests[requester].length - 1
                ];
                allowedRequests[requester].pop();
                break;
            }
        }
    }
}
