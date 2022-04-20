import { FullImageDTO, ImageDTO } from '../dtos/Image.dto';
import AppError from '../errors/AppError';
import { Context } from '../prisma/context';
import winston from '../utils/logger';

const logger = winston(module);

// ANCHOR GET /admin/images
const retrieveAllImages = async(ctx: Context) => {
  logger.info('retrieveAllImages');

  try {
    const images: FullImageDTO[] = await ctx.prisma.productImage.findMany();
    return images;
  } catch(err) {
    logger.error(err)
    throw new AppError(500, 'error retrieving images');
  }
}

// ANCHOR POST /admin/images
const createImages = async(images: ImageDTO[], ctx: Context) => {
  logger.info('createImages');
  
  try {
    const productImages = await Promise.all(
      images.map(async (image: ImageDTO) => {
        await ctx.prisma.productImage.create({
          data: {
            instrumentId: image.instrumentId,
            imageUrl: image.imageUrl,
          }
        })
      })
    )

   return productImages;
  } catch(err) {
    logger.error(err)
    throw new AppError(500, 'error creating images');
  }
}

export {
  retrieveAllImages,
  createImages
}