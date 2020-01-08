import { config as dotConfig } from 'dotenv';

dotConfig();

interface IEnv {
    port: number;
    environment: string;
    pg_host: string;
    pg_username: string;
    pg_password: string;
    pg_database: string;
    pg_port: number;
}

const config: IEnv = {
    pg_database: process.env.POSTGRES_DATABASE,
    pg_host: process.env.POSTGRES_HOST,
    pg_password: process.env.POSTGRES_PASSWORD,
    pg_username: process.env.POSTGRES_USERNAME,
    pg_port: Number(process.env.POSTGRES_PORT),
    port: Number(process.env.PORT),
    environment: process.env.NODE_ENV
};

export class Env {
    static all() {
        return config;
    }
}