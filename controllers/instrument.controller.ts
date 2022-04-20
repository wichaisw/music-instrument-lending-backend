
import { FullInstrumentDTO, InstrumentDTO, PostInstrumentDTO } from '../dtos/Instrument.dto';
import AppError from '../errors/AppError';
import { Context } from '../prisma/context';
import winston from '../utils/logger';

const logger = winston(module);

// ANCHOR GET /products
const retrieveAllInstruments = async(ctx: Context) => {
  logger.info('retrieveAllProducts');
  try {
    const instruments: FullInstrumentDTO[] = await ctx.prisma.instrument.findMany({
      include: {
        productImages: true,
        reviews: true,
      }
    })

    return instruments;
  } catch(err: any) {
    logger.error(err);
    throw new AppError(500, 'error retrieving instruments');
  }
}


// ANCHOR GET /products/:id
const retrieveInstrumentById = async(id: number, ctx: Context) => {
  logger.info('retrieveProductById');
  let instrument: FullInstrumentDTO | null;
  try {
    instrument = await ctx.prisma.instrument.findUnique({
      where: { id },
      include: {
        productImages: true,
        reviews: true,
      }
    });
  } catch(err: any) {
    logger.error(err);
    throw new AppError(500, 'error retrieving an instrument')
  }

  // TODO null custom exception
  if(!instrument) {
    logger.error('instrument not found');
    throw new AppError(404, 'instrument not found');
  }

  return instrument;
}

// ----------------------------------- Admin Controller ----------------------------------------

// ANCHOR POST /products
const createInstrument = async(instrument: InstrumentDTO, ctx: Context) => {
  logger.info('createInstruments');
  const { type,  price, name, brand, info } = instrument;  

  try{
    const instrument: PostInstrumentDTO = await ctx.prisma.instrument.create({
      data: {
        type,
        price,
        name,
        brand,
        info
      }
    })
    
    return instrument
  } catch(err: any) {
    logger.error(err);
    throw new AppError(500, 'error creating an instrument');
  }
}

// ANCHOR PUT /admin/products/edit

export {
  retrieveAllInstruments,
  retrieveInstrumentById,
  createInstrument,
}
