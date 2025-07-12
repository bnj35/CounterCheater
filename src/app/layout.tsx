import "@/app/styles/globals.css";
import {Providers} from "@/app/provider";
import { NavBar } from "@/components/NavBar";
import type { Metadata } from "next";

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
      <body>
        <Providers>
          <NavBar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}