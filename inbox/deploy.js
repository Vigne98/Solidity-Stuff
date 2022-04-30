const HDwalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { abi, evm } = require('./compile');
const provider = new HDwalletProvider(
    'vote top planet boil version brisk twenty purse decrease adjust jealous noise', 
    'https://rinkeby.infura.io/v3/21a1c0fb449e4d998a4a6c485b4b1b6d'
);
const web3 = new Web3(provider);

const deploy = async () =>{
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data:evm.bytecode.object, arguments: ['Hi there'] })
        .send({ gas:'1000000', from: accounts[0] })

    console.log('Contract deployed to', result.options.address)
    provider.engine.stop();
};
deploy ();