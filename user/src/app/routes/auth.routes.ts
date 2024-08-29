import express from 'express';
import { createUserValidator } from '../validators/create-user.validator';
import { requireAuth, validateRequest } from '@ir-managex/common';
import { checkUser, createUser, googleLogin, loginUser, logout, newToken, verifyEmail } from '../controllers/auth.controller';
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

router.get(
  "/check-user",
  requireAuth,
  checkUser
)

router.post("/refresh-token",
  newToken
);

router.post(
  "/logout",
  logout
)

export {router as authRouter}