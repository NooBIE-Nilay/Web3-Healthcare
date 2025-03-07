// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract hello {
    uint number;
    function set(uint x) public {
        number = x;
    }
    function get() public view returns (uint) {
        return number;
    }
}
