"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, User, ShieldCheck, Mail, Phone, Calendar, Clock } from "lucide-react";
import { myFetch } from "@/utils/myFetch";
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/modals/Modal";
import { IMAGE_URL } from "@/config/env-config";
import Image from "next/image";
import CopyButton from "../../shared/CopyButton";

function TransactionDetailsContent({ transactionId }: { transactionId: string }) {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await myFetch(`/transactions/${transactionId}`);
        if (res.success && isMounted) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [transactionId]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
      ) : data ? (
        <div className="flex flex-col gap-8 py-4">
          
          {/* Header Info */}
          <div className="flex flex-wrap items-center justify-between bg-gray-50 p-6 rounded-2xl border border-gray-100 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Transaction ID</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-800">{data.customId}</span>
                <CopyButton value={data.customId} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Amount</span>
              <span className="text-2xl font-black text-blue-600">R{data.amount}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1 items-end mr-4">
                <span className="text-sm text-gray-500 font-medium">Status</span>
                <Badge 
                  variant="outline"
                  className={`shadow-none px-4 py-1 flex items-center gap-1.5 capitalize font-medium ${
                    data.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-400 hover:bg-green-50' : 
                    data.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-400 hover:bg-yellow-50' : 
                    'bg-red-50 text-red-700 border-red-400 hover:bg-red-50'
                  }`}
                >
                  {data.status?.toLowerCase()}
                </Badge>
              </div>
              <div className="w-px h-10 bg-gray-200 hidden sm:block" />
              <div className="flex flex-col gap-1 items-end ml-4">
                <span className="text-sm text-gray-500 font-medium">Type</span>
                <Badge variant="outline" className="text-gray-700 bg-white border-gray-200 uppercase tracking-wider text-[10px] font-black">
                  {data.type}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Profile Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800 border-b pb-3">
                <User className="w-5 h-5 text-blue-500" /> User Profile
              </h3>
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-white shadow-md">
                   {data.user?.image ? (
                     <Image 
                        src={data.user.image.startsWith('http') ? data.user.image : `${IMAGE_URL}${data.user.image}`}
                        alt="User"
                        fill
                        className="object-cover"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
                        <User className="w-10 h-10" />
                     </div>
                   )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-bold text-lg text-gray-900 leading-tight">{data.user?.name}</h4>
                  <Badge className="w-fit bg-gray-100 text-gray-600 hover:bg-gray-100 text-[10px] py-0 px-2 uppercase font-bold tracking-tighter">
                     {data.user?.role}
                  </Badge>
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" /> {data.user?.email}
                    </p>
                    {data.user?.contact && (
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5" /> {data.user.contact}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reference & Timing Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800 border-b pb-3">
                <ShieldCheck className="w-5 h-5 text-indigo-500" /> References
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-500">Booking Reference</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-800">{data.booking?.customId || "N/A"}</span>
                    {data.booking?.customId && <CopyButton value={data.booking.customId} />}
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-500">P2P Transaction ID</span>
                  <span className="font-mono text-xs font-bold text-gray-600 uppercase tracking-widest">{data.p2ptransactionId || "N/A"}</span>
                </div>
                <div className="flex items-center gap-8 pt-2">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                           <Calendar className="w-3 h-3" /> Created
                        </span>
                        <span className="text-sm font-medium text-gray-700">{data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                           <Clock className="w-3 h-3" /> Time
                        </span>
                        <span className="text-sm font-medium text-gray-700">{data.createdAt ? new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center p-10 text-gray-500">Failed to load transaction details</div>
      )}
    </>
  );
}

export default function TransactionDetailsModal({ transactionId }: { transactionId: string }) {
  return (
    <Modal
      dialogTitle="Transaction Details"
      className="max-w-4xl max-h-[90vh] overflow-y-auto"
      dialogTrigger={
        <Button variant={"ghost"} size={"icon"} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-color">
          <Eye className="w-5 h-5" />
        </Button>
      }
    >
      <TransactionDetailsContent transactionId={transactionId} />
    </Modal>
  );
}
