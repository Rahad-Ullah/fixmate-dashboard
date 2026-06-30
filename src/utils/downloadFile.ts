"use client";

import { getCookie } from "cookies-next/client";
import toast from "react-hot-toast";
import { config } from "@/config/env-config";

export async function downloadFile(
  path: string,
  filename: string,
  ids: string[]
) {
  try {
    const token = getCookie("accessToken");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingIds: ids,
        }),
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
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    alert("Failed to download file. Please try again.");
  }
}

export async function downloadInvoice(paymentId: string) {
  const toastId = toast.loading("Downloading invoice...");
  try {
    const token = getCookie("accessToken");

    const response = await fetch(
      `${config.baseURL}/payment/download-invoice/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to download invoice";
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errData = await response.json();
          errorMessage = errData.message || errorMessage;
        }
      } catch {
        // ignore JSON parse error
      }
      throw new Error(errorMessage);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const contentDisposition = response.headers.get("content-disposition");
    let filename = `invoice_${paymentId}.pdf`;
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
    toast.success("Invoice downloaded successfully", { id: toastId });
  } catch (error) {
    console.error("Download error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to download invoice. Please try again.";
    toast.error(errorMessage, { id: toastId });
  }
}

