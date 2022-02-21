import { Request, Response } from 'express'
import { IInstrument } from '../interfaces/instruments';
import prisma from '../prisma/client';
import { Prisma } from '@prisma/client';


// ANCHOR GET /admin/products/
const retrieveAllInstruments = async(req: Request, res: Response) => {
  console.log('retrieveAllProducts');
  try {
    const instruments: IInstrument[] = await prisma.instrument.findMany({
      include: {
        productImages: true,
        reviews: true,
      }
    })

    return res.status(200).json(instruments);
  } catch(err) {
    return res.status(400).json({message: err});
  }
}


// ANCHOR GET /products/:id
const retrieveInstrumentById = async(req: Request, res: Response) => {
  console.log('retrieveProductById');

  const id:number = Number(req.params.id);

  try {
    const instrument: IInstrument = await prisma.instrument.findFirst({
      where: { id }
    });

    res.status(200).json(instrument);
  } catch(err) {
    res.status(400).json({message: err})
  }
}

// ----------------------------------- Admin Controller ----------------------------------------

// ANCHOR POST /admin/products/create
const createInstrument = async(req: Request, res: Response) => {
  console.log('createInstruments');
  const { type,  price, name, brand, info } = req.body;
  
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

    return res.status(201).json(instrument);
  } catch(err) {
    return res.status(400).json({message: err});
  }
}

// ANCHOR PUT /admin/products/edit

export {
  retrieveAllInstruments,
  retrieveInstrumentById,
  createInstrument,
}
