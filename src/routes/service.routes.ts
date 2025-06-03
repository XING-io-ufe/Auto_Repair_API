import express from 'express';
import { serviceAdd, serviceView } from '../controllers/service.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.get('/serviceData', asyncHandler(serviceAdd));
router.get('/serviceView', asyncHandler(serviceView));

export default router;
