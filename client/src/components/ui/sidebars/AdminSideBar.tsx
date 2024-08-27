import { Link, useLocation } from "react-router-dom";
import Managex from "../Managex";
import Logo from "/logo.png";
import { TooltipWrapper } from "@/components/custome/TooltipWrapper";
import { AiFillDashboard } from "react-icons/ai";
import { FaUsers, FaCreditCard } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { CgOrganisation } from "react-icons/cg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { logout } from "@/services/auth/logout";

const AdminSideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="p-2 bg-card hidden md:block text-center h-screen">
      <div className="flex flex-col items-center gap-2 pt-4">
        <img src={Logo} alt="logo" width={35} height={35} />
        <h1 className="font-bold text-xs">
          <Managex />
        </h1>
      </div>
      <div className="flex flex-col items-center gap-3 py-5">
        <Link to="/admin" className="hover-text text-xl">
          <TooltipWrapper title="Dashboard">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/admin-dashboard" ? "bg-primary" : ""
              }`}
            >
              <AiFillDashboard className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/admin/organizations" className="hover-text text-xl">
          <TooltipWrapper title="Organizations">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/admin/Organizations" ? "bg-primary" : ""
              }`}
            >
              <CgOrganisation className="m-1"/>
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/admin/users" className="hover-text text-xl">
          <TooltipWrapper title="Users">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/admin/users" ? "bg-primary" : ""
              }`}
            >
              <FaUsers  className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/admin/subscriptions" className="hover-text text-xl">
          <TooltipWrapper title="Subscriptions">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/admin/subscriptions" ? "bg-primary" : ""
              }`}
            >
              <FaCreditCard className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/admin/settings" className="hover-text text-xl">
          <TooltipWrapper title="Settings">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/admin/settings" ? "bg-primary" : ""
              }`}
            >
              <IoSettings className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div
              className={`p-1 rounded-xl hover:bg-popover text-xl hover-text cursor-pointer`}
            >
              <TbLogout className="m-1" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will need to log in again to access your account. Make sure
                to save any unsaved work before proceeding.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction onClick={logout}>Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AdminSideBar;
