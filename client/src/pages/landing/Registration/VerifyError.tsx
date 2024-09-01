import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RiErrorWarningFill } from "react-icons/ri";

const VerifyError = () => {
  return (
    <>
      <RiErrorWarningFill size={40} className="text-red-600" />
      <h2 className="text-[30px] text-red-600 font-semibold text-foreground">
        Verification Failed
      </h2>
      <p className="text-[17px] font-semibold text-foreground">
        Oops! Something went wrong while verifying your email. <br />
        Please try again or contact support if the issue persists.
      </p>
      <Button asChild>
        <Link to="/verify-email">Retry Verification</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link to="/">Go to Homepage</Link>
      </Button>
    </>
  );
};

export default VerifyError;
