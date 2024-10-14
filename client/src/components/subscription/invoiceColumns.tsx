import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          No.
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
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
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("status")}</span>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Amount
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <span className="capitalize">
        {parseInt(row.getValue("total")) / 100}.00
      </span>
    ),
  },
  {
    accessorKey: "currency",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Amount
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <span className="uppercase">{row.getValue("currency")}</span>
    ),
  },
  {
    accessorKey: "status_transitions",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Paid on
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const data: any = row.getValue("status_transitions");
      return (
        <span className="">
          {format(new Date(data.paid_at * 1000), "MMM, dd yyyy")}
        </span>
      );
    },
  },
];
