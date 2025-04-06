import BookCover from "@/components/BookCover";

const SimilarBooks = ({ books }: { books: Book[] }) => {
  return (
    <div className="p-4">
      <h2 className="mb-4 font-bebas-neue text-4xl text-light-100">
        Similar Books
      </h2>
      <div className="grid grid-cols-2 gap-12">
        {books.map((book, index) => (
          <div key={index} className="flex flex-col items-center">
            <BookCover
              className="mb-2 h-48 w-32 object-cover"
              coverColor={book.coverColor}
              coverImage={book.coverUrl}
            />

            {/*<div className="text-center">
              <p className="text-lg font-semibold">{book.title}</p>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>*/}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarBooks;
