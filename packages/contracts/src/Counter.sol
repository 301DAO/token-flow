// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

// Credits to https://github.com/adrianmcli/web3-vs-ethers
contract Counter {
    uint public count = 0;

    function increment() public {
        count = count + 1;
    }

    function getCount() public view returns (uint) {
        return count;
    }
}