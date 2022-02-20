import express, { Router } from 'express';
import * as imageController from '../controllers/images';

const router: Router = express.Router();

router.get('/', imageController.retrieveAllImages);
router.post('/', imageController.createImages);

export default router;