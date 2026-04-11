"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, User, Wrench, ShieldAlert, Receipt } from "lucide-react";
import { myFetch } from "@/utils/myFetch";
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/modals/Modal";

function PaymentDetailsContent({ paymentId }: { paymentId: string }) {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await myFetch(`/payment/history/${paymentId}`);
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
  }, [paymentId]);

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
              <span className="text-sm text-gray-500 font-medium">Payment ID</span>
              <span className="text-lg font-bold text-gray-800">{data.customId || "N/A"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Date & Time</span>
              <span className="font-semibold text-gray-800">{data.dateAndTime ? new Date(data.dateAndTime).toLocaleString() : "N/A"}</span>
            </div>
            <div className="flex flex-col gap-1 items-start sm:items-end">
              <span className="text-sm text-gray-500 font-medium">Status</span>
              <Badge className="bg-primary text-white shadow-none px-4 py-1">{data.paymentStatus}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                <User className="w-5 h-5 text-blue-500" /> Customer
              </h3>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-gray-800">{data.customer?.name}</h4>
                <p className="text-sm text-gray-500">{data.customer?.email}</p>
                <p className="text-sm text-gray-600">{data.customer?.address}</p>
              </div>
            </div>

            {/* Provider Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                <Wrench className="w-5 h-5 text-orange-500" /> Provider
              </h3>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-gray-800">{data.provider?.name}</h4>
                <p className="text-sm text-gray-500">{data.provider?.email}</p>
                <p className="text-sm text-gray-600">{data.provider?.address}</p>
              </div>
            </div>
          </div>

          {/* Service & Financials */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b pb-4">
              <Receipt className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-xl text-gray-800">Financial Breakdown</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                    <p className="text-sm text-gray-500">Service Category</p>
                    <p className="font-bold text-gray-800">{data.service?.category} - {data.service?.subCategory}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                    <p className="text-sm text-gray-500">Service Base Price</p>
                    <p className="font-bold text-gray-800 text-lg">R{data.service?.price}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl space-y-1 border border-blue-100">
                    <p className="text-sm text-blue-600 font-medium">Platform Total</p>
                    <p className="font-bold text-blue-800 text-xl">R{data.servicePrice}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">VAT (0%)</span>
                    <span className="font-semibold text-gray-700">R{data.vat}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Platform Fee</span>
                    <span className="font-semibold text-gray-700">R{data.platformFee}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Gateway Fee</span>
                    <span className="font-semibold text-gray-700">R{data.paystackGatewayFee}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider text-green-600">Provider Pay</span>
                    <span className="font-bold text-green-700">R{data.providerPay}</span>
                </div>
            </div>

            {data.refundAmount > 0 && (
                <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
                    <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-bold">Refunded Amount</p>
                        <p className="text-lg font-black">R{data.refundAmount}</p>
                    </div>
                </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center p-10 text-gray-500">Failed to load payment history</div>
      )}
    </>
  );
}

export default function PaymentDetailsModal({ paymentId }: { paymentId: string }) {
  return (
    <Modal
      dialogTitle="Payment Details"
      className="max-w-4xl max-h-[85vh] overflow-y-auto"
      dialogTrigger={
        <Button variant={"ghost"} size={"icon"} className="text-primary text-blue-500 hover:text-blue-600">
          <Eye className="w-5 h-5" />
        </Button>
      }
    >
      <PaymentDetailsContent paymentId={paymentId} />
    </Modal>
  );
}
