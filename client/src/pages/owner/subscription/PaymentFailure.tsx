import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const PaymentFailure = () => {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Payment Failed!</h1>
      <p className="text-lg mb-8">
        Please try later something went wrong with the server
      </p>
      <Link to="/owner/billing">
        <Button className="px-8 py-3rounded-md">Go to Billing</Button>
      </Link>
    </div>
  );
};

export default PaymentFailure;
