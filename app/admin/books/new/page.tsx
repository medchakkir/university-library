import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateBookForm from "@/components/admin/forms/CreateBookForm";

const Page = () => {
  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/books">
          <MoveLeft className="size-4" />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <CreateBookForm />
      </section>
    </>
  );
};
export default Page;
