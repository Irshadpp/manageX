import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlanCards from "@/pages/landing/PlanCards";

export default function Plans() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Choose Plan </h1>
      <h1 className="text-3xl font-bold">That&apos;s Right For You</h1>
      <p className="text-foreground py-5">
        Choose plan that works best for you, feel free to contact us
      </p>
      <Tabs defaultValue="monthly">
        <TabsList className="shadow-md">
          <TabsTrigger
            value="monthly"
            className="active:bg-primary active:text-foreground"
          >
            Monthly
          </TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <PlanCards pro="49" business="499" />
        </TabsContent>
        <TabsContent value="yearly">
          <PlanCards pro="499" business="4999" />
        </TabsContent>
      </Tabs>
    </div>
  );
}