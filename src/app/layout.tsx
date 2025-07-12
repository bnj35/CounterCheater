import "@/app/styles/globals.css";
import {Providers} from "@/app/provider";
import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";

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
        <Header />
        <Providers>
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}