import express, { NextFunction, Request, Response, Router } from 'express';
import * as instrumentController from '../controllers/instrument.controller';
import { FullInstrumentDTO, InstrumentDTO } from '../dtos/Instrument.dto';
import { ctx } from '../prisma/client';
const router: Router = express.Router();

router.get('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const instruments: FullInstrumentDTO[] = await instrumentController.retrieveAllInstruments(ctx)
    return res.status(200).json(instruments);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
  const instrumentId: number = Number(req.params.id);

  try {
    const instrument: FullInstrumentDTO = await instrumentController.retrieveInstrumentById(instrumentId, ctx);
    return res.status(200).json(instrument);
  } catch(err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  
  try{
    const instrument: InstrumentDTO = await instrumentController.createInstrument(req.body as InstrumentDTO, ctx);
    return res.status(201).json(instrument);
  } catch(err) {
    next(err);
  }
});

// router.put('/', instrumentController.updateInstrument);

export default router;