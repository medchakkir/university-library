import dummyBooks from "../dummybooks.json";
import { books } from "@/database/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import axios from "axios";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const uploadToDb = async (url: string, fileName: string, folder: string) => {
  const folderPath = path.resolve(folder);
  const filePath = path.join(folderPath, fileName);

  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const response = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, response.data);

    // Return path relative to public folder
    return `${folder.replace("./public", "")}/${fileName}`;
  } catch (error) {
    console.error(`Error downloading/saving ${fileName}:`, error);
    return "";
  }
};

const seed = async () => {
  console.log("Seeding data...");

  try {
    for (const book of dummyBooks) {
      const baseName = book.title.replace(/\s+/g, "_");

      const coverUrl = await uploadToDb(
        book.coverUrl,
        `${baseName}.jpg`,
        "./public/covers",
      );

      const videoUrl = await uploadToDb(
        book.videoUrl,
        `${baseName}.mp4`,
        "./public/videos",
      );

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });
    }

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seed();
