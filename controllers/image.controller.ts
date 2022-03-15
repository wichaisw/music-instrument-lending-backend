import { FullImageDTO, ImageDTO } from '../dtos/Image.dto';
import { Context } from '../prisma/context';

// ANCHOR GET /admin/images
const retrieveAllImages = async(ctx: Context) => {
  console.log('retrieveAllImages');

  try {
    const images: FullImageDTO[] = await ctx.prisma.productImage.findMany();
    return images;
  } catch(err) {
    throw(err);
  }
}

// ANCHOR POST /admin/images
const createImages = async(images: ImageDTO[], ctx: Context) => {
  console.log('createImages');
  
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
   throw(err);
  }
}

export {
  retrieveAllImages,
  createImages
}