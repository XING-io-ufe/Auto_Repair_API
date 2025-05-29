import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Токен байхгүй байна!' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // decoded → { id, phone, role, iat, exp }
        (req as any).user = decoded;
        next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return res.status(401).json({ message: 'Токен хугацаа нь дууссан байна!' });
        }
        return res.status(403).json({ message: 'Хүчингүй токен байна!' });
    }
};
