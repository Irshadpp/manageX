import { SubscriptionAttrs, SubscriptionDoc } from "../models/subscription.model";

export interface ISubscriptionService{
    upsertSubscription(attrs: SubscriptionAttrs): Promise<SubscriptionDoc>;
    getSubscripton(organizationId: string): Promise<SubscriptionDoc | null>;
    deleteSubscription(subscriptionId: string): Promise<void>;
}