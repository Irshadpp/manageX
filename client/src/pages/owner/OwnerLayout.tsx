import React from "react";
import OwnerSideBar from "@/components/ui/sidebars/OwenerSideBar";
import { Outlet } from "react-router-dom";


const OwnerLayout = () => {
  return (
    <div className="flex h-screen">
      <OwnerSideBar />
      <div className="flex-grow">
        <Outlet/>
      </div>
    </div>
  );
};

export default OwnerLayout;
