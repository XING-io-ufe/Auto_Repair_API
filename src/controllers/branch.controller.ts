import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../generated/prisma';
import expiresTime from '../utils/expiresTime';
import data from '../data/branches.json'

const prisma = new PrismaClient();

export const branchAdd = async (req: Request, res: Response, next: NextFunction) => {

    const dataToInsert = data.map(branch => ({
        ...branch,
        Multi_branch_create_at: expiresTime(0)
    }))

    try {
        await prisma.multi_branch.createMany({
            data: dataToInsert,
            skipDuplicates: true
        })
        return res.status(200).json({ message: "амжилттай." });
    } catch (error) {
        return res.status(500).json({ message: 'Амжилтгүй!' });
    }
}
export const branchView = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const branches = await prisma.multi_branch.findMany({
            select: {
                Multi_branch_ID: true,
                Multi_branch_name: true
            }
        })
        res.status(200).json(branches.map(b => ({
            id: b.Multi_branch_ID,
            name: b.Multi_branch_name
        })))
    } catch (error) {
        return res.status(500).json({ message: 'Амжилтгүй!' });
    }
}


