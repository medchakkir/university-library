import { NextResponse } from "next/server";
import { borrowRecords, users } from "@/database/schema";
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
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    // Delete borrowed records associated with the user
    await db.delete(borrowRecords).where(eq(borrowRecords.userId, id));

    // Delete the user
    await db.delete(users).where(eq(users.id, id));

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
