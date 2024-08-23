import Managex from "@/components/ui/Managex";
import Logo from "/logo.png";
import BackToHome from "@/components/ui/BackToHome";

const ValidateEmail = () => {
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="shadow-[0_0_30px_rgba(0,0,0,0.35)] rounded-lg w-full max-w-md bg-card p-6 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <div className="p-5 space-y-5">
          <div className="flex">
            <img src={Logo} alt="Logo" className="h-8 mr-1" />
            <h3 className="text-2xl font-semibold">
              <Managex />
            </h3>
          </div>
          <h2 className="text-[30px] font-semibold text-foreground">
            Please Verify Your Email
          </h2>
          <p className="text-[17px] font-semibold text-foreground">
            An email has been sent to you. Please check your inbox and follow
            the instructions to finish the registration process.
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start">
            <BackToHome />
            <h5 className="mt-4 sm:mt-2 font-semibold text-center">
              <Managex /> App © 2024
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateEmail;
