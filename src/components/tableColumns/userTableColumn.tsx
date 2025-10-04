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
      return <p className="px-2">{row.index + 1}</p>;
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.email}</p>;
    },
  },
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
    accessorKey: "role",
    header: () => <div>Role</div>,
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <p className="px-2 capitalize">{item?.role?.toLocaleLowerCase()}</p>
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
            dialogTitle=""
            className="max-w-[100vw] lg:max-w-[50vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-10 bg-secondary-foreground"
          >
            <UserDetails id={item?._id} />
          </Modal>

          {!item.isBlocked && (
            <DeleteModal
              triggerBtn={
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-zinc-400"
                >
                  <LockOpen />
                </Button>
              }
              title="Are you sure to block this user?"
              description="You can unblock this user later."
              itemId={item?._id}
              action={handleDelete}
            />
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
            title="Are you sure to delete this user?"
            itemId={item?._id}
            action={handleDelete}
          />
        </div>
      );
    },
  },
];

export default columns;
