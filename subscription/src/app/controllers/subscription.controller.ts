import { NextFunction, Request, Response } from "express";
import { SubscriptionService } from "../services/subscription.service";
import { BadRequestError, HttpStatusCode, sendResponse } from "@ir-managex/common";
import { stripe } from "../utils/stripe";
import Stripe from "stripe";


const subscriptionService = new SubscriptionService();

export const createSubscription = async (req: Request, res: Response, next: NextFunction) =>{
    const {priceId, email, name, address} = req.body;
    const {organization} = req.user!;
    if(!organization){
        throw new BadRequestError("Invalid user creadential");
    }

    try {
        const existingCustomer = await stripe.customers.list({email});
        let customer;

        if(existingCustomer.data.length === 0){
            customer = await stripe.customers.create({email, name, address});
        }else{
            customer = existingCustomer.data[0];
        }

            const existingSubscription = await stripe.subscriptions.list({customer: customer.id});
            if(existingSubscription.data.some(sub => sub.status === "active")){
                throw new BadRequestError("Active subscription already exists");
            }

            const session = await stripe.checkout.sessions.create({
                mode: "subscription",
                payment_method_types: ["card"],
                line_items: [{ price: priceId, quantity: 1 }],
                success_url: `${process.env.CLIENT_URL}/success`,
                customer: customer.id,
              });
          
              sendResponse(res, HttpStatusCode.CREATED, "Subscription session created", { sessionId: session.id });

    } catch (error) {
        next(error);
    }
}

export const handleStripeWebhook = async (req: Request, res: Response, next: NextFunction) =>{
    const sig = req.headers["stripe-signature"]!;
    let event: Stripe.Event | null = null; // Initialize as null


    try {
       event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!) 
    } catch (error) {
        next(error);
    }

    if (!event) {
        return res.status(400).send("Event is undefined");
      }

    if(event.type === "checkout.session.completed"){
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        const subscirption = await stripe.subscriptions.retrieve(subscriptionId);
        const product =  await stripe.products.retrieve(subscirption.items.data[0].price.product as string)

        await subscriptionService.upsertSubscription({
            customerId,
            subscriptionId,
            planId: product.id,
            organizationId: req.user?.organization!,
            user: req.user?.id!,
        })
    }

    res.status(200).json({ received: true });
}



export const cancelSubscription = async (req: Request, res: Response, next: NextFunction) => {
    const {organization} = req.user!

  if (!organization) throw new BadRequestError("Invalid user credentials");

  try {
    const subscriptionData = await subscriptionService.getSubscripton(organization);
    if (!subscriptionData) throw new BadRequestError("Subscription does not exists");

    const subscription = await stripe.subscriptions.retrieve(subscriptionData.subscriptionId);
    if (!subscription) throw new BadRequestError("Subscription does not exists");

    if (subscription.status === 'canceled') {
        throw new BadRequestError("Subscription is already canceled");
      }

    await stripe.subscriptions.cancel(subscriptionData.subscriptionId);

    await subscriptionService.deleteSubscription(subscriptionData.subscriptionId);

    sendResponse(res, HttpStatusCode.OK, "Subscription canceled successfully");
  } catch (error) {
    console.error("Error canceling subscription:", error);
    next(error);
  }
};
