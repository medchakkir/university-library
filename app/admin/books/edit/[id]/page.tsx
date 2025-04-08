import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
// app/(admin)/books/edit/[id]/page.tsx
import EditBookForm from "@/components/admin/forms/EditBookForm";
import { getBookById } from "@/lib/admin/actions/book";

const Page = async ({ params }: { params: { id: string } }) => {
  const book = await getBookById(params.id);

  if (!book) {
    return <div>404 — Book not found 💀</div>;
  }

  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">
          <MoveLeft className="size-4" />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <EditBookForm {...book} />
      </section>
    </>
  );
};
export default Page;
