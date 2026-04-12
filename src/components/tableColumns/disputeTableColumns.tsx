"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { IDispute } from "@/types/dispute";
import DisputeDetailsModal from "../page/disputes/DisputeDetailsModal";
import ResolveDisputeModal from "../page/disputes/ResolveDisputeModal";
import CopyButton from "../shared/CopyButton";

// table column definition
const disputeTableColumns: ColumnDef<IDispute>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      return <p className="px-2">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "bookingId",
    header: "Booking ID",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-1.5">
          <p className="px-2 font-bold">{item?.bookingId?.customId || "N/A"}</p>
          {item?.bookingId?.customId && <CopyButton value={item.bookingId.customId} />}
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "Raised User",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2">{item?.user?.name || "N/A"}</p>;
    },
  },
  {
    accessorKey: "raisedBy",
    header: "Raised By",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Badge variant="outline" className={`capitalize font-bold shadow-none px-3 py-1 ${
            item?.raisedBy === 'client' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'
        }`}>
          {item?.raisedBy}
        </Badge>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2 truncate max-w-[200px] text-gray-600">{item?.reason}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2">{item?.createdAt?.split("T")[0]}</p>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Badge
          variant="outline"
          className={`capitalize font-medium shadow-none rounded-full py-1 w-[100px] flex justify-center border ${
            item?.status === "resolved"
              ? "bg-green-50 text-green-500 border-green-400"
              : item?.status === "in_review"
              ? "bg-yellow-50 text-yellow-500 border-yellow-400"
              : "bg-red-50 text-red-500 border-red-400"
          }`}
        >
          {item?.status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          <DisputeDetailsModal disputeId={item?._id} />
          {item?.status !== "resolved" && (
            <ResolveDisputeModal disputeId={item?._id} />
          )}
        </div>
      );
    },
  },
];

export default disputeTableColumns;
