"use client";
import styles from "./dashboard.module.css";
import { useRouter } from "next/navigation";

// Мaterial Icons ашиглах бол: npm install @mui/icons-material @mui/material @emotion/react @emotion/styled
import LogoutIcon from "@mui/icons-material/Logout";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/admin/login");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span></span>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogoutIcon className={styles.logoutIcon} />
          <span className={styles.logoutText}>Гарах</span>
        </button>
      </div>

      <div className={styles.center}>
        <div className={styles.logoImg}>
          <img src="/login.png" alt="GoService Logo" />
        </div>

        <button
          className={styles.greenBtn}
          onClick={() => router.push("/admin/bookings")}
        >
          Цаг захиалгууд харах
        </button>
        <button
          className={styles.greenBtn}
          onClick={() => router.push("/admin/insertService")}
        >
          Үйлчилгээг оруулах
        </button>
      </div>
    </div>
  );
}
