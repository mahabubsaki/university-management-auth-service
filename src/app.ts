import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './modules/users/user.route';
const app: Application = express();

//middleare and parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Application routes
app.use("/api/v1/users/", router);

//global error handler (it should be always under application route)
app.use(globalErrorHandler);

//testing route
app.get('/', async (req: Request, res: Response) => {
  res.send({ status: true, message: 'server runinng perfectly' });
});

export default app;
