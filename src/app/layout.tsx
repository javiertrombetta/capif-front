import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import StoreProvider from "./StoreProvider";
import "../styles/globals.css";

const ptSans = PT_Sans({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Capif Git",
  description: "",
};
const initialUsers = [{ id: 1, fullName: "", email: "" }];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ptSans.className}>
        <StoreProvider initialUser={initialUsers}>
          {<div>{<Navbar>{children}</Navbar>}</div>}
        </StoreProvider>
      </body>
    </html>
  );
}
