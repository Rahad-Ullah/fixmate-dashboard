"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, User, Calendar, Info, ShieldAlert, Receipt, CircleDollarSign, CheckCircle2 } from "lucide-react";
import { myFetch } from "@/utils/myFetch";
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/modals/Modal";
import { IMAGE_URL } from "@/config/env-config";

function PenaltyDetailsContent({ penaltyId }: { penaltyId: string }) {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await myFetch(`/penalty/${penaltyId}`);
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
  }, [penaltyId]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
      ) : data ? (
        <div className="flex flex-col gap-6 py-4">
          
          {/* Top Summary Card */}
          <div className="flex flex-wrap items-center justify-between bg-red-50/50 p-6 rounded-2xl border border-red-100 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-red-500 font-bold uppercase tracking-wider">Penalty ID</span>
              <span className="text-xl font-black text-gray-800">{data.customId}</span>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1 items-end">
                    <span className="text-xs text-gray-400 font-bold uppercase">Issued Date</span>
                    <span className="font-bold text-gray-700">{data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="w-px h-10 bg-red-100" />
                <div className="flex flex-col gap-1 items-end">
                    <span className="text-xs text-gray-400 font-bold uppercase">Status</span>
                    <Badge className={`${data.status === 'COMPLETED' ? 'bg-green-500' : 'bg-yellow-500'} text-white shadow-none px-4`}>
                        {data.status}
                    </Badge>
                </div>
            </div>
          </div>

          {/* Reason Alert */}
          <div className="flex items-start gap-4 p-5 bg-white border-2 border-dashed border-red-200 rounded-2xl shadow-sm">
             <Info className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
             <div className="flex flex-col gap-1">
                <h4 className="font-bold text-gray-900 leading-tight">Reason for Penalty</h4>
                <p className="text-gray-600 text-sm italic">&quot;{data.reason}&quot;</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Penalized User Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800">
                <User className="w-5 h-5 text-primary" /> Penalized User
              </h3>
              <div className="flex items-center gap-4 pt-2">
                 <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 ring-4 ring-white shadow-md flex-shrink-0">
                    {data.user?.image ? (
                        <img 
                           src={data.user.image.startsWith('http') ? data.user.image : `${IMAGE_URL}${data.user.image}`} 
                           alt="User" 
                           className="w-full h-full object-cover" 
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                            <User className="w-8 h-8" />
                        </div>
                    )}
                 </div>
                 <div className="flex flex-col gap-1">
                    <h4 className="font-black text-gray-900">{data.user?.name}</h4>
                    <p className="text-sm text-gray-500">{data.user?.email}</p>
                    <Badge variant="outline" className="w-fit text-[10px] font-black uppercase py-0 px-2 mt-1">
                        {data.user?.role}
                    </Badge>
                 </div>
              </div>
            </div>

            {/* Related Booking Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800">
                <ShieldAlert className="w-5 h-5 text-orange-500" /> Reference Booking
              </h3>
              <div className="flex flex-col gap-3 pt-2">
                 <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">Booking ID</span>
                    <span className="font-bold text-gray-800">{data.booking?.customId}</span>
                 </div>
                 <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">Service Category</span>
                    <span className="font-bold text-gray-800">{data.booking?.service?.category}</span>
                 </div>
                 <div className="flex items-center justify-between pt-1">
                    <span className="text-sm text-gray-500 font-medium italic">Booking Status:</span>
                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-orange-600 bg-orange-50 border-orange-100">
                        {data.booking?.bookingStatus}
                    </Badge>
                 </div>
              </div>
            </div>
          </div>

          {/* Financial Breakdown Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b pb-4">
              <Receipt className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-xl text-gray-800">Penalty Settlement</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gray-400">
                        <CircleDollarSign className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-widest">Total Penalty</span>
                    </div>
                    <span className="text-2xl font-black text-gray-800">R{data.amount}</span>
                </div>
                
                <div className="p-5 bg-green-50/50 rounded-2xl border border-transparent hover:border-green-100 transition-all flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-widest">Amount Paid</span>
                    </div>
                    <span className="text-2xl font-black text-green-700">R{data.taken}</span>
                </div>

                <div className={`${data.due > 0 ? 'bg-red-600' : 'bg-green-600'} p-5 rounded-2xl shadow-lg transition-all flex flex-col gap-2`}>
                    <div className="flex items-center gap-2 text-white/70">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-widest">Balance Due</span>
                    </div>
                    <span className="text-2xl font-black text-white">R{data.due}</span>
                </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-10 text-gray-500">Failed to load penalty details</div>
      )}
    </>
  );
}

export default function PenaltyDetailsModal({ penaltyId }: { penaltyId: string }) {
  return (
    <Modal
      dialogTitle="Penalty Details"
      className="max-w-4xl max-h-[90vh] overflow-y-auto"
      dialogTrigger={
        <Button variant={"ghost"} size={"icon"} className="text-primary hover:text-primary/80 transition-color">
          <Eye className="w-5 h-5 text-blue-500" />
        </Button>
      }
    >
      <PenaltyDetailsContent penaltyId={penaltyId} />
    </Modal>
  );
}
