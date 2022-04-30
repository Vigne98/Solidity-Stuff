const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
/* This is the line we will change when using other providers */
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let accounts;
let inbox;
const Initial_string = 'Hi there'

beforeEach(async () => {
    //await help the variable to wait the whole amount of accounts to be inyected into accounts
    accounts = await web3.eth.getAccounts(); 

    inbox = await new web3.eth.Contract(abi)
        .deploy({ data:evm.bytecode.objetct, arguments: [ Initial_string ] })
        //.send triggers the communication from web3 to network
        .send({ from: accounts[0], gas: '1000000' })
});

describe ('Inbox', () =>{
    it('deploys a contract', () =>{
        assert.ok(inbox.options.address);
    });

    it ('has default message', async () =>{
        const message = await inbox.methods.message().call();
        assert.equal(message, Initial_string);
    })
    it ('set message works', async () =>{
        await inbox.methods.setMessage('bye')
            .send({ from: accounts[0], gas: '1000000'})
            const message = await inbox.methods.message().call();
            assert.equal(message, 'bye');
    })
});
