import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-8 text-center">
      <Image
        src="/icons/warning.svg"
        alt="Page not found"
        width={64}
        height={64}
        className="mb-4"
      />
      <h2 className="text-3xl font-bold text-blue-600">404 - Page Not Found</h2>
      <p className="max-w-md text-gray-600">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-6">
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/">Back to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
