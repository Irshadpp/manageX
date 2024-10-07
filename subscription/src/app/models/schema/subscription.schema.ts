import mongoose from "mongoose";

export interface SubscriptionAttrs{
    
}

export interface SubscriptionDoc extends mongoose.Document{
  
}

export interface SubscriptionModel extends mongoose.Model<SubscriptionDoc>{
    build(attrs: SubscriptionAttrs) : SubscriptionDoc;
}