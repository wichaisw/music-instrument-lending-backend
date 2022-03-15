import { FullInstrumentDTO, InstrumentDTO } from '../dtos/Instrument.dto';
import { Context } from '../prisma/context';

// ANCHOR GET /products
const retrieveAllInstruments = async(ctx: Context) => {
  console.log('retrieveAllProducts');
  try {
    const instruments: FullInstrumentDTO[] = await ctx.prisma.instrument.findMany({
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
const retrieveInstrumentById = async(id: number, ctx: Context) => {
  console.log('retrieveProductById');

  try {
    const instrument: FullInstrumentDTO | null = await ctx.prisma.instrument.findUnique({
      where: { id },
      include: {
        productImages: true,
        reviews: true,
      }
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
const createInstrument = async(instrument: InstrumentDTO, ctx: Context) => {
  console.log('createInstruments');
  const { type,  price, name, brand, info } = instrument;  

  try{
    const instrument: InstrumentDTO = await ctx.prisma.instrument.create({
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
