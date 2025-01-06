import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Nacelle - Lyzzi Brooks",
  description: "A technical assessment for Nacelle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="px-8 py-4 flex justify-start gap-4">
          <Link href="/search" className="hover:text-pink-400">Search</Link>
          <Link href="/modal" className="hover:text-pink-400">Modal</Link>
        </header>
        <div className="justify-items-center px-8 py-2">
          {children}
        </div>
      </body>
    </html>
  );
}
