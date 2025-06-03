import express from 'express';
import { manufacturerAdd, manufacturerView } from '../controllers/manufacturer.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.get('/manufacturerData', asyncHandler(manufacturerAdd));
router.get('/manufacturerView', asyncHandler(manufacturerView));

export default router;
