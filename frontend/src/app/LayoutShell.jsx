"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { checkToken } from "@/api/auth";
import { useUser } from "@/context/UserContext";

export default function LayoutShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser } = useUser();

  const publicRoutes = ["/", "/login", "/verifySignUp", "/verifySignIn", "/about", "/intro"];
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !publicRoutes.includes(pathname)) {
      router.push("/");
      return;
    }
    const verifyToken = async () => {
      try {
        const response = await checkToken({ token });
        const user = response.user;
        setUser(user);
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/");
      }
    };

    if (token) {
      verifyToken();
    }

  }, [pathname, router, setUser]);

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main>{children}</main>
      {!hideNavFooter && <Footer />}
    </>
  );
}
