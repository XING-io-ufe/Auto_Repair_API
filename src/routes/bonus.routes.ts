import express from 'express';
import { bonus } from '../controllers/bonus.controller';
import { asyncHandler } from '../utils/asyncHandler';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.get('/bonus', asyncHandler(verifyToken), asyncHandler(bonus));

export default router;
