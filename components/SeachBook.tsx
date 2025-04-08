"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BookCover from "@/components/BookCover";

const BOOKS_PER_PAGE = 12;

const SearchBook = ({ books }: { books: Book[] }) => {
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const genres = useMemo(() => {
    const unique = new Set(books.map((book) => book.genre));
    return Array.from(unique);
  }, [books]);

  const filteredBooks = useMemo(() => {
    const query = search.toLowerCase();

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query);

      const matchesGenre =
        genreFilter === "all"
          ? true
          : book.genre.toLowerCase() === genreFilter.toLowerCase();

      return matchesSearch && matchesGenre;
    });
  }, [search, genreFilter, books]);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE,
  );

  // Reset to page 1 when search or filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [search, genreFilter]);

  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="mx-auto mt-[122px] flex max-w-[630px] flex-col items-center gap-8">
        <div className="flex w-full flex-col items-center gap-3.5">
          <p className="text-center text-lg font-semibold leading-7 tracking-[1.80px] text-[#d5dfff]">
            DISCOVER YOUR NEXT GREAT READ:
          </p>
          <h2 className="text-center text-[56px] font-semibold leading-[64px]">
            <span className="text-white">Explore and Search for </span>
            <span className="text-[#ffe0bc]">Any Book</span>
            <span className="text-white"> In Our Library</span>
          </h2>
        </div>

        {/* Search Input */}
        <div className="flex w-full items-center rounded-[10px] bg-[#232738] p-5">
          <SearchIcon className="mr-2.5 size-7 text-white" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none bg-transparent p-0 text-4xl font-semibold text-white focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search for books..."
          />
        </div>
      </section>

      {/* Search Results Section */}
      <section className="mt-[100px] px-[100px]">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-white">Search Results</h3>
          <Select
            value={genreFilter}
            onValueChange={(value) => setGenreFilter(value)}
          >
            <SelectTrigger className="w-[180px] border-none bg-[#232738] text-white">
              <SelectValue placeholder="Filter by: Genre" />
            </SelectTrigger>
            <SelectContent className="bg-[#232738] text-white">
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Book Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {paginatedBooks.length > 0
            ? paginatedBooks.map((book) => (
                <Card
                  key={book.id}
                  className="overflow-hidden border-none bg-transparent"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      <div className="mb-2 h-[200px] overflow-hidden rounded-md">
                        <BookCover
                          coverColor={book.coverColor}
                          coverImage={book.coverUrl}
                          className="size-full object-cover"
                        />
                      </div>
                      <h4 className="mt-2 text-sm font-medium text-white">
                        {book.title} - By {book.author}
                      </h4>
                      <p className="text-xs text-[#d5dfff]">{book.genre}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            : "No books found."}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className="cursor-pointer text-white"
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    onClick={() => setCurrentPage(idx + 1)}
                    isActive={currentPage === idx + 1}
                    className={`cursor-pointer ${
                      currentPage === idx + 1
                        ? "bg-[#ffe0bc] text-[#101624]"
                        : "text-white"
                    }`}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className="cursor-pointer text-white"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
    </div>
  );
};

export default SearchBook;
