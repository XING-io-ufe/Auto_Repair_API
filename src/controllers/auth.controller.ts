import { Request, Response, NextFunction } from 'express';
import { PrismaClient, OTP_status_enum, OTP_type_enum, User_role_enum, Bonus_type_enum } from '../generated/prisma';
import { sendOTP } from '../utils/smsSend';
import generateOTP from '../utils/otpGenerator';
import expiresTime from '../utils/expiresTime';

const prisma = new PrismaClient();


export const signUpPhone = async (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ message: "Утасны дугаараа оруулна уу!" })
    }

    const fullPhone = `976${phone}`;

    let user = await prisma.user.findFirst({ where: { User_phone: fullPhone } });

    if (user) {
        return res.status(400).json({ message: "Та бүртгэлтэй байна!" });
    }

    user = await prisma.user.create({
        data: {
            User_first_name: 'New',
            User_last_name: 'User',
            User_email: `${Date.now()}@guest.mn`,
            User_password: 'no-password',
            User_phone: fullPhone,
            User_role: User_role_enum.CUSTOMER,
            User_create_at: expiresTime(0),
            User_update_at: expiresTime(0),
        },
    });

    const otpCode = generateOTP();

    await prisma.oTP.create({
        data: {
            OTP_code: otpCode,
            OTP_type: OTP_type_enum.REGISTER,
            OTP_status: OTP_status_enum.PENDING,
            OTP_user_ID: user.User_ID,
            OTP_create_at: expiresTime(0),
            OTP_expires_at: expiresTime(10),
        },
    });
    await prisma.bonus.create({
        data: {
            Bonus_point: 0,
            Bonus_type: Bonus_type_enum.REFERRAL,
            Bonus_user_ID: user.User_ID,
        },
    });

    await sendOTP(fullPhone, otpCode);
    return res.status(200).json({ message: "OTP амжилттай илгээгдсэн." });
};

export const signInPhone = async (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ message: "Утасны дугаараа оруулна уу!" });
    }

    const fullPhone = `976${phone}`;

    const user = await prisma.user.findFirst({ where: { User_phone: fullPhone } });

    if (!user) {
        return res.status(404).json({ message: "Бүртгэлгүй хэрэглэгч байна!" });
    }

    const otpCode = generateOTP();

    await prisma.oTP.create({
        data: {
            OTP_code: otpCode,
            OTP_type: OTP_type_enum.VERIFICATION,
            OTP_status: OTP_status_enum.PENDING,
            OTP_user_ID: user.User_ID,
            OTP_create_at: expiresTime(0),
            OTP_expires_at: expiresTime(10),
        },
    });

    await sendOTP(fullPhone, otpCode);
    return res.status(200).json({ message: "OTP амжилттай илгээгдсэн." });
};

export const userUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.id;
    if (!userId) {
        return res.status(400).json({ message: 'Хэрэглэгч олдсонгүй!' });
    }
    const { lastName, firstName, phone, email } = req.body;

    const fullPhone = `976${phone}`;

    try {

        const updatedUser = await prisma.user.update({
            where: { User_ID: userId },
            data: {
                User_last_name: lastName,
                User_first_name: firstName,
                User_phone: fullPhone,
                User_email: email,
                User_update_at: expiresTime(0),
            },
            select: {
                User_ID: true,
                User_last_name: true,
                User_first_name: true,
                User_phone: true,
                User_email: true,
                User_role: true,
            },
        });
        return res.status(200).json({ message: "Мэдээлэл амжилттай шинэчлэгдлээ", updatedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Амжилгүй хүсэлт!' });
    }
};