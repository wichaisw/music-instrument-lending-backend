import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import instrumentRoutes from './routes/instruments';
import imageRoutes from './routes/images';

const app: Application = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use(cors({
  origin: `${process.env.ORIGIN}`
}));

app.use('/products', instrumentRoutes);
app.use('/images', imageRoutes);

app.listen(8000, () => {
  console.log("Express server is running on port 8000")
})