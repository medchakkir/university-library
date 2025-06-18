"use client";

import { Book, Home, LogIn, Search, UserPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const PublicHeader = () => {
  const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <span className="hidden text-2xl font-semibold text-light-100 sm:inline">
          Bookwise
        </span>
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/"
            className={cn(
              "text-base cursor-pointer capitalize flex items-center gap-2",
              pathname === "/" ? "text-light-200" : "text-light-100",
            )}
          >
            <Home className="size-4" />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className={cn(
              "text-base cursor-pointer capitalize flex items-center gap-2",
              pathname === "/search" ? "text-light-200" : "text-light-100",
            )}
          >
            <Search className="size-4" />
            Search
          </Link>
        </li>
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize flex items-center gap-2",
              pathname === "/library" ? "text-light-200" : "text-light-100",
            )}
          >
            <Book className="size-4" />
            Library
          </Link>
        </li>

        <li>
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <LogIn className="size-4" />
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="flex items-center gap-1">
                <UserPlus className="size-4" />
                Sign Up
              </Button>
            </Link>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default PublicHeader; 