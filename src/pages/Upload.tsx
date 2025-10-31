import { useState } from "react";
import { uploadFile } from "@/services/fileApi";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    setStatus("Uploading...");

    try {
      const result = await uploadFile(file, "user3@example.com");
      console.log("Uploaded Data:", result);
      setStatus("Upload successful ✅");
    } catch (err) {
      console.error(err);
      setStatus("Upload failed ❌");
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <input
        type="file"
        accept=".csv,.xml"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="ml-2 px-4 py-1 bg-blue-600 text-white rounded"
      >
        Upload
      </button>
      <p className="mt-2 text-sm">{status}</p>
    </div>
  );
}
