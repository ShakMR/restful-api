import { Router, Request, Response } from "express";
import usersService from "../services/UsersService";
import UsersService from "../services/UsersService";

export default (usersService: UsersService) => {
    const usersRouter = Router();

    usersRouter.get('/', async (req: Request, resp: Response) => {
        const users = await usersService.getAll();
        resp.json({
            data: users
        });
    });

    usersRouter.get('/:uuid', async (req: Request, resp: Response) => {
        const { uuid } = req.params;
        const user = await usersService.getByUuid(uuid);

        resp.json({
            data: [
                user
            ]
        });
    })

    return usersRouter;
}
