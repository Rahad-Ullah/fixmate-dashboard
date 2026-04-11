"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { ITransaction } from "@/types/transaction";
import TransactionDetailsModal from "../page/transactions/TransactionDetailsModal";

// table column definition
const transactionTableColumns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      return <p className="px-2">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "customId",
    header: "Transaction ID",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2">{item?.customId}</p>;
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2">{item?.user?.name || "N/A"}</p>;
    },
  },
  {
    accessorKey: "booking",
    header: "Booking ID",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2 font-medium">{item?.booking?.customId || "N/A"}</p>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Badge variant="outline" className="capitalize font-medium shadow-none px-3 py-1 bg-gray-50 text-gray-700 border-gray-200">
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
      return <p className="px-2">R{item?.amount}</p>;
    },
  },
  {
    accessorKey: "netAmount",
    header: "Net Amount",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2 font-bold text-gray-800">R{item?.netAmount}</p>;
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
            item?.status === "PENDING"
              ? "bg-yellow-50 text-yellow-500 border-yellow-400"
              : item?.status === "COMPLETED"
              ? "bg-green-50 text-green-500 border-green-400"
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
          <TransactionDetailsModal transactionId={item?._id} />
        </div>
      );
    },
  },
];

export default transactionTableColumns;
