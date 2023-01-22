import express from 'express';
import { Application } from 'express';
import api from "./api";
import UsersService from "./services/UsersService";
import MockedUsersDal from "./dal/MockedUsersDal";
import config from "./config";

const app: Application = express();
const port = process.env.PORT;

const usersDal = new MockedUsersDal();

const services = {
    usersService: new UsersService(usersDal),
}

// add dependency injection here by using function composition
app.use('/api', api(services, config.api));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;
