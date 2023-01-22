import { Router } from "express";
import users from "./users";
import Service from "../services/Service";
import { APIConfig } from "../config";
import UsersService from "../services/UsersService";

export default (services: { usersService: UsersService }, config: APIConfig): Router => {
    const apiRouter = Router();

    apiRouter.use('/users', users(services.usersService));

    return apiRouter;
};
