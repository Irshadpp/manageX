import CurrentPlan from "@/components/subscription/CurrentPlan";
import CurrentPlanBenefits from "@/components/subscription/CurrentPlanBenefits";
import InvoiceTable from "@/components/subscription/InvoiceTable";
import NextInvoice from "@/components/subscription/NextInvoice";
import { apiRequest } from "@/services/api/commonRequest";
import { useEffect, useState } from "react";

const Subscription = () => {
  const [res, setRes] = useState<any>();

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_BACKEND_URL,
        route: "/api/v1/subscription",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.success) {
        setRes(res.data);
      }
      console.log(res)
    };
    fetchDetails();
  }, []);


  return (
    <div className="py-5 w-full">
    <div>
      <div className="px-5 grid grid-cols-1 md:grid-cols-7 space-y-5 md:space-y-0 md:space-x-5">
        <CurrentPlan product={res ? res.product : null} />
        <NextInvoice upcomingInvoice={res ? res.upcomingInvoice : null} />
        <CurrentPlanBenefits product={res ? res.product : null} />
      </div>
      <InvoiceTable data={res && res.invoices && res.invoices.data} />
    </div>
    </div>
  );
};

export default Subscription
