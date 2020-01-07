import { config as dotConfig } from 'dotenv';

dotConfig();

interface IEnv {
    port: number;
}

const config: IEnv = {
    port: Number(process.env.PORT)
};

export class Env {
    static all() {
        return config;
    }
}