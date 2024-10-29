import { NextFunction, Request, Response } from "express";
import { SubscriptionService } from "../services/subscription.service";
import {
  BadRequestError,
  CommonMessages,
  HttpStatusCode,
  NotFoundError,
  sendResponse,
} from "@ir-managex/common";
import { stripe } from "../utils/stripe";
import Stripe from "stripe";

const subscriptionService = new SubscriptionService();

const fetchSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const createSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { price, email, name, address } = req.body;
  const { organization } = req.user!;
  if (!organization) {
    throw new BadRequestError("Invalid user creadential");
  }

  try {
    const prices = await stripe.prices.list();
    const priceObject = prices.data.find(
      (p) => p.unit_amount === price * 100 && p.currency === "inr"
    );

    if (!priceObject) {
      throw new BadRequestError("Invalid price value");
    }

    const priceId = priceObject.id;

    const existingCustomer = await stripe.customers.list({ email });
    let customer;

    if (existingCustomer.data.length === 0) {
      customer = await stripe.customers.create({
        email,
        name,
        address,
      });
    } else {
      customer = existingCustomer.data[0];
    }

    const existingSubscription = await stripe.subscriptions.list({
      customer: customer.id,
    });
    if (existingSubscription.data.some((sub) => sub.status === "active")) {
      throw new BadRequestError("Active subscription already exists");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.CLIENT_URL}/owner/billing/success`,
      cancel_url: `${process.env.CLIENT_URL}/onwer/billing/failure`,
      customer: customer.id,
      subscription_data: {
        metadata: {
          userId: req.user!.id.toString(),
          organizationId: organization.toString(),
        },
      },
    });

    sendResponse(res, HttpStatusCode.CREATED, "Subscription session created", {
      sessionId: session.id,
    });
  } catch (error) {
    next(error);
  }
};

export const handleStripeWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Webhook called---------------->");
  const sig = req.headers["stripe-signature"]!;
  let event: Stripe.Event | null = null;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return next(error);
  }

  if (!event) {
    return res.status(400).send("Event is undefined");
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    switch (event.type) {
      case "checkout.session.completed":
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        const product = await stripe.products.retrieve(
          subscription.items.data[0].price.product as string
        );

        const subscriptionType = product.name;

        await subscriptionService.upsertSubscription({
          customerId,
          subscriptionId,
          planId: product.id,
          organizationId: subscription.metadata.organizationId,
          user: subscription.metadata.userId,
          subscriptionStatus: subscription.status,
          subscriptionType,
        });
        break;

      case "customer.subscription.created":
        const createdSubscription = event.data.object as Stripe.Subscription;
        const createdProduct = await stripe.products.retrieve(
          createdSubscription.items.data[0].price.product as string
        );
        const createdSubscriptionType = createdProduct.name;
        await subscriptionService.upsertSubscription({
          customerId: createdSubscription.customer as string,
          subscriptionId: createdSubscription.id,
          planId: createdSubscription.items.data[0].price.product as string,
          organizationId: createdSubscription.metadata.organizationId,
          user: createdSubscription.metadata.userId,
          subscriptionStatus: createdSubscription.status,
          subscriptionType: createdSubscriptionType,
        });
        break;

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await subscriptionService.deleteSubscription(deletedSubscription.id);
        break;

      case "customer.subscription.updated":
        const updatedSubscription = event.data.object as Stripe.Subscription;
        const updatedProduct = await stripe.products.retrieve(
          updatedSubscription.items.data[0].price.product as string
        );
        const updatedSubscriptionType = updatedProduct.name;
        await subscriptionService.upsertSubscription({
          customerId: updatedSubscription.customer as string,
          subscriptionId: updatedSubscription.id,
          planId: updatedSubscription.items.data[0].price.product as string,
          organizationId: updatedSubscription.metadata.organizationId,
          user: updatedSubscription.metadata.userId,
          subscriptionStatus: updatedSubscription.status,
          subscriptionType: updatedSubscriptionType,
        });
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ received: true });
};


export const getSubscriptionDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    
    const subscription = await subscriptionService.getActiveSubscripton(
      userId as string
    );
    
    if (!subscription) {
      throw new NotFoundError();
    }
    
    const stripeSubscription = await stripe.subscriptions.retrieve(subscription.subscriptionId);
    
    const product = await stripe.products.retrieve(subscription.planId);

    console.log(stripeSubscription.status, "stattuuuuussss================")
    
    let upcomingInvoice = null;
    if (stripeSubscription.status === 'active' && !stripeSubscription.cancel_at_period_end) {
      upcomingInvoice = await stripe.invoices.retrieveUpcoming({
        customer: subscription.customerId,
      });
    } else {
      console.warn(`No upcoming invoice because the subscription status is: ${stripeSubscription.status}`);
    }
    
    const pastInvoices = await stripe.invoices.list({
      customer: subscription.customerId,
      limit: 10,
    });
    
    return sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS, {
      product,
      subscription: stripeSubscription,
      upcomingInvoice,
      invoices: pastInvoices,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    console.log("userId------------", userId);
    const subscription = await subscriptionService.getActiveSubscripton(
      userId as string
    );
    console.log("userId------------", subscription);

    if (!subscription) {
      return res.status(200).json({ active: false });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.customerId,
      return_url: process.env.CLIENT_URL,
    });

    console.log(session);

    return sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS, {
      active: true,
      manageUrl: session.url,
    });
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    res.status(500).json({ error: "Error fetching subscription status" });
  }
};