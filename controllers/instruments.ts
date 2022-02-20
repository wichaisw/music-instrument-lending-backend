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

export {
  retrieveAllInstruments,
  createInstrument,
}
