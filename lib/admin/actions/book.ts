"use server";

import { books } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};

export const updateBook = async (id: string, params: BookParams) => {
  try {
    const updatedBook = await db
      .update(books)
      .set({
        ...params,
        availableCopies: params.totalCopies, // Sync availableCopies with totalCopies if needed
      })
      .where(eq(books.id, id))
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedBook[0])),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "An error occurred while updating the book",
    };
  }
};

export const getBookById = async (id: string) => {
  try {
    const book = await db.select().from(books).where(eq(books.id, id)).limit(1);
    return book[0];
  } catch (error) {
    console.error("Failed to fetch book:", error);
    return null;
  }
};
