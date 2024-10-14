import { Button } from "@/components/ui/button";
import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import SubscribeButton from "./SubscribeButton";

interface Props {
  pro: string;
  business: string;
  subscription: any;
}

export default function PlanCards({ pro, business, subscription }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-8 lg:px-16 mx-36">
      <div className="bg-muted/60 rounded-xl p-5">
        <h4 className="text-xl font-bold">
          Pro{" "}
          {subscription && subscription.plan.amount / 100 === parseInt(pro) ? (
            <span className="bg-background py-1 px-2 rounded-lg text-sm font-normal">
              Active
            </span>
          ) : (
            ""
          )}
        </h4>
        <p className="">Experiment the power of infinite possibilities</p>
        <h1 className="text-4xl py-3 font-bold">₹{pro}</h1>
        <div className="flex flex-col gap-3 bg-background px-5 pt-10 rounded-xl text-left">
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            All the features of free plan
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            20 Employees
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            20 Projects
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            20 Video Meetings
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            Salary Payroll (In testing)
          </p>

          {subscription && subscription.plan.amount / 100 === parseInt(pro) ? (
            <Button className="my-5" variant="secondary">
              Active
            </Button>
          ) : (
            <SubscribeButton title="Subscribe to Pro" value={pro} />
          )}
        </div>
      </div>
      <div className="bg-muted/60 rounded-xl p-5">
        <h4 className="text-xl font-bold">Business</h4>
        <p className="text-foreground">
          Unveil new superpowers and join the Design League
        </p>
        <h1 className="text-4xl py-3 font-bold">₹{business}</h1>
        <div className="flex flex-col gap-3 bg-background px-5 pt-10 rounded-xl text-left">
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            All the features of pro plan
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            Unlimited Employee
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            Unlimited Projects
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            Unlimited Meetings
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            Dedicated Service
          </p>
          <SubscribeButton title="Subscribe to Business" value={business} />
        </div>
      </div>
    </div>
  );
}
