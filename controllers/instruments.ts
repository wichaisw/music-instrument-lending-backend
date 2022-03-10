import { NextFunction, Request, Response } from 'express'
import { IInstrument } from '../interfaces/instruments';
import prisma from '../prisma/client';
import { Prisma } from '@prisma/client';


// ANCHOR GET /products
const retrieveAllInstruments = async() => {
  console.log('retrieveAllProducts');
  try {
    const instruments: IInstrument[] = await prisma.instrument.findMany({
      include: {
        productImages: true,
        reviews: true,
      }
    })
    return instruments;
  } catch(err) {
    throw(err);
  }
}


// ANCHOR GET /products/:id
const retrieveInstrumentById = async(id: number) => {
  console.log('retrieveProductById');

  try {
    const instrument: IInstrument | null = await prisma.instrument.findUnique({
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
const createInstrument = async(type: string, price: number, name: string, brand: string, info: string) => {
  console.log('createInstruments');
  
  try{
    const instrument: IInstrument = await prisma.instrument.create({
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
