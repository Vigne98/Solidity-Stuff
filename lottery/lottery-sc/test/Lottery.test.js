const assert = require ('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode} = require ('../compile');

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send ({ from: accounts[0], gas:'1000000'});
});

describe('Lottery Contract', () => {
    it('Deploys a contract',() =>{
        assert.ok(lottery.options.address);
    })
    it('Enters in lottery', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.011', 'ether')
        });
        const players = await lottery.methods.getplayers().call({
            from: accounts[0]
        });
        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('Diff acc enter in lottery', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.011', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.011', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.011', 'ether')
        });


        const players = await lottery.methods.getplayers().call({
            from: accounts[0]
        });
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it('Send correct amount of ETH', async () =>{
        try{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: 20000
        });
        assert(false);
    }   catch (err) {
        assert(err);
        }
    });
    it('Only Manager can pick', async () =>{
        try{
        await lottery.methods.pickWinner().send({
            from: accounts[1],
        });
        assert(false);
    }   catch (err) {
        assert(err);
        }
    });
    it('Send money to winner & reset player array', async () =>{
        await lottery.methods.enter().send({
            from:accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({from: accounts[0]});
        const currentBalance = await web3.eth.getBalance(accounts[0]);
        const difference = currentBalance - initialBalance;

        assert(difference > web3.utils.toWei('1.5', 'ether'));
    });
});