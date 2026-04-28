"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, User, MapPin, Mail, Phone, Clock, Sparkles, DollarSign, Tag } from "lucide-react";
import { myFetch } from "@/utils/myFetch";
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/modals/Modal";
import { IMAGE_URL } from "@/config/env-config";
import CopyButton from "../../shared/CopyButton";
import Image from "next/image";

function ServiceDetailsContent({ serviceId }: { serviceId: string }) {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await myFetch(`/services/${serviceId}`);
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
  }, [serviceId]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
      ) : data ? (
        <div className="flex flex-col gap-8 py-4">
          
          {/* Main Banner / Image Overlay */}
          <div className="relative h-64 w-full rounded-[32px] overflow-hidden group shadow-xl">
             <Image 
               src={`${IMAGE_URL}${data.image}`} 
               alt={data.category} 
               fill
               className="object-cover transition-transform duration-700 group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
             <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <Badge className="bg-primary/90 backdrop-blur-md text-white border-none px-4 py-1.5 shadow-lg">
                            {data.category}
                        </Badge>
                        <Badge variant="outline" className="bg-black/20 backdrop-blur-md text-white border-white/20 px-4 py-1.5 shadow-lg">
                            {data.subCategory}
                        </Badge>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight mt-1">{data.expertise.split('.')[0]}</h2>
                </div>
                <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-xl">
                        <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-white/60 leading-none">Price Rate</span>
                        <span className="text-2xl font-black text-white leading-none">R{data.price}</span>
                    </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Left Column: Expertise & Meta */}
             <div className="space-y-6">
                <section className="bg-gray-50/50 p-6 rounded-[32px] border border-gray-100 space-y-4">
                    <h3 className="font-black text-lg text-gray-800 flex items-center gap-2 uppercase tracking-tight pb-3 border-b">
                        <Sparkles className="w-5 h-5 text-primary" /> Service Expertise
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm italic">
                       &quot;{data.expertise}&quot;
                    </p>
                </section>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-white border border-gray-100 rounded-3xl shadow-sm flex flex-col gap-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Clock className="w-3 h-3" /> Registered
                        </span>
                        <span className="text-sm font-bold text-gray-700">{new Date(data.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="p-5 bg-white border border-gray-100 rounded-3xl shadow-sm flex flex-col gap-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Tag className="w-3 h-3" /> SVC Code
                        </span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-gray-700">{data.customId}</span>
                            <CopyButton value={data.customId} />
                        </div>
                    </div>
                </div>
             </div>

             {/* Right Column: Provider Information */}
             <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden flex flex-col gap-6">
                <div className="absolute top-0 right-0 p-8 pt-6">
                    <Badge variant="outline" className="text-[10px] font-black uppercase tracking-tighter text-primary bg-primary/5 border-primary/20">
                        Top Pro
                    </Badge>
                </div>
                <div className="flex items-center gap-5 pt-2">
                    <div className="w-20 h-20 rounded-3xl overflow-hidden bg-gray-50 border-4 border-white shadow-xl flex-shrink-0">
                        {data.creator?.image ? (
                            <Image src={data.creator.image.startsWith('http') ? data.creator.image : `${IMAGE_URL}${data.creator.image}`} width={80} height={80} className="w-full h-full object-cover" alt="Provider" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <User className="w-10 h-10" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-black text-2xl text-gray-900 leading-none">{data.creator?.name}</h4>
                        <div className="flex items-center gap-1.5 mt-1.5">
                            <p className="text-xs text-primary font-bold uppercase tracking-widest">{data.creator?.customId}</p>
                            {data.creator?.customId && <CopyButton value={data.creator.customId} className="p-0 h-fit w-fit hover:bg-transparent" />}
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-4 group">
                        <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                            <Mail className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Email Address</span>
                            <span className="text-sm font-bold text-gray-600 truncate max-w-[200px]">{data.creator?.email}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                            <Phone className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Control Number</span>
                            <span className="text-sm font-bold text-gray-600">{data.creator?.contact}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Business Location</span>
                            <span className="text-sm font-bold text-gray-600 line-clamp-2">{data.creator?.address}</span>
                        </div>
                    </div>
                </div>
                

             </section>
          </div>
        </div>
      ) : (
        <div className="text-center p-10 text-gray-500">Failed to load service investigation data</div>
      )}
    </>
  );
}

export default function ServiceDetailsModal({ serviceId }: { serviceId: string }) {
  return (
    <Modal
      dialogTitle="Service Analysis"
      className="max-w-5xl max-h-[90vh] overflow-y-auto"
      dialogTrigger={
        <Button variant={"ghost"} size={"icon"} className="text-primary hover:text-primary transition-colors">
          <Eye className="w-5 h-5 text-blue-500" />
        </Button>
      }
    >
      <ServiceDetailsContent serviceId={serviceId} />
    </Modal>
  );
}
