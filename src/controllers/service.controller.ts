import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../generated/prisma';
import data from '../data/service.json'
import { Service } from '../generated/prisma/index';

const prisma = new PrismaClient();

export const serviceAdd = async (req: Request, res: Response, next: NextFunction) => {

    try {
        await prisma.service.createMany({
            data: data,
            skipDuplicates: true
        })
        return res.status(200).json({ message: "амжилттай." });
    } catch (error) {
        return res.status(500).json({ message: 'Амжилтгүй!' });
    }
}
export const serviceView = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const Service = await prisma.service.findMany({
            select: {
                Service_ID: true,
                Service_name: true
            }
        })
        res.status(200).json(Service.map(b => ({
            id: b.Service_ID,
            name: b.Service_name
        })))
    } catch (error) {
        return res.status(500).json({ message: 'Амжилтгүй!' });
    }
}


