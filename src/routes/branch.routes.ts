import express from 'express';
import { branchAdd, branchView } from '../controllers/branch.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.get('/branchData', asyncHandler(branchAdd));
router.get('/branchView', asyncHandler(branchView));

export default router;
