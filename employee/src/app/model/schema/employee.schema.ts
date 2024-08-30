import mongoose from "mongoose";
import { Role } from "../enum";
import { Schema } from "mongoose";
import { EmployeeAttrs, employeeModel } from "../employee.model";

const addressSchema = new mongoose.Schema(
    {
        street:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        country:{
            type:String
        },
        zipcode:{
            type:String
        },
    }
)

const employeeSchema = new mongoose.Schema(
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
    dob: {
      type: Date,
    },
    profileURL: {
      type: String,
    },
    hiringDate: {
        type: String,
    },
    salary: {
        type: Number
    },
    designation:{
        type: String
    },
    employeeType:{
        type: String
    },
    gender: {
        type: String,
    },
    address: addressSchema,
    terminationReason:{
        type: String
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

employeeSchema.statics.build = (attrs: EmployeeAttrs) => {
  return new Employee(attrs);
};

const Employee = mongoose.model<EmployeeAttrs, employeeModel>(
  "Employee",
  employeeSchema
);

export { Employee };
