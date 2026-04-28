"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { PaymentStatus } from "@/constants/booking";
import { IPayment } from "@/types/payment";
import PaymentDetailsModal from "../page/payments/PaymentDetailsModal";
import CopyButton from "../shared/CopyButton";

// table column definition
const paymentTableColumns: ColumnDef<IPayment>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      return <p className="px-2">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "customId",
    header: "Payment ID",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-1.5">
          <p className="px-2">{item?.customId || item?.paymentId}</p>
          <CopyButton value={item?.customId || item?.paymentId || ""} />
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const item = row.original;
      const customer = item?.customer as any;
      return (
        <div className="flex flex-col">
          <p className="px-2 font-medium">{customer?.name || "N/A"}</p>
          <div className="px-2 flex items-center gap-1">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">{customer?.customId || "N/A"}</span>
            {customer?.customId && <CopyButton value={customer.customId} className="p-0 h-fit w-fit hover:bg-transparent" />}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "provider",
    header: "Provider",
    cell: ({ row }) => {
      const item = row.original;
      const provider = item?.provider as any;
      return (
        <div className="flex flex-col">
          <p className="px-2 font-medium">{provider?.name || "N/A"}</p>
          <div className="px-2 flex items-center gap-1">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">{provider?.customId || "N/A"}</span>
            {provider?.customId && <CopyButton value={provider.customId} className="p-0 h-fit w-fit hover:bg-transparent" />}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "servicePrice",
    header: "Service Price",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2">R{item?.servicePrice}</p>;
    },
  },
  {
    accessorKey: "vat",
    header: "VAT",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2">R{item?.vat || 0}</p>;
    },
  },
  {
    accessorKey: "platformFee",
    header: "Fee",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2">R{item?.platformFee}</p>;
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
    accessorKey: "paymentStatus",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Badge
          variant="outline"
          className={`capitalize font-medium shadow-none rounded-full py-1.5 px-3 w-[150px] whitespace-nowrap flex justify-center border ${
            item?.paymentStatus === PaymentStatus.PAID
              ? "bg-green-50 text-green-500 border-green-400"
              : item?.paymentStatus === PaymentStatus.REFUNDED
              ? "bg-purple-50 text-purple-500 border-purple-400"
              : item?.paymentStatus === PaymentStatus.PARTIAL_REFUNDED
              ? "bg-indigo-50 text-indigo-500 border-indigo-400"
              : "bg-gray-50 text-gray-500 border-gray-400"
          }`}
        >
          {item?.paymentStatus?.replace("_", " ")}
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
          <PaymentDetailsModal paymentId={item?._id} />
        </div>
      );
    },
  },
];

export default paymentTableColumns;
