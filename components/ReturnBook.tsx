"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { returnBook } from "@/lib/actions/book";

interface ReturnBookProps {
  userId: string;
  bookId: string;
}

const ReturnBook = ({ userId, bookId }: ReturnBookProps) => {
  const router = useRouter();
  const [returning, setReturning] = useState(false);

  const handleReturnBook = async () => {
    setReturning(true);

    try {
      const result = await returnBook({ bookId, userId });

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });

        router.push("/profile");
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "An error occurred while returning the book",
        variant: "destructive",
      });
    } finally {
      setReturning(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleReturnBook}
      disabled={returning}
    >
      <Image src="/icons/book.svg" alt="return" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {returning ? "Returning ..." : "Return Book"}
      </p>
    </Button>
  );
};

export default ReturnBook;
