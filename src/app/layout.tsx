import type { Metadata } from "next";
import { Toaster } from "sonner";

import "~/app/globals.css";
import { Providers } from "~/app/providers";
import { APP_NAME, APP_DESCRIPTION } from "~/lib/constants";
import { LayoutContent } from "~/components/LayoutContent";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <LayoutContent>{children}</LayoutContent>
          <Toaster 
            position="top-right" 
            richColors 
            closeButton
            duration={4000}
          />
        </Providers>
      </body>
    </html>
  );
}
