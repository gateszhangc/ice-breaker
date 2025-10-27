import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="text-center px-4">
        <h1 className="text-8xl font-black text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🔍 Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for
        </p>
        <Link href="/">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
