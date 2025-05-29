import { Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PrismaClient, OTP_status_enum, OTP_type_enum, User_role_enum } from '../generated/prisma';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

dotenv.config();

export const verifyOTP = async (
    phone: string,
    otp: string,
    type: OTP_type_enum,
    successMessage: string,
    res: Response
) => {
    const fullPhone = `976${phone}`;

    const user = await prisma.user.findFirst({ where: { User_phone: fullPhone } });

    if (!user) {
        return res.status(404).json({ message: "Бүртгэлгүй хэрэглэгч байна!" });
    }

    const otpCheck = await prisma.oTP.findFirst({
        where: {
            OTP_user_ID: user.User_ID,
            OTP_code: otp,
            OTP_type: type,
        },
        orderBy: { OTP_create_at: 'desc' },
    });

    if (!otpCheck) {
        return res.status(400).json({ message: "Хүчингүй OTP код байна!" });
    }
    const now = new Date();

    if (otpCheck.OTP_status !== OTP_status_enum.PENDING) {
        return res.status(400).json({ message: "OTP аль хэдийн ашиглагдсан эсвэл хүчингүй болсон байна!" });
    }

    if (otpCheck.OTP_expires_at < now) {
        return res.status(400).json({ message: "OTP кодын хугацаа дууссан байна!" });
    }

    await prisma.oTP.update({
        where: { OTP_ID: otpCheck.OTP_ID },
        data: { OTP_status: OTP_status_enum.USED },
    });


    if (otpCheck.OTP_type === OTP_type_enum.REGISTER) {
        return res.status(200).json({ message: successMessage });
    }

    // VERIFIED → JWT үүсгэж буцаах
    if (otpCheck.OTP_type === OTP_type_enum.VERIFICATION) {
        const token = jwt.sign(
            {
                id: user.User_ID,
                phone: user.User_phone,
                role: user.User_role,
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            message: successMessage,
            token,
            user: {
                id: user.User_ID,
                phone: user.User_phone,
                role: user.User_role,
            },
        });
    }

    return res.status(403).json({ message: successMessage });
};