import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from '../config/inversify.config';
import { Env } from '../config/env';
import { PostgresConnection } from '../config/db';

const server = new InversifyExpressServer(container);
server.setConfig(async (app) => {

    app.use(express.json());

    new PostgresConnection().connect();
});

const serverInstance = server.build();
const PORT = Env.all().port;
serverInstance.listen(PORT, () => {
    console.log(`Listening on port: ${ PORT }`);
});