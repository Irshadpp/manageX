import { requireAuth, validateRequest } from "@ir-managex/common";
import express from "express";
import {
  createSubscription,
  handleStripeWebhook,
} from "../controllers/subscription.controller";
import { createSubscriptionValidator } from "../validators/create-subscription-validator";

const router = express.Router();

router.post(
  "/create",
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

export { router as subscriptionRouter };
