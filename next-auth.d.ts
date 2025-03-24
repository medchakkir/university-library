import "next-auth"; // This line is optional and can be removed

declare module "next-auth" {
  interface User {
    id: string;
    name?: string;
    email?: string;
    role: string; // Add the `role` property
  }

  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      role: string; // Add the `role` property
    };
  }
}
