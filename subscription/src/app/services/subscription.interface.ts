import { SubscriptionAttrs, SubscriptionDoc } from "../models/subscription.model";

export interface ISubscriptionService{
    createSubscription(attrs: SubscriptionAttrs): Promise<SubscriptionDoc>
}