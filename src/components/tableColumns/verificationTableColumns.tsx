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
      const item = row.original as IUser;
      return <p className="px-2">{item?._id}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.name}</p>;
    },
  },
  {
    accessorKey: "userId",
    header: "ID Number",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">#{item?.userId}</p>;
    },
  },
  // {
  //   accessorKey: "email",
  //   header: "Email",
  //   cell: ({ row }) => {
  //     const item = row.original as IUser;
  //     return <p className="px-2">{item?.email}</p>;
  //   },
  // },
  {
    accessorKey: "phone",
    header: "Contact",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.contact}</p>;
    },
  },
  {
    accessorKey: "address",
    header: () => <div>Address</div>,
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.address}</p>;
    },
  },
  {
    accessorKey: "license",
    header: () => <div>License No</div>,
    cell: ({ row }) => {
      const item = row.original as IUser;
      console.log(item);
      return <p className="px-2">fkdf;jasdf</p>;
    },
  },
  {
    accessorKey: "category",
    header: () => <div>Category</div>,
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.category || "-"}</p>;
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
            item?.status === "Approved"
              ? "bg-green-50 text-green-600 border-green-400"
              : item?.status === "Pending"
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
      console.log(item);

      return (
        <div className="flex items-center justify-center gap-1.5">
          <Modal
            dialogTrigger={<Button size={"sm"}>View Details</Button>}
            dialogTitle=""
            className="max-w-[100vw] lg:max-w-[50vw] max-h-[90vh] overflow-y-scroll p-10 bg-secondary-foreground"
          >
            <VerificationDetails />
          </Modal>
        </div>
      );
    },
  },
];

export default verificationColumns;
