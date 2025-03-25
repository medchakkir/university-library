import Link from "next/link";
import { Button } from "@/components/ui/button";
import { bookColumns } from "@/app/admin/books/columns";
import { DataTable } from "@/components/admin/data-table";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

async function getBooks(): Promise<Book[]> {
  return db.select().from(books);
}

const Page = async () => {
  const books = await getBooks();

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <div className="container w-full py-10">
        <DataTable columns={bookColumns} data={books} />
      </div>
    </section>
  );
};

export default Page;
