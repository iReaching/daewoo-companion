import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Daewoo Air Fryer Oven Companion",
  description: "Quick cooking guide, troubleshooting, and manual reference for Daewoo 16L Air Fryer Oven DRAF01-16CRMSL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-gray-50 text-gray-900 antialiased`}>
        <div className="flex min-h-screen">
          <Navigation />
          <main className="flex-1 md:ml-64 pb-20 md:pb-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
