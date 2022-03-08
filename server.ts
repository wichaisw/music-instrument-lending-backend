import express, { Application } from 'express';
import cors from 'cors';
import * as errorController from './controllers/error';
import instrumentRoutes from './routes/instruments';
import imageRoutes from './routes/images';
import { logErrors, clientErrorHandler, errorHandler } from './utils/errorHandlers';

export const app: Application = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use(cors({
  origin: `${process.env.ORIGIN}`
}));

app.use('/products', instrumentRoutes);
app.use('/images', imageRoutes);

// catch all
// app.use('/404', errorController.get404);
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

app.listen(8000, () => {
  console.log("Express server is running on port 8000")
})