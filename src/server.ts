import express from 'express';
import { Application } from 'express';
import * as dotenv from 'dotenv';
import api from "./api";

dotenv.config();

const app: Application = express();
const port = process.env.PORT;

app.use('/api', api);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;
