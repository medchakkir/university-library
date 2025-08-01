import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LibraryOS - Modern Library Management Made Simple",
  description: "Transform your library operations with our comprehensive SaaS platform. Manage books, users, and borrowing records with ease. Perfect for universities, schools, and public libraries.",
  keywords: "library management, library software, book management, university library, school library, SaaS",
  openGraph: {
    title: "LibraryOS - Modern Library Management Made Simple",
    description: "Transform your library operations with our comprehensive SaaS platform.",
    type: "website",
    url: "https://libraryos.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "LibraryOS - Modern Library Management Made Simple",
    description: "Transform your library operations with our comprehensive SaaS platform.",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
