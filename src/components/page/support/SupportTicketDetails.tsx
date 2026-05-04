"use client";

import React from "react";
import { ISupportTicket } from "@/types/support";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IMAGE_URL } from "@/config/env-config";
import Link from "next/link";
import { Calendar, Mail, Phone, User, FileText, CheckCircle } from "lucide-react";

interface SupportTicketDetailsProps {
  item: ISupportTicket;
  onResolve: (id: string) => void;
}

const SupportTicketDetails: React.FC<SupportTicketDetailsProps> = ({ item, onResolve }) => {
  return (
    <div className="p-2 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-800">{item.title}</h2>
          <div className="flex items-center gap-2 mt-1 text-stone-500 text-sm">
            <Calendar size={14} />
            <span>Submitted on {new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`capitalize font-semibold px-3 py-1 text-sm rounded-full ${
            item.status === "PENDING"
              ? "bg-blue-50 text-blue-600 border-blue-200"
              : "bg-green-50 text-green-600 border-green-200"
          }`}
        >
          {item.status}
        </Badge>
      </div>

      {/* User Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
          <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
            <User size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-stone-400">User Name</p>
            <p className="text-sm font-semibold text-stone-700">{item.user?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
          <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
            <Mail size={18} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] uppercase font-bold text-stone-400">Email Address</p>
            <p className="text-sm font-semibold text-stone-700 truncate">{item.user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
          <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
            <Phone size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-stone-400">Contact No</p>
            <p className="text-sm font-semibold text-stone-700">{item.user?.contact}</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-stone-800 font-bold">
          <FileText size={18} className="text-primary" />
          <h3>Description</h3>
        </div>
        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 min-h-[120px]">
          <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">
            {item.description}
          </p>
        </div>
      </div>

      {/* Attachment Section */}
      {item.attachment && (
        <div className="space-y-3">
          <h3 className="text-stone-800 font-bold">Attachment</h3>
          <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="p-3 bg-white rounded-xl shadow-sm">
                <FileText className="text-primary" size={24} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-stone-700 truncate">{item.attachment}</p>
              <Link
                href={`${IMAGE_URL}${item.attachment}`}
                target="_blank"
                className="text-primary text-xs font-bold hover:underline mt-1 inline-block"
              >
                View / Download Attachment
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      {item.status === "PENDING" && (
        <div className="pt-4 border-t flex justify-end">
          <Button
            onClick={() => onResolve(item._id)}
            className="flex items-center gap-2 px-6 h-11 rounded-full font-bold transition-all hover:scale-[1.02]"
          >
            <CheckCircle size={18} />
            Mark as Resolved
          </Button>
        </div>
      )}
    </div>
  );
};

export default SupportTicketDetails;
