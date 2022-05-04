const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");

//JSON formated input with language, sources and outputselection
const input = {
    language:'Solidity',
    sources:{
        'Lottery.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection:{
        '*': { 
            '*': ['*'],
            },
        },
    },
};
//updated export to provide expected JSON formated export
module.exports = JSON.parse(solc.compile(JSON.stringify(input)))
    .contracts['Lottery.sol']
    .Lottery;