"use client";

import { getCookie } from "cookies-next/client";
import toast from "react-hot-toast";

/**
 * Reusable utility function to download files from the backend server.
 * Supports both original POST request with booking IDs, and standard GET/POST requests.
 */
export async function downloadFile(
  path: string,
  filename: string,
  idsOrMethod: string[] | "GET" | "POST" = "POST",
  body?: unknown
) {
  const toastId = toast.loading("Downloading file...");
  try {
    const token = getCookie("accessToken");
    const method = typeof idsOrMethod === "string" ? idsOrMethod : "POST";
    const requestBody = Array.isArray(idsOrMethod) ? { bookingIds: idsOrMethod } : body;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };
    if (requestBody) {
      headers["Content-Type"] = "application/json";
    }

    const options: RequestInit = {
      method,
      headers,
    };
    if (requestBody) {
      options.body = JSON.stringify(requestBody);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`,
      options
    );

    if (!response.ok) {
      let errorMessage = "Failed to download file";
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
    let finalFilename = filename;
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      if (filenameMatch && filenameMatch[1]) {
        finalFilename = filenameMatch[1];
      }
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = finalFilename;
    link.click();

    URL.revokeObjectURL(url);
    toast.success("Download completed successfully", { id: toastId });
  } catch (error) {
    console.error("Download error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to download file. Please try again.";
    toast.error(errorMessage, { id: toastId });
  }
}

/**
 * Helper function to download an invoice for a specific payment ID.
 */
export async function downloadInvoice(paymentId: string) {
  return downloadFile(
    `/api/v1/payment/download-invoice/${paymentId}`,
    `invoice_${paymentId}.pdf`,
    "GET"
  );
}
