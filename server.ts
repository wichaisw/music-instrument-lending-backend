import express, { Application, Request, Response } from 'express';
import instrumentRoutes from './routes/instruments';
import imageRoutes from './routes/images';

const app: Application = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use('/admin/products', instrumentRoutes);
app.use('/admin/images', imageRoutes);

app.listen(8000, () => {
  console.log("Express server is running on port 8000")
})