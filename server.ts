import express, { Application, Request, Response } from 'express';
import adminRoutes from './routes/admin';

const app: Application = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use('/admin', adminRoutes);

app.listen(8000, () => {
  console.log("Express server is running on port 8000")
})