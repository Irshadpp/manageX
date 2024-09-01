import Managex from "@/components/ui/Managex";
import Logo from "/logo.png";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VerifiedEmail = () => {
  return (
    <>
      <div className="flex">
        <img src={Logo} alt="Logo" className="h-8 mr-1" />
        <h3 className="text-2xl font-semibold">
          <Managex />
        </h3>
      </div>
      <h2 className="flex text-[30px] text-green-600 font-semibold text-foreground">
        Email Verified{" "}
        <RiVerifiedBadgeFill size={40} color="text-green-600" className="" />
      </h2>
      <p className="text-[17px] font-semibold text-foreground">
        Your Email has been successfully Verified <br />
        Welcome to the <Managex /> App
      </p>
      <Button asChild>
        <Link to="/get-started">Complete Registration</Link>
      </Button>
    </>
  );
};

export default VerifiedEmail;
