import mongoose, { Schema } from "mongoose";
import { Role } from "../enum";
import { UserAttrs, UserDoc, UserModel } from "../user.model";

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
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: Role.OWNER,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    profileURL: {
      type: String,
    },
    dob: {
      type: Date,
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
      virtuals:true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.isEmailVerified;
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

userSchema.on('index', (error) => {
  if (error) {
    console.log('Index error:', error);
  }
});


const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
