import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { HTTPStatus } from '../utils/constants';


@controller('/health')
export class HealthController {

    @httpGet('/')
    public get(req: Request, res: Response) {
        return res.status(HTTPStatus.OK).json({
            status: 'success',
            message: 'Basic Health Check Route'
        });
    }
}