import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';
import dotenv from 'dotenv';
dotenv.config();


const auth = new Auth({
    apiKey: process.env.VONAGE_API_KEY!,
    apiSecret: process.env.VONAGE_API_SECRET!,
});
const vonage = new Vonage(auth);

export const sendOTP = async (phone: string, code: string) => {
    try {
        await vonage.sms.send({
            to: phone,
            from: "AutoRepair OTP code",
            text: `Your verification code is: ${code}`,
        });
    } catch (err) {
        console.error("SMS алдаа", err);
        throw new Error("SMS амжилтгүЙ");
    }
};
