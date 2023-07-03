import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
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

//ERRORS HANDLERS


//global error handler should be always under the application route
app.use(globalErrorHandler);

//not found error handler
app.use((req: Request, res: Response) => {

  if (!res.headersSent) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Route not found",
      errorMessages: [{
        path: req.originalUrl,
        message: "API Route not found"
      }]
    });
  }
});


export default app;
