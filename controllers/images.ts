import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { FullImageDTO, ImageDTO } from '../dtos/Image.dto';

// ANCHOR GET /admin/images
const retrieveAllImages = async() => {
  console.log('retrieveAllImages');

  try {
    const images: FullImageDTO[] = await prisma.productImage.findMany();
    return images;
  } catch(err) {
    throw(err);
  }
}

// ANCHOR POST /admin/images
const createImages = async(images: ImageDTO[]) => {
  console.log('createImages');
  
  try {
    const productImages = await Promise.all(
      images.map(async (image: ImageDTO) => {
        await prisma.productImage.create({
          data: {
            instrumentId: image.instrumentId,
            imageUrl: image.imageUrl,
          }
        })
      })
    )

   return productImages;
  } catch(err) {
   throw(err);
  }
}

export {
  retrieveAllImages,
  createImages
}