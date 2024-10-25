import ManagerSideBar from "@/components/ui/sidebars/ManagerSideBar";
import { Outlet } from "react-router-dom";


const ManLayout = () => {
  return (
    <div className="flex">
      <ManagerSideBar/>
      <div className="flex-grow">
        <Outlet/>
      </div>
    </div>
  );
};

export default ManLayout;

