"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { BookingStatus } from "@/constants/booking";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { config } from "@/config/env-config";
import BookingDetailsModal from "../page/bookings/BookingDetailsModal";
import CopyButton from "../shared/CopyButton";
import { format } from "date-fns";

// table column definition
const recentBookingColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      return <p className="px-2">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "customId",
    header: "Booking ID",
    cell: ({ row }) => {
      const item = row.original as any;
      return (
        <div className="flex items-center gap-1.5">
          <p className="px-2 font-medium">{item?.customId || item?._id}</p>
          <CopyButton value={item?.customId || item?._id} />
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer Name",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">{item?.customer?.name}</p>;
    },
  },
  {
    accessorKey: "provider",
    header: "Provider Name",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">{item?.provider?.name}</p>;
    },
  },
  {
    accessorKey: "contact",
    header: "Provider Contact",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">{item?.provider?.contact}</p>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2 font-semibold text-primary">R{item?.service?.price}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "Service Date",
    cell: ({ row }) => {
      const item = row.original as any;
      return (
        <p className="px-2">
          {item?.date
            ? format(new Date(item.date), "dd MMM yyyy")
            : "N/A"}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Booking Date",
    cell: ({ row }) => {
      const item = row.original as any;
      return (
        <p className="px-2">
          {item?.createdAt
            ? format(new Date(item.createdAt), "dd MMM yyyy")
            : "N/A"}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Order Status</div>,
    cell: ({ row }) => {
      const item = row.original as any;
      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={`capitalize font-medium shadow-none rounded-full py-1.5 w-[130px] flex justify-center border ${
              item?.bookingStatus === BookingStatus.REQUESTED
                ? "bg-blue-50 text-blue-500 border-blue-400"
                : item?.bookingStatus === BookingStatus.ACCEPTED
                ? "bg-yellow-50 text-yellow-500 border-yellow-400"
                : item?.bookingStatus === BookingStatus.IN_PROGRESS
                ? "bg-indigo-50 text-indigo-500 border-indigo-400"
                : item?.bookingStatus === BookingStatus.COMPLETED_BY_PROVIDER
                ? "bg-teal-50 text-teal-500 border-teal-400"
                : item?.bookingStatus === BookingStatus.SETTLED
                ? "bg-emerald-50 text-emerald-500 border-emerald-400"
                : item?.bookingStatus === BookingStatus.AUTO_SETTLED
                ? "bg-emerald-50 text-emerald-500 border-emerald-400"
                : item?.bookingStatus === BookingStatus.CANCELLED
                ? "bg-red-50 text-red-500 border-red-400"
                : item?.bookingStatus === BookingStatus.DISPUTED
                ? "bg-orange-50 text-orange-500 border-orange-400"
                : "bg-gray-50 text-gray-500 border-gray-400"
            }`}
          >
            {item?.bookingStatus === BookingStatus.COMPLETED_BY_PROVIDER 
              ? "provider done" 
              : item?.bookingStatus?.replace(/_/g, " ") || "-"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const item = row.original as any;

      return (
        <div className="flex items-center justify-center gap-1.5">
          <BookingDetailsModal bookingId={item?.id || item?._id} />
          {item?.paymentId && (
            <Link
              href={`${config.baseURL}/payment/download-invoice/${item?.paymentId}`}
              target="_blank"
            >
              <Button variant={"ghost"} size={"icon"} className="text-primary hover:text-primary/80">
                <Download className="w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      );
    },
  },
];

export default recentBookingColumns;
