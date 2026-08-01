import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/Navbar";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaurav Kaklotar | Developer Portfolio",
  description: "Portfolio of Gaurav Kaklotar, Software Developer specializing in Next.js, Django, and FastAPI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-[#f5f5f5]`}
      >
        <CustomCursor />
        <Navbar />
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  );
}

