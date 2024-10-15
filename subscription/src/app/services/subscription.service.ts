import { Subscription } from "../models/schema/subscription.schema";
import { SubscriptionAttrs, SubscriptionDoc } from "../models/subscription.model";
import { ISubscriptionService } from "./subscription.interface";

export class SubscriptionService implements ISubscriptionService{
    async upsertSubscription(attrs: SubscriptionAttrs) {
        const existingSubscription = await Subscription.findOne({ organizationId: attrs.organizationId });
    
        if (existingSubscription) {
          existingSubscription.set(attrs);
          return await existingSubscription.save();
        } else {
          const newSubscription = Subscription.build(attrs);
          return await newSubscription.save();
        }
      }

    async getSubscripton(organizationId: string): Promise<SubscriptionDoc | null> {
        return await Subscription.findOne({organizationId});
    }

    async deleteSubscription(subscriptionId: string): Promise<void> {
        await Subscription.deleteOne({subscriptionId});
    }
}