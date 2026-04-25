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
import { ChevronDown } from "lucide-react";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import penaltyTableColumns from "@/components/tableColumns/penaltyTableColumns";
import DownloadPenaltiesModal from "./DownloadPenaltiesModal";

const PenaltyTable = ({
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

  const penaltyTypes = ['PROVIDER', 'CLIENT'];

  const table = useReactTable<any>({
    data: data || [],
    columns: penaltyTableColumns as ColumnDef<any>[],
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
        <PageTitle>Penalty Management</PageTitle>
        <div className="flex items-center gap-6">
          <SearchBar />
          {/* Type Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="capitalize min-w-40 justify-between rounded-xl border-gray-200 h-11"
              >
                {filters?.type ? `${filters?.type}` : "All Types"}{" "}
                <ChevronDown className="text-primary w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-xl min-w-40">
              <DropdownMenuItem
                className="py-2 cursor-pointer font-medium"
                onClick={() =>
                  updateMultiSearchParams({ type: null, page: null })
                }
              >
                All Types
              </DropdownMenuItem>
              {penaltyTypes.map((item) => (
                <DropdownMenuItem
                  key={item}
                  className="py-2 cursor-pointer capitalize font-medium"
                  onClick={() =>
                    updateMultiSearchParams({
                      type: item,
                      page: null,
                    })
                  }
                >
                  {capitalizeSentence(item?.toLowerCase())}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <DownloadPenaltiesModal />
          </div>
        </div>
      </section>

      {/* table and pagination*/}
      <section className="flex-1 flex flex-col justify-between gap-4 p-4 pt-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <DashboardTable table={table} columns={penaltyTableColumns} />
        <TablePagination table={table} meta={{...meta}} />
      </section>
    </div>
  );
};

export default PenaltyTable;
