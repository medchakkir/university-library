import { NextResponse } from "next/server";
import { books } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { handleError } from "@/lib/utils";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;

    // Ensure ID exists
    if (!id) {
      return NextResponse.json(
        handleError("Book ID is required", "Book ID is required", false),
        { status: 400 },
      );
    }

    // Delete the book
    await db.delete(books).where(eq(books.id, id));

    return NextResponse.json(
      { success: true, message: "Book deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    const errorResponse = handleError(error, "Internal Server Error");
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
