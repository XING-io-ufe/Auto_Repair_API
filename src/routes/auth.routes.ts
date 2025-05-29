import express from 'express';
import { signInPhone, signUpPhone } from '../controllers/auth.controller';
import { verifySignInOTP, verifySignUpOTP } from '../controllers/otp.controller';

const router = express.Router();

router.post('/signup', signUpPhone);
router.post('/signup/verify', verifySignUpOTP);

router.post('/signin', signInPhone);
router.post('/signin/verify', verifySignInOTP);

export default router;
