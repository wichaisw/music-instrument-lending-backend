import { NextFunction, Request, Response } from 'express'
import prisma from '../prisma/client';
import { Prisma } from '@prisma/client';
import { FullInstrumentDTO, InstrumentDTO } from '../dtos/Instrument.dto';


// ANCHOR GET /products
const retrieveAllInstruments = async() => {
  console.log('retrieveAllProducts');
  try {
    const instruments: FullInstrumentDTO[] = await prisma.instrument.findMany({
      include: {
        productImages: true,
        reviews: true,
      }
    })

    throw({message: 'something wrong'})

    return instruments;
  } catch(err) {
    throw(err);
  }
}


// ANCHOR GET /products/:id
const retrieveInstrumentById = async(id: number) => {
  console.log('retrieveProductById');

  try {
    const instrument: FullInstrumentDTO | null = await prisma.instrument.findUnique({
      where: { id }
    });

    // TODO null custom exception
    if(!instrument) {
      throw new Error('instrument not found');
    }

    return instrument;

  } catch(err) {
    throw(err)
  }
}

// ----------------------------------- Admin Controller ----------------------------------------

// ANCHOR POST /products
const createInstrument = async(instrument: InstrumentDTO) => {
  console.log('createInstruments');
  const { type,  price, name, brand, info } = instrument;  

  try{
    const instrument: FullInstrumentDTO = await prisma.instrument.create({
      data: {
        type,
        price,
        name,
        brand,
        info
      }
    })

    return instrument
  } catch(err) {
    throw(err)
  }
}

// ANCHOR PUT /admin/products/edit

export {
  retrieveAllInstruments,
  retrieveInstrumentById,
  createInstrument,
}
