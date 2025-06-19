import Link from "next/link";
import Image from "next/image";
import { Book, Search, Download, Smartphone } from "lucide-react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import BookCover from "@/components/BookCover";
import { Book as BookType } from "@/types";

const Home = async () => {
  // Fetch featured books from the database
  const featuredBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))
    .limit(3)) as BookType[];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background gradient elements */}
        <div className="absolute -left-40 -top-40 size-80 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute -right-40 top-40 size-80 rounded-full bg-blue-100/20 blur-[100px]" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="flex-1 text-center md:text-left">
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Your Gateway to <span className="text-primary">Infinite</span>{" "}
                Knowledge
              </h1>
              <p className="mb-8 text-lg text-light-100 md:max-w-md">
                Explore 10,000+ free e-books, audiobooks, and research
                papers—curated for curious minds.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/library"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-dark-100 transition-all hover:bg-primary/90"
                >
                  <Book className="size-5" />
                  Browse Library
                </Link>
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-light-100/20 bg-dark-300/50 px-6 py-3 font-medium text-light-100 backdrop-blur-sm transition-all hover:bg-dark-300"
                >
                  <Search className="size-5" />
                  Search Books
                </Link>
              </div>
            </div>

            <div className="relative flex-1 pt-8 md:pt-0">
              <div className="relative h-[350px] w-full">
                {featuredBooks.length >= 3 ? (
                  <>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative h-[280px] w-[200px] rotate-12 transition-all hover:rotate-6">
                        <BookCover
                          coverColor={featuredBooks[0].coverColor}
                          coverImage={featuredBooks[0].coverUrl}
                        />
                      </div>
                    </div>
                    <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative h-[280px] w-[200px] -rotate-12 transition-all hover:-rotate-6">
                        <BookCover
                          coverColor={featuredBooks[1].coverColor}
                          coverImage={featuredBooks[1].coverUrl}
                        />
                      </div>
                    </div>
                    <div className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative h-[280px] w-[200px] rotate-[20deg] transition-all hover:rotate-[15deg]">
                        <BookCover
                          coverColor={featuredBooks[2].coverColor}
                          coverImage={featuredBooks[2].coverUrl}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-light-100">Featured books coming soon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
              Features
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Why Choose Our Library?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Download className="size-8" />,
                title: "Offline Access",
                desc: "Download and read anytime, anywhere, even without internet connection.",
              },
              {
                icon: <Search className="size-8" />,
                title: "Smart Search",
                desc: "Find books by title, author, genre, or even specific topics and themes.",
              },
              {
                icon: <Smartphone className="size-8" />,
                title: "Sync Across Devices",
                desc: "Start reading on one device and continue seamlessly on another.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-light-100/10 bg-dark-700/50 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-dark-700"
              >
                <div className="absolute -right-20 -top-20 size-40 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />
                <div className="relative">
                  <div className="mb-5 flex size-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-light-100">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative overflow-hidden py-20">
        {/* Background gradient elements */}
        <div className="absolute -bottom-40 -right-40 size-80 rounded-full bg-primary/10 blur-[100px]" />

        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              What Readers Say
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "This library saved me hundreds on textbooks! The interface is clean and easy to navigate.",
                author: "Maria Johnson",
                role: "Computer Science Student",
                avatar: "https://i.pravatar.cc/100?img=1",
              },
              {
                quote:
                  "The best collection of classics I've found online. The reading experience is smooth and enjoyable.",
                author: "James Wilson",
                role: "Book Club Organizer",
                avatar: "https://i.pravatar.cc/100?img=2",
              },
              {
                quote:
                  "It was a game-changer for my studies. I can access all my research materials in one place.",
                author: "Sarah Thompson",
                role: "PhD Candidate",
                avatar: "https://i.pravatar.cc/100?img=3",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-xl border border-light-100/10 bg-dark-700/50 p-8 backdrop-blur-sm transition-all hover:border-light-100/20"
              >
                <div className="mb-6 flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-light-100">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mb-4 text-light-100">
                  &#34;{testimonial.quote}&#34;
                </p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="size-5 fill-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15.585l-7.07 4.138a1 1 0 01-1.447-1.052l1.356-7.91-5.73-5.583a1 1 0 01.553-1.706l7.915-1.15 3.536-7.165a1 1 0 011.789 0l3.535 7.165 7.916 1.15a1 1 0 01.553 1.706l-5.73 5.583 1.356 7.91a1 1 0 01-1.447 1.052L10 15.585z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-light-100/10 bg-dark-700/30 p-10 backdrop-blur-sm">
            <div className="grid gap-10 md:grid-cols-3">
              {[
                { value: "10,000+", label: "Books Available" },
                { value: "50,000+", label: "Active Readers" },
                { value: "24/7", label: "Free Access" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="mb-2 text-5xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xl text-light-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-center">
            <h2 className="mb-6 text-center text-3xl font-bold text-white md:text-4xl">
              Ready to Start Reading?
            </h2>
            <Link
              href="/library"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 font-medium text-dark-100 transition-all hover:bg-primary/90"
            >
              <Book className="size-5" />
              Explore Our Collection
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
