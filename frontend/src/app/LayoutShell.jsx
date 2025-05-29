"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const hideNavFooter = [
    "/login",
    "/verifySignIn",
    "/verifySignUp",
    "/dashboard",
    "/bonusScore",
    "/profile",
    "/contact",
    "/changePhone",
  ].some((route) => pathname.startsWith(route));

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main>{children}</main>
      {!hideNavFooter && <Footer />}
    </>
  );
}
