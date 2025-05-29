import { Request, Response, NextFunction } from 'express';
import { PrismaClient, OTP_status_enum, OTP_type_enum } from '../generated/prisma';

import { verifyOTP } from '../services/otp.service';

export const verifySignInOTP = async (req: Request, res: Response, next: NextFunction) => {
    const { phone, otp } = req.body;
    if (!phone) {
        return res.status(400).json({ message: "Утасны дугаараа оруулна уу!" });
    } else if (!otp) {
        return res.status(400).json({ message: "OTP баталгаажуулах оруулна уу!" });
    }
    return verifyOTP(phone, otp, OTP_type_enum.VERIFICATION, "Амжилттай нэвтэрлээ.", res);
};

export const verifySignUpOTP = async (req: Request, res: Response) => {
    const { phone, otp } = req.body;
    if (!phone) {
        return res.status(400).json({ message: "Утасны дугаараа оруулна уу!" });
    } else if (!otp) {
        return res.status(400).json({ message: "OTP баталгаажуулах оруулна уу!" });
    }
    return verifyOTP(phone, otp, OTP_type_enum.REGISTER, "Амжилттай бүртгүүллээ.", res);
};
