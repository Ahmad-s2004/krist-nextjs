import { Geist, Geist_Mono } from "next/font/google";
import HeaderNavbar from "@/components/navigation/HeaderNavbar";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Krist Ecommerce | Premium App",
  description: "Curated modern retail experiences architecture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-800">
        <HeaderNavbar />
        <main className="flex-1">
          {children}
        </main>

      </body>
    </html>
  );
}