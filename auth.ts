import NextAuth, { User } from "next-auth";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/database/drizzle";
import { users, organizations } from "@/database/schema";
import { eq, and } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: undefined, // Session cookie: deleted when the browser is closed
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        organizationSlug: { label: "Organization", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password || !credentials?.organizationSlug) {
            throw new Error("Email, password, and organization are required");
          }

          // First, find the organization
          const organization = await db
            .select()
            .from(organizations)
            .where(eq(organizations.slug, credentials.organizationSlug.toString()))
            .limit(1);

          if (organization.length === 0) {
            throw new Error("Organization not found");
          }

          if (!organization[0].isActive) {
            throw new Error("Organization is not active");
          }

          // Then find the user within that organization
          const user = await db
            .select()
            .from(users)
            .where(and(
              eq(users.email, credentials.email.toString()),
              eq(users.organizationId, organization[0].id)
            ))
            .limit(1);

          if (user.length === 0) {
            throw new Error("User not found in this organization");
          }

          if (!user[0].isActive) {
            throw new Error("User account is not active");
          }

          const isPasswordValid = await compare(
            credentials.password.toString(),
            user[0].password,
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user[0].id.toString(),
            email: user[0].email,
            name: user[0].fullName,
            role: user[0].role,
            organizationId: organization[0].id,
            organizationName: organization[0].name,
            organizationSlug: organization[0].slug,
          } as User;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.organizationId = user.organizationId;
        token.organizationName = user.organizationName;
        token.organizationSlug = user.organizationSlug;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.user.organizationId = token.organizationId as string;
        session.user.organizationName = token.organizationName as string;
        session.user.organizationSlug = token.organizationSlug as string;
      }

      return session;
    },
  },
});
