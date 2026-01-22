import crypto from 'crypto';

// In-memory store: Map<email, { otp: string, expires: number }>
const otpStore = new Map();

const OTP_EXPIRY_MS = (process.env.OTP_EXPIRY_MINUTES || 5) * 60 * 1000;

export const generateOTP = (email) => {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expires = Date.now() + OTP_EXPIRY_MS;

    otpStore.set(email, { otp, expires });

    // Cleanup old OTPs occasionally or set timeout to delete specific key
    // For simplicity, we just leave it in memory until overwritten or checked
    // A cleaner approach for long running maps is to use setTimeout to delete
    setTimeout(() => {
        if (otpStore.has(email) && otpStore.get(email).expires <= Date.now()) {
            otpStore.delete(email);
        }
    }, OTP_EXPIRY_MS + 1000);

    return otp;
};

export const verifyOTPInStore = (email, otp) => {
    if (!otpStore.has(email)) {
        return { valid: false, message: 'OTP not found or expired' };
    }

    const record = otpStore.get(email);

    if (Date.now() > record.expires) {
        otpStore.delete(email);
        return { valid: false, message: 'OTP expired' };
    }

    if (record.otp !== otp) {
        return { valid: false, message: 'Invalid OTP' };
    }

    // OPTIONAL: Delete OTP after successful use to prevent replay
    otpStore.delete(email);

    return { valid: true };
};
