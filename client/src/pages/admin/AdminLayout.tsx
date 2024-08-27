import AdminSideBar from "@/components/ui/sidebars/AdminSideBar";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <AdminSideBar />
      <div className="flex-grow p-4">
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;