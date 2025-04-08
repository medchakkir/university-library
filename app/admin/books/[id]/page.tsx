import BookDetails from "@/components/admin/BookDetails";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const { id } = params;

  const result = await db.select().from(books).where(eq(books.id, id)).limit(1);
  const book = result[0];

  return <BookDetails book={book} />;
};

export default Page;
