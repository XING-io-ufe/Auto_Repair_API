export default function expiresTime(minutes: number = 10): Date {
    const now = new Date();

    // UTC+8 (Ulaanbaatar) цаг руу шилжүүлж бодох
    const utc8Offset = 8 * 60; // 8 цаг минут руу
    const localOffset = now.getTimezoneOffset(); // таны server-ийн UTC offset (ex: -480 for UTC+8)

    const totalOffsetMinutes = utc8Offset + localOffset;

    now.setMinutes(now.getMinutes() + minutes + totalOffsetMinutes);

    return now;
}