pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }
    //payable functions expect payment
    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }
    function random() private view returns (uint) {
        //pseudo random generator
        return uint(keccak256(block.difficulty, now, players));
    }
    function pickWinner() public restricted{

        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }

    function getplayers() public view returns(address[]) {
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager);
        // _ implies where the code is executed from the function where its used
        _;
    }
}