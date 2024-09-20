import UserAvatar from '/useravatar.png';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { SubTask, Task } from "@/store/types/task";
import { Employee } from "@/store/types/employee";
import StatusBadge from '@/components/project/StatusBadge';
import PriorityIcon from '@/components/custome/PriorityIcon';

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
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
          <p className="hover:underline hover:opacity-80 cursor-pointer">
            {row.getValue("title")}
          </p>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{row.getValue("title")}</h4>
            <p className="text-sm">
              {row.getValue("description") || "No description were given"}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Assignee
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      let assignee: Employee = row.getValue("assignee");
      return (
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 rounded-full overflow-clip">
            <img
              src={
                (assignee &&
                  typeof assignee !== "string" &&
                  (assignee.profileURL as string)) ||
                UserAvatar
              }
              alt="Profile"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>
          <p className="line-clamp-1 max-w-36">
            {assignee.fName} {assignee.lName}
          </p>
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
    accessorKey: "dueDate",
    header: "End Date",
    cell: ({ row }) => format(new Date(row.getValue("dueDate")), "MMM d, yyyy"),
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
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Priority
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <PriorityIcon priority={row.getValue("priority")} />,
  },
  {
    accessorKey: "subTasks",
    header: "Completion",
    cell: ({ row }) => {
      const subTask: SubTask[] = row.getValue("subTasks");
      let completed = 0;
      subTask.map((sub) => {
        if (sub.status === "completed") {
          completed++;
        }
      });

      const value = ((completed / subTask.length) * 100) >> 0;

      if (subTask.length === 0) {
        return null;
      }

      return (
        <span className="flex items-center gap-2">
          <Progress value={value} className="h-1" />
          {value ?? ""}%
        </span>
      );
    },
  },
];
