import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string;
    email?: string;
    role: string;
    organizationId: string;
    organizationName: string;
    organizationSlug: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      role: string;
      organizationId: string;
      organizationName: string;
      organizationSlug: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string;
    role: string;
    organizationId: string;
    organizationName: string;
    organizationSlug: string;
  }
}
