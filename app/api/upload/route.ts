import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { mkdirSync, existsSync } from "fs";

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
    const uploadsDir = path.join(process.cwd(), "public/uploads");

    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);

    await writeFile(filePath, buffer);

    // Accessible path from browser
    const publicPath = `/uploads/${fileName}`;

    return NextResponse.json({ filePath: publicPath }, { status: 200 });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { message: "File upload failed", error: err.message },
      { status: 500 },
    );
  }
}
