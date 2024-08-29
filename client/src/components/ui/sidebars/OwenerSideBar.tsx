import { Link, useLocation } from "react-router-dom";
import Managex from "../Managex";
import Logo from "/logo.png";
import { TooltipWrapper } from "@/components/custome/TooltipWrapper";
import { AiFillDashboard } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { FaTasks, FaMoneyCheckAlt, FaCreditCard } from "react-icons/fa";
import { FaUsersGear, FaUsersRectangle } from "react-icons/fa6";
import { IoMdChatbubbles } from "react-icons/io";
import { PiVideoConferenceFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
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
import logout from "@/services/auth/logout";
import useLogout from "@/hooks/useLogout";

const OwnerSideBar = () => {
  const { pathname } = useLocation();
  const logout = useLogout();
  const handleLogout = async () =>{
    logout()
  }
  return (
    <div className="p-2 bg-card hidden md:block text-center h-screen">
      <div className="flex flex-col items-center gap-2 pt-4">
        <img src={Logo} alt="logo" width={35} height={35} />
        <h1 className="font-bold text-xs">
          <Managex />
        </h1>
      </div>
      <div className="flex flex-col items-center gap-3 py-5">
        <Link to="/owner" className="hover-text text-xl">
          <TooltipWrapper title="Dashboard">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/owner" ? "bg-primary" : ""
              }`}
            >
              <AiFillDashboard className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/owner/projects" className="hover-text text-xl">
          <TooltipWrapper title="Dashboard">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/owner/projects" ? "bg-primary" : ""
              }`}
            >
              <GrProjects className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/owner-tasks" className="hover-text text-xl">
          <TooltipWrapper title="Tasks">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/owner/tasks" ? "bg-primary" : ""
              }`}
            >
              <FaTasks className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/owner/employees" className="hover-text text-xl">
          <TooltipWrapper title="Employees">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/owner/employees" ? "bg-primary" : ""
              }`}
            >
              <FaUsersGear className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/owner/clients" className="hover-text text-xl">
          <TooltipWrapper title="Clients">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/owner/clients" ? "bg-primary" : ""
              }`}
            >
              <FaUsersRectangle className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/owner/deals" className="hover-text text-xl">
          <TooltipWrapper title="Deals">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/owner/deals" ? "bg-primary" : ""
              }`}
            >
              <FaMoneyCheckAlt className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/owner/chat" className="hover-text text-xl">
          <TooltipWrapper title="Messages">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/owner/chat" ? "bg-primary" : ""
              }`}
            >
              <IoMdChatbubbles className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/owner/meetings" className="hover-text text-xl">
          <TooltipWrapper title="Meetings">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/owner/meetings" ? "bg-primary" : ""
              }`}
            >
              <PiVideoConferenceFill className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/owner/billing" className="hover-text text-xl">
          <TooltipWrapper title="Billing">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/owner/billing" ? "bg-primary" : ""
              }`}
            >
              <FaCreditCard className="m-1" />
            </div>
          </TooltipWrapper>
        </Link>
        <Link to="/owner/settings" className="hover-text text-xl">
          <TooltipWrapper title="Settings">
            <div
              className={`p-1 rounded-xl hover:bg-popover ${
                pathname === "/owner/settings" ? "bg-primary" : ""
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
              <AlertDialogAction onClick={handleLogout}>Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default OwnerSideBar;
