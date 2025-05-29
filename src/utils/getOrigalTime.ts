
import expiresTime from '../utils/expiresTime';

const expiresAt = expiresTime(10); // UTC+8-р тооцсон хугацаа


otp_expires_at: expiresAt.toLocaleString('mn-MN', {
    timeZone: 'Asia/Ulaanbaatar',
    hour12: false,
}) //  хэрэглэгчдэд UTC+8-р буцааж харуулна

console.log(
    expiresAt.toLocaleString('mn-MN', {
        timeZone: 'Asia/Ulaanbaatar',
        hour12: false,
    })
);