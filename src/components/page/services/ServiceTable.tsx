"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

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

import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import PageTitle from "@/components/shared/PageTitle";
import SearchBar from "@/components/shared/SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter } from "lucide-react";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import serviceTableColumns from "@/components/tableColumns/serviceTableColumns";

const ServiceTable = ({
  data = [],
  filters,
  meta,
}: {
  data: any[];
  filters: any;
  meta: any;
}) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const suspensionOptions = [
    { label: "Active Only", value: "false" },
    { label: "Suspended Only", value: "true" },
  ];

  const table = useReactTable<any>({
    data: data || [],
    columns: serviceTableColumns as ColumnDef<any>[],
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
      pagination: {
        pageIndex: 0,
        pageSize: filters?.limit || 20,
      },
    },
  });

  return (
    <div className="w-full min-h-full flex flex-col">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-between items-center gap-4 pb-4 px-1">
        <PageTitle>Service Management</PageTitle>
        <div className="flex items-center gap-6">
          <SearchBar />
          {/* Suspension Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="capitalize min-w-44 justify-between rounded-xl border-gray-200 h-11 transition-all hover:bg-white"
              >
                <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-gray-400" />
                    {filters?.isSuspended === 'true' ? "Suspended Only" : filters?.isSuspended === 'false' ? "Active Only" : "All Services"}
                </div>
                <ChevronDown className="text-primary w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl min-w-44 shadow-xl border-gray-100">
              <DropdownMenuItem
                className="py-2.5 cursor-pointer font-bold text-gray-500 hover:text-primary transition-colors"
                onClick={() =>
                  updateMultiSearchParams({ isSuspended: null, page: null })
                }
              >
                Show All
              </DropdownMenuItem>
              {suspensionOptions.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  className="py-2.5 cursor-pointer capitalize font-bold text-gray-700 hover:text-primary transition-colors"
                  onClick={() =>
                    updateMultiSearchParams({
                      isSuspended: item.value,
                      page: null,
                    })
                  }
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* table and pagination*/}
      <section className="flex-1 flex flex-col justify-between gap-4 p-4 pt-2 bg-white rounded-[32px] shadow-sm border border-gray-100/50 overflow-hidden">
        <DashboardTable table={table} columns={serviceTableColumns} />
        <TablePagination table={table} meta={{...meta}} />
      </section>
    </div>
  );
};

export default ServiceTable;
