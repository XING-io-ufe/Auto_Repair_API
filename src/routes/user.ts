// routes/user.ts
import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.get('/me', verifyToken, async (req, res) => {
    const user = (req as any).user;
    res.json({ message: 'Амжилттай!', user });
});

export default router;
