"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { BookingStatus } from "@/constants/booking";

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
    accessorKey: "category",
    header: () => <div>Category</div>,
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">{item?.category || "-"}</p>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">${item?.service?.price}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">{item?.date?.split("T")[0]}</p>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original as any;
      return (
        <Badge
          className={`capitalize font-medium text-white shadow-none rounded-full py-1.5 w-[100px] flex justify-center ${
            item?.bookingStatus === BookingStatus.PENDING
              ? "bg-blue-50 text-blue-500 border-blue-400"
              : item?.bookingStatus === BookingStatus.CANCELLED
              ? "bg-purple-50 text-purple-500 border-purple-400"
              : item?.bookingStatus === BookingStatus.REJECTED
              ? "bg-red-50 text-red-500 border-red-400"
              : item?.bookingStatus === BookingStatus.COMPLETED
              ? "bg-green-50 text-green-500 border-green-400"
              : ""
          }`}
        >
          {item?.bookingStatus}
        </Badge>
      );
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   header: () => <div className="px-8 text-center">Action</div>,
  //   cell: ({ row }) => {
  //     const item = row.original;

  //     return (
  //       <div className="flex items-center justify-center gap-1.5">
  //         <Modal
  //           dialogTrigger={
  //             <Button variant={"ghost"} size={"icon"} className="text-primary">
  //               <Eye />
  //             </Button>
  //           }
  //           dialogTitle=""
  //           className="max-w-[100vw] lg:max-w-[50vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-10 bg-secondary-foreground"
  //         >
  //           <UserDetails id={item?._id} />
  //         </Modal>
  //       </div>
  //     );
  //   },
  // },
];

export default bookingTableColumns;
