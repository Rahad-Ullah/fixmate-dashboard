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

// table column definition
const bookingTableColumns: ColumnDef<IUser>[] = [
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
      return <p className="px-2">{item?.customId || item?._id}</p>;
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
  //   {
  //     accessorKey: "category",
  //     header: () => <div>Category</div>,
  //     cell: ({ row }) => {
  //       const item = row.original as any;
  //       return <p className="px-2">{item?.category || "-"}</p>;
  //     },
  //   },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">R{item?.service?.price}</p>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div>Payment Status</div>,
    cell: ({ row }) => {
      const item = row.original as any;
      return (
        <Badge
          variant="outline"
          className={`capitalize font-medium shadow-none rounded-full py-1.5 w-[100px] flex justify-center ${
            item?.isPaid === false
              ? "bg-blue-50 text-blue-500 border-blue-400"
              : item?.isPaid === true
              ? "bg-green-50 text-green-500 border-green-400"
              : "bg-purple-50 text-purple-500 border-purple-400"
          }`}
        >
          {item?.isPaid ? "PAID" : "UNPAID"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Service Date",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">{item?.date?.split("T")[0]}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Booking Date",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">{item?.createdAt?.split("T")[0]}</p>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Order Status</div>,
    cell: ({ row }) => {
      const item = row.original as any;
      return (
        <Badge
          variant="outline"
          className={`capitalize font-medium shadow-none rounded-full py-1.5 w-[100px] flex justify-center ${
            item?.bookingStatus === BookingStatus.REQUESTED
              ? "bg-blue-50 text-blue-500 border-blue-400"
              : item?.bookingStatus === BookingStatus.ACCEPTED
              ? "bg-yellow-50 text-yellow-500 border-yellow-400"
              : item?.bookingStatus === BookingStatus.IN_PROGRESS
              ? "bg-indigo-50 text-indigo-500 border-indigo-400"
              : item?.bookingStatus === BookingStatus.COMPLETED_BY_PROVIDER
              ? "bg-teal-50 text-teal-500 border-teal-400"
              : item?.bookingStatus === BookingStatus.CONFIRMED_BY_CLIENT
              ? "bg-green-50 text-green-500 border-green-400"
              : item?.bookingStatus === BookingStatus.SETTLED
              ? "bg-emerald-50 text-emerald-500 border-emerald-400"
              : item?.bookingStatus === BookingStatus.AUTO_SETTLED
              ? "bg-emerald-50 text-emerald-500 border-emerald-400"
              : item?.bookingStatus === BookingStatus.EXPIRED
              ? "bg-gray-50 text-gray-500 border-gray-400"
              : item?.bookingStatus === BookingStatus.CANCELLED
              ? "bg-red-50 text-red-500 border-red-400"
              : item?.bookingStatus === BookingStatus.DISPUTED
              ? "bg-orange-50 text-orange-500 border-orange-400"
              : item?.bookingStatus === BookingStatus.REFUNDED
              ? "bg-pink-50 text-pink-500 border-pink-400"
              : "bg-gray-50 text-gray-500 border-gray-400"
          }`}
        >
          {item?.bookingStatus || "-"}
        </Badge>
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
          <Link
            href={`${config.baseURL}/payment/download-invoice/${item?.paymentId}`}
          >
            <Button variant={"ghost"} size={"icon"} className="text-primary">
              <Download />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export default bookingTableColumns;
