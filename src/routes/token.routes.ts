import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { asyncHandler } from '../utils/asyncHandler';
import { tokenCheck } from '../controllers/token.controller';

const router = express.Router();

router.get('/token', asyncHandler(verifyToken), asyncHandler(tokenCheck));

export default router;
