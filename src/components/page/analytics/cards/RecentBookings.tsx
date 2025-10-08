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
import userTableColumns from "@/components/tableColumns/userTableColumn";
import { IUser } from "@/types/user";
import DashboardTable from "@/components/shared/table";
import recentBookingColumns from "@/components/tableColumns/recentBookingsColumns";

const RecentBookings = ({ data = [] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<IUser>({
    data: data || [],
    columns: recentBookingColumns as ColumnDef<IUser>[],
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
    <div className="w-full flex flex-col">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-between items-center gap-4 pb-4">
        <h1 className="text-xl font-bold">Completed Orders</h1>
        {/* <div className="flex items-center gap-8">
          <SearchBar />
        </div> */}
      </section>

      {/* table and pagination*/}
      <section className="p-4 pt-2 bg-white rounded-xl">
        <DashboardTable table={table} columns={userTableColumns} />
        {/* <TablePagination
          table={table}
          meta={{ ...meta, totalPage: meta?.totalPages }}
        /> */}
      </section>
    </div>
  );
};

export default RecentBookings;
