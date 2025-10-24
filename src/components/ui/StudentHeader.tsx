"use client";

import Link from "next/link";
import { ProfileMenu } from "~/components/ui/ProfileMenu";

export function StudentHeader() {
  return (
    <header className="backdrop-blur-md bg-gray-950/90 border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Student Grant Hub
            </h1>
          </Link>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
