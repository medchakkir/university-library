"use server";

import { users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export const createUser = async (params: UserParams) => {
  try {
    const newUser = await db
      .insert(users)
      .values({
        ...params,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the user",
    };
  }
};

export const updateUser = async (id: string, params: UserParams) => {
  try {
    const updatedUser = await db
      .update(users)
      .set({
        ...params,
      })
      .where(eq(users.id, id))
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedUser[0])),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "An error occurred while updating the user",
    };
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};
