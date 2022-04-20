import express, { NextFunction, Request, Response, Router } from 'express';
import * as imageController from '../controllers/image.controller';
import { FullImageDTO, ImageDTO } from '../dtos/Image.dto';
import { ctx }  from '../prisma/client';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images: FullImageDTO[] = await imageController.retrieveAllImages(ctx);
    res.status(200).json(images);
  } catch(err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const images: ImageDTO[] = req.body;

  try {
    const productImages = await imageController.createImages(images, ctx);
    res.status(201).json(productImages);
  } catch(err) {
    next(err);
  }
});

export default router;