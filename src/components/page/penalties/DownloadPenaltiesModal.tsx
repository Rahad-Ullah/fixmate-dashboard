"use client";

import { useState } from "react";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { getCookie } from "cookies-next/client";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DownloadPenaltiesModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<string>("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [format, setFormat] = useState<string>("csv"); // csv or excel

  const penaltyTypes = ['PROVIDER', 'CLIENT'];

  const resetFilters = () => {
    setType("ALL");
    setStartDate("");
    setEndDate("");
    setFormat("csv");
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      const token = getCookie("accessToken");

      // Construct query parameters
      const params = new URLSearchParams();
      params.append("format", format);
      
      if (type !== "ALL") {
        params.append("type", type);
      }
      
      if (startDate) {
        params.append("startDate", startDate);
      }
      
      if (endDate) {
        params.append("endDate", endDate);
      }

      const queryString = params.toString();
      const path = `/api/v1/penalty/download?${queryString}`;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Server returned:", response.status, response.statusText);
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      const extension = format === "excel" ? "xlsx" : "csv";
      link.download = `penalties_export_${new Date().getTime()}.${extension}`;
      link.click();

      URL.revokeObjectURL(url);
      toast.success(`Penalties downloaded as ${format.toUpperCase()}`);
      
      // Auto close and reset
      setOpen(false);
      resetFilters();
      
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      dialogTitle="Download Penalties Data"
      className="max-w-md w-full"
      dialogTrigger={
        <Button className="flex items-center gap-2 shadow-sm font-bold h-11">
          Download
          <Download className="w-4 h-4" />
        </Button>
      }
    >
      <div className="flex flex-col gap-6 py-4">
        
        {/* Date Range Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-xs font-black uppercase text-gray-400">Start Date</Label>
            <Input 
              id="start-date" 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              className="rounded-xl border-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date" className="text-xs font-black uppercase text-gray-400">End Date</Label>
            <Input 
              id="end-date" 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              className="rounded-xl border-gray-200"
            />
          </div>
        </div>

        {/* Type Select */}
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase text-gray-400">Penalty Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="rounded-xl border-gray-200 h-11">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ALL">All Types</SelectItem>
              {penaltyTypes.map((item) => (
                <SelectItem key={item} value={item}>
                  {capitalizeSentence(item.toLowerCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Format Select */}
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase text-gray-400">Output Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="rounded-xl border-gray-200 h-11">
              <SelectValue placeholder="Select Format" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="csv">CSV (Spreadsheet)</SelectItem>
              <SelectItem value="excel">Excel (.xlsx)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t mt-2">
          <Button onClick={handleDownload} disabled={loading} className="w-full flex items-center justify-center gap-3 h-12 rounded-xl text-base font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            {loading ? "Generating Report..." : "Start Download"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
