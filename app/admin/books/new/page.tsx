import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookForm from "@/components/admin/forms/BookForm";
import { MoveLeft } from "lucide-react";

const Page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">
          <MoveLeft className="size-4" />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
};
export default Page;
