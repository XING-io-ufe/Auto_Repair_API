import { Request, Response, NextFunction } from 'express';

export const tokenCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ user: (req as any).user });
};