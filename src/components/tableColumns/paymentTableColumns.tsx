"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { PaymentStatus } from "@/constants/booking";
import { IPayment } from "@/types/payment";
import PaymentDetailsModal from "../page/payments/PaymentDetailsModal";

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
      return <p className="px-2">{item?.customId || item?.paymentId}</p>;
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const item = row.original;
      const customer = item?.customer as any;
      return <p className="px-2">{customer?.name || customer || "N/A"}</p>;
    },
  },
  {
    accessorKey: "provider",
    header: "Provider",
    cell: ({ row }) => {
      const item = row.original;
      const provider = item?.provider as any;
      return <p className="px-2">{provider?.name || provider || "N/A"}</p>;
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
          className={`capitalize font-medium shadow-none rounded-full py-1.5 w-[110px] flex justify-center border ${
            item?.paymentStatus === PaymentStatus.PENDING
              ? "bg-blue-50 text-blue-500 border-blue-400"
              : item?.paymentStatus === PaymentStatus.FAILED
              ? "bg-red-50 text-red-500 border-red-400"
              : item?.paymentStatus === PaymentStatus.CANCELLED
              ? "bg-red-50 text-red-500 border-red-400"
              : item?.paymentStatus === PaymentStatus.PROVIDER_CANCELLED
              ? "bg-orange-50 text-orange-500 border-orange-400"
              : item?.paymentStatus === PaymentStatus.COMPLETED
              ? "bg-green-50 text-green-500 border-green-400"
              : item?.paymentStatus === PaymentStatus.PAID
              ? "bg-green-50 text-green-500 border-green-400"
              : item?.paymentStatus === PaymentStatus.REFUNDED
              ? "bg-purple-50 text-purple-500 border-purple-400"
              : item?.paymentStatus === "SETTLED"
              ? "bg-emerald-50 text-emerald-500 border-emerald-400"
              : "bg-gray-50 text-gray-500 border-gray-400"
          }`}
        >
          {item?.paymentStatus}
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
