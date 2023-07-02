import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './routes';
const app: Application = express();


//middleare and parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Application routes
app.use("/api/v1", router);


//testing route
app.get('/', (_, res) => {
  res.send({ status: true, message: 'server runinng perfectly' });
});

//global error handler (it should be always under application route)
app.use(globalErrorHandler);

export default app;
