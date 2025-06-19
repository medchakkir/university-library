"use server";

import { users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { ApiResponse, createSuccessResponse, handleError } from "@/lib/utils";
import { User, UserParams } from "@/types";

export const createUser = async (params: UserParams): Promise<ApiResponse<User>> => {
  try {
    const newUser = await db
      .insert(users)
      .values({
        ...params,
      })
      .returning();

    return createSuccessResponse(
      JSON.parse(JSON.stringify(newUser[0])),
      "User created successfully"
    );
  } catch (error) {
    return handleError(error, "An error occurred while creating the user");
  }
};

export const updateUser = async (id: string, params: UserParams): Promise<ApiResponse<User>> => {
  try {
    const updatedUser = await db
      .update(users)
      .set({
        ...params,
      })
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser.length) {
      return handleError("User not found", "User not found", false);
    }

    return createSuccessResponse(
      JSON.parse(JSON.stringify(updatedUser[0])),
      "User updated successfully"
    );
  } catch (error) {
    return handleError(error, "An error occurred while updating the user");
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user[0] || null;
  } catch (error) {
    return handleError(error, "Failed to fetch user", true).error as unknown as null;
  }
};
