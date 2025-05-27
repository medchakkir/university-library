import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import SearchBook from "@/components/SearchBook";

const Page = async () => {
  const allBooks = await db.select().from(books); // Server-side
  return <SearchBook books={allBooks} />;
};
export default Page;
