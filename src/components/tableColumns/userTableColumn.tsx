"use client";

import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Lock, LockOpen, Trash } from "lucide-react";
import DeleteModal from "../modals/DeleteModal";
import Modal from "../modals/Modal";
import UserDetails from "../page/users/userDetails/UserDetails";

// handle delete
const handleDelete = async () => {
  // perform api here...
};

// table column definition
const columns: ColumnDef<IUser>[] = [
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
      return (
        <p className="px-2">
          {item?.firstName} {item?.lastName}
        </p>
      );
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
      return <p className="px-2">{item?.phone}</p>;
    },
  },
  {
    accessorKey: "location",
    header: () => <div>Location</div>,
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.location}</p>;
    },
  },
  {
    accessorKey: "role",
    header: () => <div>Role</div>,
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <p className="px-2">{item?.role}</p>
        // <Badge
        //   className={`capitalize font-medium text-white shadow-none rounded-full py-1.5 w-full flex justify-center ${
        //     item?.role === "Admin"
        //       ? "bg-purple-50 text-purple-500 border-purple-400"
        //       : item?.role === "User"
        //       ? "bg-orange-50 text-orange-500 border-orange-400"
        //       : ""
        //   }`}
        // >
        //   {item?.role}
        // </Badge>
      );
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
    id: "actions",
    enableHiding: false,
    header: () => <div className="px-8 text-center">Action</div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center justify-center gap-1.5">
          <Modal
            dialogTrigger={
              <Button variant={"ghost"} size={"icon"} className="text-primary">
                <Eye />
              </Button>
            }
            dialogTitle="User Details"
            className="max-w-[100vw] lg:max-w-lg"
          >
            <UserDetails />
          </Modal>

          {!item.isBlocked && (
            <Button variant={"ghost"} size={"icon"} className="text-zinc-400">
              <LockOpen />
            </Button>
          )}
          {item.isBlocked && (
            <Button variant={"ghost"} size={"icon"} className="text-red-500">
              <Lock />
            </Button>
          )}
          <DeleteModal
            triggerBtn={
              <Button variant={"ghost"} size={"icon"} className="text-red-500">
                <Trash />
              </Button>
            }
            itemId={item?._id}
            action={handleDelete}
          />
        </div>
      );
    },
  },
];

export default columns;
