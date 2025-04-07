import { DataTable } from "@/components/admin/data-table";
import { UsersColumns } from "./columns";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
  const data = (await db.select().from(users)) as User[];

  return (
    <section className="mt-4 w-full rounded-2xl bg-white p-7">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Users</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/users/new" className="text-white">
            + Add New User
          </Link>
        </Button>
      </div>

      <DataTable columns={UsersColumns} data={data} filterKey="fullName" />
    </section>
  );
};

export default Page;
