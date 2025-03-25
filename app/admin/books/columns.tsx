"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import BookCover from "@/components/BookCover";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import EditBookModal from "@/components/admin/EditBookModel"; // Import EditBookModal

export const bookColumns: ColumnDef<Book>[] = [
  {
    accessorKey: "coverUrl",
    header: "Book Title",
    size: 320,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <BookCover
          variant="extraSmall"
          coverColor={row.original.coverColor}
          coverImage={row.original.coverUrl}
        />
        <span className="font-medium">{row.original.title}</span>
      </div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    size: 100,
    cell: ({ row }) =>
      row.original.createdAt
        ? new Date(row.original.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "N/A",
  },
  {
    id: "actions",
    header: "Actions",
    size: 40,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setOpen] = useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isEditModalOpen, setEditModalOpen] = useState(false); // Manage edit modal visibility

      const handleDelete = async () => {
        try {
          const res = await fetch(`/api/books/${row.original.id}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            throw new Error("Failed to delete book");
          }

          setOpen(false);
          router.refresh();
          // Show toast notification
          toast({
            title: "Book Deleted",
            description: `"${row.original.title}" has been successfully removed.`,
          });
        } catch (error) {
          toast({
            title: "Error Deleting Book",
            description: `"${row.original.title}" could not be deleted.`,
            variant: "destructive",
          });
          console.error("Error deleting book:", error);
        }
      };

      return (
        <div className="flex gap-2">
          {/* Edit Button */}
          {/*
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditModalOpen(true)}
            >
              <Pencil className="size-4 text-blue-500" />
            </Button>
          */}

          {/* Delete Button with AlertDialog */}
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="size-4 text-[#EF3A4B]" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this book? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-[#ef3a4b] text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
