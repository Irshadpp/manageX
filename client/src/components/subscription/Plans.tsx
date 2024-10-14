import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import PlanCards from "./PlanCards";

export default function Plans() {
  const [subscription, setSubscription] = useState<any>();

  useEffect(() => {
    // const loadData = async () => {
    //   const res = await actualCommonRequest({
    //     route: API_ROUTES.SUBSCRIPTION,
    //     method: "GET",
    //     url: "/api/subscription",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (res.success) {
    //     setSubscription(res.subscription);
    //   }
    // };
    // loadData();
  }, []);

  return (
    <div className="text-center w-full">
      <h1 className="text-3xl font-bold mt-5">Choose Plan </h1>
      <h1 className="text-3xl font-bold">That&apos;s Right For You</h1>
      <p className="text-foreground py-5">
        Choose plan that works best for you, feel free to contact us
      </p>
      <Tabs defaultValue="monthly">
        <TabsList className="shadow-md">
          <TabsTrigger
            value="monthly"
            className="active:bg-blue-500 active:text-white"
          >
            Monthly
          </TabsTrigger>
          <TabsTrigger value="yearly">yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <PlanCards pro="49" business="399" subscription={subscription} />
        </TabsContent>
        <TabsContent value="yearly">
          <PlanCards pro="499" business="3999" subscription={subscription} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
