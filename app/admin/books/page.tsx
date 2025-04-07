import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BooksColumns } from "@/app/admin/books/columns";
import { DataTable } from "@/components/admin/data-table";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

const Page = async () => {
  const data = (await db.select().from(books)) as Book[];

  return (
    <section className="mt-4 w-full rounded-2xl bg-white p-7">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <DataTable columns={BooksColumns} data={data} filterKey="title" />
    </section>
  );
};

export default Page;
