const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
/* This is the line we will change when using other providers */
const web3 = new Web3(ganache.provider());
const { interface, bytecode} = require('../compile');

let accounts;
let inbox;
const Initial_string = 'Hi there'

beforeEach(async () => {
    //await help the variable to wait the whole amount of accounts to be inyected into accounts
    accounts = await web3.eth.getAccounts(); 

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [ Initial_string ] })
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

/*
'0xC65d9a51fa0093363DBeD65AC83f452Ef57dfcaE',
'0x28fc6AB0c821C2CA6Ca7e1CEf0763e7225F62b39',
'0x3d11182F503A6D72447bFAa2B027f3A424E332f2',
'0x14F5C1D5587C1b5D0A5B53b35Ddd4d6996e05685',
'0xB80954D2E32E84B570b3fbC0963a8c9CDe6228F4',
'0x562136f2860Bd140CcF9F2b2D383390148910E18',
'0xF08Ef9428A13a1b3648F76C9Dd736D4A76212dbE',
'0x9141aF24549b16428975AbEffD5985e4C206EbC6',
'0x6039bdf3a8FcbD549de3A1aC1Dfec4C441C50338',
'0xA8D50b59Ecf608883162db37e25874EbC2A1275c'
*/