import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Register_car_status_enum } from '../generated/prisma';
import data from '../data/car.json'
import expiresTime from '../utils/expiresTime';

const prisma = new PrismaClient();


export const CarAdd = async (req: Request, res: Response, next: NextFunction) => {

    try {
        await prisma.car.createMany({
            data: data,
            skipDuplicates: true
        })
        return res.status(200).json({ message: "амжилттай." });
    } catch (error) {
        return res.status(500).json({ message: 'Амжилтгүй!' });
    }
};

export const CarView = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Car = await prisma.car.findMany({
            select: {
                Car_ID: true,
                Car_list: true
            }
        })
        res.status(200).json(Car.map(b => ({
            id: b.Car_ID,
            name: b.Car_list
        })))
    } catch (error) {
        return res.status(500).json({ message: 'Амжилтгүй!' });
    }
};

export const addedCar = async (req: Request, res: Response, next: NextFunction) => {
    const {
        manufacturer,
        brand,
        userId,
        year,
        plate,
    } = req.body;
    try {
        const newCar = await prisma.register_car.create({
            data: {
                Register_car_manufacturer: manufacturer,
                Register_car_mark: brand,
                Register_car_year: year,
                Register_car_vin: plate,
                Register_car_status: Register_car_status_enum.ACTIVE,
                Register_car_user_ID: userId,
                Register_car_create_at: expiresTime(0),
                Register_car_update_at: expiresTime(0),
            },
        });

        return res.status(200).json({ message: "eeАмжилттай машин бүртгэлээ.", car: newCar });
    } catch (error) {
        return res.status(500).json({ message: "ttАмжилтгүй машин бүртгэсэнгүй!" });
    }
}