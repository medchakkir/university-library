import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { and, eq, not } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import SimilarBooks from "@/components/SimilarBooks";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  // Fetch data based on id
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");

  const similarBooks = await db
    .select()
    .from(books)
    .where(and(eq(books.genre, bookDetails.genre), not(eq(books.id, id))))
    .limit(6);

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h2 className="font-bebas-neue text-4xl text-light-100">Video</h2>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h2 className="font-bebas-neue text-4xl text-light-100">Summary</h2>

            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/*  SIMILAR*/}
        <SimilarBooks books={similarBooks} />
      </div>
    </>
  );
};
export default Page;
