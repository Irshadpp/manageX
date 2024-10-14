import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SubscriptionDetailsForm from "./SubscriptionDetailsForm";

interface Props {
  title: string;
  value: string;
}

const SubscribeButton = ({ title, value }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button className="my-5" onClick={() => setIsModalOpen(true)}>
        {title}
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Enter your details</DialogTitle>
            <DialogDescription>
              To subscribe we need your details as per the Indian Laws, So
              please enter below details.
            </DialogDescription>
          </DialogHeader>
          <SubscriptionDetailsForm setIsModalOpen={setIsModalOpen} value={value} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscribeButton;
