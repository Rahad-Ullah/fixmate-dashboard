"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { IPenalty } from "@/types/penalty";
import PenaltyDetailsModal from "../page/penalties/PenaltyDetailsModal";
import CopyButton from "../shared/CopyButton";

// table column definition
const penaltyTableColumns: ColumnDef<IPenalty>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      return <p className="px-2">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "customId",
    header: "Penalty ID",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-1.5">
          <p className="px-2">{item?.customId}</p>
          <CopyButton value={item?.customId || ""} />
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "User ID",
    cell: ({ row }) => {
      const item = row.original;
      const user = item?.user as any;
      return (
        <div className="flex items-center gap-1.5">
          <p className="px-2 font-medium">{user?.customId || user || "N/A"}</p>
          {(user?.customId || user) && <CopyButton value={user?.customId || user} />}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Badge variant="outline" className={`capitalize font-medium shadow-none px-3 py-1 ${
            item?.type === 'PROVIDER' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'
        }`}>
          {item?.type?.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2 font-bold text-gray-800">R{item?.amount}</p>;
    },
  },
  {
    accessorKey: "taken",
    header: "Taken",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2 text-green-600 font-medium">R{item?.taken}</p>;
    },
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2 text-red-600 font-bold">R{item?.due}</p>;
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
            item?.status === "COMPLETED"
              ? "bg-green-50 text-green-500 border-green-400"
              : item?.status === "PENDING"
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
        <div className="flex items-center justify-center">
          <PenaltyDetailsModal penaltyId={item?._id} />
        </div>
      );
    },
  },
];

export default penaltyTableColumns;
