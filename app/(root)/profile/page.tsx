import { books, borrowRecords, users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";
import BookCover from "@/components/BookCover";

const Page = async () => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  // Récupérer les livres empruntés de la base de données
  const borrowedBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      coverImage: books.coverUrl,
      coverColor: books.coverColor,
      borrowedDate: borrowRecords.borrowDate,
      returnedDate: borrowRecords.dueDate,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session.user.id))
    .orderBy(desc(borrowRecords.borrowDate));

  // Calculer le statut des livres empruntés
  const borrowedBooksWithStatus = borrowedBooks.map((book) => {
    const now = new Date();
    const borrowedDate = new Date(book.borrowedDate);
    const dueDate = new Date(borrowedDate);
    dueDate.setDate(dueDate.getDate() + 14); // disons que le prêt dure 14 jours

    let status;
    if (book.returnedDate) {
      status = {
        type: "returned",
        text: `Returned on ${new Date(book.returnedDate).toDateString()}`,
      };
    } else if (now > dueDate) {
      status = { type: "overdue", text: "Overdue Return" };
    } else {
      const diffDays = Math.ceil(
        (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      status = { type: "due", text: `${diffDays} days left to due` };
    }

    return {
      ...book,
      status,
      bgColor: "#5327724c", // tu peux faire varier selon le genre ou autre
    };
  });

  return (
    <>
      {/* Main Content */}
      <div className="relative z-0 flex flex-col gap-12 px-6 lg:flex-row ">
        {/* Profile Card */}
        <Card className="relative flex w-full flex-col items-start gap-9 rounded-[20px] px-10 pb-10 pt-[110px] shadow-[0px_0px_70px_#00000066] [background:linear-gradient(180deg,rgba(35,40,57,1)_0%,rgba(18,20,29,1)_100%)] lg:w-[566px]">
          <header className="flex w-full flex-col items-start gap-8">
            <div className="flex items-center gap-[30px]">
              <Avatar className="size-[119px] rounded-full">
                <AvatarImage
                  src={
                    user.profilePicture ??
                    `https://c.animaapp.com/m8soetyfkBQt6N/img/image-1.png`
                  }
                  alt={`${user.fullName} profile`}
                  className="object-cover"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start justify-center gap-6">
                <div className="flex flex-col items-start gap-2.5">
                  <Badge className="flex items-center gap-1 bg-transparent px-0 text-sm font-normal text-[#d5dfff]">
                    <div className="relative size-4">
                      <img
                        className="absolute left-0.5 top-0.5 size-[13px]"
                        alt="Verified icon"
                        src="https://c.animaapp.com/m8soetyfkBQt6N/img/vector.png"
                      />
                    </div>
                    Verified User
                  </Badge>

                  <div className="flex flex-col items-start gap-2">
                    <h2 className="text-2xl font-semibold leading-[30px] text-white [font-family:'IBM_Plex_Sans',Helvetica]">
                      {user.fullName}
                    </h2>
                    <p className="text-lg font-normal leading-5 text-[#d5dfff] [font-family:'IBM_Plex_Sans',Helvetica]">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* ID Card Clip */}
          <div className="absolute left-[254px] top-[-17px] h-[88px] w-[59px] overflow-hidden rounded-[0px_0px_100px_100px] bg-[#454f6f]">
            <div className="relative left-[9px] top-[59px] h-2.5 w-10 rounded-[40px] bg-[#1e2230]" />
          </div>
        </Card>

        {/* Borrowed Books Section */}
        <div className="flex w-full flex-col items-start gap-6 lg:w-[592px]">
          <h2 className="text-3xl font-semibold leading-[30px] text-[#d5dfff] [font-family:'IBM_Plex_Sans',Helvetica]">
            Borrowed books
          </h2>

          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
            {borrowedBooksWithStatus.map((book) => (
              <Card
                key={book.id}
                className="relative flex w-full flex-col items-center gap-5 rounded-2xl p-5 shadow-[0px_0px_70px_#00000033] [background:linear-gradient(180deg,rgba(18,20,29,1)_0%,rgba(18,21,31,1)_100%)]"
              >
                {book.status.type === "overdue" && (
                  <img
                    className="absolute -left-1 top-[-3px] z-10 size-[29px]"
                    alt="Warning"
                    src="https://c.animaapp.com/m8soetyfkBQt6N/img/vuesax-outline-warning-2.svg"
                  />
                )}

                <CardContent
                  className={`w-full p-0 ${book.bgColor} relative h-[247px] overflow-hidden rounded-[10px]`}
                >
                  <div className="relative left-12 top-6 h-[199px] w-36 shadow-[-30px_4px_50px_#00000066]">
                    <div className="relative h-[199px]">
                      <BookCover
                        className="absolute left-0 top-0 size-full object-cover"
                        coverImage={book.coverImage}
                        coverColor={book.coverColor}
                      />
                    </div>
                  </div>
                </CardContent>

                <div className="flex w-full flex-col items-start gap-2.5">
                  <h3 className="text-xl font-semibold leading-6 text-white [font-family:'IBM_Plex_Sans',Helvetica]">
                    {book.title} - By {book.author}
                  </h3>
                  <p className="text-base font-normal italic leading-5 text-[#d5dfff] [font-family:'IBM_Plex_Sans',Helvetica]">
                    {book.genre}
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[7px]">
                  <div className="flex items-center gap-1">
                    <img
                      className="size-[18px]"
                      alt="Book icon"
                      src="https://c.animaapp.com/m8soetyfkBQt6N/img/vuesax-outline-book.svg"
                    />
                    <span className="text-base font-normal leading-[25.6px] text-[#d5dfff] [font-family:'IBM_Plex_Sans',Helvetica]">
                      Borrowed on {new Date(book.borrowedDate).toDateString()}
                    </span>
                  </div>

                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1">
                      {book.status.type === "due" && (
                        <img
                          className="size-[18px]"
                          alt="Clock icon"
                          src="https://c.animaapp.com/m8soetyfkBQt6N/img/frame.svg"
                        />
                      )}
                      {book.status.type === "overdue" && (
                        <img
                          className="size-[18px]"
                          alt="Warning icon"
                          src="https://c.animaapp.com/m8soetyfkBQt6N/img/vuesax-outline-warning-2.svg"
                        />
                      )}
                      {book.status.type === "returned" && (
                        <img
                          className="size-[18px]"
                          alt="Check icon"
                          src="https://c.animaapp.com/m8soetyfkBQt6N/img/vuesax-outline-tick-circle.svg"
                        />
                      )}
                      <span
                        className={`text-base font-normal leading-[25.6px] [font-family:'IBM_Plex_Sans',Helvetica] ${book.status.type === "overdue" ? "text-[#ff6c6e]" : "text-[#d5dfff]"}`}
                      >
                        {book.status.text}
                      </span>
                    </div>

                    <button
                      className={`${book.bgColor} flex size-[26px] items-center justify-center rounded`}
                    >
                      <img
                        className="size-4"
                        alt="Receipt icon"
                        src="https://c.animaapp.com/m8soetyfkBQt6N/img/vuesax-outline-receipt-text.svg"
                      />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
