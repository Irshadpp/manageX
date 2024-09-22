import StatusBadge from "@/components/project/StatusBadge";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
import { SubTask } from "@/store/types/task";
  import { CaretSortIcon } from "@radix-ui/react-icons";
  import { ColumnDef } from "@tanstack/react-table";
  import { BiTimeFive } from "react-icons/bi";
  
  export const columns: ColumnDef<SubTask>[] = [
    {
      accessorKey: "title",
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
            <p className="line-clamp-1">{row.getValue("title")}</p>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{row.getValue("title")}</h4>
            </div>
          </HoverCardContent>
        </HoverCard>
      ),
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
    {
      accessorKey: "duration",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-1 items-center hover:text-foreground cursor-pointer"
          >
            <BiTimeFive />
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        const duration: {
          length: number;
          durationType: "minutes" | "hours" | "day";
        } = row.getValue("duration");
  
        let type =
          duration.durationType === "minutes"
            ? "m"
            : duration.durationType === "hours"
            ? "h"
            : "d";
  
        return (
          <span>
            {duration.length}
            {type}
          </span>
        );
      },
    },
  ];
  