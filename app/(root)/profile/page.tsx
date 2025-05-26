import { books, borrowRecords } from "@/database/schema";
import { db } from "@/database/drizzle";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { differenceInDays, format } from "date-fns";
import { Suspense } from "react";

import { redirect } from "next/navigation";
import BorrowedBooksList from "@/components/BorrowedBooksList";
import { Skeleton } from "@/components/ui/skeleton";

// Définir un enum pour les statuts de livre
export enum BookStatus {
  RETURNED = "RETURNED",
  BORROWED = "BORROWED",
}

// Définir un enum pour les types d'affichage du statut
export enum DisplayStatusType {
  RETURNED = "returned",
  OVERDUE = "overdue",
  DUE = "due",
}

// Fonction pour générer une couleur de fond basée sur le genre
const getBackgroundColorByGenre = (genre: string): string => {
  const genreColors: Record<string, string> = {
    "Science Fiction": "#1a365d80",
    Fantasy: "#5327724c",
    Mystery: "#7c2d1280",
    Romance: "#97266d80",
    Biography: "#2c528280",
    History: "#70245980",
    // Ajoutez d'autres genres selon vos besoins
  };

  return genreColors[genre] || "#5327724c"; // Couleur par défaut
};

// Composant de chargement
const BooksLoading = () => (
  <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex flex-col gap-4">
        <Skeleton className="h-[247px] w-full rounded-[10px]" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
      </div>
    ))}
  </div>
);

const BorrowedBooksContent = async () => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  try {
    // Fetch borrowed books from the database
    const borrowedBooks = await db
      .select({
        id: books.id,
        title: books.title,
        author: books.author,
        genre: books.genre,
        coverImage: books.coverUrl,
        coverColor: books.coverColor,
        borrowedDate: borrowRecords.borrowDate,
        dueDate: borrowRecords.dueDate,
        returnDate: borrowRecords.returnDate,
        status: borrowRecords.status,
      })
      .from(borrowRecords)
      .innerJoin(books, eq(borrowRecords.bookId, books.id))
      .where(eq(borrowRecords.userId, session.user.id))
      .orderBy(desc(borrowRecords.borrowDate));

    // Calculate the status of borrowed books
    const borrowedBooksWithStatus = borrowedBooks.map((book) => {
      const dueDate = new Date(book.dueDate);
      const now = new Date();
      const bgColor = getBackgroundColorByGenre(book.genre);

      let status: {
        type: DisplayStatusType;
        text: string;
      };

      if (book.status === BookStatus.RETURNED) {
        status = {
          type: DisplayStatusType.RETURNED,
          text: `Returned on ${format(new Date(book.returnDate!), "PPP")}`,
        };
      } else if (now > dueDate) {
        const overdueDays = Math.abs(differenceInDays(now, dueDate));
        status = {
          type: DisplayStatusType.OVERDUE,
          text: `Overdue by ${overdueDays} day${overdueDays !== 1 ? "s" : ""}`,
        };
      } else {
        const diffDays = differenceInDays(dueDate, now);
        status = {
          type: DisplayStatusType.DUE,
          text:
            diffDays === 0
              ? "Due today"
              : `${diffDays} day${diffDays !== 1 ? "s" : ""} left to return`,
        };
      }

      return {
        ...book,
        status,
        bgColor,
      };
    });

    return (
      <BorrowedBooksList
        borrowedBooks={borrowedBooksWithStatus}
        userId={session.user.id}
      />
    );
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    return (
      <div className="flex w-full justify-center p-8 text-red-400">
        Une erreur s'est produite lors du chargement de vos livres. Veuillez
        réessayer.
      </div>
    );
  }
};

const Page = async () => {
  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="relative z-0 w-full px-6">
        <div className="flex w-full flex-col items-start gap-6">
          <h2 className="font-ibm-plex-sans text-3xl font-semibold leading-[30px] text-[#d5dfff]">
            Borrowed books
          </h2>

          <Suspense fallback={<BooksLoading />}>
            <BorrowedBooksContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
