import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "My Auth App",
  description: "Authentication App ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-screen h-screen flex flex-col antialiased`}>
        <Navbar />
        <div className="h-full flex items-center justify-center w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
