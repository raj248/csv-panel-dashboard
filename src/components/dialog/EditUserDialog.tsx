// src/components/dialogs/EditUserDialog.tsx
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
import { Edit } from "lucide-react";
import { useUpdateUser } from "@/hooks/useUsers";
import type { User } from "@/types/entities";

export function EditUserDialog({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email });
  // Assuming you have a useUpdateUser hook
  const { mutate: updateUser } = useUpdateUser();
  const handleUpdate = () => {
    // API call to update user
    updateUser(
      { id: user.id, userData: form },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );

    console.log("Updating User:", form);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Edit className="h-4 w-4" /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Author Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
