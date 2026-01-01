// src/components/dialogs/UploadSalesDialog.tsx
"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  FileUp,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileSpreadsheet,
} from "lucide-react";
import { useUsers, useAllBooks } from "@/hooks/useUsers";
import { toast } from "sonner";

export function UploadSalesDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [headerRow, setHeaderRow] = useState<number>(0);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [csvOutput, setCsvOutput] = useState<string>("");
  const [isParsing, setIsParsing] = useState(false);

  const { data: authors } = useUsers(true);
  const { data: booksResp } = useAllBooks();

  const handleParse = () => {
    if (!file) return toast.error("Please select an Excel file");
    setIsParsing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const buffer = e.target?.result;
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          range: headerRow,
        });
        if (jsonData.length === 0) {
          toast.error("No data found. Try changing the Header Row index.");
          return;
        }
        setPreviewData(jsonData);
        const trimmedCsv = XLSX.utils.sheet_to_csv(
          XLSX.utils.json_to_sheet(jsonData)
        );
        setCsvOutput(trimmedCsv);
        toast.success("File parsed successfully");
      } catch (error) {
        toast.error("Parsing failed");
      } finally {
        setIsParsing(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-2">
          <FileUp className="h-4 w-4" />
          <span className="hidden md:inline">Import Sales</span>
        </Button>
      </DialogTrigger>
      {/* Width increased to 5xl (1024px) for better table visibility */}
      <DialogContent className="sm:max-w-5xl max-h-[95vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-green-600" />
            <DialogTitle>Excel Sales Importer</DialogTitle>
          </div>
          <DialogDescription>
            Map this report to an author and book, then parse the data.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid gap-6 py-4">
            {/* Top Row: Targeting Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-4 rounded-xl border">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Target Author
                </Label>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Author" />
                  </SelectTrigger>
                  <SelectContent>
                    {authors?.data?.map((a: any) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Target Book
                </Label>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Book" />
                  </SelectTrigger>
                  <SelectContent>
                    {booksResp?.data?.map((b: any) => (
                      <SelectItem key={b.isbn} value={b.isbn}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Middle Row: File Config */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end bg-accent/10 p-4 rounded-xl border border-dashed border-accent">
              <div className="lg:col-span-2 space-y-2">
                <Label htmlFor="file">Upload Spreadsheet</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".xlsx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Header Row Index <AlertCircle className="h-3 w-3" />
                </Label>
                <Input
                  type="number"
                  min={0}
                  value={headerRow}
                  onChange={(e) => setHeaderRow(Number(e.target.value))}
                  className="bg-background"
                />
              </div>
              <Button
                onClick={handleParse}
                disabled={!file || isParsing}
                className="w-full"
              >
                {isParsing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Parse Data"
                )}
              </Button>
            </div>

            {/* Bottom Row: Data Preview */}
            {previewData.length > 0 && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex justify-between items-center px-1">
                  <Label className="text-primary font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Data Preview (Row {headerRow + 1} and below)
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Showing first 10 entries
                  </p>
                </div>

                <div className="rounded-md border bg-background shadow-sm overflow-hidden">
                  <ScrollArea className="w-full h-[350px]">
                    <Table>
                      <TableHeader className="bg-muted/50 sticky top-0 z-10">
                        <TableRow>
                          {Object.keys(previewData[0]).map((key) => (
                            <TableHead
                              key={key}
                              className="whitespace-nowrap font-bold text-foreground"
                            >
                              {key}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewData.slice(0, 10).map((row, idx) => (
                          <TableRow key={idx}>
                            {Object.values(row).map((val, i) => (
                              <TableCell
                                key={i}
                                className="max-w-[200px] truncate text-xs font-mono"
                              >
                                {val as any}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between border-t pt-4 sm:justify-between">
          <div className="text-xs text-muted-foreground">
            {previewData.length} records found in sheet.
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={previewData.length === 0}
              size="default"
              className="px-8"
            >
              Finalize & Save Sales
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
