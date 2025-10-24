"use client";

import { StudentHeader } from "~/components/ui/StudentHeader";
import { FarcasterAutoConnect } from "~/components/FarcasterAutoConnect";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FarcasterAutoConnect />
      <StudentHeader />
      {children}
    </>
  );
}
