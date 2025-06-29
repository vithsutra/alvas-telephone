import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Protected from "@/hooks/protection/protection";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Admin Panel",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body
        className={`${inter.className} `}
      >
        <Protected>
        {children}
        </Protected>
        <Toaster />
      </body>
    </html>
  );
}
