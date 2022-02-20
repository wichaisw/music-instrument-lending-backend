import express, { Router } from 'express';
import * as instrumentController from '../controllers/instruments';

const router: Router = express.Router();

router.get('/', instrumentController.retrieveAllInstruments);
router.post('/create', instrumentController.createInstrument);

export default router;