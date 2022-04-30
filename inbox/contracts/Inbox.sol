pragma solidity ^0.4.17;

contract Inbox{
    string public message;

    function Inbox(string IM) public {
        message = IM;
    }
    function setMessage(string newMsg) public {
        message = newMsg;
    }
}