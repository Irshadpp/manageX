import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const SubscriptionWarning = ({ resource }: { resource: string }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center border border-dashed border-muted/50 rounded-lg bg-muted/20">
      <AlertTriangle className="w-24 h-24 text-red-600" />
      <h2 className="text-2xl font-semibold text-red-600 mt-6">
        {resource} Limit Exceeded!
      </h2>
      <p className="text-lg w-5/12 text-muted-foreground my-3">
        Your current subscription plan has exceeded the {resource} limit. 
        Please upgrade your subscription to continue creating new {resource}.
      </p>
      {user?.role === "owner" && (
        <Button 
          onClick={() => navigate("/owner/billing")} 
          className="mt-4"
        >
          Go to Billing
        </Button>
      )}
    </div>
  );
};

export default SubscriptionWarning;
