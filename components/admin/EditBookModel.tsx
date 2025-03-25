"use client";

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogOverlay,
  DialogContent,
  DialogClose,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { X } from "lucide-react";

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  onClose,
  book,
}) => {
  const { toast } = useToast();
  const [title, setTitle] = React.useState(book.title);
  const [author, setAuthor] = React.useState(book.author);
  const [genre, setGenre] = React.useState(book.genre);
  const [coverUrl, setCoverUrl] = React.useState(book.coverUrl);
  const [description, setDescription] = React.useState(book.description);

  const handleSubmit = async () => {
    try {
      await db
        .update(books)
        .set({ title, author, genre, coverUrl, description })
        .where(eq(books.id, book.id));

      toast({ title: "Book updated successfully", variant: "default" });
      onClose();
    } catch (error) {
      toast({ title: "Error updating book", variant: "destructive" });
      console.error("Error updating book:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black opacity-50" />
      <DialogContent className="fixed left-1/2 top-1/4 w-full max-w-md -translate-x-1/2 rounded-md bg-white p-6 shadow-lg">
        <DialogTitle className="text-xl font-semibold">Edit Book</DialogTitle>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="genre">Genre</Label>
            <Input
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="coverUrl">Cover URL</Label>
            <Input
              id="coverUrl"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
        <DialogClose className="absolute right-2 top-2 p-2">
          <X className="text-gray-500" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
