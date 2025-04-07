"use client";
import { HeartHandshake } from "lucide-react";
import { ModeToggle } from "./modeToggle";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="fixed top-0 w-full backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={"/"}>
          <div className="flex items-center space-x-2">
            <HeartHandshake />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              MedLink
            </span>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.push("/about")}>
            About
          </Button>
          <Button variant="ghost" onClick={() => router.push("/features")}>
            Features
          </Button>
          <Button variant="ghost" onClick={() => router.push("/contact")}>
            Contact
          </Button>
          <ModeToggle />
          <Button onClick={() => router.push("/auth")}>Sign In</Button>
        </div>
      </div>
    </nav>
  );
};
