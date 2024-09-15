import OwnerSideBar from "@/components/ui/sidebars/OwenerSideBar";
import { Outlet } from "react-router-dom";


const OwnerLayout = () => {
  return (
    <div className="flex">
      <OwnerSideBar />
      <div className="flex-grow">
        <Outlet/>
      </div>
    </div>
  );
};

export default OwnerLayout;

