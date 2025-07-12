import "@/app/styles/globals.css";
import {Providers} from "@/app/provider";
import { NavBar } from "@/components/NavBar";
import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Counter Cheater",
  description: "Report and track Counter-Strike cheaters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text antialiased min-h-full">
        <NavBar />
        <Providers>
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}