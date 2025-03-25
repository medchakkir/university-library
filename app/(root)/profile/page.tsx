import BookList from "@/components/BookList";
import { books, borrowRecords } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

const Page = async () => {
  const session = await auth();

  const borrowedBooks = (await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      totalCopies: books.totalCopies,
      availableCopies: books.availableCopies,
      coverColor: books.coverColor,
      coverUrl: books.coverUrl,
      videoUrl: books.videoUrl,
      description: books.description,
      summary: books.summary,
      createdAt: books.createdAt,
      status: borrowRecords.status,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(books.id, borrowRecords.bookId))
    .where(eq(borrowRecords.userId, session?.user?.id ?? ""))) as Book[];

  return (
    <>
      <BookList
        containerClassName="w-full"
        title="Borrowed Books"
        books={borrowedBooks}
      />
    </>
  );
};
export default Page;
