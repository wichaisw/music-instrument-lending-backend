import { Instrument, Prisma } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
import * as instrumentController from '../controllers/instruments';
import { IInstrument } from '../interfaces/instruments';
import prisma from '../prisma/client';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const instruments = instrumentController.retrieveAllInstruments();
    return res.status(200).json(instruments);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const instrumentId: number = Number(req.params.id);

  try {
    const instrument = instrumentController.retrieveInstrumentById(instrumentId);
    return res.status(200).json(instrument);
  } catch(err) {
    next(err)
  }
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { type,  price, name, brand, info } = req.body;
  
  try{
    const instrument = instrumentController.createInstrument(type, price, name, brand, info);
    return res.status(201).json(instrument);
  } catch(err) {
    next(err);
  }
});

// router.put('/', instrumentController.updateInstrument);

export default router;