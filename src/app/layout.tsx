import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import StoreProvider from "./StoreProvider";
import ModalProvider from "@/components/ModalProvider/ModalProvider";
import { initialStateModal } from "@/store/modalSlice";
import "../styles/globals.css";
import { initialStateSignup } from "@/store/signupSlice";
import { authDefaultState } from "@/store/authSlice";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { ToastContainer } from "react-toastify";
import { initialStateCreatePhonogram } from "@/store/createPhonogramSlice";
const ptSans = PT_Sans({ weight: ["400", "700"], subsets: ["latin"] });

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
          initialCreatePhonogram={initialStateCreatePhonogram}
          initialAuth={authDefaultState}
          initialModal={initialStateModal}
          initialSignup={initialStateSignup}
        >
          <ModalProvider>
            <AuthProvider>
              <Navbar>{children}</Navbar>
            </AuthProvider>
            <ToastContainer position="bottom-right" />
          </ModalProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
