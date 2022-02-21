import express, { Router } from 'express';
import * as instrumentController from '../controllers/instruments';

const router: Router = express.Router();

router.get('/', instrumentController.retrieveAllInstruments);
router.get('/:id', instrumentController.retrieveInstrumentById);
router.post('/', instrumentController.createInstrument);
// router.put('/', instrumentController.updateInstrument);

export default router;