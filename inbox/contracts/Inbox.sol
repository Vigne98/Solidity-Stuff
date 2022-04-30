//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Inbox {
    string public message;

    constructor(string memory IM){
        message = IM;
    }
    function setMessage(string memory newMsg) public {
        message = newMsg;
    }
}