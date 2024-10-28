import { requireAuth, validateRequest } from "@ir-managex/common";
import express from "express";
import {
  createSubscription,
  getSubscriptionStatus,
  handleStripeWebhook,
} from "../controllers/subscription.controller";
import { createSubscriptionValidator } from "../validators/create-subscription-validator";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  createSubscriptionValidator,
  validateRequest,
  createSubscription
);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

router.get(
  "/status",
  requireAuth,
  getSubscriptionStatus
);

export { router as subscriptionRouter };
