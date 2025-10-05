/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import Modal from "../modals/Modal";
import { Badge } from "../ui/badge";
import VerificationDetails from "../page/verification/VerificationDetails";

// table column definition
const verificationColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      return <p className="px-2">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">{item?.user?.name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2 lowercase">{item?.user?.email}</p>;
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">{item?.user?.contact}</p>;
    },
  },
  {
    accessorKey: "address",
    header: () => <div>Address</div>,
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">{item?.user?.address}</p>;
    },
  },
  {
    accessorKey: "NID",
    header: () => <div>National ID</div>,
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">{item?.user?.nationalId}</p>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <Badge
          variant="outline"
          className={`capitalize font-medium shadow-none rounded py-1 ${
            item?.status === "APPROVED"
              ? "bg-green-50 text-green-600 border-green-400"
              : item?.status === "PENDING"
              ? "bg-blue-50 text-blue-500 border-blue-400"
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
    header: () => <div className="px-8 text-center">Action</div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center justify-center gap-1.5">
          <Modal
            dialogTrigger={<Button size={"sm"}>View Details</Button>}
            dialogTitle=""
            className="max-w-[100vw] lg:max-w-[50vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-10 bg-secondary-foreground"
          >
            <VerificationDetails id={item?._id} />
          </Modal>
        </div>
      );
    },
  },
];

export default verificationColumns;
