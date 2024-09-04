import PublicRoute from "@/components/custome/PublicRoute";
import Home from "@/pages/landing/home/Home";
import Login from "@/pages/landing/login/Login";
import SignUpPage from "@/pages/landing/Registration/signup";
import ValidateEmail from "@/pages/landing/Registration/ValidateEmail";
import VerifyEmail from "@/pages/landing/Registration/VerifyEmail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const CommonRoutes = () => {
  return (
    <>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/validate-email" element={<ValidateEmail />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>
    </>
  );
};

export default CommonRoutes;
