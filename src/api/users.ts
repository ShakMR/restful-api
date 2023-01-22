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

    return usersRouter;
}
