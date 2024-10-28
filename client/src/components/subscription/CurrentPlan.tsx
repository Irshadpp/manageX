import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Managex from "../ui/Managex";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "@/services/api/commonRequest";

interface Props {
  product: any;
}

const CurrentPlan = ({ product }: Props) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionUrl, setSubscriptionUrl] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const response = await apiRequest({
          method: "GET",
          url: import.meta.env.VITE_BACKEND_URL,
          route: "/api/v1/subscription/status",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const { active, manageUrl } = response.data;

        setIsSubscribed(active);
        if (active) {
          setSubscriptionUrl(manageUrl);
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
      }
    };

    checkSubscriptionStatus();
  }, []);

  const handleButtonClick = () => {
    if (isSubscribed) {
      window.location.href = subscriptionUrl;
    } else {
      navigate("/owner/billing/plans")
    }
  };
  return (
    <div className="bg-muted/50 p-7 text-sm rounded-md col-span-2">
      <p className="uppercase">Current subscription plan</p>
      <h1 className="text-4xl font-bold py-2">
        🚀
        {product ? product.name : "Free"}
      </h1>
      <p className="text-foreground py-2">
        {product
          ? product.description
          : 
          <>
          Free plan doesn't give you all the benefits of <Managex /> Subscribe to Pro or Business to enjoy all benefits.
        </>}
      </p>
      <div className="flex items-center gap-5">
          <Button onClick={handleButtonClick}>{isSubscribed ? "Manage Subscription" : "Upgrade Plan"}</Button>
      </div>
    </div>
  );
};

export default CurrentPlan;
