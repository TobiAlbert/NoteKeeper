import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './config/inversify.config';
import { Env } from './config/env';

const server = new InversifyExpressServer(container);
server.setConfig((app) => {

    app.use(express.json());

    app.use('*', (req: Request, res: Response) => {
        return res.status(404).json({
            status: 'error',
            message: 'Resource not available.'
        });
    });
});

const serverInstance = server.build();
const PORT = Env.all().port;
serverInstance.listen(PORT, () => {
    console.log(`Listening on port: ${ PORT }`);
});