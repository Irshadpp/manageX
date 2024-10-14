import { Subscription } from "../models/schema/subscription.schema";
import { SubscriptionAttrs, SubscriptionDoc } from "../models/subscription.model";
import { ISubscriptionService } from "./subscription.interface";

export class SubscriptionService implements ISubscriptionService{
    async createSubscription(attrs: SubscriptionAttrs): Promise<SubscriptionDoc> {
        const newSubscription =  Subscription.build(attrs);
        return await newSubscription.save();
    }
}