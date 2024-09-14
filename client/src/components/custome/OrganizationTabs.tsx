import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { UsersTable } from "./UsersTable";
import { apiRequest } from "@/services/api/commonRequest";
import { OrganizationTable } from "./OrgnizationTable";


interface Organization{
    admin: string
    email: string
    phone: number
    orgName: string
    industry: string
    createdAt: Date
  }

interface OrganizationsData {
  free: Organization[];
  pro: Organization[];
  business: Organization[];
}

const OrganizationTabs = () => {

    const [tab, setTab] = useState("free");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [OrgsData, setOrgsData] = useState<OrganizationsData>({
    free: [],
    pro: [],
    business: [],
  });

  

  useEffect(()=>{
    const fetchOrganizations = async () =>{
      const res = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_USERS_URL,
        route: "/api/v1/organization",
        headers:{
          "Content-Type": "application/json"
        }
      });
      if(!res.success){
        setError(res?.errors[0]?.message || "Something went wrong while fetching orgnizatinos details");
        return setLoading(false);
      }
        return setOrgsData(res.data[0])
    }
    fetchOrganizations()
  },[]);

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="flex w-[200px]">
        <TabsTrigger className="w-[70px]" value="free">Free</TabsTrigger>
        <TabsTrigger className="w-[70px]" value="pro">Pro</TabsTrigger>
        <TabsTrigger className="w-[70px]" value="business">business</TabsTrigger>
      </TabsList>
      <TabsContent value="free">
        <Card>
          <CardContent>
            <OrganizationTable data={OrgsData.free}/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="pro">
        <Card>
          <CardContent>
            <OrganizationTable data={OrgsData.pro}/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="business">
        <Card>
          <CardContent>
            <OrganizationTable data={OrgsData.business}/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default OrganizationTabs;
