import ManagerSideBar from "@/components/ui/sidebars/ManagerSideBar";
import { Outlet } from "react-router-dom";


const OwnerLayout = () => {
  return (
    <div className="flex">
      <ManagerSideBar/>
      <div className="flex-grow">
        <Outlet/>
      </div>
    </div>
  );
};

export default OwnerLayout;

