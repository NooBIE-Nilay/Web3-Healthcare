// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RolesStorage.sol";

contract RoleAssignment {
    RolesStorage private rolesStorage;

    event RoleAssigned(address indexed account, RolesStorage.Role role);

    modifier onlyAdmin() {
        require(
            rolesStorage.getRole(msg.sender) == RolesStorage.Role.Admin,
            "Only admins can assign roles"
        );
        _;
    }

    constructor(address _rolesStorage) {
        rolesStorage = RolesStorage(_rolesStorage);
        rolesStorage.setRole(msg.sender, RolesStorage.Role.Admin);
    }

    function assignRole(
        address account,
        RolesStorage.Role role
    ) external onlyAdmin {
        rolesStorage.setRole(account, role);
        emit RoleAssigned(account, role);
    }

    function getRole(
        address account
    ) external view returns (RolesStorage.Role) {
        return rolesStorage.getRole(account);
    }
}
