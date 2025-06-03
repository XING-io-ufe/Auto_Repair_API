import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../generated/prisma';
import data from '../data/manufacturer.json'

const prisma = new PrismaClient();


export const manufacturerAdd = async (req: Request, res: Response, next: NextFunction) => {

    try {
        await prisma.car_Manufacturer.createMany({
            data: data,
            skipDuplicates: true
        })
        return res.status(200).json({ message: "амжилттай." });
    } catch (error) {
        return res.status(500).json({ message: 'Амжилтгүй!' });
    }
};

export const manufacturerView = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const branches = await prisma.car_Manufacturer.findMany({
            select: {
                Car_Manufacturer_ID: true,
                Car_Manufacturer_list: true
            }
        })
        res.status(200).json(branches.map(b => ({
            id: b.Car_Manufacturer_ID,
            name: b.Car_Manufacturer_list
        })))
    } catch (error) {
        return res.status(500).json({ message: 'Амжилтгүй!' });
    }
};
