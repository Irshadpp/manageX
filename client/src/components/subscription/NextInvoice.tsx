import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import React from "react";
import { FiClock } from "react-icons/fi";

interface Props {
  upcomingInvoice: any;
}

const NextInvoice = ({ upcomingInvoice }: Props) => {
  return (
    <div className="text-sm bg-muted/50 p-7 rounded-md col-span-2">
      <p className="uppercase">Next Invoice</p>
      <h1 className="text-4xl font-bold py-2">
        ₹{upcomingInvoice ? upcomingInvoice.amount_due / 100 : "0.00"}
      </h1>
      <p>Next Payment:</p>
      <p className="flex items-center gap-2 py-2">
        <FiClock />
        {upcomingInvoice
          ? format(
              new Date(upcomingInvoice.period_end * 1000),
              "dd MMM, yyyy"
            )
          : "No date for next payment"}
      </p>
      {/* <Button disabled>Pay Now</Button> */}
    </div>
  );
};

export default NextInvoice;
