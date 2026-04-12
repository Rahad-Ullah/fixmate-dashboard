"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { IService } from "@/types/service";
import ServiceDetailsModal from "../page/services/ServiceDetailsModal";
import { Button } from "../ui/button";
import { Lock, Unlock, Loader2 } from "lucide-react";
import CopyButton from "../shared/CopyButton";
import { useState } from "react";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SuspensionToggle = ({ service }: { service: IService }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    try {
      setLoading(true);
      const res = await myFetch(`/services/suspend/${service._id}`, {
        method: "PATCH",
        body: { isSuspended: !service.isSuspended },
      });

      if (res.success) {
        toast.success(
          `Service ${service.isSuspended ? "unsuspended" : "suspended"} successfully`
        );
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update service status");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={`${
            service.isSuspended ? "text-green-500" : "text-amber-500"
          } hover:bg-gray-100 transition-colors`}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : service.isSuspended ? (
            <Unlock className="w-4 h-4" />
          ) : (
            <Lock className="w-4 h-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-black text-2xl">
            {service.isSuspended ? "Unsuspend Service?" : "Suspend Service?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 font-medium">
            This will {service.isSuspended ? "re-enable" : "temporarily disable"} this service. 
            Customers {service.isSuspended ? "will" : "will be unable to"} see this service in the marketplace.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 pt-4">
          <AlertDialogCancel className="rounded-xl font-bold text-gray-400 border-none hover:bg-gray-100">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleToggle}
            className={`${
              service.isSuspended ? "bg-green-600 hover:bg-green-700" : "bg-amber-600 hover:bg-amber-700"
            } rounded-xl font-black uppercase tracking-widest px-8 shadow-lg`}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// table column definition
const serviceTableColumns: ColumnDef<IService>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      return <p className="px-2">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "customId",
    header: "Service ID",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-1.5 font-black">
          <p className="px-2">{item?.customId}</p>
          <CopyButton value={item?.customId || ""} />
        </div>
      );
    },
  },
  {
    accessorKey: "creator",
    header: "Provider",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex flex-col">
            <p className="px-2 font-bold text-gray-800 leading-none">{item?.creator?.name || "N/A"}</p>
            <div className="px-2 flex items-center gap-1 mt-1">
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter leading-none">{item?.creator?.customId}</span>
              {item?.creator?.customId && <CopyButton value={item.creator.customId} className="p-0 h-fit w-fit hover:bg-transparent" />}
            </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex flex-col">
            <p className="px-2 font-medium">{item?.category}</p>
            <p className="px-2 text-xs text-gray-400">{item?.subCategory}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2 font-bold text-primary">R{item?.price}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="px-2 text-gray-500">{item?.createdAt?.split("T")[0]}</p>;
    },
  },
  {
    accessorKey: "isSuspended",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Badge
          variant="outline"
          className={`capitalize font-black shadow-none rounded-full py-1 w-[110px] flex justify-center border-2 border-dashed ${
            !item?.isSuspended
              ? "bg-green-50 text-green-600 border-green-200"
              : "bg-amber-50 text-amber-600 border-amber-200"
          }`}
        >
          {item?.isSuspended ? "SUSPENDED" : "ACTIVE"}
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
        <div className="flex items-center justify-center gap-1">
          <ServiceDetailsModal serviceId={item?._id} />
          <SuspensionToggle service={item} />
        </div>
      );
    },
  },
];

export default serviceTableColumns;
