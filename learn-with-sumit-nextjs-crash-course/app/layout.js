import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Link href="/" className="text-blue-500 hover:underline" > Home </Link>
        <Link href="/about" className="text-blue-500 hover:underline ml-4"> About </Link>
        <Link href="/about/mission" className="text-blue-500 hover:underline ml-4" > Mission </Link>
        <Link href="/blogs" className="text-blue-500 hover:underline ml-4" > Blogs </Link>
        <Link href="/posts" className="text-blue-500 hover:underline ml-4" > Post </Link>
        {children}
      </body>
    </html>
  );
}
