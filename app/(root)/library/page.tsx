import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { auth } from "@/auth";
import { desc } from "drizzle-orm";
import { Book } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Library = async () => {
  const session = await auth();
  const userId = session?.user?.id || "";

  const latestBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      {latestBooks.length > 0 ? (
        <>
          <BookOverview {...latestBooks[0]} userId={userId} />
          {!session && (
            <div className="mt-6 flex justify-center">
              <Link href="/sign-in">
                <Button size="lg" className="bg-primary text-dark-100">
                  Sign in to borrow books
                </Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <p>No books available</p>
      )}

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Library;
