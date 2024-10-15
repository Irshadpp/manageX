import mongoose from "mongoose";
import { SubscriptionAttrs, SubscriptionDoc, SubscriptionModel } from "../subscription.model";

const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    organizationId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    subscriptionId:{
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    planId: {
        type: String,
    }
},{
    toJSON:{
        timestamps: true,
        virtuals: true,
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

subscriptionSchema.statics.build = (attrs: SubscriptionAttrs) =>{
    return new Subscription(attrs)
}

const Subscription = mongoose.model<SubscriptionAttrs, SubscriptionModel>("Subscription", subscriptionSchema);

export {Subscription};