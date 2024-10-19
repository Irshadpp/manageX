import mongoose from "mongoose";

export interface SubscriptionAttrs{
    user: string;
    organizationId: string;
    subscriptionId: string;
    customerId: string;
    planId: string;
    subscriptionType: string;
    subscriptionStatus?: string;
}

export interface SubscriptionDoc extends mongoose.Document{
    id: string;
    user: string;
    organizationId: string;
    subscriptionId: string;
    customerId: string;
    planId: string;
    subscriptionType: string;
    subscriptionStatus: string;
    updatedAt: Date;
    createdAt: Date;
}

export interface SubscriptionModel extends mongoose.Model<SubscriptionDoc>{
    build(attrs: SubscriptionAttrs) : SubscriptionDoc;
}