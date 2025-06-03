import express from 'express';
import { createBooking } from '../controllers/booking.controller';
import { asyncHandler } from '../utils/asyncHandler';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();


router.post('/booking', asyncHandler(verifyToken), asyncHandler(createBooking));

export default router;