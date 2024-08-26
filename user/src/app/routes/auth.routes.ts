import express from 'express';
import { createUserValidator } from '../validators/create-user.validator';
import { validateRequest } from '@ir-managex/common';
import { createUser, googleLogin, loginUser, newToken, verifyEmail } from '../controllers/auth.controller';
import { loginUserValidator } from '../validators/login-user-validator';

const router = express.Router();

router.post(
    "/signup",
    createUserValidator,
    validateRequest,
    createUser
  );

router.get(
    "/verify-email",
    verifyEmail
);

router.post(
    "/login",
    loginUserValidator,
    loginUser
  );

router.post(
  "/google",
  googleLogin
)

router.post("/refresh-token",
  newToken
)

export {router as authRouter}