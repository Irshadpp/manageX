import Managex from "@/components/ui/Managex";
import Logo from "/logo.png";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const VerifiedEmail = () => {
  console.log("--------=-=-=----=-=--= verified email component rendered");
  const {user} = useSelector((state: RootState) => state.auth)
  return (
    <>
     <div className="flex h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center shadow-[0_0_30px_rgba(0,0,0,0.35)] rounded-lg w-full max-w-md bg-card p-5 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <div className="p-5 space-y-5 flex flex-col items-center text-center">
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
        <Link to={ user?.role === 'owner' ? "/get-started" : "/set-password"}>Complete Registration</Link>
      </Button> 
         </div>
      </div>
    </div>
    </>
  );
};

export default VerifiedEmail;
