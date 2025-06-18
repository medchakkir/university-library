import { ReactNode } from "react";
import Header from "@/components/Header";
import PublicHeader from "@/components/PublicHeader";
import { auth } from "@/auth";
import { after } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  // Track user activity if authenticated
  if (session?.user?.id) {
    after(async () => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1);

      if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
        return;

      await db
        .update(users)
        .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
        .where(eq(users.id, session.user.id));
    });
  }

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        {session ? <Header session={session} /> : <PublicHeader />}
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
