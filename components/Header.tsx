"use client";

import { LogOut, Book, User, Shield, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { handleSignOut } from "@/lib/actions/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = ({ session }: { session: Session }) => {
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback className="bg-amber-100">
                  {getInitials(session?.user?.name || "CN")}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="size-4" /> {/* Profile Icon */}
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>

              {session.user.role === "ADMIN" && ( // Conditionally show Admin link
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-2">
                      <Shield className="size-4" /> {/* Admin Icon */}
                      <span>Admin</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button
                  onClick={handleSignOut}
                  type="submit"
                  className="m-0 flex w-full cursor-pointer items-center p-[1/2] text-left text-sm font-normal text-black focus:bg-accent focus:text-accent-foreground"
                >
                  <LogOut className="size-4" /> {/* Log-Out Icon */}
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </header>
  );
};

export default Header;
