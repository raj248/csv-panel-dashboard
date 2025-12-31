// src/components/dialogs/EditBookDialog.tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
import { useUsers } from "@/hooks/useUsers"; // Re-use your user hook
import { Edit } from "lucide-react";
import type { Book } from "@/types/entities";
import { useUpdateBook } from "@/hooks/useBooks";

export function EditBookDialog({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);
  const { data: usersResp } = useUsers(true); // Fetch all authors
  const { mutate: updateBook } = useUpdateBook();
  const [form, setForm] = useState({
    name: book.name,
    price: book.price,
    authorId: book.user.id,
    printYear: book.printYear,
  });

  const handleSave = () => {
    updateBook(
      {
        id: book.id,
        bookData: {
          isbn: book.isbn,
          name: form.name,
          price: form.price,
          authorId: form.authorId,
          printYear: form.printYear,
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );

    console.log("Saving updated book:", form);
    // setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit className="h-4 w-4" /> Edit Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Book Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Book Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                  <SelectItem key={u.id} value={u.id}>
                    {u.name} ({u.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Price</Label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: parseFloat(e.target.value) })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Print Year</Label>
            <Input
              type="number"
              value={form.printYear}
              onChange={(e) =>
                setForm({ ...form, printYear: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
