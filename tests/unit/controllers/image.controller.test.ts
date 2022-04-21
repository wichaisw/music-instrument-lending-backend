import { ProductImage } from '@prisma/client';
import { 
  retrieveAllImages,
  createImages,
} from '../../../controllers/image.controller';
import { FullImageDTO, ImageDTO } from '../../../dtos/Image.dto';
import AppError from '../../../errors/AppError';
import { MockContext, Context, createMockContext } from '../../../prisma/context';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

const mockedImages: FullImageDTO[] = [
  {
    id: 1,
    imageUrl: 'https://mockeurl',
    instrumentId: 80,
    createdAt: new Date('2021-05-12'),
    createdBy: 1,
    updatedAt: new Date('2021-05-12'),
    updatedBy: 1
  },
  {
    id: 2,
    imageUrl: 'https://mockeurl',
    instrumentId: 80,
    createdAt: new Date('2021-05-12'),
    createdBy: 1,
    updatedAt: new Date('2021-05-12'),
    updatedBy: 1
  }
]

describe('image controllers', () => {
  describe('GET /images', () => {
    it('should return an array of images', async() => {
      expect.assertions(2);

      mockCtx.prisma.productImage.findMany.mockResolvedValue(mockedImages);
      const res: Promise<FullImageDTO[]> = retrieveAllImages(ctx);

      expect(mockCtx.prisma.productImage.findMany).toBeCalledTimes(1);
      await expect(res).resolves.toEqual(
        mockedImages
      )

    })
  })

  describe('POST /images', () => {
    const body: ImageDTO[] = [
      {
        imageUrl: 'https://mockedurl',
        instrumentId: 80,
      },
      {
        imageUrl: 'https://mockedurl',
        instrumentId: 80,
      }
    ]

    it('should return ProductImage objects containing an id', async() => {
      expect.assertions(2);

      mockCtx.prisma.productImage.create.mockResolvedValue(mockedImages[0] as ProductImage);
      const resolvedRes: FullImageDTO[] | void[] = await createImages(body, ctx);
    
      expect(mockCtx.prisma.productImage.create).toBeCalled();
      expect(resolvedRes).toBeInstanceOf(Array);
    })
  })
})
