import { generateOTP, verifyOTPInStore } from '../services/otpService.js';
import { sendOTPEmail } from '../services/emailService.js';
import { generateToken } from '../utils/jwtUtils.js';

export const requestOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // 1. Generate OTP
        const otp = generateOTP(email);

        // 2. Send OTP via Email
        const emailSent = await sendOTPEmail(email, otp);

        if (emailSent) {
            return res.status(200).json({ message: 'OTP sent successfully' });
        } else {
            return res.status(500).json({ error: 'Failed to send OTP email' });
        }
    } catch (error) {
        console.error('Request OTP Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: 'Email and OTP are required' });
        }

        // 1. Verify OTP
        const verification = verifyOTPInStore(email, otp);

        if (!verification.valid) {
            return res.status(400).json({ error: verification.message });
        }

        // 2. Generate JWT (User authenticated)
        // In a real app, you would find/create user in DB here
        const userPayload = { email };
        const token = generateToken(userPayload);

        return res.status(200).json({
            message: 'Authentication successful',
            token,
            user: { email }
        });
    } catch (error) {
        console.error('Verify OTP Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
