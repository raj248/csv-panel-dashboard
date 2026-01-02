// src/components/dialogs/BulkBookUploadDialog.tsx
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
  Library,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileJson,
} from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
// Assuming you add a bulk create hook or loop through your single create
import { useCreateBulkBooks } from "@/hooks/useBooks";
import { toast } from "sonner";

export function BulkBookUploadDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [headerRow, setHeaderRow] = useState<number>(0);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [defaultAuthorId, setDefaultAuthorId] = useState<string>("");

  const { data: authors } = useUsers(true);
  const { mutate: createBulkBooks } = useCreateBulkBooks();

  const handleParse = () => {
    if (!file) return toast.error("Please select an Excel file");
    setIsParsing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target?.result;
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { range: headerRow });

        if (jsonData.length === 0) {
          toast.error("No data found at this row index.");
          return;
        }

        setPreviewData(jsonData);
        toast.success(`${jsonData.length} books parsed from spreadsheet`);
      } catch (err) {
        toast.error("Failed to parse Excel file");
      } finally {
        setIsParsing(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleBulkUpload = async () => {
    if (!defaultAuthorId) return toast.error("Please select a default author");

    // In a real app, you'd likely have a /bulk endpoint.
    // Here, we simulate the logic for the mapped data.
    const booksToCreate = previewData.map((row) => ({
      isbn: row.ISBN || row.isbn || "",
      name: row.Title || row.name || row.Book || "",
      author: row.Author || row.author || "",
      price: parseFloat(row.Price || row.price || 0),
      year: parseInt(row.Year || row.year || new Date().getFullYear()),
      authorId: defaultAuthorId,
      publisher: row.Publisher || row.publisher || "",
      category: row.Category || row.category || "",
      language: row.Language || row.language || "English",
    }));

    createBulkBooks(booksToCreate, {
      onSuccess: () => {
        toast.success("Books imported successfully!");
        setOpen(false);
        setFile(null);
        setPreviewData([]);
        setDefaultAuthorId("");
        setHeaderRow(0);
      },
      onError: (error) => {
        toast.error(`Bulk import failed: ${error.message}`);
      },
    });

    console.log("Bulk Creating Books:", booksToCreate);

    // Trigger your mutation logic here
    toast.success("Bulk import started!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-primary text-primary hover:bg-primary/10"
        >
          <Library className="h-4 w-4" />
          Bulk Import Books
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl max-h-[95vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle>Bulk Book Creator</DialogTitle>
              <DialogDescription>
                Upload an Excel sheet to create multiple book records at once.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 py-4">
          {/* Configuration Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-muted/30 p-5 rounded-xl border border-dashed border-muted-foreground/50">
            <div className="md:col-span-2 space-y-3">
              <Label>Default Author Assignment</Label>
              <Select
                onValueChange={setDefaultAuthorId}
                value={defaultAuthorId}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Assign all books to..." />
                </SelectTrigger>
                <SelectContent>
                  {authors?.data?.map((a: any) => (
                    <SelectItem key={a.id} value={a.id.toString()}>
                      {a.name} ({a.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground">
                All books in this spreadsheet will be linked to this author.
              </p>
            </div>

            <div className="space-y-3">
              <Label>Excel Row Index (Header)</Label>
              <Input
                type="number"
                value={headerRow}
                onChange={(e) => setHeaderRow(Number(e.target.value))}
                className="bg-background"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <Label>Spreadsheet File (.xlsx)</Label>
              <Input
                type="file"
                accept=".xlsx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="bg-background cursor-pointer"
              />
            </div>

            <Button
              className="w-full h-10 mt-auto"
              onClick={handleParse}
              disabled={!file || isParsing}
            >
              {isParsing ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Step 1: Parse Books"
              )}
            </Button>
          </div>

          {/* Preview Section */}
          {previewData.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Previewing {previewData.length} records
                </div>
                <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full text-[11px] font-medium border border-yellow-500/20">
                  <AlertCircle className="h-3 w-3" />
                  Ensure columns match: ISBN, Title, Author, Year, Price,
                  Language, Category, Publisher
                </div>
              </div>

              <div className="rounded-xl border bg-background shadow-md overflow-hidden">
                <ScrollArea className="w-full h-[300px]">
                  <Table>
                    <TableHeader className="bg-muted sticky top-0 z-20">
                      <TableRow>
                        {Object.keys(previewData[0]).map((key) => (
                          <TableHead
                            key={key}
                            className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap"
                          >
                            {key}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, idx) => (
                        <TableRow
                          key={idx}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          {Object.values(row).map((val, i) => (
                            <TableCell
                              key={i}
                              className="text-xs font-medium py-3"
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

        <DialogFooter className="pt-4 border-t flex items-center justify-between sm:justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-muted-foreground">
              READY FOR IMPORT
            </span>
            <span className="text-xl font-black">
              {previewData.length} BOOKS
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Discard
            </Button>
            <Button
              disabled={previewData.length === 0 || !defaultAuthorId}
              size="lg"
              className="px-10 gap-2"
              onClick={handleBulkUpload}
            >
              <FileJson className="h-4 w-4" />
              Finalize Bulk Import
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
