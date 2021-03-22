import * as fs from 'fs';
import * as path from 'path';

type Address = {
    city: string;
    zipCode: string;
    address: string;
    lat: number;
    lng: number;
};

const pathAddressesFile = path.join(process.cwd(), 'addresses.json');

console.time('File reading');
const contentFile = fs.readFileSync(pathAddressesFile, 'utf8');
console.timeEnd('File reading');

console.time('Parsing file');
const addresses: Address[] = JSON.parse(contentFile);
console.timeEnd('Parsing file');

export default addresses;
