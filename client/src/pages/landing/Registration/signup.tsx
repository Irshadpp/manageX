import Navbar from "@/components/ui/Navbar";
import RegisterForm from "./RegisterForm";
import signupImg from "/signup.png";
import Logo from "/logo.png";
import Managex from "@/components/ui/Managex";
import Footer from "@/components/ui/Footer";
import GoogleAuth from "@/components/ui/GoogleAuth";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <>
      <Navbar />
      <div className=" grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mb-5 bg-background">
        <div className="flex px-5 pt-20 md:p-5">
          <div className="w-full lg:px-20">
            <div className="flex gap-1 py-10">
              <img src={Logo} className="h-14" alt="mX" />
              <h1 className="text-5xl font-bold">
                <Managex />
              </h1>
            </div>
            <div className="text-2xl font-bold py-5">Sign Up</div>
            <RegisterForm />
            <p className="text-primary text-center py-10 font-semibold">
              Forgot password?
            </p>
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow mr-3"></div>
              <span className="text-gray-500">or</span>
              <div className="border-t border-gray-300 flex-grow ml-3"></div>
            </div>
            <GoogleAuth />
            <p className="mt-10">Already have an account?  <Link to="/login" className="text-primary">Login</Link></p>
          </div>
        </div>
        <div className="relative bg-primary h-screen">
          <h1 className="absolute top-4 left-4 p-2 sm:top-5 sm:left-5 sm:p-4 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl w-10/12 sm:w-3/4 md:w-11/12 lg:w-11/12 text-secondary-foreground">
            Unlock Seamless Business Management with ManageX
          </h1>
          <div className="flex justify-end items-center h-full">
            <img src={signupImg} className="h-3/5" alt="image" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
