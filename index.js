const faker = require('faker');
const axios = require('axios');
require('dotenv').config();
const addresses = require('./addresses');

async function bootstrap() {
    const urlUserCreation = `${process.env.API_URL}/user`;
    console.time('Users creation');
    for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i];
        const firstname = faker.name.firstName();
        const lastname = faker.name.lastName();
        const user = {
            firstname,
            lastname,
            email: faker.internet.email(firstname, lastname, 'gmail.com'),
            password: process.env.DEFAULT_PASSWORD,
            tel: faker.phone.phoneNumber(),
            ...address,
            status: i % 2 === 0 ? 'godfather' : 'godson',
            activityArea: 'Informatique',
        };
        await axios.post(urlUserCreation, user);
    }
    console.timeEnd('Users creation');
    console.log(`Created ${addresses.length} users`);
}

bootstrap()
    .catch(console.error);
