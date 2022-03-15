import express, { Application } from 'express';
import cors from 'cors';
import instrumentRoutes from './routes/instrument.router';
import imageRoutes from './routes/image.router';
import { logErrors, errorHandler } from './utils/errorHandlers';

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
app.use(errorHandler)

app.listen(8000, () => {
  console.log("Express server is running on port 8000")
})