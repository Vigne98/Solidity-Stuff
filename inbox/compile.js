const path = require ('path');
const fs = require ('fs');
const solc = require ('solc');

/*Variables to read the files that are inside the folder, first taking the path and then reading the file itself.*/
const inboxpath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxpath, 'utf-8');

/* exports the object inside contracts -- Inbox, which means the bytecode that is inside of it. */
module.exports = solc.compile(source, 1).contracts[':Inbox'];