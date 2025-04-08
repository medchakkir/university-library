import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { getUserById } from "@/lib/admin/actions/user";
import EditUserForm from "@/components/admin/forms/EditUserForm";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById(params.id);

  if (!user) {
    return <div>404 — User not found 💀</div>;
  }

  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/users">
          <MoveLeft className="size-4" />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <EditUserForm {...user} />
      </section>
    </>
  );
};
export default Page;
