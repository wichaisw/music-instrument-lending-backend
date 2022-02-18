import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

// ANCHOR GET /admin/products/
const retrieveAllInstruments = async(req: Request, res: Response) => {
  console.log('retrieveAllProducts');
  try {
    const instruments = await prisma.instrument.findMany({
      include: {
        productImage: true,
        reviews: true,
      }
    })

    return res.status(200).json(instruments);
  } catch(err) {
    return res.status(400).json({message: err});
  }
}

// ANCHOR POST /admin/products/create
const createInstruments = async(req: Request, res: Response) => {
  console.log('createInstruments');
  const { type,  price, name, brand, info } = req.body;
  
  try{
    const instrument = await prisma.instrument.create({
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
  createInstruments,
}