import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Register_service_status_enum } from '../generated/prisma';

const prisma = new PrismaClient();

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    const {
        serviceId,
        branchId,
        userId,
        carId,
        selectedDay,
        selectedTime,
    } = req.body;

    try {
        // 1. Validate input
        if (!serviceId || !branchId || !userId || !carId || !selectedDay || !selectedTime) {
            return res.status(400).json({ message: 'Бүх талбарыг бөглөнө үү!' });
        }

        // 2. Check user existence
        const user = await prisma.user.findUnique({ where: { User_ID: userId } });
        if (!user) {
            return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
        }

        // 3. Check service
        const service = await prisma.service.findUnique({ where: { Service_ID: serviceId } });
        if (!service) {
            return res.status(404).json({ message: 'Үйлчилгээ олдсонгүй' });
        }

        // 4. Check branch
        const branch = await prisma.multi_branch.findUnique({ where: { Multi_branch_ID: branchId } });
        if (!branch) {
            return res.status(404).json({ message: 'Салбар олдсонгүй' });
        }

        // 5. Check car ownership
        const car = await prisma.register_car.findUnique({ where: { Register_car_ID: carId } });
        if (!car || car.Register_car_user_ID !== userId) {
            return res.status(404).json({ message: 'Машин олдсонгүй эсвэл хэрэглэгчийнх биш байна' });
        }

        // 6. Parse date
        const parsedDate = new Date(selectedDay);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: 'Зөв огноо оруулна уу' });
        }

        // 7. Create booking
        const booking = await prisma.register_service.create({
            data: {
                Register_service_scheduled: parsedDate,
                Register_service_time_list: selectedTime,
                Register_service_status: Register_service_status_enum.SCHEDULED,
                Register_service_user_ID: userId,
                Register_service_car: carId,
                Register_service_service_ID: serviceId,
                Register_service_multi_branch_ID: branchId,
            },
        });

        return res.status(201).json({
            message: 'Захиалга амжилттай үүслээ!',
            booking,
        });

    } catch (err) {
        console.error('Error creating booking:', err);
        return res.status(500).json({ message: 'Серверийн алдаа гарлаа' });
    }
};
