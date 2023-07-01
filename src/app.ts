import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './modules/users/user.route';
const app: Application = express();

//middleare and parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use("/api/v1/users/", router);

//testing route
app.get('/', async (req: Request, res: Response) => {
  res.send({ status: true, message: 'server runinng perfectly' });
});

export default app;
