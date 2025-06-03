"use client";
import { useState } from "react";
import {
  Menu,
  X,
  User,
  Info,
  ClipboardList,
  Phone,
  LogOut,
  LogIn,
} from "lucide-react";
import styles from "./Nabvar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* --- Desktop Navbar --- */}
      <nav className={styles.navbar}>
        <div className={styles.logoSection}>
          <img src="/login.png" alt="GoService Logo" className={styles.logo} />
        </div>
        <div className={styles.menu}>
          <a href="/" className={styles.menuBtn}>
            Нүүр хуудас
          </a>
          <a href="/aboutPage" className={styles.menuBtn}>
            Бидний тухай
          </a>
          <a href="/admin/login" className={styles.menuBtn}>
            Админ
          </a>
          <a href="/contact" className={styles.menuBtn}>
            Холбоо барих
          </a>
          <a href="/login" className={styles.menuBtn}>
            Нэвтрэх
          </a>
        </div>
      </nav>

      {/* --- Mobile Navbar --- */}
      <div className={styles.mobileNav}>
        <div className={styles.mobileHeader}>
          <button className={styles.menuIcon} onClick={() => setOpen(true)}>
            <Menu size={28} />
          </button>
          <img
            src="/login.png"
            alt="GoService Logo"
            className={styles.mobileLogo}
          />
        </div>

        {/* Top Drawer Overlay */}
        {open && (
          <>
            <div
              className={styles.drawerOverlay}
              onClick={() => setOpen(false)}
            />
            <div className={styles.topDrawer}>
              <div className={styles.drawerHeader}>
                <img
                  src="/login.png"
                  alt="GoService Logo"
                  className={styles.drawerLogo}
                />
                <button
                  className={styles.closeBtn}
                  onClick={() => setOpen(false)}
                >
                  <X size={28} />
                </button>
              </div>
              <div className={styles.drawerMenu}>
                <a href="/" className={styles.drawerLink}>
                  <User size={22} color="green" /> Нүүр хуудас
                </a>
                <a href="/aboutPage" className={styles.drawerLink}>
                  <Info size={22} color="green" /> Бидний тухай
                </a>
                <a href="/admin/login" className={styles.drawerLink}>
                  <ClipboardList size={22} color="green" /> Админ
                </a>
                <a href="/contact" className={styles.drawerLink}>
                  <Phone size={22} color="green" /> Холбоо барих
                </a>
                <a
                  href="/login"
                  className={styles.drawerLink + " " + styles.loginLink}
                >
                  <LogIn size={22} /> Нэвтрэх
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
