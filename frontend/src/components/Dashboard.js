"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/dashboard.module.css";
import { useRouter } from "next/navigation";
import {
  User,
  Bell,
  ChevronLeft,
  UserCircle,
  Phone,
  Smartphone,
  LogOut,
  Clock,
  Car,
  BookText,
  Home,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { getUserBonus } from "@/api/bonus";
import { logout } from "@/utils/logout";
import { useUser } from "../context/UserContext";

export default function Dashboard({
  bonusRoute,
  toHome,
  toProfile,
  toContact,
  toChangePhone,
  toBooking,
  toAddCar,
  toNotification,
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
        router.push('/');
        console.log("Бонус оноо олдсонгүй!");
      }
    }
    fetchBonus();
  }, []);



  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* --- Topbar --- */}
        <div className={styles.topbar}>
          <div>
            <button
              className={styles.iconBtn}
              onClick={() => setDrawerOpen(true)}
              aria-label="Profile drawer"
            >
              <User size={26} />
            </button>

            <span className={styles.userName}>{user?.name || "Нэвтрээгүй"}</span>
          </div>
          <button
            className={styles.iconBtn}
            aria-label="Notifications"
            onClick={() => navigateTo(toNotification)}
          >
            <Bell size={25} />
          </button>
        </div>
        {/* --- Drawer --- */}
        {drawerOpen && (
          <div
            className={styles.drawerOverlay}
            onClick={() => setDrawerOpen(false)}
          >
            <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.drawerBack}
                onClick={() => setDrawerOpen(false)}
                aria-label="Back"
              >
                <ChevronLeft size={22} />
              </button>
              <ul>
                <li onClick={() => navigateTo(toProfile)}>
                  <UserCircle size={20} style={{ color: "green" }} /> Хувийн мэдээлэл
                </li>
                <li onClick={() => navigateTo(toContact)}>
                  <Phone size={20} style={{ color: "green" }} /> Холбоо барих
                </li>
                <li onClick={() => navigateTo(toChangePhone)}>
                  <Smartphone size={20} style={{ color: "green" }} /> Утасны дугаар өөрчлөх
                </li>
                <li
                  className={styles.logout}
                  onClick={() => logout()}
                >
                  <LogOut size={20} color="#f23" /> Гарах
                </li>
              </ul>
            </div>
          </div>
        )}
        {/* --- Main Content --- */}
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

          <button className={styles.timeOrderBtn} onClick={() => navigateTo(toBooking)}>
            <Clock size={21} />
            Цаг захиалах
          </button>

          <div className={styles.myCarsSection}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Car size={19} color="green" />
              <span>Миний машинууд</span>
            </div>
            <button className={styles.addCarBtn}
              onClick={() => navigateTo(toAddCar)}>
              + Машин нэмэх
            </button>
          </div>

          <div className={styles.serviceSection}>
            <div className={styles.serviceHeader}>
              <BadgeCheck
                size={17}
                style={{ marginRight: 7, marginBottom: -3, color: "green" }}
              />
              Хугацаат үйлчилгэээнүүд
            </div>
            <div className={styles.serviceEmpty}>
              <BookText size={22} color="grey" />
              <div className={styles.serviceTitle}>Хугацаат үйлчилгэээнүүд</div>
              <div>Одоогоор хугацаат үйлчилгээ байхгүй байна</div>
            </div>
          </div>
        </div>
        {/* --- Bottom Navigation (mobile) --- */}
        <nav className={styles.bottomNav}>
          <button>
            <Home size={21} color="green" />
            <br />
            Нүүр
          </button>
          <button>
            <FileText size={21} color="green" />
            <br />
            Түүх
          </button>
          <button>
            <BadgeCheck size={21} color="blue" />
            <br />
            Гишүүнчлэл
          </button>
        </nav>
      </div>
    </div>
  );
}
