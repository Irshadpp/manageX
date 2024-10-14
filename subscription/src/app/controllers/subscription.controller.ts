import { NextFunction, Request, Response } from "express";
import { SubscriptionService } from "../services/subscription.service";
import { BadRequestError, HttpStatusCode, sendResponse } from "@ir-managex/common";
import { stripe } from "../utils/stripe";

const subscriptionService = new SubscriptionService();

export const createSubscription = async (req: Request, res: Response, next: NextFunction) =>{
    const {priceId, email, name, address} = req.body;
    const organizationId = req.user;
    if(!organizationId){
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
                throw new BadRequestError("Active subscription alread exists");
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