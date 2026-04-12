"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, MapPin, Phone, User, Wrench, Calendar, Banknote } from "lucide-react";
import { myFetch } from "@/utils/myFetch";
import { Badge } from "@/components/ui/badge";
import { IMAGE_URL } from "@/config/env-config";
import Modal from "@/components/modals/Modal";
import Image from "next/image";
import CopyButton from "../../shared/CopyButton";

function BookingDetailsContent({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await myFetch(`/bookings/${bookingId}`);
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
  }, [bookingId]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
      ) : data ? (
        <div className="flex flex-col gap-8 py-4">
          
          {/* Top Status & Info Bar */}
          <div className="flex flex-wrap items-center justify-between bg-blue-50/50 p-4 rounded-xl border border-blue-100 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Booking ID</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-800">{data.customId || data._id}</span>
                <CopyButton value={data.customId || data._id} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Booking Date</span>
              <span className="font-semibold text-gray-800">{data.createdAt ? new Date(data.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}</span>
            </div>
            <div className="flex flex-col gap-1 items-start sm:items-end">
              <span className="text-sm text-gray-500 font-medium">Status</span>
              <Badge className="bg-primary text-white shadow-none px-4 py-1">{data.bookingStatus}</Badge>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Customer Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                <User className="w-5 h-5 text-blue-500" /> Customer Information
              </h3>
              <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                {data.customer?.image ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image 
                      src={data.customer?.image?.startsWith('http') ? data.customer.image : `${IMAGE_URL}${data.customer.image}`} 
                      alt="Customer"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full" 
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-blue-500" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">{data.customer?.name || "N/A"}</h4>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-sm text-gray-600 mt-2">
                <span className="flex items-center gap-3"><Phone className="w-4 h-4 text-gray-400" /> {data.customer?.contact || "N/A"} (Contact)</span>
                <span className="flex items-center gap-3"><Phone className="w-4 h-4 text-green-500" /> {data.customer?.whatsApp || "N/A"} (WhatsApp)</span>
                <span className="flex items-start gap-3"><MapPin className="w-4 h-4 text-gray-400 mt-1" /> {data.customer?.address || "N/A"}</span>
              </div>
            </div>

            {/* Provider Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                <Wrench className="w-5 h-5 text-orange-500" /> Provider Information
              </h3>
              <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                {data.provider?.image ? (
                  <div className="w-16 h-16 rounded-full flex-shrink-0 bg-gray-100 overflow-hidden">
                    <Image 
                      src={data.provider?.image?.startsWith('http') ? data.provider.image : `${IMAGE_URL}${data.provider.image}`} 
                      alt="Provider"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full" 
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-orange-500" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">{data.provider?.name || "N/A"}</h4>
                  <p className="text-orange-500 text-sm font-medium">{data.provider?.providerDetails?.category || "Provider"}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-sm text-gray-600 mt-2">
                <span className="flex items-center gap-3"><Phone className="w-4 h-4 text-gray-400" /> {data.provider?.contact || "N/A"} (Contact)</span>
                <span className="flex items-center gap-3"><Phone className="w-4 h-4 text-green-500" /> {data.provider?.whatsApp || "N/A"} (WhatsApp)</span>
                <span className="flex items-start gap-3"><MapPin className="w-4 h-4 text-gray-400 mt-1" /> {data.provider?.address || "N/A"}</span>
              </div>
            </div>

            {/* Service & Schedule */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 md:col-span-2">
              <h3 className="font-semibold text-lg text-gray-800 border-b pb-3 mb-2">Service & Schedule Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Service Info */}
                <div className="flex gap-4 items-start">
                  {data.service?.image ? (
                    <div className="w-24 h-24 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden shadow-sm">
                      <Image 
                        src={data.service?.image?.startsWith('http') ? data.service.image : `${IMAGE_URL}${data.service.image}`} 
                        alt="Service"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full" 
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-2">
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-md w-max font-semibold uppercase">{data.service?.category}</span>
                    <h4 className="font-bold text-gray-800 text-lg">{data.service?.subCategory || "Custom Service"}</h4>
                  </div>
                </div>

                {/* Schedule Info */}
                <div className="flex flex-col justify-center gap-4 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-600 font-medium">
                      <Calendar className="w-5 h-5 text-gray-400" /> Service Date
                    </span>
                    <span className="font-semibold text-gray-800">{data.date ? new Date(data.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="flex items-center gap-2 text-gray-600 font-medium">
                      <Banknote className="w-5 h-5 text-gray-400" /> Service Price
                    </span>
                    <span className="font-bold text-gray-800 text-lg">R{data.service?.price || 0}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 mt-4">
                <h5 className="font-semibold text-yellow-800 text-sm mb-1">Service Address</h5>
                <p className="text-gray-700">{data.address || "No address provided"}</p>
              </div>

              {data.specialNote && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mt-2">
                  <h5 className="font-semibold text-gray-800 text-sm mb-1">Special Note</h5>
                  <p className="text-gray-600 italic">&quot;{data.specialNote}&quot;</p>
                </div>
              )}
            </div>

          </div>
        </div>
      ) : (
        <div className="text-center p-10 text-gray-500">Failed to load booking data</div>
      )}
    </>
  );
}

export default function BookingDetailsModal({ bookingId }: { bookingId: string }) {
  return (
    <Modal
      dialogTitle="Booking Details"
      className="max-w-4xl max-h-[85vh] overflow-y-auto"
      dialogTrigger={
        <Button variant={"ghost"} size={"icon"} className="text-primary text-blue-500 hover:text-blue-600">
          <Eye className="w-5 h-5" />
        </Button>
      }
    >
      <BookingDetailsContent bookingId={bookingId} />
    </Modal>
  );
}
