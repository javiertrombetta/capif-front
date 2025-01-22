import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import StoreProvider from "./StoreProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import ModalProvider from "@/components/ModalProvider/ModalProvider";
import { initialStateModal } from "@/store/modalSlice";
import "../styles/globals.css";
import { initialStateSignup } from "@/store/signupSlice";
import { authDefaultState } from "@/store/authSlice";

const ptSans = PT_Sans({ weight: "400", subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Capif Git",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ptSans.className}>
        <StoreProvider
          initialAuth={authDefaultState}
          initialModal={initialStateModal}
          initialSignup={initialStateSignup}
        >
          <AuthProvider>
            <Navbar>
              <ModalProvider>{children}</ModalProvider>
            </Navbar>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
