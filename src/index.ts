import "reflect-metadata";
import {createConnection} from "typeorm";
import * as faker from 'faker';
import { config } from 'dotenv';
import addresses from './addresses';
import {User} from "./entity/User";
import { Address } from "./entity/Address.entity";

config();

async function bootstrap() {
    const connection = await createConnection({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [
            __dirname + "/entity/*.js"
        ],
        synchronize: false,
    });

    console.time('Users creation');
    for (let i = 0; i < addresses.length; i++) {
        const address = new Address();
        address.address = addresses[i].address;
        address.city = addresses[i].city;
        address.zipCode = addresses[i].zipCode;
        address.latitude = addresses[i].lat;
        address.longitude = addresses[i].lng;
        address.location = {
            type: 'Point',
            coordinates: [addresses[i].lng, addresses[i].lat],
        };

        await connection.manager.save(address);
        const firstname = faker.name.firstName();
        const lastname = faker.name.lastName();
        const user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = faker.internet.email(firstname, lastname, 'gmail.com');
        user.password = process.env.DEFAULT_PASSWORD;
        user.tel = faker.phone.phoneNumber();
        user.status = i % 2 === 0 ? 'godfather' : 'godson';
        user.activityArea = 'Informatique';
        user.address = address;

        await connection.manager.save(user);
    }
    console.timeEnd('Users creation');
    console.log(`Created ${addresses.length} users`);
}

bootstrap()
    .catch(console.error);
