"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ISupportTicket } from "@/types/support";
import Modal from "../modals/Modal";

// table column definition
const supportTableColumns: ColumnDef<ISupportTicket>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return <p>#{item._id}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return (
        <p>
          {item?.firstName} {item?.lastName}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return <p>{item?.email}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone No.",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return <p>{item?.phone}</p>;
    },
  },
  {
    accessorKey: "subject",
    header: "Issue Title",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return <p>{item.subject}</p>;
    },
  },
  // {
  //   accessorKey: "priority",
  //   header: () => <div>Priority</div>,
  //   cell: ({ row }) => {
  //     const item = row.original as ISupportTicket;
  //     return (
  //       <Badge
  //         className={`capitalize font-medium shadow-none rounded-full py-1.5 w-full flex justify-center ${
  //           item?.priority === "Low"
  //             ? "bg-emerald-50 text-emerald-600 border-emerald-400"
  //             : item?.priority === "Medium"
  //             ? "bg-blue-50 text-blue-600 border-blue-400"
  //             : item?.priority === "High"
  //             ? "bg-purple-50 text-purple-600 border-purple-400"
  //             : item?.priority === "Urgent"
  //             ? "bg-red-50 text-red-600 border-red-400"
  //             : ""
  //         }`}
  //       >
  //         {item?.priority}
  //       </Badge>
  //     );
  //   },
  // },
  {
    accessorKey: "createdAt",
    header: () => <div>Issue Date</div>,
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return <p>{item?.createdAt}</p>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return (
        <Badge
          variant="outline"
          className={`capitalize font-medium shadow-none rounded py-1 ${
            item?.status === "Resolved"
              ? "bg-green-50 text-green-600 border-green-400"
              : "bg-blue-50 text-blue-500 border-blue-400"
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
      const item = row?.original as ISupportTicket;
      return (
        <div className="flex items-center justify-evenly gap-1">
          <Modal
            dialogTrigger={<Button size={"sm"}>View Details</Button>}
            className="max-w-[100vw] lg:max-w-lg"
          >
            <div className="text-stone-600 grid gap-2">
              <h1 className="text-xl font-semibold">{item?.subject}</h1>
              <h2 className="font-medium">
                <strong>User:</strong> {item?.firstName} {item?.lastName}
              </h2>
              <p className="font-medium">
                <strong>Message:</strong> <br /> {item?.message}
              </p>
              {item?.status === "Pending" && (
                <div className="flex items-center gap-4 justify-end mt-2">
                  <Button className="rounded-md">Mark as resolved</Button>
                </div>
              )}
            </div>
          </Modal>
        </div>
      );
    },
  },
];

export default supportTableColumns;
