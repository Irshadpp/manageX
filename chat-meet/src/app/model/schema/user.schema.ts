import mongoose from "mongoose";
import { Schema } from "mongoose";
import { UserAttrs, UserModel } from "../user.model";
import { Role } from "@ir-managex/common";

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
    },
    lName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
    },
    phone: {
      type: Number,
    },
    role: {
      type: String,
      required: true,
      default: Role.EMPLOYEE,
    },
    profileURL: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    ...attrs,
    _id: attrs.id,
  });
};

const User = mongoose.model<UserAttrs, UserModel>(
  "User",
  userSchema
);

export { User };
