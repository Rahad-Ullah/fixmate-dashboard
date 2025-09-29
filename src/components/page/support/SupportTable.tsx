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
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import supportTableColumns from "@/components/tableColumns/supportTableColumns";
import { ISupportTicket } from "@/types/support";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ticketStatuses } from "@/constants/support";
import PageTitle from "@/components/shared/PageTitle";
import SearchBar from "@/components/shared/SearchBar";

const SupportTable = ({ tickets = [], filters, meta }) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<ISupportTicket>({
    data: tickets || [],
    columns: supportTableColumns as ColumnDef<ISupportTicket>[],
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
    },
  });

  return (
    <div className="w-full h-full flex flex-col">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-center md:justify-between gap-4 items-center pb-4">
        <PageTitle>Help & Support</PageTitle>
        {/* right side filters */}
        <div className="flex flex-wrap items-center gap-4">
          <SearchBar />
          <Select
            defaultValue={filters?.status}
            onValueChange={(value) =>
              updateMultiSearchParams({
                page: null,
                status: value === "All" ? null : value,
              })
            }
          >
            <SelectTrigger className="w-36 gap-2 font-medium">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All Status</SelectItem>
                {ticketStatuses?.map((item, idx) => (
                  <SelectItem key={idx} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* table and pagination*/}
      <section className="flex-1 flex flex-col justify-between bg-white p-4 pt-2 rounded-xl">
        <DashboardTable table={table} columns={supportTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default SupportTable;
