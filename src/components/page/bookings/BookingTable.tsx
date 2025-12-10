/* eslint-disable @typescript-eslint/no-explicit-any */
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
import TablePagination from "@/components/shared/table-pagination";
import PageTitle from "@/components/shared/PageTitle";
import SearchBar from "@/components/shared/SearchBar";
import bookingTableColumns from "@/components/tableColumns/bookingTableColumns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download } from "lucide-react";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import { BookingStatus } from "@/constants/booking";
import toast from "react-hot-toast";
import { downloadFile } from "@/utils/downloadFile";

const BookingsTable = ({
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

  const table = useReactTable<IUser>({
    data: data || [],
    columns: bookingTableColumns as ColumnDef<IUser>[],
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
        pageSize: filters?.limit,
      },
    },
  });

  // download all
  const handleDownload = async () => {
    try {
      await downloadFile(
        "/api/v1/admin/generate-multi-invoices",
        "bookings.pdf",
        data.map((item) => item._id)
      );
    } catch (error) {
      toast.error("Failed to download", { id: "download-bookings" });
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-between items-center gap-4 pb-4">
        <PageTitle>Bookings Management</PageTitle>
        <div className="flex items-center gap-8">
          <SearchBar />
          {/* Status Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="capitalize min-w-32 justify-between"
              >
                {filters?.status ? `${filters?.status}` : "Status"}{" "}
                <ChevronDown className="text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() =>
                  updateMultiSearchParams({ status: null, page: null })
                }
              >
                All Status
              </DropdownMenuItem>
              {Object.values(BookingStatus).map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() =>
                    updateMultiSearchParams({
                      status: item?.toLowerCase(),
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
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              Download All
              <Download />
            </Button>
          </div>
        </div>
      </section>

      {/* table and pagination*/}
      <section className="flex-1 flex flex-col justify-between gap-4 p-4 pt-2 bg-white rounded-xl">
        <DashboardTable table={table} columns={userTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default BookingsTable;
