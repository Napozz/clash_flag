import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clash flags",
  description: "alol 1VS1 world flags",
  icons: "/world.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col justify-between min-h-screen bg-gradient-to-b from-sky-500 to-purple-600 ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
        <footer className="text-center p-2">© 2024 Clash Flags </footer>
      </body>
    </html>
  );
}
