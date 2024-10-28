import { SubscriptionAttrs, SubscriptionDoc } from "../models/subscription.model";

export interface ISubscriptionService{
    upsertSubscription(attrs: SubscriptionAttrs): Promise<SubscriptionDoc>;
    getSubscripton(user: string): Promise<SubscriptionDoc | null>;
    getActiveSubscripton(user: string): Promise<SubscriptionDoc | null>;
    deleteSubscription(subscriptionId: string): Promise<void>;
}