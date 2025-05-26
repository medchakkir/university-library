"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import dayjs from "dayjs";

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};

export const returnBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const record = await db
      .select()
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.bookId, bookId),
          eq(borrowRecords.status, "BORROWED"),
        ),
      )
      .limit(1);

    if (!record.length) {
      return {
        success: false,
        error: "No active borrow record found for this book and user",
      };
    }

    await db
      .update(borrowRecords)
      .set({ status: "RETURNED", returnDate: new Date().toDateString() })
      .where(eq(borrowRecords.id, record[0].id));

    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (book.length) {
      await db
        .update(books)
        .set({ availableCopies: book[0].availableCopies + 1 })
        .where(eq(books.id, bookId));
    }

    return {
      success: true,
      message: "Book returned successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while returning the book",
    };
  }
};
