import express, { Application } from 'express';
import cors from 'cors';

import * as errorController from './controllers/error';
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

// catch all, path '/' by default
app.get('/404', errorController.get404);

app.listen(8000, () => {
  console.log("Express server is running on port 8000")
})