const path = require ('path');
const fs = require ('fs');
const solc = require ('solc');

/*Variables to read the files that are inside the folder, first taking the path and then reading the file itself.*/
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

const input = {
    language:'Solidity',
    sources: {
        'Inbox.sol': {
            content:source,
        },
    },
    settings:{
        outputSelection:{
            '*':{
              '*': ['*'],
            },
        },
    },
};

/* exports the object inside contracts -- Inbox, which means the bytecode that is inside of it. */
module.exports = JSON.parse(solc.compile(JSON.strinfity(input))).contracts
[
    'Inbox.sol'
].Inbox;