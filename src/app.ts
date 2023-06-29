import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

const port = 3000;


//middleare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//testing route
app.get('/', (req: Request, res: Response) => {
    res.send({ message: 's' });
});



export default app;