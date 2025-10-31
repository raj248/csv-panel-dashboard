// src/services/fileApi.ts
import axios from "axios";

import type { APIResponse } from "../types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post<APIResponse<string>>(
      `${API_URL}/files/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // optional (if using auth cookies)
      }
    );

    return response.data; // success response from backend
  } catch (error: any) {
    console.error("File upload failed:", error);
    throw error.response?.data || { error: "Upload failed" };
  }
}
