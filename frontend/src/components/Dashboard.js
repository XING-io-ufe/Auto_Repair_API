"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/dashboard.module.css";
import { useRouter } from "next/navigation";

import { getUserBonus } from "@/api/bonus";
import { logout } from "@/utils/logout";
import { useUser } from "../context/UserContext";

export default function Dashboard({
  bonusRoute,
  toHome,
  toProfile,
  toContact,
  toChangePhone,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const [bonus, setBonus] = useState("");
  const myCars = [];
  const { user } = useUser();



  function navigateTo(path) {
    router.push(path);
  }
  useEffect(() => {
    const fetchBonus = async () => {
      try {
        const token = localStorage.getItem("token");
        const bonusPoint = await getUserBonus(token);
        setBonus(bonusPoint);
      } catch (err) {
        console.error("Бонус оноо олдсонгүй!", error);
      }
    }
    fetchBonus();
  }, []);



  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.topbar}>
          <button
            className={styles.iconBtn}
            onClick={() => setDrawerOpen(true)}
          >
            <span role="img" aria-label="profile">
              👤
            </span>
          </button>
          <span className={styles.userName}>{user?.name || "Нэвтрээгүй"}</span>
          <button className={styles.iconBtn}>
            <span role="img" aria-label="bell">
              🔔
            </span>
          </button>
        </div>

        {drawerOpen && (
          <div
            className={styles.drawerOverlay}
            onClick={() => setDrawerOpen(false)}
          >
            <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.drawerBack}
                onClick={() => setDrawerOpen(false)}
              >
                ←
              </button>
              <ul>
                <li onClick={() => navigateTo(toProfile)}>
                  <span>👤</span> Хувийн мэдээлэл
                </li>
                <li onClick={() => navigateTo(toContact)}>
                  <span>📞</span> Холбоо барих
                </li>
                <li onClick={() => navigateTo(toChangePhone)}>
                  <span>📱</span> Утасны дугаар өөрчлөх
                </li>
                <li
                  className={styles.logout}
                  onClick={() => logout()}
                >
                  <span style={{ color: "#f23" }}>🚪</span> Гарах
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className={styles.content}>
          <div
            className={styles.bonusBox}
            onClick={() => navigateTo(bonusRoute)}
          >
            <div>
              <div className={styles.bonusLabel}>Бонус оноо</div>
              <div className={styles.bonusValue}>{bonus}</div>
            </div>
            <div className={styles.barcode}>
              <img src="/barcode.svg" alt="barcode" />
            </div>
          </div>

          <button className={styles.timeOrderBtn}>
            <span role="img" aria-label="clock">
              ⏰
            </span>{" "}
            Цаг захиалах
          </button>

          <div className={styles.myCarsSection}>
            <div>Миний машинууд</div>
            <button className={styles.addCarBtn}>+ Машин нэмэх</button>
          </div>

          <div className={styles.serviceSection}>
            <div className={styles.serviceHeader}>Хугацаат үйлчилгэээнүүд</div>
            <div className={styles.serviceEmpty}>
              <span role="img" aria-label="book">
                📖
              </span>
              <div className={styles.serviceTitle}>Хугацаат үйлчилгэээнүүд</div>
              <div>Одоогоор хугацаат үйлчилгээ байхгүй байна</div>
            </div>
          </div>
        </div>

        <nav className={styles.bottomNav}>
          <button>
            🏠
            <br />
            Нүүр
          </button>
          <button>
            📜
            <br />
            Түүх
          </button>
          <button>
            🪪
            <br />
            Гишүүнчлэл
          </button>
        </nav>
      </div>
    </div>
  );
}
