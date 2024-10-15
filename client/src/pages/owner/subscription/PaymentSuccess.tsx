import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const PaymentSuccess = () => {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Payment Successful!</h1>
      <p className="text-lg mb-8">
        Thank you for subscribing. Your payment has been successfully processed.
      </p>
      <Link to="/owner/billing">
        <Button className="px-8 py-3rounded-md">Go to Billing</Button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
