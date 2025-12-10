"use client";

import { getCookie } from "cookies-next/client";

export async function downloadFile(path: string, filename: string) {
  try {
    const token = getCookie("accessToken");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    alert("Failed to download file. Please try again.");
  }
}
