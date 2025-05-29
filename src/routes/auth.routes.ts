import express from 'express';
import { signInPhone, signUpPhone } from '../controllers/auth.controller';
import { verifySignInOTP, verifySignUpOTP } from '../controllers/otp.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post('/signup', asyncHandler(signUpPhone));
router.post('/signup/verify', asyncHandler(verifySignUpOTP));

router.post('/signin', asyncHandler(signInPhone));
router.post('/signin/verify', asyncHandler(verifySignInOTP));

export default router;
