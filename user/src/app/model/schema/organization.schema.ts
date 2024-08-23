import mongoose, { Schema } from "mongoose";
import { SubscriptionType } from "../enum";
import { OrgAttrs, OrgDoc, OrgModel } from "../organization.model";

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
});

const orgSchema = new mongoose.Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    industry: {
      type: String,
    },
    website: {
      type: String,
    },
    subscriptionId: {
      type: String,
    },
    subscriptionType: {
      type: String,
      required: true,
      default: SubscriptionType.FREE,
    },
    stripeId: {
      type: String,
    },
    address: addressSchema,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

orgSchema.statics.build = (attrs: OrgAttrs) =>{
    return new Organization(attrs);
}

const Organization = mongoose.model<OrgDoc, OrgModel>("Organization", orgSchema);

export { Organization };
