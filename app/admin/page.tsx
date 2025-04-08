import SectionCards from "@/components/admin/SectionCards";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { sql } from "drizzle-orm";
import { GenreBarChart } from "@/components/admin/GenreBarChart";

const Page = async () => {
  const [
    borrowedBooksCount,
    totalUsersCount,
    totalBooksCount,
    prevMonthBorrowedBooks,
    prevMonthUsers,
    prevMonthBooks,
  ] = await Promise.all([
    // Current month counts
    db
      .select({ count: sql<number>`count(*)` })
      .from(borrowRecords)
      .where(
        sql`EXTRACT(MONTH FROM "created_at") = EXTRACT(MONTH FROM CURRENT_DATE)
             AND EXTRACT(YEAR FROM "created_at") = EXTRACT(YEAR FROM CURRENT_DATE)`,
      ),
    db.select({ count: sql<number>`count(*)` }).from(users),
    db.select({ count: sql<number>`count(*)` }).from(books),

    // Previous month counts for percentage calculation
    db
      .select({ count: sql<number>`count(*)` })
      .from(borrowRecords)
      .where(
        sql`EXTRACT(MONTH FROM "created_at") = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')
             AND EXTRACT(YEAR FROM "created_at") = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month')`,
      ),
    db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(
        sql`EXTRACT(MONTH FROM "created_at") = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')
             AND EXTRACT(YEAR FROM "created_at") = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month')`,
      ),
    db
      .select({ count: sql<number>`count(*)` })
      .from(books)
      .where(
        sql`EXTRACT(MONTH FROM "created_at") = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')
             AND EXTRACT(YEAR FROM "created_at") = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month')`,
      ),
  ]);

  const calculateChange = (current: number, previous: number) => {
    if (!Number.isFinite(current) || !Number.isFinite(previous)) {
      return { change: "0%", isIncrease: false };
    }

    if (previous === 0) {
      // If there's no data last month but we have some this month, it's an increase
      return {
        change: current > 0 ? "100%" : "0%",
        isIncrease: current > 0,
      };
    }

    const percentage = ((current - previous) / previous) * 100;

    return {
      change: `${Math.abs(percentage).toFixed(1)}%`,
      isIncrease: percentage > 0,
    };
  };

  const statisticsData = [
    {
      title: "Borrowed Books",
      value: (borrowedBooksCount[0]?.count ?? 0).toString(),
      ...calculateChange(
        borrowedBooksCount[0]?.count ?? 0,
        prevMonthBorrowedBooks[0]?.count ?? 0,
      ),
    },
    {
      title: "Total Users",
      value: (totalUsersCount[0]?.count ?? 0).toString(),
      ...calculateChange(
        totalUsersCount[0]?.count ?? 0,
        prevMonthUsers[0]?.count ?? 0,
      ),
    },
    {
      title: "Total Books",
      value: (totalBooksCount[0]?.count ?? 0).toString(),
      ...calculateChange(
        totalBooksCount[0]?.count ?? 0,
        prevMonthBooks[0]?.count ?? 0,
      ),
    },
  ];

  const genreCounts = await db
    .select({ genre: books.genre, count: sql<number>`count(*)` })
    .from(books)
    .groupBy(books.genre);

  return (
    <div className="flex flex-1 flex-col gap-2 @container/main">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards data={statisticsData} />
        <div className="px-4 lg:px-6">
          {/* Chart components can be re-enabled here */}
          <GenreBarChart chartData={genreCounts} />
        </div>
      </div>
    </div>
  );
};

export default Page;
