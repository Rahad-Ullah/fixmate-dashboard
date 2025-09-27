"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userTableColumns from "@/components/tableColumns/userTableColumn";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { userRoles } from "@/constants/user";
import { IUser } from "@/types/user";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import PageTitle from "@/components/shared/PageTitle";

// Extract unique roles from data
const roles = Array.from(new Set(userRoles.map((item) => item.title)));

const UsersTable = ({ users = [], filters, meta }) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<IUser>({
    data: users || [],
    columns: userTableColumns as ColumnDef<IUser>[],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      // pagination: { pageIndex: 0, pageSize: 10 },
    },
  });

  return (
    <div className="w-full min-h-full flex flex-col">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-between items-center gap-4 pb-4">
        <PageTitle>User Management</PageTitle>
        {/* Role Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize min-w-32 justify-between"
            >
              {filters?.role ? `${filters?.role}` : "Role"}{" "}
              <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                updateMultiSearchParams({ role: null, page: null })
              }
            >
              All Roles
            </DropdownMenuItem>
            {roles.map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() =>
                  updateMultiSearchParams({ role: item, page: null })
                }
              >
                {capitalizeSentence(item)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* table and pagination*/}
      <section className="flex-1 flex flex-col justify-between gap-4 p-4 pt-2 bg-white rounded-xl">
        <DashboardTable table={table} columns={userTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default UsersTable;
