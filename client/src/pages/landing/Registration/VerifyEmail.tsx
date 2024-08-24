import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "@/services/api/commonRequest";
import { EmailVerificationSkeleton } from "./EmailVerificationSkelton";
import VerifiedEmail from "./VerifiedEmail";
import VerifyError from "./VerifyError";
import { getObject, storeObject } from "@/utils/local-storage";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const res = await apiRequest({
          method: "GET",
          url: import.meta.env.VITE_USERS_URL,
          route: `/api/v1/users/verify-email?token=${token}`,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.success) {
          storeObject("userData", {
            ...res.user,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken
          });
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
    console.log(getObject("userData"));
  }, [token]);

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center shadow-[0_0_30px_rgba(0,0,0,0.35)] rounded-lg w-full max-w-md bg-card p-5 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <div className="p-5 space-y-5 flex flex-col items-center text-center">
          {loading ? <EmailVerificationSkeleton /> : error ? <VerifyError/> : <VerifiedEmail /> }
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
