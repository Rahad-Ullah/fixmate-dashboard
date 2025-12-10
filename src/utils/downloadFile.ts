"use client";

import { getCookie } from "cookies-next/client";

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
