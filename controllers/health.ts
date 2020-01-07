import { Router, Response, Request } from 'express';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Basic Health Check Route'
    })
});

export default router;