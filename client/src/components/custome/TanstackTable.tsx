import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ReactNode, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

export function TanStackDataTable<TData, TValue>({
  columns,
  data,
  pageTitle,
  newButton,
  searchField,
  rowOnClick,
  showColSelectButton = true,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageTitle?: string;
  newButton?: ReactNode;
  searchField?: string;
  rowOnClick?: (id: string) => void;
  showColSelectButton?: boolean;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    description: false,
    endTime: false,
    startTime: false,
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  const renderPageLinks = () => {
    const initialPagesToShow = 3;
    const totalPages = table.getPageCount();

    const pages = [];

    let startPage = Math.max(
      Math.min(
        totalPages,
        pagination.pageIndex - Math.floor(initialPagesToShow / 2)
      ),
      1
    );

    let endPage = Math.min(startPage + initialPagesToShow - 1, totalPages);

    if (endPage - startPage < initialPagesToShow - 1) {
      endPage = Math.min(startPage + initialPagesToShow - 1, totalPages);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => table.setPageIndex(i - 1)}
            isActive={pagination.pageIndex + 1 === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    if (startPage > 1) {
      pages.unshift(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="w-full px-5">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 pb-4">
        {pageTitle && <h1 className="font-bold text-3xl">{pageTitle}</h1>}
        {searchField && (
          <Input
            placeholder={`Search ${searchField}...`}
            value={
              (table.getColumn(searchField)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchField)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        {showColSelectButton && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="md:ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  if (
                    column.id === "id" ||
                    column.id === "description" ||
                    column.id === "endTime" ||
                    column.id === "startTime"
                  ) {
                    return;
                  }
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {newButton}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted/60 hover:bg-accent border-background"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="bg-muted/40 border-background cursor-pointer"
                  onClick={() => rowOnClick && rowOnClick(row.getValue("id"))}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => table.previousPage()} />
              </PaginationItem>
              {renderPageLinks()}
              <PaginationItem>
                <PaginationNext
                  onClick={() => table.getCanNextPage() && table.nextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
