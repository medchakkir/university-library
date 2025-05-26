import { Card, CardContent } from "@/components/ui/card";
import BookCover from "@/components/BookCover";
import Image from "next/image";
import ReturnBook from "@/components/ReturnBook"; // Import the ReturnBook component

export interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverImage: string;
  coverColor: string;
  borrowedDate: Date;
  returnedDate?: Date;
  status: {
    type: "returned" | "overdue" | "due";
    text: string;
  };
  bgColor: string;
}

interface BorrowedBooksListProps {
  borrowedBooks: BorrowedBook[];
  userId: string; // Add userId to props
}

const BorrowedBooksList = ({
  borrowedBooks,
  userId,
}: BorrowedBooksListProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {borrowedBooks.map((book) => (
        <Card
          key={book.id}
          className="relative flex w-full flex-col items-center gap-5 rounded-2xl p-5 shadow-[0px_0px_70px_#00000033] [background:linear-gradient(180deg,rgba(18,20,29,1)_0%,rgba(18,21,31,1)_100%)]"
        >
          {book.status.type === "overdue" && (
            <Image
              className="absolute -left-1 top-[-3px] z-10 size-[29px]"
              alt="Warning icon"
              src="/icons/warning.svg"
              width={29}
              height={29}
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
            <h3 className="font-ibm-plex-sans text-xl font-semibold leading-6 text-white">
              {book.title} - By {book.author}
            </h3>
            <p className="font-ibm-plex-sans text-base font-normal italic leading-5 text-[#d5dfff]">
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
              <span className="font-ibm-plex-sans text-base font-normal leading-[25.6px] text-[#d5dfff]">
                Borrowed on {new Date(book.borrowedDate).toDateString()}
              </span>
            </div>

            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1">
                {book.status.type === "due" && (
                  <Image
                    src="/icons/clock.svg"
                    alt="Clock icon"
                    width={27}
                    height={27}
                  />
                )}
                {book.status.type === "overdue" && (
                  <Image
                    src="/icons/warning.svg"
                    alt="Warning icon"
                    width={37}
                    height={37}
                  />
                )}
                {book.status.type === "returned" && (
                  <Image
                    src="/icons/check.svg"
                    alt="Check icon"
                    width={25}
                    height={25}
                  />
                )}
                <span
                  className={`font-ibm-plex-sans text-base font-normal leading-[25.6px] ${
                    book.status.type === "overdue"
                      ? "text-[#ff6c6e]"
                      : "text-[#d5dfff]"
                  }`}
                >
                  {book.status.text}
                </span>
              </div>
            </div>
          </div>

          {/* Add ReturnBook button for books that are not returned */}
          {book.status.type !== "returned" && (
            <ReturnBook userId={userId} bookId={book.id} />
          )}
        </Card>
      ))}
    </div>
  );
};

export default BorrowedBooksList;
