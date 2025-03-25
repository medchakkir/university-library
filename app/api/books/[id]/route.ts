import { NextResponse } from "next/server";
import { books } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;

    // Ensure ID exists
    if (!id) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 },
      );
    }

    // Delete the book
    await db.delete(books).where(eq(books.id, id));

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
