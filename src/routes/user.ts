// routes/user.ts
import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.get('/me', asyncHandler(verifyToken), async (req, res) => {
    const user = (req as any).user;
    res.json({ message: 'Амжилттай!', user });
});

export default router;
