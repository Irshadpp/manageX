import { CircleUser, Menu, Package2, Search } from "lucide-react";

import { PiUserListBold } from "react-icons/pi";
import { MdGroupAdd, MdOutlinePolicy } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { BsPersonRolodex } from "react-icons/bs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink, Outlet } from "react-router-dom";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

const getNavLinkClassName = (isActive: boolean) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
    isActive
      ? "bg-muted text-primary"
      : "text-muted-foreground hover:text-primary"
  }`;

export function EmployeeSideMenu() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[240px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <h1 className="flex text-2xl items-center gap-2 font-semibold">
              Employees
            </h1>
          </div>
          <div className="flex-1  ">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/owner/employees/list"
                className={({ isActive }) => getNavLinkClassName(isActive)}
              >
                <PiUserListBold className="h-4 w-4" />
                Employee List
              </NavLink>
              <NavLink
                to="/owner/employees/create"
                className={({ isActive }) => getNavLinkClassName(isActive)}
              >
                <MdGroupAdd className="h-4 w-4" />
                Create
              </NavLink>
              <NavLink
                to="/owner/employees/leave"
                className={({ isActive }) => getNavLinkClassName(isActive)}
              >
                <IoCreateOutline className="h-4 w-4" />
                Leave Requests
              </NavLink>
              <NavLink
                to="/owner/employees/policy"
                className={({ isActive }) => getNavLinkClassName(isActive)}
              >
                <MdOutlinePolicy className="h-5 w-4"/>
                Attendance Policy
              </NavLink>
              <NavLink
                to="/owner/employees/ex-employee"
                className={({ isActive }) => getNavLinkClassName(isActive)}
              >
                <BsPersonRolodex className="h-4 w-4" />
                Ex-employees
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <NavLink
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Employees</span>
                </NavLink>
                <NavLink
                  to="/owner/employees/list"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <PiUserListBold className="h-5 w-5" />
                  Employee List
                </NavLink>
                <NavLink
                  to="/owner/employees/create"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <MdGroupAdd className="h-5 w-5" />
                  Create
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"></Badge>
                </NavLink>
                <NavLink
                  to="/owner/employees/leave"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <IoCreateOutline className="h-5 w-5" />
                  Leave Requests
                </NavLink>
                <NavLink
                  to="/owner/employees/policy"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <MdOutlinePolicy className="h-5 w-5" />
                  Attendance Policy
                </NavLink>
                <NavLink
                  to="/owner/employees/ex-employee"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <BsPersonRolodex className="h-5 w-5" />
                  Ex-employees
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
