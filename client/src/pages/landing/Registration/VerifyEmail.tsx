import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "@/services/api/commonRequest";
import { EmailVerificationSkeleton } from "./EmailVerificationSkelton";
import VerifyError from "./VerifyError";
import { useDispatch } from "react-redux";
import { setCredentials, updateIntitialSetup } from "@/store/authSlice";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const res = await apiRequest({
          method: "GET",
          url: import.meta.env.VITE_USERS_URL,
          route: `/api/v1/auth/verify-email?token=${token}`,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.success) {
          const userData = {
            user:{...res.user},
          }
          dispatch(updateIntitialSetup({value: true}));
          dispatch(setCredentials({user: res.user}));
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    verifyEmailToken();
  }, [token, dispatch]);

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center shadow-[0_0_30px_rgba(0,0,0,0.35)] rounded-lg w-full max-w-md bg-card p-5 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <div className="p-5 space-y-5 flex flex-col items-center text-center">
          {loading ? <EmailVerificationSkeleton /> : error ? <VerifyError/> : <Navigate to={'/email-verified'}/> }
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
