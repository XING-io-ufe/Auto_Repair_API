import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Bonus_type_enum } from '../generated/prisma';

const prisma = new PrismaClient();

export const getUserBonus = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.id;
    if (!userId) {
        return res.status(400).json({ message: 'Хэрэглэгч олдсонгүй!' });
    }
    try {
        const userBonus = await prisma.bonus.findMany({
            where: { Bonus_user_ID: userId },
            select: {
                Bonus_point: true,
            }
        });
        return res.status(200).json({ data: userBonus });
    } catch (error) {
        return res.status(500).json({ message: 'Бонус оноо олдсонгүй!' });
    }
};