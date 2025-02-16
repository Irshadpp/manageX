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


interface User {
  email: string;
  isActive: boolean;
  username: string;
  phone: number;
  org: string;
}

export interface UsersData {
  owners: User[];
  managers: User[];
  employees: User[];
}

export function UsersTabs() {
  const [tab, setTab] = useState("owners");
  const [refresh, setRefresh] = useState(false);
  const [usersData, setUsersData] = useState<UsersData>({
    owners: [],
    managers: [],
    employees: [],
  });

  

  useEffect(()=>{
    const fetchUsers = async () =>{
      const res = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_USERS_URL,
        route: "/api/v1/users",
        headers:{
          "Content-Type": "application/json"
        }
      });
      if(res.success){
        return setUsersData(res.users[0])
      }
    }
    fetchUsers()
  },[refresh])

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="flex w-[258px]">
        <TabsTrigger value="owners">Owners</TabsTrigger>
        <TabsTrigger value="managers">Managers</TabsTrigger>
        <TabsTrigger value="employees">Employees</TabsTrigger>
      </TabsList>
      <TabsContent value="owners">
        <Card>
          <CardContent>
            <UsersTable data={usersData.owners} refresh={setRefresh}/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="managers">
        <Card>
          <CardContent>
            <UsersTable data={usersData.managers} refresh={setRefresh}/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="employees">
        <Card>
          <CardContent>
            <UsersTable data={usersData.employees} refresh={setRefresh}/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
