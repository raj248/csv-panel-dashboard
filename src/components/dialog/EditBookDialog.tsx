// src/components/dialogs/EditBookDialog.tsx
"use client";

import { useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUsers } from "@/hooks/useUsers";
import { Edit, BookOpenCheck } from "lucide-react";
import type { Book } from "@/types/entities";
import { useUpdateBook } from "@/hooks/useBooks";

export function EditBookDialog({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);
  const { data: usersResp } = useUsers(true);
  const { mutate: updateBook, isPending } = useUpdateBook();

  const [form, setForm] = useState({
    name: book.name,
    price: book.price?.toString() || "",
    author: book.author || "",
    authorId: book.user.id.toString(),
    year: book.year?.toString() || "",
    publisher: book.publisher || "",
    category: book.category || "",
    language: book.language || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateBook(
      {
        id: book.id,
        bookData: {
          isbn: book.isbn, // ISBN usually remains immutable
          name: form.name,
          price: form.price ? parseFloat(form.price) : undefined,
          author: form.author,
          authorId: form.authorId,
          year: form.year ? parseInt(form.year) : undefined,
          publisher: form.publisher,
          category: form.category,
          language: form.language,
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit className="h-4 w-4" /> Edit Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpenCheck className="h-5 w-5 text-primary" />
            Edit Book: {book.isbn}
          </DialogTitle>
          <DialogDescription>
            Modify the book metadata and author assignment below.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="grid gap-6 py-4">
            {/* Primary Section */}
            <div className="grid gap-4 border-b pb-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Book Title</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label>Assign Author</Label>
                <Select
                  value={form.authorId}
                  onValueChange={(val) => setForm({ ...form, authorId: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an author" />
                  </SelectTrigger>
                  <SelectContent>
                    {usersResp?.data?.map((u: any) => (
                      <SelectItem key={u.id} value={u.id.toString()}>
                        {u.name} ({u.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Optional Metadata Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
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
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input
                  id="publisher"
                  name="publisher"
                  value={form.publisher}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="mt-2">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
