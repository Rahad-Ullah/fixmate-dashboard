"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, User, Home, Calendar, Info, Scale, MapPin, Mail, Phone, ExternalLink, Receipt } from "lucide-react";
import { myFetch } from "@/utils/myFetch";
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/modals/Modal";
import { IMAGE_URL } from "@/config/env-config";
import CopyButton from "../../shared/CopyButton";

function DisputeDetailsContent({ disputeId }: { disputeId: string }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await myFetch(`/dispute/${disputeId}`);
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
  }, [disputeId]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
      ) : data ? (
        <div className="flex flex-col gap-8 py-4">
          
          {/* Top Summary & Status */}
          <div className="flex flex-wrap items-center justify-between bg-blue-50/50 p-6 rounded-3xl border border-blue-100 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-blue-500 font-black uppercase tracking-widest">Dispute Status</span>
                <Badge className={`w-fit px-6 py-1.5 text-sm font-black uppercase shadow-lg ${
                    data.status === 'resolved' ? 'bg-green-600' : 
                    data.status === 'in_review' ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                    {data.status}
                </Badge>
            </div>
            
            <div className="flex flex-col gap-1 sm:items-end">
              <span className="text-xs text-gray-400 font-bold uppercase">Raised By</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`capitalize font-black tracking-tighter ${
                    data.raisedBy === 'client' ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-orange-600 border-orange-200 bg-orange-50'
                }`}>
                    {data.raisedBy}
                </Badge>
                <span className="text-sm font-bold text-gray-700">{new Date(data.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Reason & Description */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3">
                <Info className="w-5 h-5 text-primary" />
                <h3 className="font-black text-lg text-gray-800 uppercase tracking-tight">Claim Details</h3>
            </div>
            <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-3">
                <h4 className="font-black text-xl text-gray-900 leading-none capitalize">{data.reason}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{data.description}</p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Profile */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 border-b pb-3">
                    <User className="w-5 h-5 text-blue-500" />
                    <h3 className="font-black text-lg text-gray-800 uppercase tracking-tight">Plaintiff</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border-2 border-white shadow-md flex-shrink-0">
                            {data.user?.image ? (
                                <img src={data.user.image.startsWith('http') ? data.user.image : `${IMAGE_URL}${data.user.image}`} className="w-full h-full object-cover" alt="User" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <User className="w-8 h-8" />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <h4 className="font-black text-gray-900 leading-none">{data.user?.name}</h4>
                            <p className="text-xs text-gray-400 font-bold uppercase">{data.user?.role}</p>
                        </div>
                    </div>
                    <div className="space-y-2 pt-2">
                        <p className="text-sm text-gray-500 flex items-center gap-2"><Mail className="w-4 h-4" /> {data.user?.email}</p>
                        {data.user?.contact && <p className="text-sm text-gray-500 flex items-center gap-2"><Phone className="w-4 h-4" /> {data.user.contact}</p>}
                        {data.user?.address && (
                            <div className="flex items-start gap-2 pt-1 border-t mt-3">
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                <p className="text-xs text-gray-500">{data.user.address}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Booking Details */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 border-b pb-3">
                    <Home className="w-5 h-5 text-orange-500" />
                    <h3 className="font-black text-lg text-gray-800 uppercase tracking-tight">Booking Ref</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Booking ID</span>
                            <div className="flex items-center gap-1.5">
                                <span className="font-black text-lg text-gray-900">{data.bookingId?.customId}</span>
                                {data.bookingId?.customId && <CopyButton value={data.bookingId.customId} />}
                            </div>
                        </div>
                        <Badge variant="outline" className="h-fit uppercase text-[10px] font-black border-orange-100 text-orange-600 bg-orange-50">
                            {data.bookingId?.bookingStatus}
                        </Badge>
                    </div>
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 border flex-shrink-0">
                                <img src={`${IMAGE_URL}${data.bookingId?.service?.image}`} className="w-full h-full object-cover" alt="Service" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm font-black text-gray-900 leading-tight">{data.bookingId?.service?.category}</p>
                                <p className="text-xs text-gray-400">Total: R{data.bookingId?.service?.price}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-2 pt-2 border-t"><Calendar className="w-4 h-4" /> Service Date: {new Date(data.bookingId?.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-2 italic"><MapPin className="w-4 h-4" /> {data.bookingId?.address}</p>
                    </div>
                </div>
            </section>
          </div>

          {/* Evidence Gallery */}
          {data.evidence?.length > 0 && (
            <section className="space-y-4">
               <div className="flex items-center gap-3 border-b pb-3">
                    <Scale className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-black text-lg text-gray-800 uppercase tracking-tight">Evidence Gallery</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                    {data.evidence.map((img: string, idx: number) => (
                        <a 
                           key={idx}
                           href={`${IMAGE_URL}${img}`}
                           target="_blank"
                           rel="noreferrer"
                           className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-sm hover:ring-4 hover:ring-primary/20 transition-all group"
                        >
                            <img src={`${IMAGE_URL}${img}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={`Evidence ${idx + 1}`} />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                                <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </a>
                    ))}
                </div>
            </section>
          )}

          {/* Resolution Info */}
          {data.status === 'resolved' && data.resolution && (
            <section className="space-y-4">
                <div className="flex items-center gap-3 border-b pb-3">
                    <Receipt className="w-5 h-5 text-green-500" />
                    <h3 className="font-black text-lg text-gray-800 uppercase tracking-tight">Resolution Outcome</h3>
                </div>
                <div className="bg-green-50 p-8 rounded-[40px] border border-green-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-inner">
                    <div className="space-y-1">
                        <p className="text-xs font-black text-green-600 uppercase tracking-widest">Outcome Type</p>
                        <h4 className="font-black text-2xl text-green-900 capitalize leading-none">{data.resolution.type?.replace('_', ' ')}</h4>
                        <p className="text-sm text-green-700 font-medium italic pt-2">&quot;{data.resolution.note}&quot;</p>
                    </div>
                    {data.resolution.amount > 0 && (
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-green-200 flex flex-col items-center min-w-[140px]">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Amount Involved</span>
                            <span className="text-3xl font-black text-green-600">R{data.resolution.amount}</span>
                        </div>
                    )}
                </div>
            </section>
          )}
        </div>
      ) : (
        <div className="text-center p-10 text-gray-500">Failed to load dispute investigation data</div>
      )}
    </>
  );
}

export default function DisputeDetailsModal({ disputeId }: { disputeId: string }) {
  return (
    <Modal
      dialogTitle="Dispute Investigation"
      className="max-w-5xl max-h-[90vh] overflow-y-auto"
      dialogTrigger={
        <Button variant={"ghost"} size={"icon"} className="text-primary hover:text-primary transition-colors">
          <Eye className="w-5 h-5 text-blue-500" />
        </Button>
      }
    >
      <DisputeDetailsContent disputeId={disputeId} />
    </Modal>
  );
}
