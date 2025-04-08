"use client";

import { ArrowLeftIcon, CalendarIcon, EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookDetails({ book }: { book: Book }) {
  const formattedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString()
    : "Unknown";

  return (
    <div className="mx-auto max-w-5xl space-y-10 bg-[#f8f8ff] py-6">
      {/* Back Button */}
      <Button variant="outline" className="flex items-center gap-2">
        <ArrowLeftIcon className="size-4" />
        <span className="text-sm font-medium text-[#3a354e]">Go back</span>
      </Button>

      {/* Top Content */}
      <div className="flex flex-col gap-10 md:flex-row">
        {/* Book Cover */}
        <div className="flex w-full items-center justify-center rounded-lg bg-[#c4214c1a] p-6 md:w-[266px]">
          <img
            src={book.coverUrl}
            alt="Book cover"
            className="h-[220px] w-auto rounded-md object-cover"
          />
        </div>

        {/* Book Info */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-3 text-slate-500">
            <span>Created at:</span>
            <div className="flex items-center gap-2 text-[#3a354e]">
              <CalendarIcon className="size-4" />
              <span className="text-sm">{formattedDate}</span>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-slate-800">
            {book.genre} - {book.title}
          </h2>
          <h3 className="text-lg font-semibold text-[#3a354e]">
            By {book.author}
          </h3>
          <p className="text-slate-500">{book.genre}</p>

          <Button className="flex w-fit gap-2 bg-primary font-bold text-white">
            <EditIcon className="size-4" />
            Edit Book
          </Button>
        </div>
      </div>

      {/* Summary & Video */}
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex-1">
          <h4 className="mb-2 text-base font-semibold text-slate-800">
            Summary
          </h4>
          <p className="leading-6 text-slate-500">{book.summary}</p>
        </div>

        <div className="w-full lg:w-[438px]">
          <h4 className="mb-2 text-base font-semibold text-slate-800">Video</h4>
          <div className="relative overflow-hidden rounded-lg">
            <video
              src={book.videoUrl}
              controls
              className="h-[254px] w-full rounded-lg object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
