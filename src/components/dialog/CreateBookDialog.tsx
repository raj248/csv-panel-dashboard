// src/components/dialogs/CreateBookDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
// Assuming you have a similar hook structure for books
import { useCreateBook } from "@/hooks/useBooks";
import { PlusCircle } from "lucide-react";

export function CreateBookDialog() {
  const { mutate: createBook, isPending } = useCreateBook();
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    isbn: "",
    name: "",
    price: "",
    printYear: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Basic Validation for required fields
    if (!form.isbn || !form.name) return;

    const payload = {
      ...form,
      // Convert strings to numbers for the API if they exist
      price: form.price ? parseFloat(form.price) : undefined,
      printYear: form.printYear ? parseInt(form.printYear) : undefined,
    };

    createBook(payload, {
      onSuccess: () => {
        setOpen(false);
        setForm({ isbn: "", name: "", price: "", printYear: "" });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register New Book</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="isbn">ISBN (Required)</Label>
            <Input
              id="isbn"
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
              placeholder="978-3-16-148410-0"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Book Name (Required)</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="The Midnight Library"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price (Optional)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="19.99"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="printYear">Print Year (Optional)</Label>
              <Input
                id="printYear"
                name="printYear"
                type="number"
                value={form.printYear}
                onChange={handleChange}
                placeholder="2024"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Adding..." : "Add Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
