import express, { Request, Response } from 'express';
import healthController from './controllers/health';

const app = express();
const PORT = 8080;

app.use('/', healthController);
app.use('*', (req: Request, res: Response) => {
    return res.status(404).json({
        status: 'error',
        message: 'Resource not available.'
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${ PORT }`);
});