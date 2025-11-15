import { useState } from "react";
import { uploadFile } from "@/services/fileApi";
import * as XLSX from "xlsx";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    setStatus("Uploading...");

    try {
      // const result = await uploadFile(file, "user3@example.com");
      // console.log("Uploaded Data:", result);
      setStatus("Upload successful ✅");

      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const csvData = e.target?.result;
        console.log("CSV Content:", csvData);
        console.log(file.type);

        const workbook = XLSX.read(csvData, { type: "buffer" });
        console.log(workbook);
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        // const data = XLSX.utils.sheet_to_json(worksheet, { range: 3 });
        const data = XLSX.utils.sheet_to_csv(worksheet);
        // console.log("Headers: ", Object.keys(data[0] as {}));
        console.log(typeof data);
      };
      // reader.readAsText(file);

      // Reset the file input
      // setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("Upload failed ❌");
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <input
        type="file"
        accept=".csv,.xml, .xlsx"
        // className="hidden"
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
