import {
  retrieveAllInstruments,
  retrieveInstrumentById,
  createInstrument
} from '../../../controllers/instrument.controller';
import { Decimal } from '@prisma/client/runtime';
import { FullInstrumentDTO, InstrumentDTO, PostInstrumentDTO } from '../../../dtos/Instrument.dto';
import { MockContext, Context, createMockContext } from '../../../prisma/context';
import { Instrument } from '@prisma/client';

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

const mockedInstruments: FullInstrumentDTO[] = [
  {
    id: 1,
    name: 'test guitar',
    type: 'acoustic-guitar',
    brand: 'yamaha',
    price: new Decimal(45.50),
    info: 'test product',
    status: 'available',
    productImages: [] as any[],
    reviews: [] as any[],
    userId: 1,
    createdAt: new Date('2021-05-12'),
    createdBy: 1,
    updatedAt: new Date('2021-05-12'),
    updatedBy: 1
  },
  {
    id: 2,
    name: 'test guitar',
    type: 'acoustic-guitar',
    brand: 'yamaha',
    price: new Decimal(45.50),
    info: 'test product',
    status: 'available',
    productImages: [] as any[],
    reviews: [] as any[],
    userId: 1,
    createdAt: new Date('2021-05-12'),
    createdBy: 1,
    updatedAt: new Date('2021-05-12'),
    updatedBy: 1
  },
]

const mockPostInstrument: PostInstrumentDTO = {
  id: 2,
  name: 'test guitar',
  type: 'acoustic-guitar',
  brand: 'yamaha',
  price: new Decimal(45.50),
  info: 'test product',
  status: 'available',
}

describe('instrument controllers', () => {

  describe('GET /products', () => {
    it('should return an array of Instruments', async() => {
      expect.assertions(2);
    
      mockCtx.prisma.instrument.findMany.mockResolvedValue(mockedInstruments);
      const res: Promise<FullInstrumentDTO[]> = retrieveAllInstruments(ctx);
  
      expect(mockCtx.prisma.instrument.findMany.call.length).toBe(1);
      await expect(res).resolves.toEqual(
        mockedInstruments
      );
    });
  });

  describe('GET /products:id', () => {
    it('should return an Instrument', async() => {
      expect.assertions(2);

      mockCtx.prisma.instrument.findUnique.mockResolvedValue(mockedInstruments[1]);
      const res: Promise<FullInstrumentDTO> = retrieveInstrumentById(2, ctx);

      expect(mockCtx.prisma.instrument.findUnique).toBeCalledTimes(1);
      await expect(res).resolves.toEqual(mockedInstruments[1]);
    })

    it('should throw error if the Instrument not found', async() => {
      expect.assertions(1);
      await expect(retrieveInstrumentById(4, ctx)).rejects.toThrow('instrument not found');
    })
  })

  describe('POST /products', () => {
    it('should return Instrument object containing an id', async() => {
      expect.assertions(3);

      const body: InstrumentDTO = {
        name: 'test guitar',
        type: 'acoustic-guitar',
        brand: 'yamaha',
        price: new Decimal(45.50),
        info: 'test product',
      }

      mockCtx.prisma.instrument.create.mockResolvedValue(mockPostInstrument as Instrument);
      const resolvedRes: PostInstrumentDTO = await createInstrument(body, ctx);

      expect(mockCtx.prisma.instrument.create).toBeCalledTimes(1);
      expect(resolvedRes.id).toBeDefined();
      expect(resolvedRes.id).toEqual(expect.any(Number));
    });
  });
});