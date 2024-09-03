import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RegistrationComplete = () => {
  return (
    <div className="space-y-3 text-center">
      <h5 className="text-xl font-semibold">Registration Completed!</h5>
      <p className="text-[17px] font-semibold">
        Congratulations! Your registration is complete.
      </p>
      <Button className="mt-4 w-full" asChild>
      <Link to="/owner">
        Launch Application
      </Link>
      </Button>
    </div>
  );
};

export default RegistrationComplete;