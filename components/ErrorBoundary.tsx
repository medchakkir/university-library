"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-4 p-8 text-center">
      <Image
        src="/icons/warning.svg"
        alt="Error"
        width={64}
        height={64}
        className="mb-4"
      />
      <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
      <p className="max-w-md text-gray-600">
        {error.message ||
          "An unexpected error occurred. Please try again later."}
      </p>
      <div className="mt-6 flex gap-4">
        <Button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Try again
        </Button>
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Go to homepage
        </Button>
      </div>
    </div>
  );
}
