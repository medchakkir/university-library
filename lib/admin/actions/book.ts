"use server";

import { books } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { ApiResponse, createSuccessResponse, handleError } from "@/lib/utils";
import { Book, BookParams } from "@/types";

export const createBook = async (params: BookParams): Promise<ApiResponse<Book>> => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return createSuccessResponse(
      JSON.parse(JSON.stringify(newBook[0])),
      "Book created successfully"
    );
  } catch (error) {
    return handleError(error, "An error occurred while creating the book");
  }
};

export const updateBook = async (id: string, params: BookParams): Promise<ApiResponse<Book>> => {
  try {
    const updatedBook = await db
      .update(books)
      .set({
        ...params,
        availableCopies: params.totalCopies, // Sync availableCopies with totalCopies if needed
      })
      .where(eq(books.id, id))
      .returning();

    if (!updatedBook.length) {
      return handleError("Book not found", "Book not found", false);
    }

    return createSuccessResponse(
      JSON.parse(JSON.stringify(updatedBook[0])),
      "Book updated successfully"
    );
  } catch (error) {
    return handleError(error, "An error occurred while updating the book");
  }
};

export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    const book = await db.select().from(books).where(eq(books.id, id)).limit(1);
    return book[0] || null;
  } catch (error) {
    console.error("Failed to fetch book:", error);
    return null;
  }
};
