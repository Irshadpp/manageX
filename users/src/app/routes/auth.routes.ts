import express from 'express';
import { createUserValidator } from '../validators/create-user.validator';
import { requireAuth, validateRequest } from '@ir-managex/common';
import { checkUser, createUser, googleLogin, loginUser, logout, newToken, setPassword, verifyEmail } from '../controllers/auth.controller';
import { loginUserValidator } from '../validators/login-user-validator';
import { isBlock } from "../middlewares/isBlocked";
import { setPasswordValidator } from '../validators/set-password.validator';

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
    validateRequest,
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

router.patch(
  "/set-password",
  requireAuth,
  setPasswordValidator,
  validateRequest,
  setPassword
)

export {router as authRouter}