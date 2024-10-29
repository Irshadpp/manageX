import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import Managex from "../ui/Managex";

interface Props {
  product: any;
}

const CurrentPlanBenefits = ({ product }: Props) => {
  return (
    <div className="text-sm bg-muted/50 p-7 rounded-md col-span-3">
      <p className="uppercase">Current Plan benefits</p>
      <p className="text-foreground py-2">
        {product
          ? product.metadata.description
          :  <>
          Free plan doesn't give you all the benefits of <Managex /> Subscribe to Pro or Business to enjoy all benefits
         checkout
        the features of other plans
        </>}
      </p>
      <div className="bg-border h-1 w-full rounded-full my-3"></div>
      <div className="grid grid-cols-2 gap-3 pt-2">
        {product ? (
          product.marketing_features.map((feat: { name: string }, index: number) => (
            <p key={index} className="flex gap-1">
              <HiCheckCircle className="text-primary text-xl" />
              {feat.name}
            </p>
          ))
        ) : (
          <>
            <p className="flex gap-1">
              <HiCheckCircle className="text-primary text-xl" />5 Employee
            </p>
            <p className="flex gap-1">
              <HiCheckCircle className="text-primary text-xl" />5 Projects
            </p>
            <p className="flex gap-1">
              <HiCheckCircle className="text-primary text-xl" />
              In-app Chat
            </p>
            <p className="flex gap-1">
              <HiCheckCircle className="text-primary text-xl" />2 Department
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentPlanBenefits;
