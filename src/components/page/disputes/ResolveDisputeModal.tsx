"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Handshake, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modals/Modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const resolveSchema = z.object({
  type: z.enum(['refund', 'partial_refund', 'release_payment', 'rejected']),
  amount: z.string().optional().refine((val) => {
    // Basic number validation if provided
    if (!val) return true;
    return !isNaN(Number(val)) && Number(val) >= 0;
  }, "Must be a valid amount"),
  note: z.string().min(1, "Note is required for resolution"),
}).refine((data) => {
  if (data.type === 'partial_refund' && (!data.amount || Number(data.amount) <= 0)) {
    return false;
  }
  return true;
}, {
  message: "Amount is required for partial refund",
  path: ["amount"],
});

type ResolveFormValues = z.infer<typeof resolveSchema>;

export default function ResolveDisputeModal({ disputeId }: { disputeId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ResolveFormValues>({
    resolver: zodResolver(resolveSchema),
    defaultValues: {
      type: undefined,
      amount: "",
      note: "",
    },
  });

  const selectedType = form.watch("type");

  const onSubmit = async (values: ResolveFormValues) => {
    try {
      setLoading(true);
      
      const payload = {
        type: values.type,
        note: values.note,
        ...(values.type === "partial_refund" && values.amount && { amount: Number(values.amount) }),
      };

      const res = await myFetch(`/dispute/${disputeId}/resolve`, {
        method: "PATCH",
        body: payload,
      });

      if (res.success) {
        toast.success("Dispute resolved successfully");
        setOpen(false);
        form.reset();
        router.refresh(); // Refresh the server-side data
      } else {
        toast.error(res.message || "Failed to resolve dispute");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      dialogTitle="Resolve Dispute"
      className="max-w-md w-full"
      dialogTrigger={
        <Button variant={"outline"} size={"sm"} className="text-primary border-primary flex items-center gap-1.5 font-black uppercase text-[10px] tracking-widest hover:bg-primary/5 shadow-sm active:scale-95 transition-all">
          <Handshake className="w-3.5 h-3.5" /> Resolve
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          
          {/* Resolution Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-black uppercase tracking-widest text-gray-400">Resolution Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-xl border-gray-200 h-10">
                      <SelectValue placeholder="Select outcome" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="refund">Full Refund to Client</SelectItem>
                    <SelectItem value="partial_refund">Partial Refund</SelectItem>
                    <SelectItem value="release_payment">Release Payment to Provider</SelectItem>
                    <SelectItem value="rejected">Reject Dispute (No Action)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          {/* Amount (Conditional) */}
          {selectedType === "partial_refund" && (
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Amount (R) {selectedType === 'partial_refund' && <span className="text-red-500">*</span>}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. 50" 
                      {...field} 
                      className="rounded-xl border-gray-200 h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
          )}

          {/* Note */}
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-black uppercase tracking-widest text-gray-400">Resolution Note</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Provide details for this resolution decision..." 
                    className="min-h-[100px] rounded-xl border-gray-200"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-2">
            <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setOpen(false)} 
                className="flex-1 rounded-xl font-bold text-gray-400 hover:text-gray-600"
            >
                Cancel
            </Button>
            <Button 
                type="submit" 
                disabled={loading} 
                className="flex-[2] rounded-xl h-11 font-black uppercase tracking-widest shadow-lg shadow-primary/20"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm & Resolve"}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
