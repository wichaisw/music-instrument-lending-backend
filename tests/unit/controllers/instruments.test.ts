import { prismaMock } from '../../../prisma/singleton';
import {
  retrieveAllInstruments,
  retrieveInstrumentById,
  createInstrument
} from '../../../controllers/instruments';
import { Decimal } from '@prisma/client/runtime';
import { Request, Response, NextFunction } from 'express';
import { any, anyNumber, anyObject, anyString } from 'jest-mock-extended';
import { FullInstrumentDTO, InstrumentDTO } from '../../../dtos/Instrument.dto';

const mockedInstruments: FullInstrumentDTO[] = [
  {
    id: 1,
    name: 'test guitar',
    type: 'acoustic-guitar',
    brand: 'yamaha',
    price: new Decimal(45.50),
    info: 'test product',
    status: 'available',
    productImages: {} as any,
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
    productImages: {} as any,
    userId: 1,
    createdAt: new Date('2021-05-12'),
    createdBy: 1,
    updatedAt: new Date('2021-05-12'),
    updatedBy: 1
  },
]

describe('retrieve all instrument', () => {

  it('should return all Instrument', async() => {
   
    const req: Partial<Request> = {};
    const res: Partial<Response> = {};
    const next: NextFunction = jest.fn();

    prismaMock.instrument.findMany.mockResolvedValue(mockedInstruments);
    const expectedRes = retrieveAllInstruments(req as Request, res as Response, next);

    console.log('--expected--')
    console.log(expectedRes)

    await expect(expectedRes).resolves.toEqual(
      mockedInstruments
    )
    expect.assertions(1);
  })

  // it('should create an Instrument', async() => {
  //   const instrument: IInstrument = {
  //     type: 'acoustic-guitar',
  //     price: new Decimal(7.50),
  //     name: 'test guitar',
  //     brand: 'Yamaha',
  //     info: 'test product'
  //   }

  //   let responseObject: IInstrument = {} as IInstrument
  //   const req: Request = {} as Request;
  //   const res: Partial<Response> = {
  //     json: jest.fn().mockImplementation((result) => {
  //       responseObject = result;
  //     })
  //   };

  //   req.body = {
  //     instrument
  //   }
  
  //   prismaMock.instrument.create.mockResolvedValue(instrument as IInstrumentDTO)


  //   await expect(createInstrument(req, res as Response)).resolves.toEqual({
  //     id: 1,
  //     type: 'acoustic-guitar',
  //     price: new Decimal(7.50),
  //     name: 'test guitar',
  //     brand: 'Yamaha',
  //     info: 'test product'
  //   })

  //   expect(responseObject).toEqual({  })
  //   // expect.assertions(1);
  // })

  
})