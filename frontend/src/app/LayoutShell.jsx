"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { checkToken } from "@/api/auth";
import { useUser } from "@/context/UserContext";
import styles from "./layoutShell.module.css";

export default function LayoutShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser } = useUser();

  const publicRoutes = [
    "/", "/login", "/verifySignUp", "/verifySignIn", "/about",
    "/admin", "/admin/login", "/admin/register"
  ];

  const hideNavFooterRoutes = [
    "/login", "/verifySignIn", "/verifySignUp", "/dashboard",
    "/bonusScore", "/profile", "/contact", "/changePhone",
    "/booking", "/addCar", "/admin", "/notification"
  ];

  const ifHideNavFooter = hideNavFooterRoutes.some(route =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isPublic = publicRoutes.includes(pathname);

    if (!token && !isPublic) {
      router.replace("/404");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await checkToken({ token });
        setUser(response.user);
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/");
      }
    };

    if (token) {
      verifyToken();
    }
  }, [pathname]);

  if (ifHideNavFooter) {
    return <main>{children}</main>;
  }

  return (
    <div className={styles.layoutShellWrapper}>
      <Navbar />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
}
