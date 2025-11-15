import { useState } from "react";
import * as XLSX from "xlsx";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [headerRow, setHeaderRow] = useState<number>(2); // default: row 3 (0-based index)
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [csvOutput, setCsvOutput] = useState<string>("");

  const handleFileRead = (buffer: ArrayBuffer) => {
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Preview JSON with chosen header row
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      range: headerRow,
    });
    setPreviewData(jsonData);

    // Generate CSV with same header row
    const trimmedCsv = XLSX.utils.sheet_to_csv(
      XLSX.utils.json_to_sheet(jsonData),
      {
        forceQuotes: true,
      }
    );
    console.log("Trimmed CSV: ", trimmedCsv);
    setCsvOutput(trimmedCsv);

    setStatus("File parsed ✅");
  };

  const handleUpload = () => {
    if (!file) return alert("Please select a file");
    setStatus("Reading file...");

    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result;
      if (buffer) handleFileRead(buffer as ArrayBuffer);
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadCsv = () => {
    if (!csvOutput) return;
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file?.name.replace(/\.[^/.]+$/, "") + ".csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 border rounded-md space-y-3">
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <div className="flex items-center space-x-2">
        <button
          onClick={handleUpload}
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          Parse File
        </button>

        <button
          onClick={downloadCsv}
          className="px-4 py-1 bg-green-600 text-white rounded"
        >
          Download CSV
        </button>
      </div>

      <div>
        <label>
          Header Row (0-based index):
          <input
            type="number"
            value={headerRow}
            min={0}
            onChange={(e) => setHeaderRow(Number(e.target.value))}
            className="ml-2 border px-1"
          />
        </label>
      </div>

      <p className="text-sm">{status}</p>

      {previewData.length > 0 && (
        <div className="overflow-auto max-h-64 border p-2">
          <table className="table-auto border-collapse border">
            <thead>
              <tr>
                {Object.keys(previewData[0]).map((key) => (
                  <th key={key} className="border px-2 py-1 bg-accent">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.slice(0, 5).map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="border px-2 py-1">
                      {val as any}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
