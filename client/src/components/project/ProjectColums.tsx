
  import { CaretSortIcon } from "@radix-ui/react-icons";
  import { ColumnDef } from "@tanstack/react-table";
  import { format } from "date-fns";
import { Avatar, AvatarImage } from "../ui/avatar";
import AvatarFallbackImage from "./AvatarFallbackImage";
import StatusBadge from "./StatusBadge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Project } from "@/store/types/project";
  
  export const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "description",
      header: "description",
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-1 items-center hover:text-foreground cursor-pointer"
          >
            Title
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => (
        <HoverCard>
          <HoverCardTrigger asChild>
            <p className="hover:underline hover:opacity-80 cursor-pointer">
              {row.getValue("name")}
            </p>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{row.getValue("name")}</h4>
              <p className="text-sm">
                {row.getValue("description") || "No description were given"}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ),
    },
    {
      accessorKey: "members",
      header: "Assignee",
      cell: ({ row }) => {
        let members: any[] = row.getValue("members");
        return (
          <div className="flex">
            {members &&
              members.map(
                (member, index) =>
                  typeof member !== "string" && (
                    <Avatar
                      key={index}
                      className={`w-7 h-7 border rounded-full ${index !== 0 ? "-ml-2" : ""}`}
                    >
                      <AvatarImage className="rounded-full w-full h-full object-cover" src={member.profileURL} />
                      <AvatarFallbackImage />
                    </Avatar>
                  )
              )}
          </div>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) =>
        format(new Date(row.getValue("startDate")), "MMM d, yyyy"),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => format(new Date(row.getValue("endDate")), "MMM d, yyyy"),
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-1 items-center hover:text-foreground cursor-pointer"
          >
            Status
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
  ];
  
  export const columnsOwner: ColumnDef<Project>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "description",
      header: "description",
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-1 items-center hover:text-foreground cursor-pointer"
          >
            Title
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => (
        <HoverCard>
          <HoverCardTrigger asChild>
            <p className="hover:underline hover:opacity-80 cursor-pointer">
              {row.getValue("name")}
            </p>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{row.getValue("name")}</h4>
              <p className="text-sm">
                {row.getValue("description") || "No description were given"}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ),
    },
    {
      accessorKey: "manager",
      header: "Manager",
      cell: ({ row }) => {
        let manager: any = row.getValue("manager");
        return (
          <div className="flex gap-1 items-center">
            {manager && (
              <Avatar className={`rounded-full w-7 h-7`}>
                <AvatarImage className="rounded-full w-full h-full object-cover" src={manager.profileURL} />
                <AvatarFallbackImage />
              </Avatar>
            )}
            {manager && `${manager.fName} ${manager.lName}`}
          </div>
        );
      },
    },
    {
      accessorKey: "members",
      header: "Assignee",
      cell: ({ row }) => {
        let members: any[] = row.getValue("members");
        return (
          <div className="flex">
            {members &&
              members.map(
                (member, index) =>
                  typeof member !== "string" && (
                    <Avatar
                      key={index}
                      className={`w-7 h-7 rounded-full border ${index !== 0 ? "-ml-2" : ""}`}
                    >
                      <AvatarImage className="rounded-full w-full h-full object-cover" src={member.profileURL} />
                      <AvatarFallbackImage />
                    </Avatar>
                  )
              )}
          </div>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) =>
        format(new Date(row.getValue("startDate")), "MMM d, yyyy"),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => format(new Date(row.getValue("endDate")), "MMM d, yyyy"),
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-1 items-center hover:text-foreground cursor-pointer"
          >
            Status
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
  ];
  