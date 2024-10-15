import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SubscriptionCancelButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscriptionCancellation = async () => {
//     setLoading(true);

//     let res = await actualCommonRequest({
//       route: API_ROUTES.SUBSCRIPTION,
//       method: "DELETE",
//       url: "/api/subscription/cancel",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.success) {
//       setError(res.error);
//     }

//     if (res.success) {
//       setIsModalOpen(false);
//       router.refresh();
//     }
//     setLoading(false);
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setIsModalOpen(true)}>
        Cancel Subscription
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Are your sure about this?</DialogTitle>
            <DialogDescription>
              You can still use our app in the free version. Feel free to use it
              as long as possible...
              <p>{loading ? "Loading" : "Not loading"}</p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              No
            </Button>
            <Button
              onClick={() => handleSubscriptionCancellation()}
              variant="destructive"
            >
              Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionCancelButton;
