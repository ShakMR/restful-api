import { Router, Request, Response } from "express";

const usersRouter = Router();

usersRouter.get('/', (req: Request, resp: Response) => {
    resp.sendStatus(200);
});

export default usersRouter;
