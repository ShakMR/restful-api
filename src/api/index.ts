import { Router } from "express";
import users from "./users";

const apiRouter = Router();

apiRouter.use('/users', users);

export default apiRouter;
