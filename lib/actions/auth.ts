"use server";

import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "@/lib/workflow";
import config from "@/lib/config";
import { ApiResponse, createSuccessResponse, handleError } from "@/lib/utils";
import { AuthCredentials } from "@/types";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
): Promise<ApiResponse> => {
  const { email, password } = params;

  try {
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) return redirect("/too-fast");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return handleError(result.error, "Invalid credentials", false);
    }

    return createSuccessResponse(undefined, "Signed in successfully");
  } catch (error) {
    return handleError(error, "Sign-in error");
  }
};

export const signUp = async (params: AuthCredentials): Promise<ApiResponse> => {
  const { fullName, email, password, profilePicture } = params;

  try {
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) return redirect("/too-fast");

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return handleError("User already exists", "User already exists", false);
    }

    const hashedPassword = await hash(password, 10);

    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      profilePicture,
    });

    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    await signInWithCredentials({ email, password });

    return createSuccessResponse(undefined, "Signed up successfully");
  } catch (error) {
    return handleError(error, "Sign-up error");
  }
};

export const handleSignOut = async (): Promise<void> => {
  await signOut();
};
