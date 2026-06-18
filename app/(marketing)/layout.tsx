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
interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout( {children}: RootLayoutProps ) {
  return (
    <>
        <HeaderNavbar />
        <main className="flex-1">
          {children}
        </main>
    </>
  );
}