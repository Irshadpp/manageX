import { Button } from "@/components/ui/button";
import React from "react";
import Managex from "../ui/Managex";
import { Link } from "react-router-dom";

interface Props {
  product: any;
}

const CurrentPlan = ({ product }: Props) => {
  return (
    <div className="bg-muted/50 p-7 text-sm rounded-md col-span-2">
      <p className="uppercase">Current subscription plan</p>
      <h1 className="text-4xl font-bold py-2">
        🚀
        {product ? product.name : "Free"}
      </h1>
      <p className="text-foreground py-2">
        {product
          ? product.description
          : 
          <>
          Free plan doesn't give you all the benefits of <Managex /> Subscribe to Pro or Business to enjoy all benefits.
        </>}
      </p>
      <div className="flex items-center gap-5">
        <Link to="/owner/billing/plans">
          <Button>Upgrade Plan</Button>
        </Link>
      </div>
    </div>
  );
};

export default CurrentPlan;
