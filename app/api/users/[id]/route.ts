import { NextResponse } from "next/server";
import { borrowRecords, users } from "@/database/schema";
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
        handleError("User ID is required", "User ID is required", false),
        { status: 400 },
      );
    }

    // Delete borrowed records associated with the user
    await db.delete(borrowRecords).where(eq(borrowRecords.userId, id));

    // Delete the user
    await db.delete(users).where(eq(users.id, id));

    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    const errorResponse = handleError(error, "Internal Server Error");
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
