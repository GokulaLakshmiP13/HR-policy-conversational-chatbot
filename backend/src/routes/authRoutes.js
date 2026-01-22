import express from 'express';
import { requestOTP, verifyOTP } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/otp/request
router.post('/request', requestOTP);

// POST /api/auth/otp/verify
router.post('/verify', verifyOTP);

export default router;
