//SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Lottery {
    address public manager;
    //updated to address payable
    address payable[] public players;

    //new constructor keyword - remove public keyword
    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(payable(msg.sender));
    }

    function random() private view returns (uint) {
        //pseudo random generator
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted{

        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }
    //specify the data location of address payable[] to be memory
    function getplayers() public view returns(address payable[] memory) {
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager);
        // _ implies where the code is executed from the function where its used
        _;
    }
}