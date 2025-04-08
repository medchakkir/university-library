import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import CreateUserForm from "@/components/admin/forms/CreateUserForm";

const Page = () => {
  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/users">
          <MoveLeft className="size-4" />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <CreateUserForm />
      </section>
    </>
  );
};
export default Page;
