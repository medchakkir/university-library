import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Get folder from query params (like ?folder=books/videos)
    const folder = req.nextUrl.searchParams.get("folder") || "uploads";
    const uploadsDir = path.join(process.cwd(), "public", folder);

    // Make the folder if it doesn't exist
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    // Create a unique filename
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);

    // Write file to disk
    await writeFile(filePath, buffer);

    // Return a browser-friendly path
    const publicPath = `/${folder}/${fileName}`;

    return NextResponse.json({ filePath: publicPath }, { status: 200 });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { message: "File upload failed", error: err.message },
      { status: 500 },
    );
  }
}
