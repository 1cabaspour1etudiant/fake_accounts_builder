const fs = require('fs');
const path = require('path');
const pathAddressesFile = path.join(process.cwd(), 'addresses.json');

console.time('File reading');
const contentFile = fs.readFileSync(pathAddressesFile, 'utf8');
console.timeEnd('File reading');

console.time('Parsing file');
const addresses = JSON.parse(contentFile);
console.timeEnd('Parsing file');

module.exports = addresses;
