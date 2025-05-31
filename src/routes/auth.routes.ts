import express from 'express';
import { signInPhone, signUpPhone, userUpdate } from '../controllers/auth.controller';
import { verifySignInOTP, verifySignUpOTP } from '../controllers/otp.controller';
import { asyncHandler } from '../utils/asyncHandler';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.post('/signup', asyncHandler(signUpPhone));
router.post('/signup/verify', asyncHandler(verifySignUpOTP));

router.post('/signin', asyncHandler(signInPhone));
router.post('/signin/verify', asyncHandler(verifySignInOTP));

router.put('/update/', asyncHandler(verifyToken), asyncHandler(userUpdate));

export default router;
