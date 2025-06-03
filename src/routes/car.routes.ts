import express from 'express';
import { addedCar, CarAdd, CarView } from '../controllers/car.controller';
import { asyncHandler } from '../utils/asyncHandler';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.get('/carData', asyncHandler(CarAdd));
router.get('/carView', asyncHandler(CarView));

router.post('/addedCar', asyncHandler(verifyToken), asyncHandler(addedCar));
export default router;
