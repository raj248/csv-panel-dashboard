// src/components/dialogs/DeleteBookDialog.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteBook } from "@/hooks/useBooks"; // Assuming this exists
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DeleteBookProps {
  bookId: string;
  bookName: string;
}

export function DeleteBookDialog({ bookId, bookName }: DeleteBookProps) {
  const navigate = useNavigate();
  const { mutate: deleteBook, isPending } = useDeleteBook();

  const handleDelete = () => {
    deleteBook(bookId, {
      onSuccess: () => {
        toast.success("Book deleted successfully");
        navigate("/books/all"); // Redirect to book list
      },
      onError: () => {
        toast.error("Failed to delete book");
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="gap-2">
          <Trash2 className="h-4 w-4" />
          Delete Book
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <strong>{bookName}</strong> from the
            database. All associated sales data will also be removed. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Permanently Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
