import express from 'express';
import * as adminController from '../controllers/admin';

const router = express.Router();

router.get('/products', adminController.retrieveAllInstruments);
router.post('/products/create', adminController.createInstruments);

export default router;