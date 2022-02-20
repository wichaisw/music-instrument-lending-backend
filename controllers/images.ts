import { Request, Response } from 'express';
import { IImages } from '../interfaces/images';
import prisma from '../prisma/client';

// ANCHOR GET /admin/images
const retrieveAllImages = async(req: Request, res: Response) => {
  console.log('retrieveAllImages');

  try {
    const images = await prisma.productImage.findMany();
    res.status(200).json(images);
  } catch(err) {
    res.status(400).json({message: err});
  }
}

// ANCHOR POST /admin/images
const createImages = async(req: Request, res: Response) => {
  console.log('createImage');
  
  const images: IImages[] = req.body;

  try {
    const productImages = await Promise.all(
      images.map(async (image: IImages) => {
        await prisma.productImage.create({
          data: {
            instrumentId: image.instrumentId,
            imageUrl: image.imageUrl,
          }
        })
      })
    )

    res.status(201).json(productImages);
  } catch(err) {
    res.status(400).json({message: err});

  }
}

export {
  retrieveAllImages,
  createImages
}