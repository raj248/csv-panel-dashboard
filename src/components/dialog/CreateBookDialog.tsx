// src/components/dialogs/CreateBookDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useCreateBook } from "@/hooks/useBooks";
import { useUsers } from "@/hooks/useUsers";
import { PlusCircle, BookOpen } from "lucide-react";

export function CreateBookDialog() {
  const { mutate: createBook, isPending } = useCreateBook();
  const { data: usersResp } = useUsers(true);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    isbn: "",
    name: "",
    price: "",
    author: "",
    year: "",
    authorId: "",
    publisher: "",
    category: "",
    language: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setForm({ ...form, authorId: value });
  };

  const handleSubmit = () => {
    if (!form.isbn || !form.name || !form.authorId) return;

    const payload = {
      ...form,
      price: form.price ? parseFloat(form.price) : undefined,
      year: form.year ? parseInt(form.year) : undefined,
    };

    createBook(payload, {
      onSuccess: () => {
        setOpen(false);
        setForm({
          isbn: "",
          name: "",
          price: "",
          author: "",
          year: "",
          authorId: "",
          publisher: "",
          category: "",
          language: "",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="gap-2 border-primary text-primary hover:bg-primary/10"
          variant="outline"
          size="sm"
        >
          <PlusCircle className="h-4 w-4" />
          Add New Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Register New Book
          </DialogTitle>
          <DialogDescription>
            Enter the book details. ISBN, Title, and Assigned Author are
            required.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="grid gap-6 py-4">
            {/* Primary Info (Full Width) */}
            <div className="grid gap-4 border-b pb-4">
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
                <Label htmlFor="name">Book Title (Required)</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="The Midnight Library"
                />
              </div>
              <div className="grid gap-2">
                <Label>Assign to Author (Required)</Label>
                <Select
                  onValueChange={handleSelectChange}
                  value={form.authorId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an author" />
                  </SelectTrigger>
                  <SelectContent>
                    {usersResp?.data?.map((user: any) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Metadata (Two Columns) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Matt Haig"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
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
                <Label htmlFor="year">Print Year</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="2024"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  placeholder="English"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Fiction / Fantasy"
                />
              </div>
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input
                  id="publisher"
                  name="publisher"
                  value={form.publisher}
                  onChange={handleChange}
                  placeholder="Penguin Random House"
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !form.isbn || !form.name || !form.authorId}
          >
            {isPending ? "Registering..." : "Register Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
