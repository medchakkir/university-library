import BookCard from "@/components/BookCard";
import { Book } from "@/types";

/**
 * Props interface for the BookList component
 */
interface BookListProps {
  /** The title to display above the book list */
  title: string;
  /** Array of books to display in the list */
  books: Book[];
  /** Optional CSS class name for the container */
  containerClassName?: string;
}

/**
 * BookList component that displays a list of books with a title
 * @param {BookListProps} props - The component props
 * @returns {JSX.Element | null} The rendered component or null if there are fewer than 2 books
 */
const BookList = ({ title, books, containerClassName }: BookListProps) => {
  if (books.length < 2) return null;

  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book, index) => (
          <BookCard key={`${book.id}-${index}`} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
