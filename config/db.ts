import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Env } from './env';

const env = Env.all();

export class PostgresConnection {
    connect() {
        createConnection({
            type: 'postgres',
            host: env.pg_host,
            port: env.pg_port,
            username: env.pg_username,
            password: env.pg_password,
            database: env.pg_database,
            synchronize: false,
            entities: ['../src/entity/*.js'],
            migrations: [__dirname + '../src/migration/*.js'],
            cli: {
                migrationsDir: 'migration'
            },
            logging: env.environment !== 'production'
        }).then(connection => {
            // work can start on the entities
            console.log('Successfully create TypeORM PostgreSQL connection.');
        }).catch(error => console.log(`Database Connection Error: ${ JSON.stringify(error, null, 2) }`));
    }
}